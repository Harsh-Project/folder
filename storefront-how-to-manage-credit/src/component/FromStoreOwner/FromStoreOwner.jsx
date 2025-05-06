import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";

export const FromStoreOwner = (props) => {
  const dispatch = useDispatch();
  const activeButton = useSelector(
    (state) => state.storeFrontHowToManageCredit.activeButton
  );
  const ButtonComponent =
    window.UnoDuoComponent("ButtonComponent");
  const setActiveButton =
    window.manageCreditState("setActiveButton");

  const handleButtonClick = () => {
    dispatch(setActiveButton("flits_from_admin_rules"));
  };
  if (!ButtonComponent) {
    return null;
  }
  return (
    <ButtonComponent
      name={props?.name}
      activeButton={activeButton}
      rule="flits_from_admin_rules"
      type={props?.type}
      label={props?.label}
      onClick={handleButtonClick}
    />
  );
};
