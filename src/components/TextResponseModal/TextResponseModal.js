import React from 'react';
import PropTypes from 'prop-types';

import './TextResponseModal.css';
import Paginator from '../Paginator/Paginator';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class TextResponseModal extends React.PureComponent {
  render() {
    const {
      question,
      answer,
      responses,
      gotoInterview,
      excludeInterview,
      filterId,
      textResponsePagination,
      fetchTextResponses
    } = this.props;
    const { questionId } = question;
    const answerId = answer.id;
    const pageConfig = textResponsePagination[answerId];

    return (
      <div
        className="TextResponseModal"
        style={{ visibility: 'hidden' }}>
        <h3 className="TextResponseModal_question">
          {question.text}
        </h3>
        <div>
          <table className="TextResponseModal_table">
            <thead className="TextResponseModal_thead">
              <tr>
                <th className="TextResponseModal_idCol">ID</th>
                <th className="TextResponseModal_responseCol">
                  Response
                </th>
                <th className="TextResponseModal_actionCol" />
              </tr>
            </thead>
            <tbody className="TextResponseModal_tbody">
              {responses &&
                responses.map((response, i) => {
                  const interviewId = response.interviewId;
                  const surveyId = response.surveyId;

                  return (
                    <tr key={i}>
                      <td className="TextResponseModal_idCol">
                        <a
                          className="TextResponseModal_link"
                          onClick={() =>
                            gotoInterview(surveyId, interviewId)}>
                          {interviewId}
                        </a>
                      </td>
                      <td className="TextResponseModal_responseCol">
                        {`"${response.answer.text ||
                          '[empty response]'}"`}
                      </td>
                      <td className="TextResponseModal_actionCol">
                        <FeatureToggle feature="REPORT_MGMT_ENABLED">
                          <button
                            className="TextResponseModal_excludeBtn"
                            onClick={() =>
                              excludeInterview(
                                surveyId,
                                interviewId
                              )}>
                            Exclude
                          </button>
                        </FeatureToggle>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            {pageConfig &&
              pageConfig.totalPages > 1 && (
                <tfoot className="TextResponseModal_tfoot">
                  <tr>
                    <td colSpan="3">
                      <Paginator
                        config={textResponsePagination[answerId]}
                        onChange={pg =>
                          fetchTextResponses(
                            questionId,
                            answerId,
                            filterId,
                            pg
                          )}
                      />
                    </td>
                  </tr>
                </tfoot>
              )}
          </table>
        </div>
      </div>
    );
  }
}

TextResponseModal.propTypes = {
  params: PropTypes.object,
  question: PropTypes.object,
  answer: PropTypes.object,
  filterId: PropTypes.string,
  responses: PropTypes.array,
  gotoInterview: PropTypes.func,
  excludeInterview: PropTypes.func,
  textResponsePagination: PropTypes.object,
  fetchTextResponses: PropTypes.func
};

export default TextResponseModal;
