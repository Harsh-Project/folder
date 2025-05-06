const styles = await import("./WishListCardSimple.module.css").then(
  (module) => module.default
);
const React = await import("react").then((module) => module.default);

export const WishListCardSimple = (props) => {
  const { setShow, productData } = props;

  return (
    <li
      data-flits-product-handle={productData?.handle}
      data-flits-product-id={productData?.id}
      className={styles.flits_wishlist_li}
    >
      <form className={styles.flits_wishlist_form}>
        <div
          className={`${styles.flits_product_card} ${styles.flits_wishlist_card}`}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <a
            href={`${window?.commonEndpoint?.product ?? ""}/products/${productData?.handle}`}
            className={styles.flits_product_image}
          >
            <img
              src={
                !productData?.variants[0]?.image
                  ? `https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_200x_crop_center.gif`
                  : `https:${productData?.variants[0]?.image}`
              }
              alt={productData?.variants[0]?.title}
            />
          </a>
          {props?.children}
        </div>
      </form>
    </li>
  );
};
