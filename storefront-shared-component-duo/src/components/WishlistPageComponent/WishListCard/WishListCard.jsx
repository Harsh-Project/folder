import "tippy.js/dist/tippy.css";
const styles = await import("./WishListCardModule.module.css").then(
  (module) => module.default
);
const { Suspense, useEffect, React, useRef } = await import("react").then(
  (module) => ({
    useEffect: module.useEffect,
    React: module.default,
    Suspense: module.Suspense,
    useRef: module.useRef,
  })
);
const lazily = await import("react-lazily").then((module) => module.lazily);
const tippy = await import("tippy.js").then((module) => module.default);
const { MoneyFormat } = lazily(() =>
  import("../../General/MoneyFormat/MoneyFormat")
)

export const WishListCard = (props) => {
  const { setShow, item, productData, cardData } = props;
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tippy(tooltipRef.current, {
        content: item?.product_title,
        placement: "top",
        arrow: true,
        theme: "light",
      });
    }
  }, [item?.product_title]);

  return (
    <div
      data-flits-product-handle={productData?.handle}
      data-flits-product-id={productData?.id}
      className={`${styles.flits_product_item_cart} ${styles.flits_produt_cart} ${styles.flits_wishlist_card}`}
    >
      <div
        className={styles.flits_product_item_main}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className={styles.flits_product_item}>
          <a href={`${window?.commonEndpoint?.product ?? ""}/products/${item?.product_handle}`}>
            <p
              className={`${styles.flits_product_name} ${styles.flits_link} ${styles.flits_text_ellipsis}`}
              ref={tooltipRef}
            >
              {item?.product_title}
            </p>
          </a>
          <a
            href={`${window?.commonEndpoint?.product ?? ""}/products/${productData?.handle}`}
            className={styles.flits_product_image_thumbnail}
          >
            <img
              src={
                !cardData?.image || cardData?.image === ""
                  ? `https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_200x_crop_center.gif`
                  : `https:${cardData.image}`
              }
              alt={cardData.title}
            />
          </a>
          <p className={styles.flits_product_price}>
            <Suspense fallback={<></>}>
              <MoneyFormat price={parseFloat(cardData?.price) / 100} />
            </Suspense>
          </p>
        </div>

        <div className={`${styles.flits_product_action_group}`}>
          {props?.children}
        </div>
      </div>
    </div>
  );
};
