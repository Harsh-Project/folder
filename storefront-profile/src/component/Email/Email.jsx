import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const Email = ({ item }) => {
  const dispatch = useDispatch();
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const email = useSelector((state) => state.storeFrontMyProfile.email);

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const MyProfileInput = window.UnoDuoComponent("MyProfileInput");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");
  const setEmail = window.profileState("setEmail");

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
    dispatch(setEmail(value));
  };

  if (!MyProfileLabel || !MyProfileInput) return null;

  return (
    <MyProfileRow edit={edit}>
      <MyProfileLabel label={microFrontEndData?.accountSettings?.template === 2
            ? t("flits.profile_page.email", "Email")
            : `${t("flits.profile_page.email","Email")} : `} edit={edit} />
      <MyProfileInput
        readOnly={true}
        onValueChange={handleChange}
        value={email}
        type="email"
        name="email"
        disabled={true}
        placeholder=""
        edit={edit}
      />
    </MyProfileRow>
  );
};
