const { React, Suspense, lazy, useEffect } = await import("react").then(
  (module) => ({
    lazy: module.lazy,
    Suspense: module.Suspense,
    useEffect: module.useEffect,
    React: module.default,
  })
);
const { Utility } = await import(
  "../../../UtilityFunction/UtilityFunction"
).then((module) => module);
const useDispatch = await import("react-redux").then(
  (module) => module.useDispatch
);
const { setSocialLoginURLData, setUrlFlitsError } = await import(
  "StoreFrontContainerReduxSlice/StoreFrontContainerReduxSlice"
).then((module) => module);
const PageType = lazy(() => import("../../../UtilityFunction/PageType"));

export const Login = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let flits_error = Utility.getURLParameter("flits_error");
    let w = Utility.getURLParameter("w");
    let o = Utility.getURLParameter("o");
    let r = Utility.getURLParameter("r");
    let customer_hash = Utility.getURLParameter("customer_hash");
    let customer_id = Utility.getURLParameter("customer_id");

    let email = Utility.isNull(w) ? null : atob(w);
    let password = Utility.isNull(o) ? null : atob(o);
    let requestId = Utility.isNull(r) ? null : atob(r);
    customer_hash = Utility.isNull(customer_hash) ? null : customer_hash;
    customer_id = Utility.isNull(customer_id) ? null : customer_id;

    let isValidRequestId = Utility.isValidRequestId(requestId);

    if (!Utility.isNull(flits_error)) {
      dispatch(setUrlFlitsError(flits_error));
      window.history.pushState(null, null, "/account/login");
      Utility.setRequestId();
      return;
    }
    if (!requestId) {
      Utility.setRequestId();
      return;
    }
    if (!isValidRequestId) {
      window.history.pushState(null, null, "/account/login");
      Utility.setRequestId();
      return;
    }
    if (Utility.isNull(email) || Utility.isNull(password)) {
      window.history.pushState(null, null, "/account/login");
      Utility.setRequestId();
      return;
    }
    window.history.pushState(null, null, "/account/login");
    dispatch(
      setSocialLoginURLData({
        email: email,
        password: password,
        customer_hash: customer_hash,
        customer_id: customer_id,
        isNeedToLogin: true,
      })
    );
    Utility.setRequestId();
  }, [dispatch]);

  return (
    <Suspense fallback={<div>loading</div>}>
      <PageType pageType={props.pageType} />
    </Suspense>
  );
};
