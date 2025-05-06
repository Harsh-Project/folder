import styles from "./SpentRuleContainerModule.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

export const SpentRuleContainer = ({ item }) => {
  const [indexLi, setIndexLi] = useState(0);
  const getStore = GlobalStore.Get();
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const { maxSpentCredit } = useSelector(state => state.storeFrontHowToManageCredit)
  const formatMoney = getStore._globalActions.Helpers[0].formatMoney;

  const handleClick = (index) => {
    setIndexLi(index);
  };

  return (
    <div
      className={`${styles.flits_box_card} ${styles.flits_spend_rules_range_container} ${styles.flits_p_0} ${styles.flits_mt_15}`}
    >
      <div
        className={`${styles.flits_box_card} ${styles.flits_cart_range_container}`}
      >
        <p className={styles.flits_cart_range_note}>
          {t(
            "flits.how_to_spend_credit_page.select_cart_value",
            "Click on the circles to check the amount of credit you can spend based on cart value."
          )}
        </p>
        <ul className={styles.flits_cart_range_slider}>
          {item?.map(
            (data, index) =>
              data?.tab_to_append === "flits_spent_rules" && (
                <li
                  className={indexLi === index ? styles.active : ""}
                  onClick={() => {
                    handleClick(index);
                  }}
                >
                  <i
                    style={{ fontStyle: "normal" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.description[2]?.min_cart_value ||
                        data?.title[2]?.min_cart_value,
                    }}
                  ></i>
                  <span className={styles.flits_divider}>-</span>
                  <i
                    dangerouslySetInnerHTML={{
                      __html: data?.description[2]?.max_cart_value || "Max",
                    }}
                    style={{ fontStyle: "normal" }}
                  ></i>
                </li>
              )
          )}
        </ul>
      </div>
      <p
        className={styles.flits_spend_rule_description}
        dangerouslySetInnerHTML={{
          __html: `${!Array.isArray(item[indexLi]?.description)
            ? t(
                item[indexLi]?.title[0],
                item[indexLi]?.title[1],
                item[indexLi]?.title?.length > 2
                  ? item[indexLi]?.title[2]
                  : null
              )
            : t(
                item[indexLi]?.description[0],
                item[indexLi]?.description[1],
                item[indexLi]?.description?.length > 2
                  ? item[indexLi]?.description[2]
                  : null
              )} ${maxSpentCredit ? t("flits.how_to_spend_credit_page.max_spent_credit", "You can use a maximum of {{ max_spent_value }} reward credits.", {max_spent_value: formatMoney(maxSpentCredit,window?.flitsThemeAppExtensionObjects?.money_format)}) : ""}`,
        }}
      ></p>
    </div>
  );
};
