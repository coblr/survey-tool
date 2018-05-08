import React from 'react';
import PropTypes from 'prop-types';

import './MatrixReport.css';

export class MatrixReport extends React.PureComponent {
  render() {
    const { question, question: { rows } } = this.props;

    const colHeaders = rows[0].columns.map(col => col.text);
    const colTotals = [];
    const rowTotals = [];

    // aggregate all the totals
    for (let a = 0; a < rows.length; a++) {
      for (let b = 0; b < rows[a].columns.length; b++) {
        const col = rows[a].columns[b];
        colTotals[b] = colTotals[b] || 0;
        colTotals[b] += col.count;

        rowTotals[a] = rowTotals[a] || 0;
        rowTotals[a] += col.count;
      }
    }

    // and calc the grand totals for everything
    const grandRowTotal = rowTotals.reduce((rgt, rt) => rgt + rt);
    // const grandColTotal = rowTotals.reduce((cgt, ct) => cgt + ct);
    // const grandGrandTotal = grandRowTotal + grandColTotal;

    return (
      <div className="MatrixReport" style={{ visibility: 'hidden' }}>
        <table className="MatrixReport_table">
          <thead>
            <tr>
              <th className="MatrixReport_optionCol" />
              {colHeaders.map((text, i) => (
                <th key={i} className="MatrixReport_responseCol">
                  {text}
                </th>
              ))}
              <th className="MatrixReport_totalCol">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              return (
                <tr key={i}>
                  <td className="MatrixReport_optionCol">
                    {row.text}
                  </td>
                  {row.columns.map((col, j) => {
                    const respCount = question.responseCount;
                    const pct =
                      Math.round(100 / respCount * col.count) || 0;
                    const opacity = pct / 100 || 0;

                    return (
                      <td key={j} className="">
                        <span
                          className="MatrixReport_responseBg"
                          style={{ opacity }}
                        />
                        <span className="MatrixReport_responseCount">
                          {col.count}
                        </span>
                        <span className="MatrixReport_responsePercent">
                          {pct}%
                        </span>
                      </td>
                    );
                  })}
                  <td className="MatrixReport_totalCol">
                    {rowTotals[i]}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="MatrixReport_totalLabelCol">
                {question.type === 'MULTI_SELECT_MATRIX' && (
                  <span className="MatrixReport_respondentTotal">
                    ({question.responseCount} Respondents)
                  </span>
                )}
                Total
              </td>
              {colTotals.map((total, i) => (
                <td key={i} className="MatrixReport_totalCol">
                  {total}
                </td>
              ))}
              <td className="MatrixReport_totalCol">
                {grandRowTotal}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

MatrixReport.propTypes = {
  question: PropTypes.object,
  rows: PropTypes.array,
  columns: PropTypes.array,
  breakdown: PropTypes.array
};

export default MatrixReport;
