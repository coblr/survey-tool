import { SSI } from './keycloak';
import Environment from './helpers/Environment';

let dkKeycloakHost = `auth.surveysampling.com`;
switch (Environment) {
  case 'ci':
    dkKeycloakHost = 'qa-auth.surveysampling.com';
    break;
  case 'qa':
    dkKeycloakHost = 'qa-auth.surveysampling.com';
    break;
  case 'stage':
    dkKeycloakHost = 'auth.surveysampling.com';
    break;
  case 'prod':
    dkKeycloakHost = 'auth.surveysampling.com';
    break;
  //no default
}

export default function(bootstrapCallback, debug) {
  if (debug) {
    console.info(
      '[SB] Initial Keycloak Type:',
      localStorage.getItem('user-type')
    );
  }

  // based on the type of keycloak we want to use, we
  // can now set the configs
  let kcConfig;
  const kcType = localStorage.getItem('user-type');
  if (kcType === 'dk') {
    kcConfig = {
      url: `https://${dkKeycloakHost}/auth`,
      realm: 'SSI',
      clientId: 'surveybuilder-ui',
      altTokenUri: `${window.location.protocol}//${window.location
        .host}/dk/auth`,
      debug
    };
  }
  if (kcType === 'sb') {
    kcConfig = {
      url: `${window.location.protocol}//${window.location
        .host}/auth`,
      realm: 'SSI-PLATFORM',
      clientId: 'surveybuilder-ui',
      debug
    };
  }

  if (!kcConfig) {
    console.error('Could not determine Keycloak configuration.');
    return;
  }

  const kc = SSI.Keycloak(kcConfig);
  if (debug) {
    console.info('[SB] Keycloak', kc);
  }
  kc.onReady = authenticated => {
    if (debug) {
      console.info('[SB] Keycloak Ready!', authenticated);
    }
    if (!authenticated && !kc.refreshToken) {
      kc.login();
    }
  };
  kc.onAuthSuccess = () => {
    if (debug) {
      console.info('[SB] Auth Success!');
    }
    bootstrapCallback(kc);

    // automatically logs users out when token is revoked
    setInterval(() => {
      kc.checkToken();
    }, 10000);
  };
  kc.init();
}
