import React from 'react';
import PropTypes from 'prop-types';

import './PageDivider.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class PageDivider extends React.PureComponent {
  render() {
    const { createPage, isCreating } = this.props;

    return (
      <div className="PageDivider">
        <FeatureToggle feature="SURVEY_MGMT_ENABLED">
          <button
            className="PageDivider_button"
            onClick={() => createPage()}
            disabled={isCreating}>
            <SVGIcon
              iconId="document-new-lg"
              className="PageDivider_icon"
            />
            Insert Page
          </button>
        </FeatureToggle>
      </div>
    );
  }
}

PageDivider.propTypes = {
  createPage: PropTypes.func,
  isCreating: PropTypes.bool
};

export default PageDivider;
