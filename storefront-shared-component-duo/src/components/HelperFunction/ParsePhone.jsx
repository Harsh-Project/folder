import parsePhoneNumber from "libphonenumber-js";
export function ParsePhone(contact) {
  let country_list = window?.country_list;
  let phoneCode = "";
  let countryIndex = -1;
  let phoneNumber = parsePhoneNumber(contact);
  let phone;
  if (!contact || contact === undefined) {
    const shopCountryName =
      window?.flitsThemeAppExtensionObjects?.shopCountryCode ??
      window?.flitsThemeAppExtensionObjects?.defaultCountry;

    for (let i = 0; i < country_list?.length; i++) {
      if (country_list[i].code === shopCountryName) {
        phoneCode = `+${country_list[i].phoneCode}`;
        countryIndex = i;
        break;
      }
    }
  } else {
    for (let i = 0; i < country_list?.length; i++) {
      if (country_list[i].code === phoneNumber?.country) {
        phoneCode = `+${country_list[i].phoneCode}`;
        countryIndex = i;
        break;
      }
    }
    phone = contact.replace(phoneCode, "");
  }

  return {
    ...phoneNumber,
    phone: phone || "",
    phoneCode: phoneCode,
    countryIndex: countryIndex,
  };
}
