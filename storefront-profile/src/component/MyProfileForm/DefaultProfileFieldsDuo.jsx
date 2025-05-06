import { FirstName } from "../FirstName/FirstName";
import { LastName } from "../LastName/LastName";
import { Email } from "../Email/Email";
import { Contact } from "../Contact/Contact";
import React from "react";
import { BirthDateDuo } from "../BirthDate/BirthDateDuo";
import { GenderDuo } from "../Gender/GenderDuo";
import { Referby } from "../ReferBy/Referby";

export const DefaultProfileFieldsDuo = () => {
  const MyProfileRowWrapper =
    window.UnoDuoComponent("MyProfileRowWrapper");
  return (
    <>
      <MyProfileRowWrapper>
        <FirstName />
        <LastName />
      </MyProfileRowWrapper>
      <MyProfileRowWrapper>
        <Email />
        <Contact />
      </MyProfileRowWrapper>
      <MyProfileRowWrapper>
        <BirthDateDuo />
      </MyProfileRowWrapper>
      <MyProfileRowWrapper>
        <GenderDuo />
      </MyProfileRowWrapper>
      <MyProfileRowWrapper>
        <Referby />
      </MyProfileRowWrapper>
    </>
  );
};
