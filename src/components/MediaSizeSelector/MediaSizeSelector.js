import React from 'react';
import PropTypes from 'prop-types';

import './MediaSizeSelector.css';

export class MediaSizeSelector extends React.PureComponent {
  render() {
    const buttonClasses = {
      SMALL: ['MediaSizeSelector_sizeBtn'],
      MEDIUM: ['MediaSizeSelector_sizeBtn'],
      LARGE: ['MediaSizeSelector_sizeBtn'],
      ORIGINAL: ['MediaSizeSelector_sizeBtn']
    };
    if (this.props.selected) {
      buttonClasses[this.props.selected].push(
        'MediaSizeSelector_sizeBtn--selected'
      );
    }

    return (
      <div className="MediaSizeSelector">
        <button
          type="button"
          className={buttonClasses.SMALL.join(' ')}
          onClick={() => this.props.onSelect('SMALL')}>
          Small
        </button>
        <button
          type="button"
          className={buttonClasses.MEDIUM.join(' ')}
          onClick={() => this.props.onSelect('MEDIUM')}>
          Medium
        </button>
        <button
          type="button"
          className={buttonClasses.LARGE.join(' ')}
          onClick={() => this.props.onSelect('LARGE')}>
          Large
        </button>
        <button
          type="button"
          className={buttonClasses.ORIGINAL.join(' ')}
          onClick={() => this.props.onSelect('ORIGINAL')}>
          Original
        </button>
      </div>
    );
  }
}

MediaSizeSelector.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.string
};

export default MediaSizeSelector;
