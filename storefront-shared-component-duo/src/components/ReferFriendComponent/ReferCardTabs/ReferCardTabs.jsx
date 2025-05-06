import styles from "./ReferCardTabs.module.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import React, { Children, useEffect } from "react";
import { cloneElement } from "react";

export const ReferCardTabs = (props) => {
  const wrapChildrenWithComponent = () => {
    return Children.map(props.children, (child, index) => {
      if (!child?.props?.item || Object.keys(child?.props).length === 0) {
        return null;
      }
      return (
        <SwiperSlide key={index} style={{ display: "inline-flex" }}>
          {cloneElement(child)}
        </SwiperSlide>
      );
    });
  };

  useEffect(() => {
    const prev = document.getElementsByClassName("swiper-button-prev");
    const next = document.getElementsByClassName("swiper-button-next");

    Array.from(prev).forEach((button) => {
      button.classList.add(`${styles.flits_swiper_button_prev}`);
    });

    Array.from(next).forEach((button) => {
      button.classList.add(`${styles.flits_swiper_button_next}`);
    });
    const loadSwiperCSS = () => {
      import("swiper/css");
      import("swiper/css/free-mode");
      import("swiper/css/pagination");
      import("swiper/css/navigation");
    };

    loadSwiperCSS();
    return () => loadSwiperCSS();
  }, []);

  return (
    <div
      className={`${styles.flits_rules_card} ${styles.flits_refer_friend_rules_slick} ${styles.flits_slider_initialized} ${styles.flits_slider} ${styles.flits_slider_dotted}`}
    >
      <Swiper
        style={{ position: "static" }}
        freeMode={true}
        centeredSlidesBounds={true}
        centeredSlides={true}
        coverflowEffect={true}
        watchSlidesProgress={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
          },
          530: {
            slidesPerView: 2,
            slidesPerGroup: 2,
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
        navigation={{
          disabledClass: styles.flits_make_disable,
        }}
        modules={[FreeMode, Pagination, Navigation]}
      >
        {wrapChildrenWithComponent()}
      </Swiper>
    </div>
  );
};
