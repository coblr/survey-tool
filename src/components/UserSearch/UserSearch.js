import React from 'react';
import PropTypes from 'prop-types';

import './UserSearch.css';

export class UserSearch extends React.PureComponent {
  findUser() {
    const surveyId = this.surveyIdInput.value;
    if (surveyId) {
      this.props.setSurveyId(surveyId);
      this.props.fetchSurveyOwner(surveyId);
    }
  }

  render() {
    return (
      <div className="UserSearch" style={{ visibility: 'hidden' }}>
        <div className="UserSearch_content">
          <label className="UserSearch_label">
            Enter a Survey ID to find its owner:
          </label>
          <input
            type="text"
            className="UserSearch_input"
            ref={el => (this.surveyIdInput = el)}
          />
          <button
            className="UserSearch_btn"
            onClick={() => this.findUser()}>
            Go
          </button>
        </div>
      </div>
    );
  }
}

UserSearch.propTypes = {
  fetchSurveyOwner: PropTypes.func
};

export default UserSearch;
