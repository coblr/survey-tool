import React from 'react';
import PropTypes from 'prop-types';

import './QuestionActionNav.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class QuestionActionNav extends React.PureComponent {
  render() {
    const { collapseAllQuestions, expandAllQuestions } = this.props;

    return (
      <div
        className="QuestionActionNav"
        style={{ visibility: 'hidden' }}>
        <a
          className="QuestionActionNav_item"
          onClick={() => collapseAllQuestions()}>
          <SVGIcon
            iconId="arrow-double-u-lg"
            className="QuestionActionNav_itemIcon"
          />
          Collapse Questions
        </a>
        <a
          className="QuestionActionNav_item"
          onClick={() => expandAllQuestions()}>
          <SVGIcon
            iconId="arrow-double-d-lg"
            className="QuestionActionNav_itemIcon"
          />
          Expand Questions
        </a>
      </div>
    );
  }
}

QuestionActionNav.propTypes = {
  collapseAllQuestions: PropTypes.func,
  expandAllQuestions: PropTypes.func
};

export default QuestionActionNav;
