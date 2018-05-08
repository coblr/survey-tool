import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './FilterSelector.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class FilterSelector extends React.PureComponent {
  render() {
    const {
      surveyId,
      surveyFilters,
      mappingId,
      currentFilters,
      onSelect
    } = this.props;
    let filters = surveyFilters[surveyId];
    const currentFilter = currentFilters[mappingId] || null;

    // nasty hack to not show filters for individual
    // reports in this selector.
    //TODO: make this better/more dynamic
    if (filters) {
      filters = filters.filter(f => f.title !== 'INDIVIDUAL');
    }

    if (!filters || !filters.length || filters.length <= 1)
      return null;

    return (
      <div
        className="FilterSelector"
        style={{ visibility: 'hidden' }}>
        <div className="FilterSelector_toggle">
          My Reports
          <span className="FilterSelector_badge">
            {filters.length}
          </span>
          <SVGIcon
            iconId="select-arrow"
            className="FilterSelector_icon"
          />
        </div>
        <div className="FilterSelector_menuWrapper">
          <div className="FilterSelector_reportMenu">
            {filters.map((filter, i) => {
              const itemClass = ['FilterSelector_reportItem'];

              if (currentFilter && filter.id === currentFilter.id) {
                itemClass.push('FilterSelector_reportItem--selected');
              }

              return (
                <Link
                  key={i}
                  className={itemClass.join(' ')}
                  to={`/surveys/${surveyId}/reports/realtime/${filter.id}`}
                  onClick={() => onSelect(filter.id)}>
                  <SVGIcon
                    iconId="report"
                    className="FilterSelector_reportItemIcon"
                  />
                  {filter.title || `Report ${i}`}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

FilterSelector.propTypes = {
  surveyId: PropTypes.string,
  surveyFilters: PropTypes.object,
  filterMappings: PropTypes.object,
  mappingId: PropTypes.string,
  onSelect: PropTypes.func,
  currentFilters: PropTypes.object
};

export default FilterSelector;
