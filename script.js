// Sticky Navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// Mobile Menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Gallery Slider with Shuffled Images
function initializeGallerySlider() {
  const totalImages = 19; // Change this to match your actual image count

  // Create array of image indices and shuffle them
  const imageIndices = Array.from({ length: totalImages }, (_, i) => i + 1);
  const shuffledIndices = shuffleArray([...imageIndices]);

  const gallerySwiper = document.querySelector(
    ".gallerySwiper .swiper-wrapper"
  );
  const thumbnailSwiper = document.querySelector(
    ".thumbnailSwiper .swiper-wrapper"
  );

  // Clear any existing content
  gallerySwiper.innerHTML = "";
  thumbnailSwiper.innerHTML = "";

  // Create slides and thumbnails
  shuffledIndices.forEach((index, slideIndex) => {
    // Main slide
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const img = document.createElement("img");
    img.src = `img/gallery (${index}).jpg`;
    img.alt = `IWA Gallery Image ${index}`;
    img.loading = "lazy";

    slide.appendChild(img);
    gallerySwiper.appendChild(slide);

    // Thumbnail
    const thumbnail = document.createElement("div");
    thumbnail.className = "swiper-slide";

    const thumbImg = document.createElement("img");
    thumbImg.src = `img/gallery (${index}).jpg`;
    thumbImg.alt = `Thumbnail ${index}`;

    thumbnail.appendChild(thumbImg);
    thumbnailSwiper.appendChild(thumbnail);
  });

  // Initialize main gallery swiper
  const gallerySlider = new Swiper(".gallerySwiper", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".gallerySwiper .swiper-button-next",
      prevEl: ".gallerySwiper .swiper-button-prev",
    },
    pagination: {
      el: ".gallerySwiper .swiper-pagination",
      clickable: true,
    },
    thumbs: {
      swiper: null, // Will be initialized after thumbnail swiper
    },
  });

  // Initialize thumbnail swiper
  const thumbnailSlider = new Swiper(".thumbnailSwiper", {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 8,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  });

  // Connect gallery with thumbnails
  gallerySlider.controller.control = thumbnailSlider;
  thumbnailSlider.controller.control = gallerySlider;

  // Add shuffle button functionality
  addShuffleButton(gallerySlider, thumbnailSlider, totalImages);
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Add shuffle button to gallery
function addShuffleButton(gallerySlider, thumbnailSlider, totalImages) {
  const galleryContainer = document.querySelector(".gallery-slider-container");

  // Create controls container if it doesn't exist
  let controlsContainer = galleryContainer.querySelector(".gallery-controls");
  if (!controlsContainer) {
    controlsContainer = document.createElement("div");
    controlsContainer.className = "gallery-controls";
    galleryContainer.appendChild(controlsContainer);
  }

  // Create shuffle button
  const shuffleBtn = document.createElement("button");
  shuffleBtn.className = "gallery-btn";
  shuffleBtn.innerHTML = '<i class="fas fa-random"></i> Shuffle Images';
  shuffleBtn.title = "Randomize gallery order";

  shuffleBtn.addEventListener("click", () => {
    shuffleGallery(gallerySlider, thumbnailSlider, totalImages);

    // Add visual feedback
    shuffleBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      shuffleBtn.style.transform = "scale(1)";
    }, 150);
  });

  controlsContainer.appendChild(shuffleBtn);
}

// Shuffle gallery function
function shuffleGallery(gallerySlider, thumbnailSlider, totalImages) {
  // Create new shuffled indices
  const imageIndices = Array.from({ length: totalImages }, (_, i) => i + 1);
  const shuffledIndices = shuffleArray([...imageIndices]);

  // Get current active slide index
  const currentIndex = gallerySlider.realIndex;

  // Update all slides with new shuffled order
  shuffledIndices.forEach((index, slideIndex) => {
    const gallerySlide = gallerySlider.slides[slideIndex];
    const thumbnailSlide = thumbnailSlider.slides[slideIndex];

    if (gallerySlide && thumbnailSlide) {
      // Update main slide image
      const galleryImg = gallerySlide.querySelector("img");
      if (galleryImg) {
        galleryImg.src = `img/gallery (${index}).jpg`;
        galleryImg.alt = `IWA Gallery Image ${index}`;
      }

      // Update thumbnail image
      const thumbImg = thumbnailSlide.querySelector("img");
      if (thumbImg) {
        thumbImg.src = `img/gallery (${index}).jpg`;
        thumbImg.alt = `Thumbnail ${index}`;
      }
    }
  });

  // Update swiper to recognize new content
  gallerySlider.update();
  thumbnailSlider.update();

  // Return to first slide after shuffle
  gallerySlider.slideTo(0);
}

// Initialize gallery when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeGallerySlider();
});
// Swiper initialization
var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    }
  });
});

// Fade-in effect when scrolling
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.log("Failed to load image:", this.src);
      // You can set a placeholder image here if needed
      // this.src = 'img/placeholder.jpg';
    });
  });
});

// WhatsApp Contact Form
document
  .getElementById("whatsappForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Format the message for WhatsApp
    const whatsappMessage = `*New Message from IWA Website*%0A%0A*Name:* ${name}%0A*Email:* ${
      email || "Not provided"
    }%0A*Subject:* ${subject}%0A*Message:* ${message}%0A%0A_Sent via IWA Website Contact Form_`;

    // WhatsApp phone number (replace with actual IWA WhatsApp number)
    const phoneNumber = "2348012345678"; // Remove the + sign and any spaces

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");

    // Optional: Reset form after submission
    this.reset();
  });

// Add floating WhatsApp button (optional)
function addFloatingWhatsAppButton() {
  const floatingBtn = document.createElement("a");
  floatingBtn.href = "https://wa.me/2348012345678"; // Replace with actual number
  floatingBtn.className = "whatsapp-float";
  floatingBtn.target = "_blank";
  floatingBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  floatingBtn.title = "Chat with us on WhatsApp";

  document.body.appendChild(floatingBtn);
}

// Initialize floating WhatsApp button
addFloatingWhatsAppButton();
