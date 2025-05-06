import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const NonEditModeProfile = () => {
  const setEdit = window.profileState("setEdit");
  const dispatch = useDispatch();
  const firstNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.firstNameInitial
  );
  const lastNameInitial = useSelector(
    (state) => state.storeFrontMyProfile.lastNameInitial
  );
  const birthdateInitial = useSelector(
    (state) => state.storeFrontMyProfile.birthdateInitial
  );
  const genderInitial = useSelector(
    (state) => state.storeFrontMyProfile.genderInitial
  );
  const contactInitial = useSelector(
    (state) => state.storeFrontMyProfile.contactInitial
  );
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const emailInitial = useSelector(
    (state) => state.storeFrontMyProfile.emailInitial
  );
  const customFieldsInitial = useSelector(
    (state) => state.storeFrontMyProfile.customFieldsInitial
  );

  const setFirstName = window.profileState("setFirstName");
  const setLastName = window.profileState("setLastName");
  const setContact = window.profileState("setContact");
  const setGender = window.profileState("setGender");
  const setBirthdate = window.profileState("setBirthdate");
  const setEmail = window.profileState("setEmail");
  const setCustomFieldsBulk = window.profileState("setCustomFieldsBulk");
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });

  useEffect(() => {
    if (edit && !window.location.hash.includes("#/profile")) {
      dispatch(setEdit(!edit));
      dispatch(setFirstName(firstNameInitial));
      dispatch(setLastName(lastNameInitial));
      dispatch(setBirthdate(birthdateInitial));
      dispatch(setGender(genderInitial));
      dispatch(setContact(contactInitial));
      dispatch(setEmail(emailInitial));
      dispatch(setCustomFieldsBulk(customFieldsInitial));
    }
  }, [
    birthdateInitial,
    contactInitial,
    customFieldsInitial,
    dispatch,
    edit,
    emailInitial,
    firstNameInitial,
    genderInitial,
    lastNameInitial,
    setBirthdate,
    setContact,
    setCustomFieldsBulk,
    setEdit,
    setEmail,
    setFirstName,
    setGender,
    setLastName,
  ]);
  return <></>;
};

// export default NonEditModeProfile;
