import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Paginator.css';

import SVGIcon from '../SVGIcon/SVGIcon';

export class Paginator extends React.PureComponent {
  gotoPrevPage() {
    const { config: { number }, onChange } = this.props;
    if (number - 1 >= 0) {
      onChange(number - 1);
    }
  }

  gotoNextPage() {
    const { config: { number, totalPages }, onChange } = this.props;
    if (number < totalPages - 1) {
      onChange(number + 1);
    }
  }

  render() {
    const {
      config: { first, last, number, totalPages },
      onChange
    } = this.props;

    const prevClass = ['Paginator_prevBtn'];
    if (first) {
      prevClass.push('Paginator_prevBtn--disabled');
    }

    const nextClass = ['Paginator_nextBtn'];
    if (last) {
      nextClass.push('Paginator_nextBtn--disabled');
    }

    if (totalPages <= 1) return null;
    return (
      <div className="Paginator" style={{ visibility: 'hidden' }}>
        <button
          className={prevClass.join(' ')}
          onClick={() => this.gotoPrevPage()}>
          <SVGIcon
            iconId="arrow-single-l-lg"
            className="Paginator_icon"
          />
        </button>
        {_.fill(Array(totalPages), 0).map((page, i) => {
          const pageClass = ['Paginator_page'];
          if (i === number) {
            pageClass.push('Paginator_page--selected');
          }

          return (
            <button
              key={i}
              className={pageClass.join(' ')}
              onClick={() => onChange(i)}>
              {i + 1}
            </button>
          );
        })}
        <button
          className={nextClass.join(' ')}
          onClick={() => this.gotoNextPage()}>
          <SVGIcon
            iconId="arrow-single-r-lg"
            className="Paginator_icon"
          />
        </button>
      </div>
    );
  }
}

Paginator.propTypes = {
  config: PropTypes.object,
  onChange: PropTypes.func
};

export default Paginator;
