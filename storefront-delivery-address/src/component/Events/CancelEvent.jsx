export const handleCanel = (setFormMode, setFormData, dispatch) => {
  dispatch(setFormMode(false));
  dispatch(
    setFormData({
      title: "",
      id: "",
      customer_id: "",
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      company: "",
      zip: "",
      phone: "",
      city: "",
      country: "",
      province: "",
      check: false,
      needMark: false,
    })
  );
};
