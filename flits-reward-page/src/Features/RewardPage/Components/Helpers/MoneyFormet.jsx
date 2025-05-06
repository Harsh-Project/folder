import { formatMoney } from "./formatMoney";

export const MoneyFormat = (price) => {
  const negativeOrNot = parseFloat(price) < 0 ? true : false;
  const htmlData = negativeOrNot
    ? formatMoney(price * 100, window?.flitsRewardPageObjects?.moneyFormat)
    : formatMoney(
        Math.abs(price * 100),
        window?.flitsRewardPageObjects?.moneyFormat
      );
  return htmlData;
};
