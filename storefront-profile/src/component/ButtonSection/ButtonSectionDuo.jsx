import React from "react";
import { EditButtonDuo } from "../EditButton/EditButtonDuo";
import { CancelButtonDuo } from "../CancelButton/CancelButtonDuo";
import { SaveButtonDuo } from "../SaveButton/SaveButtonDuo";

export const ButtonSectionDuo = () => {
  const MyProfileButtonWrapper =
    window.UnoDuoComponent("MyProfileButtonWrapper");
  return (
    <MyProfileButtonWrapper>
      <EditButtonDuo
        item={{
          name: "edit",
          label: "flits.profile_page.edit_button",
          type: "button",
        }}
      />
      <CancelButtonDuo
        item={{
          name: "cancel",
          label: "flits.profile_page.cancel_button",
          type: "button",
        }}
      />
      <SaveButtonDuo
        item={{
          name: "save",
          label: "flits.profile_page.save_button",
          type: "button",
        }}
      />
    </MyProfileButtonWrapper>
  );
};
