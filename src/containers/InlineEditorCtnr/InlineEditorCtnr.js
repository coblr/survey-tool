import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InlineEditor from '../../components/InlineEditor/InlineEditor';

import {
  showEditor,
  hideEditor,
  updateValue,
  validateValue
} from '../../store/ui/InlineEditor';

export class InlineEditorCtnr extends React.PureComponent {
  componentWillUpdate(nextProps) {
    const {
      editorId,
      isEditing,
      updatedValues,
      updateValue
    } = this.props;
    const { value: nextValue } = nextProps;

    if (
      !isEditing[editorId] &&
      updatedValues[editorId] !== nextValue &&
      !!nextValue
    ) {
      updateValue(editorId, nextValue);
    }
  }

  componentDidUpdate(prevProps) {
    const { editorId, isEditing, value, hideEditor } = this.props;

    // if the user has left the editor open but selected
    // another survey, we need to close the editor.
    // but only toggle closed if we were actually editing
    // otherwise it'll be open every 2nd survey selection.
    const editing = isEditing[editorId];
    if (value !== prevProps.value && editing) {
      hideEditor(editorId);
    }
  }

  componentWillUnmount() {
    // don't leave editors in the edit state.
    // just cancel out of the change.
    this.props.hideEditor(this.props.editorId);
  }

  onKeyUp(code) {
    switch (code) {
      case 27:
        this.onCancel();
        break; // esc
      case 13:
        this.onSave();
        break; // enter
      // no default
    }
  }

  onChange(value) {
    const validateRules = {
      notEmpty: true,
      maxLength: 100
    };

    this.props.updateValue(this.props.editorId, value);
    this.props.validateValue(this.props.editorId, validateRules);
  }

  onSave() {
    const {
      editorId,
      updatedValues,
      editorErrors,
      onSubmit,
      hideEditor
    } = this.props;

    if (!editorErrors[editorId]) {
      onSubmit(updatedValues[editorId]);
      hideEditor(editorId);
    }
  }

  onCancel() {
    this.props.hideEditor(this.props.editorId);
  }

  render() {
    const { editorId, showEditor } = this.props;
    return (
      <InlineEditor
        onKeyUp={code => this.onKeyUp(code)}
        onChange={value => this.onChange(value)}
        onCancel={() => this.onCancel()}
        onSave={() => this.onSave()}
        showEditor={() => showEditor(editorId)}
        {...this.props}
      />
    );
  }
}

InlineEditorCtnr.propTypes = {
  editorId: PropTypes.string,
  value: PropTypes.string,
  allowEmpty: PropTypes.bool,
  maxLength: PropTypes.number,
  isEditing: PropTypes.object,
  onSubmit: PropTypes.func,
  updatedValues: PropTypes.object,
  editorErrors: PropTypes.object,
  showEditor: PropTypes.func,
  hideEditor: PropTypes.func,
  updateValue: PropTypes.func,
  validateValue: PropTypes.func
};

const mapStateToProps = state => ({
  isEditing: state.InlineEditor.get('isEditing').toJS(),
  updatedValues: state.InlineEditor.get('updatedValues').toJS(),
  editorErrors: state.InlineEditor.get('editorErrors').toJS()
});

const mapDispatchToProps = dispatch => ({
  showEditor(editorId) {
    dispatch(showEditor(editorId));
  },
  hideEditor(editorId) {
    dispatch(hideEditor(editorId));
  },
  updateValue(editorId, value) {
    dispatch(updateValue(editorId, value));
  },
  validateValue(editorId, rules) {
    dispatch(validateValue(editorId, rules));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  InlineEditorCtnr
);
