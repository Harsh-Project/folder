export function CheckIsMinuteOrNot(value, minute) {
  const timeOfLastApiCall = value;
  const currentTime = new Date();
  const fiveMinutesAgo = new Date(currentTime - minute * 60 * 1000);

  if (timeOfLastApiCall && new Date(timeOfLastApiCall) > fiveMinutesAgo) {
    return false;
  }

  return true;
}
