import React from 'react';
import PropTypes from 'prop-types';

import './ThankYouPage.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class ThankYouPage extends React.PureComponent {
  render() {
    const { survey, editorIsOpen, openEditor } = this.props;

    return (
      <div
        id="ThankYouPage"
        className="ThankYouPage"
        style={{ visibility: 'hidden' }}>
        <div className="ThankYouPage_header">
          <SVGIcon
            iconId="document-lg"
            className="ThankYouPage_headerIcon"
          />
          <div className="ThankYouPage_title">Thank You Page</div>
          <FeatureToggle feature="SURVEY_MGMT_ENABLED">
            <div className="ThankYouPage_actions">
              {!survey.locked &&
                !survey.inProject && (
                  <button
                    className="ThankYouPage_editBtn"
                    onClick={() => openEditor()}>
                    <SVGIcon
                      iconId="editpencil-l-lg"
                      className="ThankYouPage_editIcon"
                    />
                  </button>
                )}
            </div>
          </FeatureToggle>
        </div>
        {!editorIsOpen && this.renderPreview()}
        {!survey.locked && editorIsOpen && this.renderEditor()}
      </div>
    );
  }

  renderPreview() {
    const { survey } = this.props;

    let message = survey.thankYouConclusion.message;
    const redirectUrl = survey.thankYouConclusion.redirectUrl;
    const includeParams = survey.thankYouConclusion.includeParams;

    return (
      <div className="ThankYouPage_body">
        {!!message && (
          <pre className="ThankYouPage_message">{message}</pre>
        )}
        {!!redirectUrl && (
          <p>
            Redirecting to: {redirectUrl}
            <br />
            {includeParams ? 'Including' : 'Not Including'} URL
            Variables
          </p>
        )}
      </div>
    );
  }

  renderEditor() {
    const {
      closeEditor,
      includeParams,
      onChange,
      thankYouType,
      message,
      redirectUrl,
      // postUrl,
      onSubmit,
      editorErrors
    } = this.props;

    return (
      <div id="ThankYouPage" className="ThankYouPage_editor">
        <div className="ThankYouPage_editorHeader">
          <div className="ThankYouPage_editorTitle">Edit</div>
        </div>
        <div className="ThankYouPage_editorBody">
          {!!editorErrors.length &&
            editorErrors.map((err, i) => (
              <p key={i} className="error">
                {err}
              </p>
            ))}
          <div className="ThankYouPage_editSection">
            <label className="ThankYouPage_editLabel">
              <input
                type="radio"
                value="message"
                id="btn_showThankYouMessage"
                name="thankYouConclusion"
                className="ThankYouPage_radiobox"
                checked={thankYouType === 'message'}
                onChange={() => onChange('thankYouType', 'message')}
              />
              Show this message:
            </label>
            <textarea
              className="ThankYouPage_input"
              value={message}
              onChange={e => onChange('message', e.target.value)}
              disabled={thankYouType !== 'message'}
            />
          </div>
          <div className="ThankYouPage_editSection">
            <label className="ThankYouPage_editLabel">
              <input
                type="radio"
                value="redirect"
                id="btn_redirectThankYou"
                name="thankYouConclusion"
                className="ThankYouPage_radiobox"
                checked={thankYouType === 'redirect'}
                onChange={() => onChange('thankYouType', 'redirect')}
              />
              Redirect User To:
            </label>
            <input
              type="text"
              className="ThankYouPage_input"
              value={redirectUrl}
              onChange={e => onChange('redirectUrl', e.target.value)}
              disabled={thankYouType !== 'redirect'}
            />
            <label className="ThankYouPage_editLabel">
              <input
                type="checkbox"
                id="btn_includeUrlParams"
                className="ThankYouPage_radiobox"
                checked={includeParams}
                onChange={() =>
                  onChange('includeParams', !includeParams)}
                disabled={thankYouType !== 'redirect'}
              />
              Return all variables that were appended to survey URL
            </label>
          </div>
          {/*
          <div className="ThankYouPage_editSection">
            <label className="ThankYouPage_editLabel">
              Post Interview Data to:
            </label>
            <input
              type="text"
              className="ThankYouPage_input"
              value={postUrl}
              onChange={(e) => onChange('postUrl', e.target.value)} />
          </div>
          */}
        </div>
        <div className="ThankYouPage_editFooter">
          <div className="ThankYouPage_editFooterLeft">
            <button
              type="button"
              className="ThankYouPage_cancel"
              onClick={() => closeEditor()}>
              Cancel
            </button>
          </div>
          <div className="ThankYouPage_editFooterRight">
            <button
              type="button"
              className="ThankYouPage_save"
              onClick={() => onSubmit()}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ThankYouPage.propTypes = {
  survey: PropTypes.object,
  locked: PropTypes.bool,
  page: PropTypes.object,
  editorIsOpen: PropTypes.bool,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
  includeParams: PropTypes.bool,
  onChange: PropTypes.func,
  thankYouType: PropTypes.string,
  message: PropTypes.string,
  redirectUrl: PropTypes.string,
  // postUrl: PropTypes.string,
  onSubmit: PropTypes.func,
  editorErrors: PropTypes.array
};

export default ThankYouPage;
