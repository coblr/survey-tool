import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SurveySettings from '../../components/SurveySettings/SurveySettings';

import { updateSurvey } from '../../store/api/Survey';

export class SurveySettingsCtnr extends React.PureComponent {
  constructor(props) {
    super(props);

    const { match: { params: { surveyId } } } = props;
    const survey = props.surveyMap[surveyId];

    this.state = {
      allowMultipleFinishes: {
        value: survey
          ? survey.allowMultipleFinishes ? 'true' : 'false'
          : 'false'
      }
    };
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        ...this.state[name],
        value
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { allowMultipleFinishes: { value: amf } } = this.state;
    const { match: { params: { surveyId } } } = this.props;

    const payload = {
      allowMultipleFinishes: amf === 'true' ? true : false
    };

    this.props.updateSurvey(surveyId, payload);
  }

  render() {
    return (
      <SurveySettings
        {...this.props}
        {...this.state}
        onChange={e => this.onChange(e)}
        onSubmit={e => this.onSubmit(e)}
      />
    );
  }
}

SurveySettingsCtnr.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  updateSurvey: PropTypes.func
};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS()
});

const mapDispatchToProps = dispatch => ({
  updateSurvey(surveyId, survey) {
    dispatch(updateSurvey(surveyId, survey));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveySettingsCtnr
);
