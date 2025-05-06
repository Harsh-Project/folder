const { React, Suspense, lazy } = await import("react").then((module) => ({
  lazy: module.lazy,
  Suspense: module.Suspense,
  React: module.default,
}))
const useDispatch = await import("react-redux").then((module) => module.useDispatch)
const { useEffect } = await import("react").then((module) => ({useEffect: module.useEffect}));
const { Utility } = await import("../../../UtilityFunction/UtilityFunction").then((module) => module);
const { setReferalRegisterPage } = await import("StoreFrontContainerReduxSlice/StoreFrontContainerReduxSlice").then((module) => module);
const PageType = lazy(() => import('../../../UtilityFunction/PageType'))

export const Register = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const flits_refer_code_url_param = Utility.getURLParameter('flits_refer_code');
        const flits_referral_code_cookie = Utility.getCookie('flits-referral-code');
        if(!(!Utility.isNull(flits_refer_code_url_param) ||
        !Utility.isNull(flits_referral_code_cookie)) &&
      (window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "-1" ||
        window?.flitsThemeAppExtensionObjects?.customer?.customer_id === "")){
          return;
        }
        const flits_inviter_name_url_param = Utility.getURLParameter('flits_inviter_name');
        let referralCode = null;
        let flitsInviterName = '';
        if(!Utility.isNull(flits_refer_code_url_param)){
          referralCode = atob(flits_refer_code_url_param);
          Utility.setCookie('flits-referral-code',referralCode,1);
        }
        if(!Utility.isNull(flits_inviter_name_url_param)){
          flitsInviterName = atob(flits_inviter_name_url_param);
          Utility.setCookie('flits-inviter-name',flitsInviterName,1);
        }
        if(!Utility.isNull(Utility.getCookie('flits-referral-code'))){
          referralCode = Utility.getCookie('flits-referral-code');
        }
        if(!Utility.isNull(Utility.getCookie('flits-inviter-name'))){
          flitsInviterName = Utility.getCookie('flits-inviter-name');
        }
        let isPopupClosed = !Utility.isNull(Utility.getCookie('flits-referral-popup-closed'));
        dispatch(setReferalRegisterPage({
          isNeedToShowPopup: !isPopupClosed,
          referralCode: referralCode,
          inviterName: flitsInviterName
        }));
        Utility.setCookie('flits-referral-popup-closed','1',1);
        window.history.replaceState({}, window.document.title, window.location.protocol +"//" + window.location.host + window.location.pathname)
      },[dispatch]);

    return <Suspense fallback={<div>loading</div>}><PageType pageType={props.pageType} /></Suspense>;
}