import React, { useState } from "react";
import { GlobalStore } from "redux-micro-frontend";
import cloneDeep from "lodash/cloneDeep";
import parsePhoneNumber from "libphonenumber-js";
import { useDispatch, useSelector } from "react-redux";

export const SaveButton = ({ item }) => {
  const [openSnackbar, setOpenSnackbar] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const FlitsPrimaryButton =
    window.UnoDuoComponent("FlitsPrimaryButton");
  const setEdit = window.profileState("setEdit");
  const API = getStore._globalActions.API[0].API;
  const MyProfileSnackBar =
    window.UnoDuoComponent("MyProfileSnackBar");

  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const firstName = useSelector((state) => state.storeFrontMyProfile.firstName);
  const lastName = useSelector((state) => state.storeFrontMyProfile.lastName);
  const birthdate = useSelector((state) => state.storeFrontMyProfile.birthdate);
  const SnackBar = window.UnoDuoComponent("SnackBar");
  const gender = useSelector((state) => state.storeFrontMyProfile.gender);
  const contact = useSelector((state) => state.storeFrontMyProfile.contact);
  const email = useSelector((state) => state.storeFrontMyProfile.email);
  const customFields = useSelector(
    (state) => state.storeFrontMyProfile.customFields
  );

  const setCustomFieldsInitialBulk =
    window.profileState("setCustomFieldsInitialBulk");
    const setFirstNameInitial = window.profileState("setFirstNameInitial");
    const setLastNameInitial = window.profileState("setLastNameInitial");
    const setBirthdateInitial = window.profileState("setBirthdateInitial");
    const setGenderInitial = window.profileState("setGenderInitial");
    const setContactInitial = window.profileState("setContactInitial");
    const setContact = window.profileState("setContact");
    const setEmailInitial = window.profileState("setEmailInitial");
  const setCustomFieldsBulk =
    window.profileState("setCustomFieldsBulk");

  const { t } = useTranslationLanguage();

  const changeStateData = (data) => {
    let customField = {};

    for (const key in customFields) {
      if (customFields[key]?.value?.component === "CustomFileField") {
        let duplicate = cloneDeep(customFields[key]);
        if (duplicate && duplicate?.value) {
          let duplicateValue = cloneDeep(duplicate?.value)
          if(data && data[`${key}_history`])
          duplicateValue[`${key}UrlPath`] = data[`${key}_history`] ? data[`${key}_history`][0]?.new_value : null;
          duplicate.value = duplicateValue
        }
        customField[key] = duplicate;
      } 
      else if(customFields[key]?.value?.component === "CustomDateField") {
        let duplicate = JSON.parse(JSON.stringify(customFields[key]));
        if(duplicate && duplicate?.value) {
          let value = duplicate.value[key];
          if(value?.month === "MM" || value?.year === "YYYY" || value?.day === "DD") {
            duplicate.value[key] = {year: "YYYY", month: "MM", day: "DD"}
          }
        }
        customField[key] = duplicate
      } else if(customFields[key]?.value?.component === "CustomTimeField") {
        let duplicate = JSON.parse(JSON.stringify(customFields[key]));
        if(duplicate && duplicate?.value) {
          let value = duplicate.value[key];
          if(value?.hour === "HH" || value?.minute === "MM") {
            duplicate.value[key] = {hour: "HH", minute: "MM"}
          }
        }
        customField[key] = duplicate
      } else {
        customField[key] = customFields[key];
      }
    }
    console.log(data);
    dispatch(setCustomFieldsBulk(customField));
    dispatch(setCustomFieldsInitialBulk(customField));
  };

  const checkCustomFieldValidation = (customData) => {
    const customField = {};
    let check = false;
    for (const key in customData) {
      if (customData[`${key}`].value[`${key}IsErrorInField`] === true) {
        const errorKey = key + "Error";
        customField[`${key}`] = {
          value: {
            ...customFields[`${key}`].value,
            [`${errorKey}`]: true,
          },
        };
        check = true;
      }
      // const keyValue = customField[key] ?? ""
      // const keyValidation = typeof keyValue;
      // if (
      //   keyValidation === "object" &&
      //   !key.endsWith("Error") &&
      //   !key.endsWith("FileName") &&
      //   !key.endsWith("FileValue")
      // ) {
      //   for (const objectField in customField[key]) {
      //     if (customField[key]?.webkitRelativePath !== "" && !customField[key][objectField]) {
      //       customField[key + "Error"] = true;
      //       check = true;
      //     }
      //   }
      // }

      // if (key.endsWith("FileName") && !customField[key]) {
      //   const createError = key.replace("FileName", "");
      //   customField[createError + "Error"] = true;
      //   check = true;
      // }
    }

    dispatch(setCustomFieldsBulk(customField));
    return check;
  };

  const setErrorMessageTranslation = (error) => {
    if (error === "phone is invalid") {
      return t(
        "flits.profile_page.invalid_contact_number",
        "Contact number is not valid"
      );
    }
    if (error === "phone has already been taken") {
      return t(
        "flits.profile_page.contact_number_already_taken",
        "This contact number is already in use. Please enter a different contact number."
      );
    }
    if (error === "email is invalid") {
      return t(
        "flits.profile_page.invalid_email",
        "Email is not valid"
      );
    }
    if (error === "email has already been taken") {
      return t(
        "flits.profile_page.email_already_taken",
        "This email is already in use. Please enter a different email address."
      );
    }
    if (error === "email contains an invalid domain name") {
      return t(
        "flits.profile_page.invalid_email_domain",
        "Email contains an invalid domain name"
      );
    }
    return error;
  }

  const handleClickChange = async () => {
    const phoneNumber = parsePhoneNumber(contact);
    const validOrNot = phoneNumber === undefined ?  true : phoneNumber.isValid();

    if(phoneNumber === undefined) {
      dispatch(setContact(""))
    }

    if (!validOrNot) {
      setSnackbarMessage(t("flits.profile_page.invalid_contact_number", "Contact number is not valid"));
      setOpenSnackbar("information");

      setTimeout(() => {
        setOpenSnackbar(null);
        setSnackbarMessage("");
      }, 2500);

      return;
    }
    let isCustomFieldValid = checkCustomFieldValidation(customFields);
    if (isCustomFieldValid) {
      return;
    }
    const formData = {
      first_name: firstName,
      last_name: lastName,
      birthdate: birthdate,
      gender: gender,
      phone: phoneNumber === undefined ? "" : contact,
      email: email,
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      from_page: "account",
    };
    for (const field in customFields) {
      let valueOfField = customFields[field].value[field] ?? "";
      let fieldType = customFields[field].value[field + "FieldData"].component;

      switch (fieldType) {
        case "CustomTimeField":
          formData[`${field}[hour]`] = valueOfField.hour === "HH" ? "" : valueOfField.hour;
          formData[`${field}[minute]`] = valueOfField.minute === "MM" ? "" :valueOfField.minute;
          break;
        case "CustomDateField":
          formData[`${field}[year]`] = valueOfField.year === "YYYY" ? ""  : valueOfField.year;
          formData[`${field}[month]`] = valueOfField.month === "MM" ? "" : valueOfField.month;
          formData[`${field}[day]`] = valueOfField.day === "DD" ? "" : valueOfField.day;
          break;
        case "CustomFileField":
          let uploadFileStatus =
            customFields[field].value[field + "_file_status"];
          if (uploadFileStatus === "uploaded" && valueOfField) {
            formData[field] = valueOfField;
          } else if (uploadFileStatus === "delete") {
          }
          formData[`${field}_file_status`] = uploadFileStatus;
          break;
        default:
          formData[field] = valueOfField;
          break;
      }
    }
    setOpenSnackbar("processing");
    setSnackbarMessage(t("flits.profile_page.save_details", "Saving profile details..."));

    const profile_save = await API.myprofile.profile_save(formData);
    if(profile_save?.status === false) {
      let errors = JSON.parse(profile_save?.response)?.errors;
      let error_key = Object.keys(errors)[0];
      let error_text = errors[Object.keys(errors)[0]][0];
      error_text = setErrorMessageTranslation(error_key + ' ' + error_text);
      setSnackbarMessage(setErrorMessageTranslation(error_text));
      setOpenSnackbar("error");
      setTimeout(() => {
        setSnackbarMessage("")
        setOpenSnackbar(null)
      }, 2500)
      return;
    }
    dispatch(setEdit(!edit));
    if (profile_save?.status)
      changeStateData(profile_save?.customerCustomFieldsValues);

    if (profile_save?.status) {
      setSnackbarMessage(t("flits.profile_page.saved_successfully", "Profile updated successfully"));
      setOpenSnackbar("success");
      setTimeout(() => {
        setOpenSnackbar(null);
        setSnackbarMessage("");
      }, 2500);
      dispatch(setFirstNameInitial(firstName))
      dispatch(setLastNameInitial(lastName))
      dispatch(setBirthdateInitial(birthdate))
      dispatch(setGenderInitial(gender))
      dispatch(setContactInitial(contact))
      dispatch(setEmailInitial(email))
    }
  };

  if (!FlitsPrimaryButton || !MyProfileSnackBar) {
    return null;
  }

  return (
    <>
      {edit && (
        <FlitsPrimaryButton
          type={item?.type}
          onClickEvent={handleClickChange}
          label={t(item?.label)}
          name={item?.name}
        />
      )}

      <SnackBar mode={openSnackbar} message={snackbarMessage} />
    </>
  );
};
