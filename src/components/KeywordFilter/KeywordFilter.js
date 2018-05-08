import React from 'react';
import PropTypes from 'prop-types';

import './KeywordFilter.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class KeywordFilter extends React.PureComponent {
  render() {
    const { onFilterUpdate, keywords } = this.props;

    return (
      <div className="KeywordFilter" style={{ visibility: 'hidden' }}>
        <div className="KeywordFilter_inputWrapper">
          <SVGIcon
            iconId="search-lg"
            className="KeywordFilter_inputIcon"
          />
          <input
            type="text"
            className="KeywordFilter_input"
            onChange={e => onFilterUpdate(e.target.value)}
            placeholder="Search your surveys..."
            value={keywords}
          />
          <button
            className="KeywordFilter_clearBtn"
            onClick={() => onFilterUpdate('')}>
            <SVGIcon
              iconId="closex-thick-lg"
              className="KeywordFilter_clearIcon"
            />
          </button>
        </div>
      </div>
    );
  }
}

KeywordFilter.propTypes = {
  onFilterUpdate: PropTypes.func,
  keywords: PropTypes.string
};

export default KeywordFilter;
