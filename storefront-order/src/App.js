import { MyOrderPage } from "./component/MyOrderPage/MyOrderPage";
import { useDispatch, useSelector } from 'react-redux';
import React,{ useEffect } from "react";

function App(props) {
  const displayThankYouContactUs = useSelector((state) => state.storeFrontContainer.displayThankYouContactUs)
  const dispatch = useDispatch();
  const FormSubmitModal = window.UnoDuoComponent("FormSubmitModal");
  const setDisplayThankYouContactUs = window.containerState("setDisplayThankYouContactUs");
  const thankyouPopupClosed = () => {
    dispatch(setDisplayThankYouContactUs(false));
  }

  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return (
    <>
      <MyOrderPage {...props} />
      {displayThankYouContactUs && <FormSubmitModal onClose={thankyouPopupClosed}/>}
    </>
  );
}

export default App;
