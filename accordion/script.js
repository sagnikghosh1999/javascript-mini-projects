"use strict";

const faqList = document.querySelectorAll(".faq");

faqList.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});
