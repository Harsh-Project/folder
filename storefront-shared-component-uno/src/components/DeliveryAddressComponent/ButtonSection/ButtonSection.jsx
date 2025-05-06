import styles from "./ButtonSection.module.css";
import React, { Suspense } from "react";
import { EditButton } from './EditButton/EditButton';
import { DeleteButton } from './DeleteButton/DeleteButton';
import { DefaultButton } from './DefaultButton/DefaultButton';

export const ButtonSection = (props) => {
  const {
    item,
    isEditButton,
    isDeleteButton,
    isDefaultButton,
    show,
    defaultSection,
    index,
    handleDefaultEvent,
    handleEditEvent,
    handleDeleteEvent,
  } = props;
  return (
    <div
      className={`${styles.flits_address_card_action} ${
        show ? styles.flits_show : ""
      }`}
    >
      <ul>
        {isEditButton && (
          <Suspense fallback={<></>}>
            <EditButton
              item={item}
              defaultSection={defaultSection}
              index={index}
              handleEditEvent={handleEditEvent}
            />
          </Suspense>
        )}
        {isDeleteButton && (
          <Suspense fallback={<></>}>
            <DeleteButton
              item={item}
              defaultSection={defaultSection}
              index={index}
              handleDeleteEvent={handleDeleteEvent}
            />
          </Suspense>
        )}
        {isDefaultButton && (
          <Suspense fallback={<></>}>
            <DefaultButton
              item={item}
              defaultSection={defaultSection}
              index={index}
              handleDefaultEvent={handleDefaultEvent}
            />
          </Suspense>
        )}
      </ul>
    </div>
  );
};
