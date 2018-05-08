import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PageHeader from '../../components/PageHeader/PageHeader';

import {
  showDeleteAlert,
  closeDeleteAlert
} from '../../store/ui/PageList';
import {
  deletePage,
  clearDeletePageError
} from '../../store/api/SurveyPage';
import { fetchSurvey } from '../../store/api/Survey';

export class PageHeaderCtnr extends React.PureComponent {
  componentWillUnmount() {
    const { page, closeDeleteAlert } = this.props;
    if (page) {
      closeDeleteAlert(page.id);
    }
  }

  render() {
    return <PageHeader {...this.props} />;
  }
}

PageHeaderCtnr.propTypes = {
  page: PropTypes.object,
  closeDeleteAlert: PropTypes.func
};

const mapStateToProps = state => ({
  showingDeleteAlert: state.PageList.get('showingDeleteAlert').toJS(),
  deletePageErrors: state.SurveyPage.get('deletePageErrors').toJS()
});

const mapDispatchToProps = dispatch => ({
  showDeleteAlert(pageId) {
    dispatch(showDeleteAlert(pageId));
  },
  closeDeleteAlert(pageId) {
    dispatch(closeDeleteAlert(pageId));
  },
  deletePage(surveyId, page, force) {
    dispatch(deletePage(surveyId, page, force)).then(() => {
      if (force) {
        dispatch(fetchSurvey(surveyId));
      }
    });
  },
  clearDeletePageError(pageId) {
    dispatch(clearDeletePageError(pageId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PageHeaderCtnr
);
