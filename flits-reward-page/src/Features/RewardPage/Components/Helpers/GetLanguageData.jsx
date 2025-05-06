export async function GetThemeLanguage(url) {
  let languageRewardPage = await window?.flitsRewardPageObjects?.languageData(
    url
  );

  return languageRewardPage;
}
