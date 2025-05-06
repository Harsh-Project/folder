export async function getWidgetLanguage() {
  try {
    const url = "https://cdn.getflits.com/locales/default/en.json";

    let languageUsingExtension =
      await window?.flitsThemeAppExtensionObjects?.languageData(url);

    if (languageUsingExtension?.status && languageUsingExtension?.data) {
      return languageUsingExtension?.data;
    }

    const response = await fetch(languageUsingExtension?.endpoint);
    const languageData = await response.json();
    return languageData;
  } catch (error) {}
}
