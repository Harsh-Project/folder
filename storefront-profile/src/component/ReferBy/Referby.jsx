import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import { useSelector } from "react-redux";

export const Referby = ({ item }) => {
  const edit = useSelector((state) => state.storeFrontMyProfile.edit);
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );

  const getStore = GlobalStore.Get();
  const useTranslationLanguage =
    getStore._globalActions.Helpers[0].useTranslationLanguage;

  const MyProfileInput = window.UnoDuoComponent("MyProfileInput");
  const MyProfileRow = window.UnoDuoComponent("MyProfileRow");
  const MyProfileLabel = window.UnoDuoComponent("MyProfileLabel");

  const { t } = useTranslationLanguage();

  const handleChange = (value) => {
  };

  if (!MyProfileLabel || !MyProfileInput || !referFriendData || (referFriendData && referFriendData?.refer_by === "")) return null;

  if(parseInt(window?.flitsThemeAppExtensionObjects?.Metafields?.IS_REFER_PROGRAM_ON) !== 1) {return null}
  return (
    <MyProfileRow edit={edit} needmt={true}>
      <MyProfileLabel
        label={
          microFrontEndData?.accountSettings?.template === 2
            ? t("flits.refer_friend_page.you_are_referred_by", "Referred by")
            : `${t("flits.refer_friend_page.you_are_referred_by", "Referred by")} : `
        }
        edit={edit}
      />
      <MyProfileInput
        readOnly={true}
        onValueChange={handleChange}
        value={referFriendData?.refer_by}
        type="text"
        name="referby"
        disabled={true}
        placeholder=""
        edit={edit}
      />
    </MyProfileRow>
  );
};
