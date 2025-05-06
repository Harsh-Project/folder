const { isIOS }  =  await import("react-device-detect").then((module)=> ({ isIOS: module.isIOS }));
export const CheckIsIOSDevice = () => {
  if (isIOS) {
    return true;
  }

  return false;
};
