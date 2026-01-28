// Gallery page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  console.log("Gallery page loaded");

  // Gallery data structure
  const galleryItems = [
    {
      type: "image",
      src: "/media/images/gallery/cut1.jpeg",
      colSpan: 2,
      rowSpan: 2,
    },
    {
      type: "video",
      src: "/media/images/gallery/WhatsApp Video 2026-01-19 at 15.42.17.mp4",
      colSpan: 2,
      rowSpan: 2,
    },
    {
      type: "image",
      src: "/media/images/gallery/cut2.jpeg",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/cut3.jpeg",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/fade1.jpeg",
      colSpan: 2,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/fade2.jpeg",
      colSpan: 1,
      rowSpan: 2,
    },
    {
      type: "image",
      src: "/media/images/gallery/fade2.jpeg",
      colSpan: 2,
      rowSpan: 1,
    },
    {
      type: "video",
      src: "/media/images/gallery/WhatsApp Video 2026-01-19 at 15.44.42.mp4",
      colSpan: 2,
      rowSpan: 2,
    },
    {
      type: "image",
      src: "/media/images/gallery/fade3.jpeg",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/WhatsApp Image 2026-01-21 at 20.15.56.jpeg",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/WhatsApp Image 2026-01-21 at 20.16.02.jpeg",
      colSpan: 2,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/WhatsApp Image 2026-01-21 at 20.16.08.jpeg",
      colSpan: 1,
      rowSpan: 2,
    },
    {
      type: "image",
      src: "/media/images/gallery/WhatsApp Image 2026-01-21 at 20.16.09.jpeg",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/WhatsApp Image 2026-01-21 at 20.16.12.jpeg",
      colSpan: 2,
      rowSpan: 2,
    },
    {
      type: "image",
      src: "/media/images/gallery/WhatsApp Image 2026-01-21 at 20.16.25.jpeg",
      colSpan: 1,
      rowSpan: 1,
    },
    {
      type: "image",
      src: "/media/images/gallery/WhatsApp Image 2026-01-21 at 20.16.29.jpeg",
      colSpan: 1,
      rowSpan: 1,
    },
  ];

  // Get gallery container
  const gallery = document.getElementById("gallery");

  // Dynamically render gallery items - simplified for performance
  galleryItems.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("gallery-item");
    wrapper.dataset.index = index;

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "JaydaBarber work";
      img.loading = "lazy";
      wrapper.appendChild(img);
    }

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.preload = "auto"; // Full preload for autoplay
      
      wrapper.appendChild(video);
    }

    // Add click event to open lightbox
    wrapper.addEventListener('click', () => {
      openLightbox(index);
    });

    gallery.appendChild(wrapper);
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Pause any videos
    const video = lightboxContent.querySelector('video');
    if (video) {
      video.pause();
    }
  }

  function updateLightboxContent() {
    lightboxContent.innerHTML = '';
    const item = galleryItems[currentIndex];

    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = 'JaydaBarber work';
      lightboxContent.appendChild(img);
    }

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      lightboxContent.appendChild(video);
    }

    // Update counter
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxContent();
  }

  // Event listeners for lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  // Close lightbox when clicking outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });

  // Touch swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxContent.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightboxContent.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  }

  // Header scroll functionality
  const header = document.querySelector("header");

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 254) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
});
