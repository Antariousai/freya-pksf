const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Antarious AI for NGO & Development — Programme Intelligence Platform</title>
<meta name="description" content="Antarious AI automates M&E reporting, field data aggregation, beneficiary tracking, and donor compliance for NGOs and development organisations. Powered by Freya.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&family=DM+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:"Plus Jakarta Sans",sans-serif;line-height:1.65;overflow-x:hidden;transition:background .35s,color .35s}
[data-theme="light"]{--bg:#F7FAF8;--bg2:#FFFFFF;--bg3:#EEF6F1;--bg4:#E4EFE8;--ink:#0C1F15;--ink2:#274A34;--ink3:#4D7360;--ink4:#83A892;--ink5:#B8D4C2;--ac:#059669;--acd:#047857;--acl:#34D399;--act:#10B981;--acbg:rgba(5,150,105,.08);--acbg2:rgba(5,150,105,.14);--acbdr:rgba(5,150,105,.2);--acbdr2:rgba(5,150,105,.4);--td:#0284C7;--teal:#0EA5E9;--tbg:rgba(14,165,233,.07);--tbdr:rgba(14,165,233,.2);--red:#DC2626;--rbg:rgba(220,38,38,.06);--rbdr:rgba(220,38,38,.17);--amber:#D97706;--abg:rgba(217,119,6,.07);--bdr:rgba(12,31,21,.08);--bdr2:rgba(12,31,21,.05);--sh:0 1px 4px rgba(0,0,0,.05),0 8px 32px rgba(0,0,0,.06);--sh2:0 4px 24px rgba(0,0,0,.07),0 20px 64px rgba(0,0,0,.07);--sha:0 4px 24px rgba(5,150,105,.18);--logo:block;--logo-w:none}
[data-theme="dark"]{--bg:#061209;--bg2:#0C1F12;--bg3:#122A1A;--bg4:#1A3824;--ink:#EEF8F2;--ink2:#B8D4C2;--ink3:#6FA882;--ink4:#3A6B4A;--ink5:#1E4430;--ac:#34D399;--acd:#6EE7B7;--acl:#6EE7B7;--act:#10B981;--acbg:rgba(52,211,153,.1);--acbg2:rgba(52,211,153,.18);--acbdr:rgba(52,211,153,.25);--acbdr2:rgba(52,211,153,.45);--td:#38BDF8;--teal:#0EA5E9;--tbg:rgba(14,165,233,.1);--tbdr:rgba(14,165,233,.25);--red:#F87171;--rbg:rgba(248,113,113,.08);--rbdr:rgba(248,113,113,.22);--amber:#FCD34D;--abg:rgba(252,211,77,.08);--bdr:rgba(255,255,255,.08);--bdr2:rgba(255,255,255,.05);--sh:0 1px 4px rgba(0,0,0,.3),0 8px 32px rgba(0,0,0,.25);--sh2:0 4px 24px rgba(0,0,0,.28),0 20px 64px rgba(0,0,0,.3);--sha:0 4px 24px rgba(52,211,153,.15);--logo:none;--logo-w:block}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes slideL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes spinR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes blink{50%{opacity:0}}
@keyframes liveBar{0%{width:4%}65%{width:87%}85%{width:94%}100%{width:99%}}
@keyframes particleSpin{from{transform:rotate(var(--pr,0deg)) translateX(var(--pd,80px))}to{transform:rotate(calc(var(--pr,0deg) + 360deg)) translateX(var(--pd,80px))}}
@keyframes orbGlow{0%,100%{box-shadow:0 0 0 0 rgba(5,150,105,.3),0 0 40px rgba(5,150,105,.15)}50%{box-shadow:0 0 0 16px rgba(5,150,105,.05),0 0 70px rgba(5,150,105,.25)}}
@keyframes conic{from{--ca:0deg}to{--ca:360deg}}
@keyframes scanOrb{0%{top:5%}100%{top:108%}}
@keyframes rippleOut{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.2);opacity:0}}
@property --ca{syntax:'<angle>';initial-value:0deg;inherits:false}
.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.reveal.in{opacity:1;transform:none}
.d1{transition-delay:.08s}.d2{transition-delay:.15s}.d3{transition-delay:.22s}.d4{transition-delay:.29s}
body{background:var(--bg);color:var(--ink)}
section{padding:96px 0}.alt{background:var(--bg2)}
.page{max-width:1200px;margin:0 auto;padding:0 48px}
.divider{height:1px;background:var(--bdr)}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:"DM Mono",monospace;font-size:9.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--ac);margin-bottom:16px}
.eyebrow::before{content:"";width:16px;height:1.5px;background:var(--ac);border-radius:2px;flex-shrink:0}
.h2{font-family:"Outfit",sans-serif;font-size:clamp(26px,3.5vw,50px);font-weight:900;color:var(--ink);line-height:1.05;letter-spacing:-1.6px;margin-bottom:16px}
.h2 em{color:var(--ac);font-style:italic}
.sp{font-size:17px;color:var(--ink3);line-height:1.82;max-width:600px;margin-bottom:52px}
.sp.w{max-width:800px}
/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:900;height:64px;display:flex;align-items:center;padding:0 48px;gap:8px;background:rgba(247,250,248,.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--bdr);transition:all .3s}
[data-theme="dark"] .nav{background:rgba(6,18,9,.92)}
.nav.scrolled{height:55px;box-shadow:0 1px 16px rgba(0,0,0,.08)}
.nav-logo{flex-shrink:0;margin-right:20px;cursor:pointer}
.nav-logo img{height:28px;display:block}
.logo-main{display:var(--logo)}.logo-white{display:var(--logo-w)}
.nl{font-family:"Outfit",sans-serif;font-size:13.5px;font-weight:600;color:var(--ink3);padding:6px 13px;border-radius:8px;cursor:pointer;border:none;background:none;transition:all .17s;white-space:nowrap}
.nl:hover{color:var(--ink);background:var(--bg3)}
.nav-sector-btn{
  font-family:"Outfit",sans-serif;font-size:13px;font-weight:700;color:var(--ink2);
  background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.02));
  border:1px solid rgba(14,165,233,.14);padding:8px 16px;border-radius:12px;cursor:pointer;
  transition:all .2s;box-shadow:0 4px 14px rgba(12,31,21,.04)
}
.nav-sector-btn:hover{color:var(--td);border-color:rgba(14,165,233,.26);background:linear-gradient(135deg,rgba(14,165,233,.12),rgba(56,189,248,.05));transform:translateY(-1px)}
.nav-freya-btn{
  font-family:"Outfit",sans-serif;font-size:13px;font-weight:800;color:#0284C7;
  background:linear-gradient(135deg,rgba(14,165,233,.14),rgba(56,189,248,.08));
  border:1px solid rgba(14,165,233,.24);padding:8px 18px;border-radius:12px;cursor:pointer;
  transition:all .2s;box-shadow:0 8px 22px rgba(14,165,233,.12)
}
.nav-freya-btn:hover{color:#0EA5E9;border-color:rgba(14,165,233,.38);transform:translateY(-1px);background:linear-gradient(135deg,rgba(14,165,233,.18),rgba(56,189,248,.1))}
.nav-r{display:flex;gap:8px;margin-left:auto;flex-shrink:0;align-items:center}
.btn-nav-cta{font-family:"Outfit",sans-serif;font-size:13px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--ac),var(--acd));border:none;padding:9px 22px;border-radius:12px;cursor:pointer;transition:all .22s;box-shadow:0 6px 16px rgba(5,150,105,.22)}
.btn-nav-cta:hover{background:linear-gradient(135deg,var(--acd),#047857);transform:translateY(-1px);box-shadow:0 10px 24px rgba(5,150,105,.28)}
/* HERO */
.hero-wrap{min-height:100vh;position:relative;overflow:hidden;background:var(--bg)}
.hero-dots{position:absolute;inset:0;background-image:radial-gradient(var(--acbdr) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse at 62% 38%,black 20%,transparent 65%);pointer-events:none;opacity:.6}
.hero-glow{position:absolute;top:-18%;right:-8%;width:650px;height:650px;background:radial-gradient(circle,rgba(5,150,105,.08),transparent 60%);pointer-events:none}
[data-theme="dark"] .hero-glow{background:radial-gradient(circle,rgba(5,150,105,.13),transparent 60%)}
.hero-inner{max-width:1240px;margin:0 auto;padding:120px 48px 100px;display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;position:relative;z-index:2}
.hero-kicker{display:inline-flex;align-items:center;gap:9px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--ac);margin-bottom:20px;animation:fadeUp .5s ease both}
.hero-kicker::before{content:"";width:18px;height:1.5px;background:var(--ac);flex-shrink:0}
.kd{width:5px;height:5px;border-radius:50%;background:var(--ac);box-shadow:0 0 7px rgba(5,150,105,.6);animation:pulse 1.8s ease infinite}
.hero-h1{font-family:"Outfit",sans-serif;font-size:clamp(38px,5vw,72px);font-weight:900;color:var(--ink);line-height:.95;letter-spacing:-2.8px;margin-bottom:4px;animation:fadeUp .55s .06s ease both}
.hero-h1 .ac{color:var(--ac)}.hero-h1 .dm{color:var(--ink4);font-weight:400}
.hero-sub{font-family:"Outfit",sans-serif;font-size:clamp(16px,1.8vw,22px);font-weight:600;color:var(--ink3);margin-bottom:16px;letter-spacing:-.3px;animation:fadeUp .55s .10s ease both}
.hero-sub strong{color:var(--ink2)}
.hero-body{font-size:16px;line-height:1.8;color:var(--ink3);max-width:490px;margin-bottom:30px;animation:fadeUp .55s .14s ease both}
.hero-btns{display:flex;gap:12px;margin-bottom:40px;animation:fadeUp .55s .18s ease both;flex-wrap:wrap}
.hero-stats{display:flex;gap:22px;padding-top:22px;border-top:1px solid var(--bdr);animation:fadeUp .55s .22s ease both;flex-wrap:wrap;align-items:flex-start}
.hs-v{font-family:"Outfit",sans-serif;font-size:27px;font-weight:900;color:var(--ac);line-height:1}
.hs-l{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink4);margin-top:4px}
.hs-sep{width:1px;height:30px;background:var(--bdr);align-self:center;flex-shrink:0}
.btn{font-family:"Outfit",sans-serif;font-weight:700;border:none;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:8px;border-radius:12px}
.btn-p{background:var(--ac);color:#fff;padding:14px 32px;font-size:15px;box-shadow:var(--sha)}
.btn-p:hover{background:var(--acd);transform:translateY(-2px);box-shadow:0 8px 32px rgba(5,150,105,.34)}
.btn-p svg{transition:transform .2s}.btn-p:hover svg{transform:translateX(3px)}
.btn-g{background:var(--bg2);color:var(--ink2);border:1.5px solid var(--bdr);padding:13px 28px;font-size:15px;box-shadow:var(--sh)}
.btn-g:hover{border-color:var(--acbdr);color:var(--ac);transform:translateY(-2px);box-shadow:var(--sh2)}
/* TERMINAL */
.terminal{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:24px;box-shadow:var(--sh2);overflow:hidden;animation:fadeUp .6s .08s ease both}
.t-bar{display:flex;align-items:center;gap:10px;padding:11px 16px;background:var(--bg3);border-bottom:1px solid var(--bdr2)}
.t-dots{display:flex;gap:5px}.t-dot{width:10px;height:10px;border-radius:50%}
.t-title{flex:1;text-align:center;font-family:"DM Mono",monospace;font-size:9.5px;font-weight:700;letter-spacing:1.5px;color:var(--ink4)}
.t-live{display:flex;align-items:center;gap:5px;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;color:var(--ac);background:var(--acbg);border:1px solid var(--acbdr);padding:2px 9px;border-radius:20px}
.t-ldot{width:5px;height:5px;border-radius:50%;background:var(--ac);animation:pulse 1.5s ease infinite}
.t-prog{height:2px;background:var(--bg3)}.t-pf{height:100%;background:linear-gradient(90deg,var(--acl),var(--ac));animation:liveBar 4s ease-in-out infinite}
.t-body{padding:16px;display:flex;flex-direction:column;gap:11px}
.t-frow{display:flex;align-items:center;gap:12px;padding:11px 14px;background:linear-gradient(135deg,var(--acbg),transparent);border:1.5px solid var(--acbdr);border-radius:16px}
.t-morb{width:44px;height:44px;border-radius:50%;position:relative;flex-shrink:0}
.t-mface{width:100%;height:100%;border-radius:50%;background:conic-gradient(from var(--ca) at 50% 50%,#047857,#34D399 30%,#10B981 60%,#059669 85%,#047857);animation:conic 5s linear infinite,orbGlow 3s ease infinite;display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:17px;font-weight:900;color:#fff}
.t-mring{position:absolute;inset:-4px;border-radius:50%;border:1.5px solid rgba(5,150,105,.28);animation:rippleOut 2.5s ease-out infinite}
.t-fname{font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;color:var(--ink)}
.t-fstatus{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1px;color:var(--ac);margin-top:2px;display:flex;align-items:center;gap:5px}
.t-fstatus::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--ac);animation:pulse 1.5s ease infinite;flex-shrink:0}
.t-fagents{font-family:"DM Mono",monospace;font-size:8.5px;color:var(--ink4);margin-top:1px}
.t-think{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink3);padding:9px 12px;background:var(--bg3);border-radius:8px;border-left:2px solid var(--ac);line-height:1.6;min-height:36px}
.t-cur{animation:blink .8s step-end infinite}
.tasks{display:flex;flex-direction:column;gap:5px}
.task{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;border:1px solid var(--bdr2);background:var(--bg2)}
.task.done{background:var(--acbg);border-color:var(--acbdr)}.task.run{background:var(--acbg2);border-color:var(--acbdr)}.task.wait{opacity:.4}
.tic{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0}
.tcd{background:var(--acbg);color:var(--ac)}.tcr{background:var(--acbg2);color:var(--ac)}.tcw{background:var(--bg3);color:var(--ink4)}
.task-txt{flex:1;font-size:11.5px;color:var(--ink2)}
.task-tm{font-family:"DM Mono",monospace;font-size:9px;font-weight:700}
.tmc{color:var(--ac)}.tmr{color:var(--ac);animation:pulse 2s ease infinite}.tmw{color:var(--ink4)}
.t-alert{background:var(--abg);border:1px solid rgba(217,119,6,.2);border-radius:8px;padding:9px 12px;display:flex;gap:8px}
.ta-lbl{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1px;color:var(--amber);text-transform:uppercase;margin-bottom:2px}
.ta-txt{font-size:11.5px;color:var(--ink2);line-height:1.55}
.t-mets{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.tm{background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:9px;text-align:center}
.tm-v{font-family:"Outfit",sans-serif;font-size:18px;font-weight:900;color:var(--ac);line-height:1}
.tm-l{font-family:"DM Mono",monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;text-transform:uppercase;margin-top:3px}
/* TRUST STRIP */
.trust-strip{overflow:hidden;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);background:var(--bg2);padding:14px 0}
.trust-lbl{text-align:center;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--ink5);margin-bottom:12px}
.scroll-row{overflow:hidden;white-space:nowrap}
.scroll-inner{display:inline-flex;gap:52px;animation:slideL 28s linear infinite;align-items:center}
.slogo{font-family:"Outfit",sans-serif;font-size:12.5px;font-weight:700;color:var(--ink5);flex-shrink:0;transition:color .2s;cursor:default}
.slogo:hover{color:var(--ink3)}
/* PAIN */
.cost-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bdr);border-radius:24px;overflow:hidden;border:1px solid var(--bdr);margin-bottom:32px}
.cc{background:var(--bg2);padding:28px 22px;position:relative;overflow:hidden;cursor:default}
.cc::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--cc,var(--red))}
.cc-icon{font-size:22px;margin-bottom:10px}
.cc-val{font-family:"Outfit",sans-serif;font-size:38px;font-weight:900;color:var(--cc,var(--red));line-height:1;margin-bottom:5px}
.cc-title{font-family:"Outfit",sans-serif;font-size:14px;font-weight:700;color:var(--ink);margin-bottom:5px}
.cc-desc{font-size:12.5px;color:var(--ink3);line-height:1.65}
/* TRANSFORMATION */
.ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:48px}
.ba-col{border-radius:20px;overflow:hidden}
.ba-head{padding:16px 20px;font-family:"Outfit",sans-serif;font-size:14px;font-weight:800;display:flex;align-items:center;gap:9px}
.ba-body{padding:0 0 6px}
.ba-item{display:flex;gap:10px;align-items:flex-start;padding:12px 20px;border-bottom:1px solid rgba(0,0,0,.04)}
[data-theme="dark"] .ba-item{border-bottom-color:rgba(255,255,255,.04)}
.ba-icon{flex-shrink:0;font-size:14px;margin-top:1px}
.ba-text{font-size:13px;line-height:1.6}
/* BRIDGE */
.bridge-grid{display:grid;grid-template-columns:1fr 64px 1fr;border-radius:24px;overflow:hidden;border:1.5px solid var(--bdr);background:var(--bg2);box-shadow:var(--sh2);margin-bottom:28px}
.b-human{padding:34px 30px;border-right:1px solid var(--bdr)}
.b-freya{padding:34px 30px;background:linear-gradient(150deg,var(--acbg),var(--bg2))}
.b-mid{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:var(--bg3);border-left:1px solid var(--bdr);border-right:1px solid var(--bdr)}
.b-plus{font-family:"Outfit",sans-serif;font-size:26px;font-weight:900;color:var(--ac)}
.b-vl{width:1.5px;height:26px;background:linear-gradient(to bottom,transparent,var(--acbdr),transparent)}
.b-av{width:62px;height:62px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:12px;background:rgba(139,92,246,.08);border:2px solid rgba(139,92,246,.2)}
.b-forb{width:62px;height:62px;border-radius:50%;position:relative;margin-bottom:12px}
.bfc{width:100%;height:100%;border-radius:50%;background:conic-gradient(from var(--ca) at 50% 50%,#047857,#34D399 30%,#10B981 60%,#059669 85%,#047857);animation:conic 4s linear infinite,orbGlow 3.5s ease infinite}
.bfi{position:absolute;inset:6px;border-radius:50%;background:var(--bg2);display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:19px;font-weight:900;color:var(--ac)}
.bfr1{position:absolute;inset:-5px;border-radius:50%;border:1.5px solid rgba(5,150,105,.24);animation:rippleOut 2.8s ease-out infinite}
.b-name{font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;color:var(--ink);margin-bottom:4px}
.b-sub{font-size:12px;color:var(--ink3);margin-bottom:18px;line-height:1.5}
.b-items{display:flex;flex-direction:column;gap:6px}
.b-item{display:flex;align-items:center;gap:8px;padding:8px 11px;border-radius:8px;background:var(--bg3);border:1px solid var(--bdr2);font-size:12.5px;color:var(--ink2);cursor:default}
.b-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.bridge-note{text-align:center;padding:16px 28px;background:var(--acbg);border:1.5px solid var(--acbdr);border-radius:16px;margin-bottom:24px;font-size:14px;color:var(--ink2);line-height:1.65}
.bridge-note strong{color:var(--ink)}
.bo-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bdr);border-radius:16px;overflow:hidden;border:1px solid var(--bdr)}
.bo{background:var(--bg2);padding:20px;text-align:center;cursor:default}
.bo:hover{background:var(--acbg)}
.bo-val{font-family:"Outfit",sans-serif;font-size:30px;font-weight:900;color:var(--ac);line-height:1;margin-bottom:4px}
.bo-lbl{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink4)}
/* AGENTS */
.agents-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.ag{background:var(--bg2);border:1px solid var(--bdr);border-top:3px solid var(--ac,var(--ac));border-radius:18px;padding:22px 20px;transition:all .22s;cursor:default}
.ag:hover{transform:translateY(-4px);box-shadow:var(--sh2)}
.ag-num{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ac);margin-bottom:8px}
.ag-icon{font-size:24px;margin-bottom:10px;display:block}
.ag-name{font-family:"Outfit",sans-serif;font-size:16px;font-weight:800;color:var(--ink);margin-bottom:6px}
.ag-body{font-size:12.5px;color:var(--ink3);line-height:1.68}
.ag-feats{display:flex;flex-direction:column;gap:4px;margin-top:10px}
.agf{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--ink2)}
.agf::before{content:"";color:var(--ac);font-weight:700;flex-shrink:0;font-size:11px}
/* WORKFLOW */
.workflow-steps{display:flex;flex-direction:column;gap:0;counter-reset:step}
.ws{display:grid;grid-template-columns:56px 1fr;gap:0;position:relative}
.ws:not(:last-child)::after{content:"";position:absolute;left:27px;top:52px;width:2px;height:calc(100% - 24px);background:linear-gradient(to bottom,var(--acbdr),transparent)}
.ws-num{width:56px;display:flex;flex-direction:column;align-items:center;padding-top:4px}
.ws-circle{width:34px;height:34px;border-radius:50%;background:var(--ac);display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:14px;font-weight:900;color:#fff;flex-shrink:0;box-shadow:0 2px 10px rgba(5,150,105,.3)}
.ws-body{padding:4px 0 36px 16px}
.ws-title{font-family:"Outfit",sans-serif;font-size:17px;font-weight:800;color:var(--ink);margin-bottom:6px}
.ws-p{font-size:14px;color:var(--ink3);line-height:1.7}
.ws-chip{display:inline-flex;align-items:center;gap:5px;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;color:var(--ac);background:var(--acbg);border:1px solid var(--acbdr);padding:3px 10px;border-radius:5px;margin-top:8px}
/* PSYCHOMETRIC SECTION */
.psych-card{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:24px;padding:40px;box-shadow:var(--sh2);display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.psych-pillars{display:flex;flex-direction:column;gap:14px}
.pp{padding:16px 18px;background:var(--acbg);border:1.5px solid var(--acbdr);border-radius:14px}
.pp-num{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ac);margin-bottom:5px}
.pp-title{font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;color:var(--ink);margin-bottom:4px}
.pp-desc{font-size:12.5px;color:var(--ink3);line-height:1.65}
.psych-steps{display:flex;flex-direction:column;gap:10px}
.pss{display:flex;gap:12px;align-items:flex-start}
.pss-num{width:26px;height:26px;border-radius:50%;background:var(--ac);display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:11px;font-weight:900;color:#fff;flex-shrink:0}
.pss-title{font-family:"Outfit",sans-serif;font-size:13.5px;font-weight:700;color:var(--ink);margin-bottom:2px}
.pss-desc{font-size:12px;color:var(--ink3);line-height:1.6}
/* CTA */
.cta-card{background:var(--ac);border-radius:28px;padding:72px 56px;text-align:center;position:relative;overflow:hidden}
.cta-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.1) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(ellipse at 50% 40%,black 30%,transparent 68%);pointer-events:none}
.cta-c{position:relative;z-index:2}
.cta-ey{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:14px}
.cta-h2{font-family:"Outfit",sans-serif;font-size:clamp(26px,4vw,50px);font-weight:900;color:#fff;line-height:1.04;letter-spacing:-1.5px;margin-bottom:12px}
.cta-p{font-size:16px;color:rgba(255,255,255,.72);line-height:1.75;max-width:440px;margin:0 auto 34px}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-cta-p{font-family:"Outfit",sans-serif;font-size:15px;font-weight:700;color:var(--ac);background:#fff;border:none;padding:14px 34px;border-radius:14px;cursor:pointer;transition:all .25s;box-shadow:0 4px 24px rgba(0,0,0,.18);display:inline-flex;align-items:center;gap:8px}
.btn-cta-p:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(0,0,0,.2)}
.btn-cta-g{font-family:"Outfit",sans-serif;font-size:15px;font-weight:600;color:rgba(255,255,255,.82);background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);padding:13px 26px;border-radius:14px;cursor:pointer;transition:all .22s}
.btn-cta-g:hover{background:rgba(255,255,255,.2)}
/* FOOTER */
footer{background:var(--bg2);border-top:1px solid var(--bdr);padding:64px 0 30px}
.footer-inner{max-width:1200px;margin:0 auto;padding:0 48px}
.footer-top{display:grid;grid-template-columns:1.4fr repeat(5,1fr);gap:40px;margin-bottom:48px}
.footer-brand .name{font-family:var(--f1);font-size:18px;font-weight:800;color:var(--ink);margin-bottom:10px;display:flex;align-items:center;gap:8px;letter-spacing:-.3px}
.footer-brand-img{height:28px;width:auto}
.footer-brand .tagline{font-size:13px;color:var(--ink3);line-height:1.65;max-width:220px}
.footer-col-h{font-family:var(--f1);font-size:12px;font-weight:700;color:var(--ink);letter-spacing:-.2px;margin-bottom:14px;text-transform:uppercase;font-size:10px;font-family:var(--fm);letter-spacing:2px;color:var(--ink4)}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:8px}
.footer-lnk{font-size:13px;color:var(--ink3);cursor:pointer;transition:color .15s}
.footer-lnk:hover{color:var(--ac)}
.footer-link-item{display:flex;flex-direction:column;gap:3px}
.footer-link-item .footer-lnk{font-weight:600}
.footer-link-desc{font-size:11px;line-height:1.45;color:var(--ink4);max-width:240px}
.footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:24px;border-top:1px solid var(--bdr);flex-wrap:wrap;gap:12px}
.footer-copy{font-family:var(--fm);font-size:10px;color:var(--ink4)}
.footer-badges{display:flex;gap:8px;flex-wrap:wrap}
.footer-badge{font-family:var(--fm);font-size:8.5px;font-weight:700;letter-spacing:1px;color:var(--ink3);background:#fff;border:1px solid var(--bdr);padding:3px 10px;border-radius:20px}
/* RESPONSIVE */
@media(max-width:1060px){.hero-inner{grid-template-columns:1fr;max-width:640px;padding:110px 48px 80px}.terminal{max-width:520px;margin:0 auto}.psych-card{grid-template-columns:1fr}.bridge-grid{grid-template-columns:1fr}.b-mid{display:none}.b-human{border-right:none;border-bottom:1px solid var(--bdr)}.ba-grid{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr 1fr 1fr}}
@media(max-width:860px){.page{padding:0 20px}.nav{padding:0 20px}.nl{display:none}section{padding:64px 0}.agents-grid{grid-template-columns:1fr}.cost-grid{grid-template-columns:1fr 1fr}.bo-strip{grid-template-columns:1fr 1fr}.cta-card{padding:48px 20px}.footer-top{grid-template-columns:1fr 1fr}.hero-inner{padding:100px 20px 72px}}
@media(max-width:560px){.cost-grid{grid-template-columns:1fr}.bo-strip{grid-template-columns:1fr 1fr}}
/* NGO PAGE REDESIGN */
body.page-ngo{background:
radial-gradient(circle at top left,rgba(5,150,105,.07),transparent 24%),
linear-gradient(180deg,#FCFEFC 0%,#F5FBF7 42%,#F7FAF8 100%)}
.page-ngo .hero-wrap::after{content:"";position:absolute;inset:auto 6% 6% auto;width:260px;height:260px;border-radius:50%;border:1px dashed rgba(5,150,105,.14);pointer-events:none}
.page-ngo .ngo-problem .cost-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:14px;border-radius:32px;background:linear-gradient(180deg,rgba(5,150,105,.05),rgba(5,150,105,.08));border:1px solid rgba(5,150,105,.12);box-shadow:0 18px 40px rgba(12,31,21,.05);align-items:start}
.page-ngo .ngo-problem .cc{grid-column:auto;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(238,246,241,.92));border:1px solid rgba(5,150,105,.12);box-shadow:none}
.page-ngo .ngo-problem .cc:nth-child(1),.page-ngo .ngo-problem .cc:nth-child(2),.page-ngo .ngo-problem .cc:nth-child(3),.page-ngo .ngo-problem .cc:nth-child(4),.page-ngo .ngo-problem .cc:nth-child(5),.page-ngo .ngo-problem .cc:nth-child(6){grid-column:auto;transform:none}
.page-ngo .ngo-transform{display:none}
.page-ngo .ngo-principle .bridge-grid{grid-template-columns:minmax(0,1fr) 104px minmax(0,1fr);gap:18px;align-items:stretch}
.page-ngo .ngo-principle .b-mid{display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:24px;background:linear-gradient(180deg,#0C2117,#133526);border:1px solid rgba(52,211,153,.16);box-shadow:0 16px 40px rgba(12,31,21,.12)}
.page-ngo .ngo-principle .b-plus{background:linear-gradient(135deg,#10B981,#34D399);box-shadow:0 8px 24px rgba(5,150,105,.28)}
.page-ngo .ngo-principle .b-vl{width:1px;flex:1;background:linear-gradient(180deg,rgba(52,211,153,0),rgba(52,211,153,.5),rgba(52,211,153,0))}
.page-ngo .ngo-principle .b-human,.page-ngo .ngo-principle .b-freya{border-radius:28px;padding:28px;border:1px solid rgba(5,150,105,.12);box-shadow:0 18px 38px rgba(12,31,21,.05)}
.page-ngo .ngo-principle .b-human{background:linear-gradient(180deg,#fff,#f7fcf8)}
.page-ngo .ngo-principle .b-freya{background:linear-gradient(145deg,#0C2117,#123629);border-color:rgba(52,211,153,.16);box-shadow:0 20px 48px rgba(12,31,21,.14)}
.page-ngo .ngo-principle .b-freya .b-name,.page-ngo .ngo-principle .b-freya .b-sub,.page-ngo .ngo-principle .b-freya .b-item{color:#EDF8F1}
.page-ngo .ngo-principle .b-freya .b-item{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.08)}
.page-ngo .ngo-principle .b-freya .b-dot{background:#34D399!important}
.page-ngo .terminal,.page-ngo .demo-win,.page-ngo .psych-card{position:relative;overflow:hidden}
.page-ngo .terminal::after,.page-ngo .demo-win::after,.page-ngo .psych-card::after{content:"";position:absolute;left:-15%;right:-15%;top:-30%;height:36%;background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.18),rgba(255,255,255,0));transform:rotate(-7deg);animation:ngoSweep 7.5s ease-in-out infinite;pointer-events:none}
.page-ngo .ngo-agents .agents-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.page-ngo .ngo-agents .ag{border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(247,252,248,.95));border:1px solid rgba(5,150,105,.12);box-shadow:0 18px 34px rgba(12,31,21,.05)}
.page-ngo .ngo-agents .ag:nth-child(2n){transform:translateY(20px)}
.page-ngo .ngo-signature{background:#0C2117}
.page-ngo .ngo-signature .eyebrow,.page-ngo .ngo-signature .h2,.page-ngo .ngo-signature .sp{color:#EDF8F1}
.page-ngo .ngo-signature .eyebrow::before{background:#34D399}
.page-ngo .ngo-signature .h2 em{color:#34D399}
.page-ngo .ngo-signature .sp{color:rgba(237,248,241,.72)}
.page-ngo .ngo-signature .psych-card{position:relative;gap:28px;padding:30px;border-radius:32px;background:linear-gradient(145deg,#10281B,#143628);border:1px solid rgba(52,211,153,.16);box-shadow:0 28px 60px rgba(12,31,21,.22)}
.page-ngo .ngo-signature .psych-card::before{content:"";position:absolute;top:24px;bottom:24px;left:50%;width:1px;background:linear-gradient(180deg,rgba(52,211,153,.22),rgba(52,211,153,0));pointer-events:none}
.page-ngo .ngo-signature .psych-card::after{background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.08),rgba(255,255,255,0))}
.page-ngo .ngo-signature .psych-card [style*="color:var(--ink)"]{color:#EDF8F1!important}
.page-ngo .ngo-signature .pp,.page-ngo .ngo-signature .pss{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.08)}
.page-ngo .ngo-signature .pp-title,.page-ngo .ngo-signature .pss-title{color:#EDF8F1}
.page-ngo .ngo-signature .pp-desc,.page-ngo .ngo-signature .pss-desc{color:rgba(237,248,241,.72)}
.page-ngo .ngo-signature .pp-num,.page-ngo .ngo-signature .pss-num{background:rgba(52,211,153,.12);border-color:rgba(52,211,153,.2);color:#34D399}
.page-ngo .ngo-roles{background:var(--bg2)}
.page-ngo .ngo-roles .eyebrow,.page-ngo .ngo-roles .h2,.page-ngo .ngo-roles .sp{color:var(--ink)}
.page-ngo .ngo-roles .eyebrow::before{background:var(--ac)}
.page-ngo .ngo-roles .h2 em{color:#34D399}
.page-ngo .ngo-roles .sp{color:var(--ink3)}
.page-ngo .ngo-roles .uc-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:10px;border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(238,246,241,.92));border:1px solid rgba(5,150,105,.12);margin-bottom:30px;box-shadow:0 16px 34px rgba(12,31,21,.05)}
.page-ngo .ngo-roles .uc-tab{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink3);background:none;border:1px solid transparent;padding:10px 14px;border-radius:12px;cursor:pointer;transition:all .2s}
.page-ngo .ngo-roles .uc-tab.on{color:#fff;background:var(--ac);border-color:var(--ac)}
.page-ngo .ngo-roles .uc-tab:hover:not(.on){color:var(--ink);background:var(--bg3)}
.page-ngo .ngo-roles .uc-panel{display:none;grid-template-columns:minmax(0,1fr) 360px;gap:24px;padding:28px;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(247,252,248,.95));border:1px solid rgba(5,150,105,.12);box-shadow:0 22px 48px rgba(12,31,21,.06)}
.page-ngo .ngo-roles .uc-panel.on{display:grid}
.page-ngo .ngo-roles .uc-h3{font-family:"Outfit",sans-serif;font-size:clamp(22px,2.5vw,34px);font-weight:900;line-height:1.06;letter-spacing:-.8px;color:var(--ink);margin-bottom:12px}
.page-ngo .ngo-roles .uc-h3 em{color:#34D399;font-style:italic}
.page-ngo .ngo-roles .uc-p{font-size:14.5px;line-height:1.78;color:var(--ink2);margin-bottom:18px}
.page-ngo .ngo-roles .uc-stats{display:flex;gap:18px;margin-bottom:20px;flex-wrap:wrap;align-items:flex-start}
.page-ngo .ngo-roles .uc-sv{font-family:"Outfit",sans-serif;font-size:24px;font-weight:900;line-height:1;color:#34D399}
.page-ngo .ngo-roles .uc-sl{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--ink4);margin-top:4px}
.page-ngo .ngo-roles .uc-div{width:1px;height:32px;background:var(--bdr);align-self:center;flex-shrink:0}
.page-ngo .ngo-roles .uc-steps{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.page-ngo .ngo-roles .uc-step{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:14px;background:var(--bg3);border:1px solid var(--bdr2)}
.page-ngo .ngo-roles .uc-sn{width:22px;height:22px;border-radius:7px;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.2);display:flex;align-items:center;justify-content:center;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;color:#34D399;flex-shrink:0}
.page-ngo .ngo-roles .uc-st{font-size:12.5px;line-height:1.58;color:var(--ink2)}
.page-ngo .ngo-roles .btn-role{font-family:"Outfit",sans-serif;font-size:13px;font-weight:700;color:#0C2117;background:#34D399;border:none;padding:11px 22px;border-radius:12px;cursor:pointer;transition:all .2s}
.page-ngo .ngo-roles .btn-role:hover{transform:translateY(-1px);background:#6EE7B7}
.page-ngo .ngo-roles .demo-win{border-radius:22px;background:linear-gradient(180deg,#fff,#f7fcf8);box-shadow:inset 0 0 0 1px rgba(12,31,21,.05)}
.page-ngo .ngo-roles .dw-bar{background:var(--bg3);padding:10px 14px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;gap:8px}
.page-ngo .ngo-roles .dw-dots{display:flex;gap:4px}
.page-ngo .ngo-roles .dw-dot{width:9px;height:9px;border-radius:50%}
.page-ngo .ngo-roles .dw-url{flex:1;text-align:center;font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink4)}
.page-ngo .ngo-roles .dw-live{display:flex;align-items:center;gap:4px;font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;color:var(--green)}
.page-ngo .ngo-roles .dw-ldot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.5s ease infinite}
.page-ngo .ngo-roles .dw-prog{height:2px;background:var(--bg3)}
.page-ngo .ngo-roles .dw-pf{height:100%;background:linear-gradient(90deg,var(--acl),var(--ac));animation:liveBar 3.5s ease-in-out infinite}
.page-ngo .ngo-roles .dw-body{min-height:270px}
.page-ngo .ngo-roles .f-tick{display:flex;align-items:center;gap:8px;padding:7px 11px;background:var(--acbg);border:1px solid var(--acbdr);border-radius:8px;margin-bottom:11px}
.page-ngo .ngo-roles .f-tick-orb{width:20px;height:20px;border-radius:50%;animation:conic 4s linear infinite;display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:9px;font-weight:900;color:#fff;flex-shrink:0}
.page-ngo .ngo-roles .f-tick-txt{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;color:var(--ac);flex:1}
.page-ngo .ngo-roles .f-tick-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.4s ease infinite;flex-shrink:0}
.page-ngo .ngo-roadmap .workflow-steps{position:relative;padding-left:30px}
.page-ngo .ngo-roadmap .workflow-steps::before{content:"";position:absolute;left:18px;top:14px;bottom:14px;width:2px;background:linear-gradient(180deg,rgba(5,150,105,.32),rgba(5,150,105,.06))}
.page-ngo .ngo-roadmap .ws{padding-left:12px}
.page-ngo .ngo-roadmap .ws-circle{box-shadow:0 0 0 8px rgba(5,150,105,.06)}
@keyframes ngoSweep{0%,100%{transform:translateY(0) rotate(-7deg);opacity:0}20%{opacity:.78}48%{transform:translateY(220%) rotate(-7deg);opacity:0}}
@media(max-width:980px){
  .page-ngo .ngo-problem .cost-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .page-ngo .ngo-principle .bridge-grid{grid-template-columns:1fr}
  .page-ngo .ngo-principle .b-mid{min-height:96px}
  .page-ngo .ngo-agents .ag:nth-child(2n){transform:none}
  .page-ngo .ngo-signature .psych-card::before{display:none}
  .page-ngo .ngo-agents .agents-grid{grid-template-columns:1fr}
  .page-ngo .ngo-roles .uc-panel{grid-template-columns:1fr}
  .page-ngo .ngo-roles .uc-tabs{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .page-ngo .ngo-problem .cost-grid{grid-template-columns:1fr}
  .page-ngo .ngo-roles .uc-tabs{grid-template-columns:1fr}
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
<body class="page-ngo">
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

<!-- HERO -->
<div class="hero-wrap">
  <div class="hero-dots"></div><div class="hero-glow"></div>
  <div class="hero-inner">
    <div>
      <div class="hero-kicker">For NGO &amp; Development Organisations <span class="kd"></span></div>
      <h1 class="hero-h1">More programme<br><span class="ac">delivery.</span><br><span class="dm">Far less</span><br><span class="dm">admin overhead.</span></h1>
      <p class="hero-sub">Powered by <strong>Freya</strong>, your autonomous programme intelligence AI.</p>
      <p class="hero-body">Antarious AI automates M&amp;E reporting, field data aggregation from partner organisations, beneficiary tracking, and donor compliance — giving your programme officers back the time to do the work that actually matters in the field.</p>
      <div class="hero-btns"><button class="btn btn-p">Request a Demo <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button><button class="btn btn-g" onclick="location.href='/freya'">Meet Freya →</button></div>
      <div class="hero-stats"><div><div class="hs-v">65%</div><div class="hs-l">Reporting time saved</div></div><div class="hs-sep"></div><div><div class="hs-v">90%</div><div class="hs-l">Less data aggregation</div></div><div class="hs-sep"></div><div><div class="hs-v">Wk 3</div><div class="hs-l">Anomalies flagged vs Wk 13</div></div><div class="hs-sep"></div><div><div class="hs-v">∞</div><div class="hs-l">Institutional memory</div></div></div>
    </div>
    <div class="terminal">
      <div class="t-bar"><div class="t-dots"><div class="t-dot" style="background:#EF4444"></div><div class="t-dot" style="background:#F59E0B"></div><div class="t-dot" style="background:#10B981"></div></div><div class="t-title">FREYA — PROGRAMME OPERATIONS</div><div class="t-live"><span class="t-ldot"></span>ACTIVE</div></div>
      <div class="t-prog"><div class="t-pf"></div></div>
      <div class="t-body">
        <div class="t-frow"><div class="t-morb"><div class="t-mface">F</div><div class="t-mring"></div></div><div><div class="t-fname">Freya</div><div class="t-fstatus">RUNNING · 7 AGENTS ACTIVE</div><div class="t-fagents">Monitoring all partner org submissions · Real-time</div></div></div>
        <div class="t-think" id="ngoThink">Aggregating Q2 field data from partner organisations…&thinsp;<span class="t-cur">|</span></div>
        <div class="tasks">
          <div class="task done"><div class="tic tcd"></div><div class="task-txt">All 280 partner submissions consolidated automatically</div><div class="task-tm tmc">4 min </div></div>
          <div class="task done"><div class="tic tcd"></div><div class="task-txt">Beneficiary data deduplicated — 12 duplicates removed</div><div class="task-tm tmc">Auto </div></div>
          <div class="task done"><div class="tic tcd"></div><div class="task-txt">Donor quarterly report drafted from live data</div><div class="task-tm tmc">4 min </div></div>
          <div class="task run"><div class="tic tcr">⟳</div><div class="task-txt" id="ngoTask">Generating partner performance rankings for review…</div><div class="task-tm tmr">● Now</div></div>
          <div class="task wait"><div class="tic tcw">○</div><div class="task-txt">Compliance evidence portfolio — compile before review</div><div class="task-tm tmw">Queued</div></div>
        </div>
        <div class="t-alert"><div style="font-size:13px;flex-shrink:0"><span class="ai-svg-icon-slot" data-ai-icon="alert"></span></div><div><div class="ta-lbl">Freya Alert · 3h ago</div><div class="ta-txt">3 partner organisations are 18%+ behind Q2 targets. Corrective action memos drafted — pending your approval.</div></div></div>
        <div class="t-mets"><div class="tm"><div class="tm-v" id="ngoCount">20,482</div><div class="tm-l">Beneficiaries</div></div><div class="tm"><div class="tm-v" id="ngoReportTime">4 min</div><div class="tm-l">Report Time</div></div><div class="tm"><div class="tm-v" id="ngoPartners">280</div><div class="tm-l">Partners</div></div></div>
      </div>
    </div>
  </div>
</div>

<div class="trust-strip"><div class="trust-lbl">Designed to work with development sector data systems</div><div class="scroll-row"><div class="scroll-inner"><span class="slogo">World Bank</span><span class="slogo">USAID</span><span class="slogo">UNDP</span><span class="slogo">DFID</span><span class="slogo">ADB</span><span class="slogo">ODK Collect</span><span class="slogo">KoBoToolbox</span><span class="slogo">DHIS2</span><span class="slogo">Salesforce NPSP</span><span class="slogo">Google Workspace</span><span class="slogo">Power BI</span><span class="slogo">Excel / CSV</span><span class="slogo">CommCare</span><span class="slogo">SurveyCTO</span><span class="slogo">World Bank</span><span class="slogo">USAID</span><span class="slogo">UNDP</span><span class="slogo">DFID</span><span class="slogo">ADB</span><span class="slogo">ODK Collect</span><span class="slogo">KoBoToolbox</span><span class="slogo">DHIS2</span><span class="slogo">Salesforce NPSP</span><span class="slogo">Google Workspace</span><span class="slogo">Power BI</span><span class="slogo">Excel / CSV</span><span class="slogo">CommCare</span><span class="slogo">SurveyCTO</span></div></div></div>

<!-- PAIN SECTION -->
<section class="ngo-problem">
  <div class="page">
    <div class="eyebrow reveal">Where Development Organisations Lose Time</div>
    <h2 class="h2 reveal">Your data exists. Your intelligence<br><em>doesn't reach the right people.</em></h2>
    <p class="sp w reveal">Development organisations don't have a data problem. They have a data-access and task-automation problem. The intelligence to make better decisions already exists in your systems — what's missing is the layer that connects it to the people who need it, automatically and in real time.</p>
    <div class="cost-grid">
      <div class="cc reveal" style="--cc:var(--red)"><div class="cc-icon"></div><div class="cc-val">2–3 days</div><div class="cc-title">Per quarterly donor report</div><div class="cc-desc">Manual data lookup, formatting compliance checks, narrative writing, multi-level review — all done manually, every quarter.</div></div>
      <div class="cc reveal d1" style="--cc:var(--amber)"><div class="cc-icon"></div><div class="cc-val">3–5 hrs</div><div class="cc-title">Per week, per officer</div><div class="cc-desc">Consolidating partner submissions from hundreds of organisations in different formats, Excel files, and email attachments.</div></div>
      <div class="cc reveal d2" style="--cc:var(--red)"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="calendar"></span></div><div class="cc-val">Week 13</div><div class="cc-title">When anomalies are found</div><div class="cc-desc">Partner underperformance identified at quarterly reviews — 6–10 weeks after onset. DLI milestones already at risk by then.</div></div>
      <div class="cc reveal d3" style="--cc:var(--amber)"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="puzzle"></span></div><div class="cc-val">40–60%</div><div class="cc-title">Officer time lost to admin</div><div class="cc-desc">Strategic work — field visits, partner capacity building, programme design — is systematically deprioritised because of routine tasks.</div></div>
      <div class="cc reveal d1" style="--cc:#7C3AED"><div class="cc-icon"></div><div class="cc-val">∞</div><div class="cc-title">Institutional knowledge lost</div><div class="cc-desc">Programme knowledge lives in individuals. Every staff transition erodes context. New officers repeat the same mistakes.</div></div>
      <div class="cc reveal d2" style="--cc:var(--red)"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="chart"></span></div><div class="cc-val">45 min</div><div class="cc-title">To answer one programme question</div><div class="cc-desc">Pulling data from multiple spreadsheets to answer a simple performance question from leadership or a donor.</div></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- TRANSFORMATION -->
<section class="alt ngo-transform">
  <div class="page">
    <div class="eyebrow reveal">Before &amp; After Antarious AI</div>
    <h2 class="h2 reveal">The same work. A completely<br><em>different outcome.</em></h2>
    <p class="sp w reveal">Freya doesn't change what your programme officers are responsible for. It changes how much time and mental energy each task requires.</p>
    <div class="ba-grid reveal">
      <div class="ba-col" style="border:1.5px solid var(--rbdr);background:var(--rbg)">
        <div class="ba-head" style="background:rgba(220,38,38,.06);color:var(--red)"><span></span> Without Antarious AI</div>
        <div class="ba-body">
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink3)">Programme officer spends 2–3 days writing donor report from scratch, manually pulling data from multiple sources</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink3)">3–5 hours every week consolidating partner data from hundreds of different sources in different formats</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink3)">Partner performance anomalies detected at quarter-end reviews — 10 weeks after the problem began</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink3)">Institutional knowledge lives in individuals — erodes with every staff transition or role change</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink3)">45 minutes to answer "How is the programme performing this quarter?" from multiple spreadsheets</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink3)">Beneficiary dropout reasons unknown in real time — identified retrospectively in annual reviews</div></div>
        </div>
      </div>
      <div class="ba-col" style="border:1.5px solid var(--acbdr);background:var(--acbg)">
        <div class="ba-head" style="background:rgba(5,150,105,.06);color:var(--ac)"><span></span> With Antarious AI</div>
        <div class="ba-body">
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink2)"><strong>M&amp;E Report Agent</strong> drafts the full donor report in 4 minutes. Officer reviews and approves in 30 minutes. Done.</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink2)"><strong>Field Data Analyst</strong> consolidates all partner submissions automatically. Real-time dashboard updated continuously. Zero manual aggregation.</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink2)"><strong>Partner Performance Monitor</strong> flags anomalies in week 3 — corrective action taken 7 weeks earlier than before.</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink2)">All decisions stored in <strong>institutional memory</strong> — accessible to every officer, indefinitely, regardless of staff changes.</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink2)">Type the question — get a <strong>cited, analysed answer in under 10 seconds</strong> with data sources shown.</div></div>
          <div class="ba-item"><div class="ba-icon"></div><div class="ba-text" style="color:var(--ink2)"><strong>Beneficiary Analytics Agent</strong> surfaces dropout patterns in real time — intervention possible within the same quarter.</div></div>
        </div>
      </div>
    </div>
    <div class="bo-strip reveal" style="margin-top:24px"><div class="bo"><div class="bo-val">65%</div><div class="bo-lbl">Time recovered for strategy</div></div><div class="bo"><div class="bo-val">90%</div><div class="bo-lbl">Less data aggregation</div></div><div class="bo"><div class="bo-val">Week 3</div><div class="bo-lbl">Anomaly detection vs Wk 13</div></div><div class="bo"><div class="bo-val">∞</div><div class="bo-lbl">Institutional memory retained</div></div></div>
  </div>
</section>

<div class="divider"></div>

<!-- USE CASES -->
<section class="ngo-roles">
  <div class="page">
    <div class="eyebrow reveal">Use Cases by Role</div>
    <h2 class="h2 reveal">Built for every <em>programme function.</em></h2>
    <p class="sp reveal">Freya adapts to the real work inside development organisations — from M&amp;E and field operations to donor communications and credit-linked programmes.</p>
    <div class="uc-tabs reveal">
      <button class="uc-tab on" onclick="showNgoUC('leadership',this)">Leadership</button>
      <button class="uc-tab" onclick="showNgoUC('me',this)">M&amp;E Officers</button>
      <button class="uc-tab" onclick="showNgoUC('field',this)">Field Teams</button>
      <button class="uc-tab" onclick="showNgoUC('credit',this)">Credit &amp; Finance</button>
    </div>
    <div id="ngo-uc-leadership" class="uc-panel on">
      <div><h3 class="uc-h3">Leadership visibility.<br><em>No more manual briefing assembly.</em></h3><p class="uc-p">Freya prepares live programme briefings for directors and heads of programme — surfacing partner risk, donor deadlines, beneficiary trends, and intervention options in one operating view.</p><div class="uc-stats"><div><div class="uc-sv">8 sec</div><div class="uc-sl">To answer any programme query</div></div><div class="uc-div"></div><div><div class="uc-sv">Week 3</div><div class="uc-sl">Risk surfaced vs quarter-end</div></div><div class="uc-div"></div><div><div class="uc-sv">∞</div><div class="uc-sl">Institutional context retained</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Morning programme brief compiled from live field data, partner performance, and donor priorities.</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">Leadership questions answered from approved context with sources shown clearly.</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">Intervention memos prepared before underperformance reaches quarterly review stage.</div></div></div><button class="btn-role">Explore leadership workflows →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">antarious.app / programme-leadership</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb" style="background:conic-gradient(from var(--ca),#047857,#34D399,#047857)">F</div><div class="f-tick-txt" id="ngoRoleLeadTick">Freya: refreshing leadership programme brief…</div><div class="f-tick-dot"></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:9px"><div style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:10px;padding:12px"><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;margin-bottom:5px">PARTNERS AT RISK</div><div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:var(--ac)">3</div><div style="font-size:10px;color:var(--amber);margin-top:2px">Corrective memos ready</div></div><div style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:10px;padding:12px"><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;margin-bottom:5px">DONOR BRIEF STATUS</div><div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:var(--green)">READY</div><div style="font-size:10px;color:var(--ink3);margin-top:2px">Awaiting director review</div></div></div><div style="background:var(--abg);border:1px solid rgba(217,119,6,.2);border-radius:10px;padding:10px;display:flex;gap:8px;margin-bottom:9px"><div style="font-size:13px"><span class="ai-svg-icon-slot" data-ai-icon="alert"></span></div><div><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--amber);letter-spacing:1px;margin-bottom:2px;font-weight:700">FREYA ALERT</div><div id="ngoRoleLeadAlert" style="font-size:11.5px;color:var(--ink2);line-height:1.5">3 partner organisations are behind target — intervention path drafted for approval.</div></div></div><div id="ngoRoleLeadTag" style="font-family:'DM Mono',monospace;font-size:9.5px;color:var(--ink3);background:var(--acbg);border:1px solid var(--acbdr);border-radius:10px;padding:9px">280 partners monitored · donor brief ready · leadership context synced</div></div></div>
    </div>
    <div id="ngo-uc-me" class="uc-panel">
      <div><h3 class="uc-h3">M&amp;E reporting without the quarterly scramble.<br><em>Structured, sourced, and review-ready.</em></h3><p class="uc-p">Freya drafts donor-format reports from live programme data, validates submissions, and assembles indicator narratives so officers spend less time formatting and more time interpreting what matters.</p><div class="uc-stats"><div><div class="uc-sv">4 min</div><div class="uc-sl">To draft donor report</div></div><div class="uc-div"></div><div><div class="uc-sv">0</div><div class="uc-sl">Manual consolidation needed</div></div><div class="uc-div"></div><div><div class="uc-sv">Multi-source</div><div class="uc-sl">Validation layer</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Partner submissions are ingested from spreadsheets, portals, and field systems.</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">Freya validates indicators, flags issues, and drafts the full donor narrative.</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">Officer reviews, adjusts, and approves before sharing externally.</div></div></div><button class="btn-role">Explore M&amp;E workflows →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">antarious.app / me-reporting</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb" style="background:conic-gradient(from var(--ca),#047857,#34D399,#047857)">F</div><div class="f-tick-txt" id="ngoRoleMETick">M&amp;E Report Generator: drafting quarterly donor update…</div><div class="f-tick-dot"></div></div><div style="display:flex;flex-direction:column;gap:7px"><div style="padding:10px 12px;background:var(--gbg);border:1px solid var(--gbdr);border-radius:10px;font-size:12px;color:var(--ink)">Submission completeness check passed for 274 partners</div><div style="padding:10px 12px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:10px;font-size:12px;color:var(--ink)">Narrative sections generated for outcomes, risks, and exceptions</div><div style="padding:10px 12px;background:var(--tbg);border:1px solid var(--tbdr);border-radius:10px;font-size:12px;color:var(--ink)">Evidence links attached for donor review and internal sign-off</div></div></div></div>
    </div>
    <div id="ngo-uc-field" class="uc-panel">
      <div><h3 class="uc-h3">Field teams get back into the field.<br><em>Less admin, faster intervention.</em></h3><p class="uc-p">Freya handles the repetitive coordination layer — consolidating partner data, spotting anomalies early, and preparing action notes — so field and programme teams can focus on partner support and delivery quality.</p><div class="uc-stats"><div><div class="uc-sv">3–5 hrs</div><div class="uc-sl">Saved weekly per officer</div></div><div class="uc-div"></div><div><div class="uc-sv">Week 3</div><div class="uc-sl">Early anomaly signal</div></div><div class="uc-div"></div><div><div class="uc-sv">Real-time</div><div class="uc-sl">Beneficiary visibility</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Freya consolidates incoming field submissions without manual copying or formatting.</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">Beneficiary and partner anomalies are surfaced before they turn into quarter-end surprises.</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">Field officers receive a prepared view of where intervention is actually needed.</div></div></div><button class="btn-role">Explore field workflows →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">antarious.app / field-ops</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb" style="background:conic-gradient(from var(--ca),#047857,#34D399,#047857)">F</div><div class="f-tick-txt" id="ngoRoleFieldTick">Freya: refreshing field intervention map…</div><div class="f-tick-dot"></div></div><div style="display:flex;flex-direction:column;gap:7px"><div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--gbg);border:1px solid var(--gbdr);border-radius:10px"><div style="width:8px;height:8px;border-radius:50%;background:var(--green)"></div><div style="font-size:12px;color:var(--ink)">Region 2 stable — all partner submissions on schedule</div></div><div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--abg);border:1px solid rgba(217,119,6,.2);border-radius:10px"><div style="width:8px;height:8px;border-radius:50%;background:var(--amber)"></div><div id="ngoRoleFieldAlert" style="font-size:12px;color:var(--ink)">Region 3 dropout pattern requires immediate field follow-up</div></div><div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:10px"><div style="width:8px;height:8px;border-radius:50%;background:var(--ac)"></div><div style="font-size:12px;color:var(--ink)">Partner visit brief compiled with beneficiary notes and risk markers</div></div></div></div></div>
    </div>
    <div id="ngo-uc-credit" class="uc-panel">
      <div><h3 class="uc-h3">Credit-linked programmes become<br><em>smarter, fairer, and faster.</em></h3><p class="uc-p">The Psychometric Profiling Agent helps microfinance and credit-linked NGOs assess applicants even when formal credit history is missing — producing more confident lending decisions with stronger human review.</p><div class="uc-stats"><div><div class="uc-sv">7</div><div class="uc-sl">Psychometric dimensions</div></div><div class="uc-div"></div><div><div class="uc-sv">No bureau</div><div class="uc-sl">History required</div></div><div class="uc-div"></div><div><div class="uc-sv">Human</div><div class="uc-sl">Approval always retained</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Applicants complete a structured assessment in local language on a smartphone.</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">Freya scores entrepreneurial, financial, and behavioural indicators against portfolio context.</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">Loan recommendation, tenure, and risk flags are prepared for officer review.</div></div></div><button class="btn-role">Explore psychometric workflows →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">antarious.app / psychometric-profiling</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb" style="background:conic-gradient(from var(--ca),#047857,#34D399,#047857)">F</div><div class="f-tick-txt" id="ngoRoleCreditTick">Psychometric Profiling: 48 assessments processed today…</div><div class="f-tick-dot"></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:9px"><div style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:10px;padding:12px"><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;margin-bottom:5px">ASSESSMENT SCORE</div><div id="ngoRoleCreditScore" style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:var(--ac)">82/100</div><div style="font-size:10px;color:var(--green);margin-top:2px">Recommended for review</div></div><div style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:10px;padding:12px"><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;margin-bottom:5px">RECOMMENDED TENURE</div><div id="ngoRoleCreditTerm" style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:var(--ac)">12 mo</div><div style="font-size:10px;color:var(--ink3);margin-top:2px">Officer decision pending</div></div></div><div id="ngoRoleCreditAlert" style="background:var(--acbg);border:1px solid var(--acbdr);border-radius:10px;padding:10px;font-size:11.5px;color:var(--ink2);line-height:1.5">Freya recommends moderate loan exposure with phased repayment based on behavioural profile and portfolio fit.</div></div></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FREYA PRINCIPLE -->
<section class="ngo-principle">
  <div class="page">
    <div class="eyebrow reveal">The Antarious AI Principle</div>
    <h2 class="h2 reveal">Freya doesn't replace your team.<br><em>It amplifies their impact.</em></h2>
    <p class="sp w reveal">Programme officers should be in the field, building partner capacity, and designing better programmes. Freya handles everything that doesn't need a human. Your team gets back to everything that does.</p>
    <div class="bridge-grid reveal">
      <div class="b-human"><div class="b-av"><span class="ai-svg-icon-slot" data-ai-icon="user"></span></div><div class="b-name">Your Programme Team</div><div class="b-sub">Strategic judgement, relationships, field expertise, accountability</div><div class="b-items"><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Programme strategy &amp; design</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Partner relationship management</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Field visits &amp; community engagement</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Donor relationship &amp; negotiation</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Impact decisions &amp; approvals</div></div></div>
      <div class="b-mid"><div class="b-vl"></div><div class="b-plus">+</div><div class="b-vl"></div></div>
      <div class="b-freya"><div class="b-forb"><div class="bfc"></div><div class="bfi">F</div><div class="bfr1"></div></div><div class="b-name">Freya AI Agent</div><div class="b-sub">Data aggregation, report drafting, monitoring, alerting — 24/7, zero errors</div><div class="b-items"><div class="b-item"><div class="b-dot" style="background:var(--ac)"></div>Partner data aggregation &amp; validation</div><div class="b-item"><div class="b-dot" style="background:var(--ac)"></div>M&amp;E report generation from live data</div><div class="b-item"><div class="b-dot" style="background:var(--ac)"></div>Beneficiary tracking &amp; analytics</div><div class="b-item"><div class="b-dot" style="background:var(--ac)"></div>Early warning anomaly detection</div><div class="b-item"><div class="b-dot" style="background:var(--ac)"></div>Donor compliance documentation</div></div></div>
    </div>
    <div class="bridge-note reveal"><strong>Human-in-the-loop — non-negotiable.</strong><br>Every output Freya produces requires a human review and approval step before any action is taken. AI prepares. Humans decide and are accountable. This is built into every agent, for every output.</div>
  </div>
</section>

<div class="divider"></div>

<!-- 10 AGENTS -->
<section class="alt ngo-agents">
  <div class="page">
    <div class="eyebrow reveal" style="justify-content:center;display:flex">The 10 Programme Agents</div>
    <h2 class="h2 reveal" style="text-align:center">Ten specialists built<br><em>for development organisations.</em></h2>
    <p class="sp reveal" style="text-align:center;max-width:620px;margin:0 auto 48px">Each agent is trained for a specific programme function — sharing context, requiring human approval, and continuously improving from your organisation's data.</p>
    <div class="agents-grid">
      <div class="ag reveal"><div class="ag-num">Agent 01 · Core Intelligence</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="brain"></span></span><div class="ag-name">Programme Intelligence</div><p class="ag-body">Answers any natural language question about your programme operations — cross-domain synthesis of partner data, beneficiary records, loans, and field reports in one cited answer. Proactive morning briefs auto-compiled daily for leadership.</p><div class="ag-feats"><div class="agf">Natural language queries across all data</div><div class="agf">Persistent institutional memory — never forgets</div><div class="agf">Every answer cites its data sources</div></div></div>
      <div class="ag reveal d1"><div class="ag-num">Agent 02 · Reporting</div><span class="ag-icon"></span><div class="ag-name">M&amp;E Report Generator</div><p class="ag-body">Auto-drafts full donor report narratives from live MIS data — correctly structured for World Bank PDO, USAID, DFID, and other major donors. Multi-level approval workflow built in. Anomaly-flagged before external review.</p><div class="ag-feats"><div class="agf">Donor-format narrative generation</div><div class="agf">DLI / KPI tracking tables auto-populated</div><div class="agf">Multi-level approval: Officer → Manager → Director</div></div></div>
      <div class="ag reveal"><div class="ag-num">Agent 03 · Monitoring</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="signal"></span></span><div class="ag-name">Partner Performance Monitor</div><p class="ag-body">Real-time target vs. actual tracking for all partner organisations across all programme components. Early warning alerts when a partner falls behind — with trend indicators and draft corrective action memos routed for approval.</p><div class="ag-feats"><div class="agf">Continuous tracking — not quarterly reviews</div><div class="agf">Early warnings in week 3, not week 13</div><div class="agf">Contextual interpretation of seasonal patterns</div></div></div>
      <div class="ag reveal d1"><div class="ag-num">Agent 04 · Data Management</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="folder"></span></span><div class="ag-name">Field Data Analyst</div><p class="ag-body">Automatically ingests, validates, and consolidates partner submissions in any format — web portals, Excel uploads, ODK, KoBoToolbox, SurveyCTO. Flags data quality issues, prevents double-counting, and presents one real-time dashboard.</p><div class="ag-feats"><div class="agf">Multi-format data ingestion</div><div class="agf">Automatic validation &amp; deduplication</div><div class="agf">Submission compliance monitoring per partner</div></div></div>
      <div class="ag reveal"><div class="ag-num">Agent 05 · Impact Analytics</div><span class="ag-icon"></span><div class="ag-name">Beneficiary Analytics</div><p class="ag-body">Tracks beneficiary journeys from enrolment through all touchpoints to final outcomes. Gender disaggregation at every geographic level. Dropout analysis in real time. Vulnerability mapping for targeted intervention planning.</p><div class="ag-feats"><div class="agf">Beneficiary journey tracking end-to-end</div><div class="agf">Disaggregated analysis by gender, geography</div><div class="agf">Dropout patterns surfaced in real time</div></div></div>
      <div class="ag reveal d1"><div class="ag-num">Agent 06 · Finance Intelligence</div><span class="ag-icon"></span><div class="ag-name">Loan &amp; Portfolio Monitor</div><p class="ag-body">For microfinance and credit-linked programmes: real-time portfolio health dashboards — PAR30, PAR90, disbursement rate by partner. Early warning on deteriorating repayment trends. Links loan performance to programme training completion.</p><div class="ag-feats"><div class="agf">Real-time portfolio health: PAR30, PAR90</div><div class="agf">Disbursement tracking: actual vs. target</div><div class="agf">Outcome linkage to training completion</div></div></div>
      <div class="ag reveal"><div class="ag-num">Agent 07 · Communications</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="pen"></span></span><div class="ag-name">Document Drafting Agent</div><p class="ag-body">Auto-drafts donor updates, board briefing documents, field visit reports, success story narratives, and partner correspondence — all structured correctly, data-sourced, and routed for review. No blank page, ever.</p><div class="ag-feats"><div class="agf">Donor update &amp; programme narratives</div><div class="agf">Board &amp; leadership briefing documents</div><div class="agf">Success stories from field data</div></div></div>
      <div class="ag reveal d1"><div class="ag-num">Agent 08 · Risk &amp; Compliance</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="shield"></span></span><div class="ag-name">Compliance &amp; Risk Sentinel</div><p class="ag-body">Tracks all compliance obligations across every partner — ESS standards, grievance mechanisms, fiduciary requirements, safeguarding alerts. Automatically compiles compliance evidence portfolios before donor or audit reviews.</p><div class="ag-feats"><div class="agf">ESS / environmental &amp; social obligation tracking</div><div class="agf">Grievance monitoring by age, type &amp; resolution</div><div class="agf">Audit-ready evidence portfolio auto-compiled</div></div></div>
      <div class="ag reveal"><div class="ag-num">Agent 09 · Strategic Planning</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="spark"></span></span><div class="ag-name">Programme Forecasting Agent</div><p class="ag-body">Predicts programme trajectory — beneficiary count, KPI/DLI achievement probability, budget utilisation — with three-scenario modelling (base, optimistic, risk) and confidence intervals. Updated weekly from live data.</p><div class="ag-feats"><div class="agf">3-scenario trajectory models</div><div class="agf">DLI/KPI achievement probability scoring</div><div class="agf">Budget utilisation projections by component</div></div></div>
      <div class="ag reveal d1"><div class="ag-num">Agent 10 · Credit Intelligence</div><span class="ag-icon"></span><div class="ag-name">Psychometric Profiling Agent</div><p class="ag-body">For microfinance and credit programmes: AI-supported creditworthiness assessment across 7 psychometric dimensions — entrepreneurial spirit, financial discipline, risk appetite, business knowledge — without requiring formal credit history.</p><div class="ag-feats"><div class="agf">7-dimension assessment — no credit history needed</div><div class="agf">Recommended loan amount, tenure &amp; terms</div><div class="agf">Continuous improvement from repayment outcomes</div></div></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- PSYCHOMETRIC -->
<section class="ngo-signature">
  <div class="page">
    <div class="eyebrow reveal">Signature Feature</div>
    <h2 class="h2 reveal">Psychometric Profiling.<br><em>How better credit decisions unlock better outcomes.</em></h2>
    <p class="sp reveal">For microfinance and credit-linked development programmes, Psychometric Profiling addresses the fundamental challenge: how do you assess creditworthiness when there is no formal credit history? Antarious uses behavioural and cognitive signals to support fairer lending decisions, stronger portfolio quality, and wider access for underserved borrowers.</p>
    <div class="psych-card reveal">
      <div>
        <div style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;color:var(--ink);margin-bottom:20px">Three Assessment Pillars</div>
        <div class="psych-pillars">
          <div class="pp"><div class="pp-num">Pillar 01</div><div class="pp-title">Entrepreneurial Intelligence</div><p class="pp-desc">Problem-solving ability, adaptability, and innovative thinking. The cognitive traits that predict business resilience in challenging environments — assessed through how applicants think, not just what they know.</p></div>
          <div class="pp"><div class="pp-num">Pillar 02</div><div class="pp-title">Financial Behaviour</div><p class="pp-desc">Savings discipline, expense management, understanding of credit obligations. Evaluates financial behaviour and discipline without requiring formal credit history or collateral documentation.</p></div>
          <div class="pp"><div class="pp-num">Pillar 03</div><div class="pp-title">Business Viability</div><p class="pp-desc">Market awareness, customer understanding, pricing knowledge, operational planning. Tests real-world business readiness before a loan is approved — identifying applicants with genuine market viability.</p></div>
        </div>
      </div>
      <div>
        <div style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;color:var(--ink);margin-bottom:20px">The 6-Step Assessment Process</div>
        <div class="psych-steps">
          <div class="pss"><div class="pss-num">1</div><div><div class="pss-title">Digital Assessment Delivery</div><p class="pss-desc">Applicant completes a structured assessment on any smartphone with audio support. 15–20 minutes. No facilitator required. Designed for low-literacy users in local language.</p></div></div>
          <div class="pss"><div class="pss-num">2</div><div><div class="pss-title">Multi-Dimension Scoring</div><p class="pss-desc">AI analyses 7 psychometric dimensions simultaneously — entrepreneurial spirit, risk appetite, financial discipline, social capital, business knowledge, resilience, and motivation.</p></div></div>
          <div class="pss"><div class="pss-num">3</div><div><div class="pss-title">Portfolio Cross-Reference</div><p class="pss-desc">Agent compares the applicant's profile against historical loan portfolio outcomes — identifying which profile types have historically performed well in similar contexts.</p></div></div>
          <div class="pss"><div class="pss-num">4</div><div><div class="pss-title">Credit Score Generation</div><p class="pss-desc">Composite creditworthiness score with recommended loan amount, tenure, and repayment structure — tailored to the applicant's specific profile.</p></div></div>
          <div class="pss"><div class="pss-num">5</div><div><div class="pss-title">Loan Officer Review</div><p class="pss-desc">AI output is a recommendation, not a decision. Loan officer reviews the full profile, uses AI risk flags to guide the interview, and makes the final credit decision. Human in the loop, always.</p></div></div>
          <div class="pss"><div class="pss-num">6</div><div><div class="pss-title">Outcome Learning Loop</div><p class="pss-desc">Repayment performance feeds back to the model — every loan outcome makes the next assessment more precise. The system improves continuously as your portfolio grows.</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- WORKFLOW -->
<section class="alt ngo-roadmap">
  <div class="page">
    <div class="eyebrow reveal">Implementation Roadmap</div>
    <h2 class="h2 reveal">From agreement to full deployment<br>in <em>four phased steps.</em></h2>
    <p class="sp reveal">A structured deployment approach — measurable milestones at every stage, with your team fully trained and capable of independent operation by month 7.</p>
    <div style="max-width:700px;margin-top:48px">
      <div class="workflow-steps">
        <div class="ws reveal"><div class="ws-num"><div class="ws-circle">1</div></div><div class="ws-body"><div class="ws-title">Foundation — System Setup &amp; Integration</div><p class="ws-p">Dedicated Antarious AI environment provisioned — isolated, secure, configured for your programme structure. Core data integration with your existing MIS, partner data portal, and beneficiary database. Leadership training — up to 40 participants using the full system within weeks 4–6.</p><div class="ws-chip"><span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Weeks 1–6</div></div></div>
        <div class="ws reveal d1"><div class="ws-num"><div class="ws-circle">2</div></div><div class="ws-body"><div class="ws-title">Core Operations — M&amp;E Automation &amp; Field Data</div><p class="ws-p">M&amp;E Report Generator activated — first donor report drafted by the system, reviewed and approved by your officers. Field Data Analyst deployed — automated partner submission processing. Beneficiary Analytics Agent configured with live dashboards. Document Drafting Agent activated for officer communications and donor updates.</p><div class="ws-chip"><span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Weeks 6–16</div></div></div>
        <div class="ws reveal d2"><div class="ws-num"><div class="ws-circle">3</div></div><div class="ws-body"><div class="ws-title">Financial Intelligence — Portfolio, Compliance &amp; Profiling</div><p class="ws-p">Psychometric Profiling System deployed — calibrated against your portfolio history and activated for new loan applicants. Loan Portfolio Monitor connected to your lending MIS. Compliance &amp; Risk Sentinel activated — obligation monitoring, grievance tracking, and compliance dashboards live. Role-specific training for finance and compliance officers.</p><div class="ws-chip"><span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Weeks 16–28</div></div></div>
        <div class="ws reveal d3"><div class="ws-num"><div class="ws-circle">4</div></div><div class="ws-body"><div class="ws-title">Full Intelligence — Forecasting &amp; Long-Term Partnership</div><p class="ws-p">Programme Forecasting Agent activated — 90-day trajectory models and DLI/KPI probability scorecards live. Full system integration review — all 10 agents operating, all data streams connected. System administration training for your IT team. Monthly reviews, quarterly refreshes, annual assessments embedded in the ongoing partnership.</p><div class="ws-chip"><span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Month 7 onwards — Continuous</div></div></div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FAQ -->
<section class="alt">
  <div class="page">
    <div class="eyebrow reveal">NGO FAQs</div>
    <h2 class="h2 reveal">Answers for <em>programme and field teams.</em></h2>
    <p class="sp reveal">Practical clarifications for donor reporting, partner operations, and development programme delivery.</p>
    <div class="reveal" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:26px">
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">Can Freya generate donor M&amp;E reports from live data?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Yes. Freya drafts narrative and KPI sections from connected MIS sources, then routes outputs to officers for review and approval before submission.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">How does Freya handle different partner data formats?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Field Data Analyst supports mixed submission formats and normalises them into a unified model so leadership dashboards and reports remain consistent.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">Is psychometric profiling a final lending decision?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">No. It provides AI-supported recommendations across seven behavioural dimensions. Loan officers remain the final decision makers in every case.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">Can we detect programme risks earlier?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Yes. Freya continuously tracks partner and beneficiary signals, triggers early warnings, and includes contextual analysis to support timely intervention.</p></div>
    </div>
    <div class="reveal" style="margin-top:18px"><a href="/faq/comprehensive" class="btn-more">View full FAQ library →</a></div>
  </div>
</section>

<div class="divider"></div>

<!-- CTA -->
<section>
  <div class="page"><div class="cta-card reveal"><div class="cta-dots"></div><div class="cta-c"><div class="cta-ey">Ready to Begin</div><h2 class="cta-h2">Transform your programme operations with Freya.</h2><p class="cta-p">Purpose-built for NGO and development organisations. Not adapted from a corporate sales tool. Ready to deploy in your programme reality.</p><div class="cta-btns"><button class="btn-cta-p">Request a Demo <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button><button class="btn-cta-g" onclick="location.href='/freya'">Meet Freya →</button></div></div></div></div>
</section>

<!-- FOOTER -->
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

<script>
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));
const io=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -32px 0px'});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
function showNgoUC(k,b){document.querySelectorAll('.ngo-roles .uc-panel').forEach(p=>{p.classList.remove('on');p.style.display='none'});const p=document.getElementById('ngo-uc-'+k);if(!p)return;p.style.display='grid';p.classList.add('on');p.style.opacity='0';requestAnimationFrame(()=>{p.style.transition='opacity .35s';p.style.opacity='1'});document.querySelectorAll('.ngo-roles .uc-tab').forEach(t=>t.classList.remove('on'));if(b)b.classList.add('on')}
document.querySelectorAll('.ngo-roles .uc-panel').forEach(p=>{if(!p.classList.contains('on'))p.style.display='none'});
const thoughts=['Aggregating Q2 field data from all partner organisations…','M&E Report Generator: drafting quarterly donor report…','Partner Performance Monitor: 3 alerts flagged this week','Beneficiary Analytics: dropout pattern detected in Region 3','Psychometric Profiling: 48 credit assessments processed today','Document Drafting Agent: board brief ready for review','Compliance Sentinel: 0 open grievances older than 14 days','Forecasting Agent: Q3 trajectory model updated'];
let tIdx=0;const thEl=document.getElementById('ngoThink');
setInterval(()=>{tIdx=(tIdx+1)%thoughts.length;if(!thEl)return;thEl.style.opacity='0';setTimeout(()=>{thEl.innerHTML=thoughts[tIdx]+'&thinsp;<span class="t-cur">|</span>';thEl.style.transition='opacity .4s';thEl.style.opacity='1'},240)},3200);
const ngoTasks=['Generating partner performance rankings for review…','Validating new field submissions from 12 districts…','Compiling safeguarding evidence bundle for donor review…','Refreshing beneficiary dropout heatmap for programme leads…'];
let ngi=0;const ngoTaskEl=document.getElementById('ngoTask');
if(ngoTaskEl)setInterval(()=>{ngi=(ngi+1)%ngoTasks.length;ngoTaskEl.style.opacity='0';setTimeout(()=>{ngoTaskEl.textContent=ngoTasks[ngi];ngoTaskEl.style.transition='opacity .35s';ngoTaskEl.style.opacity='1'},180)},2550);
const ngoMetrics=[{id:'ngoCount',vals:['20,482','20,497','20,513','20,526']},{id:'ngoReportTime',vals:['4 min','5 min','4 min','4 min']},{id:'ngoPartners',vals:['280','282','281','283']}];
ngoMetrics.forEach(metric=>{const el=document.getElementById(metric.id);if(!el)return;let i=0;setInterval(()=>{i=(i+1)%metric.vals.length;el.style.opacity='0';setTimeout(()=>{el.textContent=metric.vals[i];el.style.transition='opacity .3s';el.style.opacity='1'},150)},4300)});
function rotateNgo(id,arr,delay){
  const el=document.getElementById(id);if(!el)return;
  let i=0;
  setInterval(()=>{i=(i+1)%arr.length;el.style.opacity='0';setTimeout(()=>{el.textContent=arr[i];el.style.transition='opacity .35s';el.style.opacity='1'},180)},delay||3200);
}
rotateNgo('ngoRoleLeadTick',['Freya: refreshing leadership programme brief…','Freya: compiling partner risk summary for directors…','Freya: syncing donor deadlines into the morning brief…'],3200);
rotateNgo('ngoRoleLeadAlert',['3 partner organisations are behind target — intervention path drafted for approval.','Region 4 has slipped on two key indicators — donor-facing note prepared for review.','Beneficiary dropout signal increased in one district — escalation memo queued.'],4200);
rotateNgo('ngoRoleLeadTag',['280 partners monitored · donor brief ready · leadership context synced','282 partners monitored · 3 risk summaries drafted · 0 manual lookups','Live programme view updated · leadership note packaged · approvals pending'],3800);
rotateNgo('ngoRoleMETick',['M&E Report Generator: drafting quarterly donor update…','Freya: validating indicator submissions across 280 partners…','Freya: packaging evidence links for donor review…'],3300);
rotateNgo('ngoRoleFieldTick',['Freya: refreshing field intervention map…','Freya: reprioritising partner visit brief for Region 3…','Freya: syncing beneficiary risk markers for field teams…'],3400);
rotateNgo('ngoRoleFieldAlert',['Region 3 dropout pattern requires immediate field follow-up','Partner capacity gap detected in District 7 — support note prepared','Submission delays in one corridor now exceed threshold — escalation ready'],4300);
rotateNgo('ngoRoleCreditTick',['Psychometric Profiling: 48 assessments processed today…','Freya: cross-referencing applicant profile against repayment history…','Freya: recalculating recommended tenure and loan exposure…'],3500);
rotateNgo('ngoRoleCreditAlert',['Freya recommends moderate loan exposure with phased repayment based on behavioural profile and portfolio fit.','Entrepreneurial resilience score increased confidence for a first-cycle applicant recommendation.','Risk appetite and financial discipline profile suggest staged disbursement with close monitoring.'],4400);
rotateNgo('ngoRoleCreditScore',['82/100','79/100','86/100'],3600);
rotateNgo('ngoRoleCreditTerm',['12 mo','10 mo','14 mo'],3900);
const ngoFastThoughts=['Refreshing partner-risk heatmap from live field submissions…','Packaging donor-ready exception note for leadership…','Linking psychometric outcomes to portfolio recommendations…','Syncing new programme drift markers into the morning brief…'];
let nft=0;if(thEl)setInterval(()=>{nft=(nft+1)%ngoFastThoughts.length;thEl.style.opacity='0';setTimeout(()=>{thEl.innerHTML=ngoFastThoughts[nft]+'&thinsp;<span class="t-cur">|</span>';thEl.style.transition='opacity .28s';thEl.style.opacity='1'},150)},1900);
const ngoTaskBursts=['Escalating one partner deviation for review…','Refreshing donor narrative after new field uploads…','Recomputing district risk summary for programme lead…'];
let ntb=0;if(ngoTaskEl)setInterval(()=>{ntb=(ntb+1)%ngoTaskBursts.length;ngoTaskEl.style.opacity='0';setTimeout(()=>{ngoTaskEl.textContent=ngoTaskBursts[ntb];ngoTaskEl.style.transition='opacity .28s';ngoTaskEl.style.opacity='1'},140)},1750);
document.querySelectorAll('.t-pf,.dw-pf').forEach((bar,idx)=>{let w=56+(idx*8);setInterval(()=>{w=56+((w+Math.floor(Math.random()*18)+8)%34);bar.style.width=w+'%'},1480+(idx*120))});
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
