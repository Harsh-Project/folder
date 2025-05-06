import styles from "./SkeletonNavigation.module.css";
import React from "react";

export const SkeletonNavigation = () => {
  return (
    <>
    <div className={`${styles.flits_skeleton_account_container}`}>
      <div
        className={`${styles.flits_account_page_header} ${styles.flits_skeleton_header}`}
      >
        <div
          className={`${styles.flits_header_title} ${styles.flits_skeleton_box} ${styles.flits_skeleton_box_header}`}
        ></div>
      </div>
      <div
        className={`${styles.flits_account_page_nav} ${styles.flits_skeleton_nav}`}
      >
        <div
          className={`${styles.flits_nav_tabs} ${styles.flits_d_none}`}
        ></div>
        <div className={`${styles.flits_skeleton_nav_tabs}`}>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_1}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_2}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_3}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_4}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_5}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_6}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_7}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_8}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_9}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_10}`}
            ></div>
          </div>
          <div className={`${styles.flits_skeleton_menu_item}`}>
            <div
              className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_11}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
