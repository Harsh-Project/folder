import React from "react";
import styles from "./WidgetIOSCustomPrompt.module.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const shareSvg = `<img src="data:image/svg+xml,%3Csvg class='pushowl-ios-share-icon' width='12' height='16' viewBox='0 0 12 16' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M6.24902 10.1436C6.52197 10.1436 6.75684 9.91504 6.75684 9.64844V3.12939L6.71875 2.17725L7.14404 2.62793L8.10889 3.65625C8.19775 3.75781 8.32471 3.80859 8.45166 3.80859C8.71191 3.80859 8.91504 3.61816 8.91504 3.35791C8.91504 3.22461 8.85791 3.12305 8.7627 3.02783L6.61719 0.958496C6.49023 0.831543 6.38232 0.787109 6.24902 0.787109C6.12207 0.787109 6.01416 0.831543 5.88086 0.958496L3.73535 3.02783C3.64014 3.12305 3.58936 3.22461 3.58936 3.35791C3.58936 3.61816 3.77979 3.80859 4.04639 3.80859C4.16699 3.80859 4.30664 3.75781 4.39551 3.65625L5.354 2.62793L5.78564 2.17725L5.74756 3.12939V9.64844C5.74756 9.91504 5.97607 10.1436 6.24902 10.1436ZM2.61182 15.1138H9.89258C11.2192 15.1138 11.8857 14.4536 11.8857 13.146V6.81104C11.8857 5.50342 11.2192 4.84326 9.89258 4.84326H8.12158V5.86523H9.87354C10.502 5.86523 10.8638 6.20801 10.8638 6.86816V13.0889C10.8638 13.749 10.502 14.0918 9.87354 14.0918H2.62451C1.98975 14.0918 1.64062 13.749 1.64062 13.0889V6.86816C1.64062 6.20801 1.98975 5.86523 2.62451 5.86523H4.38281V4.84326H2.61182C1.28516 4.84326 0.618652 5.50342 0.618652 6.81104V13.146C0.618652 14.4536 1.28516 15.1138 2.61182 15.1138Z' fill='%233478F6' %3E%3C/path%3E%3C/svg%3E" alt="share svg"></img>`;

export const WidgetIOSCustomPrompt = ({
  openModal,
  closeModal,
  data,
  handleSubscribe,
}) => {
  return (
    <Modal
      open={openModal}
      focusTrapped={false}
      onClose={closeModal}
      classNames={{
        modal: `${styles.flits_width} ${styles.flits_bottom_centered}`,
        closeIcon: `${styles.flits_close}`,
        closeButton:`${styles.flits_button}`
      }}
      closeIcon={false}
      blockScroll={false}
    >
      <div className={styles.flits_description}>
        <div className={styles.flits_title}>
          <h2 className={styles.flits_title_h2}>{data?.ios_title}</h2>
          <p className={styles.flits_description_p} dangerouslySetInnerHTML={{__html: data?.ios_description?.replaceAll("##share_icon##", shareSvg)}}></p>
        </div>
      </div>
    </Modal>
  );
};
