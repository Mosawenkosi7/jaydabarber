// Landing page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  console.log("Home page loaded");

  // Header scroll functionality
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Show book button when scrolled down more than 100px
    if (currentScrollY > 254) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    lastScrollY = currentScrollY;
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Carousel swipe functionality for mobile
  const carousel = document.querySelector('#carouselExampleDark');
  if (carousel) {
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance for a swipe
      const diff = startX - endX;
      
      if (Math.abs(diff) > swipeThreshold) {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
        
        if (diff > 0) {
          // Swipe left - next slide
          carouselInstance.next();
        } else {
          // Swipe right - previous slide
          carouselInstance.prev();
        }
      }
    }
  }

  // Add any landing page specific functionality here
  // Example: hero animations, call-to-action buttons, etc.
});
