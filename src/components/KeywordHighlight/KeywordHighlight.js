import React from 'react';
import PropTypes from 'prop-types';

export class KeywordHighlight extends React.PureComponent {
  render() {
    const { children: input, regex, highlightClass } = this.props;
    const split = input.split(regex);

    return (
      <span className="KeywordHighlight">
        {split.map((frag, i) => {
          if (frag.match(regex)) {
            return (
              <span key={i} className={highlightClass}>
                {frag}
              </span>
            );
          }
          return frag;
        })}
      </span>
    );
  }
}

KeywordHighlight.propTypes = {
  children: PropTypes.string,
  regex: PropTypes.object,
  highlightClass: PropTypes.string
};

export default KeywordHighlight;
