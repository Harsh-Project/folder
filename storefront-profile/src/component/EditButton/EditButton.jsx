import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const EditButton = ({ item }) => {
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const dispatch = useDispatch();

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const FlitsPrimaryButton =
    window.UnoDuoComponent("FlitsPrimaryButton");
  const setEdit = window.profileState("setEdit");

  const { t } = useTranslationLanguage();

  const handleClickChange = () => {
    dispatch(setEdit(!edit));
  };

  if (!FlitsPrimaryButton) {
    return null;
  }

  return (
    !edit && (
      <FlitsPrimaryButton
        type={item?.type}
        onClickEvent={handleClickChange}
        label={t(item?.label)}
        name={item?.name}
      />
    )
  );
};
