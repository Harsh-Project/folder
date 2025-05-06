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
  var type = options.type || 'day';
  var isAbs = options.isAbsDisabled ? options.isAbsDisabled : false;
  let diff = new Date(date1) - new Date(date2);
  let value;
  if (type === 'day') {
      value = Math.floor(diff / 86400000)
  } else if (type === 'minute') {
      value = Math.round(diff / 1000);
      value /= 60
  } else if (type === 'hour') {
      value = Math.floor(diff / 1000);
      value /= 60 * 60
  }
  if (isAbs) {
      return parseInt(value)
  } else {
      return parseInt(Math.abs(value))
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

  return unescapeHtml(
    formatString.replace(
      placeholderRegex,
      value
    )
  );
}

export function getRuleFormated(rule) {
  const updated = rule?.map((ruleItem) => {
    let title = "";
    let description = "";
    let description2 = "";
    let description3 = "";
    let notApplicable = false;

    if (ruleItem.is_default_rule) {
      let credits = ruleItem.credits;

      if (ruleItem.is_fixed || ruleItem.module_on === "monthly_date") {
        credits = formatMoney(
          Math.abs(credits),
          window?.flitsThemeAppExtensionObjects?.money_format
        );
      } else {
        credits /= 100;
        credits += "%";
      }

      switch (ruleItem.module_on) {
        case "register":
          title = [
            "flits.how_to_earn_credit_page.register_credit_rule_title",
            "Register credit",
          ];
          description = [
            "flits.how_to_earn_credit_page.register_credit_rule_description",
            "Register and get {{ credit }} credit.",
            { credit: credits },
          ];
          if (!ruleItem?.is_earned) {
            notApplicable = true;
          }
          break;
        case "subscribe":
          title = [
            "flits.how_to_earn_credit_page.subscribe_credit_rule_title",
            "Subscriber credit",
          ];
          description = [
            "flits.how_to_earn_credit_page.subscribe_credit_rule_description",
            "Subscribe and get {{ credit }} credit.",
            { credit: credits },
          ];
          let isSubscribed =
            window?.flitsThemeAppExtensionObjects?.customer?.customer_accept_marketing === "true"
              ? "1"
              : "0";
          let isSubscribCreditEarned = ruleItem.is_earned ? "1" : "0";

          if (isSubscribed === "1" && isSubscribCreditEarned === "0") {
            notApplicable = true;
          }
          break;
        case "order_number":
          title = [
            "flits.how_to_earn_credit_page.specific_order_credit_rule_title",
            "Credit on specific order",
          ];
          description = [
            "flits.how_to_earn_credit_page.specific_order_credit_rule_description",
            "Earn {{ credit }} credit on your order number {{ order_count }}",
            { credit: credits, order_count: ruleItem.column_value },
          ];

          if (ruleItem.relation === ">=") {
            title = [
              "flits.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_title",
              "Credit on order number {{ order_count }} and next orders",
              { order_count: ruleItem.column_value },
            ];
            description = [
              "flits.how_to_earn_credit_page.specific_order_and_next_orders_credit_rule_description",
              "You can earn {{ credit }} credit on order number {{ order_count }} and next orders {{ order_count+1 }}, {{ order_count+2 }}..... {{ order_count+n }}",
              { credit: credits, order_count: ruleItem.column_value },
            ];
          }

          let orderCount = parseInt(
            window?.flitsThemeAppExtensionObjects?.customer?.order_count
          );
          let columnValue = parseInt(ruleItem.column_value);

          if (!ruleItem?.is_earned) {
            if (orderCount >= columnValue) {
              notApplicable = true;
            }
          }
          break;
        case "birthdate":
          title = [
            "flits.how_to_earn_credit_page.birthdate_credit_rule_title",
            "Birthday credit*",
          ];
          description = [
            "flits.how_to_earn_credit_page.birthdate_credit_rule_description_1",
            "Share your birthdate with us to get {{ credit }} credit on your birthday.",
            { credit: credits },
          ];
          description2 = [
            "flits.how_to_earn_credit_page.birthdate_credit_rule_description_2",
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
            "*You can avail this credit only once in a year.",
          ];
          break;
        case "monthly_date":
          title = [
            "flits.how_to_earn_credit_page.monthly_credit_rule_title",
            "Monthly credit",
          ];
          description = [
            "flits.how_to_earn_credit_page.monthly_credit_rule_description",
            "You will get {{ credit }} credit on  {{ date }} of every month.",
            {
              credit: credits,
              date: new Date(ruleItem.column_value).getDate(),
            },
          ];

          if (ruleItem.is_fixed) {

            if(timeDiffer({ date1: ruleItem.column_value, date2: new Date(), type: 'day', isAbsDisabled: true }) < 0) {
              notApplicable = true
            }
            title = [
              "flits.how_to_earn_credit_page.special_day_credit_rule_title",
              "Bonus day credit",
            ];
            description = [
              "flits.how_to_earn_credit_page.special_day_credit_rule_description",
              "Get special day credit on {{ date }}",
              {
                date:
                  new Date(ruleItem.column_value).getDate() +
                  "/" +
                  (new Date(ruleItem.column_value).getMonth() + 1) +
                  "/" +
                  new Date(ruleItem.column_value).getFullYear(),
              },
            ];
          }
          break;
        case "product_tag":
          title = [
            "flits.how_to_earn_credit_page.product_tag_credit_rule_title",
            "Credit for specific product collection",
          ];
          let tagList = ruleItem.avails.map(
            (item, index) =>
              `<a href="/search?q=${item}" target="_blank" class="flits-link">${item}</a>`
          );

          tagList = tagList.join(",");

          const tempSpan = document.createElement("div");
          tempSpan.innerHTML = tagList;

          const tagListText = tempSpan;
          description = [
            "flits.how_to_earn_credit_page.product_tag_credit_rule_description",
            `Buy product/s with (any tag) {{ tag }} and get {{ credit }} credit.`,
            { credit: credits, tag: tagListText },
          ];
          break;
        case "product_review":
          title = [
            "flits.how_to_earn_credit_page.product_review_credit_rule_title",
            "Product review credit",
          ];
          description = [
            "flits.how_to_earn_credit_page.product_review_credit_rule_description",
            "Write a product review and get {{ credit }} credit.",
            { credit: credits },
          ];
          break;
        case "add_product_to_wishlist":
          title = [
            "flits.how_to_earn_credit_page.wishlisted_product_credit_rule_title",
            "Wishlisted product credit",
          ];
          description = [
            "flits.how_to_earn_credit_page.wishlisted_product_credit_rule_description",
            "You can earn {{ credit }} credit when you add product/s in wishlist.",
            { credit: credits },
          ];
          break;
        case "cart":
          title = [
            "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_title",
            "Spend on cart",
          ];
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
            description = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_1",
              "Your cart value is between {{ min_cart_value }}-{{ max_cart_value }}. Congratulations you are eligible to use {{ credit }} credit.",
              {
                min_cart_value: minRange,
                max_cart_value: maxRange,
                credit: credits,
              },
            ];
          } else if (ruleItem.is_fixed && range[1] === "-1") {
            description = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_3",
              "Your cart value is {{ min_cart_value }} (or more). Congratulations you can use {{ credit }} credit.",
              { min_cart_value: minRange, credit: credits },
            ];
          } else if (!ruleItem.is_fixed && range[1] !== "-1") {
            description = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_2",
              "Your cart value is between {{ min_cart_value }}-{{ max_cart_value }}. Congratulations you are eligible to use {{ credit }} of cart value as credit.",
              {
                min_cart_value: minRange,
                max_cart_value: maxRange,
                credit: credits,
              },
            ];
          } else if (!ruleItem.is_fixed && range[1] === "-1") {
            title = [
              "flits.how_to_spend_credit_page.spend_credit_on_cart_rule_description_4",
              "Your cart value is {{ min_cart_value }} (or more). Congratulations you are eligible to use {{ credit }} of cart value as credit.",
              { credit: credits, min_cart_value: minRange },
            ];
          }
          break;
        case "referrer_friend":
          title = [
            "flits.refer_friend_page.referrer_credit_rule_title",
            "Referral Program",
          ];
          description = [
            "flits.refer_friend_page.referrer_credit_rule_description",
            "Invite your friends and get {{ credit }} credit when they sign up.",
            { credit: credits },
          ];
          break;
        case "referee_friend":
          title = [
            "flits.refer_friend_page.referee_credit_rule_title",
            "Referral Program",
          ];
          description = [
            "flits.refer_friend_page.referee_credit_rule_description",
            "When your friends accept the invitation, they will get  {{ credit }} credit.",
            { credit: credits },
          ];
          if(!ruleItem?.is_earned) {
            notApplicable = true;
          }
          break;
        case "referrals_total_number":
          title = [
            "flits.refer_friend_page.credit_on_number_of_referrals_rule_title",
            "Credit on numbers of referrals",
          ];
          description = [
            "flits.refer_friend_page.credit_on_number_of_referrals_rule_description",
            "When you reach {{ referral_count }} referrals you get {{ credit }} credit.",
            { credit: credits, referral_count: ruleItem.column_value },
          ];
          break;
        case "referrals_total_spent":
          title = [
            "flits.refer_friend_page.credit_on_referrals_total_spent_amount_rule_title",
            "Credit after referral's total spent amount",
          ];
          description = [
            "flits.refer_friend_page.credit_on_referrals_total_spent_amount_rule_description",
            "You can earn {{ credit }} credit when your referral's total spent amount is {{ total_spent_amount }} or more.",
            {
              credit: credits,
              total_spent_amount: formatMoney(
                Math.abs(parseInt(ruleItem.column_value) * 100),
                window?.flitsThemeAppExtensionObjects?.money_format
              ),
            },
          ];
          break;
        case "referrals_order_number":
          title = [
            "flits.refer_friend_page.referrals_specific_order_credit_rule_title",
            "Credit on specific order by referee",
          ];
          description = [
            "flits.refer_friend_page.referrals_specific_order_credit_rule_description",
            "You can earn {{ credit }} credit on your referee's order number {{ order_count }}.",
            { credit: credits, order_count: ruleItem.column_value },
          ];

          if (ruleItem.relation === ">=") {
            title = [
              "flits.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_title",
              "Credit on referee's order number {{ order_count }} and next orders",
              { order_count: ruleItem.column_value },
            ];
            description = [
              "flits.refer_friend_page.referrals_specific_order_and_next_orders_credit_rule_description",
              "You can earn {{ credit }} credit on referee's order number {{ order_count }} and next orders {{ order_count+1 }}, {{ order_count+2 }}... {{ order_count+n }}",
              { credit: credits, order_count: ruleItem.column_value },
            ];
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
    };
  });
  return updated;
}
