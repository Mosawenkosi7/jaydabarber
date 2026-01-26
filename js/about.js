// About page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  console.log('About page loaded');
  
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
  
  // Image indicator functionality
  const mainImage = document.getElementById('mainImage');
  const indicators = document.querySelectorAll('.indicator');
  const picVideo = document.querySelector('.pic-video');
  let currentIndex = 0;
  
  const images = Array.from(indicators).map(ind => ind.getAttribute('data-image'));
  
  function updateImage(index) {
    // Remove active class from all indicators
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Add active class to current indicator
    indicators[index].classList.add('active');
    
    // Change the main image
    mainImage.src = images[index];
    currentIndex = index;
  }
  
  // Click on indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateImage(index);
    });
  });
  
  // Swipe functionality for images
  let startX = 0;
  let endX = 0;
  
  picVideo.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  picVideo.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        const nextIndex = (currentIndex + 1) % images.length;
        updateImage(nextIndex);
      } else {
        // Swipe right - previous image
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(prevIndex);
      }
    }
  }
  
  // Add any about page specific functionality here
  // Example: team member interactions, timeline animations, etc.
});
