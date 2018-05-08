import React from 'react';
import PropTypes from 'prop-types';

import './Throbber.css';

export class Throbber extends React.PureComponent {
  render() {
    const { className, show, text, textOnly } = this.props;

    const throbberClass = ['Throbber'];
    if (show) {
      throbberClass.push('Throbber--show');
    }
    throbberClass.push(className);

    const iconClass = ['Throbber_icon'];
    if (show) {
      iconClass.push('Throbber_icon--show');
    }

    const textClass = ['Throbber_text'];
    if (show) {
      textClass.push('Throbber_text--show');
    }

    return (
      <div
        className={throbberClass.join(' ')}
        style={{ visibility: 'hidden' }}>
        {!textOnly && (
          <div className={iconClass.join(' ')}>
            <img
              src="/assets/spinner.gif"
              alt="Spinner Graphic"
              className="Throbber_iconImg"
            />
          </div>
        )}
        {text && <p className={textClass.join(' ')}>{text}</p>}
      </div>
    );
  }
}

Throbber.propTypes = {
  className: PropTypes.string,
  show: PropTypes.any,
  text: PropTypes.string,
  textOnly: PropTypes.bool
};

export default Throbber;
