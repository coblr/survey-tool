import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Environment from '../../helpers/Environment';

import UserSearch from '../../components/UserSearch/UserSearch';

import { fetchSurveyOwner } from '../../store/api/Survey';

export class UserSearchCtnr extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      surveyId: ''
    };
  }

  componentDidUpdate(prevProps) {
    const { surveyId } = this.state;
    const { surveyOwners } = this.props;
    const { surveyOwners: prevOwners } = prevProps;

    const kcUrl = this.getKeycloakUrl();

    const prevId = prevOwners[surveyId];
    const curId = surveyOwners[surveyId];
    const willHaveId = !prevId && curId;
    const isDifferentId = prevId !== curId;

    if (curId && (willHaveId || isDifferentId)) {
      const kcBase =
        '/auth/admin/master/console/#/realms/SSI-PLATFORM/users/';
      console.log(`${kcUrl}${kcBase}${curId}`);
      window.open(`${kcUrl}${kcBase}${curId}`);
    }
  }

  getKeycloakUrl() {
    let kcUrl;
    switch (Environment) {
      case 'ci':
        kcUrl = 'https://ci-sb.surveysampling.com';
        break;
      case 'qa':
        kcUrl = 'https://qa-sb.surveysampling.com';
        break;
      case 'stage':
        kcUrl = 'https://stage-sb.surveysampling.com';
        break;
      case 'prod':
        kcUrl = 'https://sb.surveysampling.com';
        break;
      // no default
    }

    if (localStorage.getItem('user-type') === 'dk') {
      switch (Environment) {
        case 'ci':
          kcUrl = 'http://ctjbossqaauth01.surveysampling.com:8080';
          break;
        case 'qa':
          kcUrl = 'http://ctjbossqaauth01.surveysampling.com:8080';
          break;
        case 'stage':
          kcUrl = 'http://ctjbossqaauth01.surveysampling.com:8080';
          break;
        case 'prod':
          kcUrl = 'http://ctjbossauth01.surveysampling.com:8080';
          break;
        // no default
      }
    }
    return kcUrl;
  }

  setSurveyId(surveyId) {
    this.setState({ surveyId });
  }

  render() {
    return (
      <UserSearch
        setSurveyId={sId => this.setSurveyId(sId)}
        {...this.props}
      />
    );
  }
}

UserSearchCtnr.propTypes = {
  surveyOwners: PropTypes.object
};

const mapStateToProps = state => ({
  surveyOwners: state.Survey.get('surveyOwners').toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchSurveyOwner(surveyId) {
    dispatch(fetchSurveyOwner(surveyId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  UserSearchCtnr
);
