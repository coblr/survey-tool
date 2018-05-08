import React from 'react';
import PropTypes from 'prop-types';

import './TerminatePage.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class TerminatePage extends React.PureComponent {
  render() {
    const { survey, editorIsOpen, openEditor } = this.props;

    return (
      <div
        id="TerminatePage"
        className="TerminatePage"
        style={{ visibility: 'hidden' }}>
        <div className="TerminatePage_header">
          <SVGIcon
            iconId="document-lg"
            className="TerminatePage_headerIcon"
          />
          <div className="TerminatePage_title">Terminate Page</div>
          <FeatureToggle feature="SURVEY_MGMT_ENABLED">
            <div className="TerminatePage_actions">
              {!survey.locked &&
                !survey.inProject && (
                  <button
                    className="TerminatePage_editBtn"
                    onClick={() => openEditor()}>
                    <SVGIcon
                      iconId="editpencil-l-lg"
                      className="TerminatePage_editIcon"
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

    let message = survey.terminateConclusion.message;
    const redirectUrl = survey.terminateConclusion.redirectUrl;
    const includeParams = survey.terminateConclusion.includeParams;

    return (
      <div className="TerminatePage_body">
        {!!message && (
          <pre className="TerminatePage_message">{message}</pre>
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
      terminateType,
      message,
      redirectUrl,
      // postUrl,
      onSubmit,
      editorErrors
    } = this.props;

    return (
      <div id="TerminatePage" className="TerminatePage_editor">
        <div className="TerminatePage_editorHeader">
          <div className="TerminatePage_editorTitle">Edit</div>
        </div>
        <div className="TerminatePage_editorBody">
          {!!editorErrors.length &&
            editorErrors.map((err, i) => (
              <p key={i} className="error">
                {err}
              </p>
            ))}
          <div className="TerminatePage_editSection">
            <label className="TerminatePage_editLabel">
              <input
                type="radio"
                value="message"
                id="btn_showTerminateMessage"
                name="terminateConclusion"
                className="TerminatePage_radiobox"
                checked={terminateType === 'message'}
                onChange={() => onChange('terminateType', 'message')}
              />
              Show this message:
            </label>
            <textarea
              className="TerminatePage_input"
              value={message}
              onChange={e => onChange('message', e.target.value)}
              disabled={terminateType !== 'message'}
            />
          </div>
          <div className="TerminatePage_editSection">
            <label className="TerminatePage_editLabel">
              <input
                type="radio"
                value="redirect"
                id="btn_redirectTerminate"
                name="terminateConclusion"
                className="TerminatePage_radiobox"
                checked={terminateType === 'redirect'}
                onChange={() => onChange('terminateType', 'redirect')}
              />
              Redirect User To:
            </label>
            <input
              type="text"
              className="TerminatePage_input"
              value={redirectUrl}
              onChange={e => onChange('redirectUrl', e.target.value)}
              disabled={terminateType !== 'redirect'}
            />
            <label className="TerminatePage_editLabel">
              <input
                type="checkbox"
                id="btn_includeUrlParams"
                className="TerminatePage_radiobox"
                checked={includeParams}
                onChange={() =>
                  onChange('includeParams', !includeParams)}
                disabled={terminateType !== 'redirect'}
              />
              Return all variables that were appended to survey URL
            </label>
          </div>
          {/*
          <div className="TerminatePage_editSection">
            <label className="TerminatePage_editLabel">
              Post Interview Data to:
            </label>
            <input
              type="text"
              className="TerminatePage_input"
              value={postUrl}
              onChange={(e) => onChange('postUrl', e.target.value)} />
          </div>
          */}
        </div>
        <div className="TerminatePage_editFooter">
          <div className="TerminatePage_editFooterLeft">
            <button
              type="button"
              className="TerminatePage_cancel"
              onClick={() => closeEditor()}>
              Cancel
            </button>
          </div>
          <div className="TerminatePage_editFooterRight">
            <button
              type="button"
              className="TerminatePage_save"
              onClick={() => onSubmit()}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TerminatePage.propTypes = {
  survey: PropTypes.object,
  locked: PropTypes.bool,
  page: PropTypes.object,
  editorIsOpen: PropTypes.bool,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
  includeParams: PropTypes.bool,
  onChange: PropTypes.func,
  terminateType: PropTypes.string,
  message: PropTypes.string,
  redirectUrl: PropTypes.string,
  // postUrl: PropTypes.string,
  onSubmit: PropTypes.func,
  editorErrors: PropTypes.array
};

export default TerminatePage;
