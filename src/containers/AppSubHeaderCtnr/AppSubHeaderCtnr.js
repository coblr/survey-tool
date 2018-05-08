import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppSubHeader from '../../components/AppSubHeader/AppSubHeader';

import { logout } from '../../store/ui/User';
import { openCreateSurveyModal } from '../../store/ui/CreateSurveyModal';
import { updateSurvey } from '../../store/api/Survey';

export class AppSubHeaderCtnr extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  render() {
    return <AppSubHeader {...this.props} />;
  }
}

AppSubHeaderCtnr.propTypes = {
  title: PropTypes.string
};

const mapStateToProps = state => ({
  updatingSurveys: state.Survey.get('updatingSurveys').toJS()
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  },
  openCreateSurveyModal() {
    dispatch(openCreateSurveyModal());
  },
  updateSurvey(surveyId, survey) {
    dispatch(updateSurvey(surveyId, survey));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AppSubHeaderCtnr
);
