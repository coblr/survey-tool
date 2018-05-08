export default getEnvironment();
function getEnvironment() {
  const loc = window.location.hostname;
  if (loc.match(/^(ci-sb|localhost)/)) return 'ci';
  if (loc.match(/^qa-sb/)) return 'qa';
  if (loc.match(/^stage-sb/)) return 'stage';
  if (loc.match(/^sb/)) return 'prod';
}
