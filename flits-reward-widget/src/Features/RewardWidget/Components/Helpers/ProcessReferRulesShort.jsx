import { MoneyFormat } from "./MoneyFormet";
const getReferRuleData = (rule, lang) => {
  const { module_on, credits, column_value, relation, is_fixed } = rule;
  const { themeT } = window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;

  switch (module_on) {
    case "referrer_friend":
      return {
        short_description: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_title",
          "Referral Program"
        ),
        description: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_description",
          "Invite your friends and get {{ credit }} credit when they sign up."
        )?.replace("{{ credit }}", MoneyFormat(credits / 100)),
        credit: credits,
        isFixed: is_fixed,
      };

    case "referrals_order_number":
      if (relation === ">=") {
        return {
          short_description: themeT(
            `flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_${is_fixed ? "" : "percentage_"}credit_rule_title`,
            "Credit on referee's order number {{ order_count }} and next orders"
          )?.replace("{{ order_count }}", column_value),
          description: themeT(
            `flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_${is_fixed ? "" : "percentage_"}credit_rule_description`,
            "You can earn {{ credit }} credit on referee's order number {{ order_count }} and next orders {{ order_count+1 }}, {{ order_count+2 }}... {{ order_count+n }}"
          )
            ?.replace(
              "{{ credit }}",
              is_fixed ? MoneyFormat(credits / 100) : `${credits / 100}%`
            )
            .replace("{{ order_count }}", column_value)
            .replace("{{ order_count+1 }}", parseInt(column_value) + 1)
            .replace("{{ order_count+2 }}", parseInt(column_value) + 2)
            .replace("{{ order_count+n }}", "n"),
          credit: credits,
          isFixed: is_fixed,
        };
      } else {
        return {
          short_description: themeT(
            `flits.reward_widget.refer_friend_page.referrals_specific_order_${is_fixed ? "" : "percentage_"}credit_rule_title`,
            "Credit on specific order by referee"
          ),
          description: themeT(
            `flits.reward_widget.refer_friend_page.referrals_specific_order_${is_fixed ? "" : "percentage_"}credit_rule_description`,
            "You can earn {{ credit }} credit on your referee's order number {{ order_count }}."
          )
            ?.replace(
              "{{ credit }}",
              is_fixed ? MoneyFormat(credits / 100) : `${credits / 100}%`
            )
            .replace("{{ order_count }}", column_value),
          credit: credits,
          isFixed: is_fixed,
        };
      }

    case "referee_friend":
      return {
        short_description: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_title",
          "Referral Program"
        ),
        description: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_description",
          "Invite your friends and get {{ credit }} credit when they sign up."
        )?.replace("{{ credit }}", MoneyFormat(credits / 100)),
        credit: credits,
        isFixed: is_fixed,
      };

    case "referrals_total_number":
      return {
        short_description: themeT(
          "flits.reward_widget.refer_friend_page.credit_on_number_of_referrals_rule_title",
          "Credit on numbers of referrals"
        ),
        description: themeT(
          "flits.reward_widget.refer_friend_page.credit_on_number_of_referrals_rule_description",
          "When you reach {{ referral_count }} referrals you get {{ credit }} credit."
        )
          ?.replace("{{ credit }}", MoneyFormat(credits / 100))
          .replace("{{ referral_count }}", column_value),
        credit: credits,
        isFixed: is_fixed,
      };

    case "referrals_total_spent":
      return {
        short_description: themeT(
          `flits.reward_widget.refer_friend_page.${is_fixed ? "" : "percentage_"}credit_on_referrals_total_spent_amount_rule_title`,
          "Credit after referral's total spent amount"
        ),
        description: themeT(
          `flits.reward_widget.refer_friend_page.${is_fixed ? "" : "percentage_"}credit_on_referrals_total_spent_amount_rule_description`,
          "You can earn {{ credit }} credit when your referral's total spent amount is {{ total_spent_amount }} or more."
        )
          ?.replace(
            "{{ credit }}",
            is_fixed ? MoneyFormat(credits / 100) : `${credits / 100}%`
          )
          .replace("{{ total_spent_amount }}", MoneyFormat(column_value)),
        credit: credits,
        isFixed: is_fixed,
      };
    // Add more cases for other modules
    default:
      return null; // Handle unsupported module_on values
  }
};
export const ProcessReferRulesShort = (rules, lang) => {
  rules = rules?.rules;
  const referRules = rules?.all_rules_data?.filter(
    (rule) =>
      rule.tab_to_append === "flits_earning_rules" &&
      (rule.module_on.includes("referrals") ||
        rule.module_on.includes("referrer") ||
        rule.module_on.includes("referee"))
  );
  if (referRules?.length === 0) {
    return []; // No rules found
  }
  const result = referRules?.map((rule) => {
    return getReferRuleData(rule, lang); // Generate earn rule data for each rule
  });
  return result;
};
