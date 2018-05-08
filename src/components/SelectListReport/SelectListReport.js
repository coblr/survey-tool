import React from 'react';
import PropTypes from 'prop-types';
import { Bar, Pie } from 'react-chartjs-2';
import getRandomColor from '../../helpers/RandomColor';

import './SelectListReport.css';
import { getResponseLabelText } from '../../helpers/TextResponses.js';

export class SelectListReport extends React.PureComponent {
  render() {
    const { question, charts } = this.props;
    // if we don't have chart info, we can't display
    // anything so just bail here and forget the rest.
    if (!charts || !charts.length) return null;

    const labels = [];
    const data = [];
    const bgColors = [];
    let totalResponses = 0;
    let totalPercent = 0;
    let answerText = '';

    if (question && question.counts) {
      totalResponses = question.counts.reduce(
        (acc, c) => acc + c.count,
        0
      );
    }

    question.counts.forEach((stat, i) => {
      let value = stat.count;
      let step = Math.round(256 / question.counts.length * i);
      let pct = 100 / totalResponses * value || 0;
      const otherAnswerText = getResponseLabelText(stat.answer.text);

      answerText = stat.answer.otherSpecify
        ? otherAnswerText
        : stat.answer.text;
      labels.push(`${answerText} (${Math.round(pct)}%)`);
      data.push(value);
      bgColors.push(getRandomColor(step, 256));
      totalPercent += pct;
    });

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize:
                totalResponses < 10
                  ? 1
                  : Math.round(totalResponses / 5),
              suggestedMax: totalResponses < 5 ? 5 : totalResponses
            },
            scaleLabel: {
              display: true,
              labelString: 'Respondents'
            }
          }
        ]
      }
    };

    const pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 40
    };

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: bgColors
        }
      ]
    };

    return (
      <div
        className="SelectListReport"
        style={{ visibility: 'hidden' }}>
        {charts.indexOf('column') > -1 && (
          <div className="SelectListReport_barChart">
            <Bar data={chartData} options={barChartOptions} />
          </div>
        )}
        {charts.indexOf('pie') > -1 && (
          <div className="SelectListReport_pieChart">
            <Pie data={chartData} options={pieChartOptions} />
          </div>
        )}
        {charts.indexOf('table') > -1 && (
          <table className="SelectListReport_table">
            <thead>
              <tr>
                <th className="SelectListReport_orderCol">Order</th>
                <th className="SelectListReport_answerCol">Answer</th>
                <th className="SelectListReport_responseCol">
                  Responses
                </th>
                <th className="SelectListReport_percentCol">
                  Percent
                </th>
                <th className="SelectListReport_graphCol">
                  <span className="SelectListReport_startLabel">
                    0
                  </span>
                  <span className="SelectListReport_endLabel">
                    100
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {question.counts.map((c, i) => {
                const pct = 100 / totalResponses * c.count || 0;
                return (
                  <tr key={i}>
                    <td className="SelectListReport_orderCol">
                      {i + 1}
                    </td>
                    <td className="SelectListReport_answerCol">
                      {c.answer.otherSpecify
                        ? this.renderTextResponses(c.answer)
                        : c.answer.text}
                    </td>
                    <td className="SelectListReport_responseCol">
                      {c.count}
                    </td>
                    <td className="SelectListReport_percentCol">
                      {Math.round(pct)}%
                    </td>
                    <td className="SelectListReport_graphCol">
                      <div className="SelectListReport_barGraphBg">
                        <div
                          className="SelectListReport_barGraph"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="2"
                  className="SelectListReport_totalLabelCol">
                  {question.type === 'MULTI_SELECT_LIST' && (
                    <span className="SelectListReport_respondentTotal">
                      ({question.responseCount} Respondents)
                    </span>
                  )}
                  Total
                </td>
                <td className="SelectListReport_totalCol">
                  {totalResponses}
                </td>
                <td className="SelectListReport_totalCol">
                  {Math.round(totalPercent)}%
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    );
  }

  renderTextResponses(answer) {
    const {
      recentTextResponses,
      openTextResponseModal,
      question,
      interviewId,
      filter
    } = this.props;

    let responses = recentTextResponses[answer.id];
    const answerText = getResponseLabelText(answer.text);

    if (responses && interviewId) {
      responses = responses.filter(
        r => r.interviewId === interviewId
      );
    }

    if (!responses || !responses.length) return answerText;
    return (
      <div>
        <span>
          {responses && responses.length === 1
            ? answerText
            : `Most recent answers to "${answerText}"`}
        </span>
        {responses &&
          responses.slice(0, 5).map((r, i) => {
            return (
              <div key={i} className="SelectListReport_otherResponse">
                {`"${r.answer.text || '[empty response]'}"`}
              </div>
            );
          })}
        {responses.length > 1 && (
          <button
            className="SelectListReport_viewAllBtn"
            onClick={() =>
              openTextResponseModal(
                question,
                answer,
                filter.id,
                interviewId
              )}>
            View All
          </button>
        )}
      </div>
    );
  }
}

SelectListReport.propTypes = {
  question: PropTypes.object,
  charts: PropTypes.array,
  breakdown: PropTypes.array,
  interviewId: PropTypes.string,
  recentTextResponses: PropTypes.object,
  openTextResponseModal: PropTypes.func,
  filter: PropTypes.object
};

export default SelectListReport;
