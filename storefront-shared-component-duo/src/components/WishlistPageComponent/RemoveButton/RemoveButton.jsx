
const styles = await import("./RemoveButtonModule.module.css").then(
  (module) => module.default
);
const React = await import("react").then((module) => module.default)

export const RemoveButton = ({ value, show, handleRemoveClick }) => {
  const wishlistKeyInLocalStorage = "flits_wishlist_products";


  const handleRemoveFromList = async () => {
    handleRemoveClick(
      value,
      wishlistKeyInLocalStorage,
    );
  };
  return (
    <>
      <button
        onClick={handleRemoveFromList}
        type="button"
        className={`${styles.flits_button} ${styles.flits_primary_btn} ${
          styles.flits_remove_product
        } ${show ? styles.flits_set_show : ""}`}
      >
        X
      </button>
    </>
  );
};
