export const IsIos = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  // iOS detection based on user agent string
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return true;
  }

  // For iOS 13+ on iPad, which can masquerade as macOS
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
    return true;
  }

  return false;
};
