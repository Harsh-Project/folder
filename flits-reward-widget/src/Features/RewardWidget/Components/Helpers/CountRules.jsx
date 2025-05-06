export const CountRules = (jsonData) => {
  let totalEarningRules = 0;
  let totalSpendingRules = 0;
  for (const rule of jsonData?.rules?.all_rules_data) {
    if (rule.tab_to_append === "flits_earning_rules") {
      if (rule.column_value === "1" && rule.is_earned === true) {
      } else {
        if (
          rule.module_on === "register" &&
          window?.flitsThemeAppExtensionObjects?.customerExist
        ) {
        } else {
          totalEarningRules++;
        }
      }
    } else if (rule.tab_to_append === "flits_spent_rules") {
      totalSpendingRules++;
    }
  }
  return { totalEarningRules, totalSpendingRules };
};
