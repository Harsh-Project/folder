import React from "react";
import { useEffect } from "react";
import {ProductPageButton} from "./WishlistButtons/ProductPageButton/ProductPageButton";

function App(props) {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return (
    <div className="wishlist">
      <ProductPageButton />
    </div>
  );
}

export default App;
