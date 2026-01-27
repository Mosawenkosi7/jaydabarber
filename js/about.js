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
  
  // Card flip functionality (mobile only)
  const cards = document.querySelectorAll('.q_a_card');
  
  cards.forEach(card => {
    const cardFront = card.querySelector('.card-front');
    const closeBtn = card.querySelector('.close-card');
    
    // Flip card on front click (mobile only)
    if (cardFront) {
      cardFront.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.innerWidth <= 480) {
          card.classList.add('flipped');
        }
      });
    }
    
    // Close card on close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        card.classList.remove('flipped');
      });
    }
  });
  
  // Handle window resize - remove flipped class if resizing above 480px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 480) {
      cards.forEach(card => {
        card.classList.remove('flipped');
      });
    }
  });
});
