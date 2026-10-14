// Keep the interaction model intentionally small: accessible project filters.
const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project-card')];
for (const button of filters) {
  button.addEventListener('click', () => {
    const current = button.dataset.filter;
    for (const option of filters) {
      const active = button === option;
      option.classList.toggle('is-active', active);
      option.setAttribute('aria-pressed', String(active));
    }
    for (const project of projects) {
      const groups = (project.dataset.category || '').split(/\s+/);
      project.hidden = current !== 'all' && !groups.includes(current);
    }
  });
}
const count = document.querySelector('.filter-count');
if (count) count.textContent = String(projects.length);
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Keep a clean typographic monogram when the public GitHub avatar is unavailable.
const avatar = document.querySelector('.about-photo img');
if (avatar) avatar.addEventListener('error', () => { avatar.hidden = true; });
