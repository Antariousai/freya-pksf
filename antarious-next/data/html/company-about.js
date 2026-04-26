const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>About Antarious | Antarious</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    :root{--bg:#F8FBFF;--card:#FFFFFF;--ink:#0F172A;--ink2:#334155;--ink3:#64748B;--line:rgba(15,23,42,.08);--teal:#0EA5E9;--teal2:#0284C7;--glow:rgba(14,165,233,.12)}
    *{box-sizing:border-box}
    body{margin:0;font-family:"DM Sans",sans-serif;background:linear-gradient(180deg,#FFFFFF 0%,#F8FBFF 100%);color:var(--ink);line-height:1.75}
    a{text-decoration:none;color:var(--teal2)}
    .shell{min-height:100vh}
    .topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:rgba(255,255,255,.9);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}
    .brand{display:flex;align-items:center;gap:12px;font-family:"Outfit",sans-serif;font-weight:800;color:var(--ink)}
    .brand img{height:28px;width:auto;display:block}
    .top-actions{display:flex;gap:10px;flex-wrap:wrap}
    .top-link,.top-cta{font-family:"Outfit",sans-serif;font-size:13px;border-radius:12px;padding:9px 16px;transition:all .2s}
    .top-link{color:var(--ink2);border:1px solid rgba(14,165,233,.14);background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.02))}
    .top-cta{color:#fff;background:linear-gradient(135deg,var(--teal),var(--teal2));border:1px solid transparent;box-shadow:0 8px 22px rgba(14,165,233,.18)}
    .wrap{max-width:1120px;margin:0 auto;padding:40px 24px 72px}
    .hero{padding:28px 0 26px}
    .eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--teal2);margin-bottom:16px}
    .eyebrow::before{content:"";width:16px;height:1.5px;background:var(--teal2)}
    h1{font-family:"Outfit",sans-serif;font-size:clamp(34px,5vw,62px);line-height:.98;letter-spacing:-2px;margin:0 0 16px}
    .tagline{font-family:"Outfit",sans-serif;font-size:clamp(18px,2.1vw,28px);font-weight:700;line-height:1.28;color:var(--ink2);max-width:860px;margin:0 0 14px}
    .support{max-width:840px;color:var(--ink3);font-size:16px}
    .doc{display:grid;gap:18px}
    .doc-section{background:var(--card);border:1px solid var(--line);border-radius:28px;padding:28px;box-shadow:0 18px 46px rgba(15,23,42,.05)}
    .doc-section h2{font-family:"Outfit",sans-serif;font-size:22px;line-height:1.1;letter-spacing:-.6px;margin:0 0 18px}
    .doc-section h3{font-family:"Outfit",sans-serif;font-size:17px;line-height:1.25;letter-spacing:-.4px;margin:20px 0 10px;color:var(--ink)}
    .doc-section p{margin:0 0 14px;color:var(--ink2);font-size:15px}
    .doc-section ul{margin:0 0 10px;padding-left:20px;color:var(--ink2)}
    .doc-section li{margin:0 0 9px}
    .doc-section strong{color:var(--ink)}
    .callout-line{font-family:"Outfit",sans-serif;font-weight:700;color:var(--teal2)!important}
    .search-mock{margin:0 0 16px;padding:14px 16px;border-radius:16px;border:1px solid rgba(14,165,233,.18);background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.92));color:var(--ink3)}
    .disabled-link{color:var(--teal2);font-weight:600}
    .footer-nav{margin-top:34px;display:flex;gap:12px;flex-wrap:wrap}
    .footer-nav a{font-family:"Outfit",sans-serif;font-size:13px;font-weight:700;border-radius:999px;padding:9px 14px;border:1px solid var(--line);background:#fff;color:var(--ink2)}
    @media(max-width:720px){
      .topbar{padding:16px 18px;align-items:flex-start;flex-direction:column;gap:12px}
      .wrap{padding:28px 18px 54px}
      .doc-section{padding:22px}
      .top-actions{width:100%}
    }
  </style>
<style id="antarious-design-system-overrides">
/* antarious-design-system-overrides */
:root,
[data-theme="light"] {
  --brand-primary: #0EA5E9;
  --brand-primary-strong: #0284C7;
  --brand-primary-soft: #38BDF8;
  --brand-success: #059669;
  --brand-danger: #DC2626;
  --brand-warning: #D97706;
  --surface-base: #FFFFFF;
  --surface-muted: #F8FAFC;
  --text-strong: #0F172A;
  --text-body: #334155;
  --text-muted: #64748B;
  --border-subtle: rgba(15,23,42,.09);
  --motion-fast: 180ms;
  --motion-base: 260ms;
  --motion-slow: 420ms;
  --ease-standard: cubic-bezier(.22,1,.36,1);
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
}

html[data-theme="dark"] {
  --surface-base: #07131E;
  --surface-muted: #0B1722;
  --text-strong: #E5EEF7;
  --text-body: #D6E0EA;
  --text-muted: #9AB0C4;
  --border-subtle: rgba(255,255,255,.10);
  --brand-primary: #38BDF8;
  --brand-primary-strong: #0EA5E9;
  --brand-primary-soft: #7DD3FC;
  --brand-success: #34D399;
  --brand-danger: #F87171;
  --brand-warning: #FBBF24;
}

:root {
  --td: var(--brand-primary);
  --tdd: var(--brand-primary-strong);
  --tl: var(--brand-primary-soft);
  --teal: var(--brand-primary);
  --teal2: var(--brand-primary-strong);
  --teal3: var(--brand-primary-soft);
  --green: var(--brand-success);
  --red: var(--brand-danger);
  --amber: var(--brand-warning);
}

html { font-size: 16px; }
body {
  background: var(--surface-base);
  color: var(--text-strong);
  line-height: 1.66;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}


.antarious-wordmark {
  display: inline-flex;
  align-items: center;
  color: var(--text-strong, var(--ink, #0F172A));
  line-height: 1;
}
.antarious-wordmark svg {
  width: clamp(140px, 18vw, 182px);
  height: auto;
  display: block;
}
html[data-theme="dark"] .antarious-wordmark {
  color: #F3F8FF;
}


.theme-logo-main {
  height: 28px;
  width: auto;
  display: block;
}
.nav-logo .theme-logo-main {
  height: 28px;
}
.footer-brand-img.theme-logo-main,
.name .theme-logo-main {
  height: 28px;
}
@media (max-width: 768px) {
  .theme-logo-main { height: 24px; }
}


/* Global nav-footer consistency */
.nav,
.topbar,
.site-header {
  position: sticky;
  top: 0;
  z-index: 950;
  min-height: 62px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--border-subtle, var(--bdr, rgba(15,23,42,.09)));
  background: color-mix(in srgb, var(--surface-base, var(--bg, #fff)) 92%, transparent);
  backdrop-filter: blur(20px);
}

.nav-logo,
.brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.theme-logo-main {
  height: 28px;
  width: auto;
  display: block;
}

.nav-links,
.nav-r,
.nav-right,
.top-actions,
.header-actions,
.primary-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-r,
.nav-right,
.top-actions,
.header-actions { margin-left: auto; }

.nl,
.nav-link,
.top-link,
.primary-nav a,
.nav-sector-btn,
.nav-freya-btn,
.nav-ghost,
.btn-back {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-body, var(--ink2, #334155));
  background: color-mix(in srgb, var(--surface-base, #fff) 90%, transparent);
  border: 1px solid color-mix(in srgb, var(--brand-primary, #0EA5E9) 18%, var(--border-subtle, rgba(15,23,42,.09)));
  border-radius: 10px;
  padding: 8px 14px;
  white-space: nowrap;
}

.nav-cta,
.btn-nav-cta,
.top-cta {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 9px 18px;
  background: linear-gradient(135deg, var(--brand-primary, #0EA5E9), var(--brand-primary-strong, #0284C7));
  box-shadow: 0 8px 18px color-mix(in srgb, var(--brand-primary, #0EA5E9) 35%, transparent);
}

footer,
.site-footer,
.footer,
.footer-inner,
.footer-top,
.footer-grid,
.footer-nav,
.footer-bottom {
  color: var(--text-body, var(--ink2, #334155));
}

footer,
.site-footer,
.footer {
  background: color-mix(in srgb, var(--surface-muted, var(--bg2, #f8fafc)) 90%, var(--surface-base, #fff));
  border-top: 1px solid var(--border-subtle, var(--bdr, rgba(15,23,42,.09)));
  margin-top: 56px;
}

.footer-inner,
.shell > .wrap + .footer-nav,
.footer-nav {
  width: min(1200px, calc(100% - 40px));
  margin-left: auto;
  margin-right: auto;
}

.footer-top,
.footer-grid,
.footer-nav {
  padding-top: 24px;
  padding-bottom: 20px;
}

.footer-links,
.footer-list {
  display: grid;
  gap: 8px;
}

.footer-col-h,
.footer-title,
.footer-head {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-muted, var(--ink4, #94A3B8));
  margin-bottom: 10px;
}

.footer-lnk,
.footer-list a,
.footer-nav a {
  color: var(--text-body, var(--ink2, #334155));
}

.footer-link-desc,
.footer-brand-copy,
.footer-copy {
  color: var(--text-muted, var(--ink3, #64748B));
}

.footer-bottom {
  border-top: 1px solid var(--border-subtle, var(--bdr2, rgba(15,23,42,.06)));
  padding-top: 14px;
  padding-bottom: 18px;
}

@media (max-width: 860px) {
  .nav,
  .topbar,
  .site-header {
    padding: 10px 14px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .nav-links,
  .primary-nav,
  .top-actions {
    order: 3;
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 2px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .nav-links::-webkit-scrollbar,
  .primary-nav::-webkit-scrollbar,
  .top-actions::-webkit-scrollbar { display: none; }

  .nav-r,
  .nav-right,
  .header-actions {
    width: auto;
    margin-left: auto;
  }

  .theme-logo-main { height: 24px; }

  .footer-top,
  .footer-grid {
    grid-template-columns: 1fr !important;
    gap: 16px;
  }

  .footer-nav {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

/* Keep common shells centered and screen-balanced */
.page,
.hero-inner,
.nav,
section > .container,
section > .page,
section > .inner,
.nav-inner,
.footer-inner {
  width: min(1200px, calc(100% - 2 * var(--space-6)));
  margin-left: auto;
  margin-right: auto;
}

/* Base readability and overflow safety */
h1, h2, h3, h4, p, li { overflow-wrap: anywhere; }
.h2,
.hero-h1,
.section-title,
.display {
  letter-spacing: -0.02em;
  line-height: 1.06;
  text-wrap: balance;
}
.sp,
.hero-sub,
.hero-body,
.uc-p,
p,
li { color: var(--text-body); }

/* Improve dark hero legibility (Freya/Government variants) */
html[data-theme="dark"] .hero-h1,
html[data-theme="dark"] .hero-sub,
html[data-theme="dark"] .hero-body {
  color: #EAF2FF !important;
  text-shadow: 0 1px 1px rgba(0,0,0,.32);
}

html[data-theme="dark"] .hero-h1 .ac {
  background: none !important;
  -webkit-text-fill-color: var(--brand-primary-soft) !important;
  color: var(--brand-primary-soft) !important;
}
html[data-theme="dark"] .hero-h1 .dim,
html[data-theme="dark"] .hero-h1 em {
  color: #BBD0E6 !important;
}

/* Uniform interaction feel */
.btn,
.btn-primary,
.btn-p,
.nav-cta,
.btn-nav-cta,
.button-primary,
.pc-btn.featured-btn,
.nav-link,
.nl,
.primary-nav a {
  transition: transform var(--motion-base) var(--ease-standard), box-shadow var(--motion-base) var(--ease-standard), background-color var(--motion-base) var(--ease-standard), border-color var(--motion-base) var(--ease-standard), color var(--motion-base) var(--ease-standard);
}

.btn:hover,
.btn-primary:hover,
.btn-p:hover,
.nav-cta:hover,
.btn-nav-cta:hover,
.button-primary:hover,
.pc-btn.featured-btn:hover { transform: translateY(-2px); }

a:focus-visible,
button:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}

/* Smooth reveal defaults */
.reveal,
.reveal.in,
.reveal.is-visible {
  transition-duration: var(--motion-slow);
  transition-timing-function: var(--ease-standard);
}

/* Never leave key content invisible if JS reveal logic fails */
html:not(.js) .reveal,
body:not(.js) .reveal {
  opacity: 1 !important;
  transform: none !important;
}
/* Section rhythm */
section {
  padding: clamp(56px, 7vw, 96px) 0 !important;
}

/* Tablet layout harmonization */
@media (max-width: 1100px) {
  .page,
  .hero-inner,
  .nav,
  section > .container,
  section > .page,
  section > .inner,
  .nav-inner,
  .footer-inner { width: calc(100% - 2 * var(--space-5)); }

  .hero-inner,
  .uc-panel,
  .ft-hero,
  .bridge-grid,
  .hero-grid,
  .split-hero,
  .agents-grid,
  .cost-grid,
  .bo-strip,
  .footer-grid,
  .hero-stage-grid,
  .grid-4,
  .stack-grid { grid-template-columns: 1fr !important; }

  .grid-3,
  .workflow-grid,
  .benefit-grid,
  .stats-band,
  .ft-live-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }

  .h2,
  .hero-h1,
  .section-title,
  .display { font-size: clamp(2.15rem, 5.3vw, 3.4rem) !important; }
}

/* Mobile-first finishing */
@media (max-width: 768px) {
  html { font-size: 15px; }

  .page,
  .hero-inner,
  .nav,
  section > .container,
  section > .page,
  section > .inner,
  .nav-inner,
  .footer-inner { width: calc(100% - 2 * var(--space-4)) !important; }

  /* Reduce heavy decorative effects on small screens */
  .hero-grid-bg,
  .hero-glow,
  .hero-glow1,
  .hero-glow2,
  .hero-dots,
  .hero::before,
  .hero::after { display: none !important; }

  .nav {
    height: auto !important;
    min-height: 62px;
    padding: 10px var(--space-4) !important;
    gap: 8px !important;
    flex-wrap: wrap;
    align-items: center;
  }
  .nav-logo { margin-right: 8px !important; }

  .nav-links,
  .primary-nav {
    order: 3;
    width: 100%;
    margin: 6px 0 0 0 !important;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 2px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .nav-links::-webkit-scrollbar,
  .primary-nav::-webkit-scrollbar { display: none; }

  .nav-link,
  .nl,
  .primary-nav a { white-space: nowrap; flex: 0 0 auto; }

  .nav-right,
  .header-actions {
    margin-left: auto;
    width: auto;
    display: flex;
    gap: 8px;
  }

  .hero,
  .hero-wrap { min-height: auto !important; padding-top: 92px !important; }
  .hero-inner { gap: var(--space-6) !important; }

  .hero-h1,
  .display,
  .h2,
  .section-title {
    font-size: clamp(1.95rem, 9vw, 2.9rem) !important;
    line-height: 1.08 !important;
  }

  .hero-sub,
  .hero-body,
  .sp,
  .section-subtitle,
  .uc-p,
  .task-text {
    font-size: 0.98rem !important;
    line-height: 1.72 !important;
  }

  .hero-btns,
  .button-row,
  .hero-actions {
    display: grid !important;
    grid-template-columns: 1fr;
    gap: 10px !important;
    width: 100%;
  }

  .hero-btns > *,
  .button-row > *,
  .hero-actions > *,
  .btn,
  .btn-primary,
  .btn-p,
  .btn-g,
  .button,
  .button-link,
  .nav-cta,
  .btn-nav-cta,
  .nav-ghost,
  .btn-back,
  .pc-btn,
  .uc-tab {
    min-height: 46px;
    width: 100%;
    justify-content: center;
  }

  .hero-metrics,
  .uc-stats,
  .hero-stats,
  .stats-band {
    gap: var(--space-4) !important;
    flex-wrap: wrap;
  }

  .hero-sep,
  .hs-sep,
  .uc-div { display: none !important; }

  .cost-grid,
  .agents-grid,
  .bo-strip,
  .grid-2,
  .grid-3,
  .grid-4,
  .workflow-grid,
  .benefit-grid,
  .ft-live-grid,
  .t-mets,
  .stats-band { grid-template-columns: 1fr !important; }

  .feature-card,
  .workflow-card,
  .quote-card,
  .cta-panel,
  .surface,
  .footer-cta,
  .hero-stage,
  .terminal,
  .freya-terminal,
  .demo-win { padding: 20px !important; border-radius: 14px !important; }
}

/* Extra-large screens */
@media (min-width: 1600px) {
  .page,
  .hero-inner,
  .nav,
  section > .container,
  section > .page,
  section > .inner,
  .nav-inner,
  .footer-inner { width: min(1320px, calc(100% - 120px)); }
}



/* Final hero readability safeguards */
.hero-h1,
.hero-sub,
.hero-body {
  opacity: 1 !important;
}

html[data-theme="dark"] .hero,
html[data-theme="dark"] .hero-wrap {
  background: linear-gradient(180deg, #061427 0%, #0A1E35 100%) !important;
}

html[data-theme="dark"] .hero-kicker,
html[data-theme="dark"] .eyebrow {
  color: #8FD9FF !important;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>

<style id="antarious-svg-icon-theme">
.ai-svg-icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: -0.12em;
  color: var(--brand-primary-strong, var(--teal2, #0284C7));
}
.ai-svg-icon svg { width: 100%; height: 100%; display: block; }
.ai-icon-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}
.ai-icon-inline .ai-svg-icon {
  width: 1.1em;
  height: 1.1em;
}
html[data-theme="dark"] .ai-svg-icon {
  color: var(--brand-primary-soft, var(--teal3, #7DD3FC));
}
</style>
<script id="antarious-svg-icon-runtime">
(function () {
  var ICON_SVGS = {
    alert: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L21 19H3L12 3Z" stroke="currentColor" stroke-width="1.8"/><path d="M12 9V13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16.5" r="1" fill="currentColor"/></svg>',
    brain: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5a3 3 0 016 0 3 3 0 012.8 4.1A3 3 0 0118 15a3 3 0 01-2.5 2.96A3.5 3.5 0 0112 21a3.5 3.5 0 01-3.5-3.04A3 3 0 016 15a3 3 0 01.2-5.9A3 3 0 019 5z" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v8M9.5 10.5h2.5M12 13h2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.8" stroke="currentColor" stroke-width="1.8"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 2L5 13h5l-1.5 9L19 10h-5L13.5 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6.5 16v-4M12 16V8M17.5 16v-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20l4.5-1 9-9a1.8 1.8 0 000-2.5l-1-1a1.8 1.8 0 00-2.5 0l-9 9L4 20z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12.5 7.5l4 4" stroke="currentColor" stroke-width="1.8"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l7 3v5c0 5.2-3.5 8.8-7 10-3.5-1.2-7-4.8-7-10V6l7-3z" stroke="currentColor" stroke-width="1.8"/><path d="M9.5 12.5l1.8 1.8 3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    megaphone: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14V10l11-4v12L4 14z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M15 10h3a2 2 0 012 2 2 2 0 01-2 2h-3" stroke="currentColor" stroke-width="1.8"/><path d="M7.5 14.5l1.2 4h2.3l-1.1-3.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 4h3l1 4-2 1.5a13 13 0 005 5L17 12l4 1v3c0 1.1-.9 2-2 2C10 18 6 14 6 7c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7.5h7l2 2h9v7.5a2 2 0 01-2 2H5a2 2 0 01-2-2V7.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    signal: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 18h2M8 16h2M12 13h2M16 10h2M20 7h1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M4 18l16-11" stroke="currentColor" stroke-width="1.8"/></svg>',
    timer: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="13" r="7.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 9v4l2.8 1.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 3h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 3.5v3M16 3.5v3M4 9h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    money: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M19 12a7 7 0 00-.1-1l2-1.5-2-3.4-2.4.8a7.2 7.2 0 00-1.7-1L14.5 3h-5l-.3 2.9a7.2 7.2 0 00-1.7 1l-2.4-.8-2 3.4 2 1.5a7 7 0 000 2L3 14.5l2 3.4 2.4-.8a7.2 7.2 0 001.7 1L9.5 21h5l.3-2.9a7.2 7.2 0 001.7-1l2.4.8 2-3.4-2-1.5c.1-.3.1-.7.1-1z" stroke="currentColor" stroke-width="1.4"/></svg>',
    puzzle: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 4h4a2 2 0 012 2v1h2a2 2 0 012 2v3h-2a2 2 0 100 4h2v2a2 2 0 01-2 2h-3v-2a2 2 0 10-4 0v2H7a2 2 0 01-2-2v-3h2a2 2 0 100-4H5V8a2 2 0 012-2h2V4z" stroke="currentColor" stroke-width="1.8"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"/><path d="M5 19c1.6-3 4-4.5 7-4.5s5.4 1.5 7 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3c1 3-1 4.5-2.2 5.8C9.4 10.2 8 11.7 8 14a4 4 0 008 0c0-2.5-1.4-4.2-2.6-5.8C12.2 7 11 5.5 13 3z" stroke="currentColor" stroke-width="1.8"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M14.8 9.2l-1.8 5.6-5.6 1.8 1.8-5.6 5.6-1.8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.8"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 4c-7 0-12 4.5-12 10 0 3 2 6 6 6 5.5 0 10-5 10-12 0-2.3-1.7-4-4-4z" stroke="currentColor" stroke-width="1.8"/><path d="M8 16c2-2 4.8-4.2 9-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    mobile: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="17.5" r="0.9" fill="currentColor"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 8l8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6h14a2 2 0 012 2v7a2 2 0 01-2 2H10l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14l4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 16H6a4 4 0 010-8h2M16 8h2a4 4 0 010 8h-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10l4-4 3 3 3-3 6 6-4 4-3-3-2 2-5-5-2 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function render() {
    var nodes = document.querySelectorAll('.ai-svg-icon-slot[data-ai-icon]');
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var icon = node.getAttribute('data-ai-icon');
      var svg = ICON_SVGS[icon];
      if (!svg) continue;
      node.classList.add('ai-svg-icon');
      node.setAttribute('aria-hidden', 'true');
      node.innerHTML = svg;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
</script>


<link rel="preload" as="image" href="/assets/logos/antarious-main.svg">
<style id="antarious-nav-sync-style">
.theme-logo-main{height:28px;width:auto;display:block}
.nav-logo .theme-logo-main{height:28px}
.footer-brand-img.theme-logo-main,.name .theme-logo-main{height:28px}

.nav{
  position:fixed;top:0;left:0;right:0;z-index:999;
  height:62px;display:flex;align-items:center;
  padding:0 clamp(14px,3.2vw,48px);
  gap:clamp(10px,1.7vw,24px);
  background:color-mix(in srgb,var(--surface-base,var(--bg,#fff)) 92%, transparent);
  backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(15,23,42,.07);
  transition:all .3s;
  width:min(1200px,calc(100% - 2 * clamp(14px,3vw,24px)));
  margin:0 auto;
}
.nav.scrolled{height:54px;box-shadow:0 1px 12px rgba(15,23,42,.06)}

.nav-logo{display:flex;align-items:center;gap:9px;cursor:pointer;flex-shrink:0}
.nav-links{display:flex;list-style:none;gap:2px;margin-left:clamp(8px,2vw,28px);padding:0}

.nav-link{
  font-size:13px;font-weight:700;color:var(--text-body,var(--ink2,#334155));
  padding:8px 16px;border-radius:12px;transition:all .2s;cursor:pointer;
  border:1px solid rgba(14,165,233,.14);
  background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.02));
  box-shadow:0 4px 14px rgba(15,23,42,.04);
  white-space:nowrap;
}
.nav-link:hover,.nav-link.active{color:var(--brand-primary-strong,var(--teal2,#0284C7));border-color:rgba(14,165,233,.26);background:linear-gradient(135deg,rgba(14,165,233,.12),rgba(56,189,248,.05));transform:translateY(-1px)}

.nav-right{display:flex;align-items:center;gap:10px;margin-left:auto;flex-shrink:0}
.nav-ghost{
  font-size:13px;font-weight:700;color:var(--brand-primary-strong,var(--teal2,#0284C7));
  background:linear-gradient(135deg,rgba(14,165,233,.14),rgba(56,189,248,.08));
  border:1px solid rgba(14,165,233,.24);padding:8px 18px;border-radius:12px;cursor:pointer;
  transition:all .2s;box-shadow:0 8px 22px rgba(14,165,233,.12);white-space:nowrap;
}
.nav-ghost:hover{border-color:rgba(14,165,233,.38);color:var(--brand-primary,var(--teal,#0EA5E9));transform:translateY(-1px);box-shadow:0 12px 28px rgba(14,165,233,.18)}
.nav-cta{
  font-size:13px;font-weight:800;color:#fff;
  border:none;padding:9px 22px;border-radius:12px;cursor:pointer;transition:all .22s;
  background:linear-gradient(135deg,var(--brand-primary,var(--teal,#0EA5E9)),var(--brand-primary-strong,var(--teal2,#0284C7)));
  box-shadow:0 6px 18px rgba(14,165,233,.26),0 0 0 1px rgba(14,165,233,.08);
  white-space:nowrap;
}
.nav-cta:hover{background:linear-gradient(135deg,var(--brand-primary-strong,var(--teal2,#0284C7)),#0369A1);transform:translateY(-1px);box-shadow:0 10px 24px rgba(14,165,233,.34)}

body{padding-top:62px}

/* Large laptop / small desktop */
@media (max-width:1100px){
  .nav{width:calc(100% - 2 * 20px);padding:0 20px;gap:12px}
  .nav-links{margin-left:10px}
  .nav-link{padding:8px 13px;font-size:12.5px}
  .nav-ghost{padding:8px 14px}
  .nav-cta{padding:9px 16px}
}

/* Tablet and below */
@media (max-width:860px){
  .theme-logo-main{height:24px}
  .nav{width:calc(100% - 2 * 14px);padding:10px 14px;gap:8px;flex-wrap:wrap;height:auto;min-height:62px}
  .nav-links{order:3;width:100%;margin:6px 0 0 0;overflow-x:auto;flex-wrap:nowrap;padding-bottom:2px;-ms-overflow-style:none;scrollbar-width:none}
  .nav-links::-webkit-scrollbar{display:none}
  .nav-right{width:auto;margin-left:auto;gap:8px}
  .nav-link{flex:0 0 auto}
}

/* Mobile */
@media (max-width:768px){
  .nav{width:calc(100% - 2 * 16px);padding:10px 12px;gap:8px;align-items:center}
  .nav-logo{margin-right:8px}
  .nav-links{margin:6px 0 0 0;gap:8px}
  .nav-link{padding:7px 11px;font-size:12px}
  .nav-right{display:flex;gap:8px;margin-left:auto;width:auto}
  .nav-ghost{padding:7px 11px;font-size:12px}
  .nav-cta{padding:8px 12px;font-size:12px}
}

/* Very small devices */
@media (max-width:420px){
  .nav-right{width:100%;justify-content:flex-end}
  .nav-ghost,.nav-cta{padding:7px 10px;font-size:11.5px}
}
</style>
<style id="antarious-footer-sync-style">
footer,
.site-footer,
.footer,
.footer-inner,
.footer-top,
.footer-grid,
.footer-nav,
.footer-bottom {
  color: var(--text-body, var(--ink2, #334155));
}

footer,
.site-footer,
.footer {
  background: color-mix(in srgb, var(--surface-muted, var(--bg2, #f8fafc)) 90%, var(--surface-base, #fff));
  border-top: 1px solid var(--border-subtle, var(--bdr, rgba(15,23,42,.09)));
  margin-top: 56px;
}

.footer-inner,
.shell > .wrap + .footer-nav,
.footer-nav {
  width: min(1200px, calc(100% - 40px));
  margin-left: auto;
  margin-right: auto;
}

.footer-top,
.footer-grid,
.footer-nav {
  padding-top: 24px;
  padding-bottom: 20px;
}

.footer-links,
.footer-list {
  display: grid;
  gap: 8px;
}

.footer-col-h,
.footer-title,
.footer-head {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--text-muted, var(--ink4, #94A3B8));
  margin-bottom: 10px;
}

.footer-lnk,
.footer-list a,
.footer-nav a {
  color: var(--text-body, var(--ink2, #334155));
}

.footer-link-desc,
.footer-brand-copy,
.footer-copy {
  color: var(--text-muted, var(--ink3, #64748B));
}

.footer-bottom {
  border-top: 1px solid var(--border-subtle, var(--bdr2, rgba(15,23,42,.06)));
  padding-top: 14px;
  padding-bottom: 18px;
}

@media (max-width: 860px) {
  .footer-top,
  .footer-grid {
    grid-template-columns: 1fr !important;
    gap: 16px;
  }
  .footer-nav {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
<script>(function(){try{var storedTheme=localStorage.getItem('antarious-theme');document.documentElement.dataset.theme=storedTheme==='dark'?'dark':'light';}catch(error){document.documentElement.dataset.theme='light';}})();</script></head>
<body>
  <div class="shell">
    <nav class="nav" id="nav">
  <div class="nav-logo" onclick="window.location='/'"><img fetchpriority="high" decoding="async" loading="eager" class="theme-logo-main" src="/assets/logos/antarious-main.svg" alt="Antarious AI"></div>
  <ul class="nav-links">
    <li><button class="nav-link" onclick="window.location='/business'">For Business</button></li>
    <li><button class="nav-link" onclick="window.location='/government'">For Government</button></li>
    <li><button class="nav-link" onclick="window.location='/ngo'">For NGO</button></li>
  </ul>
  <div class="nav-right">
    <button class="nav-ghost" onclick="window.location='/freya'">Meet Freya</button>
    <button class="nav-cta" onclick="window.location='/#cta'">Request Demo</button>
  </div>
</nav>
<main class="wrap">
      <header class="hero">
        <div class="eyebrow">Company</div>
        <h1>About Antarious</h1>
        <p class="tagline">We built an AI operating system for the organisations that run the world&#39;s most important operations — and we built it on the principle that humans must remain in control.</p>
        <p class="support">Antarious AI exists because the people who run complex operations — government departments, development organisations, enterprise teams — deserve better than the tools they have been given. They deserve an AI that works the way they do: proactively, continuously, and accountably.</p>
      </header>
      <div class="doc">
<section class="doc-section" id="section-01">
<h2>Section 01 — Who We Are</h2>
<h3>The Company</h3>
<p>Antarious AI is the developer of Freya — an autonomous AI agent designed to operate as the intelligence and execution layer for complex organisations.</p>
<p>We are an AI infrastructure company, not a productivity tool vendor. The difference matters. Productivity tools help individuals work faster. Antarious changes how organisations operate — connecting data, automating workflows, surfacing intelligence, and preserving the human accountability that operational environments require.</p>
<p>Our platform is built for three operating environments: enterprise and GTM teams, government departments and agencies, and NGO and development organisations. These are not three separate products. They are three configurations of the same foundational technology — an agentic AI operating system that adapts to the operational reality of each environment while preserving the same core principles: automation, intelligence, control, and transparency.</p>
</section>
<section class="doc-section" id="section-02">
<h2>Section 02 — What We Believe</h2>
<h3>The Principles That Shape Everything We Build</h3>
<p><strong>AI should amplify human capability, not replace human judgement.</strong><br>The work that matters most in complex organisations — strategic decisions, community relationships, policy design, creative direction, negotiation — is irreducibly human. Freya is built to handle everything that doesn&#39;t require a human, so your team can do everything that does. This is not a compromise position. It is our fundamental conviction about where AI creates genuine value.</p>
<p><strong>Accountability cannot be automated.</strong><br>When an action carries consequence — financial, legal, reputational, human — a person must be accountable for it. Freya prepares. Humans decide and own the outcome. Every Antarious workflow is built around this principle. Not because it is a regulatory requirement (though it often is), but because it is right.</p>
<p><strong>Operational intelligence should be real-time, not retrospective.</strong><br>Most organisations discover problems weeks or months after they begin. By then, the cost is already paid. Freya monitors continuously, surfaces anomalies early, and gets the right information to the right people while there is still time to act. The intelligence that matters is the intelligence that arrives before it is needed.</p>
<p><strong>Institutional knowledge should outlast individuals.</strong><br>Every time a key person leaves an organisation, a piece of its operating knowledge leaves with them. This is one of the most persistent and underestimated problems in complex organisations. Freya retains everything — every decision, every precedent, every piece of context — and makes it accessible to everyone who needs it, regardless of staff changes.</p>
<p><strong>Transparency is not optional in high-stakes environments.</strong><br>Freya shows her work. Every recommendation includes its reasoning, its sources, and its assumptions. Every action is preceded by a human-readable explanation of what Freya is proposing and why. In environments where decisions carry consequence, black boxes are not acceptable.</p>
</section>
<section class="doc-section" id="section-03">
<h2>Section 03 — What We Build</h2>
<h3>The Antarious Platform</h3>
<p>At the centre of Antarious is <strong>Freya</strong> — an autonomous AI agent that operates as the persistent intelligence layer for your organisation.</p>
<p>Freya is not a chatbot. She does not wait to be asked. She monitors your operations continuously, proactively surfaces problems and opportunities, executes complex multi-step workflows, and builds an ever-growing institutional memory of everything your organisation knows and has decided.</p>
<p>Freya is powered by a network of up to 13 specialist agents — each focused on a specific operational function — that share context, collaborate on complex tasks, and pass work between each other without human coordination overhead. The result is an operating system, not a tool: a persistent, autonomous, learning intelligence layer that becomes more capable and more contextually aware with every day of operation.</p>
<p><strong>For enterprise and GTM teams:</strong> Freya replaces a fragmented 17-tool stack with a single connected platform — automating campaign strategy, lead generation, content production, outreach execution, attribution analysis, and performance reporting.</p>
<p><strong>For government departments:</strong> Freya provides a connected intelligence layer across siloed departmental systems — automating policy briefs, service delivery monitoring, compliance tracking, inter-departmental coordination, and public communications.</p>
<p><strong>For NGO and development organisations:</strong> Freya automates M&amp;E reporting, partner data aggregation, beneficiary tracking, donor compliance documentation, and programme forecasting — giving programme officers back the time to do the work that actually matters in the field.</p>
</section>
<section class="doc-section" id="section-04">
<h2>Section 04 — Why We Built This</h2>
<h3>The Problem We Are Solving</h3>
<p>The organisations that Antarious serves — enterprises running complex go-to-market operations, government departments implementing policy at scale, NGOs delivering programmes across distributed partner networks — share a common problem.</p>
<p>They have more data than they can process. More workflows than their teams can manage. More reporting obligations than they can fulfil without consuming the time that should be going to their actual work. And they have AI tools that promise to help — chatbots, copilots, point solutions — that require constant human instruction to function and produce outputs that still require hours of human work to be useful.</p>
<p>The teams running these operations are not failing because they lack talent or dedication. They are failing because the operational infrastructure available to them is not built for the complexity and scale of what they are trying to do. Manual processes that made sense at smaller scale have become structural bottlenecks. Fragmented tools that work in isolation create friction at every handoff. And the AI tools built to help have largely added a new interface to the same underlying problem.</p>
<p>Antarious is a different answer. Not a better chatbot. Not a smarter copilot. An operating system — something that runs your operations continuously, autonomously, and accountably, the way the best-run organisations in the world deserve to run.</p>
</section>
<section class="doc-section" id="section-05">
<h2>Section 05 — How We Work</h2>
<h3>Our Approach to Deployment</h3>
<p>Every Antarious deployment is different — because every organisation is different. We do not sell a standard SaaS subscription and leave customers to figure out configuration on their own.</p>
<p>Antarious deployments are built through a structured engagement process:</p>
<p><strong>Discovery and mapping</strong><br>We work with your operations, governance, and technology leads to map your data sources, operational workflows, authority structures, and reporting obligations. This becomes the blueprint for your deployment.</p>
<p><strong>Configuration and integration</strong><br>Your Antarious deployment is configured to your organisation&#39;s specific structures — connecting your systems, mapping your roles and approval workflows, training agents on your operational context, and building the institutional knowledge base that Freya will grow from.</p>
<p><strong>Deployment and handover</strong><br>Your team is onboarded with training, documentation, and hands-on support. We do not consider a deployment complete until your team is operating Antarious with confidence and your governance structures are fully reflected in the system.</p>
<p><strong>Ongoing support and development</strong><br>Antarious is an operating system — it becomes more capable and more contextually aware over time. We work with customers on an ongoing basis to expand capabilities, add integrations, and configure new workflows as their operational needs evolve.</p>
</section>
<section class="doc-section" id="section-06">
<h2>Section 06 — The Sectors We Serve</h2>
<h3>Built for High-Stakes Operational Environments</h3>
<p><strong>Enterprise and GTM</strong><br>Antarious replaces fragmented go-to-market infrastructure with a single AI-native platform. From strategy to closed deal — all connected, all automated, all accountable.<br><span class="disabled-link">Learn more about Antarious for Business →</span></p>
<p><strong>Government</strong><br>Antarious gives government departments a connected intelligence layer that operates across siloed systems, automates high-volume administrative functions, and surfaces the intelligence that policy decisions require.<br><span class="disabled-link">Learn more about Antarious for Government →</span></p>
<p><strong>NGO and Development</strong><br>Antarious gives development organisations the operational infrastructure to deliver more programme impact with fewer administrative resources — without compromising the human accountability that donors, regulators, and communities require.<br><span class="disabled-link">Learn more about Antarious for NGO →</span></p>
</section>
<section class="doc-section" id="section-07">
<h2>Section 07 — Our Commitment to Trust</h2>
<h3>The Four Principles We Are Accountable To</h3>
<p>Antarious is an AI company operating in environments where trust is not a brand value — it is an operational requirement. Our commitments are specific and verifiable:</p>
<p><strong>Human approval on every action</strong><br>No external action is taken without explicit human authorisation. This is an architectural constraint, not a configurable option.<br><a href="/trust/human-approval">Human Approval →</a></p>
<p><strong>A complete audit trail on everything</strong><br>Every decision, every approval, every output, every exception — recorded permanently and retrievably for as long as you need it.<br><a href="/trust/audit-trail">Audit Trail →</a></p>
<p><strong>Role-based access and authority</strong><br>Every user&#39;s access and approval authority reflects their actual role and responsibility in your organisation — nothing more.<br><a href="/trust/role-based-control">Role-Based Control →</a></p>
<p><strong>Security built for sensitive environments</strong><br>Enterprise-grade data protection, infrastructure security, and incident response — designed for environments where a breach carries real consequences.<br><a href="/trust/security">Security →</a></p>
</section>
<section class="doc-section" id="section-08">
<h2>Section 08 — Contact and Engagement</h2>
<h3>How to Reach Antarious</h3>
<p><strong>Sales and product enquiries</strong><br>For product walkthroughs, deployment planning, and commercial discussions:<br>the Antarious team</p>
<p><strong>Partnerships</strong><br>For delivery, integration, and reseller partnership discussions:<br>the partnerships team</p>
<p><strong>Security and compliance</strong><br>For security documentation requests, due diligence questionnaires, and compliance enquiries:<br>the security team</p>
<p><strong>Legal and policy</strong><br>For legal, contractual, and policy-related matters:<br>the legal team</p>
<p><span class="disabled-link">View full contact details →</span></p>
</section>

      </div>
      <footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="name"><img fetchpriority="high" decoding="async" loading="eager" class="theme-logo-main" src="/assets/logos/antarious-main.svg" alt="Antarious AI"></div>
        <div class="tagline">The Agentic AI Operating System for business, government, and NGO teams.</div>
      </div>
      <div>
        <div class="footer-col-h">Platform</div>
        <ul class="footer-links">
          <li><a class="footer-lnk" href="/#hero">Overview</a></li>
          <li><a class="footer-lnk" href="/freya">Freya</a></li>
          <li><a class="footer-lnk" href="/#usecases">Workflows</a></li>
          <li><a class="footer-lnk" href="/#comparison">Trust</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-h">Modules</div>
        <ul class="footer-links">
          <li><a class="footer-lnk" href="/business">For Business</a></li>
          <li><a class="footer-lnk" href="/government">For Government</a></li>
          <li><a class="footer-lnk" href="/ngo">For NGO</a></li>
          <li><a class="footer-lnk" href="/freya">Cross-Industry Freya</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-h">Trust</div>
        <ul class="footer-links">
          <li class="footer-link-item"><a class="footer-lnk" href="/trust/human-approval">Human Approval</a><span class="footer-link-desc">How approvals remain with designated human owners.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/trust/audit-trail">Audit Trail</a><span class="footer-link-desc">End-to-end logging of actions, context, and decisions.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/trust/role-based-control">Role-Based Control</a><span class="footer-link-desc">Access boundaries and permissions by role and function.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/trust/security">Security</a><span class="footer-link-desc">Controls, safeguards, and deployment security posture.</span></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-h">Company</div>
        <ul class="footer-links">
          <li class="footer-link-item"><a class="footer-lnk" href="/company/about">About</a><span class="footer-link-desc">Who we are and what we are building.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/company/contact">Contact</a><span class="footer-link-desc">How to reach sales, support, and partnerships.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/company/partnerships">Partnerships</a><span class="footer-link-desc">Collaboration models for delivery and integration partners.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/company/legal">Legal</a><span class="footer-link-desc">Policy, terms, and governance-related notices.</span></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-h">Resources</div>
        <ul class="footer-links">
          <li class="footer-link-item"><a class="footer-lnk" href="/resources/documentation">Documentation</a><span class="footer-link-desc">API reference, SDKs, and integration guides.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/resources/help-center">Help Centre</a><span class="footer-link-desc">FAQs, guides, and 24/7 support resources.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/faq/comprehensive">FAQ</a><span class="footer-link-desc">Answers on deployment, governance, integrations, and Freya.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/resources/webinars">Webinars</a><span class="footer-link-desc">Live training and on-demand learning sessions.</span></li>
          <li class="footer-link-item"><a class="footer-lnk" href="/resources/partner-programme">Partner Programme</a><span class="footer-link-desc">Reseller and integration partnership opportunities.</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">(c) 2026 Antarious. All rights reserved.</div>
      <div class="footer-badges"><span class="footer-badge">HUMAN-IN-THE-LOOP</span><span class="footer-badge">AUDITABLE AI</span><span class="footer-badge">CROSS-INDUSTRY</span><span class="footer-badge">PREMIUM DEPLOYMENT</span></div>
    </div>
  </div>
</footer>
    </main>
  </div>
<script id="antarious-nav-active">
(function () {
  var file = (window.location.pathname.split('/').pop() || '/').toLowerCase();

  var map = {
    '/business': 'For Business',
    '/government': 'For Government',
    '/ngo': 'For NGO'
  };

  var targetLabel = map[file] || null;
  var navButtons = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navButtons.length; i++) {
    var btn = navButtons[i];
    var text = (btn.textContent || '').trim();
    if (targetLabel && text === targetLabel) {
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
    }
  }

  var freyaBtn = document.querySelector('.nav-ghost');
  if (freyaBtn) {
    var isFreya = file === '/freya';
    freyaBtn.classList.toggle('active', isFreya);
    if (isFreya) {
      freyaBtn.setAttribute('aria-current', 'page');
    } else {
      freyaBtn.removeAttribute('aria-current');
    }
  }
})();
</script>
<script id="antarious-nav-sync-script">
(function(){
  var nav = document.getElementById('nav');
  if(!nav) return;
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 60); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
</script>
</body>
</html>
`;

export default html;
