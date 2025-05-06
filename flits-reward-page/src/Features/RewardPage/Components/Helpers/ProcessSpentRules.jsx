import { MoneyFormat } from "./MoneyFormet";
export const ProcessSpentRules = (rules, themeT, icon) => {
  rules = rules.rules;
  const spentRules = rules.all_rules_data.filter(
    (rule) => rule.tab_to_append === "flits_spent_rules"
  );
  if (spentRules.length === 0) {
    return [];
  }
  const result = spentRules.map((rule) => {
    let title = "";
    let description = "";
    let iconN = "";
    const [min, max] = rule.column_value
      .split(":")
      .map((value) => parseInt(value));
    const credit =
      rule.is_fixed === 1
        ? MoneyFormat(rule.credits / 100)
        : `${rule.credits / 100}%`;
    const min_cart_value = MoneyFormat(min);
    const max_cart_value = MoneyFormat(max);

    if (rule.is_fixed === 1 && max !== -1) {
      title = [
        "flits.reward_page.how_to_spend_credit_page.spend_credit_on_cart_rule_title",
        "Redeem on cart",
      ];
      description = [
        "flits.reward_page.how_to_spend_credit_page.spend_credit_on_cart_rule_description_1",
        "If cart value is between {{ min_cart_value }}-{{ max_cart_value }}, you can redeem up to {{ credit }} points",
      ];
    } else if (rule.is_fixed === 1 && max === -1) {
      title = [
        "flits.reward_page.how_to_spend_credit_page.spend_credit_on_rest_cart_rule_title",
        "Redeem on cart",
      ];
      description = [
        "flits.reward_page.how_to_spend_credit_page.spend_credit_on_cart_rule_description_3",
        "If cart value is {{ min_cart_value }} or more, you can redeem up to {{ credit }} points",
      ];
    } else if (rule.is_fixed !== 1 && max !== -1) {
      title = [
        "flits.reward_page.how_to_spend_credit_page.spend_percentage_credit_on_cart_rule_title",
        "Redeem on cart",
      ];
      description = [
        "flits.reward_page.how_to_spend_credit_page.spend_credit_on_cart_rule_description_2",
        "If cart value is between {{ min_cart_value }}–{{ max_cart_value }}, you can redeem up to {{ credit }} of cart value as points",
      ];
    } else {
      title = [
        "flits.reward_page.how_to_spend_credit_page.spend_percentage_credit_on_rest_cart_rule_title",
        "Redeem on cart",
      ];
      description = [
        "flits.reward_page.how_to_spend_credit_page.spend_credit_on_cart_rule_description_4",
        "If cart value is {{ min_cart_value }} or more, you can redeem up to {{ credit }} of cart value as points",
      ];
    }

    title = themeT(...title);
    description = themeT(...description, {
      credit: credit,
      min_cart_value: min_cart_value,
      max_cart_value: max_cart_value,
    });

    iconN =
      rule.is_fixed === 1
        ? icon?.flits?.icons[`${rule?.module_on}_rule_fixed`]
        : icon?.flits?.icons[`${rule?.module_on}_rule_percentage`];
    return {
      title: title,
      description: description,
      icon: iconN,
    };
  });
  return result;
};
