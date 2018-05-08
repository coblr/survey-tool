import { getInterviewUrl, getPreviewUrl } from './InterviewUrl';

describe('Interview URL Helper', () => {
  it('generates a URL to the survey', () => {
    expect(getInterviewUrl('abc123')).toBe(
      'https://ci-interview.surveybuilder.com/s/abc123'
    );
  });

  // it('generates a URL to the survey based on the URL host', () => {
  //   const qaLocation = {host: 'qa-sb.surveysampling.com'};
  //   expect(getInterviewUrl(qaLocation, 'abc123'))
  //     .toBe('https://qa-sb.surveysampling.com/s/abc123');
  // });

  it('generates a URL to the survey and includes the source type', () => {
    expect(getInterviewUrl('abc123', 'WEB')).toBe(
      'https://ci-interview.surveybuilder.com/s/abc123?source_type=WEB'
    );
  });

  it('generates a URL to the survey preview', () => {
    expect(getPreviewUrl('abc123')).toBe(
      'https://ci-interview.surveybuilder.com/preview/abc123'
    );
  });
});
