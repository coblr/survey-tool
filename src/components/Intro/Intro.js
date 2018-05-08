import React from 'react';
import PropTypes from 'prop-types';

import './Intro.css';

export class Intro extends React.PureComponent {
  render() {
    return (
      <div className="Intro" style={{ visibility: 'hidden' }}>
        <div className="Intro_box">
          <h3 className="Intro_title">Loading...</h3>
          <img
            className="Intro_spinner"
            src="/assets/spinner.gif"
            alt="loading spinner"
          />
        </div>
      </div>
    );
  }
}

Intro.propTypes = {
  authenticated: PropTypes.bool
};

export default Intro;
