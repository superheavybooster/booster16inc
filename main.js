// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Show/Hide join form modal
function showJoinForm() {
  const modal = document.getElementById('join-form-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeJoinForm() {
  const modal = document.getElementById('join-form-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
document.getElementById('join-form-modal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeJoinForm();
  }
});

// Handle form submission
const joinForm = document.getElementById('joinForm');
let isSubmitting = false;

if (joinForm) {
  joinForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const teamRole = document.getElementById('teamRole').value;
    const why = document.getElementById('why').value.trim();

    if (!name || !contact || !teamRole || !why) {
      alert('Please fill in all required fields.');
      return;
    }

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBMITTING...';

    try {
      fetch('https://script.google.com/macros/s/AKfycbxVBp4zfFlimweKTvrm6oXpQoxWSk2fwOXmCBY5_nslimwIpJCcw-HpBWR-NO3mPWf0FA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, contact, teamRole, why })
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Thank you, ' + name + '! Your application has been submitted successfully. We\'ll get back to you soon!');
      this.reset();
      closeJoinForm();
    } catch (error) {
      alert('There was an error submitting your application. Please try again.');
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Navbar background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.8)';
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all mission sections
document.querySelectorAll('.mission-section, .detail-card, .update-card, .role-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});
