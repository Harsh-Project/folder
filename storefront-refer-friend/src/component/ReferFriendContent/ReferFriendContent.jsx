import React from "react";
import { GlobalStore } from "redux-micro-frontend";
import {useSelector } from "react-redux";
import { handleCopy } from "../Event/Copy";
import { handleShare } from "../Event/Share";
import { handleFacebookShare } from "../Event/FaceBookShare";
import { handleWhatsappShare } from "../Event/WhatsAppShare";
import { useState } from "react";
import { Suspense } from "react";

const field = ["is_store_credit_enable","IS_HOW_TO_EARN_CREDIT_DISPLAY", "IS_STORE_CREDIT_PAID"]

export const ReferFriendContent = () => {
  const getStore = GlobalStore.Get();
  const [currentPage, setCurrentPage] = useState(1);
  const microFrontEndData = useSelector(
    (state) => state.storeFrontContainer.microFrontEndData
  );
  const ReferFriendHowToWork =
    window.UnoDuoComponent("ReferFriendHowToWork");
  const Loading = window.UnoDuoComponent("Loading");
    const CheckRequireField = getStore._globalActions.Helpers[0].CheckRequireField
  const { t } = getStore._globalActions.Helpers[0].useTranslationLanguage();
  const ReferFriendList =
    window.UnoDuoComponent("ReferFriendList");
  const ReferFriendDetail =
    window.UnoDuoComponent("ReferFriendDetail");
  const ReferCardTabs = window.UnoDuoComponent("ReferCardTabs");
  const CustomPagination =
    window.UnoDuoComponent("CustomPagination");
  const ReferCardTab = window.UnoDuoComponent("ReferCardTab");
  const ReferLink = window.UnoDuoComponent("ReferLink");
  const ReferFriendLogWrapper =
    window.UnoDuoComponent("ReferFriendLogWrapper");
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );

  const referFriendData = useSelector(
    (state) => state.storeFrontReferFriend.referFriendData
  );

  const referRuleData =
    ruleData?.length &&
    ruleData?.filter(
      (item) =>
        item?.module_on === "referrer_friend" ||
        item?.module_on === "referrals_total_number" ||
        item?.module_on === "referrals_order_number" ||
        item?.module_on === "referrals_total_spent"
    );

  const handleShareClick = () => {
    handleShare(t);
  };

  const handleWhatsappShareClick = () => {
    handleWhatsappShare(t);
  };

  const handleFacebookShareClick = () => {
    handleFacebookShare(t);
  };

  const handleCopyClick = (setSnackBarMode, setMessage) => {
    handleCopy(setSnackBarMode, setMessage, t);
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const displayedData =
    Array.isArray(referFriendData?.customer?.credit_log) &&
    referFriendData?.customer?.credit_log?.length > 0
      ? referFriendData?.customer?.credit_log.slice(startIndex, endIndex)
      : [];

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  if (
    !ReferLink ||
    !ReferFriendLogWrapper ||
    !referFriendData ||
    !ReferFriendHowToWork
  ) {
    return <Loading />;
  }

  if(!ruleData && CheckRequireField(field)) {
    return null
  }

  if (microFrontEndData?.accountSettings?.template === 2)
    return (
      <Suspense fallback={<Loading />}>
        <ReferFriendHowToWork />
        <ReferLink
          referData={referFriendData}
          handleCopyClick={handleCopyClick}
          handleShare={handleShareClick}
          handleFacebookShare={handleFacebookShareClick}
          handleWhatsappShare={handleWhatsappShareClick}
        />
        {referRuleData?.length && ReferCardTabs && (
          <ReferCardTabs count={referRuleData?.length}>
            {referRuleData?.length > 0 &&
              referRuleData?.map((item, index) => (
                <ReferCardTab item={item} key={index} />
              ))}
          </ReferCardTabs>
        )}
        <ReferFriendLogWrapper referData={referFriendData}>
          {displayedData?.length > 0 &&
            displayedData.map((item) => <ReferFriendList referData={item} />)}
        </ReferFriendLogWrapper>
        <CustomPagination
          data={displayedData}
          itemsPerPage={10}
          changePage={handlePage}
        />
      </Suspense>
    );

  return (
    <Suspense fallback={<Loading />}>
      <ReferFriendHowToWork />
      <ReferLink
        referData={referFriendData}
        handleCopyClick={handleCopyClick}
        handleShare={handleShareClick}
        handleFacebookShare={handleFacebookShareClick}
        handleWhatsappShare={handleWhatsappShareClick}
      />
      {referRuleData?.length && ReferCardTabs && (
        <ReferCardTabs count={referRuleData?.length}>
          {referRuleData?.length > 0 &&
            referRuleData?.map((item, index) => (
              <ReferCardTab item={item} key={index} />
            ))}
        </ReferCardTabs>
      )}
      <ReferFriendLogWrapper referData={referFriendData}>
        <ReferFriendList referData={referFriendData}>
          {displayedData?.length > 0 &&
            displayedData.map((item) => <ReferFriendDetail item={item} />)}
        </ReferFriendList>
        <CustomPagination
          data={displayedData}
          itemsPerPage={10}
          changePage={handlePage}
        />
      </ReferFriendLogWrapper>
    </Suspense>
  );
};
