// Shared JavaScript functionality across all pages

document.addEventListener('DOMContentLoaded', () => {
  console.log('JaydaBarber site loaded');
  
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navOverlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.close-btn');
  const navLinks = document.querySelectorAll('.nav-link');

  // Open menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navOverlay.classList.add('active');
      hamburger.classList.add('hidden');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
  }

  // Close menu
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      hamburger.classList.remove('hidden');
      document.body.style.overflow = ''; // Restore scrolling
    });
  }

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      hamburger.classList.remove('hidden');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside (on the overlay background)
  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
      navOverlay.classList.remove('active');
      hamburger.classList.remove('hidden');
      document.body.style.overflow = '';
    }
  });
  
  // Gallery button navigation
  const galleryButtons = document.querySelectorAll('.book-gallery-btns .book-btn');
  if (galleryButtons.length > 1) {
    galleryButtons[1].addEventListener('click', () => {
      window.location.href = '/gallery.html';
    });
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
