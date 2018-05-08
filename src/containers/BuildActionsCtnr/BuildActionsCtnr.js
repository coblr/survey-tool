import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BuildActions from '../../components/BuildActions/BuildActions';

import { openCopySurveyModal } from '../../store/ui/CopySurveyModal';
import { deleteSurvey } from '../../store/api/Survey';
import {
  collapseAllQuestions,
  expandAllQuestions
} from '../../store/api/SurveyQuestion';

export class BuildActionsCtnr extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteAlert: false
    };
  }

  toggleDeleteAlert() {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  }

  render() {
    const { surveyId, surveyMap } = this.props;

    let survey;
    if (surveyId && surveyMap) {
      survey = surveyMap[surveyId];
    }

    if (!survey) return null;
    return <BuildActions survey={survey} {...this.props} />;
  }
}

BuildActionsCtnr.propTypes = {
  showSurveyActions: PropTypes.bool,
  showPageNav: PropTypes.bool,
  showQuestionActions: PropTypes.bool,
  surveyId: PropTypes.string,
  surveyMap: PropTypes.object,
  surveyPageMap: PropTypes.object,
  openCopySurveyModal: PropTypes.func,
  deleteSurvey: PropTypes.func,
  collapseAllQuestions: PropTypes.func,
  expandAllQuestions: PropTypes.func
};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS(),
  surveyPageMap: state.SurveyPage.get('surveyPageMap').toJS()
});

const mapDispatchToProps = dispatch => ({
  openCopySurveyModal(title) {
    dispatch(openCopySurveyModal(title));
  },
  deleteSurvey(survey) {
    dispatch(deleteSurvey(survey));
  },
  collapseAllQuestions() {
    dispatch(collapseAllQuestions());
  },
  expandAllQuestions() {
    dispatch(expandAllQuestions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  BuildActionsCtnr
);
