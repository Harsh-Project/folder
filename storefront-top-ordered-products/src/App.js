import React from "react";
import { useEffect } from "react";
import { TopOrderProductPage } from "./component/TopOrderProductPage/TopOrderProductPage";

function App(props) {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return (
    <TopOrderProductPage {...props} />
  );
}

export default App;
