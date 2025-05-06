import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const BirthDate = ({ item }) => {
  const getStore = GlobalStore.Get();
  const dispatch = useDispatch();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const MyProfileInput = window.UnoDuoComponent("MyProfileInput");
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const setBirthdate = window.profileState("setBirthdate");

  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const birthdate = useSelector((state) => state.storeFrontMyProfile.birthdate);

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
    dispatch(setBirthdate(value));
  };

  const formatDate = (date) => {
    if(!date || date?.length === 0) {
      return "";
    }
    const [year, month, day] = date.split('-').map((part) => parseInt(part));

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
  
    return `${year}-${formattedMonth}-${formattedDay}`
  }

  if (!MyProfileLabel || !MyProfileInput) return null;

  return (
    <MyProfileRow edit={edit}>
      <MyProfileLabel label={`${t("flits.profile_page.birthdate", "Birthdate")} : `} edit={edit} />
      <MyProfileInput
        readOnly={!edit}
        onValueChange={handleChange}
        value={formatDate(birthdate)}
        type={edit ? "date" : "text"}
        name="birthdate"
        placeholder=""
        disabled={!edit}
        edit={edit}
      />
    </MyProfileRow>
  );
};
