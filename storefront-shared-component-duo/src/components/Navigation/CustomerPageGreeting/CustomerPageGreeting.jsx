import styles from "./CustomerPageGreetingModule.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

export const CustomerPageGreeting = (props) => {
  const firstNameInitial = useSelector((state) => state.storeFrontMyProfile.firstNameInitial);
  const [greeting, setGreeting] = useState("Hello");

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();

  useEffect(() => {
    const updateGreeting = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      const dynamicGreeting = (hour) => {
        if (hour >= 5 && hour < 12) {
          return `${t("flits.general.morning","Good Morning")}! `;
        } else if (hour >= 12 && hour < 17) {
          return `${t("flits.general.afternoon","Good Afternoon")}! `;
        } else if ((hour >= 17 && hour <= 24) || (hour > 0 && hour < 5)) {
          return `${t("flits.general.evening","Good Evening")}! `;
        } else {
          return `${t("flits.general.morning","Good Morning")}! `;
        }
      };

      setGreeting(dynamicGreeting(currentHour));
    };

    updateGreeting()

    const intervalId = setInterval(updateGreeting, 1000);

    return () => clearInterval(intervalId);
  }, [t]);

  return (
    <div className={`${styles.flits_greeting_header} flits_account_page_header`}>
      <p className={`${styles.flits_h1} ${styles.flits_greeting_text} flits_greeting_header_title`}>
        <span className={styles.flits_greeting_title}>{greeting}</span>
        <span className={`${styles.flits_user_name} flits_customer_greeting_name`}>{firstNameInitial}</span>
      </p>
    </div>
  );
};
