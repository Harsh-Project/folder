import styles from "./UserBoxModule.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalStore } from "redux-micro-frontend";

export const UserBox = (props) => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  const firstNameInitial = useSelector((state) => state.storeFrontMyProfile.firstNameInitial);
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const updateGreeting = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      const dynamicGreeting = (hour) => {
        if (hour >= 5 && hour < 12) {
          return `${t("flits.general.morning","Good Morning")}! `;
        } else if (hour >= 12 && hour < 17) {
          return `${t("flits.general.afternoon","Good Afternoon")}! `;
        } else if ((hour > 0 && hour < 5) || (hour >= 17 && hour <= 24)) {
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
    <div
      className={`${styles.flits_user_box} ${props?.mt ? styles.flits_mt : ""}`}
    >
      <p className={`${styles.flits_h4} ${styles.flits_greeting_title}`}>
        {greeting}
      </p>
      <span className={styles.flits_user_name}>{firstNameInitial}</span>
    </div>
  );
};
