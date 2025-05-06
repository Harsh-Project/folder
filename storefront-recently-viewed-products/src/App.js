import React from 'react';
import { useEffect } from 'react';
import { RecentViewPage } from './component/RecentViewPage/RecentViewPage';

function App(props) {
  useEffect(() => {
    const loaders = document.getElementsByClassName("flits_initial_loader");
    for (let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = "none";
    }
  });
  return <RecentViewPage {...props}/>
}

export default App;
