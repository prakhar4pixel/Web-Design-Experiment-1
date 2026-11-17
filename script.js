/**
 * PROFESSIONAL DEVELOPER PORTFOLIO - SCRIPT LOGIC
 * Features:
 * 1. Hero Particle Canvas Animation
 * 2. Theme Toggle (Dark / Light Mode)
 * 3. Mobile Navigation Drawer
 * 4. Scroll Spy & Dynamic Navbar Styling
 * 5. Interactive Project Filtering
 * 6. Certification Verification Modal
 * 7. Quick Email Copy & Toast Notification
 * 8. Contact Form Live Validation & Submission
 * 9. Smooth Scroll & Back-to-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initThemeToggle();
  initMobileNav();
  initScrollSpy();
  initProjectFilter();
  initCertModal();
  initEmailCopy();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. HERO PARTICLE CANVAS
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = (Math.random() - 0.5) * 0.45;
      this.alpha = Math.random() * 0.4 + 0.15;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Adjust count based on screen width
  const count = Math.min(Math.floor(window.innerWidth / 25), 45);
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connecting lines between nearby particles
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('prakhar-portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('prakhar-portfolio-theme', newTheme);
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileBtn || !mobileNav || !overlay) return;

  function openMenu() {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   4. SCROLL SPY & NAVBAR STYLING
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE PROJECT FILTERING
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. CERTIFICATION VERIFICATION MODAL
   ========================================================================== */
function initCertModal() {
  const verifyBtns = document.querySelectorAll('.verify-cert-btn');
  const modal = document.getElementById('certModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const okBtn = document.getElementById('modalOkBtn');
  const modalTitle = document.getElementById('certModalTitle');
  const modalBody = document.getElementById('certModalBody');

  if (!modal || !modalBody) return;

  const certData = {
    aws: {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services Training & Certification',
      id: 'AWS-8942-CLF',
      date: 'January 2025 (Valid through 2028)',
      status: 'Verified & Active',
      skills: 'Cloud Economics, Architecture Principles, AWS IAM, S3, EC2, Lambda, VPC'
    },
    meta: {
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera Credential Registry',
      id: 'META-FED-77192',
      date: 'December 2024 (Lifetime)',
      status: 'Verified & Active',
      skills: 'React.js, Advanced State Management, JavaScript ES6+, Automated Testing (Jest), Responsive UI'
    },
    gcp: {
      title: 'Google Cloud Computing Foundations',
      issuer: 'Google Cloud Skills Boost Program',
      id: 'GCCF-9021-IN',
      date: 'November 2024 (Lifetime)',
      status: 'Verified & Active',
      skills: 'Google Compute Engine, Cloud Storage, VPC Networking, Cloud Security, BigQuery Essentials'
    },
    hackerrank: {
      title: 'Problem Solving (Advanced) & Algorithms',
      issuer: 'HackerRank Global Skill Assessment',
      id: 'HR-PS-ADV-3104',
      date: 'October 2024 (Verified)',
      status: 'Gold Badge • Top 5% Globally',
      skills: 'Dynamic Programming, Graph Theory, Trees, Greedy Algorithms, Time & Space Complexity'
    }
  };

  function openModal(data) {
    if (!data) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <div class="modal-detail-item">
        <strong>Issuing Organization</strong>
        <span>${data.issuer}</span>
      </div>
      <div class="modal-detail-item">
        <strong>Credential ID</strong>
        <code>${data.id}</code>
      </div>
      <div class="modal-detail-item">
        <strong>Issue Date & Validity</strong>
        <span>${data.date}</span>
      </div>
      <div class="modal-detail-item">
        <strong>Verification Status</strong>
        <span style="color: var(--green-accent); font-weight: 600;">✓ ${data.status}</span>
      </div>
      <div class="modal-detail-item">
        <strong>Validated Core Competencies</strong>
        <p style="margin-top: 0.25rem;">${data.skills}</p>
      </div>
    `;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  verifyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = btn.getAttribute('data-cert');
      openModal(certData[certKey]);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. QUICK EMAIL COPY TO CLIPBOARD & TOAST
   ========================================================================== */
function initEmailCopy() {
  const trigger = document.getElementById('emailCopyTrigger');
  if (!trigger) return;

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const email = trigger.textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Email copied: ${email}`);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--green-accent)">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & CONFIRMATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successBanner = document.getElementById('formSuccessMessage');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Name Validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your full name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please provide a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Message Validation
    if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
      showError(messageInput, 'Message should be at least 8 characters long');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }

      // Simulate asynchronous server response
      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        }
        if (successBanner) {
          successBanner.style.display = 'flex';
          showToast('Message sent successfully!');
          setTimeout(() => {
            successBanner.style.display = 'none';
          }, 7000);
        }
      }, 1000);
    }
  });

  function showError(input, msg) {
    const parent = input.parentElement;
    parent.classList.add('error');
    const errorEl = parent.querySelector('.form-error');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(input) {
    const parent = input.parentElement;
    parent.classList.remove('error');
    const errorEl = parent.querySelector('.form-error');
    if (errorEl) errorEl.textContent = '';
  }
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
