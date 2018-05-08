import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageList from '../../components/PageList/PageList';
import ThankYouPageCtnr from '../ThankYouPageCtnr/ThankYouPageCtnr';
import TerminatePageCtnr from '../TerminatePageCtnr/TerminatePageCtnr';
import Throbber from '../../components/Throbber/Throbber';

import { createPage, deletePage } from '../../store/api/SurveyPage';
import {
  initQuestion,
  removeTempQuestions
} from '../../store/api/SurveyQuestion';
import { createPageLogic } from '../../store/ui/PageLogic';

export class PageListCtnr extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  componentWillUnmount() {
    // we shouldn't need this?
    //this.props.removeTempQuestions();
  }

  render() {
    const { survey } = this.props;

    if (!survey) {
      return (
        <div>
          <Throbber text="Loading Pages..." />
        </div>
      );
    }

    return (
      <div>
        <PageList {...this.props} />
        {survey.thankYouConclusion && (
          <ThankYouPageCtnr survey={survey} />
        )}
        {survey.terminateConclusion && (
          <TerminatePageCtnr survey={survey} />
        )}
      </div>
    );
  }
}

PageListCtnr.propTypes = {
  survey: PropTypes.object,
  surveyPageMap: PropTypes.object,
  initQuestion: PropTypes.func,
  creatingPages: PropTypes.object,
  deletingPages: PropTypes.object,
  removeTempQuestions: PropTypes.func
};

const mapStateToProps = state => ({
  surveyPageMap: state.SurveyPage.get('surveyPageMap').toJS(),
  creatingPages: state.SurveyPage.get('creatingPages').toJS(),
  deletingPages: state.SurveyPage.get('deletingPages').toJS(),
  pageLogic: state.PageLogic.get('pageLogic').toJS()
});

const mapDispatchToProps = dispatch => ({
  createPage(surveyId, page, index) {
    dispatch(createPage(surveyId, page, index));
  },
  deletePage(surveyId, page) {
    dispatch(deletePage(surveyId, page));
  },
  initQuestion(pageId, index) {
    dispatch(initQuestion(pageId, index));
  },
  removeTempQuestions() {
    dispatch(removeTempQuestions());
  },
  createPageLogic(pageId) {
    dispatch(createPageLogic(pageId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PageListCtnr
);
