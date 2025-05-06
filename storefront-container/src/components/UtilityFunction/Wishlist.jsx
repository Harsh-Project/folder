const { GetLocalStorage } =await import("./LocalStorage").then((module) => module);
const { Utility } =await import("./UtilityFunction").then((module) => module);

export const wishlistHandle = "flits_wishlist_products";

export const IsProductAddedInWishlist = (handle) => {
    var wishlitsLocalHandles = GetLocalStorage(wishlistHandle);
    if (Utility.isNull(wishlitsLocalHandles)) {
        return false;
    }
    if (wishlitsLocalHandles.split(",").indexOf(handle) !== -1) {
        return true;
    }
    return false;
};