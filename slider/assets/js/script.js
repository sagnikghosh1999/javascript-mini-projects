"use strict";

const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");

// Initialize Swiper instance
const swiper = new Swiper(".slider-container", {
  effect: "slide",
  speed: 700,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    prevEl: "#slide-prev",
    nextEl: "#slide-next",
  },
  on: {
    slideChange: () => {
      const currentTabIndex = [...sliderTabs].indexOf(
        sliderTabs[swiper?.activeIndex]
      );
      updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
    },
  },
  reachEnd: () => swiper.autoplay.stop(),
});

const updateIndicator = (tab, index) => {
  const tabRect = tab.getBoundingClientRect();
  sliderIndicator.style.transform = `translateX(${
    tabRect.left - sliderTabs[0].getBoundingClientRect().left
  }px)`;
  sliderIndicator.style.width = `${tabRect.width}px`;

  const scrollLeft =
    sliderTabs[index].offsetLeft -
    sliderControls.offsetWidth / 2 +
    sliderTabs[index].offsetWidth / 2;
  sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
};

// update the slide and the indiactor
sliderTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    swiper.slideTo(index);
    updateIndicator(tab, index);
  });
});

updateIndicator(sliderTabs[0], 0);
window.addEventListener(
  "resize",
  updateIndicator(sliderTabs[swiper.activeIndex], swiper.activeIndex)
);
