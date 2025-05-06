export const CheckTimeDiff = (localRulesTime) => {
  let currentTime = new Date();
  let storedTime = new Date(localRulesTime);
  let timeDiff = currentTime - storedTime;
  return timeDiff;
};
