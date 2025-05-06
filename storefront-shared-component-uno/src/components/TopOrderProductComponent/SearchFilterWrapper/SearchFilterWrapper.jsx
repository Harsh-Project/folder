import styles from "./SearchFilterWrapper.module.css";
import React, { Suspense } from "react";
import { SearchField } from '../SearchField/SearchField';
import { FilterField } from '../FilterField/FilterField';

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
