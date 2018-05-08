import Environment from './Environment';

export { getInterviewUrl, getPreviewUrl };

function getInterviewUrl(surveyId, sourceType) {
  const host = _getUrlHost();
  let url = `https://${host}/s/${surveyId}`;
  if (sourceType) {
    url += `?source_type=${sourceType}`;
  }
  return url;
}

function getPreviewUrl(surveyId) {
  const host = _getUrlHost();
  return `https://${host}/preview/${surveyId}`;
}

function _getUrlHost() {
  let host;
  switch (Environment) {
    case 'ci':
      host = 'ci-interview.surveybuilder.com';
      break;
    case 'qa':
      host = 'qa-interview.surveybuilder.com';
      break;
    case 'stage':
      host = 'stage-interview.surveybuilder.com';
      break;
    case 'prod':
      host = 'interview.surveybuilder.com';
      break;
    // no default
  }
  return host;
}
