import React, { useCallback, useEffect, useState } from "react";
import styles from "./NotificationCustomPrompt.module.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export const NotificationCustomPrompt = ({
  openModal,
  closeModal,
  data,
  handleSubscribe,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const getPosition = useCallback(() => {
    let position =
      window.innerWidth < 767 ? data?.position_mobile : data?.position_desktop;
    switch (position) {
      // for desktop device case handle
      case "bottom_left":
        return styles.flits_bottom_left;
      case "bottom_right":
        return styles.flits_bottom_right;
      case "bottom_centered":
        return styles.flits_bottom_centered;
      case "centered":
        return styles.flits_centered;
      case "top_right":
        return styles.flits_top_right;
      case "top_left":
        return styles.flits_top_left;
      case "top_centered":
        return styles.flits_top_centered;
      // for mobile device case
      case "top":
        return styles.flits_top_centered;
      case "bottom":
        return styles.flits_bottom_centered;
      default:
        return "";
    }
  }, [data?.position_desktop, data?.position_mobile]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(getPosition());
    };
    setScreenWidth(getPosition());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getPosition]);

  return (
    <Modal
      open={openModal}
      focusTrapped={false}
      onClose={closeModal}
      classNames={{
        modal: `${styles.flits_width} ${screenWidth}`,

        closeIcon: `${styles.flits_close}`,
      }}
      closeOnOverlayClick={false}
      showCloseIcon={false}
      blockScroll={false}
    >
      <div>
        <div className={styles.flits_description}>
          {data?.logo_url && <img className={styles.flits_image} src={data?.logo_url} alt="logo" />}
          <div className={styles.flits_title}>
            <span className={styles.flits_title_h2}>
              {data?.title}
            </span>
            <p className={styles.flits_description_p}>
              {data?.description}
            </p>
          </div>
        </div>
        <div className={styles.flits_btn_2}>
          <button className={styles.flits_button_later} onClick={closeModal}>
            {data?.secondary_button_text}
          </button>
          <button
            style={{
              backgroundColor: data?.primary_button_background_color,
              color: data?.primary_button_text_color,
            }}
            className={styles.flits_button_subscribe}
            onClick={handleSubscribe}
          >
            {data?.primary_button_text}
          </button>
        </div>
      </div>
    </Modal>
  );
};
