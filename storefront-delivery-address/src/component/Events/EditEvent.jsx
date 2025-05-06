export const handleEdit = (buttondisabled, defaultAddress, item, defaultSection, setFormData, dispatch, setFormMode) => {
    if(buttondisabled) {
      return;
    }
    dispatch(setFormMode(true));

    if(defaultSection === true)
    {
      dispatch(
        setFormData({
          ...defaultAddress,
          title: "Edit Address",
          phone: defaultAddress?.phone ?? "",
          needMark: false,
          defaultSection: true,
        })
      );
      return;
    }

    else {
      dispatch(setFormData({
        ...item,
        phone: item?.phone ?? "",
        title: "Edit Address",
        check: false,
        needMark: true,
        defaultSection: false,
      }))
      return;
    }
  };