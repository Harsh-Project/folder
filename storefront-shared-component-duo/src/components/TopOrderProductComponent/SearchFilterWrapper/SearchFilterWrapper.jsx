import styles from "./SearchFilterWrapperModule.module.css";
import React, { Suspense } from "react";
import { FilterField } from "../FilterField/FilterField"
import { SearchField } from "../SearchField/SearchField"

export const SearchFilterWrapper = () => {
  return (
    <div className={styles.flits_filter_header}>
      <Suspense fallback={<></>}>
        <SearchField />
        <FilterField />
      </Suspense>
    </div>
  );
};
