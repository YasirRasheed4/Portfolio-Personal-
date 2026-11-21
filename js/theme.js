(function () {
  try {
    if (localStorage.getItem('yr-theme') === 'light') {
      document.documentElement.classList.add('light');
    }
  } catch (error) {
    // Local storage may be unavailable in private or restricted browsing modes.
  }
})();
