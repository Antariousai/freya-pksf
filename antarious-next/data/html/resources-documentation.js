const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Antarious Documentation | Antarious</title>
<meta name="description" content="Everything you need to understand, deploy, configure, and operate Antarious AI — organised by role, by topic, and by the depth of detail you need.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
<style>
/* ─── RESET ─────────────────────────────────────── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:15px}
body{font-family:'Inter',sans-serif;background:#F7F6F2;color:#1A1A2E;line-height:1.7;overflow-x:hidden}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#2EC4B6;border-radius:3px}
img{max-width:100%;display:block}
a{text-decoration:none;color:inherit}

/* ─── TOKENS ────────────────────────────────────── */
:root{
  --bg:#F7F6F2; --surface:#FFFFFF; --surface2:#F2F0EB; --surface3:#EAE7E0;
  --border:#E2DED6; --border2:#D0CBC0;
  --ink:#1A1A2E; --ink2:#374151; --ink3:#6B7280; --ink4:#9CA3AF;
  --teal:#2EC4B6; --teal2:#1A9D91; --teal-bg:rgba(46,196,182,0.08); --teal-border:rgba(46,196,182,0.25);
  --gold:#B5874F; --gold2:#D4A855; --gold-bg:rgba(181,135,79,0.08);
  --navy:#0F1829; --navy2:#162038;
  --violet:#7B2D8B; --violet-bg:rgba(123,45,139,0.08);
  --coral:#E04F4F; --coral-bg:rgba(224,79,79,0.08);
  --green:#16A34A; --green-bg:rgba(22,163,74,0.08);
  --amber:#D97706; --amber-bg:rgba(217,119,6,0.08);
  --sky:#0284C7; --sky-bg:rgba(2,132,199,0.08);
  --f-head:'Playfair Display',Georgia,serif;
  --f-body:'Inter',sans-serif;
  --f-mono:'JetBrains Mono',monospace;
  --radius:10px; --radius-lg:16px; --radius-xl:24px;
  --shadow:0 1px 3px rgba(0,0,0,0.06),0 4px 12px rgba(0,0,0,0.04);
  --shadow-lg:0 4px 20px rgba(0,0,0,0.1),0 12px 40px rgba(0,0,0,0.06);
}

/* ─── NAV ──────────────────────────────────────── */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:999;
  height:62px;display:flex;align-items:center;padding:0 48px;gap:24px;
  background:color-mix(in srgb,var(--bg) 92%, transparent);backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(15,23,42,.07);
  transition:all .3s
}
.nav.scrolled{height:54px;box-shadow:0 1px 12px rgba(15,23,42,.06)}
.nav-logo{display:flex;align-items:center;gap:9px;cursor:pointer;flex-shrink:0}
.theme-logo-main{height:28px;width:auto;display:block}
.nav-logo .theme-logo-main{height:28px}
.footer-brand-img.theme-logo-main,
.name .theme-logo-main{height:28px}
@media (max-width: 768px){
  .theme-logo-main{height:24px}
}
.nav-links{display:flex;list-style:none;gap:2px;margin-left:28px}
.nav-link{
  font-size:13px;font-weight:700;color:var(--ink2);
  padding:8px 16px;border-radius:12px;transition:all .2s;cursor:pointer;
  border:1px solid rgba(14,165,233,.14);background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.02));
  box-shadow:0 4px 14px rgba(15,23,42,.04)
}
.nav-link:hover,.nav-link.active{color:var(--teal2);border-color:rgba(14,165,233,.26);background:linear-gradient(135deg,rgba(14,165,233,.12),rgba(56,189,248,.05));transform:translateY(-1px)}
.nav-right{display:flex;align-items:center;gap:10px;margin-left:auto;flex-shrink:0}
.nav-ghost{
  font-family:var(--f-head);font-size:13px;font-weight:700;color:var(--teal2);
  background:linear-gradient(135deg,rgba(14,165,233,.14),rgba(56,189,248,.08));
  border:1px solid rgba(14,165,233,.24);padding:8px 18px;border-radius:12px;cursor:pointer;
  transition:all .2s;box-shadow:0 8px 22px rgba(14,165,233,.12)
}
.nav-ghost:hover{border-color:rgba(14,165,233,.38);color:var(--teal);transform:translateY(-1px);box-shadow:0 12px 28px rgba(14,165,233,.18)}
.nav-cta{
  font-family:var(--f-head);font-size:13px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--teal),var(--teal2));
  border:none;padding:9px 22px;border-radius:12px;cursor:pointer;transition:all .22s;
  box-shadow:0 6px 18px rgba(14,165,233,.26),0 0 0 1px rgba(14,165,233,.08)
}
.nav-cta:hover{background:linear-gradient(135deg,var(--teal2),#0369A1);transform:translateY(-1px);box-shadow:0 10px 24px rgba(14,165,233,.34)}

/* ─── LAYOUT ──────────────────────────────────── */
.page{max-width:1180px;margin:0 auto;padding:0 40px}
section{padding:64px 0}
.sec-alt{background:#fff}
.sec-dark{background:var(--navy);color:#fff}

/* ─── HERO ─────────────────────────────────────── */
.hero{background:linear-gradient(135deg,#0F1829 0%,#162038 60%,#0F2A2A 100%);padding:84px 0 72px;position:relative;overflow:hidden}
.hero-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(46,196,182,0.10) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
.hero-glow{position:absolute;top:-200px;right:-80px;width:680px;height:680px;background:radial-gradient(circle,rgba(46,196,182,.12) 0%,transparent 65%);pointer-events:none}
.hero-glow2{position:absolute;bottom:-80px;left:-80px;width:520px;height:520px;background:radial-gradient(circle,rgba(181,135,79,.08) 0%,transparent 65%);pointer-events:none}
.hero-inner{position:relative;z-index:2}
.hero-kicker{display:inline-flex;align-items:center;gap:10px;font-family:var(--f-mono);font-size:9.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--teal);margin-bottom:18px}
.hero-kicker::before{content:'';width:24px;height:1px;background:var(--teal);display:inline-block}
.hero-title{font-family:var(--f-head);font-size:clamp(40px,5.6vw,72px);font-weight:900;color:#fff;line-height:1.02;letter-spacing:-1.5px;margin-bottom:18px;max-width:920px}
.hero-title em{color:var(--teal);font-style:italic}
.hero-desc{font-size:17px;color:rgba(255,255,255,.68);line-height:1.7;max-width:680px;margin-bottom:30px}
.hero-tagline{margin:18px 0 6px;font-family:var(--f-mono);font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--gold2);transition:opacity .25s ease,color .25s ease;min-height:18px}
.hero-stats{display:flex;gap:44px;margin-top:40px;flex-wrap:wrap;padding-top:28px;border-top:1px solid rgba(255,255,255,.08)}
.hs-val{font-family:var(--f-head);font-size:34px;font-weight:900;color:var(--teal);line-height:1}
.hs-label{font-size:11px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:4px}

/* ─── TOOLBAR (enhancement) ───────────────────── */
.toolbar{background:#fff;border-bottom:1px solid var(--border);padding:16px 0;position:sticky;top:58px;z-index:200;backdrop-filter:blur(16px)}
.toolbar-inner{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.search-box{flex:1;min-width:260px;position:relative}
.search-box input{width:100%;padding:11px 16px 11px 40px;border:1px solid var(--border);border-radius:8px;font-family:var(--f-body);font-size:13px;color:var(--ink);background:var(--surface2);transition:all .18s}
.search-box input:focus{outline:none;border-color:var(--teal);background:#fff;box-shadow:0 0 0 3px var(--teal-bg)}
.search-box::before{content:'⌕';position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;color:var(--ink4)}
.filter-pills{display:flex;gap:6px;flex-wrap:wrap}
.fp{font-family:var(--f-mono);font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;padding:7px 12px;border-radius:20px;background:var(--surface2);color:var(--ink3);border:1px solid var(--border);cursor:pointer;transition:all .18s}
.fp:hover{border-color:var(--teal-border);color:var(--teal2)}
.fp.active{background:var(--teal);color:#fff;border-color:var(--teal)}
.toolbar-actions{display:flex;gap:8px}
.tb-btn{font-size:11px;font-weight:600;color:var(--ink2);padding:7px 12px;border-radius:7px;border:1px solid var(--border);background:#fff;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;gap:6px}
.tb-btn:hover{border-color:var(--teal-border);color:var(--teal2)}

/* ─── READING PROGRESS BAR (enhancement) ───── */
.progress-bar{position:fixed;top:0;left:0;right:0;height:3px;background:transparent;z-index:500;pointer-events:none}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--teal),var(--gold2));width:0%;transition:width .15s linear}

/* ─── SECTION HEADERS ──────────────────────────── */
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--f-mono);font-size:9.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--teal2);margin-bottom:10px}
.eyebrow::before{content:'';width:18px;height:1px;background:var(--teal2)}
.sec-title{font-family:var(--f-head);font-size:clamp(30px,3.5vw,48px);font-weight:900;color:var(--navy);line-height:1.1;margin-bottom:14px;letter-spacing:-.8px}
.sec-title em{color:var(--teal2);font-style:italic}
.sec-lead{font-size:16px;color:var(--ink2);max-width:720px;line-height:1.75;margin-bottom:40px}
.sec-sub{font-family:var(--f-head);font-size:24px;font-weight:800;color:var(--navy);margin:36px 0 14px;letter-spacing:-.3px}
.sec-sub-mono{font-family:var(--f-mono);font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin:44px 0 10px}

/* ─── DOC CARD (main content unit) ─────────── */
.doc{background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);margin-bottom:16px;overflow:hidden;transition:all .22s}
.doc:hover{border-color:var(--teal-border);box-shadow:0 6px 24px rgba(46,196,182,.06)}
.doc-head{padding:22px 28px;cursor:pointer;display:grid;grid-template-columns:1fr auto;gap:14px;align-items:start}
.doc-meta{display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap}
.doc-num{font-family:var(--f-mono);font-size:9.5px;font-weight:700;letter-spacing:1.5px;color:var(--teal2);background:var(--teal-bg);padding:3px 9px;border-radius:4px;text-transform:uppercase}
.doc-audience{font-family:var(--f-mono);font-size:9.5px;font-weight:600;color:var(--ink4);letter-spacing:.5px;text-transform:uppercase}
.doc-time{font-family:var(--f-mono);font-size:9.5px;font-weight:600;color:var(--gold);background:var(--gold-bg);padding:3px 8px;border-radius:4px}
.doc-title{font-family:var(--f-head);font-size:19px;font-weight:800;color:var(--navy);line-height:1.3;margin-bottom:6px;letter-spacing:-.2px}
.doc-blurb{font-size:13.5px;color:var(--ink2);line-height:1.65;margin-bottom:10px}
.doc-toggle{align-self:center;flex-shrink:0;font-size:12px;font-weight:700;color:var(--teal);background:var(--teal-bg);border:1px solid var(--teal-border);padding:8px 14px;border-radius:7px;letter-spacing:.4px;transition:all .18s;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px}
.doc-toggle:hover{background:var(--teal);color:#fff}
.doc-toggle .tgl-ico{transition:transform .3s}
.doc.open .doc-toggle{background:var(--navy);color:#fff;border-color:var(--navy)}
.doc.open .doc-toggle .tgl-ico{transform:rotate(180deg)}
.doc-body{max-height:0;overflow:hidden;transition:max-height .45s ease;background:linear-gradient(180deg,#FBFAF7 0%,#fff 60%)}
.doc.open .doc-body{max-height:20000px}
.doc-body-inner{padding:14px 36px 36px;border-top:1px solid var(--border)}
.doc-body h3{font-family:var(--f-head);font-size:21px;font-weight:800;color:var(--navy);margin:26px 0 10px;letter-spacing:-.2px}
.doc-body h4{font-size:14px;font-weight:700;color:var(--navy);margin:22px 0 6px;letter-spacing:.1px}
.doc-body p{font-size:14.5px;color:var(--ink2);line-height:1.8;margin-bottom:14px}
.doc-body ul,.doc-body ol{margin:6px 0 16px 22px}
.doc-body li{font-size:14.5px;color:var(--ink2);line-height:1.75;margin-bottom:6px}
.doc-body strong{color:var(--navy);font-weight:700}
.doc-body em{color:var(--ink);font-style:italic}
.doc-body code{font-family:var(--f-mono);font-size:12.5px;background:var(--surface2);padding:2px 6px;border-radius:4px;color:var(--navy)}
.doc-body table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}
.doc-body th{background:var(--navy);color:var(--teal);font-family:var(--f-mono);font-size:9.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:10px 14px;text-align:left;border:1px solid rgba(255,255,255,.05)}
.doc-body td{padding:10px 14px;border-bottom:1px solid var(--border);color:var(--ink2);vertical-align:top;font-size:13px;line-height:1.6}
.doc-body tr:nth-child(even) td{background:var(--surface2)}
.doc-body hr{border:none;border-top:1px solid var(--border);margin:22px 0}
.doc-tip{background:var(--teal-bg);border-left:3px solid var(--teal);padding:14px 18px;border-radius:6px;margin:14px 0;font-size:13.5px;color:var(--ink2);line-height:1.7}
.doc-warn{background:var(--amber-bg);border-left:3px solid var(--amber);padding:14px 18px;border-radius:6px;margin:14px 0;font-size:13.5px;color:var(--ink2);line-height:1.7}
.doc-info{background:var(--sky-bg);border-left:3px solid var(--sky);padding:14px 18px;border-radius:6px;margin:14px 0;font-size:13.5px;color:var(--ink2);line-height:1.7}
.doc-foot{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:28px;padding-top:18px;border-top:1px solid var(--border);flex-wrap:wrap}
.doc-helpful{display:flex;align-items:center;gap:10px;font-size:12.5px;color:var(--ink3)}
.doc-helpful button{font-size:11px;font-weight:600;padding:5px 10px;border-radius:6px;border:1px solid var(--border);background:#fff;color:var(--ink2);cursor:pointer;transition:all .18s}
.doc-helpful button:hover{border-color:var(--teal-border);color:var(--teal2)}
.doc-nav-links{display:flex;gap:10px;font-size:11.5px;font-weight:600;color:var(--ink3);flex-wrap:wrap}
.doc-nav-links a{color:var(--teal2);border-bottom:1px dashed rgba(46,196,182,.4)}
.doc-nav-links a:hover{color:var(--navy)}

/* ─── VISUAL COMPONENTS ──────────────────────── */
/* 3-layer architecture */
.vz-arch{background:var(--navy);border-radius:var(--radius-lg);padding:32px;margin:22px 0}
.vz-arch-layer{border-radius:var(--radius);padding:18px 20px;margin-bottom:10px}
.vz-arch-layer:last-child{margin-bottom:0}
.vz-lbl{font-family:var(--f-mono);font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;opacity:.8}
.vz-items{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.vz-item{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);border-radius:8px;padding:10px 7px;text-align:center;color:#fff}
.vz-item-icon{font-size:14px;margin-bottom:4px}
.vz-item-name{font-size:9.5px;font-weight:700;line-height:1.3}
.vz-div{text-align:center;color:var(--teal);font-size:16px;opacity:.55;margin:4px 0}
.vz-arch-note{text-align:center;font-family:var(--f-mono);font-size:9.5px;color:rgba(255,255,255,.32);margin-top:10px;letter-spacing:.3px}
.vz-L1{background:rgba(181,135,79,.14);border:1px solid rgba(181,135,79,.3)}
.vz-L1 .vz-lbl{color:var(--gold2)}
.vz-L2{background:rgba(46,196,182,.14);border:1px solid rgba(46,196,182,.3)}
.vz-L2 .vz-lbl{color:var(--teal)}
.vz-L3{background:rgba(2,132,199,.14);border:1px solid rgba(2,132,199,.3)}
.vz-L3 .vz-lbl{color:#5DB4E7}

/* Freya loop */
.vz-loop{background:var(--navy);border-radius:var(--radius-lg);padding:26px 22px;margin:22px 0}
.vz-loop-row{display:flex;gap:4px;overflow-x:auto}
.vz-loop-step{flex:1;min-width:120px;text-align:center;padding:16px 10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:var(--radius)}
.vz-loop-step.active{background:rgba(46,196,182,.12);border-color:var(--teal-border)}
.vz-loop-ico{font-size:20px;margin-bottom:6px}
.vz-loop-n{font-size:10px;font-weight:800;color:#fff;letter-spacing:.5px;text-transform:uppercase;margin-bottom:3px}
.vz-loop-d{font-size:10.5px;color:rgba(255,255,255,.5);line-height:1.45}
.vz-loop-arr{display:flex;align-items:center;color:var(--teal);font-size:18px;opacity:.5;flex-shrink:0}

/* Agent grid */
.vz-agents{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0}
.vz-a{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:18px;border-top:3px solid}
.vz-a-num{font-family:var(--f-mono);font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px}
.vz-a-ico{font-size:20px;margin-bottom:6px}
.vz-a-t{font-family:var(--f-head);font-size:15px;font-weight:800;color:var(--navy);margin-bottom:5px;letter-spacing:-.1px}
.vz-a-b{font-size:12px;color:var(--ink2);line-height:1.55}

/* HITL decision table */
.vz-gates{width:100%;border-collapse:collapse;margin:22px 0;font-size:13px;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden}
.vz-gates th{background:var(--navy);color:var(--teal);font-family:var(--f-mono);font-size:9.5px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:11px 14px;text-align:left;border-bottom:1px solid rgba(255,255,255,.05)}
.vz-gates td{padding:11px 14px;border-bottom:1px solid var(--border);color:var(--ink2);vertical-align:middle;font-size:13px}
.vz-gates tr:nth-child(even) td{background:var(--surface2)}
.vz-gates .sev{display:inline-block;font-family:var(--f-mono);font-size:9px;font-weight:700;padding:3px 9px;border-radius:3px;letter-spacing:.8px}
.vz-sev-low{background:var(--green-bg);color:#15803D}
.vz-sev-med{background:var(--amber-bg);color:#B45309}
.vz-sev-high{background:var(--coral-bg);color:#B91C1C}
.vz-sev-crit{background:#FEE2E2;color:#7F1D1D;font-weight:800}

/* Flow diagram (horizontal steps) */
.vz-flow{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:22px;margin:20px 0}
.vz-flow-row{display:flex;align-items:stretch;overflow-x:auto;gap:0}
.vz-flow-step{flex:1;min-width:150px;background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:14px;text-align:left}
.vz-flow-gate{flex:1;min-width:150px;background:#FFF7F7;border:1.5px dashed #FCA5A5;border-radius:var(--radius);padding:14px}
.vz-flow-out{flex:1;min-width:150px;background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:var(--radius);padding:14px}
.vz-flow-num{font-family:var(--f-mono);font-size:8.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;color:var(--ink4)}
.vz-flow-t{font-size:12.5px;font-weight:800;color:var(--navy);margin-bottom:4px;line-height:1.3}
.vz-flow-gate .vz-flow-t{color:#DC2626}
.vz-flow-out .vz-flow-t{color:#15803D}
.vz-flow-b{font-size:11px;color:var(--ink2);line-height:1.5}
.vz-flow-arr{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:20px;color:var(--border2);font-size:16px}

/* Memory stack visual */
.vz-mem{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:22px 0}
.vz-mem-c{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:16px;border-left:3px solid var(--gold)}
.vz-mem-c h5{font-family:var(--f-mono);font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.vz-mem-c p{font-size:12px;color:var(--ink2);line-height:1.55}

/* Split "handles / humans own" */
.vz-split{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:22px 0}
.vz-split-col{border-radius:var(--radius);padding:18px;border:1px solid}
.vz-split-handles{background:rgba(46,196,182,.05);border-color:var(--teal-border)}
.vz-split-humans{background:rgba(224,79,79,.04);border-color:rgba(224,79,79,.2)}
.vz-split-col h5{font-family:var(--f-mono);font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
.vz-split-handles h5{color:var(--teal2)}
.vz-split-humans h5{color:#B91C1C}
.vz-split-col ul{list-style:none;margin:0}
.vz-split-col li{font-size:12.5px;color:var(--ink2);line-height:1.7;padding-left:20px;position:relative;margin-bottom:4px}
.vz-split-handles li::before{content:'●';position:absolute;left:0;color:var(--teal);font-size:10px;top:6px}
.vz-split-humans li::before{content:'●';position:absolute;left:0;color:var(--coral);font-size:10px;top:6px}

/* API-style code block */
.vz-code{background:var(--navy);border-radius:var(--radius);padding:18px 20px;margin:14px 0;overflow-x:auto}
.vz-code pre{font-family:var(--f-mono);font-size:12px;color:#E5E7EB;line-height:1.65;white-space:pre}
.vz-code .cm{color:var(--ink4)}
.vz-code .ck{color:var(--teal)}
.vz-code .cs{color:#FCD34D}
.vz-code .cn{color:#F472B6}

/* Back-to-top (enhancement) */
.to-top{position:fixed;bottom:28px;right:28px;width:44px;height:44px;border-radius:50%;background:var(--navy);color:var(--teal);border:none;font-size:18px;cursor:pointer;box-shadow:var(--shadow-lg);opacity:0;transform:translateY(10px);transition:all .25s;z-index:400}
.to-top.show{opacity:1;transform:translateY(0)}
.to-top:hover{background:var(--teal);color:#fff}

/* TOC sidebar (enhancement) */
.layout-grid{display:grid;grid-template-columns:220px 1fr;gap:44px;align-items:start}
.toc-side{position:sticky;top:140px;max-height:calc(100vh - 160px);overflow-y:auto;padding:18px 14px;border:1px solid var(--border);border-radius:var(--radius-lg);background:#fff}
.toc-side h5{font-family:var(--f-mono);font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.toc-side ul{list-style:none}
.toc-side li{margin-bottom:2px}
.toc-side a{display:block;font-size:12px;font-weight:500;color:var(--ink2);padding:6px 10px;border-radius:6px;transition:all .18s;border-left:2px solid transparent}
.toc-side a:hover{background:var(--teal-bg);color:var(--teal2);border-left-color:var(--teal)}

/* ─── FOOTER ────────────────────────────────── */
footer{background:#F7F6F2;padding:30px 0;border-top:1px solid var(--border);margin-top:44px}
.footer-inner{max-width:1200px;margin:0 auto;padding:0 24px}
.footer-top{display:grid;grid-template-columns:1.4fr repeat(5,1fr);gap:20px;margin-bottom:24px}
.footer-col-h,.footer-title,.footer-head{font-family:var(--f-mono);font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink4);margin-bottom:12px}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:8px;margin:0;padding:0}
.footer-lnk,.footer-links a{font-size:12px;color:var(--ink3);transition:color .18s}
.footer-lnk:hover,.footer-links a:hover{color:var(--teal2)}
.footer-link-desc,.footer-copy{color:var(--ink4)}
.footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--border);flex-wrap:wrap;gap:8px}
.footer-badges{display:flex;gap:8px;flex-wrap:wrap}
.footer-badge{font-family:var(--f-mono);font-size:8.5px;font-weight:700;letter-spacing:1px;color:var(--ink3);background:#fff;border:1px solid var(--border);padding:3px 10px;border-radius:20px}

/* ─── RESPONSIVE ─────────────────────────────── */
@media(max-width:1024px){
  .layout-grid{grid-template-columns:1fr}
  .toc-side{display:none}
  .footer-top{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:860px){
  .page{padding:0 20px}
  section{padding:48px 0}
  .nav{padding:0 20px;gap:24px}
  .toolbar{padding:12px 0;top:58px}
  .doc-head{grid-template-columns:1fr;padding:18px 20px}
  .doc-toggle{justify-self:start}
  .doc-body-inner{padding:14px 22px 26px}
  .vz-items{grid-template-columns:repeat(3,1fr)}
  .vz-agents{grid-template-columns:1fr}
  .vz-mem{grid-template-columns:1fr}
  .vz-split{grid-template-columns:1fr}
  .footer-inner{padding:0 14px}
  .footer-top{grid-template-columns:1fr 1fr}
  .hero-stats{gap:28px}
}
@media(max-width:640px){
  .footer-top{grid-template-columns:1fr}
  .footer-link-desc{display:none}
}

/* Utility */
.hidden{display:none}
.doc.hidden{display:none}
</style>
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

<!-- Reading progress bar (enhancement) -->
<div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>

<!-- Navigation -->
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

<!-- Hero -->
<header class="hero">
  <div class="hero-dots"></div>
  <div class="hero-glow"></div>
  <div class="hero-glow2"></div>
  <div class="page hero-inner">
    <div class="hero-kicker">Resources · Documentation Library · v1.0</div>
    <h1 class="hero-title">Antarious <em>Documentation</em></h1>
    <p class="hero-desc">Everything you need to deploy, configure, and operate the <strong>Agentic AI Operating System</strong> — the platform that coordinates reporting, execution, monitoring, approvals, and institutional memory across business, government, and NGO workflows. Freya does the orchestration; humans keep the judgement. This library is organised by role, topic, and depth of detail.</p>
    <div class="hero-tagline" id="heroTagline">Live Command Layer · Approval-safe routing · Memory that compounds with every decision</div>
    <div class="hero-stats">
      <div><div class="hs-val">6</div><div class="hs-label">Sections</div></div>
      <div><div class="hs-val">46</div><div class="hs-label">Documents</div></div>
      <div><div class="hs-val">31</div><div class="hs-label">Specialist agents</div></div>
      <div><div class="hs-val">100%</div><div class="hs-label">Human approval</div></div>
    </div>
    <div class="hero-cta-row" style="margin-top:30px;display:flex;gap:12px;flex-wrap:wrap">
      <a href="https://antarious.vercel.app/" target="_blank" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--f-mono);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--navy);background:var(--teal);padding:11px 20px;border-radius:8px;transition:all .18s">→ Open the live demo</a>
      <a href="https://antarious.com/" target="_blank" style="display:inline-flex;align-items:center;gap:8px;font-family:var(--f-mono);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--teal);background:transparent;border:1px solid var(--teal-border);padding:11px 20px;border-radius:8px;transition:all .18s">Visit antarious.com</a>
    </div>
  </div>
</header>

<!-- Toolbar (enhancement: search + filter + actions) -->
<div class="toolbar">
  <div class="page toolbar-inner">
    <div class="search-box">
      <input type="search" id="docSearch" placeholder="Search documentation — try &quot;audit trail&quot;, &quot;SSO&quot;, &quot;M&E officer&quot;…" aria-label="Search documentation">
    </div>
    <div class="filter-pills" role="tablist" aria-label="Filter by audience">
      <button class="fp active" data-filter="all">All</button>
      <button class="fp" data-filter="getting-started">Getting Started</button>
      <button class="fp" data-filter="technical">Technical</button>
      <button class="fp" data-filter="business">GTM</button>
      <button class="fp" data-filter="government">Government</button>
      <button class="fp" data-filter="ngo">NGO</button>
      <button class="fp" data-filter="compliance">Trust &amp; Compliance</button>
    </div>
    <div class="toolbar-actions">
      <button class="tb-btn" id="expandAll" title="Expand all documents">⇅ Expand all</button>
      <button class="tb-btn" onclick="window.print()" title="Print documentation">⎙ Print</button>
    </div>
  </div>
</div>

<main>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- SECTION 01 — GETTING STARTED                                -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="sec-01">
  <div class="page">
    <div class="eyebrow">Section 01</div>
    <h2 class="sec-title">Getting <em>Started</em></h2>
    <p class="sec-lead">If you are new to Antarious, the following documents provide the foundations. Read them in order for the clearest introduction to how the platform works, how Freya operates, and how the human-approval and audit architecture protects your organisation.</p>

    <h3 class="sec-sub">Start Here</h3>

    <!-- Doc 1.1 — What is Antarious AI -->
    <article class="doc" data-tags="getting-started business government ngo" id="doc-what-is-antarious">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">01</span>
            <span class="doc-time">4 min read</span>
            <span class="doc-audience">Audience: Everyone</span>
          </div>
          <h3 class="doc-title">What is Antarious AI?</h3>
          <p class="doc-blurb">An introduction to the platform — what Freya is, how the agent architecture works, and how Antarious differs from other AI tools. Start here if you are evaluating the platform or onboarding for the first time.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>Antarious is an AI-native operating platform for organisations that need to run a high volume of knowledge-work at speed, but cannot afford to give up human accountability to do so. At the centre of the platform is <strong>Freya</strong> — a persistent, memory-enabled AI agent who coordinates a team of specialist sub-agents across every function of your organisation. Freya is not a chatbot. She is a strategic operator who observes your data, proposes decisions, waits for a human to approve them, and then executes at machine speed while recording every step in an audit trail.</p>

        <p>The platform was built on a simple thesis: most AI tools either automate too little to be transformative, or too much to be trusted. Antarious rejects that trade-off. The platform is designed so that every external action — every message sent, every budget committed, every policy brief issued, every report filed with a donor or regulator — passes through a configurable human approval gate before it leaves your organisation. Freya does the work. Humans stay accountable.</p>

        <h3>Three commitments, in order</h3>

        <p>Everything in the platform is derived from three commitments that are deliberately stated in priority order.</p>

        <p><strong>01 · AI-First, Not AI-Added.</strong> Antarious was not built by bolting a language model onto an existing SaaS product. The agent architecture, the memory layer, the approval workflows, and the audit trail were designed together, from a blank page, to support autonomous work under human supervision. This matters because it means the platform behaves consistently: the same governance rules apply to a marketing email, a ministerial briefing, and a field-team report.</p>

        <p><strong>02 · Human-in-the-Loop.</strong> Every external action passes through an approval gate. The gate is configurable — low-risk actions can be set to self-authorise, high-risk actions can be set to require multiple approvers — but the gate is always there, and the record of who approved what, and when, is preserved indefinitely. As confidence builds, organisations typically widen Freya's autonomy on specific action types. They almost never remove the approval architecture wholesale.</p>

        <p><strong>03 · Full Transparency.</strong> Every action Freya takes is attributable. Every output she generates shows its sources, its reasoning, and the approval chain that released it. The audit trail is not a forensic feature retrofitted under regulatory pressure — it is the primary output of the platform, and everything else is a consequence of it.</p>

        <div class="doc-tip"><strong>If you take only one thing from this page:</strong> Antarious is not a productivity tool that happens to have AI. It is a governance-first automation platform where the AI is the employee, the approval workflow is the manager, and the audit trail is the regulator.</div>

        <h3>How Freya is structured</h3>

        <p>Freya is the orchestration layer. Underneath her sit specialist agents, each responsible for a narrow function. A content agent drafts copy. An analytics agent interprets performance. A compliance agent checks outputs against your policies. Freya does not do any of this directly — she routes work to the right specialists, assembles their output, applies quality controls, and then surfaces the finished artefact to a human approver.</p>

        <p>The platform ships with three agent libraries, organised by sector:</p>

        <ul>
          <li><strong>The GTM library</strong> — 13 business agents covering strategy, ICP research, competitor intelligence, copywriting, paid media, SEO, social, brand governance, outreach, analytics, forecasting, customer service, and voice. Aimed at commercial organisations running marketing, sales, and customer operations.</li>
          <li><strong>The Government library</strong> — 8 agents covering policy intelligence, service-delivery monitoring, budget tracking, compliance, document generation, inter-departmental coordination, public communication, and strategic forecasting. Aimed at ministries, agencies, and public bodies.</li>
          <li><strong>The NGO / Development library</strong> — 10 agents covering programme intelligence, M&amp;E reporting, partner performance, field data, beneficiary analytics, loan monitoring, document drafting, compliance, forecasting, and psychometric profiling. Aimed at development organisations, humanitarian agencies, and mission-led lenders.</li>
        </ul>

        <p>A deployment does not need every agent. Most organisations start with three to five and add more as they become comfortable with the approval cadence. Agent configuration is covered in detail in the <em>Deployment and Configuration</em> section.</p>

        <h3>What Antarious is not</h3>

        <p>The platform is frequently evaluated against tools it is not actually comparable to. To save time during procurement, here is what it is not.</p>

        <p>It is <strong>not a chat interface</strong>. You will not spend your day typing prompts. Freya operates proactively on a cadence that you configure — the weekly brief, the morning alert queue, the quarterly forecast — and she surfaces work when it needs human attention.</p>

        <p>It is <strong>not a workflow automation product</strong> like Zapier or n8n. Those products chain together deterministic steps across APIs. Antarious does the harder work: judgement. Freya is asked to draft a donor report, not to move a row between two spreadsheets.</p>

        <p>It is <strong>not a chatbot for your end-users</strong>. Although customer-service and public-communication agents can be pointed outward, Freya's default posture is internal. She operates inside your organisation, on behalf of your team, under your governance rules.</p>

        <p>It is <strong>not a consultancy engagement</strong>. The product is a platform, not a service. Implementation partners exist and can be engaged, but the platform is usable by a competent in-house team with the documentation provided in this library.</p>

        <h3>Where to read next</h3>

        <p>If you are a decision-maker or a governance lead, read <a href="#doc-hitl">The Human-in-the-Loop Architecture</a> next — it explains exactly what requires approval and how the approval graph is constructed. If you are a technical lead, skip to the <a href="#sec-02">Platform Architecture</a> section. If you are an operator in a specific sector, the <a href="#sec-04">Sector-Specific Guides</a> will be more directly relevant than the foundational documents.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-hitl">Next → The Human-in-the-Loop Architecture</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 1.2 — HITL Architecture -->
    <article class="doc" data-tags="getting-started compliance" id="doc-hitl">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">02</span>
            <span class="doc-time">5 min read</span>
            <span class="doc-audience">Audience: Governance, compliance, procurement</span>
          </div>
          <h3 class="doc-title">The Human-in-the-Loop Architecture</h3>
          <p class="doc-blurb">How Antarious is built around human approval — what requires authorisation, what runs autonomously, and how the approve-before-execute model works in practice. Essential reading for governance, compliance, and procurement teams.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>The Human-in-the-Loop (HITL) architecture is the single most important design decision in the Antarious platform. It is the mechanism that allows Freya to take autonomous action on behalf of an organisation without transferring legal, ethical, or operational accountability away from the humans who own that accountability today. This document explains how the architecture is constructed, what it requires of operators, and what it provides in return.</p>

        <h3>The founding principle</h3>

        <p>Every external action passes through a human approval gate. An action is "external" whenever its effect is visible outside the platform — a message sent, a budget committed, a report filed, a decision communicated, a record written to a CRM or a case management system. Internal actions — Freya reading data, drafting options, running analysis, querying memory — do not require approval, because they produce no external consequence.</p>

        <p>Approval gates are not a speed bump. They are the place where organisational judgement is exercised and where accountability is recorded. An action that passes a gate becomes <em>authorised work</em>; an action that does not pass is either returned for revision or cancelled. Both outcomes are recorded with timestamp, approver identity, and rationale.</p>

        <div class="doc-info"><strong>A practical consequence:</strong> when an auditor, regulator, or board member asks "who authorised this?", the answer is always a named human, not an algorithm. This is the design principle that allows Antarious to operate inside government, inside regulated industries, and inside development organisations answerable to donors.</div>

        <h3>The approval graph</h3>

        <p>Approval is not a single step — it is a graph. Each action type has an approval path defined by the organisation during deployment. The path can be single-approver, sequential, parallel, conditional, or threshold-based.</p>

        <ul>
          <li><strong>Single approver:</strong> one named role authorises the action. Typical for low-risk, frequent work.</li>
          <li><strong>Sequential:</strong> approver A must approve before it moves to approver B. Typical where subject expertise and line-management sign-off are both required.</li>
          <li><strong>Parallel:</strong> two or more approvers must each sign off, but in any order. Typical for cross-functional actions (e.g., a ministerial communication reviewed by policy and by comms simultaneously).</li>
          <li><strong>Conditional routing:</strong> the path depends on the value of the action — a contract below £10,000 routes to a contracts officer, above that threshold routes to a director.</li>
          <li><strong>Threshold-based escalation:</strong> if an approver has not responded within a configured window, the action escalates to a delegate or a senior role.</li>
        </ul>

        <p>Approval graphs are configured in the admin console and are themselves versioned and auditable — so an auditor can see not only who approved a given action, but also what the approval graph was at the moment of approval.</p>

        <h3>Severity and routing</h3>

        <p>Antarious ships with a default severity model that distinguishes low, medium, high, and critical actions. Each severity level has sensible default routing, which organisations typically tune during deployment.</p>

        <table class="vz-gates">
          <thead><tr><th>Action class</th><th>Severity</th><th>Default routing</th></tr></thead>
          <tbody>
            <tr><td>Low-risk internal work (drafting, analysis, monitoring)</td><td><span class="sev vz-sev-low">Low</span></td><td>Auto-execute; recorded for audit; no human step</td></tr>
            <tr><td>Routine external communication under preset rules</td><td><span class="sev vz-sev-low">Low</span></td><td>Self-authorised by role; exception review weekly</td></tr>
            <tr><td>Standard external output (reports, content, responses)</td><td><span class="sev vz-sev-med">Medium</span></td><td>Reviewed and signed-off by a line lead before release</td></tr>
            <tr><td>Public-facing decision, policy communication, donor report</td><td><span class="sev vz-sev-high">High</span></td><td>Escalated to a senior approver; rationale recorded</td></tr>
            <tr><td>Legal, regulatory, or above-threshold financial action</td><td><span class="sev vz-sev-crit">Critical</span></td><td>Parallel approval from named senior roles; cannot be delegated</td></tr>
          </tbody>
        </table>

        <h3>What Freya handles vs. what humans own</h3>

        <p>A common misconception is that HITL means "humans do the work and the AI helps." The opposite is true. Freya does the work. Humans direct, approve, and decide. The split is irreducible in some areas and configurable in others.</p>

        <div class="vz-split">
          <div class="vz-split-col vz-split-handles">
            <h5>Freya handles autonomously</h5>
            <ul>
              <li>Drafting: memos, reports, content, policy briefs, donor updates</li>
              <li>Analysis: attribution, anomaly detection, forecast generation</li>
              <li>Monitoring: alerts, escalations, budget variance</li>
              <li>Pattern work: lead scoring, beneficiary triage, partner performance</li>
              <li>Integration work: pulling, validating, and reconciling data across systems</li>
              <li>Routine external work under preset rules (within gates)</li>
            </ul>
          </div>
          <div class="vz-split-col vz-split-humans">
            <h5>Humans always own</h5>
            <ul>
              <li>Strategic direction and organisational priorities</li>
              <li>Relationship-driven decisions and stakeholder management</li>
              <li>Legal, regulatory, and fiduciary accountability</li>
              <li>Final approval on all external-facing actions</li>
              <li>Crisis communication, litigation, high-risk partnerships</li>
              <li>The design and revision of the approval graph itself</li>
            </ul>
          </div>
        </div>

        <h3>How confidence builds</h3>

        <p>Most organisations begin with narrower autonomy than they finally settle on. For the first four to eight weeks, approval gates are set tightly: almost every external output requires a human review, not because the team distrusts Freya, but because the team is building an intuition for where her outputs are reliably excellent and where they need friction.</p>

        <p>As that intuition forms, approval graphs widen. Specific action types move from "always review" to "review exceptions only" to "auto-release within preset rules." Every change to the approval graph is itself recorded, so an auditor can trace not only individual decisions but the governance trajectory of the deployment as a whole.</p>

        <h3>When Freya refuses to act</h3>

        <p>Freya will not take certain actions even when a human has attempted to authorise them. These are encoded as <em>hard stops</em> and cannot be removed through configuration. They include actions that would violate the platform's compliance controls, that would evade the audit trail, that would bypass a regulatory requirement in a jurisdiction where the tenant is registered, or that would discriminate on a protected attribute in a way that violates Article 22 of UK/EU GDPR.</p>

        <div class="doc-warn"><strong>Important:</strong> the list of hard stops is not a substitute for your own governance. It is the floor, not the ceiling. Your approval graph is where your organisation's specific policies, risk appetite, and regulatory posture are encoded.</div>

        <h3>What the architecture gives you back</h3>

        <p>The point of the approval architecture is not that it slows things down — it is that it lets you move fast without losing control. A team operating Antarious with a properly configured approval graph can expect the following outcomes:</p>

        <ul>
          <li><strong>Throughput</strong> several multiples higher than a non-AI baseline, because Freya does the drafting, analysis, and orchestration work that humans previously did end-to-end.</li>
          <li><strong>Fewer escalations</strong>, because standard work moves through standard approvers, and only exceptions reach senior roles.</li>
          <li><strong>A complete decision record</strong> — every action you took, every action you considered and rejected, every alternative Freya proposed — which is worth more than it sounds the first time you are asked to reconstruct a decision from two years ago.</li>
          <li><strong>A governance surface</strong> that can be inspected by an internal auditor, an external auditor, a regulator, or a donor, without a manual forensic exercise.</li>
        </ul>

        <p>The rest of this library describes the specifics: what the audit trail looks like, how to configure the approval graph, how to design role permissions, and how to map the controls to external standards (ISO 27001, UK/EU GDPR, NCSC). This document is the why. Everything else is the how.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-what-is-antarious">← Previous</a><a href="#doc-agents">Next → How Freya's Agents Work</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 1.3 — How Freya's Agents Work -->
    <article class="doc" data-tags="getting-started technical" id="doc-agents">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">03</span>
            <span class="doc-time">6 min read</span>
            <span class="doc-audience">Audience: All readers</span>
          </div>
          <h3 class="doc-title">How Freya's Agents Work</h3>
          <p class="doc-blurb">An explanation of the multi-agent architecture — how specialist agents are structured, how they share context, and how they collaborate to execute complex multi-step workflows. Includes an overview of all agent libraries across sectors.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>Most AI products you have used are <em>monolithic</em>: one model, one prompt, one conversation. This works well for narrow questions and poorly for real work, where a single task usually touches half a dozen domains — tone of voice, factual accuracy, regulatory posture, commercial context, and historical memory. Antarious is built on a different model: a team of specialist agents, coordinated by Freya, each an expert at a narrow slice of work.</p>

        <p>This document explains how the multi-agent architecture is structured, what each agent sees and does, how context is shared between them, and how they compose into the workflows that power daily operations.</p>

        <h3>The Freya Agent Loop</h3>

        <p>Before looking at the agents themselves, it helps to understand how Freya herself reasons. She operates on a six-step loop that applies to every significant piece of work.</p>

        <div class="vz-loop">
          <div class="vz-loop-row">
            <div class="vz-loop-step"><div class="vz-loop-ico">◉</div><div class="vz-loop-n">Observe</div><div class="vz-loop-d">Ingests signals from connected data sources and the context store.</div></div>
            <div class="vz-loop-arr">→</div>
            <div class="vz-loop-step"><div class="vz-loop-ico">⧈</div><div class="vz-loop-n">Analyse</div><div class="vz-loop-d">Reasons over the observations against organisational memory and goals.</div></div>
            <div class="vz-loop-arr">→</div>
            <div class="vz-loop-step"><div class="vz-loop-ico">☰</div><div class="vz-loop-n">Plan</div><div class="vz-loop-d">Assembles a multi-step plan, assigning specialist agents to each step.</div></div>
            <div class="vz-loop-arr">→</div>
            <div class="vz-loop-step"><div class="vz-loop-ico">▶</div><div class="vz-loop-n">Execute</div><div class="vz-loop-d">Runs agents, composes their output, applies quality controls.</div></div>
            <div class="vz-loop-arr">→</div>
            <div class="vz-loop-step"><div class="vz-loop-ico">△</div><div class="vz-loop-n">Escalate</div><div class="vz-loop-d">Routes the finished artefact to the relevant approval gate.</div></div>
            <div class="vz-loop-arr">→</div>
            <div class="vz-loop-step"><div class="vz-loop-ico">⟳</div><div class="vz-loop-n">Learn</div><div class="vz-loop-d">Records approvals, rejections, and revisions in persistent memory.</div></div>
          </div>
        </div>

        <p>Every action Freya proposes passes through this loop. The loop is observable — an operator can inspect what Freya saw, what she concluded, what alternatives she considered, and why she selected the one she surfaced. This is the reasoning equivalent of the audit trail.</p>

        <h3>Specialist agents</h3>

        <p>Specialist agents are narrow, composable, and stateless. A specialist agent does one thing — draft an email, classify a reply, detect an anomaly, generate a chart — and returns a structured output. Specialists do not talk directly to each other; they pass their output back up to Freya, who decides what to do with it.</p>

        <p>This design has three consequences worth noting:</p>

        <ul>
          <li><strong>Each agent can be improved independently.</strong> The M&amp;E Report Generator can be upgraded without touching the Psychometric Profiler. This is impossible in monolithic AI products, where a change to one prompt affects every downstream behaviour.</li>
          <li><strong>Each agent is individually auditable.</strong> The audit trail records which specialist contributed which part of a finished artefact, what its inputs were, and what its confidence score was.</li>
          <li><strong>Agents can be selectively disabled.</strong> If your organisation does not want the Voice AI agent operational, it is simply switched off. Freya's planning loop will not assign work to it.</li>
        </ul>

        <h3>The GTM library (13 agents)</h3>

        <p>The GTM library is the longest-standing of the three and the most commonly deployed. It covers the full go-to-market surface from strategy to close.</p>

        <div class="vz-agents">
          <div class="vz-a" style="border-top-color:var(--gold)"><div class="vz-a-num" style="color:var(--gold)">Agent 01 · Strategy</div><div class="vz-a-ico">◎</div><div class="vz-a-t">GTM Strategist</div><div class="vz-a-b">Generates campaign briefs — segment, channels, messaging, budget, KPIs — routed to a Strategic Advisor approval queue.</div></div>
          <div class="vz-a" style="border-top-color:var(--teal)"><div class="vz-a-num" style="color:var(--teal2)">Agent 02 · Intelligence</div><div class="vz-a-ico">⌖</div><div class="vz-a-t">ICP Researcher</div><div class="vz-a-b">Builds and refines Ideal Customer Profiles from win/loss data and engagement patterns.</div></div>
          <div class="vz-a" style="border-top-color:var(--violet)"><div class="vz-a-num" style="color:var(--violet)">Agent 03 · Intelligence</div><div class="vz-a-ico">◈</div><div class="vz-a-t">Competitor Intel</div><div class="vz-a-b">Monitors competitor sites, ads, G2, LinkedIn; feeds battlecards and ICP updates.</div></div>
          <div class="vz-a" style="border-top-color:#2563EB"><div class="vz-a-num" style="color:#2563EB">Agent 04 · Content</div><div class="vz-a-ico">✎</div><div class="vz-a-t">Copywriter</div><div class="vz-a-b">Generates on-brand copy for email, ads, landing pages, blogs, and social.</div></div>
          <div class="vz-a" style="border-top-color:#EA580C"><div class="vz-a-num" style="color:#EA580C">Agent 05 · Paid Media</div><div class="vz-a-ico">◆</div><div class="vz-a-t">Meta Ads</div><div class="vz-a-b">End-to-end Meta campaign management — audience, creative, budget, A/B, bid.</div></div>
          <div class="vz-a" style="border-top-color:#059669"><div class="vz-a-num" style="color:#059669">Agent 06 · Content</div><div class="vz-a-ico">⌕</div><div class="vz-a-t">SEO</div><div class="vz-a-b">Keyword research, gap mapping, optimised pages, Search Console integration, content calendar.</div></div>
          <div class="vz-a" style="border-top-color:#DB2777"><div class="vz-a-num" style="color:#DB2777">Agent 07 · Content</div><div class="vz-a-ico">◍</div><div class="vz-a-t">Social Media</div><div class="vz-a-b">Monthly calendars for LinkedIn, Facebook, Instagram, Pinterest; scheduling and response.</div></div>
          <div class="vz-a" style="border-top-color:var(--amber)"><div class="vz-a-num" style="color:var(--amber)">Agent 08 · Quality</div><div class="vz-a-ico">✓</div><div class="vz-a-t">Brand Guardian</div><div class="vz-a-b">QA-reviews every output; 0–1.0 compliance score; below 0.75 returns, 0.90+ auto-approves.</div></div>
          <div class="vz-a" style="border-top-color:var(--coral)"><div class="vz-a-num" style="color:var(--coral)">Agent 09 · Outreach</div><div class="vz-a-ico">↗</div><div class="vz-a-t">SDR Outreach</div><div class="vz-a-b">7-touch email + LinkedIn sequences, personalised first-line, reply classification.</div></div>
          <div class="vz-a" style="border-top-color:var(--green)"><div class="vz-a-num" style="color:var(--green)">Agent 10 · Analytics</div><div class="vz-a-ico">◐</div><div class="vz-a-t">Analytics</div><div class="vz-a-b">5-model attribution, anomaly detection, CAC by channel, weekly and board reporting.</div></div>
          <div class="vz-a" style="border-top-color:var(--sky)"><div class="vz-a-num" style="color:var(--sky)">Agent 11 · Analytics</div><div class="vz-a-ico">▲</div><div class="vz-a-t">Forecasting</div><div class="vz-a-b">Predicts MQL, pipeline, CAC, ROI for 90 days with base, optimistic, and risk scenarios.</div></div>
          <div class="vz-a" style="border-top-color:#9333EA"><div class="vz-a-num" style="color:#9333EA">Agent 12 · Inbox</div><div class="vz-a-ico">✉</div><div class="vz-a-t">Customer Service</div><div class="vz-a-b">Classifies intent, auto-responds to low-risk FAQs, escalates complex issues to CSM.</div></div>
          <div class="vz-a" style="border-top-color:var(--amber)"><div class="vz-a-num" style="color:var(--amber)">Agent 13 · Beta</div><div class="vz-a-ico">♪</div><div class="vz-a-t">Voice AI</div><div class="vz-a-b">Inbound/outbound calls for qualification and appointment-setting; full human override.</div></div>
        </div>

        <h3>The Government library (8 agents)</h3>

        <p>The Government library is designed for ministries, agencies, and public bodies. The agents are tuned for policy work, service delivery, and public communication under a regulatory and accountability regime.</p>

        <ul>
          <li><strong>Policy Intelligence Agent</strong> — horizon-scans new policy, legislation, and regulation across specified jurisdictions and summarises implications for the department.</li>
          <li><strong>Service Delivery Monitor</strong> — tracks operational KPIs across delivery units, surfaces anomalies, and generates early-warning alerts.</li>
          <li><strong>Budget Tracker</strong> — monitors spend against allocation, forecasts end-of-year position, and surfaces variances.</li>
          <li><strong>Compliance Sentinel</strong> — tracks the department's obligations against regulation and statutes; generates evidence portfolios for inspection.</li>
          <li><strong>Document Generator</strong> — drafts briefings, Cabinet papers, consultation responses, and parliamentary question answers under a sign-off chain.</li>
          <li><strong>Inter-Departmental Coordinator</strong> — maintains a map of cross-departmental dependencies and surfaces coordination risks.</li>
          <li><strong>Public Communication Agent</strong> — drafts press releases, social content, and public-facing guidance with mandatory editorial and legal review.</li>
          <li><strong>Strategic Forecasting Agent</strong> — scenario-models delivery, demand, and budget positions over 1–5 year horizons.</li>
        </ul>

        <h3>The NGO / Development library (10 agents)</h3>

        <p>The NGO library serves development organisations, humanitarian agencies, and mission-led lenders. The defining characteristic of these organisations is that they answer to donors, regulators, and beneficiaries simultaneously — the library is designed to keep all three constituencies visible at all times.</p>

        <ul>
          <li><strong>Programme Intelligence Agent</strong> — surfaces programme-level performance patterns, logframe alignment, and divergence from theory of change.</li>
          <li><strong>M&amp;E Report Generator</strong> — ingests partner data and drafts donor-ready reports against the relevant log frame, with traceability to source data.</li>
          <li><strong>Partner Performance Monitor</strong> — scores implementing partners against delivery, compliance, and reporting metrics.</li>
          <li><strong>Field Data Analyst</strong> — cleans and interprets submissions from ODK, KoBo, SurveyCTO, CommCare, DHIS2, and similar platforms.</li>
          <li><strong>Beneficiary Analytics Agent</strong> — aggregates anonymised beneficiary data, identifies cohorts at risk of dropout, and surfaces equity gaps.</li>
          <li><strong>Loan Portfolio Monitor</strong> — for mission-led lenders: tracks portfolio health, arrears, and early-warning indicators.</li>
          <li><strong>Document Drafting Agent</strong> — concept notes, proposals, MoUs, case studies under a reviewer chain.</li>
          <li><strong>Compliance Sentinel</strong> — tracks donor compliance obligations, consent frameworks, and data-sharing constraints.</li>
          <li><strong>Forecasting Agent</strong> — scenario-models programme delivery, budget, and beneficiary reach against uncertainty.</li>
          <li><strong>Psychometric Profiling Agent</strong> — for mission-led lenders using psychometric credit scoring, generates applicant profiles with full Article 22 compliance.</li>
        </ul>

        <h3>How context is shared</h3>

        <p>Specialist agents do not share memory directly. Every agent reads from a shared <em>context store</em> that Freya curates. The context store is tenant-isolated and structured: brand memory, ICP and persona records, campaign history, performance data, approved content, market context, and sector-specific repositories. This design means you can reason about what any given agent sees — it sees the context that Freya explicitly included for that task — and you can reason about who can change that context.</p>

        <p>Context is covered in full detail in <a href="#doc-memory">Persistent Memory — How Freya Learns and Retains</a>, the next document in this section.</p>

        <h3>Composition into workflows</h3>

        <p>A workflow is a named, versioned sequence of Freya plans that organisations run on a cadence. Examples: the Monday Morning Brief (weekly), the Monthly M&amp;E Cycle (monthly), the Ministerial Question Response (reactive). Workflows are where agents compose — the Monday Brief, for instance, orchestrates the Analytics, Forecasting, and Copywriter agents in sequence, then surfaces a single artefact for CMO approval.</p>

        <p>Workflows are designed and modified in the admin console, version-controlled, and can be scheduled, triggered manually, or triggered on event. See the <a href="#doc-approval-config">Approval Workflow Configuration Guide</a> for detail.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-hitl">← Previous</a><a href="#doc-memory">Next → Persistent Memory</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 1.4 — Persistent Memory -->
    <article class="doc" data-tags="getting-started technical compliance" id="doc-memory">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">04</span>
            <span class="doc-time">4 min read</span>
            <span class="doc-audience">Audience: Technical leads, privacy, compliance</span>
          </div>
          <h3 class="doc-title">Persistent Memory — How Freya Learns and Retains</h3>
          <p class="doc-blurb">How Freya builds and retains institutional knowledge — what is stored, how it is structured, how it is accessed, and how it survives staff transitions. Includes a discussion of privacy and data minimisation in the memory architecture.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>One of the most valuable and most often underestimated properties of the platform is Freya's persistent memory. Unlike generic AI assistants that forget everything between conversations, Freya retains institutional knowledge across sessions, across users, and across staff transitions. This document explains what is stored, why it is stored, how it is structured, how it is protected, and how it respects the data-minimisation obligations of the jurisdictions in which Antarious operates.</p>

        <h3>What is stored</h3>

        <p>Freya's memory is divided into six durable stores. Each store has a distinct structure, retention rule, and access boundary.</p>

        <div class="vz-mem">
          <div class="vz-mem-c"><h5>Brand Memory</h5><p>Voice, tone, positioning, banned phrases, preferred phrasing, stylistic conventions.</p></div>
          <div class="vz-mem-c"><h5>ICP &amp; Personas</h5><p>Ideal customer or beneficiary profiles, segmented personas, qualifying and disqualifying attributes.</p></div>
          <div class="vz-mem-c"><h5>Campaign / Programme History</h5><p>Every campaign or programme run in the platform — briefs, decisions, outcomes, lessons.</p></div>
          <div class="vz-mem-c"><h5>Performance Data</h5><p>Time-series metrics by channel, cohort, partner, or delivery unit — forming the baseline for anomaly detection.</p></div>
          <div class="vz-mem-c"><h5>Approved &amp; Rejected Content</h5><p>Every artefact that was accepted or rejected, with reviewer rationale. Powers continuous quality improvement.</p></div>
          <div class="vz-mem-c"><h5>Market / Sector Context</h5><p>External signals relevant to the tenant — competitor moves, regulatory updates, donor trends.</p></div>
        </div>

        <h3>How memory is structured</h3>

        <p>Each store is backed by a combination of a vector index and a structured record database. The vector index supports semantic retrieval ("find every past brief for campaigns targeting mid-market manufacturing"); the record database supports exact lookups, version history, and access control. Every record has an <em>owner</em> (the user or role that created it), a <em>scope</em> (workspace, team, tenant), and a <em>lineage</em> (what other records informed it).</p>

        <p>Memory is tenant-isolated. There is no cross-tenant reading, writing, or inference — not in development, not in production, not for model training. This is enforced at the storage layer, not at the application layer, so it cannot be bypassed by a misconfigured query.</p>

        <div class="doc-tip"><strong>A useful mental model:</strong> think of the memory as a very well-organised filing cabinet that Freya consults before every piece of work. The cabinet belongs to your organisation. Nothing goes into it unless your team puts it there. Nothing leaves it to any other tenant, ever.</div>

        <h3>How memory is accessed</h3>

        <p>Access to memory follows the same role and permission model as access to actions. A user who can read a campaign can read its memory record. A user who can approve ministerial communications can see the memory of past ministerial approvals. An agent only accesses memory that Freya has explicitly included in its context for a given task.</p>

        <p>This is important for a reason that does not always get articulated: <em>you can reason about what Freya knows</em>. At any point you can ask Freya to enumerate the memory records that informed a particular decision, and she will do so. This is not a feature tacked on for auditors — it is how the system works internally, so exposing it is essentially free.</p>

        <h3>Why it matters that memory is persistent</h3>

        <p>Institutional memory is one of the most fragile assets in any organisation. It walks out with the senior staff member who retires, the programme officer who moves on, the comms lead who takes a sabbatical. In most organisations the loss is invisible until someone asks the question that only that person could answer.</p>

        <p>Antarious retains that memory by default. When a user rotates out of a role, the rationale for every decision they made, every campaign they ran, every policy they drafted, every cohort analysis they produced remains accessible to their successor. The successor is not starting cold; they are starting with a retrievable record of what worked, what did not, and why.</p>

        <p>This has second-order effects. Reviewing year-over-year patterns becomes cheap; reconstructing the justification for a decision made 18 months ago becomes trivial; onboarding a new team member becomes a matter of granting memory access rather than running a three-month shadow programme.</p>

        <h3>Privacy and data minimisation</h3>

        <p>Memory is, by construction, a tension with data minimisation: the more you store, the more you need to protect. Antarious resolves this tension with three design commitments.</p>

        <p><strong>01 · Purpose-bound storage.</strong> Each memory store has a declared purpose. Brand memory exists to maintain voice consistency. Beneficiary analytics memory exists to improve programme delivery. Records outside a declared purpose are not created, and records whose purpose lapses are flagged for review and deletion.</p>

        <p><strong>02 · Configurable retention.</strong> Retention periods are set per store and per tenant. The defaults are conservative — most stores retain indefinitely, but personal data stores default to the shortest period consistent with the operational purpose. You can tighten retention below the defaults; you cannot lengthen it beyond the data protection impact assessment (DPIA) declared for the tenant.</p>

        <p><strong>03 · Explicit personal-data handling.</strong> Memory involving personal data (a named beneficiary, a named counterpart, a named applicant in a lending context) is tagged at ingestion. Tagged records are subject to access logging, retention rules, and subject-rights handling (erasure, rectification, portability). See <a href="#doc-data">the data handling and residency reference</a> for the specifics.</p>

        <h3>What memory is not</h3>

        <p>Memory is not a training corpus. Antarious does not use tenant memory to train foundation models. It is not a knowledge base to be browsed. Users interact with memory through Freya's task output, not through a "memory explorer." And it is not a permanent record in the sense that it is never reviewed — each store is reviewed periodically for records that have outlived their purpose, and those records are compressed, archived, or deleted according to policy.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-agents">← Previous</a><a href="#doc-audit">Next → Understanding the Audit Trail</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 1.5 — Audit Trail -->
    <article class="doc" data-tags="getting-started technical compliance" id="doc-audit">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">05</span>
            <span class="doc-time">5 min read</span>
            <span class="doc-audience">Audience: Compliance, audit, governance</span>
          </div>
          <h3 class="doc-title">Understanding the Audit Trail</h3>
          <p class="doc-blurb">What is recorded, how it is stored, how to retrieve it, and what it looks like in practice. Includes guidance on generating audit reports for compliance, donor, or regulatory purposes.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>The audit trail is the primary output of the platform. Every other feature — the agents, the memory, the approval workflows — produces an audit record as a side effect of doing its work. This document explains what is recorded, how it is stored, how an operator retrieves it, and how to produce the evidence packages that compliance, donor, or regulatory audiences typically ask for.</p>

        <h3>What is recorded</h3>

        <p>The audit trail records every event in the platform that has an accountability meaning. Operationally, this means every event that changes state that is visible to another user or to a system outside Antarious. It includes:</p>

        <ul>
          <li><strong>Every action taken by Freya or a specialist agent</strong> — action ID, agent ID, inputs, outputs, confidence score, duration.</li>
          <li><strong>Every approval event</strong> — action ID, approver identity, decision (approve, reject, request revision), timestamp, rationale if provided.</li>
          <li><strong>Every configuration change</strong> — approval graph changes, role changes, permission changes, retention changes, integration credential rotations.</li>
          <li><strong>Every access event involving personal data</strong> — who read what, when, for what declared purpose.</li>
          <li><strong>Every alert and escalation</strong> — what triggered, who received it, what they did about it, what the outcome was.</li>
          <li><strong>Every data ingestion and egress event</strong> — connectors, volumes, timestamps, payload signatures.</li>
        </ul>

        <p>Each record is cryptographically chained to the previous record for the tenant. Tampering with a record breaks the chain and is detectable.</p>

        <h3>How records are structured</h3>

        <p>Each audit record is a structured, typed document. A typical action record contains: <code>event_id</code>, <code>tenant_id</code>, <code>workspace_id</code>, <code>actor_type</code> (human, agent, system), <code>actor_id</code>, <code>action_type</code>, <code>resource_id</code>, <code>inputs_hash</code>, <code>outputs_hash</code>, <code>approval_chain</code>, <code>occurred_at</code>, <code>confidence</code>, and <code>agent_lineage</code> (which sub-agents contributed).</p>

        <div class="vz-code"><pre><span class="cm">// Example audit record (shape is illustrative)</span>
{
  <span class="ck">"event_id"</span>: <span class="cs">"evt_01HRT3F..."</span>,
  <span class="ck">"tenant_id"</span>: <span class="cs">"tnt_7234"</span>,
  <span class="ck">"actor_type"</span>: <span class="cs">"agent"</span>,
  <span class="ck">"actor_id"</span>: <span class="cs">"agent.copywriter"</span>,
  <span class="ck">"action_type"</span>: <span class="cs">"draft.email_sequence"</span>,
  <span class="ck">"approval_chain"</span>: [
    { <span class="ck">"role"</span>: <span class="cs">"content_strategist"</span>, <span class="ck">"user_id"</span>: <span class="cs">"usr_112"</span>, <span class="ck">"decision"</span>: <span class="cs">"approve"</span>, <span class="ck">"at"</span>: <span class="cs">"2026-04-24T09:42:03Z"</span> }
  ],
  <span class="ck">"confidence"</span>: <span class="cn">0.94</span>,
  <span class="ck">"agent_lineage"</span>: [<span class="cs">"strategist"</span>, <span class="cs">"copywriter"</span>, <span class="cs">"brand_guardian"</span>],
  <span class="ck">"outputs_hash"</span>: <span class="cs">"sha256:4e1c..."</span>
}</pre></div>

        <p>Records are append-only. An entry cannot be edited or deleted; corrections are written as new records that reference the one they correct. This is how the trail maintains its forensic value.</p>

        <h3>How records are stored</h3>

        <p>Audit records are stored in a dedicated immutable log in the tenant's data residency region. They are retained indefinitely by default, though organisations can configure shorter retention where regulation permits or require it. They are hashed into a Merkle chain so that long-range tampering requires rewriting every subsequent record — in practice, it is detectable with a single verification pass.</p>

        <p>For archival and regulatory evidence, records can be exported to an external immutable store (object storage with WORM lock, for example). The export itself is an audit event, and the integrity of the export is verifiable by re-hashing.</p>

        <h3>How to retrieve records</h3>

        <p>There are four retrieval paths, graded by use case.</p>

        <ul>
          <li><strong>The Audit Console</strong> — an interactive view in the admin surface where authorised users can query, filter, and inspect records. Suited to investigation ("show me all approvals by user X on date Y").</li>
          <li><strong>Reports</strong> — pre-built templates for common regulatory and donor needs: quarterly compliance report, DPIA evidence pack, donor accountability report, board audit report. Generated on demand with a single action.</li>
          <li><strong>Export</strong> — bulk export to a customer-owned location (S3, Azure Blob, SFTP). Useful for long-term archival and for integrating into a SIEM.</li>
          <li><strong>API</strong> — programmatic access to the audit log for teams that maintain their own audit tooling. See <a href="#doc-api">the API Reference</a>.</li>
        </ul>

        <h3>Generating an audit report</h3>

        <p>The most common operational need is to produce an evidence pack for an external audience — an auditor, a donor, a regulator, a customer running procurement due diligence. Antarious ships with templates for the common cases.</p>

        <p>To generate a report, open the Audit Console, select the template appropriate to the audience, define the scope (time window, workspaces, action types, roles), and click <em>Generate</em>. The output is a sealed PDF plus the underlying CSV of records. Both artefacts are themselves audit events, so a future auditor can verify that the report you handed over was the one the system produced at that time.</p>

        <div class="doc-info"><strong>Tip:</strong> if you are running an ISO 27001 surveillance audit, the ISO-mapped template groups records by Annex A control reference. This saves most of a day in a typical audit prep cycle.</div>

        <h3>Who can see what</h3>

        <p>Visibility of audit records is itself role-based. A workspace administrator sees records scoped to their workspace. A tenant-level audit role sees every record across every workspace. An auditor granted a time-bound read-only role sees records within their declared scope for the duration of their engagement. Every view of an audit record is itself an audit event — the log includes who looked at what.</p>

        <h3>What the audit trail does not do</h3>

        <p>The trail does not redact its own records. If a record contains personal data, and that data is subject to an erasure request, the erasure is performed on the underlying resource and a reference-only record is preserved in the trail — the trail retains that an action occurred, even when it cannot retain the content of the action. This is a deliberate design decision: the alternative would allow an erasure request to be used to hide an action entirely, which is not consistent with the regulatory meaning of the right to erasure.</p>

        <p>The trail also does not store outputs larger than a configurable threshold. For large artefacts (a full donor report, a board deck, a spatial dataset), the trail stores a cryptographic hash and a pointer to the artefact in the document store. The pointer is privileged; the hash is not. This means the trail remains small and fast while still being forensically sound.</p>

        <h3>Where this goes from here</h3>

        <p>This document is the operational overview. For the implementation details (schema, storage, retention, export format, and verification protocol) see <a href="#doc-audit-ref">Audit Trail Reference</a> in Section 06.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-memory">← Previous</a><a href="#sec-02">Next Section → Platform Architecture</a></div>
        </div>
      </div></div>
    </article>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- SECTION 02 — PLATFORM ARCHITECTURE                          -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="sec-02" class="sec-alt">
  <div class="page">
    <div class="eyebrow">Section 02</div>
    <h2 class="sec-title">Platform <em>Architecture</em></h2>
    <p class="sec-lead">Technical documentation covering the platform's foundational architecture — for technical leads, architects, and IT teams involved in deployment planning and security assessment.</p>

    <h3 class="sec-sub">How Antarious Is Built</h3>

    <!-- Doc 2.1 — Architecture Overview -->
    <article class="doc" data-tags="technical" id="doc-arch-overview">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">01</span>
            <span class="doc-time">4 min read</span>
            <span class="doc-audience">Audience: Technical architects, IT leads</span>
          </div>
          <h3 class="doc-title">Platform Architecture Overview</h3>
          <p class="doc-blurb">The high-level architecture of the Antarious platform — infrastructure, data flows, agent orchestration layer, and the approval and audit systems. Includes system diagrams.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>Antarious is built as a three-layer platform: a <strong>memory and context layer</strong> that holds the organisation's institutional knowledge; a <strong>reasoning and orchestration layer</strong> where Freya observes, plans, and coordinates specialist agents; and an <strong>execution, governance, and integration layer</strong> where approved work meets the outside world. Each layer has a distinct trust boundary, a distinct access model, and a distinct operational cadence.</p>

        <div class="vz-arch">
          <div class="vz-arch-layer vz-L3">
            <div class="vz-lbl">Layer 03 · Execution, Governance, Integration</div>
            <div class="vz-items">
              <div class="vz-item"><div class="vz-item-icon">⟲</div><div class="vz-item-name">HITL Gates</div></div>
              <div class="vz-item"><div class="vz-item-icon">⎌</div><div class="vz-item-name">Rollback</div></div>
              <div class="vz-item"><div class="vz-item-icon">⎙</div><div class="vz-item-name">Audit Trail</div></div>
              <div class="vz-item"><div class="vz-item-icon">⇆</div><div class="vz-item-name">Connectors</div></div>
              <div class="vz-item"><div class="vz-item-icon">⌘</div><div class="vz-item-name">API</div></div>
              <div class="vz-item"><div class="vz-item-icon">◉</div><div class="vz-item-name">Webhooks</div></div>
            </div>
          </div>
          <div class="vz-div">⇅</div>
          <div class="vz-arch-layer vz-L2">
            <div class="vz-lbl">Layer 02 · Reasoning &amp; Orchestration — Freya</div>
            <div class="vz-items">
              <div class="vz-item"><div class="vz-item-icon">☰</div><div class="vz-item-name">Planning</div></div>
              <div class="vz-item"><div class="vz-item-icon">◈</div><div class="vz-item-name">Tool Use</div></div>
              <div class="vz-item"><div class="vz-item-icon">✓</div><div class="vz-item-name">Quality QA</div></div>
              <div class="vz-item"><div class="vz-item-icon">≡</div><div class="vz-item-name">Action Log</div></div>
              <div class="vz-item"><div class="vz-item-icon">▲</div><div class="vz-item-name">Confidence</div></div>
              <div class="vz-item"><div class="vz-item-icon">⎇</div><div class="vz-item-name">Specialists</div></div>
            </div>
          </div>
          <div class="vz-div">⇅</div>
          <div class="vz-arch-layer vz-L1">
            <div class="vz-lbl">Layer 01 · Memory &amp; Context</div>
            <div class="vz-items">
              <div class="vz-item"><div class="vz-item-icon">◎</div><div class="vz-item-name">Brand Memory</div></div>
              <div class="vz-item"><div class="vz-item-icon">⌖</div><div class="vz-item-name">ICP / Personas</div></div>
              <div class="vz-item"><div class="vz-item-icon">☷</div><div class="vz-item-name">Campaign Hx</div></div>
              <div class="vz-item"><div class="vz-item-icon">◐</div><div class="vz-item-name">Performance</div></div>
              <div class="vz-item"><div class="vz-item-icon">⎒</div><div class="vz-item-name">Approved Work</div></div>
              <div class="vz-item"><div class="vz-item-icon">⌁</div><div class="vz-item-name">Market Ctx</div></div>
            </div>
          </div>
          <div class="vz-arch-note">Vector store · Per-tenant isolation · Persistent across sessions</div>
        </div>

        <h3>Layer 01 — Memory &amp; Context</h3>

        <p>The memory layer is a tenant-isolated store composed of a vector index for semantic retrieval and a structured record database for typed lookups, version history, and access control. No memory ever leaves the tenant boundary. There is no shared index across tenants, no model fine-tuning on tenant data, and no cross-tenant embedding pool. Data residency is selectable per tenant (UK, EU, US, and a small number of bespoke regions) and set at deployment time.</p>

        <p>The store is append-dominant. Records are rarely edited — they are superseded by new versions that reference the prior record. This is important because it means the context Freya had at the moment of an action is reconstructible. If a decision was made on the basis of an ICP that was later revised, the revised ICP is not retrospectively applied to the decision: the audit chain preserves the original input.</p>

        <h3>Layer 02 — Reasoning &amp; Orchestration</h3>

        <p>The reasoning layer is where Freya operates. It is where the agent loop (Observe → Analyse → Plan → Execute → Escalate → Learn) runs, where specialist agents are dispatched, and where their outputs are composed into finished artefacts. The layer maintains a short-lived working memory for the duration of each task — this is distinct from the persistent memory in Layer 01 and is scoped to the active plan.</p>

        <p>Tool use in this layer is mediated. Agents do not make arbitrary HTTP calls. They declare their need for a tool, Freya (via the orchestration runtime) validates that the tool is available in the tenant's configured connector set, and only then is the call executed against a credentialed connector in Layer 03. This is how the platform prevents a misbehaving agent from, for example, writing to a CRM field that it was not intended to write to.</p>

        <h3>Layer 03 — Execution, Governance, Integration</h3>

        <p>The execution layer is the trust boundary between the platform and the outside world. Every external effect — every API call against a connector, every email sent, every report filed, every record written back to a source system — flows through this layer. It is also where the Human-in-the-Loop gates live: before an effect crosses the boundary, the platform validates that the required approvals are present.</p>

        <p>The integration surface is extensive. Connectors ship for CRM (Salesforce, HubSpot, NPSP), field data platforms (ODK Collect, KoBoToolbox, SurveyCTO, CommCare, DHIS2), government systems (SharePoint, Microsoft 365, SAP, Oracle ERP, ServiceNow, Power BI, SQL), marketing (Meta, Google, LinkedIn, Klaviyo, Instantly, Apollo, ZoomInfo, SEMrush), analytics (Snowflake, GA4, Tableau, Power BI), and generic REST/webhook targets. Each connector has a declared scope and credentials are stored in a tenant-isolated secrets vault.</p>

        <h3>Control plane and data plane</h3>

        <p>Administrative operations — user management, role configuration, approval graph design, retention policy, integration setup — are segregated from data operations. The control plane has its own audit stream, its own access model, and its own authentication path. This separation allows a security team to grant a configuration role without granting visibility of tenant content.</p>

        <h3>Deployment topology</h3>

        <p>Antarious is delivered as a managed multi-tenant service by default. Single-tenant deployments are available for regulated customers, and private-cloud deployments are available for customers with sovereign data requirements. Each topology carries the same architectural commitments — the same three layers, the same HITL gates, the same audit model. The differences are the isolation guarantees at the infrastructure level.</p>

        <h3>Observability and resilience</h3>

        <p>Every layer emits structured telemetry. The platform maintains 99.9% availability targets for the managed service, with regional failover where the tenant is configured for multi-region operation. Incident response follows a documented runbook with defined severities, customer notification windows, and post-incident review processes. The incident record is itself part of the audit trail, so customers can reason about the platform's reliability history with the same tooling they use to reason about their own operations.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-data-flow">Next → Data Flow Documentation</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 2.2 — Data Flow -->
    <article class="doc" data-tags="technical compliance" id="doc-data-flow">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">02</span>
            <span class="doc-time">4 min read</span>
            <span class="doc-audience">Audience: Technical architects, data governance leads, security teams</span>
          </div>
          <h3 class="doc-title">Data Flow Documentation</h3>
          <p class="doc-blurb">A complete map of how data moves through the Antarious platform — from ingestion through processing to output and storage. Includes data residency options and isolation boundaries.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>Data flow in Antarious is deliberately narrow and traceable. Every byte of customer data has a known origin, a known residence, a known purpose, and a known lifecycle. This document traces the full path of data through the platform and describes the isolation boundaries that protect it at each stage.</p>

        <h3>The five stages</h3>

        <div class="vz-flow">
          <div class="vz-flow-row">
            <div class="vz-flow-step"><div class="vz-flow-num">Stage 01</div><div class="vz-flow-t">Ingestion</div><div class="vz-flow-b">Data arrives via a connector, an API, or a scheduled pull.</div></div>
            <div class="vz-flow-arr">→</div>
            <div class="vz-flow-step"><div class="vz-flow-num">Stage 02</div><div class="vz-flow-t">Validation</div><div class="vz-flow-b">Schema check, PII tagging, tenant binding, purpose declaration.</div></div>
            <div class="vz-flow-arr">→</div>
            <div class="vz-flow-step"><div class="vz-flow-num">Stage 03</div><div class="vz-flow-t">Storage</div><div class="vz-flow-b">Encrypted at rest in the tenant's residency region.</div></div>
            <div class="vz-flow-arr">→</div>
            <div class="vz-flow-step"><div class="vz-flow-num">Stage 04</div><div class="vz-flow-t">Processing</div><div class="vz-flow-b">Freya reads within declared purpose; agents see only the context provided.</div></div>
            <div class="vz-flow-arr">→</div>
            <div class="vz-flow-out"><div class="vz-flow-num">Stage 05</div><div class="vz-flow-t">Output / Egress</div><div class="vz-flow-b">Approved artefacts cross the boundary via an audited connector.</div></div>
          </div>
        </div>

        <h3>Ingestion</h3>

        <p>Data enters the platform by one of three paths. <strong>Connectors</strong> pull from source systems on a schedule or in response to a webhook; the connector's declared scope defines what it can see. <strong>API writes</strong> allow custom integrations to push data directly, authenticated by a scoped API key. <strong>User uploads</strong> (documents, datasets, spreadsheets) enter through the application, with the user's identity and workspace bound to the upload.</p>

        <p>Every ingestion event generates an audit record: which connector or user, what resource, what volume, what tenant and workspace, what purpose. Ingestion is rate-limited and content is scanned for policy violations (prohibited file types, suspected credentials in payloads) at the boundary.</p>

        <h3>Validation and tagging</h3>

        <p>After ingestion, records pass through a validation stage that establishes four properties: the record's <em>tenant binding</em>, its <em>workspace scope</em>, its <em>personal-data tag</em> (yes/no plus category), and its <em>declared purpose</em>. Records that cannot be validated are quarantined and surfaced to an administrator rather than silently discarded.</p>

        <p>Personal-data tagging is automatic where the tagging is unambiguous (an email field, a national ID number) and model-assisted where the tagging requires inference (a free-text note that mentions a beneficiary by name). Tags can be revised by an administrator; every revision is audited.</p>

        <h3>Storage</h3>

        <p>Records are written to a tenant-isolated store in the residency region declared for the tenant at deployment. Encryption at rest uses AES-256 with keys managed in a regional KMS; tenant-specific key material is derived at workspace level so that compromise of a single workspace key does not extend to other workspaces in the same tenant.</p>

        <p>Vector embeddings are stored alongside their source records and are themselves tenant-isolated. There is no shared vector pool, no cross-tenant nearest-neighbour search, and no embedding is ever used to train a foundation model.</p>

        <h3>Processing</h3>

        <p>Freya and the specialist agents read data through a mediated query layer. A query declares its <em>purpose</em> (e.g., "draft Q2 donor report for programme X"), and the query layer returns only records whose declared purpose is consistent with the request. This is how purpose-binding is enforced — an agent cannot read beneficiary data for a campaign-reporting purpose simply because both records belong to the same workspace.</p>

        <p>Model inference is performed in the same residency region as the data. No data crosses the residency boundary for processing, including for foundation-model inference — the platform runs regional inference endpoints in each residency region to preserve this property.</p>

        <h3>Output and egress</h3>

        <p>Outputs fall into two categories. <em>Internal outputs</em> (artefacts visible only inside the platform — an analysis report in the Audit Console, a draft memo awaiting approval) do not leave the tenant boundary and do not constitute egress. <em>External outputs</em> (a sent email, a published post, a write-back to a CRM, a file uploaded to a donor portal) do constitute egress and require a passed approval gate and a logged connector call.</p>

        <p>Every egress event is audited with payload hash, target identifier, approval chain reference, and timestamp. Egress to connectors in other residency regions is permitted only where the tenant has explicitly enabled cross-region transfer for that connector, and where the transfer is consistent with the tenant's DPIA.</p>

        <h3>Data residency options</h3>

        <p>The platform supports data residency in the United Kingdom (London), the European Union (Frankfurt / Dublin), the United States (Virginia / Oregon), and — on request for qualifying customers — sovereign regions (India, Australia, South Africa). Residency is set at tenant creation and cannot be changed silently; a residency migration requires a planned cutover with customer notice.</p>

        <h3>Isolation boundaries, in order of strength</h3>

        <ul>
          <li><strong>Tenant isolation</strong> — strongest. No cross-tenant reads, writes, or inferences. Enforced at the storage layer.</li>
          <li><strong>Workspace isolation</strong> — strong. Within a tenant, workspaces can share or isolate data according to policy. Default: isolate.</li>
          <li><strong>Role isolation</strong> — enforced per user. Roles define what a user can read, write, and approve. Every access is audited.</li>
          <li><strong>Purpose isolation</strong> — enforced per query. A query carries a declared purpose, and the data layer returns only records consistent with that purpose.</li>
        </ul>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-arch-overview">← Previous</a><a href="#doc-agent-arch">Next → Agent Architecture Reference</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 2.3 — Agent Architecture Reference -->
    <article class="doc" data-tags="technical" id="doc-agent-arch">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">03</span>
            <span class="doc-time">4 min read</span>
            <span class="doc-audience">Audience: Technical architects, implementation partners</span>
          </div>
          <h3 class="doc-title">Agent Architecture Reference</h3>
          <p class="doc-blurb">Detailed reference for the agent architecture — how agents are instantiated, how they communicate, how context is shared between agents, and how orchestration is managed by Freya.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>This document is the developer-facing reference for the agent architecture. It describes how agents are instantiated, the lifecycle of a planning run, how context is composed, how tool use is mediated, how quality controls operate, and how orchestration composes into long-running workflows.</p>

        <h3>The agent type hierarchy</h3>

        <p>Every agent in Antarious is one of three types.</p>

        <ul>
          <li><strong>Freya</strong> — the orchestration agent. One instance per workspace. She holds long-lived working memory for the workspace and is the only agent authorised to initiate specialist agents and to route finished artefacts to approval gates.</li>
          <li><strong>Specialists</strong> — narrow domain agents. Stateless except for the specific task context they receive. Examples: Copywriter, M&amp;E Report Generator, Psychometric Profiling Agent.</li>
          <li><strong>Utilities</strong> — pure functions wrapped as agents (schema validation, PII redaction, format conversion). Deterministic where possible.</li>
        </ul>

        <h3>Instantiation and lifecycle</h3>

        <p>When Freya decides a task requires a specialist, she emits an <em>agent invocation request</em>. The orchestration runtime validates that (a) the specialist is enabled in the workspace, (b) the tools the specialist declares a dependency on are available, and (c) the user or trigger that initiated the original request has the authority to cause this invocation. Only then is the specialist instantiated with its task context.</p>

        <p>Specialist instances are ephemeral. They are created for a task, produce a structured output, and are torn down. Their intermediate state is not persisted beyond the audit record. This design keeps the platform auditable — every run of a specialist is a discrete, traceable event.</p>

        <h3>The planning run</h3>

        <p>A planning run is the full Observe → Analyse → Plan → Execute → Escalate → Learn cycle for one triggered task. It consists of the following phases.</p>

        <ul>
          <li><strong>Trigger validation.</strong> Who or what triggered this? Is it authorised? Is the workspace in a state that permits new plans?</li>
          <li><strong>Context assembly.</strong> Freya queries the memory layer for the context relevant to the task, subject to purpose-binding and role visibility.</li>
          <li><strong>Plan generation.</strong> Freya produces one or more candidate plans; selects the highest-confidence plan consistent with the workspace's policy configuration.</li>
          <li><strong>Specialist dispatch.</strong> Each plan step is assigned to a specialist and invoked. Steps may run sequentially or in parallel depending on dependencies.</li>
          <li><strong>Composition.</strong> Specialist outputs are assembled into a finished artefact. A Quality agent (the Brand Guardian for GTM work, or a sector-specific analogue) reviews for policy compliance and confidence.</li>
          <li><strong>Routing.</strong> The artefact is routed to the relevant approval gate. If the gate is passed, it flows to execution; if rejected, Freya captures the reason and either re-plans or closes the task.</li>
          <li><strong>Learning.</strong> Approvals, rejections, and reviewer rationale are written to memory for future tasks to draw on.</li>
        </ul>

        <h3>Context composition</h3>

        <p>Each specialist sees only the context Freya has composed for its task. Context composition is purpose-bound — if the specialist is drafting a donor report, Freya composes programme context, partner performance context, and performance data context, and explicitly excludes context irrelevant to the task (e.g., beneficiary-level personal data, unless the reporting configuration declares a purpose that requires it).</p>

        <p>Context carries metadata about its provenance. A specialist can cite the record that supported each claim in its output. The audit trail preserves these citations so that an auditor can reconstruct why the specialist produced what it did.</p>

        <h3>Tool-use mediation</h3>

        <p>Specialists declare their tool dependencies as part of their definition — a Copywriter may need a brand-guidelines lookup, an SEO agent may need a Search Console pull, an M&amp;E Report Generator may need a KoBoToolbox connector. The orchestration runtime validates each tool call at execution time against the workspace's connector configuration and against the user's role permissions. A tool call that fails validation does not execute; the specialist receives a validation error and either re-plans or escalates.</p>

        <h3>Quality controls</h3>

        <p>Quality controls operate at three points in a planning run.</p>

        <ul>
          <li><strong>Confidence scoring.</strong> Every specialist emits a 0–1.0 confidence score on its output. Freya carries the minimum of all specialist scores as the overall plan confidence.</li>
          <li><strong>Policy review.</strong> A Quality agent checks the composed artefact against the workspace's content policy (brand, regulatory, ethical).</li>
          <li><strong>Approval gate.</strong> The routing policy maps confidence and severity to an approval path. A high-confidence low-severity artefact may auto-release; a low-confidence high-severity artefact requires escalation even if normally it would auto-release.</li>
        </ul>

        <div class="doc-tip"><strong>A common question:</strong> can Freya self-approve? She cannot. Freya is the author of work. Approval authority is always human (or, for routine actions, a pre-configured self-authorisation rule tied to a human role). This is not configurable.</div>

        <h3>Orchestration composition</h3>

        <p>Planning runs compose into workflows, which are named, versioned, schedulable sequences of plans. A workflow may trigger on a schedule (the Monday Morning Brief), on an event (a new campaign created, a new partner onboarded, a budget variance detected), or on a manual invocation (an operator asks Freya for a specific artefact).</p>

        <p>Workflow state is persisted. A workflow that is in progress across multiple approval gates can pause for hours or days without losing context. When an approval arrives, the workflow resumes from its checkpoint. This is how long-running processes — a multi-week M&amp;E cycle, a quarterly compliance review — are supported.</p>

        <h3>Extension: custom agents</h3>

        <p>Customers on Scale and Agency tiers can define custom agents, which compose existing specialists or wrap bespoke tooling. Custom agents go through the same orchestration runtime, the same tool-use mediation, the same approval gates. A custom agent cannot escape the platform's governance model.</p>

        <p>Custom agent definition is covered in the Agent Configuration Guides in Section 03, and integration with external systems is covered in the <a href="#doc-api">API Reference</a>.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-data-flow">← Previous</a><a href="#doc-security-arch">Next → Security Architecture</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 2.4 — Security Architecture -->
    <article class="doc" data-tags="technical compliance" id="doc-security-arch">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">04</span>
            <span class="doc-time">3 min read</span>
            <span class="doc-audience">Audience: Security teams, information assurance, procurement</span>
          </div>
          <h3 class="doc-title">Security Architecture Documentation</h3>
          <p class="doc-blurb">Technical security architecture documentation — encryption, access control, infrastructure security, network segmentation, and monitoring. Includes compliance control mappings.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>This document describes the security architecture of the platform in the form expected by information-assurance teams and procurement security reviews. It covers cryptography, identity and access, network topology, monitoring, vulnerability management, and the control mappings maintained by the platform team.</p>

        <h3>Cryptography</h3>

        <p>Data is encrypted in transit and at rest. In transit, TLS 1.3 is required for every inbound and outbound connection; older versions are disabled. Certificate rotation is automated. At rest, AES-256 is used across all persistent stores, with keys managed in a regional KMS. A tenant-specific key hierarchy ensures that the compromise of a single workspace key is contained to that workspace.</p>

        <p>Secrets (integration credentials, API keys, OAuth refresh tokens) are stored in an isolated secrets vault with access restricted to the specific connector runtime that uses them. Secrets are never written to logs or telemetry.</p>

        <h3>Identity and access</h3>

        <p>Platform access is gated by a role-based permission model with fine-grained controls along four dimensions: <em>resource</em> (workspaces, agents, memory stores, connectors), <em>action</em> (read, write, approve, configure), <em>scope</em> (tenant, workspace, team), and <em>purpose</em> (the declared reason for access, used by the audit layer). Permissions are enforced at the storage and orchestration layers, not only at the application layer.</p>

        <p>Authentication supports SAML 2.0, OIDC, and enterprise identity providers including Microsoft Entra ID, Google Workspace, and Okta. Service accounts are separated from human accounts and have narrower permission scopes by default. Multi-factor authentication is enforced on administrative roles and strongly recommended on all roles; it can be made mandatory at the tenant level.</p>

        <h3>Network topology</h3>

        <p>The platform is segmented into a control plane (administration, configuration, secrets) and a data plane (ingestion, processing, storage, egress). The planes share no persistent credentials, and lateral movement between them is blocked by network policy.</p>

        <p>Egress is restricted. Specialist agents cannot make arbitrary outbound connections; every connection is mediated through the connector runtime, which enforces an allowlist derived from the tenant's declared integrations. Ingress is terminated at a managed edge with WAF protections and DDoS mitigation.</p>

        <p>Public-sector and single-tenant deployments run on private networking where supported, with customer-approved egress policies and optional connectivity through the customer's existing transit.</p>

        <h3>Monitoring and detection</h3>

        <p>Every layer emits structured telemetry to a tenant-bound observability stack and to a platform-wide security information stream. The security stream is processed by both automated detection rules (credential stuffing, anomalous egress, permission drift) and by the platform security team operating under a 24×7 rota.</p>

        <p>Tenant administrators can subscribe their own SIEM to the tenant telemetry feed. Integration with Microsoft Sentinel, Splunk, and generic syslog destinations is supported out of the box.</p>

        <h3>Vulnerability management</h3>

        <p>The platform runs a continuous vulnerability management programme that includes dependency scanning, container image scanning, infrastructure-as-code scanning, and quarterly penetration testing by an independent CREST-accredited firm. Critical findings have a 24-hour remediation SLA; high findings have 7 days; mediums 30 days.</p>

        <p>A public security.txt is published. The platform operates a responsible disclosure programme with clear reporting channels and — for qualifying tenants — a runbook for coordinated disclosure where a vulnerability is discovered in the course of that tenant's use.</p>

        <h3>Personnel security</h3>

        <p>Access to production by platform staff is controlled by just-in-time privileged access with mandatory peer review for the more sensitive classes of operation. All access is recorded in the audit stream; customers can request evidence of access to their tenant's infrastructure if a specific question arises.</p>

        <p>All staff complete annual security training and more frequent training when circumstances require it. Background checks are performed on the staff with access to production and on those working on customer deployments in regulated sectors.</p>

        <h3>Data handling obligations</h3>

        <p>The platform honours data-subject rights — access, rectification, erasure, portability, objection — at the tenant level. Rights request handling is documented for each right and exposed in the admin console as a structured workflow. See the <a href="#doc-data">Data Handling and Residency</a> for the specifics.</p>

        <h3>Compliance posture</h3>

        <p>Antarious maintains a control set mapped to ISO 27001, ISO 27017, ISO 27018, the NCSC 14 Cloud Security Principles, UK GDPR, EU GDPR, and the UK Data Protection Act 2018. Sector-specific controls are maintained where tenant deployments require them (for example, PCI DSS requirements for tenants processing card data, which Antarious does not handle directly but which affect connector scope). The specific mappings are maintained in Section 05 of this library and in the separately available procurement due-diligence pack.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-agent-arch">← Previous</a><a href="#doc-api">Next → API Reference</a></div>
        </div>
      </div></div>
    </article>

    <!-- Doc 2.5 — API Reference -->
    <article class="doc" data-tags="technical" id="doc-api">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta">
            <span class="doc-num">05</span>
            <span class="doc-time">3 min read</span>
            <span class="doc-audience">Audience: Developers, integration leads</span>
          </div>
          <h3 class="doc-title">API Reference</h3>
          <p class="doc-blurb">Complete API documentation for the Antarious platform, including authentication, endpoints, request and response schemas, rate limits, and error handling.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <p>The Antarious API is a REST-over-HTTPS interface designed for integrating the platform with systems that cannot be reached through shipped connectors. This document summarises the authentication model, the resource model, the principal endpoints, rate and quota behaviour, and the error taxonomy. Full endpoint-level reference, request and response schemas, and SDK links are available in the developer portal at <code>api.antarious.com/docs</code>.</p>

        <h3>Authentication</h3>

        <p>Two authentication schemes are supported. <strong>API keys</strong> are tenant-scoped credentials issued in the admin console, carried in the <code>Authorization: Bearer</code> header. Keys have declared scope and expiry. <strong>OAuth 2.0</strong> is supported for user-centric flows where an external application acts on behalf of an end user; the authorization code flow with PKCE is the supported pattern.</p>

        <p>Every authenticated call appears in the audit trail with the actor's identity, the scope used, and the result. A call with an expired or revoked credential is rejected at the edge and is not charged against the tenant's quota.</p>

        <h3>Resource model</h3>

        <p>The API is organised around the same resource types the platform uses internally: <code>workspaces</code>, <code>tasks</code>, <code>artefacts</code>, <code>approvals</code>, <code>memories</code>, <code>audit_events</code>, <code>connectors</code>, and <code>agents</code>. Resource URIs are stable and versioned under <code>/v1/</code>; breaking changes will appear under <code>/v2/</code> and are announced at least six months in advance.</p>

        <h3>Principal endpoints</h3>

        <div class="vz-code"><pre><span class="cm"># Initiate a Freya plan for a task</span>
POST <span class="ck">/v1/workspaces/:workspace_id/tasks</span>
{
  <span class="ck">"type"</span>: <span class="cs">"draft.donor_report"</span>,
  <span class="ck">"inputs"</span>: { <span class="ck">"programme_id"</span>: <span class="cs">"prg_1829"</span>, <span class="ck">"quarter"</span>: <span class="cs">"2026-Q1"</span> },
  <span class="ck">"purpose"</span>: <span class="cs">"Donor reporting — FCDO Q1 submission"</span>
}

<span class="cm"># Fetch a task's state and artefact</span>
GET <span class="ck">/v1/workspaces/:workspace_id/tasks/:task_id</span>

<span class="cm"># Approve or reject a pending artefact</span>
POST <span class="ck">/v1/approvals/:approval_id</span>
{ <span class="ck">"decision"</span>: <span class="cs">"approve"</span>, <span class="ck">"rationale"</span>: <span class="cs">"Reviewed against log frame v3."</span> }

<span class="cm"># Query the audit trail</span>
GET <span class="ck">/v1/audit_events?workspace=ws_12&amp;from=2026-04-01&amp;type=approval</span>

<span class="cm"># Subscribe to a webhook</span>
POST <span class="ck">/v1/webhooks</span>
{ <span class="ck">"url"</span>: <span class="cs">"https://example.org/hooks/freya"</span>, <span class="ck">"events"</span>: [<span class="cs">"task.completed"</span>, <span class="cs">"approval.requested"</span>] }</pre></div>

        <h3>Webhooks</h3>

        <p>Webhooks deliver asynchronous events to customer-owned endpoints. Events include task lifecycle (created, in-progress, awaiting approval, completed, cancelled), approval lifecycle (requested, decided, expired), artefact creation, and audit-event subscriptions. Deliveries are signed with HMAC-SHA256 using a tenant-specific secret; failed deliveries are retried with exponential backoff for up to 24 hours.</p>

        <h3>Rate limits and quotas</h3>

        <p>Rate limits are applied at two levels: a hard per-second ceiling to protect platform stability, and a per-hour quota tied to the tenant's plan. The response includes <code>X-RateLimit-Remaining</code> and <code>X-RateLimit-Reset</code> headers. Quotas are visible in the admin console and via <code>GET /v1/quota</code>.</p>

        <h3>Error handling</h3>

        <p>The API uses a consistent error envelope:</p>

        <div class="vz-code"><pre>{
  <span class="ck">"error"</span>: {
    <span class="ck">"type"</span>: <span class="cs">"validation_error"</span>,
    <span class="ck">"message"</span>: <span class="cs">"Field 'programme_id' is required."</span>,
    <span class="ck">"code"</span>: <span class="cs">"FIELD_REQUIRED"</span>,
    <span class="ck">"request_id"</span>: <span class="cs">"req_01HRT..."</span>
  }
}</pre></div>

        <p>Error <code>type</code> is a small, stable enumeration: <em>validation_error</em>, <em>authentication_error</em>, <em>authorization_error</em>, <em>not_found</em>, <em>rate_limited</em>, <em>conflict</em>, <em>platform_error</em>. <code>code</code> is a finer-grained stable identifier. <code>request_id</code> correlates with support and audit.</p>

        <h3>SDKs and examples</h3>

        <p>First-party SDKs are published for Python, TypeScript, and Go. Community-maintained wrappers exist for additional languages and are listed in the developer portal. Worked examples for the common use cases (initiate a task, subscribe to completions, export the audit trail, rotate a credential) live alongside the reference at <code>api.antarious.com/docs</code>.</p>

        <h3>Versioning and deprecation</h3>

        <p>Versioning is path-based (<code>/v1/</code>). Deprecations are announced in the developer portal, in the release notes, and by email to integration owners at least six months before removal. Every endpoint has a stable <code>X-API-Lifecycle</code> header value (<em>stable</em>, <em>beta</em>, <em>deprecated</em>, <em>sunset</em>) so automation can react to changes.</p>

        <div class="doc-foot">
          <div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div>
          <div class="doc-nav-links"><a href="#doc-security-arch">← Previous</a><a href="#sec-03">Next Section → Deployment &amp; Configuration</a></div>
        </div>
      </div></div>
    </article>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════ -->
<!-- SECTION 03 — DEPLOYMENT & CONFIGURATION                     -->
<!-- ══════════════════════════════════════════════════════════ -->
<section id="sec-03">
  <div class="page">
    <div class="eyebrow">Section 03</div>
    <h2 class="sec-title">Deployment and <em>Configuration</em></h2>
    <p class="sec-lead">Documentation for implementation teams, system administrators, and technical leads responsible for deploying and configuring Antarious for their organisation. Organised into four tracks: planning, integration, governance, and agent configuration.</p>

    <div class="sec-sub-mono">3.1 · Deployment Planning</div>

    <article class="doc" data-tags="technical" id="doc-deploy-plan">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">01</span><span class="doc-time">3 min read</span><span class="doc-audience">Project leads, technical architects, implementation partners</span></div>
          <h3 class="doc-title">Deployment Planning Guide</h3>
          <p class="doc-blurb">A comprehensive guide to planning an Antarious deployment — from data source mapping and integration design to role configuration and go-live preparation. Includes a deployment checklist.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>A well-planned Antarious deployment typically reaches productive use between weeks three and six, and reaches full scope between weeks eight and sixteen. The variance is driven less by the platform than by the organisation's own readiness — how clearly data sources are inventoried, how quickly governance decisions are made, and how much patience the team has for the initial approval-cadence tuning. This guide walks through the planning work that most strongly determines those factors.</p>

        <h3>Phase 0 — Inventory and intent</h3>
        <p>Before touching the admin console, produce three artefacts. A <em>data-source inventory</em> listing every system Freya will read from or write to, with a designated owner for each. A <em>purpose register</em> stating the intended use of the platform for each workspace — "donor reporting for the FCDO education portfolio" is a good purpose; "AI stuff" is not. A <em>stakeholder map</em> identifying the named human approvers for each severity level. These three artefacts answer the questions the configuration will shortly ask.</p>

        <h3>Phase 1 — Foundation (weeks 1–2)</h3>
        <p>Create the tenant in the chosen residency region. Configure SSO against your identity provider. Define the first workspace and assign the initial administrative role. Connect the two or three highest-value data sources — the ones without which the rest of the deployment has no purpose. Configure retention on each memory store. Commission the audit console for your compliance lead and confirm they can query successfully.</p>

        <h3>Phase 2 — First Useful Output (weeks 2–4)</h3>
        <p>Enable three to five agents — not the whole library. The aim is to produce one end-to-end artefact that a named approver signs off, so the team feels the full approve-before-execute rhythm. Choose agents whose outputs are low-stakes enough that the initial tuning does not create anxiety: typically a Copywriter, an Analytics agent, and a Document Generator or Report Generator for the sector. Run them on a narrow slice of real data, not a synthetic dataset.</p>

        <h3>Phase 3 — Approval Graph Tuning (weeks 3–6)</h3>
        <p>Refine the routing defaults to your organisation's actual review chain. Most deployments discover here that their existing approval conventions are less consistent than they thought — two donors require different approval depths, one government department routes to a legal reviewer that another does not. Tuning is iterative; expect two to three revisions before the graph feels natural.</p>

        <h3>Phase 4 — Widening Scope (weeks 4–10)</h3>
        <p>Enable additional agents. Add more data sources. Introduce workspace-per-programme or workspace-per-client patterns if your operating model benefits from them. Move routine actions from "always review" to "review exceptions only" as confidence builds. Configure scheduled workflows (Monday Brief, monthly M&amp;E cycle, quarterly compliance review).</p>

        <h3>Phase 5 — Go-live and beyond (weeks 8–16)</h3>
        <p>Full scope of agents and integrations active. The platform is running as part of the daily operating rhythm. Governance cadence includes a monthly approval-graph review, a quarterly compliance evidence generation, and a half-yearly deployment-health review against the success metrics the project sponsor defined in Phase 0.</p>

        <h3>Deployment checklist</h3>
        <ul>
          <li>Tenant created in correct residency region, SSO tested, MFA enforced on admin roles</li>
          <li>At least one workspace with a declared purpose and a named lead</li>
          <li>Approval graph defined for each severity level; senior-role escalation covered</li>
          <li>Data-source inventory complete; credentials rotated post-deployment</li>
          <li>Audit console accessible by compliance; first report generated end-to-end</li>
          <li>DPIA reviewed where personal data is in scope; retention set per store</li>
          <li>Training delivered to named approvers; operational runbook signed off</li>
          <li>Success metrics defined, baselined, and scheduled for review</li>
        </ul>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-readiness">Next → Readiness Assessment</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical" id="doc-readiness">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">02</span><span class="doc-time">2 min read</span><span class="doc-audience">Project leads, IT leads</span></div>
          <h3 class="doc-title">Pre-Deployment Readiness Assessment</h3>
          <p class="doc-blurb">A structured assessment of your organisation's readiness for an Antarious deployment — covering data infrastructure, integration prerequisites, governance structures, and team readiness.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Deployments fail — or more commonly, under-deliver — for reasons that are usually detectable in advance. This assessment surfaces those reasons while a deployment is still cheap to adjust. Run it before signing a contract, not after.</p>

        <h3>Readiness dimension 01 · Data infrastructure</h3>
        <p>Can you name a source of truth for your core data? If three systems disagree about the number of active customers, programmes, or beneficiaries, Freya will inherit that ambiguity. The platform does not resolve authority disputes — it surfaces them and escalates. Before deployment, nominate a source of truth for each major data domain and commit to it.</p>
        <p>Evaluate credential hygiene on your integration targets. Shared service accounts, unrotated keys, and admin-level accounts used for daily work are all common — but they make the audit trail less meaningful. A clean deployment pairs with a credential-rotation exercise.</p>

        <h3>Readiness dimension 02 · Governance</h3>
        <p>Approval graphs require named approvers. Organisations that run on implicit delegation ("Sam usually signs off on this") struggle here. Before deployment, establish named roles for at least three severity levels and at least one backup per role.</p>
        <p>Where regulated data is in scope, you will need a DPIA (if under UK or EU GDPR) or equivalent impact assessment. The platform team can provide templates. Allow four weeks for this to complete if it is not already in place.</p>

        <h3>Readiness dimension 03 · Team</h3>
        <p>You need an executive sponsor who will make the "how tight is the approval graph?" call when the team cannot agree. You need an operational lead who will own the day-to-day running of the deployment. You need a technical contact for the connector configuration. These three roles must be staffed before kick-off; implementation partners can augment them, not replace them.</p>

        <h3>Readiness dimension 04 · Change capacity</h3>
        <p>Antarious changes how approvers spend their time. Instead of reading drafts slowly, they review AI-assisted drafts quickly and at higher volume. This is a shift some individuals find easier than others. The deployment is more durable when approvers are included in the decision to adopt rather than surprised by it.</p>

        <h3>Self-scoring</h3>
        <p>Score each dimension 1 (not ready) to 5 (ready). A combined score above 14 typically predicts a smooth deployment. Below 10, the deployment is likely to underperform unless foundational work is completed first. Between 10 and 14, the deployment will work, but expect some friction in the first two phases — and build the friction into your timeline rather than pretending it will not happen.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-deploy-plan">← Previous</a><a href="#doc-integ-prereq">Next → Integration Prerequisites</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical" id="doc-integ-prereq">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">03</span><span class="doc-time">2 min read</span><span class="doc-audience">Technical leads, integration developers</span></div>
          <h3 class="doc-title">Integration Prerequisites by Data Source</h3>
          <p class="doc-blurb">Specific prerequisite requirements for integrating Antarious with common data sources — CRM platforms, marketing tools, government information systems, field data platforms, ERP systems, and more.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>This document lists the prerequisites for the most commonly integrated source systems. Each section names the credentials required, the required permission scopes, expected rate limits, and the field-mapping decisions that you should make before the connector is configured.</p>

        <h3>CRM platforms (Salesforce, HubSpot, Salesforce NPSP)</h3>
        <p>Create a dedicated integration user with a least-privilege profile that includes Read and Modify on the objects in scope (typically Account, Contact, Opportunity, plus custom objects for NPSP). Grant API-only access so the user has no UI privileges. Enable refresh-token OAuth and record the token rotation policy. Decide in advance which CRM fields are authoritative and which are derived — Freya will write back to derived fields, not authoritative ones.</p>

        <h3>Field data platforms (ODK, KoBoToolbox, SurveyCTO, CommCare, DHIS2)</h3>
        <p>Issue a service account with project-scoped read on the forms in scope. For KoBo, generate a project token rather than using your personal token. For DHIS2, scope the service account to the specific data elements and organisation units needed; the default "all organisation units" scope is almost never appropriate. Confirm the form schema is stable — schema changes can force re-ingestion of prior submissions.</p>

        <h3>Government information systems (SharePoint, Microsoft 365, SAP, Oracle ERP, ServiceNow, Power BI, SQL)</h3>
        <p>These integrations typically require a named enterprise application registration and administrative consent. Define the specific sites, libraries, or tables in scope — avoid tenant-wide grants. For SAP and Oracle ERP, configure read-only service users and negotiate the connection through your existing middleware (BTP, OIC) where standards require it. For SQL databases, connect via a read replica where possible and scope the service user to the specific schemas and tables in scope.</p>

        <h3>Marketing and outreach (Meta, Google, LinkedIn, Klaviyo, Instantly, Apollo, ZoomInfo, SEMrush)</h3>
        <p>Most of these platforms require App/Business Manager-level access to generate credentials with campaign-level scope. LinkedIn requires a developer app with specific product grants. Meta requires business verification and specific scope grants per platform (pages, ads, analytics). Expect a 48-hour window for scope requests on LinkedIn; plan around it.</p>

        <h3>Analytics and data warehouse (Snowflake, GA4, Tableau, Power BI)</h3>
        <p>For Snowflake, create a role scoped to the specific databases and schemas Freya will read. For GA4, grant the integration service account the Viewer or Analyst role on the property in scope. For Tableau and Power BI, choose embedded-query credentials or export-driven integrations based on where the authoritative data lives — Freya reads both, but writes should be rare.</p>

        <h3>Generic REST and webhook targets</h3>
        <p>For custom integrations, use the Antarious REST connector with an API-key or OAuth client-credential scheme. Declare the specific endpoints in scope; the connector will not call endpoints outside the declared allowlist. For webhook receivers, verify the HMAC signatures on every incoming call — do not treat webhook bodies as trustworthy.</p>

        <h3>Rate-limit posture</h3>
        <p>Each connector has a rate-limit budget that respects the upstream system's documented limits. For high-volume integrations (a large Salesforce org, a busy Meta ads account), the rate-limit budget is tunable in the admin console. Do not set the budget higher than the upstream system tolerates; over-aggressive polling is detectable and leads to throttling.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-readiness">← Previous</a><a href="#doc-integ-overview">Next → Integration Guide Overview</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">3.2 · Integration Configuration</div>

    <article class="doc" data-tags="technical" id="doc-integ-overview">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">04</span><span class="doc-time">2 min read</span><span class="doc-audience">Integration developers, IT leads</span></div>
          <h3 class="doc-title">Integration Guide — Overview</h3>
          <p class="doc-blurb">How to connect Antarious to your existing data sources and tools — authentication methods, data mapping, field configuration, and testing.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>An Antarious integration is a scoped, credentialed, audited connection to an external system. The pattern is the same across every shipped connector: authenticate, declare the scope, map the fields, test in a sandbox, promote to production with live traffic, monitor.</p>

        <h3>Authentication patterns</h3>
        <p>Three authentication patterns cover the vast majority of integrations. <strong>OAuth 2.0 (authorization code)</strong> — the integration runs as a named user and inherits that user's permissions. <strong>Client-credentials / service account</strong> — the integration runs as an application with a declared service role. <strong>API key</strong> — the integration runs against a pre-shared secret. Prefer OAuth where the upstream supports it; prefer service account where a long-lived integration needs stable permissions independent of a user account; use API keys only where the first two are unavailable.</p>

        <h3>Field mapping</h3>
        <p>Field mapping declares which upstream fields correspond to which platform concepts. The mapping is declarative and versioned — a change in mapping is an audit event and is not applied retrospectively to historical data. Reserve the first week of a connector's life for mapping iteration; expect to refine the map as edge cases surface.</p>

        <h3>Sync cadence</h3>
        <p>Connectors support scheduled pull, webhook push, or both. Prefer webhooks where the upstream supports them — they are cheaper, lower-latency, and produce less upstream load. Scheduled pulls are essential where the upstream emits no events; tune the cadence to the operational need, not to the theoretical maximum.</p>

        <h3>Testing</h3>
        <p>Every new connector is created in sandbox mode by default. Run a minimum of three end-to-end task invocations in sandbox before promoting to production. Confirm that field values reconcile, that write-backs do not corrupt source data, and that rate limits are respected. Promote to production only after sandbox has survived a weekend without intervention.</p>

        <h3>Monitoring</h3>
        <p>Once live, a connector is monitored for authentication failures, rate-limit pressure, schema drift (unexpected fields or missing fields), and payload anomalies. Alerts surface in the admin console and in any SIEM that subscribes to the platform telemetry feed.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-prereq">← Previous</a><a href="#doc-integ-crm">Next → CRM Integration Guide</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical business" id="doc-integ-crm">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">05</span><span class="doc-time">2 min read</span><span class="doc-audience">Covers: Salesforce, HubSpot, Salesforce NPSP</span></div>
          <h3 class="doc-title">Integration Guide — CRM Platforms</h3>
          <p class="doc-blurb">Step-by-step integration configuration for CRM platforms, including field mapping, sync frequency, object permissions, and testing procedures.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>CRM integrations are the most commonly deployed of the shipped connectors. This guide walks through Salesforce (including NPSP for non-profit deployments) and HubSpot end-to-end. The pattern is similar in both cases: create a named integration application, grant object-scoped access, map fields, promote.</p>

        <h3>Salesforce (including NPSP)</h3>
        <p>Create a Connected App in Salesforce Setup with OAuth scopes for <code>api</code>, <code>refresh_token</code>, and <code>offline_access</code>. Restrict the app to Named Users and assign the integration user the least-privilege profile described in the prerequisites document. Generate the Consumer Key and Consumer Secret. In Antarious admin, paste both into the Salesforce connector and complete the authorisation flow.</p>
        <p>Define the object scope. Accounts, Contacts, Opportunities are the usual base; for NPSP add Contact-Account relationships, Soft Credit, Recurring Donation, and the relevant custom objects. Exclude objects Freya will not need — a narrower scope is safer and reduces audit noise.</p>
        <p>Field mapping is the decision-heavy step. Distinguish authoritative fields (do not write back), derived fields (Freya writes to these with approval), and narrative fields (freely writeable by Freya with approval). Record the choice; it will be re-examined in every quarterly review.</p>

        <h3>HubSpot</h3>
        <p>Create a Private App in HubSpot with scopes for CRM Objects, Engagements, Conversations, and Files as needed. Copy the access token to the Antarious connector. Configure object scope similarly to Salesforce; HubSpot's lifecycle-stage field is a common authoritative-vs-derived boundary decision.</p>

        <h3>Write-back patterns</h3>
        <p>The three common write-back patterns are: log-only (Freya creates activity records, never updates object fields); field update (Freya updates a narrow set of derived fields with approval); full update (Freya writes to authoritative fields). Most deployments start at log-only for the first month, move to field update in month two, and rarely move to full update without a specific business case.</p>

        <h3>Testing</h3>
        <p>Create three test records in the CRM. Run a plan that reads each and proposes a write-back. Confirm the approval surfaces correctly, the write lands in the correct field, and the audit trail records the upstream record ID. Repeat with a rejected approval and confirm the write does not occur.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-overview">← Previous</a><a href="#doc-integ-field">Next → Field Data Integration</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical ngo" id="doc-integ-field">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">06</span><span class="doc-time">2 min read</span><span class="doc-audience">Covers: ODK Collect, KoBoToolbox, SurveyCTO, CommCare, DHIS2</span></div>
          <h3 class="doc-title">Integration Guide — Field Data Platforms</h3>
          <p class="doc-blurb">Integration configuration for field data collection and health information platforms, including form schema mapping, submission handling, and data validation.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Field data platforms are distinctive because their schemas evolve with the programmes that use them. A form that collects beneficiary attendance in April does not collect the same fields in October. The connector is built to tolerate schema change without losing historical data.</p>

        <h3>ODK Collect and KoBoToolbox</h3>
        <p>Generate a project-scoped token on the ODK Central or KoBo server. Paste the server URL and token into the Antarious connector. Select the forms in scope; each form is treated as a distinct ingestion stream. Submissions arrive via webhook if the server supports it, or via scheduled poll otherwise.</p>
        <p>Form schema is fetched on each sync; a schema change produces a <em>schema revision</em> event in the audit trail. Historical submissions remain under the schema they were submitted against; Freya reasons about them with awareness of the schema history.</p>

        <h3>SurveyCTO</h3>
        <p>Create a SurveyCTO API user and grant access to the forms in scope. The connector supports both the REST API and the XForm endpoint; prefer REST where available for richer metadata.</p>

        <h3>CommCare</h3>
        <p>CommCare integrations are case-centred. Configure the connector against the relevant project space with a scoped API key; select the case types in scope. Freya reads cases, case updates, and associated forms, and can propose case updates through the approval gate.</p>

        <h3>DHIS2</h3>
        <p>DHIS2 deployments are heterogeneous — data elements, category combos, and organisation-unit hierarchies vary widely between instances. Configure the connector against a specific DHIS2 user with the minimum organisation-unit scope required. Import data elements by ID rather than by name to avoid collisions in multilingual deployments.</p>

        <h3>PII and consent</h3>
        <p>Field data frequently contains personal data about beneficiaries. Every connector in this category is configured with mandatory PII tagging and a declared consent framework. An agent cannot read a beneficiary record for a purpose that is not covered by the recorded consent, even within the tenant boundary.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-crm">← Previous</a><a href="#doc-integ-gov">Next → Government Information Systems</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical government" id="doc-integ-gov">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">07</span><span class="doc-time">2 min read</span><span class="doc-audience">Covers: SharePoint, Microsoft 365, SAP, Oracle ERP, ServiceNow, Power BI, SQL databases</span></div>
          <h3 class="doc-title">Integration Guide — Government Information Systems</h3>
          <p class="doc-blurb">Integration configuration for government and enterprise information systems, including authentication, data access scoping, and security configuration.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Government information systems are typically large, heterogeneous, and governed by their own security baselines. Integrations with these systems are more conservative by default than commercial connectors — narrower scopes, stricter network paths, and more explicit change control.</p>

        <h3>SharePoint and Microsoft 365</h3>
        <p>Register an enterprise application in Microsoft Entra ID (formerly Azure AD) with the application permissions required: Sites.Selected for SharePoint, Mail.Read where email content is in scope, and explicit grants per site. Administrative consent is required; do not use tenant-wide Sites.ReadAll except under explicit governance authority. Assign the app to the specific sites in scope with site-level role grants.</p>

        <h3>SAP</h3>
        <p>SAP integrations route through SAP Business Technology Platform (BTP) or through an existing SAP-ERP middleware layer. The connector authenticates through the middleware with service credentials scoped to the specific modules and transactions in scope. Read-only roles are the default; write-back is discouraged in public-sector deployments without explicit change-management approval.</p>

        <h3>Oracle ERP</h3>
        <p>For Oracle ERP Cloud, use the REST APIs with a named integration user. For on-premises E-Business Suite, route through Oracle Integration Cloud or an equivalent middleware. In both cases, scope access to the specific business objects in use, and prefer read replicas where possible.</p>

        <h3>ServiceNow</h3>
        <p>Configure a ServiceNow integration user with table-scoped read and create/update permissions where write-back is needed. Prefer the Scripted REST API for bespoke queries over the generic Table API, as it keeps the integration narrower and easier to audit.</p>

        <h3>Power BI</h3>
        <p>Two patterns: read the underlying data sources directly (preferred) or read via the Power BI REST API (where source access is not available). If reading via Power BI, scope to specific workspaces and report datasets; avoid the admin-only APIs unless no narrower alternative exists.</p>

        <h3>SQL databases</h3>
        <p>Connect to a read replica rather than the primary where the architecture supports it. Use a database role scoped to specific schemas. Prefer TLS-bound connections to private networking paths, and record the connection identity in the integration metadata so a DBA can correlate platform reads with database telemetry.</p>

        <h3>Network topology</h3>
        <p>Public-sector deployments typically require private connectivity rather than public internet egress. The platform supports Azure ExpressRoute, AWS Direct Connect, and equivalents on request for qualifying customers. Configure the integration to egress through the private path and block the public fallback.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-field">← Previous</a><a href="#doc-integ-marketing">Next → Marketing &amp; Outreach</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical business" id="doc-integ-marketing">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">08</span><span class="doc-time">2 min read</span><span class="doc-audience">Covers: Meta, Google, LinkedIn, Klaviyo, Instantly, Apollo, ZoomInfo, SEMrush</span></div>
          <h3 class="doc-title">Integration Guide — Marketing and Outreach Platforms</h3>
          <p class="doc-blurb">Integration configuration for marketing and outreach tools, including API authentication, campaign data sync, and attribution configuration.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Marketing platforms are fast-moving — ad creative, budget allocation, audience targeting, campaign status change in near real time. The connectors here support both read and write paths, and write-back is a more common pattern than in the governance-heavy integrations.</p>

        <h3>Meta (Facebook, Instagram)</h3>
        <p>Complete Meta Business Verification for the org. Create a System User in Business Manager with Admin or Employee role as appropriate; generate an access token scoped to the pages, ad accounts, and pixels in use. Paste into the Antarious Meta connector. For ad management, the Meta Ads Agent will propose campaign changes; all changes pass through the approval gate before execution.</p>

        <h3>Google Ads and GA4</h3>
        <p>For Google Ads, create a Manager account (MCC) or grant the integration service account admin access to the specific ad account. Generate a developer token. For GA4, grant the service account Viewer or Analyst role on the property.</p>

        <h3>LinkedIn</h3>
        <p>Register a LinkedIn Developer App with the specific product grants needed (Marketing Developer Platform for ads, Sales Navigator for prospect signals, and so on). Several grants require LinkedIn approval; plan for a 48-hour review window. Limit the grants to those in active use — reducing grants later is straightforward but requires a small amount of downtime.</p>

        <h3>Klaviyo, Instantly</h3>
        <p>Both platforms support API-key authentication. In Klaviyo, create a Private API Key with full access to Profiles, Lists, Events, and Campaigns. In Instantly, generate a workspace-scoped API key. For both, configure the campaign-level webhook subscriptions so Freya sees delivery, open, and reply events in near real time.</p>

        <h3>Apollo, ZoomInfo, SEMrush</h3>
        <p>All three use API-key authentication against their respective data platforms. Respect each platform's rate budget; high-volume prospect lookups (10k+ records per day) frequently trigger throttling or contract-limit warnings. The platform will surface these at the connector level.</p>

        <h3>Attribution configuration</h3>
        <p>Once the connectors are live, configure the attribution model the Analytics Agent will run. Five models are supported: first-touch, last-touch, linear, time-decay, and position-based (40-20-40). The default is position-based; attribution windows are 30 days post-click and 1 day post-view for paid, and 90 days for organic touchpoints. These defaults can be tuned per tenant.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-gov">← Previous</a><a href="#doc-integ-analytics">Next → Analytics &amp; Data Warehouse</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical" id="doc-integ-analytics">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">09</span><span class="doc-time">2 min read</span><span class="doc-audience">Covers: Snowflake, Google Analytics 4, Tableau, Power BI</span></div>
          <h3 class="doc-title">Integration Guide — Analytics and Data Warehouse</h3>
          <p class="doc-blurb">Integration configuration for analytics and data warehouse platforms, including query permissions, data model mapping, and dashboard sync.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Analytics and warehouse integrations are mostly read-focused. Freya queries the warehouse for evidence that supports the artefacts she produces; she rarely writes back to it. The integration pattern therefore prioritises safe, performant reads and avoids the write-back considerations that dominate CRM integrations.</p>

        <h3>Snowflake</h3>
        <p>Create a role scoped to the specific databases and schemas in use; grant USAGE on the warehouse plus SELECT on the objects in scope. Use a named service account with password-plus-key-pair authentication. Configure a query tag so platform queries are identifiable in Snowflake's query history.</p>

        <h3>GA4</h3>
        <p>Grant the integration service account Viewer or Analyst role on the property. The connector uses the GA4 Data API for analysis queries and the Admin API for property metadata. Configure the cadence — typically daily is enough for analysis queries; hourly for anomaly detection.</p>

        <h3>Tableau and Power BI</h3>
        <p>Both platforms support embedded-query authentication through their respective REST APIs. Prefer to connect Freya directly to the data source underneath the dashboard rather than to the dashboard itself — this allows Freya to re-query in a different shape rather than being constrained to the dashboard's filter panel. Where the dashboard contains derivations not present in the source, the dashboard-layer integration remains available.</p>

        <h3>Data model mapping</h3>
        <p>Map warehouse tables to platform concepts. A fact table of campaign performance maps to the Analytics Agent's performance view; a dimension table of customers maps to the ICP Researcher's profile view. The mapping is versioned; a change is an audit event.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-marketing">← Previous</a><a href="#doc-integ-rest">Next → REST API Integration</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical" id="doc-integ-rest">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">10</span><span class="doc-time">2 min read</span><span class="doc-audience">Developers building custom integrations</span></div>
          <h3 class="doc-title">REST API Integration Guide</h3>
          <p class="doc-blurb">How to build a custom integration using the Antarious REST API — authentication, webhook configuration, data ingestion endpoints, and output delivery configuration.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Custom integrations extend Antarious to sources not covered by shipped connectors. The REST API is the supported surface; this guide walks through the design pattern for a typical custom integration end-to-end.</p>

        <h3>Pattern</h3>
        <p>A well-formed custom integration consists of four parts: an <em>ingestion path</em> (the external system pushes data into Antarious, or Antarious pulls from it), a <em>schema declaration</em> (the shape of the data being exchanged), a <em>webhook subscription</em> (so the external system can react to approval and execution events), and a <em>governance binding</em> (scoped API keys, declared purpose, audit coverage).</p>

        <h3>Authentication</h3>
        <p>Create an API key in the admin console scoped to the specific endpoints the integration uses and with the narrowest permission bundle that works. Record the expected rotation cadence at issuance — rotate at least annually; more frequently for high-volume integrations.</p>

        <h3>Ingesting data</h3>
        <p>To push data into Antarious, <code>POST /v1/workspaces/:workspace_id/memories</code> with a record that declares its type, its PII tag, and its purpose. Records are validated at ingestion; invalid records return a structured error and do not land in the memory layer. For high-volume ingestion, use batched endpoints (<code>POST /v1/memories:batch</code>) with up to 500 records per call.</p>

        <h3>Subscribing to webhooks</h3>
        <p>Subscribe to the events your integration needs: <code>task.completed</code>, <code>approval.requested</code>, <code>approval.decided</code>, <code>artefact.created</code>, <code>audit_event.created</code>. Each delivery is HMAC-signed; verify the signature on every call. Failed deliveries are retried with exponential backoff for 24 hours.</p>

        <h3>Receiving approved outputs</h3>
        <p>When Freya produces an artefact intended for a custom destination, the delivery is a webhook-driven event; the payload references the artefact in the platform's document store, and the subscriber fetches the content via an authenticated read. This keeps artefacts inside the tenant boundary and ensures the fetch itself is audited.</p>

        <h3>Error handling and idempotency</h3>
        <p>All writes support an <code>Idempotency-Key</code> header; use a UUID per logical operation. Errors return the platform's consistent error envelope with a <code>request_id</code> that correlates to platform-side logs and audit events.</p>

        <h3>Testing and promotion</h3>
        <p>Start in a sandbox workspace with synthetic data. Move to a production workspace with a narrow scope (one real data source, one small cohort of approvers) and widen once stability is established. Every ingestion endpoint tags records with the source integration ID, so an integration that misbehaves can be quickly bounded.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-analytics">← Previous</a><a href="#doc-role-config">Next → Role Configuration</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">3.3 · Role and Governance Configuration</div>

    <article class="doc" data-tags="technical compliance" id="doc-role-config">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">11</span><span class="doc-time">2 min read</span><span class="doc-audience">System administrators, governance leads</span></div>
          <h3 class="doc-title">Role Configuration Guide</h3>
          <p class="doc-blurb">How to configure user roles, permission sets, data access scopes, and approval authority boundaries in Antarious. Includes worked examples for government, NGO, and enterprise deployments.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Roles in Antarious are the mechanism that ties together permissions, scope, and approval authority. A well-designed role set is the difference between a deployment that operates smoothly and a deployment whose approval queue becomes a bottleneck. This guide walks through the role model, the permission dimensions, and three worked examples drawn from real deployments.</p>

        <h3>The four permission dimensions</h3>
        <p>Every role is defined along four independent dimensions:</p>
        <ul>
          <li><strong>Resource</strong> — which workspaces, agents, memory stores, connectors the role can address.</li>
          <li><strong>Action</strong> — read, write, approve, configure.</li>
          <li><strong>Scope</strong> — tenant-wide, workspace-specific, team-specific.</li>
          <li><strong>Purpose</strong> — the declared reasons for which the role can exercise its permissions.</li>
        </ul>
        <p>A permission is the intersection of the four. A role can read programme data (resource: memory, action: read) in the East Africa workspace (scope) for reporting purposes (purpose). The same role cannot read the same data for an operational purpose unless that purpose is also granted.</p>

        <h3>Built-in role archetypes</h3>
        <p>The platform ships with a set of archetypes that cover common patterns: <em>Administrator</em>, <em>Workspace Lead</em>, <em>Operator</em>, <em>Approver</em>, <em>Auditor</em>, <em>Viewer</em>, <em>Integration Service Account</em>. Start from an archetype and narrow it. Creating roles from scratch is supported but rarely necessary.</p>

        <h3>Worked example — GTM agency</h3>
        <p>An agency running Antarious on behalf of clients typically uses: <em>Agency Admin</em> (tenant-wide admin, not granted to client personnel), <em>Client Lead</em> (workspace-scoped admin for a single client), <em>Content Strategist</em> (approve on content artefacts in the workspace), <em>Media Buyer</em> (approve on paid-media actions up to a budget threshold), <em>Viewer</em> (read-only for client-side stakeholders reviewing the work).</p>

        <h3>Worked example — government department</h3>
        <p>A ministry typically uses: <em>Permanent Secretary</em> (approve critical-severity actions), <em>Director</em> (approve high-severity actions), <em>Policy Lead</em> (approve medium-severity policy outputs), <em>Operations Lead</em> (approve medium-severity operational outputs), <em>Legal Reviewer</em> (mandatory parallel approver on public-facing outputs), <em>Auditor</em> (read-only audit access scoped to a department with a time-bound grant during an engagement).</p>

        <h3>Worked example — NGO / development organisation</h3>
        <p>A programme office typically uses: <em>Country Director</em> (approve programme-level actions), <em>Programme Manager</em> (approve programme-specific operational actions), <em>M&amp;E Officer</em> (approve donor report drafts), <em>Field Team Lead</em> (submit and approve field data), <em>Compliance Officer</em> (parallel approver on donor-facing outputs), <em>Donor Liaison</em> (view-only with access to donor-scoped artefacts only).</p>

        <h3>Principle of least privilege</h3>
        <p>The tempting shortcut is to grant broad permissions early and narrow them later. In practice, narrowing is harder than widening — users get used to seeing what they see. Grant the minimum, widen in response to an articulated need, and review quarterly.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-integ-rest">← Previous</a><a href="#doc-approval-config">Next → Approval Workflow Config</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical compliance" id="doc-approval-config">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">12</span><span class="doc-time">2 min read</span><span class="doc-audience">System administrators, operations leads</span></div>
          <h3 class="doc-title">Approval Workflow Configuration Guide</h3>
          <p class="doc-blurb">How to design and configure approval workflows — single approver, sequential, parallel, conditional routing, and threshold-based escalation. Includes workflow templates for common use cases.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Approval workflows are the configurable expression of your organisation's governance on top of the platform's invariant Human-in-the-Loop architecture. A workflow declares, for a class of action, who must approve, in what order, and under what conditions.</p>

        <h3>Workflow primitives</h3>
        <p>Workflows compose from a small set of primitives: <em>Approver</em> (a role or named user), <em>Gate</em> (a decision point that halts execution), <em>Branch</em> (conditional routing on an attribute), <em>Parallel</em> (multiple approvers in any order), <em>Sequence</em> (approvers in declared order), <em>Escalation</em> (a timer that routes to a fallback approver if the primary does not respond).</p>

        <h3>Common templates</h3>
        <ul>
          <li><strong>Single review</strong> — one approver. Suited to low-severity standard content.</li>
          <li><strong>Two-step review</strong> — content review then line-manager sign-off. Suited to standard external output.</li>
          <li><strong>Parallel legal + policy</strong> — both approvers must clear in any order. Suited to public-facing communications.</li>
          <li><strong>Threshold budget</strong> — routes on budget value; under £X to Media Buyer, over £X to Director, over £Y to CFO.</li>
          <li><strong>Sequential donor</strong> — M&amp;E Officer drafts, Programme Manager reviews, Country Director approves.</li>
        </ul>

        <h3>Escalation patterns</h3>
        <p>Every workflow should specify what happens if the primary approver is unavailable. Defaults: 24-hour SLA before escalation, fallback to a named delegate, second-tier fallback to the role's line manager. Workflows with an uncovered fallback path are flagged during design review.</p>

        <h3>Version control</h3>
        <p>Workflows are versioned. A change to a workflow is an audit event; the workflow in force at the moment of each approval is preserved so an auditor can reconstruct the governance state that authorised a past action.</p>

        <h3>Simulation</h3>
        <p>Before promoting a new workflow, simulate it with a test action. The simulator walks through the routing and surfaces who would be asked, in what order, and what the fallback path is. Most misconfigurations surface in simulation rather than in production.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-role-config">← Previous</a><a href="#doc-delegation">Next → Delegation &amp; Temporary Access</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="compliance" id="doc-delegation">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">13</span><span class="doc-time">2 min read</span><span class="doc-audience">System administrators</span></div>
          <h3 class="doc-title">Delegation and Temporary Access Configuration</h3>
          <p class="doc-blurb">How to configure delegation arrangements, temporary access grants, and the associated governance controls that ensure these mechanisms operate within defined boundaries.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Delegation is the most abused feature in most approval systems. It is also indispensable — a director on leave cannot hold up every approval for a week. Antarious supports delegation with a set of governance controls that preserve accountability even when the named approver is not the acting approver.</p>

        <h3>Delegation forms</h3>
        <p>Three forms are supported:</p>
        <ul>
          <li><strong>Scheduled delegation</strong> — declared in advance for a specific window. Often used for planned absence.</li>
          <li><strong>Standing delegation</strong> — a permanent delegate for a specific action class. Used where the primary approver has a subject deputy.</li>
          <li><strong>Ad-hoc delegation</strong> — an approver delegates a specific pending action to a specific person. Carries a mandatory rationale.</li>
        </ul>

        <h3>Boundaries</h3>
        <p>Delegation cannot exceed the delegator's own authority — a director cannot delegate critical-severity approvals if the director does not themselves hold that authority. Delegation cannot be recursive more than one step: a delegate cannot re-delegate. Delegation of mandatory legal or compliance approvals is restricted to specific named deputies.</p>

        <h3>Time-bound access</h3>
        <p>External auditors and time-limited consultants receive time-bound access grants. A grant declares a role, a scope, a purpose, and an end-time. At the end-time the grant expires automatically; the grantor can extend with a new audit event. Every grant is surfaced on the governance dashboard so an administrator can see all currently active external access at a glance.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-approval-config">← Previous</a><a href="#doc-sso">Next → SSO &amp; Identity Provider</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical" id="doc-sso">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">14</span><span class="doc-time">2 min read</span><span class="doc-audience">IT administrators, security teams</span></div>
          <h3 class="doc-title">SSO and Identity Provider Integration</h3>
          <p class="doc-blurb">How to configure single sign-on integration with enterprise identity providers — Microsoft Entra ID, Google Workspace, Okta, and SAML 2.0-compliant providers.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>SSO is strongly recommended and, for tenants on the Scale and Agency plans, enforced by default. This guide walks through configuration for the three most common identity providers and for generic SAML 2.0 providers.</p>

        <h3>Microsoft Entra ID (formerly Azure AD)</h3>
        <p>Register Antarious as an Enterprise Application. Configure SAML-based sign-on with the ACS URL and entity ID provided in the Antarious admin console. Map the necessary claims: <code>emailaddress</code>, <code>name</code>, <code>groups</code> (if group-based role assignment is used). Grant user or group access to the application; by default, no one can log in to Antarious even after the app exists.</p>
        <p>For SCIM-based provisioning, configure the Antarious SCIM endpoint with the provided bearer token. Provisioning creates and deactivates accounts in sync with your directory; deactivated users lose access immediately, and their pending approvals route to the delegated fallback.</p>

        <h3>Google Workspace</h3>
        <p>Create a SAML application in the Admin console. Import the Antarious metadata XML. Map primary email and name; group memberships can be mapped via custom attributes. Grant organisational-unit-level access to the app. SCIM is not supported for Google Workspace at time of writing; accounts are provisioned just-in-time on first login.</p>

        <h3>Okta</h3>
        <p>Create a SAML 2.0 app from the Antarious integration in the Okta catalogue (or create a generic SAML app and paste the Antarious metadata). Assign users or groups. For SCIM, use Okta's Lifecycle Management add-on with the Antarious SCIM endpoint.</p>

        <h3>Generic SAML 2.0</h3>
        <p>Any SAML 2.0-compliant IdP works. Import the Antarious SP metadata, configure ACS and entity ID, map the required claims, and grant access. If your IdP supports SCIM 2.0, provisioning is available through the same endpoint as the named providers above.</p>

        <h3>MFA and conditional access</h3>
        <p>MFA is enforced at the IdP level rather than at the Antarious level; this is deliberate, so that MFA policy remains under the customer's existing controls. If your IdP supports conditional access (device compliance, location, risk), those policies are the recommended way to strengthen access to the platform.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-delegation">← Previous</a><a href="#doc-agent-gtm">Next → Agent Configuration — Business</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">3.4 · Agent Configuration</div>

    <article class="doc" data-tags="technical business" id="doc-agent-gtm">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">15</span><span class="doc-time">2 min read</span><span class="doc-audience">GTM operations leads, system administrators, implementation partners</span></div>
          <h3 class="doc-title">Agent Configuration Guide — Business Agents</h3>
          <p class="doc-blurb">Configuration reference for the 13 business agents — Strategy, Content, Lead, Outreach, Analytics, Optimisation, Reporting, and Alert agents. Includes parameter reference and configuration examples.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>This guide covers the 13 business agents: how to enable them, how to tune them to your organisation's voice and policies, and how to compose them into the workflows that drive the GTM operating rhythm.</p>

        <h3>Enabling agents</h3>
        <p>Open the workspace's Agent Library in the admin console. Each agent has an enable toggle, a description of what it does, the data sources it reads from, and the actions it produces. Enable only the agents you intend to use — disabled agents are invisible to Freya's planning loop and cost nothing.</p>

        <h3>Per-agent configuration</h3>
        <p><strong>GTM Strategist</strong> — define the markets, channels, and budget ceilings in scope. Attach the ICP record the strategist should optimise against.</p>
        <p><strong>ICP Researcher</strong> — connect to the CRM win/loss data. Declare whether to include open opportunities as signal or restrict to closed-won.</p>
        <p><strong>Competitor Intel</strong> — add the competitors to track. The connector-level budget determines how often the competitor sites, ad libraries, and review platforms are polled.</p>
        <p><strong>Copywriter</strong> — attach the brand guideline memory store. Define the banned-phrase list and the voice descriptors (formal/conversational, confident/measured).</p>
        <p><strong>Meta Ads</strong> — select the ad accounts in scope. Declare the budget autonomy threshold: under $X the agent can reallocate within a campaign without approval; over $X it requires Media Buyer sign-off.</p>
        <p><strong>SEO</strong> — connect Search Console and the content management system. Declare the publishing surface (blog, resources, landing pages) and the approval gate for new pages.</p>
        <p><strong>Social Media</strong> — connect the social accounts in scope. Define the posting cadence and the approval workflow — some teams pre-approve a calendar, others review post-by-post.</p>
        <p><strong>Brand Guardian</strong> — set the minimum compliance score threshold. Default is 0.75 (below returns, above passes); some brands raise to 0.85 for public-facing output.</p>
        <p><strong>SDR Outreach</strong> — import or define sequence templates. Declare the reply-classification categories and the escalation paths — hot replies surface to a named SDR; objection replies route to a sales engineer.</p>
        <p><strong>Analytics</strong> — select the attribution model and the report cadence. Configure the anomaly-detection sensitivity per metric.</p>
        <p><strong>Forecasting</strong> — declare the forecast horizon (typical: 90 days) and the scenario labels (base, optimistic, risk). Attach the historical performance data the forecast should ground on.</p>
        <p><strong>Customer Service AI</strong> — define the auto-response categories and the escalation criteria. Set the confidence threshold for auto-reply; below the threshold, route to a human agent.</p>
        <p><strong>Voice AI Agent</strong> (Beta) — select the phone numbers in use. Declare the allowed inbound and outbound purposes. All calls produce a transcript in the audit trail.</p>

        <h3>Composing into workflows</h3>
        <p>The Monday Morning Brief composes Analytics + Forecasting + Copywriter. The Quarterly Business Review composes Analytics + Forecasting + GTM Strategist. The Monthly Content Cycle composes SEO + Copywriter + Brand Guardian + Social Media. Agencies running multi-client deployments typically duplicate these workflows per client workspace.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-sso">← Previous</a><a href="#doc-agent-gov">Next → Agent Configuration — Government</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical government" id="doc-agent-gov">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">16</span><span class="doc-time">2 min read</span><span class="doc-audience">IT leads, implementation partners working in government</span></div>
          <h3 class="doc-title">Agent Configuration Guide — Government Agents</h3>
          <p class="doc-blurb">Configuration reference for all 8 government agents — Policy Intelligence, Service Delivery Monitor, Budget Tracker, Compliance Sentinel, Document Generator, Inter-Departmental Coordinator, Public Communication, and Strategic Forecasting agents.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>The government agent library is tuned for ministries, agencies, and public bodies. Each agent carries defaults that are more conservative than their commercial counterparts — more mandatory approvals, more mandatory reviewers, tighter scope on external-facing outputs.</p>

        <h3>Policy Intelligence Agent</h3>
        <p>Declare the jurisdictions, subject areas, and source set (Parliament, government press releases, regulatory publications, specific think-tank outlets). Configure the cadence — typically daily. The agent drafts an internal briefing note; approval surfaces the note to the policy lead and, optionally, to the permanent secretary's office.</p>

        <h3>Service Delivery Monitor</h3>
        <p>Attach the relevant KPI definitions and the delivery-unit directory. Configure anomaly sensitivity per KPI: strict on targets the department is publicly accountable for, loose on internal operational metrics. Alerts surface to the Operations Lead with the underlying time-series chart.</p>

        <h3>Budget Tracker</h3>
        <p>Connect to the departmental finance system (typically SAP, Oracle ERP, or a ministry-specific platform). Declare allocation categories and the end-of-year forecast model. Variance alerts surface to the finance lead with drill-down to line-level commitments.</p>

        <h3>Compliance Sentinel</h3>
        <p>Load the department's obligation register — statutory duties, regulatory requirements, policy commitments. The agent continuously checks operational data and document output against the register and surfaces gaps. Evidence portfolios for inspection are generated on demand in the format the regulator expects.</p>

        <h3>Document Generator</h3>
        <p>Define the document classes in scope (briefings, Cabinet papers, consultation responses, parliamentary question answers, ministerial correspondence). Each class has a template, a source-data declaration, and a mandatory approval chain. The class defines the default reviewers; specific documents can add reviewers but cannot remove them.</p>

        <h3>Inter-Departmental Coordinator</h3>
        <p>Build the cross-departmental dependency map. The agent monitors shared commitments and surfaces coordination risks — a policy commitment that depends on another department's delivery, a joint programme that has drifted out of synchronisation.</p>

        <h3>Public Communication Agent</h3>
        <p>This agent operates under the strictest approval chain. Every external output — press release, social post, public guidance — requires editorial, legal, and comms-head approval in parallel. No default setting allows auto-release of public-facing output.</p>

        <h3>Strategic Forecasting Agent</h3>
        <p>Configure the horizon (1–5 years), the scenario dimensions (demographics, economic assumptions, policy variants), and the sensitivity dials. Scenario packs are versioned; the version in force at the moment of a decision is preserved for retrospective review.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-agent-gtm">← Previous</a><a href="#doc-agent-ngo">Next → Agent Configuration — NGO</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical ngo" id="doc-agent-ngo">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">17</span><span class="doc-time">2 min read</span><span class="doc-audience">IT leads, M&amp;E specialists, implementation partners working in development</span></div>
          <h3 class="doc-title">Agent Configuration Guide — NGO / Development Agents</h3>
          <p class="doc-blurb">Configuration reference for the 10 NGO programme agents — Programme Intelligence, M&amp;E Report Generator, Partner Performance Monitor, Field Data Analyst, Beneficiary Analytics, Loan Monitor, Document Drafting, Compliance Sentinel, Forecasting, and Psychometric Profiling agents.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>The NGO / Development agent library is designed for organisations answerable simultaneously to donors, regulators, and beneficiaries. Its defining feature is that every configuration that touches personal data requires explicit consent and purpose declarations; the defaults are the most conservative of the three libraries.</p>

        <h3>Programme Intelligence Agent</h3>
        <p>Load each programme's log frame (logical framework) and theory of change. The agent scores incoming data against expected outputs and outcomes, surfacing divergence as it develops. Thresholds are programme-specific; a small deviation in a pilot programme carries different weight than a matching deviation in a scaled programme.</p>

        <h3>M&amp;E Report Generator</h3>
        <p>Configure per-donor reporting templates. Map field data sources to log-frame indicators. Declare the approval chain (M&amp;E Officer → Programme Manager → Country Director is typical; donor-specific variants are common). The agent drafts; approvers review against source data links; the final artefact is released to the donor portal through an audited connector.</p>

        <h3>Partner Performance Monitor</h3>
        <p>Import the implementing-partner directory. Define the performance dimensions (delivery, compliance, reporting, financial) and the scoring weights. The agent generates a monthly partner scorecard and surfaces partners at risk.</p>

        <h3>Field Data Analyst</h3>
        <p>Connect the field-data platforms in use (ODK, KoBo, SurveyCTO, CommCare, DHIS2). Declare the data-quality rules — outlier thresholds, required fields, cross-form consistency checks. The agent cleans and interprets submissions; dirty submissions route to a data steward for reconciliation.</p>

        <h3>Beneficiary Analytics Agent</h3>
        <p>Beneficiary data is PII-tagged on ingestion and operates under strict purpose binding. Configure the analytical purposes (equity-gap analysis, dropout risk, outcome prediction) each of which must be consistent with the consent framework in use. Outputs are aggregate by default; beneficiary-level outputs require explicit senior approval.</p>

        <h3>Loan Portfolio Monitor</h3>
        <p>For mission-led lenders. Attach the loan-management system. Configure arrears thresholds and early-warning indicators. The agent surfaces at-risk loans with recommended officer actions; actions are approved at the loan-officer level for small balances and at the portfolio-manager level for larger balances.</p>

        <h3>Document Drafting Agent</h3>
        <p>Configure the document classes (concept notes, proposals, MoUs, case studies). Each class has a template, a reviewer chain, and a source-data declaration. Case studies, in particular, require explicit consent from named beneficiaries before they can be drafted.</p>

        <h3>Compliance Sentinel</h3>
        <p>Load the donor-specific compliance register (FCDO, USAID, BMZ, private foundations). The agent monitors programme activity for compliance gaps — missing consents, late reports, procurement policy exceptions — and surfaces them to the compliance officer.</p>

        <h3>Forecasting Agent</h3>
        <p>Configure scenario dimensions relevant to the programme (funding environment, security environment, counterpart capacity). Forecasts are surfaced alongside confidence intervals; decisions made under high uncertainty are flagged as such in the audit trail.</p>

        <h3>Psychometric Profiling Agent</h3>
        <p>For mission-led lenders using psychometric credit scoring. Configure the assessment instrument, the decision thresholds, and — critically — the appeal path. The agent produces a recommendation; the human credit officer decides. This agent operates under explicit Article 22 compliance: no credit decision is made by the agent, only recommended.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-agent-gov">← Previous</a><a href="#sec-04">Next Section → Sector-Specific Guides</a></div></div>
      </div></div>
    </article>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════
     SECTION 04 · SECTOR-SPECIFIC GUIDES
     ══════════════════════════════════════════════════════════════════════ -->
<section id="sec-04" class="sec-alt">
  <div class="page">
    <div class="eyebrow">Section 04 · Playbooks</div>
    <h2 class="sec-title">Sector-Specific <em>Guides</em></h2>
    <p class="sec-lead">Three parallel playbooks — GTM teams, government departments, and NGO programme offices — each showing how Freya's command modes (Manual, Semi-Auto, Agentic) map onto the work the sector already does. Pairs with the live demo at <a href="https://antarious.vercel.app/" style="color:var(--teal2);border-bottom:1px dashed rgba(46,196,182,.4)">antarious.vercel.app</a>.</p>

    <div class="sec-sub-mono">4.1 · Business / GTM</div>

    <article class="doc" data-tags="business getting-started" id="doc-biz-rhythm">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">01</span><span class="doc-time">2 min read</span><span class="doc-audience">Founders, growth leads, agencies</span></div>
          <h3 class="doc-title">Running the GTM Operating Rhythm on Freya</h3>
          <p class="doc-blurb">A week in the life of a growth team using Antarious — Monday brief, mid-week campaign cycle, Friday review. Anchored on the demo's Review queue, Campaign Briefer, and the Copywriter / Outreach / Analyst / Optimizer agent primitives.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>GTM teams that get value from Antarious fastest share one pattern: they adopt a weekly rhythm and they let Freya hold the rhythm. Freya is the Live Command Layer at the centre of the dashboard — she dispatches agents, holds the brief, and keeps the Review queue tidy. This guide walks through the rhythm most teams settle into within the first month.</p>

        <h3>Monday — set the week</h3>
        <p>Open the workspace dashboard. The Review queue at the top of <a href="https://antarious.vercel.app/" target="_blank">antarious.vercel.app</a> surfaces anything Freya produced over the weekend awaiting human sign-off — typically the Weekly Performance Report and any campaign drafts queued for Monday launch. Clear the queue first.</p>
        <p>Open the <strong>Campaign Briefer</strong> for the week's headline campaign. Declare the goal, audience, channels, budget, success metric, and any non-negotiables (banned phrases, legal review requirements, regional restrictions). Freya reflects the brief back with clarifying questions; answer them, then choose a command mode: <em>Manual</em> (you drive each step), <em>Semi-Auto</em> (Freya drafts, you approve), or <em>Agentic</em> (Freya executes within declared boundaries, surfaces only exceptions).</p>

        <h3>Tuesday–Thursday — the cycle</h3>
        <p>In Semi-Auto, the default setting, a daily pattern emerges: Freya dispatches the <strong>Copywriter</strong> to draft variants, the <strong>Analyst</strong> to read performance, and the <strong>Optimizer</strong> to propose the next move. Each produces a Review queue item. Approve, reject, or annotate. Rejection is a feedback signal — Freya memory captures the reason and avoids the same failure class next cycle.</p>

        <h3>Friday — close the loop</h3>
        <p>The <strong>Weekly Performance Report</strong> drops into the queue around 14:00 local time. It stitches campaign metrics, approvals, spend, and Freya's own next-week recommendations. Approve or annotate. Export to the channel where your team reviews the week.</p>

        <div class="doc-tip"><strong>Demo tip:</strong> In the live demo, the SEMI-AUTO pill at the top of the dashboard is the command-mode switch. Try toggling to Agentic to see how the surface changes — approvals batch by policy class and exception summaries appear in the Freya side panel.</div>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-agent-ngo">← Previous Section</a><a href="#doc-biz-modes">Next → Scaling Command Modes</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="business technical" id="doc-biz-modes">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">02</span><span class="doc-time">2 min read</span><span class="doc-audience">Operators moving from Manual to Agentic</span></div>
          <h3 class="doc-title">Scaling from Manual to Agentic Command Modes</h3>
          <p class="doc-blurb">The three command modes are a progression, not a switch. How to decide when a campaign or workflow is ready to move up a tier — and what signals indicate it should move back down.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Manual, Semi-Auto, and Agentic are not speed settings. They are trust contracts between you and Freya. The right mode for a given campaign depends on how much policy exists, how predictable the output is, and how recoverable a mistake would be.</p>

        <h3>Manual</h3>
        <p>You drive every step; Freya is a drafting and analysis assistant. The right mode when launching a new channel, testing a new audience, or operating in a regulated domain for the first time. You are capturing the implicit policy into explicit rules that will later enable higher modes.</p>

        <h3>Semi-Auto</h3>
        <p>Freya proposes, you approve. The right mode for the steady state of most campaigns. Requires a mature brief, a Copywriter tuned to brand voice, and an Analyst connected to the right metrics. Approval throughput is the constraint — if the Review queue backs up, either bring more approvers in or widen the Agentic envelope.</p>

        <h3>Agentic</h3>
        <p>Freya executes within declared boundaries; you review exceptions and outcomes. The right mode for repeated campaign classes where the policy is known, the failure modes are understood, and the downside of a mistake is bounded. Budget caps, tone caps, and frequency caps are always in force. An exception — anything outside the envelope — halts and routes to the Review queue automatically.</p>

        <div class="doc-warn"><strong>Moving back down</strong> — three signals tell you to step back from Agentic to Semi-Auto for a given workflow: (1) exception rate above 10%, (2) a rejected artefact that should have been caught in policy, (3) a material change in brand voice or regulatory context.</div>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-biz-rhythm">← Previous</a><a href="#doc-gov-cycle">Next → Government Policy Cycle</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">4.2 · Government</div>

    <article class="doc" data-tags="government" id="doc-gov-cycle">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">03</span><span class="doc-time">2 min read</span><span class="doc-audience">Policy leads, permanent secretaries, delivery units</span></div>
          <h3 class="doc-title">The Policy Cycle with Freya</h3>
          <p class="doc-blurb">How a ministry runs scanning, briefing, drafting, consultation, and post-decision review using Antarious — with the approval chain intact at every gate.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Government work is a sequence of gated documents. Each gate has a named approver, a statutory or policy justification, and an audit expectation. Antarious does not bypass any gate; it lowers the cost of getting to each gate with a high-quality artefact.</p>

        <h3>Scan — Policy Intelligence Agent</h3>
        <p>Daily, Policy Intelligence reads the declared sources — parliamentary records, regulatory publications, subject-matter journals — and drafts a morning briefing. The briefing routes to the policy lead's Review queue at 07:00 local time. The approval act is light: read, annotate points of interest, dismiss the rest. Annotations become signal for tomorrow's scan.</p>

        <h3>Brief — Document Generator</h3>
        <p>When a ministerial question or Cabinet paper is commissioned, the policy lead opens a document class in the Campaign Briefer surface. They declare the question, the position the department has already taken in prior work, the constraints (length, format, addressees), and the approval chain. Freya drafts; the draft enters Review with inline source-data links.</p>

        <h3>Consult — Inter-Departmental Coordinator</h3>
        <p>Where the output touches another department, the Coordinator surfaces the dependency and holds a parallel review track. Cross-departmental comment is captured in the artefact's own audit; no version is lost.</p>

        <h3>Decide — approval chain</h3>
        <p>The workflow engine walks the chain: policy lead, director, permanent secretary's office, minister's office if required. The workflow version at the moment of decision is preserved.</p>

        <h3>Review — post-decision</h3>
        <p>Decisions carry a review horizon. Freya surfaces the artefact for structured lookback at the horizon with the original assumptions, the outturn data, and a draft retrospective note.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-biz-modes">← Previous</a><a href="#doc-gov-comms">Next → Public Communication Governance</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="government compliance" id="doc-gov-comms">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">04</span><span class="doc-time">2 min read</span><span class="doc-audience">Communications heads, press offices</span></div>
          <h3 class="doc-title">Public Communication Governance Pattern</h3>
          <p class="doc-blurb">The most conservative approval chain in the product — why public-facing government output is gated in parallel by editorial, legal, and comms-head, and how that interacts with Freya's agent primitives.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Public Communication in government is different. Output is seen by millions, is scrutinised by opposition, press, and publics, and carries accountability consequences that other output does not. The default workflow reflects that — no public output leaves the system without editorial, legal, and comms-head clearance in parallel.</p>

        <p>Agentic mode is not available on Public Communication by default. It can be enabled per output class only after a documented risk review and with a named accountable officer. Most ministries leave this envelope closed for statements of policy, open for informational content (event reminders, service-status updates, translation of existing approved content).</p>

        <p>Every public artefact carries a signed audit stamp — which agent drafted, which humans approved, which sources were consulted. The stamp is stored alongside the artefact and exportable to FOI response packages.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-gov-cycle">← Previous</a><a href="#doc-ngo-cycle">Next → NGO Programme Cycle</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">4.3 · NGO / Development</div>

    <article class="doc" data-tags="ngo" id="doc-ngo-cycle">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">05</span><span class="doc-time">2 min read</span><span class="doc-audience">Country directors, programme managers, M&amp;E officers</span></div>
          <h3 class="doc-title">The Programme Cycle with Freya</h3>
          <p class="doc-blurb">End-to-end: design, baseline, delivery, monitoring, reporting, evaluation. How Freya holds the log-frame and surfaces divergence before it becomes a donor issue.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>A programme is a multi-year commitment measured against a log frame. Most programmes fail slowly — drift shows up in the field months before it shows up in the report. Freya's job in the NGO library is to shorten that lag.</p>

        <h3>Design — log-frame authoring</h3>
        <p>Load or author the log frame. Freya validates indicator definitions against the theory of change and flags indicators that lack a measurable data source. Design errors caught here cost nothing; caught in year three they cost re-baseline work.</p>

        <h3>Baseline</h3>
        <p>Connect the field-data platforms (ODK, KoBo, SurveyCTO, CommCare, DHIS2). The Field Data Analyst pulls baselines into the indicator framework. Missing baselines are surfaced in the Review queue before implementation starts.</p>

        <h3>Delivery monitoring</h3>
        <p>The Programme Intelligence Agent scores incoming field data against expected trajectories. Divergence is classified — on track, watch, at risk, off track. At-risk items surface with suggested investigations, not pre-judged diagnoses.</p>

        <h3>Reporting</h3>
        <p>The M&amp;E Report Generator drafts the donor report from source data. Approval chain is typically M&amp;E Officer → Programme Manager → Country Director with Compliance Officer as a parallel reviewer on donor-facing output. Source-data links are inline in the draft and preserved in the final artefact.</p>

        <h3>Evaluation</h3>
        <p>The Forecasting Agent and the Programme Intelligence Agent co-produce the mid-term and end-of-programme reviews. Recommendations are drafted; the decision remains with the leadership team.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-gov-comms">← Previous</a><a href="#doc-ngo-donor">Next → Donor Reporting End-to-End</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="ngo compliance" id="doc-ngo-donor">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">06</span><span class="doc-time">2 min read</span><span class="doc-audience">M&amp;E officers, compliance officers, donor liaison</span></div>
          <h3 class="doc-title">Donor Reporting End-to-End</h3>
          <p class="doc-blurb">From field submission to donor portal upload — the full chain of custody, the approvals along the way, and the audit artefacts produced at each step.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>A donor report is only as defensible as the chain of custody that produced it. Antarious treats the report as the visible tip of a long, auditable pipeline. Every intermediate artefact — the field submission, the cleaned dataset, the indicator computation, the narrative draft, the final approved artefact — is preserved with its provenance.</p>

        <p>A donor inspector can, in the dashboard, start from any published indicator value and walk back to the raw submissions that produced it. Where personal data was consulted to produce the value, the purpose, scope, and consent state are attached to the audit record. This is the compliance property that makes Antarious usable for programmes funded under regimes like FCDO's Aid Management Platform or USAID's Development Data Policy.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-ngo-cycle">← Previous</a><a href="#sec-05">Next Section → Daily Operations</a></div></div>
      </div></div>
    </article>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════
     SECTION 05 · DAILY OPERATIONS
     ══════════════════════════════════════════════════════════════════════ -->
<section id="sec-05">
  <div class="page">
    <div class="eyebrow">Section 05 · Day-to-Day</div>
    <h2 class="sec-title">Daily <em>Operations</em></h2>
    <p class="sec-lead">The surfaces you will live in once you are past onboarding — the Review queue, the Campaign Briefer, the Workflows library, the Knowledge layer, and Freya's memory. Every section here maps directly to a route in the <a href="https://antarious.vercel.app/" style="color:var(--teal2);border-bottom:1px dashed rgba(46,196,182,.4)" target="_blank">live demo</a>.</p>

    <div class="sec-sub-mono">5.1 · Onboarding</div>

    <article class="doc" data-tags="getting-started" id="doc-first-week">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">01</span><span class="doc-time">2 min read</span><span class="doc-audience">New operators</span></div>
          <h3 class="doc-title">Your First Week on Freya</h3>
          <p class="doc-blurb">A deliberate onboarding sequence — day 1 you only approve, day 3 you brief a campaign, day 5 you turn on a second agent. By Friday you have an honest read on whether the platform fits the work.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>The failure mode for a new Antarious operator is turning on too much in the first session. Freya feels, on day one, like an intern who will do anything you ask — which is exactly when the temptation is highest to ask too much. This guide sets out a deliberate on-ramp most customers find productive.</p>

        <h3>Day 1 — watch the Review queue</h3>
        <p>Log in at <a href="https://antarious.vercel.app/" target="_blank">antarious.vercel.app</a>. The Review queue is the first surface. It already has sample items — a campaign draft, a weekly report, an A/B test proposal. Read each. Approve, annotate, or reject. Do not dispatch new work yet.</p>

        <h3>Day 2 — open the Campaign Briefer</h3>
        <p>Brief a small campaign you would run anyway this week. Keep Manual mode on. Watch Freya reflect the brief back; notice which clarifying questions she asks.</p>

        <h3>Day 3 — switch to Semi-Auto for one workflow</h3>
        <p>Pick the workflow with the most predictable output — usually the weekly performance report. Switch it to Semi-Auto. Approve the next artefact that drops.</p>

        <h3>Day 5 — enable a second agent</h3>
        <p>Open the Agent Library. Enable one more agent that is genuinely useful to your team (Analyst for most teams, Brand Guardian for regulated teams, Partner Performance Monitor for NGO programmes). Leave the rest off.</p>

        <div class="doc-tip"><strong>The anti-pattern to avoid:</strong> enabling the full agent library in week one. You will spend the week clearing a flood of Review items, concluding the system is noisy, and turning everything off. Enable agents deliberately, keep the queue small, widen as trust builds.</div>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-ngo-donor">← Previous Section</a><a href="#doc-review-queue">Next → Review Queue Reference</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">5.2 · Core Surfaces</div>

    <article class="doc" data-tags="getting-started business" id="doc-review-queue">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">02</span><span class="doc-time">2 min read</span><span class="doc-audience">All operators, approvers</span></div>
          <h3 class="doc-title">Review Queue Reference</h3>
          <p class="doc-blurb">The queue that holds everything Freya has produced awaiting human decision. Item types, triage patterns, annotation conventions, and how to keep the queue from becoming a backlog.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>The Review queue is the platform's conscience. Everything Freya produces that requires human decision surfaces here. When the queue is clean, the system is operating well; when it backs up, something upstream is misconfigured.</p>

        <h3>Item types</h3>
        <p>Campaign drafts, performance reports, ad-copy variants, social posts, outreach sequences, A/B test proposals, anomaly alerts, approval escalations, exception reports from Agentic runs. Each item declares its agent provenance and its severity class.</p>

        <h3>Triage</h3>
        <p>Work from the top. The queue orders by severity-weighted freshness: a critical-severity item that appeared ten minutes ago outranks a low-severity item from yesterday. Approvals that will cascade (the report that unblocks a launch, the brief that unblocks three downstream drafts) are flagged with a chevron.</p>

        <h3>Annotation conventions</h3>
        <p>Approval is signal, rejection is stronger signal, annotation is strongest signal. When you reject, leave a one-line reason. The reason is captured in Freya memory and weights future drafts away from the same failure class. Teams that annotate consistently see their rejection rate fall over the first six weeks.</p>

        <h3>Queue hygiene</h3>
        <p>A queue older than 48 hours is a smell. If items are sitting that long, either approvers are under-staffed for the configured workflow, or Agentic mode should take more weight (fewer items ask for review). Both are real diagnoses; neither is fixed by ignoring the queue.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-first-week">← Previous</a><a href="#doc-briefer">Next → Campaign Briefer</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="business getting-started" id="doc-briefer">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">03</span><span class="doc-time">2 min read</span><span class="doc-audience">Campaign leads, programme managers</span></div>
          <h3 class="doc-title">Campaign Briefer — Setting Intent Well</h3>
          <p class="doc-blurb">A good brief is the difference between Freya delivering usable output and Freya delivering bland output. The six fields that matter, and how to use the brief memory to keep voice consistent across campaigns.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>The Campaign Briefer is where you set intent. It is Freya's equivalent of a creative brief in an agency — and just like an agency brief, the quality of the output is bounded by the quality of what you put in.</p>

        <h3>The six fields</h3>
        <ul>
          <li><strong>Goal</strong> — what changes if this works. Concrete, measurable. Not "raise awareness"; rather "350 qualified demo requests in region X by 12 May."</li>
          <li><strong>Audience</strong> — who you are trying to reach. Anchor on the ICP record if one exists; describe in prose if not. Say who you are <em>not</em> targeting.</li>
          <li><strong>Channels</strong> — where the campaign will run. Freya will enable only the agents relevant to the declared channels.</li>
          <li><strong>Budget</strong> — total spend envelope and the autonomy threshold. Under the threshold, Freya reallocates without approval; over, she routes to the budget approver.</li>
          <li><strong>Non-negotiables</strong> — banned phrases, legal-review requirements, regional restrictions, brand rules that take precedence over tactical wins.</li>
          <li><strong>Success metric</strong> — the single number that determines whether the campaign worked. Secondary metrics are allowed; the primary is what Freya optimises against.</li>
        </ul>

        <h3>Brief memory</h3>
        <p>Each approved brief becomes part of Freya's memory of your brand. Across campaigns, the non-negotiables compound; you do not restate them each time. When a new campaign is briefed, Freya surfaces the existing rules and asks if any change applies for this campaign.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-review-queue">← Previous</a><a href="#doc-workflows">Next → Workflows Library</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical business" id="doc-workflows">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">04</span><span class="doc-time">2 min read</span><span class="doc-audience">Operators, workflow authors</span></div>
          <h3 class="doc-title">Workflows Library and Composition</h3>
          <p class="doc-blurb">Workflows are multi-agent recipes. The library ships with named workflows for common use cases; you can fork, customise, and publish your own. How composition works and where to find the library in the product.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>A workflow is a named chain of agents plus the approval gates between them. The Workflows library sits under the <em>Workflows</em> entry in the dashboard navigation — in the live demo, it lives at <code>/freya/workflows</code> (the route is stubbed but the library concept is the one that matters here).</p>

        <h3>Shipped workflows</h3>
        <ul>
          <li><strong>Monday Morning Brief</strong> — Analyst reads last-week performance, Forecasting projects next-week trajectory, Copywriter drafts the brief.</li>
          <li><strong>Monthly Content Cycle</strong> — SEO keyword refresh, Copywriter drafts, Brand Guardian scores, Social Media schedules.</li>
          <li><strong>Quarterly Business Review</strong> — Analyst + Forecasting + GTM Strategist compose the pack.</li>
          <li><strong>Donor Report (FCDO / USAID variants)</strong> — Field Data Analyst + M&amp;E Report Generator + Compliance Sentinel.</li>
          <li><strong>Cabinet Paper</strong> — Policy Intelligence + Document Generator + Inter-Departmental Coordinator with parallel legal review.</li>
        </ul>

        <h3>Forking</h3>
        <p>Any shipped workflow can be forked into your workspace. The fork becomes yours to modify; the original continues to receive upstream updates independently.</p>

        <h3>Authoring your own</h3>
        <p>A workflow is a YAML-like definition listing agents, their parameters, the data they pass to each other, and the approval gates between steps. Authoring is done in the workflow editor; advanced users can edit the definition directly.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-briefer">← Previous</a><a href="#doc-knowledge">Next → Knowledge Layer</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical compliance" id="doc-knowledge">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">05</span><span class="doc-time">2 min read</span><span class="doc-audience">All operators, data stewards</span></div>
          <h3 class="doc-title">The Knowledge Layer and Freya Memory</h3>
          <p class="doc-blurb">The distinction between Knowledge (documents you ingest) and Memory (what Freya has learned from your decisions). How each is scoped, retained, and referenced in outputs.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Antarious exposes two memory surfaces. Knowledge is what you give the system — documents, datasets, structured records. Memory is what the system has learned from working with you — approvals, rejections, annotations, outcomes. Operators who use both well see their output quality rise through the first quarter of deployment.</p>

        <h3>Knowledge</h3>
        <p>Accessed at the <em>Knowledge</em> entry in the navigation (<code>/knowledge</code> in the demo). Ingest brand guidelines, product documentation, previous campaigns, historical reports, consent registers, statutory obligations. Every ingested document declares its scope (workspace / team / tenant) and its retention policy.</p>

        <h3>Freya Memory</h3>
        <p>A first-class surface showing what Freya has learned. Voice preferences, approval patterns, rejection reasons, successful campaign archetypes, anti-patterns to avoid. Memory is editable — an operator with the right role can annotate "this learning was a local spike, not a rule" and Freya will stop generalising from it.</p>

        <h3>Freya Intelligence</h3>
        <p>Where Memory meets Knowledge. Intelligence is the surface that surfaces proactive insight — a competitor's repositioning, a policy shift, an emerging anomaly — drawn from the combination of ingested knowledge and learned patterns. Intelligence items enter the Review queue when they cross a salience threshold.</p>

        <div class="doc-info"><strong>Scoping matters.</strong> A Knowledge document ingested at the tenant scope is available to every workspace; at the workspace scope, only that workspace. Scoping errors are the most common cause of cross-workspace data leakage reports — always default to the narrowest scope that works.</div>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-workflows">← Previous</a><a href="#doc-approvals">Next → Approval History</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="compliance" id="doc-approvals">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">06</span><span class="doc-time">2 min read</span><span class="doc-audience">Approvers, auditors</span></div>
          <h3 class="doc-title">Approval History</h3>
          <p class="doc-blurb">The surface that lets any approver find everything they have ever approved — and the surface an auditor will use to reconstruct the governance state of a past decision.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Approval History is the complement to the Review queue. The queue holds items awaiting decision; Approval History holds every decision made. Filter by approver, by date range, by action class, by workflow. Export produces a signed PDF with the workflow definition, the artefact versions, and the approver chain — the package an auditor expects.</p>

        <p>The history is immutable. Corrections to a past decision are added as a superseding record with a rationale; the original is preserved.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-knowledge">← Previous</a><a href="#doc-credits">Next → Credits &amp; Economy</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">5.3 · Operations</div>

    <article class="doc" data-tags="business getting-started" id="doc-credits">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">07</span><span class="doc-time">2 min read</span><span class="doc-audience">Workspace leads, finance</span></div>
          <h3 class="doc-title">Credits Economy</h3>
          <p class="doc-blurb">Antarious runs on a credits model that meters agent work at granular level. How credits are consumed, why some agents cost more than others, and how to budget credits across teams and campaigns.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Every unit of agent work in Antarious consumes credits. The credits model exists for two reasons: it lets you budget agent work the way you budget any other operating expense, and it gives an honest signal about which workflows are carrying their weight.</p>

        <h3>What consumes credits</h3>
        <ul>
          <li><strong>Agent runs</strong> — each dispatch of an agent consumes credits proportional to the complexity of the work. Copywriter drafts are light; Forecasting runs are heavier.</li>
          <li><strong>Tool use</strong> — connectors that reach out to third-party systems (search, ad platforms, CRMs) consume credits per call, on top of the underlying agent cost.</li>
          <li><strong>Memory reads and writes</strong> — at scale, memory operations are non-trivial. At the volumes most customers operate, they are a small share of total spend.</li>
        </ul>

        <h3>Budgeting</h3>
        <p>Credit allocations can be set at tenant, workspace, team, or campaign scope. A campaign can declare a credit cap; agents will throttle or halt when the cap is approached. The workspace dashboard shows credit burn alongside campaign performance so the ROI conversation is grounded in real numbers.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-approvals">← Previous</a><a href="#doc-multi-ws">Next → Multi-Workspace Operations</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="technical business" id="doc-multi-ws">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">08</span><span class="doc-time">2 min read</span><span class="doc-audience">Agencies, multi-brand operators</span></div>
          <h3 class="doc-title">Multi-Workspace Operations</h3>
          <p class="doc-blurb">How agencies and multi-brand operators run Antarious across multiple client or brand workspaces — what is shared, what is isolated, and how the workspace switcher in the dashboard changes the experience.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>The live demo ships three workspaces on the Agency tenant — Medglobal, the Antarious agency workspace, and a Sandbox. They demonstrate the default isolation pattern: every workspace is a separate Knowledge store, a separate Memory, a separate set of connectors, and a separate credits budget. The dashboard switcher at the top-right swaps contexts cleanly.</p>

        <h3>What is shared across workspaces</h3>
        <p>Tenant-level policies (data residency, SSO configuration, tenant administrators, retention defaults) apply to every workspace. Shipped workflows and agents are available in every workspace; forks are workspace-local.</p>

        <h3>What is isolated</h3>
        <p>Client data, brand voice, campaign history, Freya memory, approval chains. A media buyer on one client's workspace cannot see another client's campaigns by default; cross-workspace roles exist but require explicit tenant-admin grant.</p>

        <h3>Credits pooling</h3>
        <p>Tenant-level credits pools can be shared across workspaces or split per workspace. Agencies typically split per client so billing rolls up cleanly; in-house multi-brand operators typically pool for operational flexibility.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-credits">← Previous</a><a href="#sec-06">Next Section → Trust &amp; Compliance</a></div></div>
      </div></div>
    </article>

  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════
     SECTION 06 · TRUST, COMPLIANCE & SECURITY
     ══════════════════════════════════════════════════════════════════════ -->
<section id="sec-06" class="sec-alt">
  <div class="page">
    <div class="eyebrow">Section 06 · Trust &amp; Compliance</div>
    <h2 class="sec-title">Trust, Compliance <em>&amp; Security</em></h2>
    <p class="sec-lead">The properties of Antarious that make it defensible — for your security team, your legal team, your regulator, and the auditor who arrives unannounced. Every claim below is backed by an in-product artefact you can show.</p>

    <div class="sec-sub-mono">6.1 · Governance</div>

    <article class="doc" data-tags="compliance" id="doc-governance">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">01</span><span class="doc-time">2 min read</span><span class="doc-audience">Governance leads, legal, compliance</span></div>
          <h3 class="doc-title">The Governance Model</h3>
          <p class="doc-blurb">Antarious ships with a governance model — not a toolkit. The defaults that come with the platform, the customer-specific overlays that sit on top, and why the two layers exist separately.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Platforms that ship a governance toolkit and leave the customer to assemble it produce outcomes that vary widely by customer maturity. Antarious takes the opposite approach: the platform ships an opinionated default governance model, and customer configuration is an overlay on that model. The defaults are defensible on day one; the overlay adapts them to the customer's specific environment.</p>

        <h3>The default layer</h3>
        <p>Every action has a severity class. Every class has a mandatory approver role. Every approval writes to an immutable audit stream. No agent can act outside a declared boundary. These are platform invariants — they are not customer-configurable.</p>

        <h3>The overlay layer</h3>
        <p>Which role maps to which archetype in your organisation. Which approvers sit on each severity class. Which regions data may reside in. Which connectors are enabled. Which agent classes are available in which workspace. These are the overlays — customer-specific, auditable, change-controlled.</p>

        <h3>Why the split</h3>
        <p>The split is what lets a regulator accept the platform once and a customer adopt it quickly. The regulator reviews the default model against their concerns; the customer reviews their overlay against the regulator's acceptance. Customers do not re-litigate the invariants.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-multi-ws">← Previous Section</a><a href="#doc-audit-ref">Next → Audit Trail Reference</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="compliance technical" id="doc-audit-ref">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">02</span><span class="doc-time">2 min read</span><span class="doc-audience">Auditors, compliance, security</span></div>
          <h3 class="doc-title">Audit Trail Reference</h3>
          <p class="doc-blurb">What every audit record contains, how the chain is tamper-evident, and how an auditor reconstructs a past decision from the stream.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Every action in Antarious produces an audit record. Records are written to an append-only stream; each record carries a hash of the preceding record so that any tampering is detectable. The stream is retained for the customer's declared retention horizon and exportable in the formats regulators ask for.</p>

        <h3>Fields on every record</h3>
        <ul>
          <li><strong>Actor</strong> — named user or agent, with role and scope in force at the moment.</li>
          <li><strong>Action</strong> — declarative statement of what was done.</li>
          <li><strong>Subject</strong> — artefact, record, or resource acted upon.</li>
          <li><strong>Severity and workflow</strong> — the classification and the approval chain in force.</li>
          <li><strong>Sources consulted</strong> — the knowledge and memory items that informed the action.</li>
          <li><strong>Purpose</strong> — declared purpose under which the action was taken.</li>
          <li><strong>Outcome</strong> — the approval state and, where applicable, downstream effects.</li>
          <li><strong>Timestamp</strong> — wall-clock and monotonic, both recorded.</li>
        </ul>

        <h3>Reconstructing a decision</h3>
        <p>Filter the stream by subject. The resulting records describe the full history of the artefact — every draft, every review, every annotation, every version. Export produces a PDF package that most regulators and donors accept as the evidentiary record.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-governance">← Previous</a><a href="#doc-data">Next → Data Handling &amp; Residency</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="compliance technical" id="doc-data">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">03</span><span class="doc-time">2 min read</span><span class="doc-audience">Security, legal, data protection</span></div>
          <h3 class="doc-title">Data Handling and Residency</h3>
          <p class="doc-blurb">Where customer data lives, how it moves, what the platform does and does not retain, and the regions supported for residency-sensitive deployments.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Customer data lives in the customer's declared region and does not leave that region without the customer's explicit configuration. This is a platform invariant, enforced at the infrastructure level rather than at the application level.</p>

        <h3>Supported regions</h3>
        <p>EU (Frankfurt), UK (London), US (Virginia), APAC (Singapore), India (Mumbai), GCC (UAE). Additional regions are added on customer demand; a new region adds approximately twelve weeks of engineering work.</p>

        <h3>What the platform retains</h3>
        <p>Knowledge documents, memory records, audit records, artefact versions. Retention horizons are customer-declared and enforced automatically.</p>

        <h3>What the platform does not retain</h3>
        <p>The full prompt/response traces to the underlying model providers are not retained by Antarious; only the derived artefacts are. Customer-uploaded source data is retained only for the declared processing purpose and deleted at the horizon.</p>

        <h3>Encryption</h3>
        <p>TLS 1.3 in transit. AES-256 at rest. Customer-managed keys are supported on the Scale and Agency tiers; rotation is customer-driven.</p>

        <h3>Personal data</h3>
        <p>Personal data is tagged on ingestion, scoped to the declared purpose, and surfaced in the data-subject rights endpoint. Subject access, rectification, and erasure requests are fulfilled through a tenant-admin console.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-audit-ref">← Previous</a><a href="#doc-sla">Next → SLAs &amp; Incident Response</a></div></div>
      </div></div>
    </article>

    <article class="doc" data-tags="compliance technical" id="doc-sla">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">04</span><span class="doc-time">2 min read</span><span class="doc-audience">Operations, procurement, IT</span></div>
          <h3 class="doc-title">SLAs and Incident Response</h3>
          <p class="doc-blurb">The service-level commitments that apply to each tier, the incident-response procedure, and how customers are notified when something goes wrong.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">
        <p>Service-level commitments scale with tier. Growth customers receive business-hours response. Scale customers receive 24/5 response. Agency and government customers receive 24/7 response with named account contacts and declared escalation paths.</p>

        <h3>Uptime</h3>
        <p>Target 99.9% monthly on Scale and above, measured at the workspace-available level. Scheduled maintenance is declared 72 hours in advance and excluded from the target.</p>

        <h3>Incident classifications</h3>
        <ul>
          <li><strong>P1</strong> — workspace unavailable, data integrity concern, security incident. Initial response under 15 minutes on 24/7 tiers.</li>
          <li><strong>P2</strong> — degraded performance, individual agent failure, connector outage affecting a workspace.</li>
          <li><strong>P3</strong> — individual feature defect, non-blocking.</li>
        </ul>

        <h3>Notifications</h3>
        <p>Status page, email to declared technical contacts, in-product banner. Post-incident reports are published for P1 and P2 incidents within the committed horizon.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-data">← Previous</a><a href="#doc-faq">Next → FAQ</a></div></div>
      </div></div>
    </article>

    <div class="sec-sub-mono">6.2 · FAQ</div>

    <article class="doc" data-tags="getting-started compliance" id="doc-faq">
      <div class="doc-head" onclick="toggleDoc(this)">
        <div>
          <div class="doc-meta"><span class="doc-num">05</span><span class="doc-time">2 min read</span><span class="doc-audience">Everyone</span></div>
          <h3 class="doc-title">Frequently Asked Questions</h3>
          <p class="doc-blurb">The questions that come up in every evaluation — answered plainly.</p>
        </div>
        <button class="doc-toggle" aria-expanded="false">Read <span class="tgl-ico">↓</span></button>
      </div>
      <div class="doc-body"><div class="doc-body-inner">

        <h4>Does Antarious replace my team?</h4>
        <p>No. Antarious is a co-pilot. Freya dispatches work; humans approve it. The design is deliberate — platforms that remove the human out of high-consequence decisions produce outcomes their customers cannot stand behind.</p>

        <h4>Can I try the product before committing?</h4>
        <p>Yes. The live demo at <a href="https://antarious.vercel.app/" target="_blank">antarious.vercel.app</a> is an interactive sandbox. It ships with three sample workspaces, the Review queue pre-seeded, and every command mode toggleable.</p>

        <h4>Which model provider powers the agents?</h4>
        <p>Antarious is model-provider-agnostic. The platform's agent orchestration, memory, governance, and audit layers are proprietary. The underlying language models are sourced from leading providers and the specific composition is under continuous optimisation. Model choice is transparent to the customer and documented in each audit record.</p>

        <h4>Can I bring my own model?</h4>
        <p>On the Scale and Agency tiers, yes — customer-managed model endpoints are supported. Most customers find the shipped composition outperforms their single-model endpoint.</p>

        <h4>How is pricing structured?</h4>
        <p>Seats plus credits. Seats cover the humans using the platform; credits cover the agent work they dispatch. Credit allowances scale with tier. Overage is disclosed in advance.</p>

        <h4>How do I get in touch about a deployment?</h4>
        <p>The fastest path is through the <em>Contact</em> link in the footer below. For detailed procurement enquiries, the <em>Enterprise</em> contact routes to the commercial team with a named response owner.</p>

        <div class="doc-foot"><div class="doc-helpful">Was this helpful? <button>Yes</button><button>No</button></div><div class="doc-nav-links"><a href="#doc-sla">← Previous</a><a href="#top">Back to top ↑</a></div></div>
      </div></div>
    </article>

  </div>
</section>

</main>

<!-- ══════════════════════════════════════════════════════════════════════
     FOOTER
     ══════════════════════════════════════════════════════════════════════ -->
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

<!-- ══════════════════════════════════════════════════════════════════════
     INTERACTIVITY
     ══════════════════════════════════════════════════════════════════════ -->
<script>
// Toggle doc cards open/closed
function toggleDoc(headEl){
  var docEl = headEl.closest('.doc');
  if(!docEl) return;
  var isOpen = docEl.classList.toggle('open');
  var btn = headEl.querySelector('.doc-toggle');
  if(btn){
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    var label = btn.childNodes[0];
    if(label && label.nodeType === 3){
      label.textContent = isOpen ? 'Close ' : 'Read ';
    }
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var pills = document.querySelectorAll('.fp');
  var docs = document.querySelectorAll('.doc');

  var heroTagMap = {
    'all':             {t:'Live Command Layer · Approval-safe routing · Memory that compounds with every decision', c:'var(--gold2)'},
    'getting-started': {t:'Start here · How Freya, agents, and approvals fit together',                              c:'var(--teal)'},
    'technical':       {t:'Architecture · Integrations · APIs · Configuration',                                      c:'var(--sky)'},
    'business':        {t:'GTM · 13 specialist agents · 23 days → 2 days per campaign',                              c:'var(--gold2)'},
    'government':      {t:'Citizen services · 8 agents · 24 departments · 100% audit trail',                         c:'var(--violet)'},
    'ngo':             {t:'Programme delivery · 10 agents · 280 partners · Donor-ready briefs',                      c:'var(--green)'},
    'compliance':      {t:'Human approval · Audit trail · Role-based control · Security',                            c:'var(--coral)'}
  };
  var heroTag = document.getElementById('heroTagline');

  pills.forEach(function(pill){
    pill.addEventListener('click', function(){
      pills.forEach(function(p){ p.classList.remove('active'); });
      pill.classList.add('active');
      var f = pill.getAttribute('data-filter');

      // Update hero tagline + colour
      if(heroTag && heroTagMap[f]){
        heroTag.style.opacity = '0';
        setTimeout(function(){
          heroTag.textContent = heroTagMap[f].t;
          heroTag.style.color = heroTagMap[f].c;
          heroTag.style.opacity = '1';
        }, 180);
      }

      // Filter docs by data-tags
      docs.forEach(function(d){
        if(f === 'all'){ d.classList.remove('hidden'); return; }
        var tags = (d.getAttribute('data-tags') || '').split(/\\s+/);
        if(tags.indexOf(f) !== -1){ d.classList.remove('hidden'); }
        else { d.classList.add('hidden'); }
      });

      // Hide subsection labels whose following docs are all hidden
      document.querySelectorAll('.sec-sub-mono').forEach(function(lbl){
        if(f === 'all'){ lbl.style.display = ''; return; }
        var sib = lbl.nextElementSibling;
        var anyVisible = false;
        while(sib && !sib.classList.contains('sec-sub-mono')){
          if(sib.classList && sib.classList.contains('doc') && !sib.classList.contains('hidden')){
            anyVisible = true; break;
          }
          sib = sib.nextElementSibling;
        }
        lbl.style.display = anyVisible ? '' : 'none';
      });

      // Hide entire section if no docs match
      document.querySelectorAll('section[id^="sec-"]').forEach(function(sec){
        var totalDocs = sec.querySelectorAll('.doc').length;
        if(totalDocs === 0){ return; }
        var visible = sec.querySelectorAll('.doc:not(.hidden)').length;
        sec.style.display = (f !== 'all' && visible === 0) ? 'none' : '';
      });
    });
  });

  // Search box
  var search = document.getElementById('docSearch');
  if(search){
    search.addEventListener('input', function(){
      var q = search.value.trim().toLowerCase();
      docs.forEach(function(d){
        if(!q){ d.classList.remove('hidden'); return; }
        var text = d.textContent.toLowerCase();
        if(text.indexOf(q) !== -1){ d.classList.remove('hidden'); }
        else { d.classList.add('hidden'); }
      });
    });
  }

  // Reading progress bar
  var bar = document.querySelector('.progress-fill');
  if(bar){
    window.addEventListener('scroll', function(){
      var h = document.documentElement;
      var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
    });
  }

  // Expand/Collapse all toggle
  var expandAll = document.getElementById('expandAll');
  if(expandAll){
    expandAll.addEventListener('click', function(){
      var allDocs = document.querySelectorAll('.doc');
      var openCount = document.querySelectorAll('.doc.open').length;
      var shouldOpen = openCount < allDocs.length;
      allDocs.forEach(function(d){
        if(shouldOpen) d.classList.add('open'); else d.classList.remove('open');
        var btn = d.querySelector('.doc-toggle');
        if(btn){
          btn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
          var lbl = btn.childNodes[0];
          if(lbl && lbl.nodeType === 3) lbl.textContent = shouldOpen ? 'Close ' : 'Read ';
        }
      });
      expandAll.innerHTML = shouldOpen ? '⇅ Collapse all' : '⇅ Expand all';
    });
  }
});
</script>

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
