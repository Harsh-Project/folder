function unescapeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'");
}

function timeDiffer(options) {
  var date1 = options.date1;
  var date2 = options.date2;
  var type = options.type || "day";
  var isAbs = options.isAbsDisabled ? options.isAbsDisabled : false;
  let diff = new Date(date1) - new Date(date2);
  let value;
  if (type === "day") {
    value = Math.floor(diff / 86400000);
  } else if (type === "minute") {
    value = Math.round(diff / 1000);
    value /= 60;
  } else if (type === "hour") {
    value = Math.floor(diff / 1000);
    value /= 60 * 60;
  }
  if (isAbs) {
    return parseInt(value);
  } else {
    return parseInt(Math.abs(value));
  }
}

function startCountdown(dob) {
  if (dob) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    let remain;

    const currentYear = new Date().getFullYear();
    let bDay = new Date(dob).getDate();
    bDay = bDay < 10 ? "0" + bDay : bDay;
    let bMonth = new Date(dob).getMonth() + 1;
    bMonth = bMonth < 10 ? "0" + bMonth : bMonth;

    let birthday = currentYear + "-" + bMonth + "-" + bDay;
    let countDown = new Date(birthday).getTime();

    const now = new Date().getTime();
    let distance = countDown - now;

    if (distance < 0) {
      birthday = currentYear + 1 + "-" + bMonth + "-" + bDay;
      countDown = new Date(birthday).getTime();
      distance = countDown - now;
    }

    const remainingDays = Math.floor(distance / day);
    remain = remainingDays;

    return remain;
  }
}

function formatMoney(cents, format, replaceObject) {
  if (typeof cents === "string") {
    cents = cents.replace(".", "");
  }
  let value = "";
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  // eslint-disable-next-line no-template-curly-in-string
  const formatString = format || "${{amount}}";
  // const replaceRegex =
  //   window?.flitsThemeAppExtensionObjects?.money_format_replace
  //     ?.moneyReplaceRegex || /((\\,00)|(\.00))$/g;
  // const replaceWith =
  //   window?.flitsThemeAppExtensionObjects?.money_format_replace?.replaceTo ||
  //   "";

  function defaultOption(opt, def) {
    return typeof opt === "undefined" ? def : opt;
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");
    if (isNaN(number) || number == null) {
      return "0";
    }
    number = (number / 100.0).toFixed(precision);
    const parts = number.split(".");
    const dollars = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1" + thousands
    );
    const cents = parts[1] ? decimal + parts[1] : "";
    return dollars + cents;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
    default:
  }

  return unescapeHtml(formatString.replace(placeholderRegex, value));
}

export function getRuleFormated(rule) {
  const updated = rule?.map((ruleItem) => {
    let title = "";
    let description = "";
    let description2 = "";
    let description3 = "";
    let linkButtonText = "";
    let notApplicable = false;
    let ruleEarned = false;
    let showEarnCredit = true;

    if (
      !window?.HowToManageCreditIcon?.[ruleItem?.module_on]
        ?.isDisplayEarnedCredits
    ) {
      showEarnCredit = false;
    }

    if (ruleItem.is_default_rule) {
      let credits = ruleItem?.credits;

      if (ruleItem.is_fixed || ruleItem.module_on === "monthly_date") {
        credits = formatMoney(
          Math.abs(credits),
          window?.flitsThemeAppExtensionObjects?.money_format
        );
      } else {
        credits /= 100;
        credits += "%";
      }

      if (ruleItem.is_earned) {
        ruleEarned = true;
      }

      switch (ruleItem.module_on) {
        case "register":
          title = [
            "flits.how_to_earn_credit_page.register_credit_rule_title",
            "Sign-up points",
          ];
          description = [
            "flits.how_to_earn_credit_page.register_credit_rule_description",
            "Earn {{ credit }} points on signing up",
            { credit: credits },
          ];
          linkButtonText = [
            "flits.how_to_earn_credit_page.register_rule_btn_text",
            "Register",
          ];
          if (!ruleItem?.is_earned) {
            notApplicable = true;
          }
          break;
        case "subscribe":
          title = [
            "flits.how_to_earn_credit_page.subscribe_credit_rule_title",
            "Subscriber points",
          ];
          description = [
            "flits.how_to_earn_credit_page.subscribe_credit_rule_description",
            "Earn {{ credit }} points on subscribing to our newsletter",
            { credit: credits },
          ];
          linkButtonText = [
            "flits.how_to_earn_credit_page.subscribe_rule_btn_text",
            "Subscribe",
          ];
          let isSubscribed =
            window?.flitsThemeAppExtensionObjects?.customer
              ?.customer_accept_marketing === "true"
              ? "1"
              : "0";
          let isSubscribCreditEarned = ruleItem.is_earned ? "1" : "0";

          if (isSubscribed === "1" && isSubscribCreditEarned === "0") {
            notApplicable = true;
            ruleEarned = false;
          }
          break;
        case "order_number":
          title = [
            ruleItem.is_fixed
              ? "flits.how_to_earn_credit_page.specific_order_credit_rule_title"
              : "flits.how_to_earn_credit_page.specific_order_percentage_credit_rule_title",
            ruleItem.is_fixed ? "Points on order" : "Points on order",
            "Credit on specific order",
          ];
          description = [
            ruleItem.is_fixed
              ? "flits.how_to_earn_credit_page.specific_order_credit_rule_description"
              : "flits.how_to_earn_credit_page.specific_order_percentage_credit_rule_description",
            ruleItem.is_fixed
              ? "Earn {{ credit }} points on your order number {{ order_count }}"
              : "Earn {{ credit }} of the order value as points on your order number {{ order_count }}",
            { credit: credits, order_count: ruleItem.column_value },
          ];
          linkButtonText = [
            ruleItem.is_fixed
              ? "flits.how_to_earn_credit_page.order_number_rule_btn_text"
              : "flits.how_to_earn_credit_page.specific_order_percentage_credit_rule_btn_text",
            ruleItem.is_fixed ? "Place order" : "Place order",
          ];

          if (ruleItem.relation === ">=") {
            title = [
              ruleItem.is_fixed
                ? "flits.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_title"
                : "flits.how_to_earn_credit_page.specific_order_and_next_orders_percentage_credit_rule_title",
              ruleItem.is_fixed
                ? "Points on continuing orders"
                : "Points on continuing orders",
              { order_count: ruleItem.column_value },
            ];
            description = [
              ruleItem.is_fixed
                ? "flits.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_description"
                : "flits.how_to_earn_credit_page.specific_order_and_next_orders_percentage_credit_rule_description",
              ruleItem.is_fixed
                ? "Earn {{ credit }} points on all orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}…{{ order_count+n }})"
                : "Earn {{ credit }} of the order value as points on all orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}…{{ order_count+n }})",
              { credit: credits, order_count: ruleItem.column_value },
            ];
            linkButtonText = [
              ruleItem.is_fixed
                ? `flits.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_btn_text`
                : `flits.how_to_earn_credit_page.specific_order_and_next_orders_percentage_credit_rule_btn_text`,
              ruleItem.is_fixed ? "Place order" : "Place order",
              "Order",
            ];
            showEarnCredit = true;
          }

          let orderCount = parseInt(
            window?.flitsThemeAppExtensionObjects?.customer?.order_count
          );
          let columnValue = parseInt(ruleItem.column_value);

          if (!ruleItem?.is_earned) {
            if (orderCount >= columnValue) {
              notApplicable = true;
              ruleEarned = false;
            }
          }

          if (ruleItem.relation === ">=") {
            notApplicable = false;
            ruleEarned = false;
          }
          break;
        case "birthdate":
          title = [
            "flits.how_to_earn_credit_page.birthdate_credit_rule_title",
            "Birthday credit*",
          ];
          description = [
            "flits.how_to_earn_credit_page.birthdate_credit_rule_description_1",
            "Add your birthdate to your profile & earn {{ credit }} points on your birthday",
            { credit: credits },
          ];
          linkButtonText = [
            "flits.how_to_earn_credit_page.birthdate_rule_btn_text",
            "Add birthdate",
          ];
          description2 = [
            "flits.reward_widget.how_to_earn_credit_page.birthdate_credit_rule_description_2",
            "{{ days }} day/s left for a birthday reward of {{ credit }} credit.",
            {
              credit: credits,
              days: startCountdown(
                window?.flitsThemeAppExtensionObjects?.customer?.birthday
              ),
            },
          ];
          description3 = [
            "flits.how_to_earn_credit_page.birthdate_credit_rule_description_3",
            "*You can avail these points once a year",
          ];
          ruleEarned = false;
          break;
        case "monthly_date":
          title = [
            "flits.how_to_earn_credit_page.monthly_credit_rule_title",
            "Monthly points",
          ];
          description = [
            "flits.how_to_earn_credit_page.monthly_credit_rule_description",
            "Get a monthly bonus of {{ credit }} points on {{ date }}",
            {
              credit: credits,
              date: new Date(ruleItem.column_value).getDate(),
            },
          ];
          linkButtonText = [
            "flits.how_to_earn_credit_page.monthly_date_rule_btn_text",
            "Place",
          ];

          ruleEarned = false;

          if (ruleItem.is_fixed) {
            if (
              timeDiffer({
                date1: ruleItem.column_value,
                date2: new Date(),
                type: "day",
                isAbsDisabled: true,
              }) < 0
            ) {
              notApplicable = true;
            }
            title = [
              "flits.how_to_earn_credit_page.special_day_credit_rule_title",
              "Bonus points",
            ];
            description = [
              "flits.how_to_earn_credit_page.special_day_credit_rule_description",
              "Get additional points on {{ date }}",
              {
                date:
                  new Date(ruleItem.column_value).getDate() +
                  "/" +
                  (new Date(ruleItem.column_value).getMonth() + 1) +
                  "/" +
                  new Date(ruleItem.column_value).getFullYear(),
              },
            ];
            linkButtonText = [
              "flits.how_to_earn_credit_page.monthly_date_rule_btn_text",
              "Place",
            ];
          }
          break;
        case "product_tag":
          title = [
            ruleItem.is_fixed
              ? `flits.how_to_earn_credit_page.product_tag_credit_rule_title`
              : `flits.how_to_earn_credit_page.product_tag_percentage_credit_rule_title`,
            ruleItem.is_fixed
              ? "Points on specific products"
              : "Points on specific products",
          ];
          let tagList = ruleItem.avails.map(
            (item, index) =>
              `<a href="/search?q=${item}" target="_blank" class="flits-link">${item}</a>`
          );

          tagList = tagList.join(", ");

          description = [
            ruleItem.is_fixed
              ? `flits.how_to_earn_credit_page.product_tag_credit_rule_description`
              : `flits.how_to_earn_credit_page.product_tag_percentage_credit_rule_description`,
            ruleItem.is_fixed
              ? "Earn {{ credit }} points on purchasing products tagged with: {{ tag }}"
              : "Earn {{ credit }} of the order value as points on products tagged with: {{ tag }}",
            { credit: credits, tag: tagList },
          ];
          linkButtonText = [
            ruleItem.is_fixed
              ? `flits.how_to_earn_credit_page.product_tag_rule_btn_text`
              : `flits.how_to_earn_credit_page.product_tag_percentage_credit_rule_btn_text`,
            ruleItem.is_fixed ? "View products" : "View products",
          ];

          ruleEarned = false;
          break;
        case "product_review":
          title = [
            "flits.how_to_earn_credit_page.product_review_credit_rule_title",
            "Points on product review",
          ];
          description = [
            "flits.how_to_earn_credit_page.product_review_credit_rule_description",
            "Earn {{ credit }} points on leaving a product review",
            { credit: credits },
          ];
          linkButtonText = [
            "flits.how_to_earn_credit_page.product_review_rule_btn_text",
            "Leave review",
          ];

          ruleEarned = false;
          break;
        case "add_product_to_wishlist":
          title = [
            "flits.how_to_earn_credit_page.wishlisted_product_credit_rule_title",
            "Wishlisted product points",
          ];
          description = [
            "flits.how_to_earn_credit_page.wishlisted_product_credit_rule_description",
            "Earn {{ credit }} points when you add product/s in wishlist",
            { credit: credits },
          ];
          linkButtonText = [
            "flits.wishlisted_product_page.add_product_to_wishlist_rule_btn_text",
            "Wishlist",
          ];
          ruleEarned = false;
          break;
        case "cart":
          let cartRange = ruleItem.column_value;
          let range = cartRange.split(":");
          let minRange = formatMoney(
            Math.abs(range[0] * 100),
            window?.flitsThemeAppExtensionObjects?.money_format
          );
          let maxRange = formatMoney(
            Math.abs(range[1] * 100),
            window?.flitsThemeAppExtensionObjects?.money_format
          );

          if (ruleItem.is_fixed && range[1] !== "-1") {
            title = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_title",
              "Redeem on cart",
            ];
            description = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_1",
              "If cart value is between {{ min_cart_value }}-{{ max_cart_value }}, you can redeem up to {{ credit }} points",
              {
                min_cart_value: minRange,
                max_cart_value: maxRange,
                credit: credits,
              },
            ];
          } else if (ruleItem.is_fixed && range[1] === "-1") {
            title = [
              "flits.how_to_spend_credit_page.spend_credit_on_rest_cart_rule_title",
              "Redeem on cart",
            ];
            description = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_3",
              "If cart value is {{ min_cart_value }} or more, you can redeem up to {{ credit }} points",
              { min_cart_value: minRange, credit: credits },
            ];
          } else if (!ruleItem.is_fixed && range[1] !== "-1") {
            title = [
              "flits.how_to_spend_credit_page.spend_percentage_credit_on_cart_rule_title",
              "Redeem on cart",
            ];
            description = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_2",
              "If cart value is between {{ min_cart_value }}–{{ max_cart_value }}, you can redeem up to {{ credit }} of cart value as points",
              {
                min_cart_value: minRange,
                max_cart_value: maxRange,
                credit: credits,
              },
            ];
          } else if (!ruleItem.is_fixed && range[1] === "-1") {
            title = [
              "flits.how_to_spend_credit_page.spend_percentage_credit_on_rest_cart_rule_title",
              "Redeem on cart",
            ];
            description = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_4",
              "If cart value is {{ min_cart_value }} or more, you can redeem up to {{ credit }} of cart value as points",
              { credit: credits, min_cart_value: minRange },
            ];
          }
          break;
        case "referrer_friend":
          title = [
            "flits.refer_friend_page.referrer_credit_rule_title",
            "Refer family & friends",
          ];
          description = [
            "flits.refer_friend_page.referrer_credit_rule_description",
            "Invite friends via referral link & earn {{ credit }} points when they sign up",
            { credit: credits },
          ];
          linkButtonText = [
            "flits.refer_friend_page.referrer_friend_rule_btn_text",
            "Refer & earn",
          ];
          ruleEarned = false;
          break;
        case "referee_friend":
          title = [
            "flits.refer_friend_page.referee_credit_rule_title",
            "Points for family & friends",
          ];
          description = [
            "flits.refer_friend_page.referee_credit_rule_description",
            "Your friend will earn {{ credit }} points on signing up via referral link",
            { credit: credits },
          ];
          linkButtonText = [
            "flits.refer_friend_page.referrer_friend_rule_btn_text",
            "Refer & earn",
          ];
          if (!ruleItem?.is_earned) {
            notApplicable = true;
          }
          break;
        case "referrals_total_number":
          title = [
            "flits.refer_friend_page.credit_on_number_of_referrals_rule_title",
            "Referral milestone",
          ];
          description = [
            "flits.refer_friend_page.credit_on_number_of_referrals_rule_description",
            "Earn {{ credit }} points by giving {{ referral_count }} successful referrals",
            { credit: credits, referral_count: ruleItem.column_value },
          ];
          linkButtonText = [
            `flits.refer_friend_page.referrals_total_number_rule_btn_text`,
            "Refer & earn",
          ];
          break;
        case "referrals_total_spent":
          title = [
            ruleItem.is_fixed
              ? `flits.refer_friend_page.credit_on_referrals_total_spent_amount_rule_title`
              : `flits.refer_friend_page.credit_on_referrals_total_spent_amount_percentage_rule_title`,
            ruleItem.is_fixed ? "Referral's spending" : "Referral's spending",
          ];
          description = [
            ruleItem.is_fixed
              ? `flits.refer_friend_page.credit_on_referrals_total_spent_amount_rule_description`
              : `flits.refer_friend_page.credit_on_referrals_total_spent_amount_percentage_rule_description`,
            ruleItem.is_fixed
              ? "Earn {{ credit }} points when referral spends {{ total_spent_amount }} or more"
              : "Earn {{ credit }} of the referral's spend as points when they spend {{ total_spent_amount }} or more",
            {
              credit: credits,
              total_spent_amount: formatMoney(
                Math.abs(parseInt(ruleItem.column_value) * 100),
                window?.flitsThemeAppExtensionObjects?.money_format
              ),
            },
          ];
          linkButtonText = [
            ruleItem.is_fixed
              ? `flits.refer_friend_page.referrals_total_spent_rule_btn_text`
              : `flits.refer_friend_page.referrals_total_spent_percentage_rule_btn_text`,
            ruleItem.is_fixed ? "Give referral" : "Give referral",
          ];
          ruleEarned = false;
          break;
        case "referrals_order_number":
          title = [
            ruleItem.is_fixed
              ? `flits.refer_friend_page.referrals_specific_order_credit_rule_title`
              : `flits.refer_friend_page.referrals_specific_order_percentage_credit_rule_title`,
            ruleItem.is_fixed ? "Order by referral" : "Order by referral",
          ];
          description = [
            ruleItem.is_fixed
              ? "flits.refer_friend_page.referrals_specific_order_credit_rule_description"
              : "flits.refer_friend_page.referrals_specific_order_percentage_credit_rule_description",
            ruleItem.is_fixed
              ? "Earn {{ credit }} points on order number {{ order_count }} by your referral"
              : "Earn {{ credit }} of order value as points on order number {{ order_count }} by your referral",
            { credit: credits, order_count: ruleItem.column_value },
          ];
          linkButtonText = [
            ruleItem.is_fixed
              ? "flits.refer_friend_page.referrals_order_number_rule_btn_text"
              : "flits.refer_friend_page.referrals_specific_order_percentage_credit_rule_btn_text",
            ruleItem.is_fixed ? "Give referral" : "Give referral",
          ];

          if (ruleItem.relation === ">=") {
            title = [
              ruleItem.is_fixed
                ? `flits.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_title`
                : `flits.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_title`,
              ruleItem.is_fixed
                ? "Continuing orders by referral"
                : "Continuing orders by referral",
              { order_count: ruleItem.column_value },
            ];
            description = [
              ruleItem.is_fixed
                ? `flits.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_description`
                : `flits.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_description`,
              ruleItem.is_fixed
                ? "Earn {{ credit }} points on all referral's orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}...)"
                : "Earn {{ credit }} of order value as points on all referral's orders from order no. {{ order_count }} onwards (order no. {{ order_count+1 }}, {{ order_count+2 }}...)",
              { credit: credits, order_count: ruleItem.column_value },
            ];
            linkButtonText = [
              ruleItem.is_fixed
                ? "flits.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_btn_text"
                : "flits.refer_friend_page.referrals_specific_order_and_next_orders_percentage_credit_rule_btn_text",
              ruleItem.is_fixed ? "Give referral" : "Give referral",
            ];
            ruleEarned = false;
          }
          break;
        case "checkout_shipping":
          title = [
            "flits.how_to_spend_credit_page.spend_credit_on_shipping_rule_title",
            "Free Shipping",
          ];
          description = [
            "flits.how_to_spend_credit_page.spend_credit_on_shipping_rule_description",
            "You can use your credit on shipping charges.",
          ];

          break;
        default:
          break;
      }
    } else {
      title = [ruleItem.title, ruleItem.title];
      description = [ruleItem.description, ruleItem.description];
    }

    return {
      ...ruleItem,
      description3: description3,
      title: title,
      description2: description2,
      description: description,
      notApplicable: notApplicable,
      linkButtonText: linkButtonText,
      ruleEarned: ruleEarned,
      showEarnCredit: showEarnCredit,
    };
  });
  return updated;
}
