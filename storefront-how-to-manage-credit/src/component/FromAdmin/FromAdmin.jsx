import React from "react";
import { useSelector } from "react-redux";

export const FromAdmin = () => {
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const FromAdminCard =
    window.UnoDuoComponent("FromAdminCard");
  const Loading = window.UnoDuoComponent("Loading");
  const FromAdminContentWrapper =
    window.UnoDuoComponent("FromAdminContentWrapper");
  const FromAdminHeader =
    window.UnoDuoComponent("FromAdminHeader");
  const FromAdminCardWrapper =
    window.UnoDuoComponent("FromAdminCardWrapper");

    if(!ruleData) {
      return <Loading />
    }
  return (
    <FromAdminContentWrapper>
      <FromAdminHeader />
      <FromAdminCardWrapper>
        {ruleData?.length > 0 && ruleData?.map((item, index) => {
          if (item?.tab_to_append === "flits_from_admin_rules") {
            return <FromAdminCard key={index} item={item} />;
          }

          return null;
        })}
      </FromAdminCardWrapper>
    </FromAdminContentWrapper>
  );
};
