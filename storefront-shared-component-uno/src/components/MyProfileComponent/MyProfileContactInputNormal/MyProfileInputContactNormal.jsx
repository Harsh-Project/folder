import styles from "./MyProfileContactInputNormal.module.css";
import React from "react";

export const MyProfileInputContactNormal = (props) => {
  return (
    <>
      <input
        type={props?.type}
        className={`${styles.flits_input}`}
        placeholder={props?.placeholder ?? ""}
        name={props?.name ?? ""}
        value={props?.value}
        onChange={(e) => {}}
        readOnly={props?.readOnly ?? false}
      />
    </>
  );
};
