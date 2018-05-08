import React from 'react';
import PropTypes from 'prop-types';

import './TextReport.css';

export class TextReport extends React.PureComponent {
  render() {
    const {
      question,
      recentTextResponses,
      openTextResponseModal,
      interviewId,
      filter
    } = this.props;
    const answer = question.counts[0].answer;

    let responseList = recentTextResponses[answer.id];
    if (responseList && interviewId) {
      responseList = responseList.filter(
        r => r.interviewId === interviewId
      );
    }

    return (
      <div className="TextReport" style={{ visibility: 'hidden' }}>
        <table className="TextReport_table">
          {!interviewId &&
            question.responseCount > 0 && (
              <thead className="TextReport_tableHead">
                <tr>
                  <th className="TextReport_headerCell">
                    Most Recent Open-ended Answers
                  </th>
                </tr>
              </thead>
            )}
          <tbody>
            {responseList &&
              responseList.slice(0, 5).map((c, i) => {
                return (
                  <tr key={i}>
                    <td className="TextReport_answerCell">
                      {`"${c.answer.text}"`}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          {!interviewId && (
            <tfoot className="TextReport_tableFoot">
              <tr>
                <td className="TextReport_totalCell">
                  {question.responseCount} Responses
                  {question.responseCount > 1 && (
                    <button
                      className="TextReport_viewAllBtn"
                      onClick={() =>
                        openTextResponseModal(
                          question,
                          answer,
                          filter.id
                        )}>
                      View All
                    </button>
                  )}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    );
  }
}

TextReport.propTypes = {
  question: PropTypes.object,
  recentTextResponses: PropTypes.object,
  openTextResponseModal: PropTypes.func,
  interviewId: PropTypes.string,
  filter: PropTypes.object
};

export default TextReport;
