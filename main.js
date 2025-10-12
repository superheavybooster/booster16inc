// Fixed Join Button functionality
const fixedJoinBtn = document.getElementById('fixedJoinBtn');
if (fixedJoinBtn) {
  fixedJoinBtn.addEventListener('click', () => {
    window.location.href = 'index.html#join';
  });
}

// Join Form submission (only on index.html)
const joinForm = document.getElementById('joinForm');
if (joinForm) {
  joinForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const teamRole = document.getElementById('teamRole').value;
    const why = document.getElementById('why').value.trim();

    if (!name || !contact || !teamRole || !why) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await fetch('https://script.google.com/macros/s/AKfycbxVBp4zfFlimweKTvrm6oXpQoxWSk2fwOXmCBY5_nslimwIpJCcw-HpBWR-NO3mPWf0FA/exec', {
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

      alert('Thank you, ' + name + '! Your application has been submitted successfully. We\'ll get back to you soon!');
      this.reset();
      
      // Hide join form and show home screen
      const joinFormSection = document.getElementById('join-form-section');
      const homeScreen = document.getElementById('home-screen');
      if (joinFormSection) joinFormSection.classList.add('hidden');
      if (homeScreen) homeScreen.classList.remove('hidden');
      history.replaceState(null, '', window.location.pathname);
    } catch (error) {
      alert('There was an error submitting your application. Please try again.');
    }
  });
}

// Handle showing/hiding sections on index.html based on hash
function handleHash() {
  const hash = window.location.hash;
  const homeScreen = document.getElementById('home-screen');
  const joinFormSection = document.getElementById('join-form-section');
  
  if (!homeScreen || !joinFormSection) return;
  
  if (hash === '#join') {
    homeScreen.classList.add('hidden');
    joinFormSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    homeScreen.classList.remove('hidden');
    joinFormSection.classList.add('hidden');
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