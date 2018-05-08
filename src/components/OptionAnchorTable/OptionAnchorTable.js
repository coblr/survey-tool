import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import './OptionAnchorTable.css';
import { getResponseLabel } from '../../helpers/TextResponses.js';

export class OptionAnchorTable extends React.PureComponent {
  render() {
    const {
      className,
      name,
      options,
      anchorEnabled,
      exclusiveEnabled,
      randomized
    } = this.props;

    return (
      <table
        className={`OptionAnchorTable ${className}`}
        style={{ visibility: 'hidden' }}>
        <thead>
          <tr>
            <th className="OptionAnchorTable_optionColHeader">
              Options
            </th>
            {anchorEnabled && (
              <th className="OptionAnchorTable_toggleColHeader">
                Anchor
              </th>
            )}
            {exclusiveEnabled && (
              <th className="OptionAnchorTable_toggleColHeader">
                Exclusive
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {options.map((option, i) => {
            let optionText = option.text;
            if (option.otherSpecify) {
              optionText = getResponseLabel(option.text);
            }
            return (
              <tr key={i} className="OptionAnchorTable_optionRow">
                <td className="OptionAnchorTable_optionCell">
                  {optionText}
                </td>
                {anchorEnabled && (
                  <td className="OptionAnchorTable_toggleCell">
                    <Field
                      type="checkbox"
                      component="input"
                      normalize={value => value || false}
                      name={`${name}[${i}].anchored`}
                      disabled={!randomized}
                    />
                  </td>
                )}
                {exclusiveEnabled && (
                  <td className="OptionAnchorTable_toggleCell">
                    <Field
                      type="checkbox"
                      component="input"
                      normalize={value => value || false}
                      name={`${name}[${i}].exclusive`}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

OptionAnchorTable.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  anchorEnabled: PropTypes.bool,
  exclusiveEnabled: PropTypes.bool,
  randomized: PropTypes.bool
};

export default OptionAnchorTable;
