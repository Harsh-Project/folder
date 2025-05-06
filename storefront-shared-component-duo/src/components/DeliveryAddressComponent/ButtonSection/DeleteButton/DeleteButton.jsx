import styles from "./DeleteButtonModule.module.css";
import React, { Suspense, useEffect, useState } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { RenderSvgString } from "../../../General/RenderSvgString";
import { ModalDelete } from "../../ModalDelete/ModalDelete";
import { GlobalStore } from 'redux-micro-frontend';

export const DeleteButton = (props) => {
  const getStore = GlobalStore.Get()
  const { item, handleDeleteEvent } = props;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const setButtonDisabled =
    window.deliveryAddressState("setButtonDisabled");
  const buttondisabled = useSelector(
    (state) => state.storeFrontDeliveryAddress.buttondisabled
  );
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage()

  const handleDelete = async () => {
    setModal(false);
    handleDeleteEvent(item);
    dispatch(setButtonDisabled(false));
  };

  const handleOpenModal = () => {
    if (buttondisabled) {
      return;
    }
    setModal(true);
  };

  const handleNoClick = () => {
    setModal(false);
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: t("flits.address_page.delete_button", "Delete"),
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, []);

  return (
    <>
      <li
        className={`${styles.flits_action_item} ${styles.flits_address_remove_btn}`}
        onClick={handleOpenModal}
        ref={buttonRef}
      >
        <RenderSvgString svgString={window?.DuoIcon?.DeliveryDelete} />
      </li>
      {modal && (
        <Suspense fallback={<></>}>
          <ModalDelete onNo={handleNoClick} onYes={handleDelete} />
        </Suspense>
      )}
    </>
  );
};
