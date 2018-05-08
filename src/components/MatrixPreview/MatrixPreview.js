import React from 'react';
import PropTypes from 'prop-types';

import './MatrixPreview.css';

export class MatrixPreview extends React.PureComponent {
  render() {
    const { question: { type, columns, rows } } = this.props;
    const inputType = /MULTI_/.test(type) ? 'checkbox' : 'radio';

    return (
      <div className="MatrixPreview" style={{ visibility: 'hidden' }}>
        <table className="MatrixPreview_table">
          <thead>
            <tr>
              <th className="MatrixPreview_tableCell" />
              {columns.map((col, i) => (
                <th key={i} className="MatrixPreview_columnCell">
                  {col.text}
                  {col.exclusive && (
                    <small className="MatrixPreview_colTag">
                      [exclusive]
                    </small>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="MatrixPreview_rowCell">
                  {row.text}
                  {row.anchored && (
                    <small className="MatrixPreview_rowTag">
                      [anchored]
                    </small>
                  )}
                </td>
                {columns.map((col, j) => (
                  <td key={j} className="MatrixPreview_tableCell">
                    <input type={inputType} disabled />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

MatrixPreview.propTypes = {
  question: PropTypes.object
};

export default MatrixPreview;
