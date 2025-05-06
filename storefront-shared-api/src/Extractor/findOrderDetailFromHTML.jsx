function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
function recursiveDecoder(data) {
  if (typeof data === 'string') {
      return decodeHtml(decodeURIComponent(atob(data).replace(/\+/g, " ")));
  } else if (Array.isArray(data)) {
    return data.map(item => recursiveDecoder(item));
  } else if (typeof data === 'object' && data !== null) {
    const decodedObject = {};
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        decodedObject[key] = recursiveDecoder(data[key]);
      }
    }
    return decodedObject;
  }
  return data;
}
export function findOrderDetailsFromHTML(htmlString) {

    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    let orderDataDiv = tempDiv.querySelector(".flits-order-data");
    if(!orderDataDiv){
      return [];
    }
    const encodedData = JSON.parse("["+decodeURIComponent(atob((orderDataDiv.textContent)))+"]")
    const decodedData = recursiveDecoder(encodedData)
    return decodedData;
}