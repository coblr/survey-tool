import React from 'react';
import PropTypes from 'prop-types';

import './TextRankingReport.css';

export class TextRankingReport extends React.PureComponent {
  render() {
    const { question } = this.props;
    return (
      <div
        className="TextRankingReport"
        style={{ visibility: 'hidden' }}>
        <div className="TextRankingReport_optionCol">
          {question.answers.map((answer, i) => (
            <div key={i} className="TextRankingReport_option">
              {answer.text}
              <small className="TextRankingReport_anchorTag">
                {answer.anchored ? '[anchored]' : ''}
              </small>
            </div>
          ))}
        </div>
        <div className="TextRankingReport_rankCol">
          <div className="TextRankingReport_rankBox">1</div>
          <div className="TextRankingReport_rankBox">2</div>
          <div className="TextRankingReport_rankBox">3</div>
          <div className="TextRankingReport_rankBox">4</div>
        </div>
      </div>
    );
  }
}

TextRankingReport.propTypes = {
  question: PropTypes.object
};

export default TextRankingReport;
