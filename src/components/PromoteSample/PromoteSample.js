import React from 'react';
import PropTypes from 'prop-types';

import Environment from '../../helpers/Environment';
import { getInterviewUrl } from '../../helpers/InterviewUrl';

import './PromoteSample.css';
import SSILogo from '../SSILogo/SSILogo';

export class PromoteSample extends React.PureComponent {
  render() {
    const { match: { params: { surveyId } }, surveyMap } = this.props;

    let selfServeUrl;
    switch (Environment) {
      case 'ci':
        selfServeUrl =
          'http://dev-selfservesample.surveysampling.com';
        break;
      case 'qa':
        selfServeUrl = 'http://qa-selfservesample.surveysampling.com';
        break;
      case 'stage':
        selfServeUrl = 'http://qa-selfservesample.surveysampling.com';
        break;
      case 'prod':
        selfServeUrl = 'http://selfservesample.surveysampling.com';
        break;
      default:
        selfServeUrl = 'http://qa-selfservesample.surveysampling.com';
    }

    let title = surveyMap[surveyId].title;
    if (title.length > 60) {
      title = title.substr(0, 57).trim() + '...';
    }

    let interviewUrl = getInterviewUrl(surveyId, 'sss');
    let sssUrl = `${selfServeUrl}/builder`;
    const sssParams = [
      `pN=${encodeURIComponent(title)}`,
      `sUrl=${encodeURIComponent(interviewUrl)}`
    ];
    sssUrl += `?${sssParams.join('&')}`;

    return (
      <div className="PromoteSample">
        <SSILogo className="PromoteSample_selfServeIcon" />
        <h3 className="PromoteSample_selfServeTitle">
          Build Quality Audiences with SSI Self Serve Sample
        </h3>
        <a className="PromoteSample_selfServeBtn" href={sssUrl}>
          Start Project
        </a>
      </div>
    );
  }
}

PromoteSample.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object
};

export default PromoteSample;
