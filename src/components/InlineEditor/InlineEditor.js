import React from 'react';
import PropTypes from 'prop-types';

import './InlineEditor.css';
import SVGIcon from '../../components/SVGIcon/SVGIcon';
import Throbber from '../../components/Throbber/Throbber';

export class InlineEditor extends React.PureComponent {
  componentDidUpdate() {
    const { editorId, isEditing } = this.props;

    if (this.inlineInput && isEditing[editorId]) {
      this.inlineInput.focus();
    }
  }

  render() {
    let { editorId, isEditing, editorErrors, saving } = this.props;

    isEditing = isEditing[editorId];

    return (
      <div className="InlineEditor" style={{ visibility: 'hidden' }}>
        {editorErrors[editorId] && (
          <small className="InlineEditor_error">
            {editorErrors[editorId].join(' ')}
          </small>
        )}
        <Throbber className="InlineEditor_throbber" show={saving} />
        {!saving &&
          (isEditing ? this.renderEditor() : this.renderOrigValue())}
      </div>
    );
  }

  renderOrigValue() {
    const { children, value, showEditor, editorId } = this.props;

    return (
      <div className="InlineEditor_origValue">
        {children || value}
        <button
          className="InlineEditor_toggle"
          onClick={() => showEditor(editorId)}>
          <SVGIcon
            iconId="editpencil-l-lg"
            className="InlineEditor_toggleIcon"
          />
        </button>
      </div>
    );
  }

  renderEditor() {
    const {
      value,
      onChange,
      onSave,
      onKeyUp,
      updatedValues,
      editorId
    } = this.props;

    if (updatedValues[editorId] === undefined) return;

    return (
      <div className="InlineEditor_editor">
        <input
          type="text"
          className="InlineEditor_input"
          ref={el => (this.inlineInput = el)}
          placeholder={value}
          defaultValue={updatedValues[editorId]}
          onChange={e => onChange(e.target.value)}
          onBlur={() => onSave()}
          onKeyUp={e => onKeyUp(e.keyCode)}
        />
      </div>
    );
  }
}

InlineEditor.propTypes = {
  editorId: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string, // when just a straight string
    PropTypes.object // when another text display component
  ]),
  saving: PropTypes.bool,
  isEditing: PropTypes.object,
  updatedValues: PropTypes.object,
  editorErrors: PropTypes.object,
  showEditor: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onSave: PropTypes.func
};

export default InlineEditor;
