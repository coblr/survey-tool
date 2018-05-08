import React from 'react';
import PropTypes from 'prop-types';

import './Reorder.css';
import BuildActionsCtnr from '../../containers/BuildActionsCtnr/BuildActionsCtnr';
import ReorderForm from '../ReorderForm/ReorderForm';

export class Reorder extends React.PureComponent {
  render() {
    const { match: { params: { surveyId } } } = this.props;

    return (
      <div className="Reorder" style={{ visibility: 'hidden' }}>
        <div className="Reorder_actions">
          <BuildActionsCtnr
            surveyId={surveyId}
            showSurveyActions={true}
          />
        </div>
        <div className="Reorder_editor">
          <ReorderForm {...this.props} />
        </div>
      </div>
    );
  }
}

Reorder.propTypes = {
  match: PropTypes.object
};

export default Reorder;
