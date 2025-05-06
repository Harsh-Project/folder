export const CheckLocalSpace = (dataSize) => {
  // const dataSize = JSON.stringify(receivedData).length;
  const localStorageCapacity = 5 * 1024 * 1024;
  const usedLocalStorageSpace = unescape(
    encodeURIComponent(JSON.stringify(localStorage))
  ).length; // Calculate used space in localStorage
  const availableLocalStorageSpace =
    localStorageCapacity - usedLocalStorageSpace;
  if (dataSize > availableLocalStorageSpace) {
    return false;
  } else {
    return true;
  }
};
