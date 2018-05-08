export function getReadableTime(timeData) {
  const duration = [];
  if (timeData.days()) {
    duration.push(`${timeData.days()}d`);
  }
  if (timeData.hours()) {
    duration.push(`${timeData.hours()}h`);
  }
  if (timeData.minutes()) {
    duration.push(`${timeData.minutes()}m`);
  }
  if (timeData.seconds()) {
    duration.push(`${timeData.seconds()}s`);
  }
  return duration.join(' ');
}
