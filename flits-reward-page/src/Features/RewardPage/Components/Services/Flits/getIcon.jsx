export async function getIcon() {
  let lanUrl = window.flitsRewardPageObjects?.iconUrl
    ? window.flitsRewardPageObjects?.iconUrl
    : "https://cdn.shopify.com/s/files/1/0030/7491/6461/files/Flits_icons.json?v=1733226392";
  let lanCall = await fetch(lanUrl);
  if (lanCall.ok) {
    let lang = await lanCall.json();
    return lang;
  }
}
