import React from 'react';
import PropTypes from 'prop-types';

import './SurveyPages.css';

import StickyContent from '../StickyContent/StickyContent';
import BuildActionsCtnr from '../../containers/BuildActionsCtnr/BuildActionsCtnr';
import PageListCtnr from '../../containers/PageListCtnr/PageListCtnr';
import BuildFinished from '../BuildFinished/BuildFinished';

export class SurveyPages extends React.PureComponent {
  render() {
    const { match: { params: { surveyId } }, surveyMap } = this.props;

    let survey;
    if (surveyMap && surveyId) {
      survey = surveyMap[surveyId];
    }

    if (!survey) return null;
    return (
      <div className="SurveyPages" style={{ visibility: 'hidden' }}>
        <div className="SurveyPages_actions">
          <StickyContent>
            <BuildActionsCtnr
              showSurveyActions={true}
              showPageNav={true}
              showQuestionActions={true}
              surveyId={surveyId}
            />
          </StickyContent>
        </div>
        <div className="SurveyPages_pages">
          <PageListCtnr survey={survey} />
          <BuildFinished surveyId={surveyId} />
        </div>
      </div>
    );
  }
}

SurveyPages.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object
};

export default SurveyPages;
