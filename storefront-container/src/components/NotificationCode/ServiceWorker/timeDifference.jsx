export function timeDifference(timeToLoad) {
  let loadTime = parseInt(timeToLoad, 10);
  let currentTime = new Date().getTime();
  let difference = Math.abs(currentTime - loadTime);

  let differenceInSeconds = Math.floor(difference / 1000);
  return differenceInSeconds;
}
