// Fixed Join Button functionality
const fixedJoinBtn = document.getElementById('fixedJoinBtn');
if (fixedJoinBtn) {
  fixedJoinBtn.addEventListener('click', () => {
    window.location.href = 'index.html#join';
  });
}

// Join Form submission (only on index.html)
const joinForm = document.getElementById('joinForm');
let isSubmitting = false;

if (joinForm) {
  joinForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
    
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const teamRole = document.getElementById('teamRole').value;
    const why = document.getElementById('why').value.trim();

    if (!name || !contact || !teamRole || !why) {
      alert('Please fill in all required fields.');
      return;
    }

    // Get submit button and disable it
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    submitBtn.style.opacity = '0.6';
    submitBtn.style.cursor = 'not-allowed';

    try {
      // Send the form data
      fetch('https://script.google.com/macros/s/AKfycbxVBp4zfFlimweKTvrm6oXpQoxWSk2fwOXmCBY5_nslimwIpJCcw-HpBWR-NO3mPWf0FA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          contact, 
          teamRole, 
          why 
        })
      });

      // Wait a bit to ensure submission goes through (no-cors doesn't return response)
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Thank you, ' + name + '! Your application has been submitted successfully. We\'ll get back to you soon!');
      this.reset();
      
      // Hide join form and show home screen
      const joinFormSection = document.getElementById('join-form-section');
      const homeScreen = document.getElementById('home-screen');
      const fixedJoinBtn = document.getElementById('fixedJoinBtn');
      if (joinFormSection) joinFormSection.classList.add('hidden');
      if (homeScreen) homeScreen.classList.remove('hidden');
      if (fixedJoinBtn) fixedJoinBtn.style.display = 'block'; // Show button again
      history.replaceState(null, '', window.location.pathname);
    } catch (error) {
      alert('There was an error submitting your application. Please try again.');
    } finally {
      // Re-enable button after submission (success or error)
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }
  });
}

// Handle showing/hiding sections on index.html based on hash
function handleHash() {
  const hash = window.location.hash;
  const homeScreen = document.getElementById('home-screen');
  const joinFormSection = document.getElementById('join-form-section');
  const fixedJoinBtn = document.getElementById('fixedJoinBtn');
  
  if (!homeScreen || !joinFormSection) return;
  
  if (hash === '#join') {
    homeScreen.classList.add('hidden');
    joinFormSection.classList.remove('hidden');
    if (fixedJoinBtn) fixedJoinBtn.style.display = 'none'; // Hide button on join page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    homeScreen.classList.remove('hidden');
    joinFormSection.classList.add('hidden');
    if (fixedJoinBtn) fixedJoinBtn.style.display = 'block'; // Show button on other pages
  }
}

// Handle deep linking on load (only for index.html)
window.addEventListener('load', () => {
  handleHash();
});

// Listen for hash changes
window.addEventListener('hashchange', () => {
  handleHash();
});