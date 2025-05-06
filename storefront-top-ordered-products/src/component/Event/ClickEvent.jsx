export const handleClick = (item, dispatch, setOrderField, orderField, value) => {
    dispatch(
      setOrderField({
        ...orderField,
        [`${item[0]?.product_id}Quantity`]: value,
      })
    );
  };