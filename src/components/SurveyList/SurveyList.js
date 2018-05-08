import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SurveyList.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import KeywordHighlight from '../KeywordHighlight/KeywordHighlight';
import SSIIcon from '../SSIIcon/SSIIcon';

export class SurveyList extends React.PureComponent {
  render() {
    let { surveys, filteredSurveys, filterKeywords } = this.props;

    if (filterKeywords) {
      surveys = filteredSurveys;
    }

    return (
      <div className="SurveyList" style={{ visibility: 'hidden' }}>
        {surveys.length === 0 && (
          <p className="SurveyList_noSurveys">No matches found.</p>
        )}
        {surveys.length > 0 && (
          <div>
            <div className="SurveyList_colHeaders">
              <div className="SurveyList_titleCol">Survey Title</div>
              <div className="SurveyList_iconCol" />
            </div>
            {this.renderSurveyList(surveys)}
          </div>
        )}
      </div>
    );
  }

  renderSurveyList(surveys) {
    let {
      surveyMap,
      currentSurveyId,
      filterKeywordRegex: regex
    } = this.props;

    return (
      <ul className="SurveyList_listWrapper">
        {surveys
          .sort((a, b) => {
            const sa = surveyMap[a];
            const sb = surveyMap[b];
            return sa && sb ? sb.lastModified - sa.lastModified : 0;
          })
          .map((s, i) => {
            const survey = surveyMap[s];

            if (!survey) {
              return <div key={i}>loading...</div>;
            } else {
              let surveyClass = ['SurveyList_survey'];
              if (survey.id === currentSurveyId) {
                surveyClass.push('SurveyList_survey--selected');
              }
              if (survey.inProject) {
                surveyClass.push('SurveyList_survey--inProject');
              }

              return (
                <Link
                  key={i}
                  className={surveyClass.join(' ')}
                  to={`/surveys/${survey.id}`}>
                  <div className="SurveyList_titleCol">
                    <KeywordHighlight
                      regex={regex}
                      highlightClass="SurveyList_surveyTitle--highlight">
                      {survey.title}
                    </KeywordHighlight>
                  </div>
                  <div className="SurveyList_iconCol">
                    {survey.inProject && (
                      <SSIIcon className="SurveyList_projectIcon" />
                    )}
                    <SVGIcon
                      iconId="arrow-single-r-lg"
                      className="SurveyList_surveyIcon"
                    />
                  </div>
                </Link>
              );
            }
          })}
      </ul>
    );
  }
}

SurveyList.propTypes = {
  surveys: PropTypes.array,
  surveyMap: PropTypes.object,
  filteredSurveys: PropTypes.array,
  currentSurveyId: PropTypes.string,
  filterKeywordRegex: PropTypes.object,
  filterKeywords: PropTypes.string,
  selectSurvey: PropTypes.func
};

export default SurveyList;
