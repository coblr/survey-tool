import React from 'react';
import PropTypes from 'prop-types';

import QuestionConfig from '../../helpers/QuestionConfig.json';

import './SurveyQuestionReport.css';
// import SVGIcon from '../SVGIcon/SVGIcon';
import SelectListReportCtnr from '../../containers/SelectListReportCtnr/SelectListReportCtnr';
import TextReportCtnr from '../../containers/TextReportCtnr/TextReportCtnr';
import MatrixReport from '../MatrixReport/MatrixReport';
import ChartSelector from '../ChartSelector/ChartSelector';
import SelectListReport from '../SelectListReport/SelectListReport';

export class SurveyQuestionReport extends React.PureComponent {
  getReportComponent(question, charts) {
    let answerProps = { question, charts };

    switch (question.type) {
      case 'SINGLE_SELECT_LIST':
      case 'MULTI_SELECT_LIST':
        return (
          <SelectListReportCtnr
            interviewId={this.props.interviewId}
            filter={this.props.filter}
            {...answerProps}
          />
        );

      case 'DROP_DOWN_LIST':
        return <SelectListReport {...answerProps} />;

      case 'SINGLE_SELECT_MATRIX':
      case 'MULTI_SELECT_MATRIX':
        // case 'TEXT_RANKING':
        return <MatrixReport {...answerProps} />;

      case 'COMMENT_BOX':
      case 'SINGLE_LINE_TEXT':
        return (
          <TextReportCtnr
            interviewId={this.props.interviewId}
            filter={this.props.filter}
            {...answerProps}
          />
        );

      // no default
    }
    return null;
  }

  render() {
    const { index, question, toggleChart, chartMap } = this.props;

    // we're only showing chart options for list questions
    // i.e. select lists, dropdown lists, ranking, etc
    const qConfig = QuestionConfig.filter(
      qt => qt.key === question.type
    )[0];
    const supportedCharts = qConfig
      ? qConfig.supportedCharts || []
      : [];

    // despite what kind of question we have, don't show
    // actions unless we are specifically allowing it.
    let { showActions } = this.props;
    showActions =
      showActions && qConfig && qConfig.questionType === 'list';

    // if nothing else, at least show the table chart
    const charts = chartMap
      ? chartMap[question.questionId]
      : ['table'];

    // different questions types require different report components
    const reportComponent = this.getReportComponent(question, charts);

    return (
      <div
        className="SurveyQuestionReport"
        style={{ visibility: 'hidden' }}>
        <div className="SurveyQuestionReport_header">
          <div className="SurveyQuestionReport_id">{`Q${index}`}</div>
          <div className="SurveyQuestionReport_type">
            {qConfig.title}
          </div>
          {showActions && (
            <div className="SurveyQuestionReport_actions">
              {/*
            <button className="SurveyQuestionReport_actionBtn">
              <SVGIcon
                iconId="crosstab-graph"
                className="SurveyQuestionReport_actionIcon" />
              Add Crosstab
            </button>
            */}
              {supportedCharts.length && (
                <ChartSelector
                  className="SurveyQuestionReport_actionBtn"
                  label="Charts"
                  iconId="column-chart"
                  toggleChart={chart =>
                    toggleChart(question.questionId, chart)}
                  supportedCharts={supportedCharts}
                  selectedCharts={charts}
                />
              )}
            </div>
          )}
        </div>
        <div className="SurveyQuestionReport_question">
          {question.text &&
            question.text.split(/\n/).map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          {this.renderQuestionImage()}
        </div>
        <div className="SurveyQuestionReport_answers">
          {reportComponent}
        </div>
      </div>
    );
  }

  renderQuestionImage() {
    const { question: { placedImage } } = this.props;

    if (!placedImage) return null;
    if (!placedImage.url) return null;

    return <img src={placedImage.url} alt="Your Question" />;
  }
}

SurveyQuestionReport.propTypes = {
  index: PropTypes.number,
  question: PropTypes.object,
  showActions: PropTypes.bool,
  toggleChart: PropTypes.func,
  chartMap: PropTypes.object,
  interviewId: PropTypes.string,
  filter: PropTypes.object
};

export default SurveyQuestionReport;
