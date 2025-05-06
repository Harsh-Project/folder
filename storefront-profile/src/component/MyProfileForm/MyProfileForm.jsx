import React from "react";
import { ButtonSection } from "../ButtonSection/ButtonSection";
import { DefaultProfileFields } from './DefaultProfileFields';
import { CustomProfileFields } from './CustomProfileFields';

export const MyProfileForm = () => {
  return (
    <>
      <DefaultProfileFields />
      <CustomProfileFields />
      <ButtonSection />
    </>

  );
};
