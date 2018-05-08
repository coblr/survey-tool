import React from 'react';
import PropTypes from 'prop-types';

import './ChartSelector.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class ChartSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleChart(chart) {
    this.props.toggleChart(chart);
    this.setState({ isOpen: false });
  }

  render() {
    const {
      className,
      label,
      iconId,
      supportedCharts,
      selectedCharts
    } = this.props;

    const { isOpen } = this.state;

    const flyoutClass = ['ChartSelector_flyout'];
    if (isOpen) {
      flyoutClass.push('ChartSelector_flyout--open');
    }

    const btnClassMap = {
      table: ['ChartSelector_selectBtn'],
      column: ['ChartSelector_selectBtn'],
      pie: ['ChartSelector_selectBtn']
    };

    if (selectedCharts) {
      selectedCharts.forEach(chart => {
        btnClassMap[chart].push('ChartSelector_selectBtn--selected');
      });
    }

    return (
      <div className="ChartSelector" style={{ visibility: 'hidden' }}>
        <button
          className={`ChartSelector_toggle ${className}`}
          onClick={() => this.setState({ isOpen: !isOpen })}>
          <SVGIcon
            iconId={iconId}
            className="SurveyQuestionReport_actionIcon"
          />
          {label}
        </button>
        <div className={flyoutClass.join(' ')}>
          {supportedCharts.indexOf('table') > -1 && (
            <button
              id="btn_showTableChart"
              className={btnClassMap.table.join(' ')}
              onClick={() => this.toggleChart('table')}>
              <SVGIcon
                iconId="bar-chart"
                className="ChartSelector_selectIcon"
              />
              Table
            </button>
          )}
          {supportedCharts.indexOf('column') > -1 && (
            <button
              id="btn_showColumnChart"
              className={btnClassMap.column.join(' ')}
              onClick={() => this.toggleChart('column')}>
              <SVGIcon
                iconId="column-chart"
                className="ChartSelector_selectIcon"
              />
              Column
            </button>
          )}
          {supportedCharts.indexOf('pie') > -1 && (
            <button
              id="btn_showPieChart"
              className={btnClassMap.pie.join(' ')}
              onClick={() => this.toggleChart('pie')}>
              <SVGIcon
                iconId="chart-pie"
                className="ChartSelector_selectIcon"
              />
              Pie
            </button>
          )}
        </div>
      </div>
    );
  }
}

ChartSelector.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  iconId: PropTypes.string,
  onSelect: PropTypes.func,
  toggleChart: PropTypes.func,
  supportedCharts: PropTypes.array,
  selectedCharts: PropTypes.array
};

export default ChartSelector;
