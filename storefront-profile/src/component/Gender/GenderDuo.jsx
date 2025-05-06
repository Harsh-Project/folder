import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const GenderDuo = ({ item }) => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const gender = useSelector((state) => state.storeFrontMyProfile.gender);

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");
  const MyProfileGender = window.UnoDuoComponent("MyProfileGender");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const setGender = window.profileState("setGender");

  const { t } = useTranslationLanguage();

  const handleChange = (e) => {
    dispatch(setGender(e.target.value));
  };

  if (!MyProfileGender || !MyProfileLabel) return null;

  return (
    <MyProfileRow edit={edit} notNeedMB={true}>
      <MyProfileLabel label={t("flits.profile_page.gender", "Gender")} edit={edit} />
      <MyProfileGender
        readOnly={!edit}
        onValueChange={handleChange}
        value={gender}
        name="gender"
        id="flits-profile-gender"
        edit={edit}
        disabled={!edit}
      />
    </MyProfileRow>
  );
};
