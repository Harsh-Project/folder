import { GlobalStore } from "redux-micro-frontend";
import styles from "./HowToEarnCardWrapperModule.module.css";
import React from "react";

export const HowToEarnCardWrapper = (props) => {
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  return (
    <div className={`${styles.flits_container_box} ${styles.flits_mt_25}`}>
      <div
        className={`${styles.flits_box_card} ${styles.flits_rules_card_list} ${styles.flits_p_0}`}
      >
        <div
          className={`${styles.flits_rules_card} ${styles.flits_d_flex} ${styles.flits_flex_wrap} ${styles.flits_align_items_stretch} ${styles.flits_p_20} ${styles.flits_pr_10} ${styles.flits_pb_10}`}
        >
          {props?.children}
        </div>
        <div
          className={`${styles.flits_container_footer} ${styles.flits_how_to_earn_not_applicable_note} ${styles.flits_pt_0}`}
        >
          <span> {t("flits.how_to_earn_credit_page.rule_not_applicable", "*Not Applicable")}</span>
          :&nbsp;
          <span>
            {t(
              "flits.how_to_earn_credit_page.why_rule_not_applicable_description",
              "Rule may have been set up on a later date."
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
