// --- Hamburger Menu ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
const smallMenu = document.querySelector('.header__sm-menu');
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu');
const headerHamMenuCloseBtn = document.querySelector('.header__main-ham-menu-close');
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link');

if (hamMenuBtn && smallMenu && headerHamMenuBtn && headerHamMenuCloseBtn) {
  hamMenuBtn.addEventListener('click', () => {
    smallMenu.classList.toggle('header__sm-menu--active');
    headerHamMenuBtn.classList.toggle('d-none');
    headerHamMenuCloseBtn.classList.toggle('d-none');
  });

  headerSmallMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      smallMenu.classList.remove('header__sm-menu--active');
      headerHamMenuBtn.classList.remove('d-none');
      headerHamMenuCloseBtn.classList.add('d-none');
    });
  });
}

// Logo click (navigate home)
document.querySelector('.header__logo-container')?.addEventListener('click', () => {
  location.href = 'index.html';
});

// --- Dark Mode Toggle (with localStorage) ---
const themeSwitch = document.querySelector('.theme-switch');
const track = document.querySelector('.theme-switch__track');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

if (track) {
  track.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
}



// --- Typing Effect (only on homepage) ---
const words = ["Student", "Beginner", "AI Explorer", "Full Stack Programmer", "Lifelong Learner"];
let i = 0;
let timer;
const typingElement = document.getElementById('typing');

if (typingElement) {
  function type() {
    let word = words[i];
    let j = 0;
    typingElement.textContent = "";
    timer = setInterval(() => {
      if (j < word.length) {
        typingElement.textContent += word[j];
        j++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          i = (i + 1) % words.length;
          type();
        }, 2000);
      }
    }, 80);
  }
  type();
}

// --- Scroll Animations & Progress Bars ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      const bars = entry.target.querySelectorAll('.progress-bar');
      bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) bar.style.width = width + '%';
      });
    }
  });
});

document.querySelectorAll('.projects__row, .about__content, .skills-progress').forEach(el => {
  observer.observe(el);
});

// --- Project Filter (only on homepage) ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectRows = document.querySelectorAll('.projects__row');

if (filterBtns.length && projectRows.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectRows.forEach(row => {
        if (filter === 'all') {
          row.style.display = 'grid';
        } else {
          row.style.display = row.getAttribute('data-category') === filter ? 'grid' : 'none';
        }
      });
    });
  });
}


// --- Back to Top ---
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Contact Form (EmailJS) ---
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    emailjs.sendForm('gmail_key101', 'emailer_101', contactForm, 'KKwZSnW1eDS8Z3Dp5')
      .then(() => {
        contactForm.reset();
        formSuccess.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      })
      .catch((error) => {
        alert('Failed to send message. Please try again.');
        console.error(error);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });
}