import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectListReport from '../../components/SelectListReport/SelectListReport';

import { fetchTextResponses } from '../../store/api/SurveyResponse';
import { openTextResponseModal } from '../../store/ui/TextResponseModal';

export class SelectListReportCtnr extends React.PureComponent {
  componentDidMount() {
    const {
      question,
      filter,
      interviewId,
      fetchTextResponses
    } = this.props;
    const { questionId } = question;
    const filterId = filter ? filter.id : null;

    question.counts.forEach(count => {
      const answerId = count.answer.id;
      if (count.answer && count.answer.otherSpecify) {
        fetchTextResponses(
          questionId,
          answerId,
          filterId,
          interviewId
        );
      }
    });
  }

  render() {
    return <SelectListReport {...this.props} />;
  }
}

SelectListReportCtnr.propTypes = {
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
  SelectListReportCtnr
);
