import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalDialog from '../../components/ModalDialog/ModalDialog';
import ModalDialogHeader from '../../components/ModalDialogHeader/ModalDialogHeader';
import TextResponseModal from '../../components/TextResponseModal/TextResponseModal';

import { dismissTextResponseModal } from '../../store/ui/TextResponseModal';
import { updateInterview } from '../../store/api/SurveyInterview';
import { fetchTextResponses } from '../../store/api/SurveyResponse';

export class TextResponseModalCtnr extends React.PureComponent {
  gotoInterview(surveyId, interviewId) {
    const responseLink = `/surveys/${surveyId}/reports/individual/${interviewId}`;
    this.props.history.push(responseLink);

    this.props.dismissTextResponseModal();
  }

  handleDismiss() {
    const {
      question: { questionId },
      answer: { id: answerId },
      filterId,
      dismissTextResponseModal,
      fetchTextResponses
    } = this.props;

    fetchTextResponses(questionId, answerId, filterId);
    dismissTextResponseModal();
  }

  render() {
    const { isOpen, answer, textResponses } = this.props;

    const responses = textResponses[answer.id];

    return (
      <ModalDialog
        show={isOpen}
        width="600"
        onDismiss={() => this.handleDismiss()}>
        <ModalDialogHeader
          title="Freeform Responses"
          titleIcon="response"
          onDismiss={() => this.handleDismiss()}
        />
        <TextResponseModal
          responses={responses}
          gotoInterview={(sId, iId) => this.gotoInterview(sId, iId)}
          {...this.props}
        />
      </ModalDialog>
    );
  }
}

TextResponseModalCtnr.propTypes = {
  isOpen: PropTypes.bool,
  dismissTextResponseModal: PropTypes.func,
  answer: PropTypes.object,
  textResponses: PropTypes.object,
  history: PropTypes.object,
  question: PropTypes.object,
  filterId: PropTypes.string,
  fetchTextResponses: PropTypes.func
};

const mapStateToProps = state => ({
  isOpen: state.TextResponseModal.get('isOpen'),
  question: state.TextResponseModal.get('question').toJS(),
  answer: state.TextResponseModal.get('answer').toJS(),
  filterId: state.TextResponseModal.get('filterId'),
  textResponses: state.SurveyResponse.get('textResponses').toJS(),
  textResponsePagination: state.SurveyResponse
    .get('textResponsePagination')
    .toJS()
});

const mapDispatchToProps = dispatch => ({
  dismissTextResponseModal() {
    dispatch(dismissTextResponseModal());
  },
  excludeInterview(surveyId, interviewId) {
    const interview = { interviewId, excluded: true };
    dispatch(updateInterview(surveyId, interview));
  },
  fetchTextResponses(questionId, answerId, filterId, page) {
    dispatch(
      fetchTextResponses(questionId, answerId, filterId, null, page)
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TextResponseModalCtnr
);
