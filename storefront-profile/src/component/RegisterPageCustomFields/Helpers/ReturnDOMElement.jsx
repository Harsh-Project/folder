export const ReturnDOMElement = (html) => {
    let div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}