import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";
import parsePhoneNumber from "libphonenumber-js";

export const Contact = ({ item }) => {
  const getStore = GlobalStore.Get();
  const dispatch = useDispatch();
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const MyProfileInputContactNormal =
    window.UnoDuoComponent("MyProfileInputContactNormal");
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const setContact = window.profileState("setContact");
  const MyProfileContactInputEditMode =
    window.UnoDuoComponent("MyProfileContactInputEditMode");

  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const contact = useSelector((state) => state.storeFrontMyProfile.contact);

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
    dispatch(setContact(value));
  };

  if (
    !MyProfileLabel ||
    !MyProfileContactInputEditMode ||
    !MyProfileInputContactNormal
  )
    return null;

  return (
    <MyProfileRow edit={edit}>
      <MyProfileLabel
        label={
          microFrontEndData?.accountSettings?.template === 2
            ? t("flits.profile_page.contact_number", "Contact Number")
            : `${t("flits.profile_page.contact_number", "Contact Number")} : `
        }
        edit={edit}
      />
      {!edit ? (
        <MyProfileInputContactNormal
          readOnly={!edit}
          value={contact}
          type="tel"
          disabled={!edit}
          name="phone"
          placeholder=""
          edit={edit}
        />
      ) : (
        <MyProfileContactInputEditMode
          readOnly={!edit}
          onValueChange={handleChange}
          value={parsePhoneNumber(contact) === undefined ? "" : contact}
          type="tel"
          disabled={!edit}
          name="phone"
          placeholder=""
          edit={edit}
        />
      )}
    </MyProfileRow>
  );
};
