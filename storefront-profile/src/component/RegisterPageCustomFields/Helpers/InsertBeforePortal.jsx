import { useEffect, useId } from "react";
import ReactDOM from "react-dom";

export const InsertBeforePortal = (props) => {
    const id = useId();
    console.log("InsertBeforePortal", id);
    let divElement = window.document.createElement("div");
    divElement.setAttribute("data-flits-portal",id);
    const mainElement = window.document.querySelector(props.insertBefore);
    const parentElement = mainElement?.parentElement;
    parentElement?.insertBefore(divElement,mainElement);
    useEffect(() => {
        return () => {
            window.document.querySelector("[data-flits-portal='"+id+"']")?.remove();
        }
    });

    if(!divElement) {
        return null
    }
    return ReactDOM.createPortal(props.children, divElement);
}