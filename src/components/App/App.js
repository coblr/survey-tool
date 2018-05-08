import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import Intro from '../Intro/Intro';
import HomeCtnr from '../../containers/HomeCtnr/HomeCtnr';
import NotFoundCtnr from '../../containers/NotFoundCtnr/NotFoundCtnr';
import NotAllowedCtnr from '../../containers/NotAllowedCtnr/NotAllowedCtnr';
import asyncComponent from '../AsyncComponent/AsyncComponent';

import ToasterCtnr from '../../containers/ToasterCtnr/ToasterCtnr';
import CreateSurveyModalCtnr from '../../containers/CreateSurveyModalCtnr/CreateSurveyModalCtnr';
import QuestionOptionModalCtnr from '../../containers/QuestionOptionModalCtnr/QuestionOptionModalCtnr';
import CopySurveyModalCtnr from '../../containers/CopySurveyModalCtnr/CopySurveyModalCtnr';
import ReportFilterModalCtnr from '../../containers/ReportFilterModalCtnr/ReportFilterModalCtnr';
import CreateFilterModalCtnr from '../../containers/CreateFilterModalCtnr/CreateFilterModalCtnr';
import TextResponseModalCtnr from '../../containers/TextResponseModalCtnr/TextResponseModalCtnr';
import DownloadReportModalCtnr from '../../containers/DownloadReportModalCtnr/DownloadReportModalCtnr';

const AsyncSurveyBuilderCtnr = asyncComponent(() =>
  import('../../containers/SurveyBuilderCtnr/SurveyBuilderCtnr')
);
const AsyncSurveyPromoteCtnr = asyncComponent(() =>
  import('../../containers/SurveyPromoteCtnr/SurveyPromoteCtnr')
);
const AsyncSurveyReportCtnr = asyncComponent(() =>
  import('../../containers/SurveyReportCtnr/SurveyReportCtnr')
);
const AsyncTermsCtnr = asyncComponent(() =>
  import('../../containers/TermsCtnr/TermsCtnr')
);
const AsyncPrivacyCtnr = asyncComponent(() =>
  import('../../containers/PrivacyCtnr/PrivacyCtnr')
);
const AsyncAdminCtnr = asyncComponent(() =>
  import('../../containers/AdminCtnr/AdminCtnr')
);

export class App extends React.PureComponent {
  render() {
    const {
      appBodyBackground,
      history,
      location,
      keycloak
    } = this.props;

    const modalProps = { history, location };

    if (!keycloak.authenticated) {
      return (
        <div className="App_intro">
          <AppHeader title="Survey Builder" />
          <Intro />
          <AppFooter />
        </div>
      );
    }

    return (
      <section className="App" style={{ visibility: 'hidden' }}>
        <CreateSurveyModalCtnr {...modalProps} />
        <QuestionOptionModalCtnr {...modalProps} />
        <CopySurveyModalCtnr {...modalProps} />
        <ReportFilterModalCtnr {...modalProps} />
        <CreateFilterModalCtnr {...modalProps} />
        <TextResponseModalCtnr {...modalProps} />
        <DownloadReportModalCtnr {...modalProps} />

        <ToasterCtnr />

        {this.renderAppHeader()}

        <div
          className="App_body"
          style={{ background: appBodyBackground }}>
          <Switch>
            <Redirect from="/free" to="/" />
            <Redirect from="/premium" to="/" />
            <Route exact path="/" component={HomeCtnr} />
            <Route
              exact
              path="/surveys/:surveyId?"
              component={HomeCtnr}
            />
            <Route
              path="/surveys/:surveyId/build"
              component={AsyncSurveyBuilderCtnr}
            />
            <Route
              path="/surveys/:surveyId/promote"
              component={AsyncSurveyPromoteCtnr}
            />
            <Route
              path="/surveys/:surveyId/reports"
              component={AsyncSurveyReportCtnr}
            />
            <Route path="/terms" component={AsyncTermsCtnr} />
            <Route path="/privacy" component={AsyncPrivacyCtnr} />
            <Route path="/admin" component={AsyncAdminCtnr} />
            <Route path="/403" component={NotAllowedCtnr} />
            <Route component={NotFoundCtnr} />
          </Switch>
        </div>

        <AppFooter />
      </section>
    );
  }

  renderAppHeader() {
    const {
      appTitle,
      showAppActions,
      openCreateSurveyModal,
      realmAccess
    } = this.props;

    const isAdmin =
      realmAccess.roles && realmAccess.roles.indexOf('sb_admin') >= 0;

    return (
      <AppHeader
        title={appTitle}
        showAppActions={showAppActions}
        openCreateSurveyModal={openCreateSurveyModal}
        isAdmin={isAdmin}
      />
    );
  }
}

App.propTypes = {
  keycloak: PropTypes.object,
  appTitle: PropTypes.string,
  appBodyBackground: PropTypes.string,
  showAppActions: PropTypes.bool,
  openCreateSurveyModal: PropTypes.func,
  surveyState: PropTypes.object,
  match: PropTypes.object,
  realmAccess: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default App;
