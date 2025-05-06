import React from "react"
import { useEffect } from "react";
import { DeliveryAddressPage } from "./component/DeliveryAddressPage/DeliveryAddressPage";
import { useDispatch } from "react-redux";
import { handleCanel } from "./component/Events/CancelEvent";

function App(props) {
  const dispatch = useDispatch();
  const setFormMode = window.deliveryAddressState("setFormMode");
  const setFormData = window.deliveryAddressState("setFormData");
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });

  useEffect(() => {
    handleCanel(setFormMode, setFormData, dispatch)
  }, [dispatch, setFormData, setFormMode])
  return <DeliveryAddressPage {...props} />;
}

export default App;
