import React from 'react';
import PropTypes from 'prop-types';

import './DropDownList.css';

export class DropDownList extends React.PureComponent {
  render() {
    const { question } = this.props;
    return (
      <div className="DropDownList" style={{ visibility: 'hidden' }}>
        <div className="DropDownList_header">- Please Select -</div>
        <ul className="DropDownList_answers">
          {question.answers.map((answer, i) => (
            <li key={i} className="DropDownList_answerItem">
              {answer.text}
              <small className="DropDownList_anchorTag">
                {answer.anchored ? '[anchored]' : ''}
              </small>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

DropDownList.propTypes = {
  question: PropTypes.object
};

export default DropDownList;
