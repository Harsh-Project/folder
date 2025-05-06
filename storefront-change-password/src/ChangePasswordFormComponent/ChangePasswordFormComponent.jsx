import React from "react";
import { NewPassword } from "../NewPassword/NewPassword";
import { ConfirmNewPassword } from "../ConfirmNewPassword/ConfirmNewPassword";
import { UpdatePassword } from "../UpdatePassword/UpdatePassword";
import { useSelector } from "react-redux";
import { UpdatePasswordDuo } from "../UpdatePasswordDuo/UpdatePasswordDuo";

const duoTemplate = [
  {
    component: "NewPassword",
    type: "password",
    label: "flits.update_password_page.new_password",
    placeholder: "flits.update_password_page.new_password_placeholder",
    name: "password",
    minlength: "6",
    maxlength: "40",
    autocomplete: "new-password",
  },
  {
    component: "ConfirmNewPassword",
    type: "password",
    label: "flits.update_password_page.confirm_new_password",
    placeholder: "flits.update_password_page.confirm_password_placeholder",
    name: "password_confirmation",
    minlength: "6",
    maxlength: "40",
    autocomplete: "new-password",
  },
  {
    component: "UpdatePasswordDuo",
    type: "button",
    label: "flits.update_password_page.update_password_button",
    name: "update password",
  },
];

const unoTemplate = [
  {
    component: "NewPassword",
    type: "password",
    label: "flits.update_password_page.new_password",
    placeholder: "flits.update_password_page.new_password_placeholder",
    name: "password",
    minlength: "6",
    maxlength: "40",
    autocomplete: "new-password",
  },
  {
    component: "ConfirmNewPassword",
    type: "password",
    label: "flits.update_password_page.confirm_new_password",
    name: "password_confirmation",
    placeholder: "flits.update_password_page.confirm_password_placeholder",
    minlength: "6",
    maxlength: "40",
    autocomplete: "new-password",
  },
  {
    component: "UpdatePassword",
    type: "button",
    label: "flits.update_password_page.update_password_button",
    name: "update password",
  },
];

const componentMap = {
  NewPassword,
  UpdatePasswordDuo, 
  ConfirmNewPassword,
  UpdatePassword,
};

export const ChangePasswordFormComponent = () => {
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );

  if (microFrontEndData?.accountSettings?.template === 1) {
    return unoTemplate?.map((item1, index) => {
      const DynamicComponent = componentMap[item1?.component];

      return <DynamicComponent item={item1} index={index} />;
    });
  }
  return duoTemplate?.map((item1, index) => {
    const DynamicComponent = componentMap[item1?.component];

    return <DynamicComponent item={item1} index={index} />;
  });
};
