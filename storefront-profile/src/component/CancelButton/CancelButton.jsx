import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useDispatch, useSelector } from "react-redux";

export const CancelButton = ({ item }) => {
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();

  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const FlitsSecondaryButton =
    window.UnoDuoComponent("FlitsSecondaryButton");
  const setEdit = window.profileState("setEdit");

  const firstNameInitial = useSelector((state) => state.storeFrontMyProfile.firstNameInitial);
  const lastNameInitial = useSelector((state) => state.storeFrontMyProfile.lastNameInitial);
  const birthdateInitial = useSelector((state) => state.storeFrontMyProfile.birthdateInitial);
  const genderInitial = useSelector((state) => state.storeFrontMyProfile.genderInitial);
  const contactInitial = useSelector((state) => state.storeFrontMyProfile.contactInitial);
  const emailInitial = useSelector((state) => state.storeFrontMyProfile.emailInitial);

  const setFirstName = window.profileState("setFirstName");
  const setLastName = window.profileState("setLastName");
  const setContact = window.profileState("setContact");
  const setGender = window.profileState("setGender");
  const setBirthdate = window.profileState("setBirthdate");
  const setEmail = window.profileState("setEmail");
  const setCustomFieldsBulk = window.profileState("setCustomFieldsBulk");
  // const customFields = useSelector(
  //   (state) => state.storeFrontMyProfile.customFields
  // );
  const customFieldsInitial = useSelector(
    (state) => state.storeFrontMyProfile.customFieldsInitial
  );

  const { t } = useTranslationLanguage();

  const handleClickChange = () => {
    dispatch(setEdit(!edit));
    dispatch(setFirstName(firstNameInitial));
    dispatch(setLastName(lastNameInitial));
    dispatch(setBirthdate(birthdateInitial));
    dispatch(setGender(genderInitial));
    dispatch(setContact(contactInitial));
    dispatch(setEmail(emailInitial));
    dispatch(setCustomFieldsBulk(customFieldsInitial));
  };

  if (!FlitsSecondaryButton) return null;

  return (
    edit && (
      <FlitsSecondaryButton
        type={item?.type}
        onClickEvent={handleClickChange}
        label={t(item?.label)}
        name={item?.name}
      />
    )
  );
};
