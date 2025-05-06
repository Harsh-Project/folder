export function findAddressFromHTML(htmlString) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  let addressDataDiv = tempDiv.querySelector(".flits-address-data");
  if(!addressDataDiv){
    return [];
  }
  return JSON.parse("["+addressDataDiv.textContent+"]");
  }