export const handleData = (creditData, dispatch, setFilterCredit, mode) => {
  let data = creditData?.customer?.credit_log;
  if (mode === "earn") {
    data = data?.filter(
      (item) => item?.credits > 0
    );
  }

  if (mode === "spent") {
    data = data?.filter(
      (item) => item?.credits < 0
    );
  }

  dispatch(setFilterCredit(data));
};
