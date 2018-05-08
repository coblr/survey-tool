import React from 'react';
import PropTypes from 'prop-types';

export class EllipsedText extends React.PureComponent {
  render() {
    const { children: input, length } = this.props;
    const maxLength = +length;

    let ellipsedText = input;
    if (input.length > maxLength) {
      ellipsedText = `${input.substr(0, maxLength)}...`;
    }

    return <span className="EllipsedText">{ellipsedText}</span>;
  }
}

EllipsedText.propTypes = {
  children: PropTypes.string,
  length: PropTypes.string
};

export default EllipsedText;
