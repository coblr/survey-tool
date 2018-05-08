import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextReport from '../../components/TextReport/TextReport';

import { fetchTextResponses } from '../../store/api/SurveyResponse';
import { openTextResponseModal } from '../../store/ui/TextResponseModal';

export class TextReportCtnr extends React.PureComponent {
  componentDidMount() {
    const {
      question,
      interviewId,
      filter,
      fetchTextResponses
    } = this.props;
    const questionId = question.questionId;
    const answerId = question.counts[0].answer.id;
    const filterId = filter ? filter.id : null;

    // answer ID isn't totally required for this type of
    // question, but by passing it in anyway we are forcing
    // the reducer to store text responses by answerId
    // which makes things identical to selectListReport
    // and helps make pagination requests more uniform.
    fetchTextResponses(questionId, answerId, filterId, interviewId);
  }

  render() {
    return <TextReport {...this.props} />;
  }
}

TextReportCtnr.propTypes = {
  question: PropTypes.object,
  fetchTextResponses: PropTypes.func,
  interviewId: PropTypes.string,
  filter: PropTypes.object
};

const mapStateToProps = state => ({
  textResponses: state.SurveyResponse.get('textResponses').toJS(),
  recentTextResponses: state.SurveyResponse
    .get('recentTextResponses')
    .toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchTextResponses(questionId, answerId, filterId, interviewId) {
    dispatch(
      fetchTextResponses(questionId, answerId, filterId, interviewId)
    );
  },
  openTextResponseModal(question, answer, filterId) {
    dispatch(openTextResponseModal(question, answer, filterId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TextReportCtnr
);
