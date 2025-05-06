import { GlobalStore } from "redux-micro-frontend";

export const IsValidLoginDetails = async (email, password) => {
    const getStore = GlobalStore.Get();
    const API = getStore._globalActions.API[0].API;
    const formData = {
        [`customer[email]`]: email,
        [`customer[password]`]: password,
      };
      const response = await API.sociallogin.account_login(formData);
      const url = response.url;
      if (!url.includes("account/login")) {
        return true;
      }
      return false;
}