export const MyProfileCustomFieldHeight = (name, description, required_message, edit, isSmallScreen) => {
  if(edit && isSmallScreen) {
    let flitsInputWrapActualHeight = 0;
      const initialClass = document.getElementById(name);
      console.log(name, initialClass)
      if(initialClass && initialClass.getAttribute("data-actual-height")) {
        flitsInputWrapActualHeight = parseFloat(initialClass.getAttribute("data-actual-height"))
      }
      else {
        const getInput = document.querySelectorAll(".flits-input-height-selector[data-unique-id="+ name +"]")[0];
        initialClass.setAttribute("data-actual-heigh", getInput.getBoundingClientRect().height)
        flitsInputWrapActualHeight = getInput.getBoundingClientRect().height;
      console.log(name, getInput, flitsInputWrapActualHeight)

      }

      let flitsInputWrapNewHeight = flitsInputWrapActualHeight;

      if(required_message) {
        let errorDiv = document.querySelectorAll(
          ".flits-custom-field-error-message[data-unique-id="+ name +"]"
        )[0];
        let errorDivHeight = errorDiv.getBoundingClientRect().height;
        
        flitsInputWrapNewHeight = flitsInputWrapNewHeight + errorDivHeight;
        console.log(name, errorDiv, errorDivHeight, flitsInputWrapNewHeight)
      }

      if(description && description?.length >0) {
        let descriptionDiv = document.querySelectorAll(
          ".flits-custom-field-description[data-unique-id="+ name +"]"
        )[0];
        let descriptionDivHeight = descriptionDiv.getBoundingClientRect().height;

        flitsInputWrapNewHeight = flitsInputWrapNewHeight + descriptionDivHeight;
        console.log(name, descriptionDiv, descriptionDivHeight, flitsInputWrapNewHeight)

      }

      if(flitsInputWrapNewHeight >= flitsInputWrapActualHeight) {
        initialClass.style.height = `${flitsInputWrapNewHeight}px`;
      }
    }
    else {
      const initialClass = document.getElementById(name);
      console.log(name, initialClass)
      if(initialClass) {
        initialClass.style.height = "auto";
      }
    }
}
