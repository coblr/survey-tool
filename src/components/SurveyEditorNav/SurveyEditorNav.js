import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SurveyEditorNav.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveyEditorNav extends React.PureComponent {
  render() {
    const { surveyId, location } = this.props;

    const classNames = {
      build: 'SurveyEditorNav_navItem',
      layout: 'SurveyEditorNav_navItem',
      settings: 'SurveyEditorNav_navItem'
    };

    if (location) {
      let active = location.pathname.split('/').pop();
      if (active.match(/^(reorder)$/)) {
        active = 'build';
      }
      classNames[active] += ' SurveyEditorNav_navItem--selected';
    }

    if (!surveyId) return null;
    return (
      <div
        className="SurveyEditorNav"
        style={{ visibility: 'hidden' }}>
        <div className="container">
          <Link
            to={`/surveys/${surveyId}/build`}
            className={classNames.build}>
            Survey Builder
          </Link>
          <Link
            to={`/surveys/${surveyId}/build/layout`}
            className={classNames.layout}>
            Survey Layout
          </Link>
          <Link
            to={`/surveys/${surveyId}/build/settings`}
            className={classNames.settings}>
            Survey Settings
          </Link>
          {1 === 0 && (
            <a className="SurveyEditorNav_actionItem">
              <SVGIcon
                iconId="print2"
                className="SurveyEditorNav_icon"
              />
              Print
            </a>
          )}
        </div>
      </div>
    );
  }
}

SurveyEditorNav.propTypes = {
  surveyId: PropTypes.string,
  location: PropTypes.object
};

export default SurveyEditorNav;
