import React from 'react';
import PropTypes from 'prop-types';

import './TextRanking.css';

export class TextRanking extends React.PureComponent {
  render() {
    const { question } = this.props;
    return (
      <div className="TextRanking" style={{ visibility: 'hidden' }}>
        <div className="TextRanking_optionCol">
          {question.answers.map((answer, i) => (
            <div key={i} className="TextRanking_option">
              {answer.text}
              <small className="TextRanking_anchorTag">
                {answer.anchored ? '[anchored]' : ''}
              </small>
            </div>
          ))}
        </div>
        <div className="TextRanking_rankCol">
          <div className="TextRanking_rankBox">1</div>
          <div className="TextRanking_rankBox">2</div>
          <div className="TextRanking_rankBox">3</div>
          <div className="TextRanking_rankBox">4</div>
        </div>
      </div>
    );
  }
}

TextRanking.propTypes = {
  question: PropTypes.object
};

export default TextRanking;
