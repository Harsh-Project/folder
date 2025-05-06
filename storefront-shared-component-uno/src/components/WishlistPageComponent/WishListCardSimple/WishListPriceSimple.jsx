const { lazily } = await import("react-lazily").then((module) => ({
  lazily: module.lazily,
}));
const styles = await import("./WishListCardSimple.module.css").then(
  (module) => module.default
);
const { React, Suspense } = await import("react").then((module) => ({
  Suspense: module.Suspense,
  React: module.default,
}));
const { MoneyFormat } = lazily(() =>
  import("../../General/MoneyFormat/MoneyFormat")
);

export const WishListPriceSimple = ({ productData }) => {
  return (
    <p className={`${styles.flits_product_price} ${styles.flits_mt_10}`}>
      <Suspense fallback={<></>}>
        <MoneyFormat
          price={parseFloat(productData?.variants[0]?.price) / 100}
        />
      </Suspense>
    </p>
  );
};
