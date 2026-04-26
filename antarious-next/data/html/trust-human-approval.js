const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Human Approval | Antarious</title>
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
        <div class="eyebrow">Trust Architecture</div>
        <h1>Human Approval</h1>
        <p class="tagline">Every action Freya takes requires a designated human to authorise it. Not as a safeguard. As a structural requirement.</p>
        <p class="support">Antarious AI is built on a single non-negotiable principle: artificial intelligence executes. Humans decide. No external action — no communication sent, no workflow triggered, no document published, no data submitted — is initiated without explicit sign-off from an authorised person in your organisation.</p>
      </header>
      <div class="doc">
<section class="doc-section" id="section-01">
<h2>Section 01 — The Principle</h2>
<h3>Why Human Approval Is Structural, Not Optional</h3>
<p>Most AI systems describe human oversight as a feature. In Antarious, it is an architectural constraint — baked into every agent, every workflow, and every output that Freya produces.</p>
<p>Freya is designed to do two things exceptionally well: prepare, and present. She monitors your operations, synthesises your data, drafts your documents, and surfaces your decisions — with full context, cited sources, and a clear recommendation. But she does not act on any of it until a designated human says so.</p>
<p>This is not a limitation of the technology. It is a deliberate design position, rooted in three convictions:</p>
<p>1. <strong>Accountability cannot be delegated to software.</strong> In enterprise, government, and development contexts, decisions carry consequences — legal, financial, reputational, and human. Accountability must remain with the people whose names, roles, and judgement are behind every outcome.</p>
<p>2. <strong>Context that AI cannot access always exists.</strong> Freya has access to your data. She does not have access to your relationships, your political environment, your cultural context, or your ethical judgement. Humans do. Approval is the point where that knowledge enters every decision.</p>
<p>3. <strong>Trust requires verifiability.</strong> Stakeholders — donors, regulators, ministers, boards, clients — need to know that a human was responsible for every significant action. The approval record is that proof.</p>
</section>
<section class="doc-section" id="section-02">
<h2>Section 02 — How It Works</h2>
<h3>The Approval Architecture</h3>
<p>Every workflow in Antarious is built around an <strong>Approve Before Execute</strong> model. Freya completes her preparation — analysis, drafting, enrichment, synthesis — and then halts. Execution does not resume until an authorised approver acts.</p>
<h3>The Four-Stage Approval Flow</h3>
<pre class="search-mock" style="white-space:pre-wrap;margin-top:0">STAGE 1 — FREYA PREPARES
Freya completes the task: draft, analysis, outreach sequence,
report, alert, or action recommendation. Full context assembled.

STAGE 2 — REVIEW PACKAGE DELIVERED
Approver receives a structured review package containing:
  &#183; The proposed action or output
  &#183; The data sources and reasoning behind it
  &#183; Any flagged risks or anomalies
  &#183; Recommended next steps
  &#183; Approval options

STAGE 3 — HUMAN DECISION POINT
The designated approver reviews and chooses:
  &#183; Approve — Freya executes exactly as prepared
  &#183; Approve with edits — Approver modifies, Freya executes the revised version
  &#183; Request revision — Freya re-drafts with new instructions
  &#183; Reject — Action is cancelled and logged with reason

STAGE 4 — EXECUTION + AUDIT RECORD
If approved, Freya executes. The approval decision, approver identity,
timestamp, and any edits are permanently recorded in the audit trail.</pre>
</section>
<section class="doc-section" id="section-03">
<h2>Section 03 — Scope of Approval Requirements</h2>
<h3>What Requires Human Approval</h3>
<p>The following categories of action require explicit human authorisation before Freya proceeds. This list reflects defaults; organisations may expand approval requirements through configuration.</p>
<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px">
<thead><tr>
<th style="text-align:left;padding:10px;border:1px solid rgba(15,23,42,.12);background:#F8FBFF">Action Category</th>
<th style="text-align:left;padding:10px;border:1px solid rgba(15,23,42,.12);background:#F8FBFF">Examples</th>
<th style="text-align:left;padding:10px;border:1px solid rgba(15,23,42,.12);background:#F8FBFF">Default Approver Level</th>
</tr></thead>
<tbody>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>External Communications</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Emails sent, messages delivered, press releases published, citizen-facing updates</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Designated officer / team lead</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Document Publication</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Donor reports submitted, board papers circulated, policy briefs shared</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Senior officer / director</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Data Submission</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Form submissions to external systems, API pushes to partner platforms</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Operations lead</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Financial Actions</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Budget reallocation recommendations acted upon, procurement triggers</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Finance authority</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Campaign Execution</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Ad campaigns activated, outreach sequences launched, content published</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Marketing lead</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Compliance Filings</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Regulatory submissions, audit evidence submitted, disclosure documents</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Compliance officer</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Escalations</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Risk alerts escalated to leadership, corrective memos sent to partners</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Designated escalation officer</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>System Changes</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">New integrations activated, workflow configurations updated</td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">System administrator</td>
</tr>
</tbody></table></div>
<h3>What Freya Does Without Approval</h3>
<p>The following internal operations run autonomously by design — they are monitoring, preparation, and intelligence functions that carry no external consequence and require no approval:</p>
<ul>
<li>Continuous data ingestion and processing from connected sources</li>
<li>Internal dashboard updates and KPI calculations</li>
<li>Draft preparation and document generation (prior to review)</li>
<li>Anomaly detection and internal alert generation</li>
<li>Institutional memory updates and context retention</li>
<li>Scheduled report drafting (delivered for review, not published)</li>
</ul>
</section>
<section class="doc-section" id="section-04">
<h2>Section 04 — Configuring Approval Workflows</h2>
<h3>Approval Is Configurable to Your Governance Structure</h3>
<p>Antarious does not impose a single approval model. Every deployment is configured to reflect the authority structures, escalation paths, and governance requirements of your organisation.</p>
<h3>Configuration Options</h3>
<p><strong>Single-approver workflows</strong><br>One designated person reviews and approves. Suitable for lower-stakes actions or organisations with streamlined governance.</p>
<p><strong>Sequential multi-approver workflows</strong><br>Approval passes through a defined chain — for example, team lead → department head → director — before execution. Each approver sees the previous approver&#39;s comments and decision.</p>
<p><strong>Parallel approval workflows</strong><br>Multiple approvers review simultaneously. Execution triggers when a quorum or unanimous agreement is reached. Suitable for actions requiring cross-functional sign-off.</p>
<p><strong>Conditional approval routing</strong><br>Approval routing is determined by the nature of the action. A social media post routes to the Communications Lead; a budget reallocation routes to the Finance Director. Rules are configured at deployment and can be updated at any time.</p>
<p><strong>Delegated approval</strong><br>Approvers can delegate authority to a named deputy for a defined period — for example, during leave — without removing the approval requirement from the workflow.</p>
<p><strong>Approval thresholds</strong><br>Certain actions may require escalation based on scale. For example: campaign spends below &#163;5,000 require team lead approval; above &#163;5,000 require director approval. Thresholds are configurable.</p>
</section>
<section class="doc-section" id="section-05">
<h2>Section 05 — The Approval Interface</h2>
<h3>How Approvers Experience the Review Process</h3>
<p>Approvals are delivered to designated approvers through their configured channels — this may include the Antarious platform, email notification, or integrated communication tools such as Slack or Microsoft Teams.</p>
<p>Each approval request contains:</p>
<p><strong>1. Action Summary</strong><br>A plain-language description of what Freya is proposing to do and why.</p>
<p><strong>2. Supporting Context</strong><br>The data, analysis, or reasoning that informed the recommendation. Sources are cited. Assumptions are stated.</p>
<p><strong>3. Proposed Output</strong><br>The exact content that will be executed — the email text, the report draft, the outreach sequence, the compliance filing — presented for review before anything is sent.</p>
<p><strong>4. Risk Flags</strong><br>Any anomalies, conflicts, or uncertainties Freya has detected that the approver should be aware of before deciding.</p>
<p><strong>5. Decision Options</strong><br>Approve / Approve with edits / Request revision / Reject — with a free-text field for instructions or reasoning.</p>
<p><strong>6. Deadline Indicator</strong><br>Where the action is time-sensitive, the approver is shown the window within which a decision is needed and what will happen if no decision is made (default: action is held, not auto-executed).</p>
</section>
<section class="doc-section" id="section-06">
<h2>Section 06 — What Happens Without Approval</h2>
<h3>Non-Approval Handling</h3>
<p>Antarious is designed to hold, not auto-execute, in the absence of a human decision.</p>
<ul>
<li><strong>No response from approver:</strong> The action remains in a pending state. Freya sends a reminder after a configurable interval (default: 24 hours). If a deadline is critical, Freya escalates to a secondary approver if one is configured.</li>
<li><strong>Rejection:</strong> The action is cancelled. The rejection reason is logged. Freya does not retry unless instructed to re-draft and re-submit.</li>
<li><strong>Approver unavailable:</strong> If delegation is configured, approval routes to the delegated deputy. If not, the action holds until the approver is available or an administrator manually reassigns.</li>
<li><strong>System failure during approval:</strong> If a technical failure interrupts the approval process, the action does not proceed. The system logs the failure and notifies administrators.</li>
</ul>
<p class="callout-line"><strong>Under no circumstances does Freya self-approve an action or proceed on the assumption of approval.</strong></p>
</section>
<section class="doc-section" id="section-07">
<h2>Section 07 — Accountability Records</h2>
<h3>Every Approval Is Permanently Recorded</h3>
<p>The approval record for every action is stored permanently in the audit trail and contains:</p>
<ul>
<li><strong>Who approved</strong> — Full name, role, and user ID of the approver</li>
<li><strong>When they approved</strong> — Timestamp to the second (UTC)</li>
<li><strong>What they approved</strong> — The exact version of the output or action at the point of approval</li>
<li><strong>Any edits made</strong> — A tracked diff of changes made by the approver before authorising</li>
<li><strong>Their stated reasoning</strong> — Any commentary or instructions entered during review</li>
<li><strong>The outcome</strong> — Whether the action was executed, revised, or rejected</li>
</ul>
<p>This record cannot be altered or deleted after the fact. It is available for internal review, external audit, regulatory inspection, or legal disclosure at any time.</p>
</section>
<section class="doc-section" id="section-08">
<h2>Section 08 — Compliance &amp; Regulatory Relevance</h2>
<h3>Human Approval as a Compliance Mechanism</h3>
<p>For organisations operating in regulated environments, the Antarious human approval architecture provides direct support for compliance obligations across multiple frameworks.</p>
<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px">
<thead><tr>
<th style="text-align:left;padding:10px;border:1px solid rgba(15,23,42,.12);background:#F8FBFF">Regulatory / Framework Context</th>
<th style="text-align:left;padding:10px;border:1px solid rgba(15,23,42,.12);background:#F8FBFF">How Human Approval Supports Compliance</th>
</tr></thead>
<tbody>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>UK GDPR / EU GDPR</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Human review of any automated decision with legal or significant effect on individuals — Article 22 compliant by design</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>ISO 27001</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Documented access control and change management processes supported by approval workflows</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Public Finance regulations</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Full approval chain for any action with financial consequence; audit evidence auto-compiled</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Donor compliance (World Bank, USAID, DFID)</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Human authorisation of all external submissions and communications; approval chain available for review missions</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>Government accountability frameworks</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Named officer accountable for every approved action; full ministerial/directorate audit trail available</td>
</tr>
<tr>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top"><strong>AI Act (EU) — High Risk AI Systems</strong></td>
<td style="padding:10px;border:1px solid rgba(15,23,42,.12);vertical-align:top">Human oversight provisions met through mandatory approval gate on all consequential outputs</td>
</tr>
</tbody></table></div>
<p class="search-mock" style="margin-top:0">**Note:** Antarious does not provide legal advice. Organisations should confirm compliance mapping with their own legal and compliance counsel. The above reflects how the human approval architecture is designed to support — not substitute for — compliance obligations.</p>
</section>
<section class="doc-section" id="section-09">
<h2>Section 09 — Frequently Asked Questions</h2>
<p><strong>Q: Can approval be turned off for certain workflows to increase speed?</strong><br>A: Approval requirements for external actions cannot be disabled — this is a platform-level constraint. However, approval workflows can be streamlined: single-click approval for lower-risk actions, pre-approved template libraries, and delegated authority all reduce friction without removing the human decision point.</p>
<p><strong>Q: What if our organisation needs approvals from multiple people in different locations or time zones?</strong><br>A: Antarious supports asynchronous approval workflows. Approvers receive notifications through configured channels and can act from any location. Parallel and sequential workflows can be combined to accommodate distributed teams.</p>
<p><strong>Q: How long does an approval typically take?</strong><br>A: Freya prepares review packages that are designed to be actioned in under five minutes for routine approvals. The review package surfaces everything the approver needs to decide — no additional research is required from the approver.</p>
<p><strong>Q: Who configures approval workflows?</strong><br>A: Approval workflow configuration is completed during deployment by Antarious&#39;s implementation team, in consultation with your governance and operations leads. Workflows can be updated post-deployment by designated system administrators.</p>
<p><strong>Q: Is there a mobile interface for approvals?</strong><br>A: Yes. Approvers can review and action approval requests from any device. Email-based approval is also supported for organisations where platform access is not always available.</p>
<p><strong>Q: What happens if the approver approves something incorrectly?</strong><br>A: The audit trail records the approval with full context. Freya cannot retroactively undo an approved action, but the record of what was approved, by whom, and on what basis is permanently available. Post-approval rollback procedures depend on the action type and are configured during deployment.</p>
</section>
<section class="doc-section" id="section-10">
<h2>Section 10 — Related Trust Pages</h2>
<ul>
<li><a href="/trust/audit-trail">Audit Trail →</a> — How every approval and action is permanently logged</li>
<li><a href="/trust/role-based-control">Role-Based Control →</a> — How approval authority is assigned and bounded by role</li>
<li><a href="/trust/security">Security →</a> — How approval data is protected and access is controlled</li>
</ul>
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
