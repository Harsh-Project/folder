import { MoneyFormat } from "./MoneyFormet";
import { startCountdown } from "./birthdayCountDown";

export const UseProcessEarningRules = (rules, themeT, icon) => {
  rules = rules.rules;
  const earnRules = rules.all_rules_data.filter(
    (rule) => rule.tab_to_append === "flits_earning_rules"
  );
  if (earnRules.length === 0) {
    return []; // No rules found
  }
  const getEarnRuleData = (rule, themeT, icon) => {
    const {
      module_on,
      credits,
      column_value,
      is_fixed,
      relation,
      avails,
      is_earned,
    } = rule;
    switch (module_on) {
      case "register":
        return {
          title: themeT(
            "flits.reward_page.how_to_earn_credit_page.register_credit_rule_title",
            "Sign-up points"
          ),
          description: themeT(
            "flits.reward_page.how_to_earn_credit_page.register_credit_rule_description",
            "Earn {{ credit }} points on signing up",
            {
              credit: MoneyFormat(credits / 100),
            }
          ),
          linkTo:
            window?.flitsRewardPageObjects?.commonEndpoint?.register ??
            "/account/register",
          linkBtntext: themeT(
            "flits.reward_page.how_to_earn_credit_page.register_rule_btn_text",
            "Register"
          ),
          isEarned: window.flitsRewardPageObjects.customer ? true : is_earned,
          moduleOn: module_on,
        };
      case "subscribe":
        return {
          title: themeT(
            "flits.reward_page.how_to_earn_credit_page.subscribe_credit_rule_title",
            "Subscriber points"
          ),
          description: themeT(
            "flits.reward_page.how_to_earn_credit_page.subscribe_credit_rule_description",
            "Earn {{ credit }} points on subscribing to our newsletter"
          ).replace("{{ credit }}", MoneyFormat(credits / 100)),
          linkTo: `${
            !window?.flitsRewardPageObjects?.request?.locale?.shop_locale
              ?.primary
              ? `/${
                  window?.flitsRewardPageObjects?.request?.locale?.shop_locale?.locale?.split(
                    "-"
                  )?.[0]
                }`
              : ""
          }/account#/howToEarn`,
          linkBtntext: themeT(
            "flits.reward_page.how_to_earn_credit_page.subscribe_rule_btn_text",
            "Subscribe"
          ),
          isEarned: window.flitsRewardPageObjects.customer
            ? window.flitsRewardAcceptMarketing
            : is_earned,
          moduleOn: module_on,
        };
      case "order_number":
        if (relation === ">=") {
          return {
            title: themeT(
              is_fixed
                ? "flits.reward_page.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_title"
                : "flits.reward_page.how_to_earn_credit_page.specific_order_and_next_orders_percentage_credit_rule_title",
              is_fixed
                ? "Points on continuing orders"
                : "Points on continuing orders",
              {
                order_count: column_value,
              }
            ),
            description: themeT(
              is_fixed
                ? "flits.reward_page.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_description"
                : "flits.reward_page.how_to_earn_credit_page.specific_order_and_next_orders_percentage_credit_rule_description",
              is_fixed
                ? "Earn {{ credit }} points on all orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}…{{ order_count+n }})"
                : "Earn {{ credit }} of the order value as points on all orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}…{{ order_count+n }})",
              {
                credit: is_fixed
                  ? MoneyFormat(credits / 100)
                  : `${credits / 100}%`,
                order_count: parseInt(column_value),
                "order_count+1": parseInt(column_value) + 1,
                "order_count+2": parseInt(column_value) + 2,
                "order_count+n": "n",
              }
            ),
            linkTo: `${
              window?.flitsRewardPageObjects?.commonEndpoint?.collection ?? ""
            }/collections/all`,
            linkBtntext: themeT(
              is_fixed
                ? `flits.reward_page.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_btn_text`
                : `flits.reward_page.how_to_earn_credit_page.specific_order_and_next_orders_percentage_credit_rule_btn_text`,
              is_fixed ? "Place order" : "Place order"
            ),
            isEarned: false,
            moduleOn: module_on,
          };
        } else {
          return {
            title: themeT(
              is_fixed
                ? "flits.reward_page.how_to_earn_credit_page.specific_order_credit_rule_title"
                : "flits.reward_page.how_to_earn_credit_page.specific_order_percentage_credit_rule_title",
              is_fixed ? "Points on order" : "Points on order"
            ),
            description: themeT(
              is_fixed
                ? "flits.reward_page.how_to_earn_credit_page.specific_order_credit_rule_description"
                : "flits.reward_page.how_to_earn_credit_page.specific_order_percentage_credit_rule_description",
              is_fixed
                ? "Earn {{ credit }} points on your order number {{ order_count }}"
                : "Earn {{ credit }} of the order value as points on your order number {{ order_count }}",
              {
                credit: is_fixed
                  ? MoneyFormat(credits / 100)
                  : `${credits / 100}%`,
                order_count: column_value,
              }
            ),
            linkTo: `${
              window?.flitsRewardPageObjects?.commonEndpoint?.collection ?? ""
            }/collections/all`,
            linkBtntext: themeT(
              is_fixed
                ? "flits.reward_page.how_to_earn_credit_page.order_number_rule_btn_text"
                : "flits.reward_page.how_to_earn_credit_page.specific_order_percentage_credit_rule_btn_text",
              is_fixed ? "Place order" : "Place order"
            ),
            isEarned: is_earned,
            moduleOn: module_on,
          };
        }
      case "birthdate":
        let birthDescription = themeT(
          "flits.reward_page.how_to_earn_credit_page.birthdate_credit_rule_description_1",
          "Add your birthdate to your profile & earn {{ credit }} points on your birthday",
          {
            credit: MoneyFormat(credits / 100),
          }
        );
        let remainDay =
          window?.flitsRewardPageObjects?.customerBirthDay?.length > 0
            ? themeT(
                "flits.reward_widget.how_to_earn_credit_page.birthdate_credit_rule_description_2",
                "{{ days }} day/s left for a birthday reward of {{ credit }} credit.",
                {
                  credit: MoneyFormat(credits / 100),
                  days: startCountdown(
                    window?.flitsRewardPageObjects?.customerBirthDay
                  ),
                }
              )
            : null;
        let termconditionDescription = themeT(
          "flits.reward_page.how_to_earn_credit_page.birthdate_credit_rule_description_3",
          "*You can avail these points once a year"
        );
        return {
          title: themeT(
            "flits.reward_page.how_to_earn_credit_page.birthdate_credit_rule_title",
            "Birthday credit*"
          ),
          description: `<span>${birthDescription}</span>${
            remainDay
              ? `<span class="flits-reward-birth-terms">${remainDay}</span>`
              : ""
          }<span class="flits-reward-birth-terms">${termconditionDescription}</span>`,
          linkTo: `${
            !window?.flitsRewardPageObjects?.request?.locale?.shop_locale
              ?.primary
              ? `/${
                  window?.flitsRewardPageObjects?.request?.locale?.shop_locale?.locale?.split(
                    "-"
                  )?.[0]
                }`
              : ""
          }/account#/profile`,
          linkBtntext: themeT(
            "flits.reward_page.how_to_earn_credit_page.birthdate_rule_btn_text",
            "Add birthdate"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "monthly_date":
        if (is_fixed) {
          return {
            title: themeT(
              "flits.reward_page.how_to_earn_credit_page.special_day_credit_rule_title",
              "Bonus points"
            ),
            description: themeT(
              "flits.reward_page.how_to_earn_credit_page.special_day_credit_rule_description",
              "Get additional points on {{ date }}",
              {
                credit: MoneyFormat(credits / 100),
                date:
                  new Date(column_value).getDate() +
                  "/" +
                  (new Date(column_value).getMonth() + 1) +
                  "/" +
                  new Date(column_value).getFullYear(),
              }
            ),
            linkTo: `${
              window?.flitsRewardPageObjects?.commonEndpoint?.collection ?? ""
            }/collections/all`,
            linkBtntext: themeT(
              "flits.reward_page.how_to_earn_credit_page.monthly_date_rule_btn_text",
              "Place"
            ),
            isEarned: is_earned,
            moduleOn: module_on,
          };
        } else {
          return {
            title: themeT(
              "flits.reward_page.how_to_earn_credit_page.monthly_credit_rule_title",
              "Monthly points"
            ),
            description: themeT(
              "flits.reward_page.how_to_earn_credit_page.monthly_credit_rule_description",
              "Get a monthly bonus of {{ credit }} points on {{ date }}",
              {
                credit: MoneyFormat(credits / 100),
                date: new Date(column_value).getDate(),
              }
            ),
            linkTo: "none",
            linkBtntext: themeT(
              "flits.reward_page.how_to_earn_credit_page.monthly_date_rule_btn_text",
              "Place"
            ),
            isEarned: false,
            moduleOn: module_on,
          };
        }
      case "product_review":
        return {
          title: themeT(
            "flits.reward_page.how_to_earn_credit_page.product_review_credit_rule_title",
            "Points on product review"
          ),
          description: themeT(
            "flits.reward_page.how_to_earn_credit_page.product_review_credit_rule_description",
            "Earn {{ credit }} points on leaving a product review",
            {
              credit: MoneyFormat(credits / 100),
            }
          ),
          linkTo: `${
            window?.flitsRewardPageObjects?.commonEndpoint?.collection ?? ""
          }/collections/all`,
          linkBtntext: themeT(
            "flits.reward_page.how_to_earn_credit_page.product_review_rule_btn_text",
            "Leave review"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "product_tag":
        let productTagSpan = document.createElement("span");
        avails.forEach((item, index) => {
          let productTagAnchor = document.createElement("a");
          productTagAnchor.setAttribute("href", "/search?q=" + item);
          productTagAnchor.setAttribute("target", "_blank");
          productTagAnchor.classList.add("flits-link");
          productTagAnchor.textContent = item;
          if (index > 0) {
            productTagSpan.append(document.createTextNode(", "));
          }
          productTagSpan.append(productTagAnchor);
        });
        return {
          title: themeT(
            is_fixed
              ? `flits.reward_page.how_to_earn_credit_page.product_tag_credit_rule_title`
              : `flits.reward_page.how_to_earn_credit_page.product_tag_percentage_credit_rule_title`,
            is_fixed
              ? "Points on specific products"
              : "Points on specific products"
          ),
          description: themeT(
            is_fixed
              ? `flits.reward_page.how_to_earn_credit_page.product_tag_credit_rule_description`
              : `flits.reward_page.how_to_earn_credit_page.product_tag_percentage_credit_rule_description`,
            is_fixed
              ? "Earn {{ credit }} points on purchasing products tagged with: {{ tag }}"
              : "Earn {{ credit }} of the order value as points on products tagged with: {{ tag }}",
            {
              credit: is_fixed
                ? MoneyFormat(credits / 100)
                : `${credits / 100}%`,
              tag: productTagSpan.innerHTML,
            }
          ),
          linkTo: `/search?q=${avails[0]}`,
          linkBtntext: themeT(
            is_fixed
              ? `flits.reward_page.how_to_earn_credit_page.product_tag_rule_btn_text`
              : `flits.reward_page.how_to_earn_credit_page.product_tag_percentage_credit_rule_btn_text`,
            is_fixed ? "View products" : "View products"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "add_product_to_wishlist":
        return {
          title: themeT(
            "flits.reward_page.how_to_earn_credit_page.wishlisted_product_credit_rule_title",
            "Wishlisted product points"
          ),
          description: themeT(
            "flits.reward_page.how_to_earn_credit_page.wishlisted_product_credit_rule_description",
            "Earn {{ credit }} points when you add product/s in wishlist",
            {
              credit: MoneyFormat(credits / 100),
            }
          ),
          linkTo: `${
            window?.flitsRewardPageObjects?.commonEndpoint?.collection ?? ""
          }/collections/all`,
          linkBtntext: themeT(
            "flits.reward_page.wishlisted_product_page.add_product_to_wishlist_rule_btn_text",
            "Wishlist"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "referrer_friend":
        return {
          title: themeT(
            "flits.reward_page.refer_friend_page.referrer_credit_rule_title",
            "Refer family & friends"
          ),
          description: themeT(
            "flits.reward_page.refer_friend_page.referrer_credit_rule_description",
            "Invite friends via referral link & earn {{ credit }} points when they sign up",
            {
              credit: MoneyFormat(credits / 100),
            }
          ),
          linkTo: "#flits-reward-page-refer-friend",
          linkBtntext: themeT(
            "flits.reward_page.refer_friend_page.referrer_friend_rule_btn_text",
            "Refer & earn"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "referee_friend":
        return {
          title: themeT(
            "flits.reward_page.refer_friend_page.referee_credit_rule_title",
            "Points for family & friends"
          ),
          description: themeT(
            "flits.reward_page.refer_friend_page.referee_credit_rule_description",
            "Your friend will earn {{ credit }} points on signing up via referral link",
            {
              credit: MoneyFormat(credits / 100),
            }
          ),
          linkTo: "#flits-reward-page-refer-friend",
          linkBtntext: themeT(
            "flits.reward_page.refer_friend_page.referrer_friend_rule_btn_text",
            "Refer & earn"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "referrals_total_number":
        return {
          title: themeT(
            "flits.reward_page.refer_friend_page.credit_on_number_of_referrals_rule_title",
            "Referral milestone"
          ),
          description: themeT(
            "flits.reward_page.refer_friend_page.credit_on_number_of_referrals_rule_description",
            "Earn {{ credit }} points by giving {{ referral_count }} successful referrals",
            {
              credit: MoneyFormat(credits / 100),
              referral_count: column_value,
            }
          ),
          linkTo: "#flits-reward-page-refer-friend",
          linkBtntext: themeT(
            `flits.reward_page.refer_friend_page.referrals_total_number_rule_btn_text`,
            "Refer & earn"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "referrals_total_spent":
        return {
          title: themeT(
            is_fixed
              ? `flits.reward_page.refer_friend_page.credit_on_referrals_total_spent_amount_rule_title`
              : `flits.reward_page.refer_friend_page.credit_on_referrals_total_spent_amount_percentage_rule_title`,
            is_fixed ? "Referral's spending" : "Referral's spending"
          ),
          description: themeT(
            is_fixed
              ? `flits.reward_page.refer_friend_page.credit_on_referrals_total_spent_amount_rule_description`
              : `flits.reward_page.refer_friend_page.credit_on_referrals_total_spent_amount_percentage_rule_description`,
            is_fixed
              ? "Earn {{ credit }} points when referral spends {{ total_spent_amount }} or more"
              : "Earn {{ credit }} of the referral's spend as points when they spend {{ total_spent_amount }} or more",
            {
              credit: is_fixed
                ? MoneyFormat(credits / 100)
                : `${credits / 100}%`,
              total_spent_amount: MoneyFormat(column_value),
            }
          ),
          linkTo: "#flits-reward-page-refer-friend",
          linkBtntext: themeT(
            is_fixed
              ? `flits.reward_page.refer_friend_page.referrals_total_spent_rule_btn_text`
              : `flits.reward_page.refer_friend_page.referrals_total_spent_percentage_rule_btn_text`,
            is_fixed ? "Give referral" : "Give referral"
          ),
          isEarned: false,
          moduleOn: module_on,
        };
      case "referrals_order_number":
        if (relation === ">=") {
          return {
            title: themeT(
              is_fixed
                ? `flits.reward_page.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_title`
                : `flits.reward_page.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_title`,
              is_fixed
                ? "Continuing orders by referral"
                : "Continuing orders by referral",
              {
                order_count: column_value,
              }
            ),
            description: themeT(
              is_fixed
                ? `flits.reward_page.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_description`
                : `flits.reward_page.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_description`,
              is_fixed
                ? "Earn {{ credit }} points on all referral's orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}...)"
                : "Earn {{ credit }} of order value as points on all referral's orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}...)",
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
            linkTo: "#flits-reward-page-refer-friend",
            linkBtntext: themeT(
              is_fixed
                ? "flits.reward_page.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_btn_text"
                : "flits.reward_page.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_btn_text",
              is_fixed ? "Give referral" : "Give referral"
            ),
            isEarned: false,
            moduleOn: module_on,
          };
        } else {
          return {
            title: themeT(
              is_fixed
                ? `flits.reward_page.refer_friend_page.referrals_specific_order_credit_rule_title`
                : `flits.reward_page.refer_friend_page.referrals_specific_order_percentage_credit_rule_title`,
              is_fixed ? "Order by referral" : "Order by referral"
            ),
            description: themeT(
              is_fixed
                ? "flits.reward_page.refer_friend_page.referrals_specific_order_credit_rule_description"
                : "flits.reward_page.refer_friend_page.referrals_specific_order_percentage_credit_rule_description",
              is_fixed
                ? "Earn {{ credit }} points on order number {{ order_count }} by your referral"
                : "Earn {{ credit }} of order value as points on order number {{ order_count }} by your referral",
              {
                credit: is_fixed
                  ? MoneyFormat(credits / 100)
                  : `${credits / 100}%`,
                order_count: column_value,
              }
            ),
            linkTo: "#flits-reward-page-refer-friend",
            linkBtntext: themeT(
              is_fixed
                ? "flits.reward_page.refer_friend_page.referrals_order_number_rule_btn_text"
                : "flits.reward_page.refer_friend_page.referrals_specific_order_percentage_credit_rule_btn_text",
              is_fixed ? "Give referral" : "Give referral"
            ),
            isEarned: false,
            moduleOn: module_on,
          };
        }
      // Add more cases for other modules
      default:
        return null; // Handle unsupported module_on values
    }
  };
  const result = earnRules.map((rule) => {
    let newRuleData = getEarnRuleData(rule, themeT, icon);
    return {
      ...newRuleData,
      icon: icon?.flits?.icons[`${rule?.module_on}_rule`],
    };
  });
  return result;
};
