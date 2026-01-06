/* =====================================================
   MOBILE MENU
===================================================== */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });
}

/* =====================================================
   SCROLL REVEAL (ONE OBSERVER – OPTIMIZED)
===================================================== */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // run once
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* =====================================================
   SMOOTH SCROLL (SAFE)
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });

      // close mobile menu after click
      navLinks?.classList.remove("open");
      hamburger?.classList.remove("active");
    }
  });
});

/* =====================================================
   FOOTER YEAR
===================================================== */
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* =====================================================
   CAREER STATS COUNTER (IMPROVED)
===================================================== */
const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
  const target = +counter.dataset.target;
  let current = 0;
  const duration = 1400; // ms
  const startTime = performance.now();

  const update = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = progress * (2 - progress); // easeOutQuad
    current = Math.floor(eased * target);

    counter.innerText = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.innerText = target + "+";
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // run once
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => counterObserver.observe(counter));
