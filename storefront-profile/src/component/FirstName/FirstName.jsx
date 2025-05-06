import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const FirstName = ({ item }) => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const firstName = useSelector((state) => state.storeFrontMyProfile.firstName);

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const MyProfileInput = window.UnoDuoComponent("MyProfileInput");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");
  const setFirstName = window.profileState("setFirstName");

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
    dispatch(setFirstName(value));
  };

  if (!MyProfileLabel || !MyProfileInput) return null;

  return (
    <MyProfileRow edit={edit}>
      <MyProfileLabel
        label={
          microFrontEndData?.accountSettings?.template === 2
            ? t("flits.profile_page.first_name", "First Name")
            : `${t("flits.profile_page.first_name", "First Name")} : `
        }
        edit={edit}
      />
      <MyProfileInput
        readOnly={!edit}
        onValueChange={handleChange}
        value={firstName}
        type="text"
        name="first_name"
        disabled={!edit}
        placeholder=""
        edit={edit}
      />
    </MyProfileRow>
  );
};
