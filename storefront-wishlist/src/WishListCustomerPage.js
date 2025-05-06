import React,{ useEffect } from "react";
import { WishListPage } from "./component/WishListPage/WishListPage";

function WisListCustomerPage(props) {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return <WishListPage {...props}/>
}

export default WisListCustomerPage;
