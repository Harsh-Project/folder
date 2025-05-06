import React from 'react';
import { useEffect } from 'react';
import { SocialLogin } from './SocialLogin/SocialLogin';

function App() {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return (
   <SocialLogin />
  );
}

export default App;
