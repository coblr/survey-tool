import React from 'react';
import { connect } from 'react-redux';

import PromoteSample from '../../components/PromoteSample/PromoteSample';

export class PromoteSampleCtnr extends React.PureComponent {
  componentDidMount() {
    // make any data requests here
  }

  render() {
    return <PromoteSample {...this.props} />;
  }
}

PromoteSampleCtnr.propTypes = {};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS()
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  PromoteSampleCtnr
);
