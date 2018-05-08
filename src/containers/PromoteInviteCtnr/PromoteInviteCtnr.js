import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SourceSelector from '../../components/SourceSelector/SourceSelector';

import {
  toggleCategory,
  setEmbedSize,
  setEmbedWidth,
  setEmbedHeight
} from '../../store/ui/SourceSelector';
import { toggleSourceProp } from '../../store/api/SurveySource';

export class PromoteInviteCtnr extends React.PureComponent {
  render() {
    return <SourceSelector {...this.props} />;
  }
}

PromoteInviteCtnr.propTypes = {
  match: PropTypes.object,
  fetchSurveySources: PropTypes.func
};

const mapStateToProps = state => ({
  selectedCategory: state.SourceSelector.get('selectedCategory'),
  embedSize: state.SourceSelector.get('embedSize'),
  embedWidth: state.SourceSelector.get('embedWidth'),
  embedHeight: state.SourceSelector.get('embedHeight'),
  surveySources: state.SurveySource.get('surveySources').toJS()
});

const mapDispatchToProps = dispatch => ({
  toggleCategory(id) {
    dispatch(toggleCategory(id));
  },
  toggleSourceProp(surveyId, sourceId, prop) {
    dispatch(toggleSourceProp(surveyId, sourceId, prop));
  },
  setEmbedSize(size) {
    dispatch(setEmbedSize(size));
  },
  setEmbedWidth(width) {
    dispatch(setEmbedWidth(width));
  },
  setEmbedHeight(height) {
    dispatch(setEmbedHeight(height));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PromoteInviteCtnr
);
