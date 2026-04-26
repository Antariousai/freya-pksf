const page = document.body.dataset.page || "home";

const navItems = [
  { key: "home", href: "index.html", label: "Overview" },
  { key: "business", href: "business.html", label: "For Business", pill: true },
  { key: "government", href: "government.html", label: "For Government", pill: true },
  { key: "ngo", href: "ngo.html", label: "For NGO", pill: true },
  { key: "freya", href: "freya.html", label: "Freya" }
];

const footerLinks = {
  platform: [
    { href: "index.html#platform", label: "Platform Overview" },
    { href: "index.html#components", label: "Components" },
    { href: "freya.html", label: "Freya" }
  ],
  solutions: [
    { href: "business.html", label: "For Business" },
    { href: "government.html", label: "For Government" },
    { href: "ngo.html", label: "For NGO" }
  ],
  resources: [
    { href: "index.html#workflow", label: "How It Works" },
    { href: "index.html#benefits", label: "Why Antarious" },
    { href: "mailto:hello@antarious.ai?subject=Request%20Brochure", label: "Request Brochure" }
  ],
  company: [
    { href: "mailto:hello@antarious.ai?subject=Request%20a%20Demo", label: "Book a Demo" },
    { href: "mailto:hello@antarious.ai?subject=Partnership%20Inquiry", label: "Partnerships" },
    { href: "mailto:legal@antarious.ai?subject=Security%20Request", label: "Security" }
  ]
};

function renderHeader() {
  const headerRoot = document.getElementById("site-header");
  if (!headerRoot) return;

  const navMarkup = navItems.map((item) => {
    const active = item.key === page ? "is-active" : "";
    const pill = item.pill ? "is-pill" : "";
    return `<a class="${[active, pill].filter(Boolean).join(" ")}" href="${item.href}">${item.label}</a>`;
  }).join("");

  headerRoot.innerHTML = `
    <header class="site-header" id="top">
      <div class="shell header-shell">
        <a class="brand" href="index.html" aria-label="Antarious home">
          <img class="brand-logo brand-logo--light" src="assets/logos/antarious-main.svg" alt="Antarious">
          <img class="brand-logo brand-logo--dark" src="assets/logos/antarious-white.png" alt="Antarious">
        </a>
        <nav class="primary-nav" aria-label="Main navigation">
          ${navMarkup}
        </nav>
        <div class="header-actions">
          <a class="button button-secondary" href="index.html#contact">Request Demo</a>
          <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="mobile-panel" id="mobile-panel">
        <div class="mobile-panel-inner">
          ${navItems.map((item) => `<a class="button ${item.key === page ? "button-primary" : "button-secondary"}" href="${item.href}">${item.label}</a>`).join("")}
          <a class="button button-secondary" href="index.html#contact">Request Demo</a>
        </div>
      </div>
    </header>
  `;

  const header = headerRoot.querySelector(".site-header");
  const menuButton = headerRoot.querySelector(".menu-toggle");
  const mobilePanel = headerRoot.querySelector("#mobile-panel");

  menuButton?.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });
}

function renderFooter() {
  const footerRoot = document.getElementById("site-footer");
  if (!footerRoot) return;

  const list = (items) => items.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("");

  footerRoot.innerHTML = `
    <footer class="site-footer">
      <div class="shell">
        <section class="footer-cta" id="contact">
          <div class="footer-cta-grid">
            <div>
              <div class="eyebrow">Private Rollout</div>
              <h2 class="section-title">Bring Antarious into the part of the organisation where speed, control, and judgement matter most.</h2>
              <p class="section-subtitle">Every deployment is tailored to your workflow, approval model, and operating constraints. Start with one team, one department, or one mission-critical process.</p>
            </div>
            <div class="button-row">
              <a class="button button-primary" href="mailto:hello@antarious.ai?subject=Request%20a%20Demo">Request a Demo</a>
              <a class="button button-secondary" href="freya.html">Meet Freya</a>
            </div>
          </div>
        </section>

        <div class="footer-grid">
          <div>
            <a class="brand" href="index.html" aria-label="Antarious home">
              <img class="brand-logo brand-logo--light" src="assets/logos/antarious-main.svg" alt="Antarious">
              <img class="brand-logo brand-logo--dark" src="assets/logos/antarious-white.png" alt="Antarious">
            </a>
            <p class="footer-brand-copy">Antarious is the AI operating infrastructure for organisations that cannot afford slow execution, fragmented intelligence, or weak governance.</p>
          </div>
          <div>
            <h3 class="footer-title">Platform</h3>
            <ul class="footer-list">${list(footerLinks.platform)}</ul>
          </div>
          <div>
            <h3 class="footer-title">Solutions</h3>
            <ul class="footer-list">${list(footerLinks.solutions)}</ul>
          </div>
          <div>
            <h3 class="footer-title">Resources</h3>
            <ul class="footer-list">${list(footerLinks.resources)}</ul>
          </div>
          <div>
            <h3 class="footer-title">Company</h3>
            <ul class="footer-list">${list(footerLinks.company)}</ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© <span id="year"></span> Antarious. All rights reserved.</div>
          <div class="footer-bottom-links">
            <a href="mailto:legal@antarious.ai?subject=Privacy%20Request">Privacy</a>
            <a href="mailto:legal@antarious.ai?subject=Terms%20Request">Terms</a>
            <a href="mailto:security@antarious.ai?subject=Security%20Question">Security</a>
            <a href="mailto:hello@antarious.ai?subject=Partnership%20Inquiry">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("antarious-theme", theme);
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
}

function initTheme() {
  const savedTheme = localStorage.getItem("antarious-theme") || "light";
  setTheme(savedTheme);
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  revealItems.forEach((item) => observer.observe(item));
}

initTheme();
renderHeader();
renderFooter();
initReveal();
