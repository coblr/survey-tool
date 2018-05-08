import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import PageLogic from '../../components/PageLogic/PageLogic';

import {
  openEditor,
  closeEditor,
  createBranch,
  updateBranch,
  deleteBranch,
  createCondition,
  updateCondition,
  deleteCondition,
  setDefaultPage,
  validateLogic,
  resetPageLogic,
  createPageLogic
} from '../../store/ui/PageLogic';
import {
  updatePage,
  deletePageLogic
} from '../../store/api/SurveyPage';

export class PageLogicCtnr extends React.PureComponent {
  componentWillUpdate(nextProps) {
    let { isEditing, page, createPageLogic } = this.props;
    let { isEditing: nextEditing } = nextProps;

    isEditing = isEditing[page.id];
    nextEditing = nextEditing[page.id];

    // when editors are closed, pagelogic is reset.
    // when editor is re-opened we need to repopulate.
    if (!isEditing && nextEditing) {
      createPageLogic(page.id, page.branchLogic);
    }
  }

  onSubmit() {
    const {
      page,
      pageLogic,
      pageLogicErrors,
      updatePage,
      closeEditor
    } = this.props;

    if (pageLogicErrors[page.id]) return;
    if (!_.isEmpty(pageLogic[page.id])) {
      updatePage(page.id, { branchLogic: pageLogic[page.id] });
    }
    closeEditor(page.id);
  }

  render() {
    return (
      <PageLogic onSubmit={() => this.onSubmit()} {...this.props} />
    );
  }
}

PageLogicCtnr.propTypes = {
  page: PropTypes.object,
  pageLogic: PropTypes.object,
  pageLogicErrors: PropTypes.object,
  updatePage: PropTypes.func,
  closeEditor: PropTypes.func,
  isEditing: PropTypes.object,
  createPageLogic: PropTypes.func
};

const mapStateToProps = state => ({
  isEditing: state.PageLogic.get('isEditing').toJS(),
  pageLogic: state.PageLogic.get('pageLogic').toJS(),
  pageLogicErrors: state.PageLogic.get('pageLogicErrors').toJS(),
  surveyPageMap: state.SurveyPage.get('surveyPageMap').toJS(),
  surveyQuestionMap: state.SurveyQuestion
    .get('surveyQuestionMap')
    .toJS()
});

const mapDispatchToProps = dispatch => ({
  openEditor(pageId) {
    dispatch(openEditor(pageId));
  },
  closeEditor(pageId) {
    dispatch(closeEditor(pageId));
    dispatch(resetPageLogic(pageId));
  },
  createBranch(pageId) {
    dispatch(createBranch(pageId));
    dispatch(validateLogic(pageId));
  },
  updateBranch(pageId, index, propName, value) {
    dispatch(updateBranch(pageId, index, propName, value));
    dispatch(validateLogic(pageId));
  },
  deleteBranch(pageId, index) {
    dispatch(deleteBranch(pageId, index));
    dispatch(validateLogic(pageId));
  },
  createCondition(pageId, branchIndex) {
    dispatch(createCondition(pageId, branchIndex));
    dispatch(validateLogic(pageId));
  },
  updateCondition(
    pageId,
    branchIndex,
    conditionIndex,
    propName,
    value
  ) {
    dispatch(
      updateCondition(
        pageId,
        branchIndex,
        conditionIndex,
        propName,
        value
      )
    );
    dispatch(validateLogic(pageId));
  },
  deleteCondition(pageId, branchIndex, conditionIndex) {
    dispatch(deleteCondition(pageId, branchIndex, conditionIndex));
    dispatch(validateLogic(pageId));
  },
  setDefaultPage(pageId, defaultPageId) {
    dispatch(setDefaultPage(pageId, defaultPageId));
    dispatch(validateLogic(pageId));
  },
  validateLogic(pageId) {
    dispatch(validateLogic(pageId));
  },
  updatePage(pageId, pageLogic) {
    dispatch(updatePage(pageId, pageLogic));
  },
  deletePageLogic(pageId) {
    dispatch(deletePageLogic(pageId));
    dispatch(closeEditor(pageId));
  },
  resetPageLogic(pageId) {
    dispatch(resetPageLogic(pageId));
  },
  createPageLogic(pageId, pageLogic) {
    dispatch(createPageLogic(pageId, pageLogic));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PageLogicCtnr
);
