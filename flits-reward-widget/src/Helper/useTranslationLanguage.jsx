import { useSelector } from "react-redux";

export function useTranslationLanguage() {
  const { widgetLanguage, adminLanguage } = useSelector(
    (state) => state.rewardWidget
  );
  const missing = "Translation Missing";

  function replacePlaceholders(
    inputString,
    defaultValue,
    replacementObject = {}
  ) {
    if (typeof inputString !== "string" || inputString === "") {
      return defaultValue ? defaultValue : missing;
    }

    const regex = /{{\s*([^}\s]+)\s*}}/g;

    const updatedString = inputString?.replace(regex, (match, key) => {
      if (replacementObject?.hasOwnProperty(key)) {
        return replacementObject?.[key];
      } else if (key?.includes("+")) {
        const keys = key?.split("+");

        if (keys?.[1] === "n") return "n";
        let result = 0;
        keys?.forEach((k) => {
          if (replacementObject?.hasOwnProperty(k)) {
            result += parseFloat(replacementObject?.[k]) || 0;
          }
        });

        result += parseFloat(keys?.[1]);
        return result?.toString();
      } else {
        return match;
      }
    });

    return updatedString;
  }

  function createTranslator(langData) {
    return (value, defaultValue, variables) => {
      if (value === undefined || !langData) {
        return defaultValue
          ? replacePlaceholders(defaultValue, defaultValue, variables)
          : missing;
      }
      let languageString = value?.split(".");

      let temp = langData?.[languageString?.[0]] || undefined;
      for (let i = 1; i < languageString?.length; i++) {
        if (temp === undefined || temp === null) {
          return defaultValue
            ? replacePlaceholders(defaultValue, defaultValue, variables)
            : missing;
        }
        temp = temp?.[languageString?.[i]];
      }

      //New logic to handle array format
      if (Array.isArray(temp)) {
        const [langKey, fallbackValue] = temp;

        languageString = langKey?.split(".");

        let translation = widgetLanguage?.[languageString?.[0]] || undefined;
        for (let i = 1; i < languageString?.length; i++) {
          if (translation === undefined || translation === null) {
            break;
          }
          translation = translation?.[languageString?.[i]];
        }

        if (!translation) {
          languageString = langKey?.split(".");

          translation = adminLanguage?.[languageString?.[0]] || undefined;
          for (let i = 1; i < languageString?.length; i++) {
            if (translation === undefined || translation === null) {
              break;
            }
            translation = translation?.[languageString?.[i]];
          }
        }

        temp = translation !== undefined ? translation : fallbackValue;
      }

      if (temp === undefined || temp === null) {
        return defaultValue
          ? replacePlaceholders(defaultValue, defaultValue, variables)
          : missing;
      }

      return replacePlaceholders(temp, defaultValue, variables);
    };
  }

  const themeT = createTranslator(widgetLanguage);
  const adminT = createTranslator(adminLanguage);

  return { themeT, adminT };
}
