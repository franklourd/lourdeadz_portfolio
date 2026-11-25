const themeButton = document.querySelector('.theme-toggle');
const messageField = document.querySelector('#message');
const messageCount = document.querySelector('#message-count');

function applyTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
}

let savedTheme = 'dark';
try {
  savedTheme = localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark';
} catch (error) {
  // The page still works when browser storage is unavailable.
}

applyTheme(savedTheme);
themeButton.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch (error) {
    // Keep the selected theme for this page even if it cannot be saved.
  }
});

messageField.addEventListener('input', () => {
  messageCount.textContent = `${messageField.value.length} / ${messageField.maxLength}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();

const sectionLinks = [...document.querySelectorAll('.main-nav a')];
const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

function setNavigationOpen(isOpen) {
  siteHeader.classList.toggle('nav-open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  sidebarBackdrop.hidden = !isOpen;
}

navToggle.addEventListener('click', () => {
  setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
});

sidebarBackdrop.addEventListener('click', () => {
  setNavigationOpen(false);
  navToggle.focus();
});

sectionLinks.forEach(link => link.addEventListener('click', () => {
  if (navToggle.getAttribute('aria-expanded') === 'true') {
    setNavigationOpen(false);
    navToggle.focus();
  }
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    setNavigationOpen(false);
    navToggle.focus();
  }
});

const sections = sectionLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(entries => {
  const visibleSection = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visibleSection) return;

  sectionLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${visibleSection.target.id}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.5, 1] });

sections.forEach(section => sectionObserver.observe(section));

const resumeTabs = [...document.querySelectorAll('[data-resume-tab]')];
const resumePanels = [...document.querySelectorAll('[data-resume-panel]')];

function activateResumeTab(tab, moveFocus = false) {
  const activeSection = tab.dataset.resumeTab;

  resumeTabs.forEach(item => {
    const isActive = item === tab;
    item.setAttribute('aria-selected', String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  resumePanels.forEach(panel => {
    panel.hidden = panel.dataset.resumePanel !== activeSection;
  });

  if (moveFocus) tab.focus();
}

resumeTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateResumeTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % resumeTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + resumeTabs.length) % resumeTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = resumeTabs.length - 1;
    else return;

    event.preventDefault();
    activateResumeTab(resumeTabs[nextIndex], true);
  });
});
