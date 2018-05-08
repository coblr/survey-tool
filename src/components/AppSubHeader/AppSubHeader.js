import React from 'react';
import PropTypes from 'prop-types';

import FeatureToggles from '../../helpers/FeatureToggles';

import './AppSubHeader.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import InlineEditorCtnr from '../../containers/InlineEditorCtnr/InlineEditorCtnr';

export class AppSubHeader extends React.PureComponent {
  render() {
    const {
      surveyId,
      iconId,
      title,
      editable,
      showCreateBtn,
      updatingSurveys,
      openCreateSurveyModal,
      updateSurvey
    } = this.props;

    return (
      <section
        className="AppSubHeader"
        style={{ visibility: 'hidden' }}>
        <div className="AppSubHeader_container container">
          <div className="AppSubHeader_titleWrapper">
            <SVGIcon iconId={iconId} className="AppSubHeader_icon" />
            <h2 id="info-pageTitle" className="AppSubHeader_title">
              {!editable || !FeatureToggles.SURVEY_MGMT_ENABLED ? (
                <span>{title}</span>
              ) : (
                <InlineEditorCtnr
                  editorId="appSubHeaderTitle"
                  value={title}
                  onSubmit={value =>
                    updateSurvey(surveyId, { title: value })}
                  saving={updatingSurveys[surveyId]}>
                  {title}
                </InlineEditorCtnr>
              )}
            </h2>
          </div>
          <div className="AppSubHeader_actionWrapper">
            {showCreateBtn && (
              <button
                id="btn-launchCreateSurveyModal"
                className="AppSubHeader_actionBtn"
                onClick={() => openCreateSurveyModal()}>
                <SVGIcon
                  iconId="add-plus-lg"
                  className="AppSubHeader_actionBtnIcon"
                />
                Create a New Survey
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }
}

AppSubHeader.propTypes = {
  surveyId: PropTypes.string,
  iconId: PropTypes.string,
  title: PropTypes.string,
  editable: PropTypes.bool,
  showCreateBtn: PropTypes.bool,
  openCreateSurveyModal: PropTypes.func,
  onSubmit: PropTypes.func,
  updatingSurveys: PropTypes.object,
  updateSurvey: PropTypes.func
};

export default AppSubHeader;
