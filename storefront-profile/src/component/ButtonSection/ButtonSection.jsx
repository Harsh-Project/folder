import React from "react";
import { SaveButton } from "../SaveButton/SaveButton";
import { useSelector } from 'react-redux';
import { ButtonSectionDuo } from "./ButtonSectionDuo";
import { EditButton } from '../EditButton/EditButton';
import { CancelButton } from '../CancelButton/CancelButton';

export const ButtonSection = () => {
  const MyProfileButtonWrapper =
    window.UnoDuoComponent("MyProfileButtonWrapper");
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );

  if (microFrontEndData?.accountSettings?.template === 2) {
    return <ButtonSectionDuo />;
  }
  return (
    <MyProfileButtonWrapper>
      <EditButton
        item={{
          name: "edit",
          label: "flits.profile_page.edit_button",
          type: "button",
        }}
      />
      <CancelButton
        item={{
          name: "cancel",
          label: "flits.profile_page.cancel_button",
          type: "button",
        }}
      />
      <SaveButton
        item={{
          name: "save",
          label: "flits.profile_page.save_button",
          type: "button",
        }}
      />
    </MyProfileButtonWrapper>
  );
};
