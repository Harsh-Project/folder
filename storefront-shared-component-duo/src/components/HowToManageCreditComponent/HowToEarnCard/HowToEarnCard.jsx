/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./HowToEarnCardModule.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { formatMoney } from "../../General/formatMoney";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
/* eslint-disable jsx-a11y/anchor-is-valid */

export const HowToEarnCard = ({ item }) => {
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const dispatch = useDispatch();
  const getStore = GlobalStore.Get();
  const API = getStore._globalActions.API[0].API;
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const setHowToManageCreditMode = window.manageCreditState(
    "setHowToManageCreditMode"
  );
  const setHowToManageCreditMessage = window.manageCreditState(
    "setHowToManageCreditMessage"
  );
  let accept_marketing =
    window?.flitsThemeAppExtensionObjects?.customer
      ?.customer_accept_marketing === "true"
      ? true
      : false;
  const creditData = useSelector((state) => state.storeFrontCredit.creditData);
  const setRuleData = window.manageCreditState("setRuleData");

  const getTotalCredit = () => {
    const idArray =
      item?.mappedRuleIds?.length > 0 ? item?.mappedRuleIds : [item?.rule_id];
    let total = 0;

    for (let i = 0; i < idArray?.length; i++) {
      total += window?.creditIdArray?.[idArray[i]] ?? 0;
    }

    return total;
  };

  const handleClick = async () => {
    dispatch(setHowToManageCreditMode("successInfo"));
    dispatch(
      setHowToManageCreditMessage(
        t(
          "flits.how_to_earn_credit_page.subscribing_email",
          "Your request to receive a mail subscription from the store is being accepted."
        )
      )
    );
    const data = {
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      credit_subject: "subscribe",
      accepts_marketing: true,
    };
    const res = await API.howtomanagecredit.general_subscription_save(data);

    if (res?.status) {
      dispatch(
        setHowToManageCreditMessage(
          t(
            "flits.how_to_earn_credit_page.subscribed_successfully",
            "Please check your mail inbox to confirm subscription"
          )
        )
      );

      setTimeout(() => {
        dispatch(setHowToManageCreditMode(null));
        dispatch(setHowToManageCreditMessage(""));
      }, 2500);

      const newData = ruleData?.map((item1) => {
        if (item?.rule_id !== item1?.rule_id) {
          return item1;
        }

        return {
          ...item1,
          is_earned: true,
          notApplicable: false,
          ruleEarned: true,
        };
      });
      accept_marketing = true;
      dispatch(setRuleData(newData));
    } else {
      dispatch(setHowToManageCreditMode("error"));
      dispatch(
        setHowToManageCreditMessage(
          t(
            "flits.general.something_went_wrong",
            "Something went wrong. Please try again."
          )
        )
      );

      setTimeout(() => {
        dispatch(setHowToManageCreditMode(null));
        dispatch(setHowToManageCreditMessage(""));
      }, 2500);

      return;
    }
  };

  const handleProfilePageClick = () => {
    const id = document.getElementById("profile");
    if (id) {
      id.click();
    }
  };

  if (!creditData) {
    return null;
  }

  if (
    item?.module_on === "subscribe" &&
    !accept_marketing &&
    !item?.ruleEarned
  ) {
    return (
      <>
        <div
          id={item?.rule_id}
          className={`${styles.flits_rule_card} ${styles.flits_rule_earned} ${
            item?.notApplicable ? styles.flits_rule_not_applicable : ""
          }`}
        >
          <p
            className={styles.flits_rule_title}
            dangerouslySetInnerHTML={{
              __html: t(
                item?.title[0],
                item?.title[1],
                item?.title?.length > 2 ? item?.title[2] : null
              ),
            }}
          ></p>
          <p
            className={styles.flits_rule_description}
            dangerouslySetInnerHTML={{
              __html: t(
                item?.description[0],
                item?.description[1],
                item?.description?.length > 2 ? item?.description[2] : null
              ),
            }}
          ></p>
          <div className={styles.flits_rule_footer}>
            <a
              onClick={handleClick}
              className={styles.flits_unlock_badge}
              dangerouslySetInnerHTML={{
                __html: item?.linkButtonText
                  ? t(...item?.linkButtonText)
                  : item?.is_fixed || item?.module_on == "monthly_date"
                  ? t(
                      "flits.how_to_earn_credit_page.unlock_fixed_credit",
                      "Unlock {{ credit }}",
                      {
                        credit: formatMoney(
                          Math.abs(item?.credits),
                          window?.flitsThemeAppExtensionObjects?.money_format
                        ),
                      }
                    )
                  : t(
                      "flits.how_to_earn_credit_page.unlock_some_percentage_credit",
                      "Unlock {{ credit }} cashback",
                      {
                        credit: `${item?.credits / 100}%`,
                      }
                    ),
              }}
            ></a>

            <div className={styles.flits_rule_image}>
              <img
                alt=""
                src={`data:image/svg+xml;base64,${
                  window?.HowToManageCreditIcon?.[item?.module_on]?.icon
                }`}
              ></img>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (item?.module_on === "birthdate") {
    return (
      <div className={`${styles.flits_rule_card} ${styles.flits_rule_earned}`}>
        <p
          className={styles.flits_rule_title}
          dangerouslySetInnerHTML={{
            __html: t(
              item?.title[0],
              item?.title[1],
              item?.title?.length > 2 ? item?.title[2] : null
            ),
          }}
        ></p>
        {!window?.flitsThemeAppExtensionObjects?.customer?.birthday && (
          <p
            className={styles.flits_rule_description}
            dangerouslySetInnerHTML={{
              __html: t(
                item?.description[0],
                item?.description[1],
                item?.description?.length > 2 ? item?.description[2] : null
              ),
            }}
          ></p>
        )}
        {window?.flitsThemeAppExtensionObjects?.customer?.birthday?.length >
          0 && (
          <p
            className={styles.flits_rule_description}
            dangerouslySetInnerHTML={{
              __html: t(
                item?.description2[0],
                item?.description2[1],
                item?.description2?.length > 2 ? item?.description2[2] : null
              ),
            }}
          ></p>
        )}
        <p
          className={`${styles.flits_rule_description} ${styles.flits_birthday_terms_condition} ${styles.flits_mt_10}`}
          dangerouslySetInnerHTML={{
            __html: t(
              item?.description3[0],
              item?.description3[1],
              item?.description3?.length > 2 ? item?.description3[2] : null
            ),
          }}
        ></p>
        <div className={styles.flits_rule_footer}>
          {!window?.flitsThemeAppExtensionObjects?.customer?.birthday
            ?.length && (
            <a
              className={styles.flits_unlock_badge}
              onClick={handleProfilePageClick}
              dangerouslySetInnerHTML={{
                __html: item?.linkButtonText
                  ? t(...item?.linkButtonText)
                  : item?.is_fixed || item?.module_on == "monthly_date"
                  ? t(
                      "flits.how_to_earn_credit_page.unlock_fixed_credit",
                      "Unlock {{ credit }}",
                      {
                        credit: formatMoney(
                          Math.abs(item?.credits),
                          window?.flitsThemeAppExtensionObjects?.money_format
                        ),
                      }
                    )
                  : t(
                      "flits.how_to_earn_credit_page.unlock_some_percentage_credit",
                      "Unlock {{ credit }} cashback",
                      {
                        credit: `${item?.credits / 100}%`,
                      }
                    ),
              }}
            ></a>
          )}
          <div className={styles.flits_rule_image}>
            <img
              alt=""
              src={`data:image/svg+xml;base64,${
                window?.HowToManageCreditIcon?.[item?.module_on]?.icon
              }`}
            ></img>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={item?.rule_id}
      className={`${styles.flits_rule_card} ${styles.flits_rule_earned} ${
        item?.notApplicable ? styles.flits_rule_not_applicable : ""
      } ${item?.module_on === "register" ? styles.flits_register_order : ""}`}
    >
      <p
        className={styles.flits_rule_title}
        dangerouslySetInnerHTML={{
          __html: t(
            item?.title[0],
            item?.title[1],
            item?.title?.length > 2 ? item?.title[2] : null
          ),
        }}
      ></p>
      <p
        className={styles.flits_rule_description}
        dangerouslySetInnerHTML={{
          __html: t(
            item?.description[0],
            item?.description[1],
            item?.description?.length > 2 ? item?.description[2] : null
          ),
        }}
      ></p>
      {item?.showEarnCredit && getTotalCredit() > 0 && (
        <p
          className={styles.flits_rule_earn_credit}
          dangerouslySetInnerHTML={{
            __html: t(
              "flits.how_to_earn_credit_page.total_earned_credit_by_rule",
              "Total points earned: {{ credit }}",
              {
                credit: formatMoney(
                  Math.abs(getTotalCredit()),
                  window?.flitsThemeAppExtensionObjects?.money_format
                ),
              }
            ),
          }}
        ></p>
      )}
      <div className={styles.flits_rule_footer}>
        {item?.notApplicable ? (
          <a className={styles.flits_unlock_badge}>
            {t(
              "flits.how_to_earn_credit_page.rule_not_applicable",
              "*Not Applicable"
            )}
          </a>
        ) : (
          !item?.ruleEarned && (
            <a
              className={styles.flits_unlock_badge}
              href={
                item?.module_on === "product_tag"
                  ? `/search?q=${item?.avails[0]}`
                  : `${
                      window?.commonEndpoint?.collection ?? ""
                    }/collections/all`
              }
              dangerouslySetInnerHTML={{
                __html: item?.linkButtonText
                  ? t(...item?.linkButtonText)
                  : item?.is_fixed || item?.module_on == "monthly_date"
                  ? t(
                      "flits.how_to_earn_credit_page.unlock_fixed_credit",
                      "Unlock {{ credit }}",
                      {
                        credit: formatMoney(
                          Math.abs(item?.credits),
                          window?.flitsThemeAppExtensionObjects?.money_format
                        ),
                      }
                    )
                  : t(
                      "flits.how_to_earn_credit_page.unlock_some_percentage_credit",
                      "Unlock {{ credit }} cashback",
                      {
                        credit: `${item?.credits / 100}%`,
                      }
                    ),
              }}
            ></a>
          )
        )}
        <div className={styles.flits_rule_image}>
          <img
            alt=""
            src={`data:image/svg+xml;base64,${
              window?.HowToManageCreditIcon?.[item?.module_on]?.icon
            }`}
          ></img>
        </div>
      </div>
      {!item?.notApplicable && item?.ruleEarned && (
        <div className={styles.flits_rules_earn_overlay}>
          <img
            alt=""
            src={`data:image/svg+xml;base64,${window?.HowToManageCreditIcon?.["removed"]?.icon}`}
          ></img>
        </div>
      )}
    </div>
  );
};
