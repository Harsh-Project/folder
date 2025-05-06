import { MoneyFormat } from "./MoneyFormet";

const getReferRuleData = (rule, lang) => {
  const { module_on, credits, column_value, is_fixed, relation } = rule;
  const { themeT } =
    window?.flitsThemeAppExtensionObjects?.useTranslationLanguage;

  switch (module_on) {
    case "referrer_friend":
      return {
        title: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_title",
          "Refer friends"
        ),
        description: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_description",
          "Earn {{ credit }} points when a friend signs up",
          {
            credit: MoneyFormat(credits / 100),
          }
        ),

        linkTo: !window?.flitsThemeAppExtensionObjects?.customerExist
          ? window?.commonEndpoint?.login ?? "/account/login"
          : null,

        linkBtntext: themeT(
          "flits.reward_widget.refer_friend_page.referrer_friend_rule_btn_text",
          "Refer"
        ),
        isEarned: false,
      };

    case "referrals_order_number":
      if (relation === ">=") {
        return {
          title: themeT(
            is_fixed
              ? `flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_title`
              : `flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_title`,
            is_fixed
              ? "Referral's continuing orders"
              : "Referral's continuing orders",
            {
              order_count: column_value,
            }
          ),
          description: themeT(
            is_fixed
              ? `flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_description`
              : `flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_description`,
            is_fixed
              ? "Earn {{ credit }} points from all referral's orders from order no. {{ order_count }}"
              : "Earn {{ credit }} of order value as points from all referral orders from order no. {{ order_count }} onwards",
            {
              credit: is_fixed
                ? MoneyFormat(credits / 100)
                : `${credits / 100}%`,
              order_count: parseInt(column_value),
              "order_count+1": parseInt(parseInt(column_value) + 1),
              "order_count+2": parseInt(column_value) + 2,
              "order_count+n": "n",
            }
          ),

          linkTo: !window?.flitsThemeAppExtensionObjects?.customerExist
            ? window?.commonEndpoint?.login ?? "/account/login"
            : null,

          linkBtntext: themeT(
            is_fixed
              ? "flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_btn_text"
              : "flits.reward_widget.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_btn_text",
            is_fixed ? "Refer" : "Refer"
          ),
          isEarned: false,
        };
      } else {
        return {
          title: themeT(
            is_fixed
              ? `flits.reward_widget.refer_friend_page.referrals_specific_order_credit_rule_title`
              : `flits.reward_widget.refer_friend_page.referrals_specific_order_percentage_credit_rule_title`,
            is_fixed ? "Referral's order" : "Referral's order"
          ),
          description: themeT(
            is_fixed
              ? "flits.reward_widget.refer_friend_page.referrals_specific_order_credit_rule_description"
              : "flits.reward_widget.refer_friend_page.referrals_specific_order_percentage_credit_rule_description",
            is_fixed
              ? "Earn {{ credit }} points on referral's order {{ order_count }}"
              : "Earn {{ credit }} of order value as points on referral's order no. {{ order_count }}",
            {
              credit: is_fixed
                ? MoneyFormat(credits / 100)
                : `${credits / 100}%`,
              order_count: column_value,
            }
          ),

          linkTo: !window?.flitsThemeAppExtensionObjects?.customerExist
            ? window?.commonEndpoint?.login ?? "/account/login"
            : null,

          linkBtntext: themeT(
            is_fixed
              ? "flits.reward_widget.refer_friend_page.referrals_order_number_rule_btn_text"
              : "flits.reward_widget.refer_friend_page.referrals_specific_order_percentage_credit_rule_btn_text",
            is_fixed ? "Refer" : "Refer"
          ),
          isEarned: false,
        };
      }

    case "referee_friend":
      return {
        title: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_title",
          "Points for family & friends"
        ),
        description: themeT(
          "flits.reward_widget.refer_friend_page.referrer_credit_rule_description",
          "Your friend will earn {{ credit }} points on signing up via referral link",
          {
            credit: MoneyFormat(credits / 100),
          }
        ),

        linkTo: !window?.flitsThemeAppExtensionObjects?.customerExist
          ? window?.commonEndpoint?.login ?? "/account/login"
          : null,

        linkBtntext: themeT(
          "flits.reward_widget.refer_friend_page.referrer_friend_rule_btn_text",
          "Refer"
        ),
        isEarned: false,
      };

    case "referrals_total_number":
      return {
        title: themeT(
          "flits.reward_widget.refer_friend_page.credit_on_number_of_referrals_rule_title",
          "Referral milestone"
        ),
        description: themeT(
          "flits.reward_widget.refer_friend_page.credit_on_number_of_referrals_rule_description",
          "Earn {{ credit }} points for {{ referral_count }} referrals",
          {
            credit: MoneyFormat(credits / 100),
            referral_count: column_value,
          }
        ),

        linkTo: !window?.flitsThemeAppExtensionObjects?.customerExist
          ? window?.commonEndpoint?.login ?? "/account/login"
          : null,

        linkBtntext: themeT(
          `flits.reward_widget.refer_friend_page.referrals_total_number_rule_btn_text`,
          "Refer"
        ),
        isEarned: false,
      };

    case "referrals_total_spent":
      return {
        title: themeT(
          is_fixed
            ? `flits.reward_widget.refer_friend_page.credit_on_referrals_total_spent_amount_rule_title`
            : `flits.reward_widget.refer_friend_page.credit_on_referrals_total_spent_amount_percentage_rule_title`,
          is_fixed ? "Referral's spending" : "Referral's spending"
        ),
        description: themeT(
          is_fixed
            ? `flits.reward_widget.refer_friend_page.credit_on_referrals_total_spent_amount_rule_description`
            : `flits.reward_widget.refer_friend_page.credit_on_referrals_total_spent_amount_percentage_rule_description`,
          is_fixed
            ? "Earn {{ credit }} points when referral spends {{ total_spent_amount }} or more"
            : "Earn {{ credit }} of the referral's spend as points when they spend {{ total_spent_amount }} or more",
          {
            credit: is_fixed ? MoneyFormat(credits / 100) : `${credits / 100}%`,
            total_spent_amount: MoneyFormat(column_value),
          }
        ),

        linkTo: !window?.flitsThemeAppExtensionObjects?.customerExist
          ? window?.commonEndpoint?.login ?? "/account/login"
          : null,

        linkBtntext: themeT(
          is_fixed
            ? `flits.reward_widget.refer_friend_page.referrals_total_spent_rule_btn_text`
            : `flits.reward_widget.refer_friend_page.referrals_total_spent_percentage_rule_btn_text`,
          is_fixed ? "Refer" : "Refer"
        ),
        isEarned: false,
      };
    // Add more cases for other modules
    default:
      return null; // Handle unsupported module_on values
  }
};
export const ProcessReferRules = (rules, lang) => {
  rules = rules.rules;
  const referRules = rules.all_rules_data.filter(
    (rule) =>
      rule.tab_to_append === "flits_earning_rules" &&
      (rule.module_on.includes("referrals") ||
        rule.module_on.includes("referrer") ||
        rule.module_on.includes("referee"))
  );
  if (referRules.length === 0) {
    return []; // No rules found
  }
  const result = referRules?.map((rule) => {
    const data = getReferRuleData(rule, lang);
    return {
      ...data,
      icon:
        window?.flits_icons?.flits?.icons[`${rule.module_on}_rule`] ??
        window?.flits_icons?.flits?.icons[`subscribe_rule`],
    };
  });
  return result;
};
