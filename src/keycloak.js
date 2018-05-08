export const SSI = {};

/* Simple client-side Keycloak library for use in SPAs.
 * This library is designed for use as a SINGLE instance.
 * Much work would remain to allow for secure use across multiple
 * Keycloak resources, if such functionality were desired.
 */

(function(ns) {
  ns.Keycloak = Keycloak;
  ns.Cache = Cache;
  ns.querystring = getQueryParams;

  // ------------
  // SSI CACHE
  // ------------

  function Cache(prefix) {
    if (!(this instanceof Cache)) {
      return new Cache(prefix);
    }

    if (typeof prefix === 'string' && prefix) {
      this.prefix = prefix.replace(/-?$/, '-');
    } else {
      this.prefix = 'ssi-kc-';
    }
    this.prefixRe = makePrefixRe(this.prefix);
  }

  Cache.prototype.add = function(key, val) {
    let k = this.prefix + key,
      expires = Date.now() + 60 * 60 * 1000;

    localStorage.setItem(
      k,
      JSON.stringify({
        expires: expires,
        value: val
      })
    );
  };

  Cache.prototype.get = function(key) {
    if (!key) {
      return null;
    }
    let k = this.prefix + key,
      v = localStorage.getItem(k);

    if (!v) {
      return null;
    }

    try {
      let obj = JSON.parse(v);
      if (!obj.expires || !obj.value) {
        localStorage.removeItem(k);
        return null;
      }
      if (obj.expires < Date.now()) {
        localStorage.removeItem(k);
        return null;
      }
      return obj.value;
    } catch (e) {
      localStorage.removeItem(k);
      return null;
    }
  };

  Cache.prototype.remove = function(key) {
    let v = this.get(key);
    if (v) {
      localStorage.removeItem(this.prefix + key);
    }
    return v;
  };

  Cache.prototype.clearExpired = function() {
    let now = Date.now();
    this.purge(function(v) {
      try {
        let val = JSON.parse(v);
        return !val.expires || val.expires < now;
      } catch (e) {
        return true;
      }
    });
  };

  Cache.prototype.purge = function(pred) {
    let self = this;
    if (!pred) {
      pred = () => true;
    }

    for (let i = localStorage.length - 1; i >= 0; i--) {
      let k = localStorage.key(i);
      if (self.prefixRe.test(k)) {
        let v = localStorage.getItem(k);
        if (pred(v)) {
          localStorage.removeItem(k);
        }
      }
    }
  };

  // ------------
  // KEYCLOAK ADAPTER
  // ------------

  let requiredFields = ['realm', 'url', 'clientId'];

  function Keycloak(options) {
    if (Keycloak.instanceExists) {
      throw new Error('Multiple instances not allowed');
    }
    if (!(this instanceof Keycloak)) {
      return new Keycloak(options);
    }

    if (typeof options !== 'object') {
      throw new RangeError(
        'Keycloak must be initialized with object'
      );
    }

    if (!requiredFields.every(k => typeof options[k] === 'string')) {
      throw new RangeError(
        'Keycloak must be initialized with the following fields: ["' +
          requiredFields.join('", "') +
          '"]'
      );
    }

    Keycloak.instanceExists = true;

    this.redirectUri = getRedirectUrl();
    this.realm = options.realm;
    this.url = options.url;
    this.clientId = options.clientId;
    this.altTokenUri = options.altTokenUri || '';
    this.debug = options.debug;

    this.cache = new Cache();

    if (typeof options.onTokenExpired === 'function') {
      this.onTokenExpired = options.onTokenExpired;
    } else {
      this.onTokenExpired = onTokenExpired.bind(this);
    }
  }

  Keycloak.prototype.init = function() {
    if (this.debug) {
      console.info('[SSI.KEYCLOAK] Initializing...');
    }
    init.bind(this)();
  };

  Keycloak.prototype.onReady = function() {
    if (this.debug) {
      console.info('[SSI.KEYCLOAK] Ready!');
    }
  };

  Keycloak.prototype.login = function() {
    if (this.debug) {
      console.info('[SSI.KEYCLOAK] Logging In...');
    }
    login.bind(this)();
  };

  Keycloak.prototype.onAuthSuccess = function() {
    if (this.debug) {
      console.info('[SSI.KEYCLOAK] Auth Success!');
    }
  };

  Keycloak.prototype.onAuthError = function(e) {
    if (this.debug) {
      console.error('[SSI.KEYCLOAK] Auth Error', e);
    }
  };

  Keycloak.prototype.updateToken = function(threshold) {
    if (this.debug) {
      console.info('[SSI.KEYCLOAK] Updating Token...');
    }
    updateToken.bind(this)(threshold);
  };

  Keycloak.prototype.logout = function() {
    if (this.debug) {
      console.info('[SSI.KEYCLOAK] Logging Out...');
    }
    logout.bind(this)();
  };

  Keycloak.prototype.checkToken = function() {
    if (this.debug) {
      console.info('[SSI.KEYCLOAK] Checking Token...');
    }
    checkToken.bind(this)();
  };

  /*
   * Handler for initializing the adapter
   */
  function init() {
    const kc = this;
    const cache = kc.cache;
    const token = cache.get('token');
    const state = cache.get('state');
    const authorized = !!(token && state);
    if (!authorized) {
      return kc.onReady(false);
    }

    processTokenCallback(kc, token);
    // kc.onAuthSuccess();
  }

  /*
   * Handler for authenticating a user
   */
  function login() {
    const kc = this;
    const state = uuid();
    const queryParams = getQueryParams();
    const qsCode = queryParams.code;
    const qsState = queryParams.state;

    // if we have no code or state in the URL
    // then we want to redirect to the KC login page.
    if (!qsCode) {
      kc.cache.purge();
      kc.cache.add('state', qsState || state);
      const url = buildOauthRedirectUrl(kc, qsState || state);
      if (kc.debug) {
        console.info('[SSI.KEYCLOAK] Redirecting to:', url);
      }
      window.location = url;
      return;
    }

    // If we do have a code and state in the URL
    // use them to get and process the token.
    let params = {
      grant_type: 'authorization_code',
      client_id: kc.clientId,
      redirect_uri: kc.redirectUri,
      code: qsCode
    };

    return getToken(kc, params, (err, tok) => {
      if (err) {
        console.error('[SSI.KEYCLOAK] Error getting token:', err);
      } else {
        kc.cache.add('token', tok);
      }
      // redirecting to a page without ?code or ?state.
      // token will be processed during the init, after
      // the redirect.
      window.location = kc.redirectUri;
    });
  }

  /*
   * Handler for deauthenticating a user.
   */
  function logout(redirectUri) {
    const kc = this;
    const realmUrl = getRealmUrl(kc);
    const params = {
      redirect_uri: redirectUri || kc.redirectUri,
      prompt: true,
      id_token_hint: kc.token
    };

    let logoutUrl = `${realmUrl}/protocol/openid-connect/logout?${formEncode(
      params
    )}`;

    kc.cache.purge();
    deleteTokenFields(kc);
    setTimeout(() => {
      window.location = logoutUrl;
    }, 200);
  }

  /*
   * Handler for updating the token
   */
  function updateToken(threshold) {
    let kc = this;
    threshold >>>= 0; // force threshold to number

    if (!kc.refreshToken) {
      console.error('[SSI.KEYCLOAK] No refresh token present');
    }

    try {
      let expired = isTokenExpired(kc, threshold);
      if (kc.debug) {
        console.info(
          '[SSI.KEYCLOAK] Token ',
          expired ? 'Expired' : 'Valid. No Update Needed'
        );
      }
      if (!expired) return;
    } catch (e) {
      console.error('[SSI.KEYCLOAK] Token Expiration Error: ', e);
    }

    if (kc.debug) {
      console.info('[SSI.KEYCLOAK] Token Expired. Refreshing...');
    }

    let params = {
      grant_type: 'refresh_token',
      refresh_token: kc.refreshToken,
      client_id: kc.clientId
    };

    getToken(kc, params, (err, tok) => {
      if (err) {
        if (kc.debug) {
          console.error('[SSI.KEYCLOAK] Error Updating Token:', err);
          console.info('[SSI.KEYCLOAK] Redirecting to login.');
        }
        kc.login();
        return;
      }
      if (kc.debug) {
        console.info('[SSI.KEYCLOAK] Received Token.');
      }
      kc.cache.add('token', tok);
      processTokenCallback(kc, tok);
    });
  }

  /*
   * Removes all traces of token info
   */
  function onTokenExpired() {
    this.cache.purge();
    deleteTokenFields(this);
  }

  /*
   * Generates a URI for our specific Keycloak realm
   */
  function getRealmUrl(kc, alt) {
    const host = alt ? kc.altTokenUri || kc.url : kc.url;
    return `${host}/realms/${kc.realm}`;
  }

  /*
   * Builds a URI for redirecting to Keycloak OpenID Auth
   */
  function buildOauthRedirectUrl(kc, state) {
    let params = {
      response_type: 'code',
      client_id: kc.clientId,
      redirect_uri: kc.redirectUri,
      state: state,
      prompt: true,
      scope: 'openid'
    };
    return `${getRealmUrl(
      kc
    )}/protocol/openid-connect/auth?${formEncode(params)}`;
  }

  /*
   * Checks if token is valid and/or expired
   */
  function isTokenExpired(kc, threshold) {
    if (!kc.token || !kc.tokenParsed) {
      throw new Error('no token present');
    }

    let tokenExpires = kc.tokenParsed.exp;
    if (typeof tokenExpires !== 'number') {
      throw new Error('invalid token expiration');
    }

    if (kc.debug) {
      console.info(
        '[SSI.KEYCLOAK] Token Expires at:',
        new Date(tokenExpires * 1000)
      );
    }

    let expiresIn = tokenExpires - Date.now() / 1000;
    return expiresIn <= threshold;
  }

  /*
   * Makes an AJAX request to check the JWT Token.
   * If token is invalid, logs out and redirects to login page.
   */
  function checkToken() {
    const kc = this;
    const url = `${getRealmUrl(kc)}/protocol/openid-connect/userinfo`;

    if (kc.debug) {
      console.info('[SSI.KEYCLOAK] Checking token from:', url);
    }

    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Authorization', `bearer ${kc.token}`);

    req.onreadystatechange = function() {
      if (req.readyState !== 4) return;
      if (req.status === 200) {
        if (kc.debug) {
          console.log('[SSI.KEYCLOAK] Token checks out');
        }
        return;
      }
      if (kc.debug) {
        console.info(
          '[SSI.KEYCLOAK] Token was revoked. Logging out...'
        );
      }
      localLogout(kc);
    };
    req.send();
  }

  /*
   * Clears caches and tokens, then redirects user to login page.
   * Cannot redirect to logout because the session has already
   * been revoked and you'll get an "Invalid Session" error.
   */
  function localLogout(kc) {
    kc.cache.purge();
    deleteTokenFields(kc);
    let params = {
      response_type: 'code',
      client_id: kc.clientId,
      redirect_uri: kc.redirectUri,
      prompt: true,
      scope: 'openid'
    };
    window.location = `${getRealmUrl(
      kc
    )}/protocol/openid-connect/auth?${formEncode(params)}`;
  }

  /*
   * Makes an AJAX request to get the JWT Token
   */
  function getToken(kc, params, callback) {
    let url = `${getRealmUrl(
      kc,
      true
    )}/protocol/openid-connect/token`;

    if (kc.debug) {
      console.info('[SSI.KEYCLOAK] Getting token from:', url);
    }

    const req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );

    req.onreadystatechange = function() {
      if (req.readyState !== 4) {
        return;
      }
      if (req.status === 200) {
        const tokenResponse = JSON.parse(req.responseText);
        if (kc.debug) {
          console.info('[SSI.KEYCLOAK] New Token:', tokenResponse);
        }
        return callback(null, tokenResponse);
      }
      return callback(
        req.responseText || 'An unknown error occured.'
      );
    };

    req.send(formEncode(params));
  }

  /*
   * Process the token if valid, otherwise throws an error
   */
  function processTokenCallback(kc, token) {
    if (kc.debug) {
      console.info('[SSI.KEYCLOAK] Processing Token');
    }
    try {
      setTokenIfValid(kc, token);
    } catch (e) {
      return kc.onAuthError(e);
    }
    return kc.onAuthSuccess();
  }

  /*
   * Process a token when it's valid by
   * setting some internal KC properties
   */
  function setTokenIfValid(kc, token) {
    if (kc.tokenTimoutHandle) {
      clearTimeout(kc.tokenTimoutHandle);
      kc.tokenTimoutHandle = null;
    }

    if (!token || typeof token !== 'object') {
      throw new RangeError('token missing');
    }

    [
      ['access_token', 'token'],
      ['refresh_token', 'refreshToken'],
      ['id_token', 'idToken']
    ].forEach(names => {
      if (!token[names[0]]) {
        deleteTokenFields(kc);
        throw new RangeError('invalid token');
      }
      kc[names[1]] = token[names[0]];
      try {
        kc[names[1] + 'Parsed'] = decodeToken(token[names[0]]);
      } catch (e) {
        deleteTokenFields(kc);
        throw new RangeError(`invalid token format (${names[0]})`);
      }
    });

    let sessionId = `${kc.realm}/${kc.tokenParsed.sub}`;
    if (kc.tokenParsed['session_state']) {
      sessionId += `/${kc.tokenParsed['session_state']}`;
    }
    kc.sessionId = sessionId;
    kc.authenticated = true;
    kc.subject = kc.tokenParsed.sub;
    kc.realmAccess = kc.tokenParsed['realm_access'];
    kc.resourceAccess = kc.tokenParsed['resource_access'];

    if (typeof kc.onTokenExpired === 'function') {
      // user has until refresh token expires to update the token
      // again. After that point, the refresh token and other params
      // will be destroyed and user will have to login manually.
      let refreshExpIn = Math.floor(
        kc.refreshTokenParsed.exp - Date.now() / 1000
      );
      kc.tokenTimoutHandle = setTimeout(
        kc.onTokenExpired,
        refreshExpIn * 1000
      );
    }
  }

  /*
   * Removes fields stored after token was retreived.
   */
  function deleteTokenFields(kc) {
    delete kc.token;
    delete kc.tokenParsed;
    delete kc.sessionId;
    delete kc.subject;
    delete kc.realmAccess;
    delete kc.resourceAccess;
    delete kc.refreshToken;
    delete kc.refreshTokenParsed;
    delete kc.idToken;
    delete kc.idTokenParsed;
    kc.authenticated = false;
  }

  // ------------
  // UTIL FUNCTIONS
  // ------------

  /*
   * Trims slashes from the start/end a string
   */
  // function trimSlashes(s){
  //   return s.replace(/^\/|\/$/g, '');
  // }

  /*
   * Turns an object into encoded URL query string
   */
  function formEncode(obj) {
    let result = '';
    Object.keys(obj).forEach((k, i) => {
      if (i > 0) {
        result += '&';
      }
      result += `${k}=${encodeURIComponent(obj[k])}`;
    });
    return result;
  }

  /*
   * Creates a UUID for the Keycloak state
   */
  function uuid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
  }

  /*
   * Decodes JWT token
   */
  function decodeToken(str) {
    str = str.split('.')[1].replace(/[-_]/g, clean);

    switch (str.length % 4) {
      case 0:
        break;
      case 2:
        str += '==';
        break;
      case 3:
        str += '=';
        break;
      default:
        throw new RangeError('Invalid token');
    }

    let n = str.length,
      enc = (str + '===').slice(0, n + n % 4),
      j = decodeURIComponent(escape(atob(enc)));

    return JSON.parse(j);
  }

  /*
   * Helper fn for decoding JWT
   */
  function clean(c) {
    return c === '-' ? '+' : '/';
  }

  /*
   * Gets all query string params from URL
   */
  function getQueryParams() {
    const map = {};
    let qs = window.location.search;
    if (!qs) {
      return map;
    }
    qs = qs.replace(/^\?/, '');
    qs.split('&').forEach(function(pair) {
      const kv = pair.split('=');
      if (kv.length !== 2) {
        return;
      }
      const key = kv[0],
        val = decodeURIComponent(kv[1]);
      if (map[key]) {
        if (!Array.isArray(map[key])) {
          const existingVal = map[key];
          map[key] = [existingVal];
        }
        map[key].push(val);
      } else {
        map[key] = val;
      }
    });
    return map;
  }

  /*
   * Makes RegExp for getting prefixes
   */
  function makePrefixRe(str) {
    if (typeof str !== 'string') {
      throw new RangeError('invalid template');
    }
    let template = str.replace(
      /-|\||\{|\}|\(|\)|\\|\?|\./g,
      match => {
        return `\\${match}`;
      }
    );
    return new RegExp(`^${template}(.*)$`);
  }

  /*
   * Gets the current App URL to use as the Keycloak redirectURI
   */
  function getRedirectUrl() {
    let loc = window.location;
    let url = `${loc.protocol}//${loc.host}${loc.pathname}`;
    return url;
  }
})(SSI);
