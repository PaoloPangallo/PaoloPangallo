// Portfolio v4 — functional, accessible interaction. No analytics or external APIs.
const systems = {
  mcp: {
    stages: [
      { short: 'Request', category: 'INPUT', title: 'Natural-language request', detail: 'A user starts with a shopping question. The application translates this request into a workflow rather than a fixed keyword query.', href: 'https://github.com/PaoloPangallo/MCP_E-commerce/tree/Paolo_minimax2.7/ebay-ui' },
      { short: 'Agent', category: 'ORCHESTRATION', title: 'Agent planning and execution', detail: 'The orchestration layer decides which tool operations are relevant and coordinates the next steps.', href: 'https://github.com/PaoloPangallo/MCP_E-commerce/tree/Paolo_minimax2.7/app/agent' },
      { short: 'Tools', category: 'INTEGRATIONS', title: 'MCP tools and retrieval', detail: 'Explicit tool handlers connect search, eBay-related functionality and available retrieval components.', href: 'https://github.com/PaoloPangallo/MCP_E-commerce/tree/Paolo_minimax2.7/app/mcp' },
      { short: 'App', category: 'APPLICATION', title: 'Backend state and frontend', detail: 'FastAPI, storage services and a React interface bring the workflow into a usable application.', href: 'https://github.com/PaoloPangallo/MCP_E-commerce' }
    ]
  },
  mtb: {
    stages: [
      { short: 'Case', category: 'INPUT', title: 'Structured case context', detail: 'A case starts from explicit clinical and molecular information. Missing information is not silently filled in.', href: 'https://github.com/PaoloPangallo/MTB_GRAPH_RAG' },
      { short: 'Retrieve', category: 'RETRIEVAL', title: 'Evidence retrieval', detail: 'The architecture retrieves relevant structured knowledge and documentary sources with traceable references.', href: 'https://github.com/PaoloPangallo/MTB_GRAPH_RAG/tree/main/mtb-graphrag/backend/pipeline' },
      { short: 'Verify', category: 'VERIFICATION', title: 'Claim verification', detail: 'Candidate claims are checked against the permitted evidence. Uncertainty and unsupported claims remain visible.', href: 'https://github.com/PaoloPangallo/MTB_GRAPH_RAG' },
      { short: 'Dossier', category: 'HUMAN REVIEW', title: 'Structured evidence dossier', detail: 'Findings and source provenance are organized for review. This is a research prototype, not a clinical decision system.', href: 'https://github.com/PaoloPangallo/MTB_GRAPH_RAG' }
    ]
  },
  rl: {
    stages: [
      { short: 'Game', category: 'ENVIRONMENT', title: 'Game and state representation', detail: 'The board state provides the information an agent uses to evaluate possible actions.', href: 'https://github.com/PaoloPangallo/IA_Cephalopod' },
      { short: 'Search', category: 'CLASSICAL AI', title: 'Tree-search methods', detail: 'Minimax, Alpha-Beta and MCTS explore different ways to select actions through search.', href: 'https://github.com/PaoloPangallo/IA_Cephalopod' },
      { short: 'Learn', category: 'LEARNED AI', title: 'Learning-based agents', detail: 'Reinforcement learning and neural approaches offer alternatives to hand-designed search strategies.', href: 'https://github.com/PaoloPangallo/IA_Cephalopod' },
      { short: 'Evaluate', category: 'ANALYSIS', title: 'Results and limitations', detail: 'Methods differ in training assumptions and compute; meaningful comparisons need carefully matched conditions.', href: 'https://github.com/PaoloPangallo/IA_Cephalopod' }
    ]
  }
};
let activeSystem = 'mcp';
let activeStage = 0;
const pipeline = document.getElementById('stage-pipeline');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const canAnimate = () => !motionPreference.matches;
function animateIn(element, distance = 8) {
  if (!canAnimate() || !element || typeof element.animate !== 'function') return;
  element.animate(
    [{ opacity: .35, transform: 'translate3d(0,' + distance + 'px,0)' },
     { opacity: 1, transform: 'translate3d(0,0,0)' }],
    { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' }
  );
}
const tabs = [...document.querySelectorAll('.stage-tab')];
function renderExplorer({ animateNodes = false, restoreFocus = false } = {}) {
  if (!pipeline) return;
  pipeline.replaceChildren();
  const stages = systems[activeSystem].stages;
  stages.forEach((stage, index) => {
    if (index !== 0) {
      const arrow = document.createElement('span');
      arrow.className = 'pipeline-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      pipeline.append(arrow);
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pipeline-step' + (index === activeStage ? ' current' : '');
    button.setAttribute('aria-pressed', String(index === activeStage));
    button.setAttribute('aria-label', `Inspect stage ${index + 1}: ${stage.title}`);
    const num = document.createElement('span'); num.className = 'step-no'; num.textContent = String(index + 1).padStart(2, '0');
    const text = document.createElement('span'); text.className = 'step-name'; text.textContent = stage.short;
    button.append(num, text);
    button.addEventListener('click', () => { activeStage = index; renderExplorer({ restoreFocus: true }); });
    pipeline.append(button);
  });
  const stage = stages[activeStage];
  document.getElementById('inspector-step').textContent = `${String(activeStage + 1).padStart(2, '0')} / ${stage.category}`;
  document.getElementById('inspector-title').textContent = stage.title;
  document.getElementById('inspector-description').textContent = stage.detail;
  document.getElementById('inspector-link').href = stage.href;
  if (restoreFocus) pipeline.querySelector('.pipeline-step.current')?.focus({ preventScroll: true });
  const inspector = document.querySelector('.stage-inspector');
  if (animateNodes && canAnimate()) {
    pipeline.querySelectorAll('.pipeline-step').forEach((node, i) => {
      if (typeof node.animate === 'function') node.animate(
        [{ opacity: .3, transform: 'translate3d(0,7px,0)' }, { opacity: 1, transform: 'translate3d(0,0,0)' }],
        { duration: 320, delay: i * 35, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
    });
  }
  if (animateNodes || restoreFocus) animateIn(inspector, 5);
}
tabs.forEach(button => button.addEventListener('click', () => {
  activeSystem = button.dataset.system;
  activeStage = 0;
  tabs.forEach(tab => { const yes = tab === button; tab.classList.toggle('active', yes); tab.setAttribute('aria-pressed', String(yes)); });
  renderExplorer({ animateNodes: true });
}));
renderExplorer();

const filters = [...document.querySelectorAll('.project-filter')];
const cards = [...document.querySelectorAll('.library-card')];
const search = document.getElementById('project-search');
let activeFilter = 'all';
function renderProjects() {
  const term = (search?.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const categories = (card.dataset.tags || '').split(' ');
    const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesTerm = !term || `${card.dataset.search} ${card.textContent}`.toLowerCase().includes(term);
    const show = matchesCategory && matchesTerm;
    card.hidden = !show;
    if (show) visible++;
  });
  const count = document.getElementById('result-count');
  if (count) count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown`;
  const empty = document.getElementById('empty-state');
  if (empty) empty.hidden = visible > 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => { const yes = item === button; item.classList.toggle('selected', yes); item.setAttribute('aria-pressed', String(yes)); });
  renderProjects();
}));
search?.addEventListener('input', renderProjects);
document.getElementById('all-count').textContent = String(cards.length);
renderProjects();

// Mobile navigation: click, Escape, link selection and responsive cleanup.
const menuButton = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
function setMenu(open) {
  if (!menu || !menuButton) return;
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuButton.classList.toggle('open', open);
}
menuButton?.addEventListener('click', () => setMenu(menu.hidden));
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu && !menu.hidden) { setMenu(false); menuButton.focus(); } });
window.addEventListener('resize', () => { if (window.innerWidth > 800) setMenu(false); });

const progress = document.getElementById('scroll-progress');
let ticking = false;
function updateProgress() {
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (progress) progress.style.transform = 'scaleX(' + Math.max(0, Math.min(1, window.scrollY / max)) + ')';
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });
updateProgress();
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const profilePicture = document.querySelector('.about-photo img');
profilePicture?.addEventListener('error', () => { profilePicture.hidden = true; });

// Progressive enhancement: no JS, no IntersectionObserver or reduced motion
// always means content stays immediately readable and visible.
(function setupScrollMotion() {
  if (!canAnimate() || !('IntersectionObserver' in window)) return;
  const animated = [
    ...document.querySelectorAll('.section-heading, .snapshot-bar > div, .case-art, .case-content, .library-card, .principle, .toolkit-intro, .skill-group, .about-left, .about-right, .footer-main > div:first-child')
  ];
  const observer = new IntersectionObserver((entries, io) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
  const viewHeight = window.innerHeight;
  for (const element of animated) {
    const rect = element.getBoundingClientRect();
    if (rect.top < viewHeight * .93) continue;
    const staggerGroup = element.classList.contains('library-card')
      ? [...element.parentElement.children].indexOf(element) % 4
      : element.classList.contains('principle')
        ? [...element.parentElement.children].indexOf(element)
        : 0;
    element.style.setProperty('--reveal-delay', String(Math.min(staggerGroup * 50, 150)) + 'ms');
    element.classList.add('reveal-on-scroll');
    observer.observe(element);
  }
  document.documentElement.classList.add('motion-ready');

  motionPreference.addEventListener?.('change', event => {
    if (!event.matches) return;
    for (const element of animated) element.classList.add('is-visible');
    observer.disconnect();
  }, { once: true });
})();

// Highlight the currently read section without changing normal scrolling.
(function setupSectionTracking() {
  if (!('IntersectionObserver' in window)) return;
  const sections = [...document.querySelectorAll('main section[id]')];
  const navigation = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const watcher = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navigation) {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('is-current', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => watcher.observe(section));
})();
