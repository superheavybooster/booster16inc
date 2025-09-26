function showHome() {
  // Hide all sections
  const sections = ['flight1', 'flight2', 'updates'];
  sections.forEach(sec => document.getElementById(sec + '-section').classList.add('hidden'));

  // Show welcome screen
  document.getElementById('welcome-screen').classList.remove('hidden');
}
