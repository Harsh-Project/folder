import React, { Children, cloneElement, Suspense, useEffect } from "react";
import { FreeMode, Pagination } from "swiper/modules";
import styles from "./NavigationWrapperModule.module.css";
import { NavigationHeading } from "./NavigationHeading/NavigationHeading";
import { SwiperSlide, Swiper } from "swiper/react";
import { useSelector } from "react-redux";

export const NavigationWrapper = (props) => {
  const ruleData = useSelector(
    (state) => state.storeFrontHowToManageCredit.ruleData
  );
  const getTotal = () => {
    for (let i = 0; i < ruleData?.length; i++) {
      if (ruleData[i]?.tab_to_append === "flits_from_admin_rules") {
        return true;
      }
    }

    return false;
  };

  const wrapChildrenWithComponent = () => {
    return Children.map(props.children, (child, index) => {
      if (!child?.props?.item || Object.keys(child?.props).length === 0) {
        return null;
      }

      if (child?.props?.item?.path === "fromAdmin" && !getTotal()) {
        return null;
      }
      return (
        <SwiperSlide
          key={index}
          style={{ display: "contents", justifyContent: "center" }}
        >
          {cloneElement(child)}
        </SwiperSlide>
      );
    });
  };

  useEffect(() => {
    const butotnParent = document.getElementsByClassName(
      "swiper-pagination-clickable"
    );
    Array.from(butotnParent).forEach((button) => {
      button.classList.add(`${styles.flits_swiper_button_parent}`);
    });

    const loadSwiperCSS = () => {
      import("swiper/css");
      import("swiper/css/free-mode");
      import("swiper/css/pagination");
    };

    loadSwiperCSS();
    return () => loadSwiperCSS();
  }, []);

  return (
    <div className={`${styles.flits_menu_nav} flits_navigation_main_wrapper`}>
      <Suspense fallback={<></>}>
        <NavigationHeading />
      </Suspense>
      <div
        className={`${styles.flits_menus_list_box} flits_navigation_menu_box`}
      >
        <div
          className={`${styles.flits_menu_items} ${styles.flits_slider_initialized} ${styles.flits_slider} ${styles.flits_slider_dotted} flits_navigation_wrapper`}
        >
          <div
            className={`${styles.flits_desktop} flits_navigation_wrapper_desktop`}
          >
            {props.children}
          </div>
          <div
            className={`${styles.flits_mobile_navigation} flits_navigation_wrapper_mobile`}
          >
            <Swiper
              resizeObserver={true}
              createElements={true}
              style={{ position: "static" }}
              spaceBetween={0}
              freeMode={true}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 0,
                },
                530: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 0,
                },
                860: {
                  spaceBetween: 0,
                  slidesPerGroup: 3,
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
                bulletClass: styles.flits_bullet_class,
                bulletActiveClass: styles.flits_active_class_style_bullet,
              }}
              modules={[FreeMode, Pagination]}
            >
              {wrapChildrenWithComponent()}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};
