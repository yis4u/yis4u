'use strict';
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
function syncThemeButton() {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
}
themeToggle.hidden = false;
syncThemeButton();
systemTheme.addEventListener('change', syncThemeButton);
themeToggle.addEventListener('click', () => {
  const theme = themeToggle.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
  root.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch { /* Theme still works when storage is blocked. */ }
  syncThemeButton();
});
const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('navigation');
const mobile = matchMedia('(max-width: 760px)');
menuToggle.hidden = false;
function closeMenu(returnFocus = false) {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.hidden = mobile.matches;
  if (returnFocus) menuToggle.focus();
}
closeMenu();
mobile.addEventListener('change', () => {
  const focusWasInNav = navigation.contains(document.activeElement);
  closeMenu(mobile.matches && focusWasInNav);
});
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.hidden = !open;
});
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  closeMenu();
  const target = document.querySelector(link.getAttribute('href'));
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});
document.addEventListener('click', event => {
  if (mobile.matches && !event.target.closest('.header')) closeMenu();
});
const dialog = document.getElementById('project-dialog');
const projectOpen = document.getElementById('project-open');
projectOpen.addEventListener('click', () => {
  dialog.showModal();
  document.body.classList.add('modal-open');
});
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const first = dialog.querySelector('button');
  const last = dialog.querySelector('a');
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  projectOpen.focus({ preventScroll: true });
});
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  copyButton.disabled = true;
  copyStatus.textContent = '';
  try {
    await navigator.clipboard.writeText('zhenyea@gmail.com');
    copyStatus.textContent = 'Email copied. Say hello when you’re ready!';
  } catch {
    copyStatus.textContent = 'Couldn’t copy. Select zhenyea@gmail.com to copy it, or use the email link.';
  } finally {
    copyButton.disabled = false;
  }
});
document.getElementById('year').textContent = new Date().getFullYear();
