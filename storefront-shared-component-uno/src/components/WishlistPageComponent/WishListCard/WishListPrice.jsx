const { lazily } = await import("react-lazily").then((module) => ({
  lazily: module.lazily,
}));
const styles = await import("./WishListCard.module.css").then(
  (module) => module.default
);
const { Suspense, React } = await import("react").then((module) => ({
  Suspense: module.Suspense,
  React: module.default,
}));

const { MoneyFormat } = lazily(() =>
  import("../../General/MoneyFormat/MoneyFormat")
);

export const WishListPrice = ({ cardData }) => {
  return (
    <p className={`${styles.flits_product_price} ${styles.flits_mt_10}`}>
      <Suspense fallback={<></>}>
        <MoneyFormat price={parseFloat(cardData?.price) / 100} />
      </Suspense>
    </p>
  );
};
