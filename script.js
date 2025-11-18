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

// Auto load images into gallery
const gallery = document.querySelector(".gallery");

// Adjust these numbers based on how many images you have
const totalImages = 20; // Change this to match your actual image count

for (let i = 1; i <= totalImages; i++) {
  const img = document.createElement("img");
  // Updated path to match your image structure
  img.src = `img/gallery (${i}).jpg`;
  img.alt = `IWA Gallery Image ${i}`;
  img.loading = "lazy"; // Add lazy loading for better performance
  gallery.appendChild(img);
}

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
