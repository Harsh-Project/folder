export const CheckRequireField = (data) => {
  if (!data) {
    return true;
  }

  const metafield = window.flitsThemeAppExtensionObjects.Metafields;

  if (Array.isArray(data[0])) {
    for (let i = 0; i < data?.length; i++) {
      const subArray = data[i];
      let allFieldsExist = true;

      for (let j = 0; j < subArray?.length; j++) {
        if (!metafield[subArray[j]]) {
          allFieldsExist = false;
          break;
        }
      }

      if (allFieldsExist) {
        return true;
      }
    }

    return false;
  }

  for (let i = 0; i < data?.length; i++) {
    if (!metafield[data[i]]) {
      return false;
    }
  }

  return true;
};
