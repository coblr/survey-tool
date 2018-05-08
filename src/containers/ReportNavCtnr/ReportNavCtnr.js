import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import checkAllowDownloads from '../../helpers/checkAllowDownloads';

import ReportNav from '../../components/ReportNav/ReportNav';

export class ReportNavCtnr extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allowDownload: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { surveyMap, surveyId, userId } = nextProps;
    const survey = surveyMap[surveyId];
    const allow = checkAllowDownloads({ survey, userId });
    this.setState({ allowDownload: allow });
  }

  render() {
    return (
      <ReportNav
        allowDownload={this.state.allowDownload}
        {...this.props}
      />
    );
  }
}

ReportNavCtnr.propTypes = {
  surveyMap: PropTypes.object,
  surveyId: PropTypes.string,
  userId: PropTypes.string
};

const mapStateToProps = state => ({
  userId: state.User.get('id'),
  surveyMap: state.Survey.get('surveyMap').toJS()
});

export default connect(mapStateToProps)(ReportNavCtnr);
