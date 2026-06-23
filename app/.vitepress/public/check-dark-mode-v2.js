function getCookie(key) {
  const name = `${encodeURIComponent(key)}=`;
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookies = decodedCookies.split('; ');
  for (let cookie of cookies) {
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }

  return null;
}

const e = getCookie('openEuler-theme-appearance') || 'auto';
const a = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!e || e === 'auto' ? a : e === 'dark') {
  document.documentElement.setAttribute('data-o-theme', 'e.dark');
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.setAttribute('data-o-theme', 'e.light');
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
}
