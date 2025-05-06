import { GetThemeLanguage } from "../../Helpers/GetLanguageData";
export async function getThemeLanguage() {
  try {
    const url = "https://cdn.getflits.com/locales/default/en.json";
    let languageUsingExtension = await GetThemeLanguage(url);
    if (languageUsingExtension?.status && languageUsingExtension?.data) {
      return languageUsingExtension?.data;
    }
    let result = await fetch(languageUsingExtension?.endpoint);
    let resultJson = await result.json();
    return resultJson;
  } catch (error) {
    console.log("container-microfrontend", error);
  }
}
