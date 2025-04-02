const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const closeBtn = document.getElementById("close-btn");

// Show the search box when the search button is clicked
searchBtn.addEventListener("click", () => {
  searchBox.style.display = "block";
  closeBtn.style.display = "inline-block";
});

// Hide the search box when the close button is clicked
closeBtn.addEventListener("click", () => {
  searchBox.style.display = "none";
  closeBtn.style.display = "none";
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

function changeImage(imageSrc) {
    let mainImage = document.getElementById("mainImage");
    mainImage.src = imageSrc;
    mainImage.style.width = "200px"; 
    mainImage.style.height = "200px"; 
}
function updateCartLink() {
    let flavor = document.querySelector('input[name="flavor"]:checked').value;
    let purchase = document.querySelector('input[name="purchase"]:checked').value;
    
    let cartLink = `https://example.com/cart?flavor=${flavor}&purchase=${purchase}`;
    document.getElementById('addToCart').href = cartLink;
}

document.querySelectorAll('input[name="flavor"], input[name="purchase"]').forEach(input => {
    input.addEventListener('change', updateCartLink);
});

updateCartLink();

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.getElementById('statsSection');
    
    if (!statsSection) return;

    // 1. Animation Function
    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000; 
        const increment = target / (duration / 16); 
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target; 
            }
            element.textContent = Math.floor(current) + '%';
        }, 16);
    }

    // 2. Start Counting Function
    function startCounters() {
        const counters = document.querySelectorAll('.number');
        counters.forEach(counter => {
            counter.textContent = '0%'; 
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
        });
    }

    // 3. Intersection Observer Setup
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.disconnect(); 
        }
    }, { threshold: 0.5 }); 
    observer.observe(statsSection);

    // 4. Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
        startCounters();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Slider elements
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const paginationDots = document.querySelector('.pagination-dots');
    const container = document.querySelector('.testimonial-container');
  
    // Configuration
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth;
    const transitionDuration = 500; // ms
  
    // Initialize slider
    function initSlider() {
      if (!paginationDots.children.length) {
        for (let i = 0; i < slideCount; i++) {
          const dot = document.createElement('span');
          dot.classList.add('dot');
          dot.dataset.index = i;
          paginationDots.appendChild(dot);
        }
      }
      
      updateDots();
      startAutoSlide();
    }
  
    // Slide to specific index
    function goToSlide(index, direction = null) {
      if (isAnimating) return;
      
      isAnimating = true;
      currentIndex = index;
      
      // Handle infinite loop
      if (direction === 'next' && index >= slideCount) {
        currentIndex = 0;
      } else if (direction === 'prev' && index < 0) {
        currentIndex = slideCount - 1;
      }
      
      slider.style.transition = `transform ${transitionDuration}ms ease-in-out`;
      slider.style.transform = `translateX(${-currentIndex * slideWidth}px`;
      
      updateDots();
      
      // Reset position after transition for infinite loop
      setTimeout(() => {
        isAnimating = false;
      }, transitionDuration);
    }
  
    // Next slide
    function nextSlide() {
      goToSlide(currentIndex + 1, 'next');
    }
  
    // Previous slide
    function prevSlide() {
      goToSlide(currentIndex - 1, 'prev');
    }
  
    // Update pagination dots
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  
    // Auto slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
  
    // Event listeners
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', prevSlide);
  
    container.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
  
    container.addEventListener('mouseleave', startAutoSlide);
  
    // Dot navigation
    paginationDots.addEventListener('click', (e) => {
      if (e.target.classList.contains('dot')) {
        const index = parseInt(e.target.dataset.index);
        goToSlide(index);
      }
    });
  
    // Handle window resize
    window.addEventListener('resize', () => {
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${-currentIndex * slideWidth}px`;
    });
  
    initSlider();
  });

  // FAQ Accordions
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.display = 'none';
            }
        });

        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.display = item.classList.contains('active') ? 'block' : 'none';
    });
});

// script.js - You can add any JavaScript functionality here
document.querySelector('.subscribe-button').addEventListener('click', function() {
    // Add your subscription logic here
    alert('Thank you for subscribing!');
});
