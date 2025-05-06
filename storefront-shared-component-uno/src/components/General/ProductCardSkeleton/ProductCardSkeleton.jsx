import React from "react";
import styles from "./ProductCardSkeleton.module.css";

export const ProductCardSkeleton = () => {
    return (
        <>
            <div
                className={styles.flits_wishlist_li}
            >
                <div className={`${styles.flits_product_skeleton_card}`}>
                    <div className={`${styles.flits_skeleton_card_img}`}>
                        <div className={`${styles.flits_skeleton_card_box}`}>
                        </div>
                    </div>
                    <div className={`${styles.flits_skeleton_card_select}`}>
                        <div className={`${styles.flits_skeleton_card_box}`}>
                        </div>
                    </div>
                    <div className={`${styles.flits_skeleton_card_select}`}>
                        <div className={`${styles.flits_skeleton_card_box}`}>
                        </div>
                    </div>
                    <div className={`${styles.flits_skeleton_card_price}`}>
                        <div className={`${styles.flits_skeleton_card_box}`}>
                        </div>
                    </div>
                    <div className={`${styles.flits_skeleton_card_select}`}>
                        <div className={`${styles.flits_skeleton_card_box}`}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}