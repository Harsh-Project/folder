
import { GlobalStore } from "redux-micro-frontend";

export const GetErrorMsg = (errorCode) => {

    const getStore = GlobalStore.Get();
    const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;
    const { t } = useTranslationLanguage();
    if(errorCode === -1){
        return "";
    }
    let display_error = "";
    switch (parseInt(errorCode)) {
        case 0:
          display_error = t('flits.social_login_page.something_wrong',"Something went wrong please try again.");
          break;
        case 1:
          display_error = t('flits.social_login_page.not_verfied',"Not verfied social login.");
          break;
        case 2:
          display_error = t('flits.social_login_page.social_login_uninstalled',"Social login uninstalled contact store admin.");
          break;
        case 3:
          display_error = t('flits.social_login_page.social_login_not_installed',"Social login not installed correctly contact store admin.");
          break;
        case 4:
          display_error = t('flits.social_login_page.please_authorize_application',"Please authorize application to login.");
          break;
        case 5:
          display_error = t('flits.social_login_page.something_wrong',"Something went wrong please try again.");
          break;
        case 6:
          display_error = t('flits.social_login_page.no_email_provided',"No email provided.");
          break;
        default:
          display_error = t('flits.social_login_page.something_wrong',"Something went wrong please try again.");
          break;
      }
    return display_error;
}