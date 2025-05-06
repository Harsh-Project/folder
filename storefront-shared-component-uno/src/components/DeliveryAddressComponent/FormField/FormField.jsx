import styles from "./FormField.module.css";
import React from "react";

export const FormField = (props) => {
  const {
    Company,
    Default,
    Province,
    handleSaveClick,
    Postal,
    Address1,
    City,
    Country,
    Contact,
    AddressButtonSection,
    Address2,
    handleResetClick,
    FirstName,
    LastName,
  } = props;
    return (
    <>
      <div className={styles.flits_row}>
        <FirstName />
        <LastName />
      </div>
      <div className={styles.flits_row}>
        <Address1 />
        <Address2 />
      </div>
      <div className={styles.flits_row}>
        <Company />
        <Postal />
        <Contact />
      </div>
      <div className={styles.flits_row}>
        <City />
        <Country />
        <Province />
      </div>
      <div className={styles.flits_row}>
        <Default />
      </div>
      <div className={styles.flits_row}>
        <AddressButtonSection handleResetClick={handleResetClick} handleSaveClick={handleSaveClick}/>
      </div>
    </>
  );
};
