import React from 'react';
import PropTypes from 'prop-types';

export class CharacterCount extends React.PureComponent {
  render() {
    const { input, limit } = this.props;
    const length = input.length;

    let characterCount = (
      <span>{limit - length} characters remaining.</span>
    );
    if (length > limit) {
      characterCount = (
        <span>Too long by {length - limit} characters.</span>
      );
    }
    return characterCount;
  }
}

CharacterCount.propTypes = {
  input: PropTypes.string,
  limit: PropTypes.number
};

export default CharacterCount;
