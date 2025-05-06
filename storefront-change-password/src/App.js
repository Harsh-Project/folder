import React from "react"
import { useEffect } from 'react';
import { ChangePasswordPage } from './ChangePasswordPage/ChangePasswordPage';

function App(props) {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return (
    <ChangePasswordPage {...props}/>
  );
}

export default App;
