export const handleChange = (setOrderField, dispatch, orderField, e, item) => {
    console.log(e);
    const selectedIndex = e.target.selectedIndex;
    const selectedData = item[selectedIndex];
    let field = {};

    const key = item[0]?.product_id;

    field[`${key}ValuePrice`] = selectedData?.value_price;
    field[`${key}Price`] = selectedData?.price;
    field[`${key}Image`] = selectedData?.image;
    field[`${key}Id`] = selectedData?.id;
    field[`${key}Url`] = selectedData?.url;
    field[`${key}ProductTitle`] = selectedData?.product_title
    field[`${key}Inventory`] = selectedData?.inventory_quantity;
    field[`${key}Availabel`] =
      (selectedData?.available === "true" || selectedData?.available === true) ? true : false;

    dispatch(setOrderField({ ...orderField, ...field }));
  };