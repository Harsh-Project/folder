export const getSaveErrMessage = (t, response) => {
  let errorShow = null;
  let errors = JSON.parse(response?.response)?.errors;
  let error_key = Object.keys(errors)[0];
  let error_text = errors[Object.keys(errors)[0]][0];
  errorShow = error_key + " " + error_text;
  if (errorShow === "first_name is too long (maximum is 255 characters)") {
    return t(
      "flits.address_page.first_name_is_long",
      "First name is too long (maximum is 255 characters)"
    );
  }
  if (errorShow === "last_name is too long (maximum is 255 characters)") {
    return t(
      "flits.address_page.last_name_is_long",
      "Last name is too long (maximum is 255 characters)"
    );
  }
  if (errorShow === "address1 is too long (maximum is 255 characters)") {
    return t(
      "flits.address_page.address1_is_long",
      "Address1 is too long (maximum is 255 characters)"
    );
  }
  if (errorShow === "address2 is too long (maximum is 255 characters)") {
    return t(
      "flits.address_page.address2_is_long",
      "Address2 is too long (maximum is 255 characters)"
    );
  }
  if (errorShow === "company is too long (maximum is 255 characters)") {
    return t(
      "flits.address_page.company_name_is_long",
      "Company name is too long (maximum is 255 characters)"
    );
  }
  if (errorShow === "city is too long (maximum is 255 characters)") {
    return t(
      "flits.address_page.city_is_long",
      "City is too long (maximum is 255 characters)"
    );
  }
  if (errorShow === "zip is too long (maximum is 255 characters)") {
    return t(
      "flits.address_page.zip_is_long",
      "Zip is too long (maximum is 255 characters)"
    );
  }
  if (errorShow === "signature has already been taken") {
    return t(
      "flits.address_page.address_already_taken",
      "This address already exists."
    );
  }
  if (errorShow === "country is not a valid country") {
    return t("flits.address_page.country_invalid", "Country is not valid");
  }
  return errorShow;
};
