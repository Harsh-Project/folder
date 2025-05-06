import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const LastName = ({ item }) => {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const lastName = useSelector((state) => state.storeFrontMyProfile.lastName);

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const MyProfileInput = window.UnoDuoComponent("MyProfileInput");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");
  const setLastName = window.profileState("setLastName");

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
    dispatch(setLastName(value));
  };

  if (!MyProfileLabel || !MyProfileInput) return null;

  return (
    <MyProfileRow edit={edit}>
      <MyProfileLabel
        label={
          microFrontEndData?.accountSettings?.template === 2
            ? t("flits.profile_page.last_name", "Last Name")
            : `${t("flits.profile_page.last_name", "Last Name")} : `
        }
        edit={edit}
      />
      <MyProfileInput
        readOnly={!edit}
        onValueChange={handleChange}
        value={lastName}
        type="text"
        name="last_name"
        disabled={!edit}
        placeholder=""
        edit={edit}
      />
    </MyProfileRow>
  );
};
