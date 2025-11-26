/* Mobile Menu  */
const menuToggle = document.getElementById('mobile-menu');
const navbarContainer = document.querySelector('.navbar-container');

menuToggle.addEventListener('click', () => {
    navbarContainer.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navbarContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.navbar-container a').forEach(link => {
    link.addEventListener('click', () => {
        navbarContainer.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});


/* Hero Slider Animation */
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let dotsContainer = document.querySelector('.dots');

// Create dots 
slides.forEach((_, i) => {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
        currentIndex = i;
        showSlide(currentIndex);
        resetInterval();
    });

    dotsContainer.appendChild(dot);
});

let dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove("active");
        if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add("active");
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

let slideInterval;
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

window.addEventListener("load", () => {
    showSlide(currentIndex);
    resetInterval();
});

/* Wedding Images and Text Animation */
const weddingImages = document.querySelectorAll(".wedding-img");
const weddingText = document.querySelector(".services-text");

let weddingIndex = 0;

function showWeddingImage(index) {
    weddingImages.forEach(img => {
        img.style.opacity = "0";
        img.style.transform = "translateX(100px)";
    });
    if (weddingImages[index]) {
        weddingImages[index].style.opacity = "1";
        weddingImages[index].style.transform = "translateX(0)";
    }
}

function nextWeddingImage() {
    weddingIndex = (weddingIndex + 1) % weddingImages.length;
    showWeddingImage(weddingIndex);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 }); 

if(weddingText) observer.observe(weddingText);

window.addEventListener("load", () => {
    showWeddingImage(weddingIndex);
    setInterval(nextWeddingImage, 3000);
});
/* ---------------- PRODUCTS CAROUSEL (INFINITE LOOP) ---------------- */

const productsContainer = document.querySelector(".products-container");
const prevBtn = document.querySelector(".left-arrow"); 
const nextBtn = document.querySelector(".right-arrow"); 

let productInterval;
let isAnimating = false; // Prevents clicking too fast and breaking layout

function getCardWidth() {
    const card = document.querySelector(".products-card");
    // Card width + the 30px gap defined in CSS
    return card.offsetWidth + 30; 
}

function moveNext() {
    if (isAnimating) return;
    isAnimating = true;

    const width = getCardWidth();

    // 1. Animate the container to the left
    productsContainer.style.transition = "transform 0.5s ease-in-out";
    productsContainer.style.transform = `translateX(-${width}px)`;

    // 2. After animation ends, move the first item to the back and reset
    setTimeout(() => {
        productsContainer.style.transition = "none"; // Remove animation for instant reset
        productsContainer.style.transform = "translateX(0)"; // Reset position
        productsContainer.appendChild(productsContainer.firstElementChild); // Move first item to end
        isAnimating = false;
    }, 500); // 500ms matches the transition time above
}

function movePrev() {
    if (isAnimating) return;
    isAnimating = true;

    const width = getCardWidth();

    // 1. Move the last item to the front INSTANTLY (no animation yet)
    productsContainer.style.transition = "none";
    productsContainer.prepend(productsContainer.lastElementChild);
    
    // 2. Shift container to the left so the item is hidden (looks like it's still in old position)
    productsContainer.style.transform = `translateX(-${width}px)`;

    // 3. Small delay to allow browser to register the change, then animate to 0
    setTimeout(() => {
        productsContainer.style.transition = "transform 0.5s ease-in-out";
        productsContainer.style.transform = "translateX(0)";
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }, 20);
}

// --- Auto Scroll Logic ---

function startAutoScroll() {
    stopAutoScroll(); // Clear any existing timer
    productInterval = setInterval(moveNext, 3000); // 3 Seconds
}

function stopAutoScroll() {
    clearInterval(productInterval);
}

// --- Event Listeners ---

// Next Button
nextBtn.addEventListener("click", () => {
    stopAutoScroll(); 
    moveNext();
    startAutoScroll(); // Restart timer after click
});

// Previous Button
prevBtn.addEventListener("click", () => {
    stopAutoScroll();
    movePrev();
    startAutoScroll();
});

// Pause on Hover (User Experience)
const productsWrapper = document.querySelector(".products-carousel");
productsWrapper.addEventListener("mouseenter", stopAutoScroll);
productsWrapper.addEventListener("mouseleave", startAutoScroll);

// Initialize
startAutoScroll();

/* Reviews Carousel */
const reviewsContainer = document.querySelector(".reviews-container");
const reviewCards = document.querySelectorAll(".review-card");
let reviewIndex = 0;

function moveReviews() {
    if (reviewCards.length === 0) return; 
    
    const cardWidth = reviewCards[0].offsetWidth;
    const gap = 30; 
    reviewIndex = (reviewIndex + 1) % reviewCards.length;

    reviewsContainer.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;
}

// Automatically move reviews
setInterval(moveReviews, 3000);

// Reset reviews on resize
window.addEventListener('resize', () => {
    reviewIndex = 0;
    if(reviewsContainer && reviewCards.length > 0) {
        reviewsContainer.style.transform = `translateX(0)`;
    }
});


/* Contact Us Section Images Scroll */
const contactImages = document.querySelectorAll(".contact-img");
let contactIndex = 0;

function showContactImage(index) {
    contactImages.forEach(img => {
        img.style.opacity = "0";
        img.style.transform = "translateX(100px)";
    });
    if (contactImages[index]) {
        contactImages[index].style.opacity = "1";
        contactImages[index].style.transform = "translateX(0)";
    }
}

function nextContactImage() {
    contactIndex = (contactIndex + 1) % contactImages.length;
    showContactImage(contactIndex);
}

window.addEventListener("load", () => {
    showContactImage(contactIndex);
    setInterval(nextContactImage, 3000);
});
/*  CONTACT FORM SUBMISSION  */

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the page from refreshing
        formMessage.classList.remove('success');
        formMessage.innerHTML = '';
        setTimeout(() => {
            const successMessage = `Thank you! Your message has been sent successfully. We will be in touch soon. ✨`;

            // Display the success message
            formMessage.innerHTML = successMessage;
            formMessage.classList.add('success');
            
            // Clear the form fields
            contactForm.reset();
            
            // Hide the message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('success');
                formMessage.innerHTML = '';
            }, 5000);
        }, 500); 
    });
}