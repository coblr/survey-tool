import 'core-js/shim';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import svg4everybody from 'svg4everybody';

import './styles/index.css';
import store from './store/';
import initAuth from './initAuth';
import AppCtnr from './containers/AppCtnr/AppCtnr';

const pathname = window.location.pathname;
const randomUser = pathname.match(/\/(free|premium)/);
const userType = randomUser ? 'sb' : 'dk';
// don't set if not already set, otherwise regular users
// will get reset to dk users after we remove /free from URL.
if (!localStorage.getItem('user-type')) {
  localStorage.setItem('user-type', userType);
}

initAuth(bootstrapApp);

let appStarted = false;
function bootstrapApp(kc) {
  if (!appStarted) {
    appStarted = true;
    render(
      <Provider store={store}>
        <Router history={createHistory()}>
          <Switch>
            {/*
              having a specific route with :surveyId is the only
              way to get the surveyId parameter (when it exists)
              into the AppCtnr header and nav components.
            */}
            <Route
              path="/surveys/:surveyId?"
              render={props => <AppCtnr {...props} keycloak={kc} />}
            />
            <Route
              path="/"
              render={props => <AppCtnr {...props} keycloak={kc} />}
            />
          </Switch>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  }
}

// this should be done asap so that the
// SSI Logo will appear correctly.
svg4everybody();
