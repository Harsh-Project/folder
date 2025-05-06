import styles from "./NoProductFound.module.css";
import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { RenderSvgString } from "../../General/RenderSvgString";

export const NoProductFound = () => {
  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
  const { t } = useTranslationLanguage();
  return (
    <div className={`${styles.flits_not_find} ${styles.flits_active}`}>
      <RenderSvgString svgString={window?.UnoIcon?.NoProductEmoji}
      />
      <p dangerouslySetInnerHTML={{ __html: t("flits.top_ordered_products_page.search_product_not_found", "No products found<br>Please try changing search terms or filter option") }}></p>
    </div>
  );
};
