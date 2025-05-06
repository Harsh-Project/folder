export const handleAdd = (dispatch, setFormMode, setFormData) => {
    dispatch(setFormMode(true));
    dispatch(
      setFormData({
        title: "Add New Address",
        id: "",
        customer_id: "",
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        company: "",
        zip: "",
        phone: "",
        check: false,
        city: "",
        country: "",
        province: "",
        needMark: true,
      })
    );
  };