import styles from "./SkeletonNavigationModule.module.css";
import React from "react";

export const SkeletonNavigation = () => {
  return (
    <>
      <div
        className={`${styles.flits_account_container} ${styles.flits_skeleton_account_container}`}
      >
        <div
          className={`${styles.flits_account_section} ${styles.flits_desktop_view} ${styles.flits_skeleton_desktop}`}
        >
          <div
            className={`${styles.flits_greeting_header} ${styles.flits_skeleton_greeting_header} ${styles.flits_skeleton_box}`}
          >
            <p className={`${styles.flits_h1} ${styles.flits_greeting_text}`}>
              <span className={`${styles.flits_greeting_title}`}></span>
              <span className={`${styles.flits_user_name}`}></span>
            </p>
          </div>
          <div
            className={`${styles.flits_menu_nav} ${styles.flits_skeleton_menu_nav}`}
          >
            <div
              className={`${styles.flits_navigation_header} ${styles.flits_with_shadow} ${styles.flits_skeleton_navigation_header}`}
            >
              <div
                className={`${styles.flits_user_avatar} ${styles.flits_skeleton_user_avatar} ${styles.flits_skeleton_box}`}
              ></div>
              <div
                className={`${styles.flits_user_box} ${styles.flits_skeleton_user_box}`}
              >
                <div
                  className={`${styles.flits_d_flex} ${styles.flits_skeleton_box} ${styles.flits_skeleton_user_name}`}
                >
                  <p
                    className={`${styles.flits_h4} ${styles.flits_user_name}`}
                  ></p>
                </div>
                <div
                  className={`${styles.flits_d_flex} ${styles.flits_align_items_center} ${styles.flits_skeleton_box} ${styles.flits_skeleton_time}`}
                >
                  <svg className={`${styles.flits_svg_clock}`}>
                    <g>
                      <circle
                        className={`${styles.flits_clock_circle}`}
                        cx="50%"
                        cy="50%"
                        r="45%"
                      ></circle>
                    </g>
                    <g className={`${styles.flits_clock_hande}`}>
                      <line
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="25%"
                        id="flits-hourhand"
                      ></line>
                      <line
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="15%"
                        id="flits-minutehand"
                      ></line>
                      <line
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="12%"
                        id="flits-secondhand"
                      ></line>
                    </g>
                    <circle
                      className={`${styles.flits_clock_hand_center}`}
                      cx="50%"
                      cy="50%"
                      r="3%"
                    ></circle>
                  </svg>
                  <p className={`${styles.flits_current_time}`}></p>
                </div>
              </div>
            </div>
            <div className={`${styles.flits_skeleton_menus_list_box}`}>
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
              <div className={`${styles.flits_skeleton_menu_divider}`}></div>
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
              <div className={`${styles.flits_skeleton_menu_divider}`}></div>
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
              <div className={`${styles.flits_skeleton_menu_divider}`}></div>
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
              <div className={`${styles.flits_skeleton_menu_divider}`}></div>
              <div className={`${styles.flits_skeleton_menu_item}`}>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_10}`}
                ></div>
              </div>
              <div className={`${styles.flits_skeleton_menu_divider}`}></div>
              <div className={`${styles.flits_skeleton_menu_item}`}>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_11}`}
                ></div>
              </div>
              <div className={`${styles.flits_skeleton_menu_item}`}>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_12}`}
                ></div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.flits_account_body} ${styles.flits_skeleton_account_body}`}
          >
            {/* {% liquid 
                for module in modules
                assign module_id = module | replace: 'module_', 'flits_tab_'
                render 'flits_capture_code' with 'module',template:module, id:module_id
                endfor 
                %} */}
          </div>
          <div className={`${styles.flits_clearfix}`}></div>
        </div>
        <div
          className={`${styles.flits_account_section} ${styles.flits_mobile_view} ${styles.flits_skeleton_mobile}`}
        >
          <div
            className={`${styles.flits_slider_menu_nav} ${styles.flits_skeleton_slider_menu_nav}`}
          >
            <div
              className={`${styles.flits_menus_list_box} ${styles.flits_hide}`}
            >
              <div className={`${styles.flits_menu_items}`}></div>
            </div>
            <div className={`${styles.flits_skeleton_menus_list_box}`}>
              <div className={`${styles.flits_skeleton_menu_item}`}>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_1}`}
                ></div>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_2}`}
                ></div>
              </div>
              <div className={`${styles.flits_skeleton_menu_item}`}>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_1}`}
                ></div>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_2}`}
                ></div>
              </div>
              <div className={`${styles.flits_skeleton_menu_item}`}>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_1}`}
                ></div>
                <div
                  className={`${styles.flits_skeleton_box} ${styles.flits_skeleton_box_2}`}
                ></div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.flits_mobile_account_body} ${styles.flits_skeleton_mobile_account_body}`}
          >
            {/* {% liquid 
              for module in modules
              assign module_id = module | replace: 'module_', 'flits_mobile_tab_'
              assign module_name = module | replace: 'module_', 'module_mobile_'
              render 'flits_capture_code' with 'module',template:module_name, id:module_id
              endfor 
              %} */}
          </div>
        </div>
      </div>
    </>
  );
};
