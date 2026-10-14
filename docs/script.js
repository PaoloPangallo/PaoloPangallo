// Portfolio v3 — functional, accessible interaction. No analytics or external APIs.
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
const tabs = [...document.querySelectorAll('.stage-tab')];
function renderExplorer() {
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
    button.addEventListener('click', () => { activeStage = index; renderExplorer(); });
    pipeline.append(button);
  });
  const stage = stages[activeStage];
  document.getElementById('inspector-step').textContent = `${String(activeStage + 1).padStart(2, '0')} / ${stage.category}`;
  document.getElementById('inspector-title').textContent = stage.title;
  document.getElementById('inspector-description').textContent = stage.detail;
  document.getElementById('inspector-link').href = stage.href;
}
tabs.forEach(button => button.addEventListener('click', () => {
  activeSystem = button.dataset.system;
  activeStage = 0;
  tabs.forEach(tab => { const yes = tab === button; tab.classList.toggle('active', yes); tab.setAttribute('aria-pressed', String(yes)); });
  renderExplorer();
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
  if (progress) progress.style.width = `${Math.max(0, Math.min(100, window.scrollY / max * 100))}%`;
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; } }, { passive: true });
updateProgress();
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const profilePicture = document.querySelector('.about-photo img');
profilePicture?.addEventListener('error', () => { profilePicture.hidden = true; });