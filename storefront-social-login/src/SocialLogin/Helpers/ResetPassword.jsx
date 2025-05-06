import { GlobalStore } from "redux-micro-frontend";

export const ResetPassword = async (email, customer_id, customer_hash) => {
    const getStore = GlobalStore.Get();
    const API = getStore._globalActions.API[0].API;
    const formValues = {
        email: btoa(email),
        customer_id: customer_id,
        customer_hash: customer_hash,
        token: window?.flitsThemeAppExtensionObjects?.Metafields?.SHOP_TOKEN
      };
      const resetResponse = await API.sociallogin.reset_password(formValues);

      const resp = resetResponse;
      if(!resp.status){
        console.log("Unable to login into customer account. error: ",resp.error);
        return;
      }
      let password = (resp.o) ? atob(resp.o) : null;
      return password;
}