// Selecting all the slides in the slider and the navigation buttons
const slides = document.querySelectorAll(".slide");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

// Autoplay setting, if true the slides will auto-rotate at the given interval
const auto = true;
const intervalTime = 5000;
let slideInterval;

// Function to move to the next slide
const nextSlide = () => {
  // Get the currently active slide
  const current = document.querySelector(".current");

  // Remove the 'current' class from the active slide
  current.classList.remove("current");

  // Check if there is a next sibling (next slide)
  if (current.nextElementSibling) {
    // If yes, add the 'current' class to the next slide
    current.nextElementSibling.classList.add("current");
  } else {
    // If not, it means we're at the last slide, so go to the first slide
    slides[0].classList.add("current");
  }

  // Optional: After the transition, remove the 'current' class (if you need additional animation timing)
  setTimeout(() => {
    current.classList.remove("current");
  });
};

// Function to move to the previous slide
const prevSlide = () => {
  // Get the currently active slide
  const current = document.querySelector(".current");

  // Remove the 'current' class from the active slide
  current.classList.remove("current");

  // Check if there is a previous sibling (previous slide)
  if (current.previousElementSibling) {
    // If yes, add the 'current' class to the previous slide
    current.previousElementSibling.classList.add("current");
  } else {
    // If not, it means we're at the first slide, so go to the last slide
    slides[slides.length - 1].classList.add("current");
  }

  // Optional: After the transition, remove the 'current' class (if you need additional animation timing)
  setTimeout(() => {
    current.classList.remove("current");
  });
};

// Event listener for the next button click
nextButton.addEventListener("click", (e) => {
  // Move to the next slide when the button is clicked
  nextSlide();
  // If autoplay is enabled, stop the interval and reset it
  if (auto) {
    clearInterval(slideInterval);
  }
});

// Event listener for the previous button click
prevButton.addEventListener("click", (e) => {
  // Move to the previous slide when the button is clicked
  prevSlide();
  // If autoplay is enabled, stop the interval and reset it
  if (auto) {
    clearInterval(slideInterval);
  }
});

// If autoplay is enabled, start the interval for automatic slide change
if (auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}
