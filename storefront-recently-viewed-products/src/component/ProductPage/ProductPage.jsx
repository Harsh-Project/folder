import React,{ useEffect } from "react";
import { recentlyViewDataStore } from "../Helpers/recentlyViewDataStore";

function ProductPage(){

    useEffect(() => {
      recentlyViewDataStore(window?.flitsThemeAppExtensionObjects?.product?.product_handle);
    },[]);
    return <></>;
}
export default ProductPage;