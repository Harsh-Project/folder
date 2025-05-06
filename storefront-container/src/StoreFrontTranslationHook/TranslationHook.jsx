const { useSelector } = await import("react-redux").then((module) => ({
  useSelector: module.useSelector,
}));

export function useTranslationLanguage() {
  const languageData = useSelector(
    (state) => state.storeFrontContainer.languageData
  );
  const missing = "Translation Missing";

  function replacePlaceholders(inputString, defaultValue, replacementObject) {
    const type = typeof inputString;
    if ("string" !== type) {
      return defaultValue ? defaultValue : missing;
    }

    const regex = /{{\s*([^}\s]+)\s*}}/g;

    const updatedString = inputString?.replace(regex, (match, key) => {
      if (replacementObject?.hasOwnProperty(key)) {
        return replacementObject[key];
      } else if (key?.includes("+")) {
        const keys = key?.split("+");

        if (keys[1] === "n") return "n";
        let result = 0;
        keys?.forEach((k) => {
          if (replacementObject?.hasOwnProperty(k)) {
            result += parseFloat(replacementObject[k]) || 0;
          }
        });

        result = result + parseFloat(keys[1]);
        return result?.toString();
      } else {
        return match;
      }
    });

    return updatedString;
  }

  const t = (value, defaultValue, variables) => {
    if (value === undefined) {
      return defaultValue
        ? replacePlaceholders(defaultValue, defaultValue, variables)
        : missing;
    }
    const languageString = value.split(".");

    let temp = "";
    temp = languageData[languageString[0]] || undefined;
    for (let i = 1; i < languageString.length; i++) {
      if (temp === undefined || temp === null) {
        return defaultValue
          ? replacePlaceholders(defaultValue, defaultValue, variables)
          : missing;
      }
      temp = temp[languageString[i]];
    }

    if (temp === undefined || temp === null) {
      return defaultValue
        ? replacePlaceholders(defaultValue, defaultValue, variables)
        : missing;
    }

    const finalString = replacePlaceholders(temp, defaultValue, variables);
    return finalString;
  };

  return { t };
}
