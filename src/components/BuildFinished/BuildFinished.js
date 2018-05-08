import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BuildFinished.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class BuildFinished extends React.PureComponent {
  render() {
    return (
      <div className="BuildFinished" style={{ visibility: 'hidden' }}>
        <div className="BuildFinished_top">
          <div className="BuildFinished_title">
            Finished building your survey? Go on to the next step
          </div>
          <div style={{ display: 'inline-block' }}>
            <SVGIcon
              iconId="arrow-r-lg"
              className="BuildFinished_icon"
            />
          </div>
          <div style={{ display: 'inline-block' }}>
            <Link
              className="BuildFinished_promoteBtn"
              to={`/surveys/${this.props.surveyId}/promote`}>
              <SVGIcon
                iconId="promote"
                className="BuildFinished_promoteBtnIcon"
              />
              Promote
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

BuildFinished.propTypes = {
  surveyId: PropTypes.string
};

export default BuildFinished;
