import React from 'react';
import PropTypes from 'prop-types';

import { scrollTo } from '../../helpers/Animations';

import './SurveyPageNav.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveyPageNav extends React.PureComponent {
  render() {
    let { surveyPages, surveyPageMap } = this.props;

    surveyPages = surveyPages || [];

    let qCount = 1;

    return (
      <div className="SurveyPageNav" style={{ visibility: 'hidden' }}>
        <a
          className="SurveyPageNav_item"
          onClick={() => scrollTo('#root')}>
          <SVGIcon
            iconId="arrow-single-u-lg"
            className="SurveyPageNav_itemIcon"
          />
          Top of Page
        </a>
        <div className="SurveyPageNav_pageList">
          {surveyPages.map((pageId, i) => {
            if (!surveyPageMap[pageId]) return null;

            const qLen = surveyPageMap[pageId].questions.length;
            const qNumbers =
              qLen === 1
                ? `Q${qCount + qLen - 1}`
                : `Q${qCount}-${qCount + qLen - 1}`;
            qCount += qLen;
            return (
              <a
                key={i}
                className="SurveyPageNav_item"
                onClick={() => scrollTo('#page_' + pageId)}>
                <SVGIcon
                  iconId="document-lg"
                  className="SurveyPageNav_itemIcon"
                />
                Page {i + 1} {qNumbers}
              </a>
            );
          })}
        </div>
        <a
          className="SurveyPageNav_item"
          onClick={() => scrollTo('#ThankYouPage')}>
          <SVGIcon
            iconId="arrow-single-d-lg"
            className="SurveyPageNav_itemIcon"
          />
          Thank You Page
        </a>
        <a
          className="SurveyPageNav_item"
          onClick={() => scrollTo('#TerminatePage')}>
          <SVGIcon
            iconId="arrow-single-d-lg"
            className="SurveyPageNav_itemIcon"
          />
          Terminate Page
        </a>
      </div>
    );
  }
}

SurveyPageNav.propTypes = {
  surveyPages: PropTypes.array,
  surveyPageMap: PropTypes.object
};

export default SurveyPageNav;
