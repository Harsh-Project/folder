import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const BirthDateDuo = ({ item }) => {
  const getStore = GlobalStore.Get();
  const dispatch = useDispatch();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const setBirthdate = window.profileState("setBirthdate");
  const MyprofileBirthDate = window.UnoDuoComponent("MyProfileBirthDate");

  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const birthdate = useSelector((state) => state.storeFrontMyProfile.birthdate);

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
    dispatch(setBirthdate(value));
  };

  const formatDate = (date) => {
    if(typeof date === "object") {
      return date
    }
    if(!date || date?.length === 0) {
      return {day: "DD", month: "MM", year: "YYYY"};
    }
    const [year, month, day] = date.split('-').map((part) => parseInt(part));

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
  
    return {day: formattedDay, month: formattedMonth, year: year}
  }

  if (!MyProfileLabel || !MyprofileBirthDate) return null;

  return (
    <MyProfileRow edit={edit}>
      <MyProfileLabel label={t("flits.profile_page.birthdate", "Birthdate")} edit={edit} />
      <MyprofileBirthDate
        readOnly={!edit}
        onValueChange={handleChange}
        value={birthdate === "" ? {day: "DD", month: "MM", year: "YYYY"} : formatDate(birthdate)}
        type="date"
        name="birthdate"
        placeholder=""
        disabled={!edit}
        edit={edit}
      />
    </MyProfileRow>
  );
};
