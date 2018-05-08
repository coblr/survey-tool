import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SurveyPages from '../../components/SurveyPages/SurveyPages';

import {
  initQuestion,
  removeTempQuestions
} from '../../store/api/SurveyQuestion';

export class SurveyPagesCtnr extends React.PureComponent {
  componentDidMount() {
    this.ensureOneQuestion();
  }

  componentWillUnmount() {
    this.props.removeTempQuestions();
  }

  componentDidUpdate() {
    this.ensureOneQuestion();
  }

  ensureOneQuestion() {
    const {
      match: { params: { surveyId } },
      surveyMap,
      surveyPageMap,
      initQuestion
    } = this.props;
    const survey = surveyMap[surveyId];

    if (!survey) return;
    survey.pages.forEach(pageId => {
      const page = surveyPageMap[pageId];
      if (!page) return;
      if (!page.questions.length) {
        initQuestion(pageId, 0);
      }
    });
  }

  render() {
    return <SurveyPages {...this.props} />;
  }
}

SurveyPagesCtnr.propTypes = {
  surveyMap: PropTypes.object,
  match: PropTypes.object,
  surveyPageMap: PropTypes.object,
  initQuestion: PropTypes.func,
  removeTempQuestions: PropTypes.func
};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS(),
  surveyPageMap: state.SurveyPage.get('surveyPageMap').toJS()
});

const mapDispatchToProps = dispatch => ({
  initQuestion(pageId, index) {
    dispatch(initQuestion(pageId, index));
  },
  removeTempQuestions() {
    dispatch(removeTempQuestions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveyPagesCtnr
);
