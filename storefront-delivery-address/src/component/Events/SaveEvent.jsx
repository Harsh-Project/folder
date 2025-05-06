import { getSaveErrMessage } from "./getSaveErrMessage";

export const handleSave = async (
  setFormMode,
  setDeliveryAddressData,
  defaultAddress,
  deliveryAddressData,
  setAddressSnackBarMode,
  setAddressSnackBarMessage,
  setAddressCount,
  addressCount,
  setDefaultAddress,
  formData,
  setPaginationCountAddress,
  t,
  API,
  setFormData,
  dispatch
) => {
  const resetForm = {
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
    province:"",
    check: false,
    needMark: false,
  };
  if (formData?.title === "Edit Address" && formData?.defaultSection === true) {
    dispatch(setAddressSnackBarMode("processing"));
    dispatch(
      setAddressSnackBarMessage(
        t("flits.address_page.updating_address", "Updating Address...")
      )
    );

    const formValue = {
      [`address[first_name]`]: formData?.firstName ?? "",
      [`address[last_name]`]: formData?.lastName ?? "",
      [`address[address1]`]: formData?.addressLine1 ?? "",
      [`address[address2]`]: formData?.addressLine2 ?? "",
      [`address[company]`]: formData?.company ?? "",
      [`address[zip]`]: formData?.zip ?? "",
      [`address[phone]`]:
        formData?.phone.includes("null") || !formData?.phone
          ? ""
          : formData?.phone,
      [`address[city]`]: formData?.city ?? "",
      [`address[country]`]: formData?.country ?? "",
      utf8: "✓",
      [`address[province]`]: formData?.province ?? "",
      [`address[default]`]: formData?.check ? 1 : 0,
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      form_type: "customer_address",
      // eslint-disable-next-line no-dupe-keys
      form_type: "edit",
      _method: "PUT",
    };

    const defaultMake = await API.deliveryaddress.update_address(
      formValue,
      formData?.id
    );
    console.log(defaultMake);

    if (defaultMake?.status === false) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(setAddressSnackBarMessage(getSaveErrMessage(t, defaultMake)));
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2500);
      return;
    }

    if (defaultMake?.status === true) {
      const updateData = deliveryAddressData.map((item1, index) => {
        if (item1?.id !== formData?.id) {
          return item1;
        } else {
          return {
            ...formData,
            province: defaultMake?.address?.data?.province,
            customer_id: defaultMake?.address?.data?.customer_id,
            firstName: defaultMake?.address?.data?.first_name,
            lastName: defaultMake?.address?.data?.last_name,
            provinceCode: defaultMake?.address?.data?.province_code,
            country: defaultMake?.address?.data?.country,
            countryCode: defaultMake?.address?.data?.country_code,
            countryName: defaultMake?.address?.data?.country_name,
            check: true,
            needMark: false,
          };
        }
      });
      dispatch(
        setDefaultAddress({
          ...formData,
          province: defaultMake?.address?.data?.province,
          customer_id: defaultMake?.address?.data?.customer_id,
          firstName: defaultMake?.address?.data?.first_name,
          lastName: defaultMake?.address?.data?.last_name,
          provinceCode: defaultMake?.address?.data?.province_code,
          country: defaultMake?.address?.data?.country,
          countryCode: defaultMake?.address?.data?.country_code,
          countryName: defaultMake?.address?.data?.country_name,
          check: true,
          needMark: false,
        })
      );
      dispatch(setDeliveryAddressData(updateData));
      dispatch(setFormMode(false));
      dispatch(setAddressSnackBarMode("success"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_updated_successfully",
            "Delivery address updated successfully"
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
    }
    dispatch(
      setFormData(resetForm)
    );
    return;
  }

  if (formData?.title === "Edit Address" && !formData?.defaultSection) {
    dispatch(setAddressSnackBarMode("processing"));
    dispatch(
      setAddressSnackBarMessage(
        t("flits.address_page.updating_address", "Updating Address...")
      )
    );

    let formValue = {
      [`address[first_name]`]: formData?.firstName ?? "",
      [`address[last_name]`]: formData?.lastName ?? "",
      [`address[address1]`]: formData?.addressLine1 ?? "",
      [`address[address2]`]: formData?.addressLine2 ?? "",
      [`address[company]`]: formData?.company ?? "",
      [`address[zip]`]: formData?.zip ?? "",
      [`address[phone]`]:
        formData?.phone.includes("null") || !formData?.phone
          ? ""
          : formData?.phone,
      [`address[city]`]: formData?.city ?? "",
      [`address[country]`]: formData?.country ?? "",
      utf8: "✓",
      [`address[province]`]: formData?.province ?? "",
      form_type: "customer_address",
      // eslint-disable-next-line no-dupe-keys
      form_type: "edit",
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
      _method: "PUT",
    };

    if (formData?.check) {
      formValue[`address[default]`] = 1;
    }

    const defaultMake = await API.deliveryaddress.update_address(
      formValue,
      formData?.id
    );
    console.log(defaultMake);

    if (defaultMake?.status === false) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(setAddressSnackBarMessage(getSaveErrMessage(t, defaultMake)));
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2500);
      return;
    }
    if (defaultMake?.status === true) {
      const updateData = !formData?.check
        ? deliveryAddressData.map((item1, index) => {
            if (item1?.id !== formData?.id) {
              return item1;
            } else {
              return {
                ...formData,
                province: defaultMake?.address?.data?.province,
                provinceCode: defaultMake?.address?.data?.province_code,
                customer_id: defaultMake?.address?.data?.customer_id,
                firstName: defaultMake?.address?.data?.first_name,
                lastName: defaultMake?.address?.data?.last_name,
                country: defaultMake?.address?.data?.country,
                countryCode: defaultMake?.address?.data?.country_code,
                countryName: defaultMake?.address?.data?.country_name,
                check: false,
                needMark: true,
              };
            }
          })
        : deliveryAddressData.map((item1, index) => {
            if (item1?.id !== formData?.id) {
              return item1;
            } else {
              return { ...defaultAddress };
            }
          });
      dispatch(setDeliveryAddressData(updateData));
      if (formData?.check) {
        dispatch(
          setDefaultAddress({
            ...formData,
            province: defaultMake?.address?.data?.province,
            customer_id: defaultMake?.address?.data?.customer_id,
            firstName: defaultMake?.address?.data?.first_name,
            lastName: defaultMake?.address?.data?.last_name,
            provinceCode: defaultMake?.address?.data?.province_code,
            country: defaultMake?.address?.data?.country,
            countryCode: defaultMake?.address?.data?.country_code,
            countryName: defaultMake?.address?.data?.country_name,
            check: true,
            needMark: false,
          })
        );
      }
      dispatch(setFormMode(false));
      dispatch(setAddressSnackBarMode("success"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_updated_successfully",
            "Delivery address updated successfully"
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
    }
    dispatch(
      setFormData(resetForm)
    );
    return;
  }

  if (
    formData?.title === "Add New Address" &&
    (!deliveryAddressData || deliveryAddressData?.length === 0)
  ) {
    dispatch(setAddressSnackBarMode("processing"));
    dispatch(
      setAddressSnackBarMessage(
        t("flits.address_page.adding_new_address", "Adding New Address...")
      )
    );
    let updateData = deliveryAddressData ? [...deliveryAddressData] : [];
    let newAddress = {
      ...formData,
      check: false,
      needMark: true,
      phone: formData?.phone?.includes("null") ? "" : formData?.phone,
    };

    let formValue = {
      [`address[first_name]`]: formData?.firstName ?? "",
      [`address[last_name]`]: formData?.lastName ?? "",
      [`address[address1]`]: formData?.addressLine1 ?? "",
      [`address[address2]`]: formData?.addressLine2 ?? "",
      [`address[company]`]: formData?.company ?? "",
      [`address[zip]`]: formData?.zip ?? "",
      [`address[phone]`]:
        formData?.phone.includes("null") || !formData?.phone
          ? ""
          : formData?.phone,
      [`address[city]`]: formData?.city ?? "",
      [`address[country]`]: formData?.country ?? "",
      [`address[province]`]: formData?.province ?? "",
      form_type: "customer_address",
      utf8: "✓",
      // eslint-disable-next-line no-dupe-keys
      form_type: "new",
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
    };

    if(!defaultAddress || !defaultAddress?.id) {
      formValue[`address[default]`] = formData?.check ? 1 : 0
    }

    const defaultMake = await API.deliveryaddress.add_address(formValue);
    console.log(defaultMake);

    if (
      defaultMake?.status === false &&
      defaultMake?.error === "has already been taken"
    ) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_already_taken",
            "This address already exists."
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
      return;
    }

    if (
      defaultMake?.status === false &&
      defaultMake?.error !== "has already been taken"
    ) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(setAddressSnackBarMessage(getSaveErrMessage(t, defaultMake)));
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
      return;
    }

    if (defaultMake?.status === true) {
      dispatch(setFormMode(false));
      dispatch(setAddressSnackBarMode("success"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_added_successfully",
            "Delivery address added successfully"
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
    }

    newAddress = {
      ...newAddress,
      provinceCode: defaultMake?.address?.data?.province_code,
      id: defaultMake?.address?.data?.id,
      province: defaultMake?.address?.data?.province,
      customer_id: defaultMake?.address?.data?.customer_id,
      firstName: defaultMake?.address?.data?.first_name,
      lastName: defaultMake?.address?.data?.last_name,
      country: defaultMake?.address?.data?.country,
      countryCode: defaultMake?.address?.data?.country_code,
      countryName: defaultMake?.address?.data?.country_name,
    };

    if (
      window?.flitsThemeAppExtensionObjects?.customer?.default_address === null
    ) {
      dispatch(setAddressCount(addressCount + 1));
      dispatch(setPaginationCountAddress(Math.ceil(addressCount / 6)));
      dispatch(
        setDefaultAddress({
          ...newAddress,
          check: true,
          needMark: false,
        })
      );
      dispatch(
        setFormData(resetForm)
      );
      return;
    }

    if (!formData?.check) {
      updateData.push(newAddress);

      dispatch(setAddressCount(addressCount + 1));
      dispatch(setPaginationCountAddress(Math.ceil(addressCount / 6)));
      dispatch(setDeliveryAddressData(updateData));
    }

    if (formData?.check) {
      updateData.push(defaultAddress);

      dispatch(setAddressCount(addressCount + 1));
      dispatch(setDeliveryAddressData(updateData));
      dispatch(setPaginationCountAddress(Math.ceil(addressCount / 6)));
      dispatch(
        setDefaultAddress({
          ...newAddress,
          check: true,
          needMark: false,
        })
      );
    }
    dispatch(
      setFormData(resetForm)
    );
    return;
  }

  if (formData?.title === "Add New Address" && formData?.check === true) {
    dispatch(setAddressSnackBarMode("processing"));
    dispatch(
      setAddressSnackBarMessage(
        t("flits.address_page.adding_new_address", "Adding New Address...")
      )
    );
    let updateData = [...deliveryAddressData];
    let newAddress = {
      ...formData,
      check: false,
      needMark: true,
      phone: formData?.phone?.includes("null") ? "" : formData?.phone,
    };

    let formValue = {
      [`address[first_name]`]: formData?.firstName ?? "",
      [`address[last_name]`]: formData?.lastName ?? "",
      [`address[address1]`]: formData?.addressLine1 ?? "",
      [`address[address2]`]: formData?.addressLine2 ?? "",
      [`address[company]`]: formData?.company ?? "",
      [`address[zip]`]: formData?.zip ?? "",
      [`address[phone]`]:
        formData?.phone.includes("null") || !formData?.phone
          ? ""
          : formData?.phone,
      [`address[city]`]: formData?.city ?? "",
      [`address[country]`]: formData?.country ?? "",
      [`address[default]`]: formData?.check ? 1 : 0,
      [`address[province]`]: formData?.province ?? "",
      form_type: "customer_address",
      utf8: "✓",
      // eslint-disable-next-line no-dupe-keys
      form_type: "new",
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
    };

    const defaultMake = await API.deliveryaddress.add_address(formValue);
    console.log(defaultMake);

    if (
      defaultMake?.status === false &&
      defaultMake?.error === "has already been taken"
    ) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_already_taken",
            "This address already exists."
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
      return;
    }

    if (
      defaultMake?.status === false &&
      defaultMake?.error !== "has already been taken"
    ) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(setAddressSnackBarMessage(getSaveErrMessage(t, defaultMake)));
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
      return;
    }

    if (defaultMake?.status === true) {
      dispatch(setFormMode(false));
      dispatch(setAddressSnackBarMode("success"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_added_successfully",
            "Delivery address added successfully"
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
    }

    newAddress = {
      ...newAddress,
      provinceCode: defaultMake?.address?.data?.province_code,
      id: defaultMake?.address?.data?.id,
      province: defaultMake?.address?.data?.province,
      customer_id: defaultMake?.address?.data?.customer_id,
      firstName: defaultMake?.address?.data?.first_name,
      lastName: defaultMake?.address?.data?.last_name,
      country: defaultMake?.address?.data?.country,
      countryCode: defaultMake?.address?.data?.country_code,
      countryName: defaultMake?.address?.data?.country_name,
    };
    updateData.push(defaultAddress);
    dispatch(setAddressCount(addressCount + 1));
    dispatch(setPaginationCountAddress(Math.ceil(addressCount / 6)));
    dispatch(setDeliveryAddressData(updateData));
    dispatch(
      setDefaultAddress({
        ...newAddress,
        check: true,
        needMark: false,
      })
    );
    dispatch(
      setFormData(resetForm)
    );
    return;
  }

  if (formData?.title === "Add New Address" && !formData?.check) {
    dispatch(setAddressSnackBarMode("processing"));
    dispatch(
      setAddressSnackBarMessage(
        t("flits.address_page.adding_new_address", "Adding New Address...")
      )
    );
    let updateData = [...deliveryAddressData];
    let newAddress = {
      ...formData,
      check: false,
      needMark: true,
      phone: formData?.phone?.includes("null") ? "" : formData?.phone,
    };

    let formValue = {
      [`address[first_name]`]: formData?.firstName ?? "",
      [`address[last_name]`]: formData?.lastName ?? "",
      [`address[address1]`]: formData?.addressLine1 ?? "",
      [`address[address2]`]: formData?.addressLine2 ?? "",
      [`address[company]`]: formData?.company ?? "",
      [`address[zip]`]: formData?.zip ?? "",
      [`address[phone]`]:
        formData?.phone.includes("null") || !formData?.phone
          ? ""
          : formData?.phone,
      [`address[city]`]: formData?.city ?? "",
      [`address[country]`]: formData?.country ?? "",
      [`address[province]`]: formData?.province ?? "",
      form_type: "customer_address",
      utf8: "✓",
      // eslint-disable-next-line no-dupe-keys
      form_type: "new",
      customer_hash:
        window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
      token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
    };

    const defaultMake = await API.deliveryaddress.add_address(formValue);
    console.log(defaultMake);

    if (
      defaultMake?.status === false &&
      defaultMake?.error === "has already been taken"
    ) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_already_taken",
            "This address already exists."
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
      return;
    }
    if (
      defaultMake?.status === false &&
      defaultMake?.error !== "has already been taken"
    ) {
      dispatch(setAddressSnackBarMode("error"));
      dispatch(setAddressSnackBarMessage(getSaveErrMessage(t, defaultMake)));
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
      return;
    }
    if (defaultMake?.status === true) {
      dispatch(setFormMode(false));
      dispatch(setAddressSnackBarMode("success"));
      dispatch(
        setAddressSnackBarMessage(
          t(
            "flits.address_page.address_added_successfully",
            "Delivery address added successfully"
          )
        )
      );
      setTimeout(() => {
        dispatch(setAddressSnackBarMode(null));
        dispatch(setAddressSnackBarMessage(""));
      }, 2000);
    }

    newAddress = {
      ...newAddress,
      provinceCode: defaultMake?.address?.data?.province_code,
      id: defaultMake?.address?.data?.id,
      province: defaultMake?.address?.data?.province,
      customer_id: defaultMake?.address?.data?.customer_id,
      firstName: defaultMake?.address?.data?.first_name,
      lastName: defaultMake?.address?.data?.last_name,
      country: defaultMake?.address?.data?.country,
      countryCode: defaultMake?.address?.data?.country_code,
      countryName: defaultMake?.address?.data?.country_name,
    };
    updateData.push(newAddress);
    dispatch(setAddressCount(addressCount + 1));
    dispatch(setPaginationCountAddress(Math.ceil(addressCount / 6)));
    dispatch(setDeliveryAddressData(updateData));

    dispatch(
      setFormData(resetForm)
    );
    return;
  }
};
