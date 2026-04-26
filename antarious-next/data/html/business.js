const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Antarious AI for Business — The GTM Operating System</title>
<meta name="description" content="Replace your 17-tool GTM stack with one AI-native platform. Freya automates strategy, content, leads, outreach, ads, and analytics — 24/7.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&family=DM+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:"Plus Jakarta Sans",sans-serif;line-height:1.65;overflow-x:hidden;transition:background .35s,color .35s}
[data-theme="light"]{--bg:#FAFAF7;--bg2:#FFFFFF;--bg3:#F4F2ED;--bg4:#ECE9E2;--ink:#0C1729;--ink2:#2D3F5A;--ink3:#5A6E87;--ink4:#94A3B8;--ink5:#CBD5E1;--td:#0284C7;--tdd:#0369A1;--tl:#38BDF8;--teal:#0EA5E9;--tbg:rgba(14,165,233,.07);--tbg2:rgba(14,165,233,.13);--tbdr:rgba(14,165,233,.2);--tbdr2:rgba(14,165,233,.4);--green:#059669;--gbg:rgba(5,150,105,.08);--gbdr:rgba(5,150,105,.2);--red:#DC2626;--rbg:rgba(220,38,38,.06);--rbdr:rgba(220,38,38,.17);--amber:#D97706;--abg:rgba(217,119,6,.07);--bdr:rgba(12,23,41,.08);--bdr2:rgba(12,23,41,.05);--sh:0 1px 4px rgba(0,0,0,.05),0 8px 32px rgba(0,0,0,.06);--sh2:0 4px 24px rgba(0,0,0,.07),0 20px 64px rgba(0,0,0,.07);--sht:0 4px 24px rgba(2,132,199,.2);--logo:block;--logo-w:none}
[data-theme="dark"]{--bg:#080E1A;--bg2:#0E1826;--bg3:#141F30;--bg4:#1A2840;--ink:#EDF2FF;--ink2:#BDD0EE;--ink3:#7A9AB8;--ink4:#4A6785;--ink5:#2D4660;--td:#38BDF8;--tdd:#7DD3FC;--tl:#38BDF8;--teal:#0EA5E9;--tbg:rgba(14,165,233,.1);--tbg2:rgba(14,165,233,.18);--tbdr:rgba(14,165,233,.25);--tbdr2:rgba(14,165,233,.45);--green:#34D399;--gbg:rgba(52,211,153,.1);--gbdr:rgba(52,211,153,.25);--red:#F87171;--rbg:rgba(248,113,113,.08);--rbdr:rgba(248,113,113,.22);--amber:#FCD34D;--abg:rgba(252,211,77,.08);--bdr:rgba(255,255,255,.08);--bdr2:rgba(255,255,255,.05);--sh:0 1px 4px rgba(0,0,0,.3),0 8px 32px rgba(0,0,0,.25);--sh2:0 4px 24px rgba(0,0,0,.28),0 20px 64px rgba(0,0,0,.3);--sht:0 4px 24px rgba(56,189,248,.18);--logo:none;--logo-w:block}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes slideL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes spinR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes blink{50%{opacity:0}}
@keyframes liveBar{0%{width:4%}65%{width:87%}85%{width:94%}100%{width:99%}}
@keyframes particleSpin{from{transform:rotate(var(--pr,0deg)) translateX(var(--pd,80px))}to{transform:rotate(calc(var(--pr,0deg) + 360deg)) translateX(var(--pd,80px))}}
@keyframes orbGlow{0%,100%{box-shadow:0 0 0 0 rgba(2,132,199,.3),0 0 40px rgba(2,132,199,.15)}50%{box-shadow:0 0 0 16px rgba(2,132,199,.05),0 0 70px rgba(2,132,199,.25)}}
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
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:"DM Mono",monospace;font-size:9.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--td);margin-bottom:16px}
.eyebrow::before{content:"";width:16px;height:1.5px;background:var(--td);border-radius:2px;flex-shrink:0}
.h2{font-family:"Outfit",sans-serif;font-size:clamp(26px,3.5vw,50px);font-weight:900;color:var(--ink);line-height:1.05;letter-spacing:-1.6px;margin-bottom:16px}
.h2 em{color:var(--td);font-style:italic}
.sp{font-size:17px;color:var(--ink3);line-height:1.82;max-width:600px;margin-bottom:52px}
.sp.w{max-width:800px}
.btn{font-family:"Outfit",sans-serif;font-weight:700;border:none;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:8px;border-radius:12px}
.btn-p{background:var(--td);color:#fff;padding:14px 32px;font-size:15px;box-shadow:var(--sht)}
.btn-p:hover{background:var(--tdd);transform:translateY(-2px);box-shadow:0 8px 32px rgba(2,132,199,.34)}
.btn-p svg{transition:transform .2s}.btn-p:hover svg{transform:translateX(3px)}
.btn-g{background:var(--bg2);color:var(--ink2);border:1.5px solid var(--bdr);padding:13px 28px;font-size:15px;box-shadow:var(--sh)}
.btn-g:hover{border-color:var(--tbdr);color:var(--td);transform:translateY(-2px);box-shadow:var(--sh2)}
/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:900;height:64px;display:flex;align-items:center;padding:0 48px;gap:8px;background:rgba(250,250,247,.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--bdr);transition:all .3s}
[data-theme="dark"] .nav{background:rgba(8,14,26,.92)}
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
  transition:all .2s;box-shadow:0 4px 14px rgba(15,23,42,.04)
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
.btn-back{font-family:"Outfit",sans-serif;font-size:13px;font-weight:600;color:var(--ink3);background:none;border:1px solid var(--bdr);padding:7px 14px;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px}
.btn-back:hover{border-color:var(--tbdr);color:var(--td);background:var(--tbg)}
.btn-nav-cta{font-family:"Outfit",sans-serif;font-size:13px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--td),var(--tdd));border:none;padding:9px 22px;border-radius:12px;cursor:pointer;transition:all .22s;box-shadow:0 6px 16px rgba(2,132,199,.24)}
.btn-nav-cta:hover{background:linear-gradient(135deg,var(--tdd),#0369A1);transform:translateY(-1px);box-shadow:0 10px 24px rgba(2,132,199,.3)}
/* HERO */
.hero-wrap{min-height:100vh;position:relative;overflow:hidden;background:var(--bg)}
.hero-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(14,165,233,.09) 1px,transparent 1px);background-size:42px 42px;mask-image:radial-gradient(ellipse at 62% 38%,black 20%,transparent 65%);pointer-events:none}
.hero-glow{position:absolute;top:-18%;right:-8%;width:650px;height:650px;background:radial-gradient(circle,rgba(14,165,233,.08),transparent 60%);pointer-events:none}
[data-theme="dark"] .hero-glow{background:radial-gradient(circle,rgba(14,165,233,.13),transparent 60%)}
.hero-inner{max-width:1240px;margin:0 auto;padding:120px 48px 100px;display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;position:relative;z-index:2}
.hero-kicker{display:inline-flex;align-items:center;gap:9px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--td);margin-bottom:20px;animation:fadeUp .5s ease both}
.hero-kicker::before{content:"";width:18px;height:1.5px;background:var(--td);flex-shrink:0}
.kd{width:5px;height:5px;border-radius:50%;background:var(--green);box-shadow:0 0 7px rgba(5,150,105,.6);animation:pulse 1.8s ease infinite}
.hero-h1{font-family:"Outfit",sans-serif;font-size:clamp(38px,5vw,72px);font-weight:900;color:var(--ink);line-height:.95;letter-spacing:-2.8px;margin-bottom:4px;animation:fadeUp .55s .06s ease both}
.hero-h1 .ac{color:var(--td)}.hero-h1 .dm{color:var(--ink4);font-weight:400}
.hero-sub{font-family:"Outfit",sans-serif;font-size:clamp(16px,1.8vw,22px);font-weight:600;color:var(--ink3);margin-bottom:16px;letter-spacing:-.3px;animation:fadeUp .55s .10s ease both}
.hero-sub strong{color:var(--ink2)}
.hero-body{font-size:16px;line-height:1.8;color:var(--ink3);max-width:490px;margin-bottom:30px;animation:fadeUp .55s .14s ease both}
.hero-btns{display:flex;gap:12px;margin-bottom:40px;animation:fadeUp .55s .18s ease both;flex-wrap:wrap}
.hero-stats{display:flex;gap:22px;padding-top:22px;border-top:1px solid var(--bdr);animation:fadeUp .55s .22s ease both;flex-wrap:wrap;align-items:flex-start}
.hs-v{font-family:"Outfit",sans-serif;font-size:27px;font-weight:900;color:var(--td);line-height:1}
.hs-l{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink4);margin-top:4px}
.hs-sep{width:1px;height:30px;background:var(--bdr);align-self:center;flex-shrink:0}
/* TERMINAL */
.terminal{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:24px;box-shadow:var(--sh2);overflow:hidden;animation:fadeUp .6s .08s ease both}
.t-bar{display:flex;align-items:center;gap:10px;padding:11px 16px;background:var(--bg3);border-bottom:1px solid var(--bdr2)}
.t-dots{display:flex;gap:5px}.t-dot{width:10px;height:10px;border-radius:50%}
.t-title{flex:1;text-align:center;font-family:"DM Mono",monospace;font-size:9.5px;font-weight:700;letter-spacing:1.5px;color:var(--ink4)}
.t-live{display:flex;align-items:center;gap:5px;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;color:var(--green);background:var(--gbg);border:1px solid var(--gbdr);padding:2px 9px;border-radius:20px}
.t-ldot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.5s ease infinite}
.t-prog{height:2px;background:var(--bg3)}.t-pf{height:100%;background:linear-gradient(90deg,var(--tl),var(--td));animation:liveBar 4s ease-in-out infinite}
.t-body{padding:16px;display:flex;flex-direction:column;gap:11px}
.t-frow{display:flex;align-items:center;gap:12px;padding:11px 14px;background:linear-gradient(135deg,var(--tbg),transparent);border:1.5px solid var(--tbdr);border-radius:16px}
.t-morb{width:44px;height:44px;border-radius:50%;position:relative;flex-shrink:0}
.t-mface{width:100%;height:100%;border-radius:50%;background:conic-gradient(from var(--ca) at 50% 50%,#0369A1,#38BDF8 30%,#0EA5E9 60%,#0284C7 85%,#0369A1);animation:conic 5s linear infinite,orbGlow 3s ease infinite;display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:17px;font-weight:900;color:#fff}
.t-mring{position:absolute;inset:-4px;border-radius:50%;border:1.5px solid rgba(2,132,199,.28);animation:rippleOut 2.5s ease-out infinite}
.t-fname{font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;color:var(--ink)}
.t-fstatus{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1px;color:var(--green);margin-top:2px;display:flex;align-items:center;gap:5px}
.t-fstatus::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--green);animation:pulse 1.5s ease infinite;flex-shrink:0}
.t-fagents{font-family:"DM Mono",monospace;font-size:8.5px;color:var(--ink4);margin-top:1px}
.t-think{font-family:"DM Mono",monospace;font-size:11px;color:var(--ink3);padding:9px 12px;background:var(--bg3);border-radius:8px;border-left:2px solid var(--td);line-height:1.6;min-height:36px}
.t-cur{animation:blink .8s step-end infinite}
.tasks{display:flex;flex-direction:column;gap:5px}
.task{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;border:1px solid var(--bdr2);background:var(--bg2);transition:all .3s}
.task.done{background:var(--gbg);border-color:var(--gbdr)}.task.run{background:var(--tbg);border-color:var(--tbdr)}.task.wait{opacity:.4}
.tic{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0}
.tcd{background:var(--gbg);color:var(--green)}.tcr{background:var(--tbg);color:var(--td)}.tcw{background:var(--bg3);color:var(--ink4)}
.task-txt{flex:1;font-size:11.5px;color:var(--ink2)}
.task-tm{font-family:"DM Mono",monospace;font-size:9px;font-weight:700}
.tmc{color:var(--green)}.tmr{color:var(--td);animation:pulse 2s ease infinite}.tmw{color:var(--ink4)}
.t-alert{background:var(--abg);border:1px solid rgba(217,119,6,.2);border-radius:8px;padding:9px 12px;display:flex;gap:8px;align-items:flex-start}
.ta-lbl{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1px;color:var(--amber);text-transform:uppercase;margin-bottom:2px}
.ta-txt{font-size:11.5px;color:var(--ink2);line-height:1.55}
.t-mets{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.tm{background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:9px;text-align:center}
.tm-v{font-family:"Outfit",sans-serif;font-size:18px;font-weight:900;color:var(--td);line-height:1}
.tm-l{font-family:"DM Mono",monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;text-transform:uppercase;margin-top:3px}
/* TRUST STRIP */
.trust-strip{overflow:hidden;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);background:var(--bg2);padding:14px 0}
.trust-lbl{text-align:center;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--ink5);margin-bottom:12px}
.scroll-row{overflow:hidden;white-space:nowrap}
.scroll-inner{display:inline-flex;gap:52px;animation:slideL 26s linear infinite;align-items:center}
.slogo{font-family:"Outfit",sans-serif;font-size:12.5px;font-weight:700;color:var(--ink5);flex-shrink:0;transition:color .2s;cursor:default}
.slogo:hover{color:var(--ink3)}
/* COST */
.cost-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bdr);border-radius:24px;overflow:hidden;border:1px solid var(--bdr);margin-bottom:32px}
.cc{background:var(--bg2);padding:28px 22px;position:relative;overflow:hidden;transition:background .2s;cursor:default}
.cc::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--cc,var(--red))}
.cc-icon{font-size:22px;margin-bottom:10px}
.cc-val{font-family:"Outfit",sans-serif;font-size:38px;font-weight:900;color:var(--cc,var(--red));line-height:1;margin-bottom:5px}
.cc-title{font-family:"Outfit",sans-serif;font-size:14px;font-weight:700;color:var(--ink);margin-bottom:5px}
.cc-desc{font-size:12.5px;color:var(--ink3);line-height:1.65}
/* WASTE CHART */
.wc{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:24px;padding:36px 40px;box-shadow:var(--sh)}
.wc-h{font-family:"Outfit",sans-serif;font-size:18px;font-weight:800;color:var(--ink);margin-bottom:4px}
.wc-s{font-size:13px;color:var(--ink3);margin-bottom:24px}
.wc-bars{display:flex;flex-direction:column;gap:16px}
.wr-pair{display:grid;gap:8px}
.wr{display:flex;align-items:center;gap:12px;margin-bottom:0}
.wr-lbl{font-size:12px;color:var(--ink2);width:190px;flex-shrink:0;line-height:1.4}
.wr-lbl.sub{opacity:.22}
.wr-wrap{flex:1;height:30px;background:rgba(148,163,184,.16);border-radius:9px;overflow:hidden;position:relative}
.wr-time{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-family:"DM Mono",monospace;font-size:13px;font-weight:800;letter-spacing:0;color:#F8FBFF;background:rgba(15,23,42,.74);border:1px solid rgba(255,255,255,.12);padding:4px 12px;border-radius:999px;z-index:2;pointer-events:none;white-space:nowrap;line-height:1}
.wr-bar{height:100%;border-radius:5px;width:0;transition:width 1.6s cubic-bezier(.22,1,.36,1)}
.wr-bar.m{background:linear-gradient(90deg,#EF4444,rgba(239,68,68,.55))}.wr-bar.f{background:linear-gradient(90deg,var(--td),var(--tl))}
.wr-num{font-family:"DM Mono",monospace;font-size:11px;font-weight:700;width:62px;text-align:right;flex-shrink:0}
.nb{color:var(--red)}.ng{color:var(--green)}
.wc-leg{display:flex;gap:20px;margin-top:18px;padding-top:14px;border-top:1px solid var(--bdr)}
.wc-li{display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--ink3)}
.wc-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0}
/* BRIDGE */
.bridge-grid{display:grid;grid-template-columns:1fr 64px 1fr;border-radius:24px;overflow:hidden;border:1.5px solid var(--bdr);background:var(--bg2);box-shadow:var(--sh2);margin-bottom:28px}
.b-human{padding:34px 30px;border-right:1px solid var(--bdr)}
.b-freya{padding:34px 30px;background:linear-gradient(150deg,var(--tbg),var(--bg2))}
.b-mid{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:var(--bg3);border-left:1px solid var(--bdr);border-right:1px solid var(--bdr)}
.b-plus{font-family:"Outfit",sans-serif;font-size:26px;font-weight:900;color:var(--td)}
.b-vl{width:1.5px;height:26px;background:linear-gradient(to bottom,transparent,var(--tbdr),transparent)}
.b-av{width:62px;height:62px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:12px;background:rgba(139,92,246,.08);border:2px solid rgba(139,92,246,.2)}
.b-forb{width:62px;height:62px;border-radius:50%;position:relative;margin-bottom:12px;cursor:pointer}
.bfc{width:100%;height:100%;border-radius:50%;background:conic-gradient(from var(--ca) at 50% 50%,#0369A1,#38BDF8 30%,#0EA5E9 60%,#0284C7 85%,#0369A1);animation:conic 4s linear infinite,orbGlow 3.5s ease infinite}
.bfi{position:absolute;inset:6px;border-radius:50%;background:var(--bg2);display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:19px;font-weight:900;color:var(--td)}
.bfr1{position:absolute;inset:-5px;border-radius:50%;border:1.5px solid rgba(2,132,199,.24);animation:rippleOut 2.8s ease-out infinite}
.b-name{font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;color:var(--ink);margin-bottom:4px}
.b-sub{font-size:12px;color:var(--ink3);margin-bottom:18px;line-height:1.5}
.b-items{display:flex;flex-direction:column;gap:6px}
.b-item{display:flex;align-items:center;gap:8px;padding:8px 11px;border-radius:8px;background:var(--bg3);border:1px solid var(--bdr2);font-size:12.5px;color:var(--ink2);transition:all .2s;cursor:default}
.b-item:hover{background:var(--bg4)}.b-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.bridge-note{text-align:center;padding:16px 28px;background:var(--tbg);border:1.5px solid var(--tbdr);border-radius:16px;margin-bottom:24px;font-size:14px;color:var(--ink2);line-height:1.65}
.bridge-note strong{color:var(--ink)}
.bo-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bdr);border-radius:16px;overflow:hidden;border:1px solid var(--bdr)}
.bo{background:var(--bg2);padding:20px;text-align:center;transition:background .2s;cursor:default}
.bo:hover{background:var(--tbg)}
.bo-val{font-family:"Outfit",sans-serif;font-size:30px;font-weight:900;color:var(--td);line-height:1;margin-bottom:4px}
.bo-lbl{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink4)}
/* USE CASES */
.uc-tabs{display:flex;gap:6px;margin-bottom:32px;flex-wrap:wrap}
.uc-tab{font-family:"DM Mono",monospace;font-size:10.5px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--ink3);background:var(--bg2);border:1.5px solid var(--bdr);padding:9px 18px;border-radius:16px;cursor:pointer;transition:all .2s}
.uc-tab.on{color:var(--td);background:var(--tbg);border-color:var(--tbdr2)}
.uc-tab:hover:not(.on){color:var(--ink2);background:var(--bg3)}
.uc-panel{display:none;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.uc-panel.on{display:grid}
.uc-h3{font-family:"Outfit",sans-serif;font-size:clamp(19px,2.3vw,30px);font-weight:900;color:var(--ink);line-height:1.08;letter-spacing:-.7px;margin-bottom:12px}
.uc-h3 em{color:var(--td);font-style:italic}
.uc-p{font-size:14.5px;color:var(--ink2);line-height:1.78;margin-bottom:16px}
.uc-stats{display:flex;gap:18px;margin-bottom:20px;flex-wrap:wrap;align-items:flex-start}
.uc-sv{font-family:"Outfit",sans-serif;font-size:24px;font-weight:900;color:var(--td);line-height:1}
.uc-sl{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink4);margin-top:3px}
.uc-div{width:1px;background:var(--bdr);height:32px;align-self:center;flex-shrink:0}
.uc-steps{display:flex;flex-direction:column;gap:7px;margin-bottom:18px}
.uc-step{display:flex;gap:9px;align-items:flex-start;padding:9px 11px;border-radius:8px;background:var(--bg3);border:1px solid var(--bdr2)}
.uc-sn{width:20px;height:20px;border-radius:5px;background:var(--tbg);border:1px solid var(--tbdr);display:flex;align-items:center;justify-content:center;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;color:var(--td);flex-shrink:0}
.uc-st{font-size:12.5px;color:var(--ink2);line-height:1.55}
.demo-win{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:16px;overflow:hidden;box-shadow:var(--sh2)}
.dw-bar{background:var(--bg3);padding:10px 14px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;gap:8px}
.dw-dots{display:flex;gap:4px}.dw-dot{width:9px;height:9px;border-radius:50%}
.dw-url{flex:1;text-align:center;font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink4)}
.dw-live{display:flex;align-items:center;gap:4px;font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;color:var(--green)}
.dw-ldot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.5s ease infinite}
.dw-prog{height:2px;background:var(--bg3)}.dw-pf{height:100%;background:linear-gradient(90deg,var(--teal),var(--tl));animation:liveBar 3.5s ease-in-out infinite}
.dw-body{padding:16px;min-height:260px}
.f-tick{display:flex;align-items:center;gap:8px;padding:7px 11px;background:var(--tbg);border:1px solid var(--tbdr);border-radius:8px;margin-bottom:11px}
.f-tick-orb{width:20px;height:20px;border-radius:50%;background:conic-gradient(from var(--ca),#0369A1,#38BDF8,#0369A1);animation:conic 4s linear infinite;display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:9px;font-weight:900;color:#fff;flex-shrink:0}
.f-tick-txt{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;color:var(--td);flex:1}
.f-tick-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.4s ease infinite;flex-shrink:0}
/* AGENTS */
.agents-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.ag{background:var(--bg2);border:1px solid var(--bdr);border-top:3px solid var(--ac,var(--td));border-radius:18px;padding:22px 20px;transition:all .22s;cursor:default}
.ag:hover{transform:translateY(-4px);box-shadow:var(--sh2);border-color:var(--bdr2)}
.ag-num{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ac,var(--td));margin-bottom:8px}
.ag-icon{font-size:24px;margin-bottom:10px;display:block}
.ag-name{font-family:"Outfit",sans-serif;font-size:15.5px;font-weight:800;color:var(--ink);margin-bottom:6px}
.ag-body{font-size:12.5px;color:var(--ink3);line-height:1.68}
.ag-tag{display:inline-block;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;padding:3px 10px;border-radius:5px;margin-top:10px}
/* COMPARISON */
.ct-wrap{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:24px;overflow:hidden;box-shadow:var(--sh)}
.ct-head{padding:24px 30px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.ct-head h3{font-family:"Outfit",sans-serif;font-size:19px;font-weight:900;color:var(--ink);margin-bottom:2px}
.ct-head p{font-size:12.5px;color:var(--ink3)}
.ct-toggle{display:flex;gap:3px;background:var(--bg3);border:1px solid var(--bdr);border-radius:16px;padding:3px}
.ctt{font-family:"DM Mono",monospace;font-size:9.5px;font-weight:700;letter-spacing:.5px;padding:7px 16px;border-radius:12px;cursor:pointer;transition:all .2s;color:var(--ink3);border:none;background:none}
.ctt.on{background:var(--bg2);box-shadow:var(--sh)}.ctt.m.on{color:var(--red)}.ctt.f.on{color:var(--td)}
.ct-body{padding:22px 30px;display:flex;flex-direction:column;gap:9px}
.ct-ph{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--td);opacity:.65;margin-bottom:3px}
.ct-row{display:grid;grid-template-columns:1fr 42px 1fr;align-items:stretch}
.ct-m{background:var(--rbg);border:1px solid var(--rbdr);border-radius:12px 0 0 12px;padding:13px 15px;transition:opacity .4s}
.ct-f{background:var(--tbg);border:1px solid var(--tbdr);border-radius:0 12px 12px 0;padding:13px 15px;transition:opacity .4s}
.ct-vs{display:flex;align-items:center;justify-content:center;font-family:"DM Mono",monospace;font-size:9px;font-weight:800;color:var(--ink4);background:var(--bg3);border-top:1px solid var(--bdr2);border-bottom:1px solid var(--bdr2)}
.ct-lbl{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px}
.ct-lbl.r{color:var(--red)}.ct-lbl.t{color:var(--td)}
.ct-title{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:3px;line-height:1.4}
.ct-time{font-family:"DM Mono",monospace;font-size:10px;font-weight:700}
.ct-time.r{color:var(--red)}.ct-time.g{color:var(--green)}
.ct-foot{padding:16px 30px;border-top:1px solid var(--bdr2);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;background:var(--bg3)}
.ct-tots{display:flex;gap:24px}
.ct-tl{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink4);margin-bottom:3px}
.ct-tv{font-family:"Outfit",sans-serif;font-size:22px;font-weight:900}
.ct-tv.rv{color:var(--red)}.ct-tv.tv{color:var(--td)}
.btn-more{font-family:"Outfit",sans-serif;font-size:13px;font-weight:700;color:var(--td);background:var(--tbg);border:1.5px solid var(--tbdr);padding:9px 18px;border-radius:10px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.btn-more:hover{background:var(--tbg2);border-color:var(--tbdr2)}
body.ct-before .ct-f{opacity:.25;filter:grayscale(.4)}
body.ct-after .ct-m{opacity:.25;filter:grayscale(.4)}
/* PRICING */
.pg{display:grid;grid-template-columns:repeat(5,1fr);gap:0;background:var(--bdr);border-radius:24px;overflow:hidden;border:1.5px solid var(--bdr);box-shadow:var(--sh2)}
.pc{background:var(--bg2);padding:22px 15px;border-right:1px solid var(--bdr2);position:relative}
.pc:last-child{border-right:none}
.pc.feat{background:var(--ink);border:2px solid var(--td);margin:-1px;z-index:2;box-shadow:var(--sht)}
.pc.feat::before{content:"Most Popular";position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:var(--td);color:#fff;font-family:"DM Mono",monospace;font-size:8px;font-weight:700;letter-spacing:1px;padding:3px 12px;border-radius:0 0 8px 8px}
.pc-tier{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink4);margin-bottom:5px}
.pc-name{font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;color:var(--ink);margin-bottom:3px}
.pc-val{font-family:"Outfit",sans-serif;font-size:24px;font-weight:900;color:var(--td);line-height:1;margin-bottom:2px}
.pc-val span{font-size:12px;font-weight:400;color:var(--ink4)}
.pc-who{font-size:11.5px;color:var(--ink3);line-height:1.55;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--bdr2)}
.pc-feats{list-style:none;display:flex;flex-direction:column;gap:6px;margin-bottom:15px}
.pcf{display:flex;gap:6px;align-items:flex-start;font-size:11px;color:var(--ink2);line-height:1.45}
.pcf::before{content:"";color:var(--td);font-weight:700;flex-shrink:0;font-size:10px;margin-top:1px}
.pc.feat .pc-name,.pc.feat .pc-who,.pc.feat .pcf{color:rgba(240,247,255,.72)}
.pc.feat .pc-val{color:var(--tl)}
.btn-pc{width:100%;font-family:"Outfit",sans-serif;font-size:12px;font-weight:700;padding:9px;border-radius:8px;cursor:pointer;transition:all .2s;border:none}
.btn-pc-o{background:none;color:var(--ink2);border:1.5px solid var(--bdr)!important}
.btn-pc-o:hover{border-color:var(--tbdr)!important;color:var(--td);background:var(--tbg)}
.btn-pc-s{background:var(--td);color:#fff;box-shadow:0 3px 12px rgba(2,132,199,.22)}
.btn-pc-s:hover{background:var(--teal);transform:translateY(-1px)}
/* CTA */
.cta-card{background:var(--td);border-radius:28px;padding:72px 56px;text-align:center;position:relative;overflow:hidden}
.cta-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.1) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(ellipse at 50% 40%,black 30%,transparent 68%);pointer-events:none}
.cta-c{position:relative;z-index:2}
.cta-ey{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:14px}
.cta-h2{font-family:"Outfit",sans-serif;font-size:clamp(26px,4vw,50px);font-weight:900;color:#fff;line-height:1.04;letter-spacing:-1.5px;margin-bottom:12px}
.cta-p{font-size:16px;color:rgba(255,255,255,.72);line-height:1.75;max-width:440px;margin:0 auto 34px}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-cta-p{font-family:"Outfit",sans-serif;font-size:15px;font-weight:700;color:var(--td);background:#fff;border:none;padding:14px 34px;border-radius:14px;cursor:pointer;transition:all .25s;box-shadow:0 4px 24px rgba(0,0,0,.18);display:inline-flex;align-items:center;gap:8px}
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
.footer-lnk:hover{color:var(--td)}
.footer-link-item{display:flex;flex-direction:column;gap:3px}
.footer-link-item .footer-lnk{font-weight:600}
.footer-link-desc{font-size:11px;line-height:1.45;color:var(--ink4);max-width:240px}
.footer-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:24px;border-top:1px solid var(--bdr);flex-wrap:wrap;gap:12px}
.footer-copy{font-family:var(--fm);font-size:10px;color:var(--ink4)}
.footer-badges{display:flex;gap:8px;flex-wrap:wrap}
.footer-badge{font-family:var(--fm);font-size:8.5px;font-weight:700;letter-spacing:1px;color:var(--ink3);background:#fff;border:1px solid var(--bdr);padding:3px 10px;border-radius:20px}
/* RESPONSIVE */
@media(max-width:1060px){.hero-inner{grid-template-columns:1fr;max-width:640px;padding:110px 48px 80px}.terminal{max-width:520px;margin:0 auto}.bridge-grid{grid-template-columns:1fr}.b-mid{display:none}.b-human{border-right:none;border-bottom:1px solid var(--bdr)}.pg{grid-template-columns:1fr 1fr;gap:10px;background:transparent;border:none}.pc{border-radius:18px;border:1.5px solid var(--bdr)!important;margin:0!important}.footer-top{grid-template-columns:1fr 1fr 1fr}}
@media(max-width:860px){.page{padding:0 20px}.nav{padding:0 20px}.nl{display:none}section{padding:64px 0}.cost-grid{grid-template-columns:1fr 1fr}.bo-strip{grid-template-columns:1fr 1fr}.uc-panel.on{grid-template-columns:1fr}.demo-win{display:none}.cta-card{padding:48px 20px}.footer-top{grid-template-columns:1fr 1fr}.agents-grid{grid-template-columns:1fr 1fr}.hero-inner{padding:100px 20px 72px}}
@media(max-width:560px){.cost-grid{grid-template-columns:1fr}.bo-strip{grid-template-columns:1fr 1fr}.agents-grid{grid-template-columns:1fr}}
/* BUSINESS PAGE REDESIGN */
body.page-business{background:
radial-gradient(circle at top right,rgba(14,165,233,.08),transparent 28%),
linear-gradient(180deg,#FCFBF8 0%,#F7FAFD 34%,#FAFAF7 100%)}
.page-business .hero-wrap::after{content:"";position:absolute;inset:auto -10% 8% 52%;height:1px;background:linear-gradient(90deg,transparent,rgba(2,132,199,.22),transparent);transform:rotate(-10deg);pointer-events:none}
.page-business .biz-problem .cost-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:14px;border-radius:32px;background:linear-gradient(180deg,rgba(12,23,41,.04),rgba(12,23,41,.06));border:1px solid rgba(12,23,41,.08);box-shadow:0 18px 44px rgba(12,23,41,.05);align-items:stretch}
.page-business .biz-problem .cc{grid-column:auto;min-height:100%;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(244,242,237,.92));border:1px solid rgba(12,23,41,.07);box-shadow:none}
.page-business .biz-problem .cc:nth-child(1),.page-business .biz-problem .cc:nth-child(2),.page-business .biz-problem .cc:nth-child(3),.page-business .biz-problem .cc:nth-child(4),.page-business .biz-problem .cc:nth-child(5),.page-business .biz-problem .cc:nth-child(6){grid-column:auto;grid-row:auto;transform:none}
.page-business .biz-problem .wc{margin-top:26px;display:grid;grid-template-columns:260px minmax(0,1fr);gap:18px 26px;padding:32px 32px;border-radius:30px;background:linear-gradient(145deg,#0B1628,#10213B);border:1px solid rgba(56,189,248,.14);box-shadow:0 28px 80px rgba(12,23,41,.16)}
.page-business .biz-problem .wc::before{content:"Execution compression";grid-column:1;grid-row:1;font-family:"DM Mono",monospace;font-size:9px;letter-spacing:2.4px;text-transform:uppercase;color:rgba(56,189,248,.78);align-self:start}
.page-business .biz-problem .wc-h{grid-column:1;grid-row:2;font-family:"Outfit",sans-serif;font-size:28px;line-height:1.05;color:#F8FBFF;max-width:200px}
.page-business .biz-problem .wc-s{grid-column:1;grid-row:3;font-size:13px;line-height:1.8;color:rgba(237,242,255,.6);max-width:200px}
.page-business .biz-problem .wr,.page-business .biz-problem .wc-gap{grid-column:2}
.page-business .biz-problem .wc-bars{grid-column:2;grid-row:1 / span 4;display:flex;flex-direction:column;gap:24px;align-self:start}
.page-business .biz-problem .wc-bars .wr-pair{display:grid;gap:12px}
.page-business .biz-problem .wc-leg{grid-column:1;grid-row:4;display:flex;flex-direction:column;gap:8px;justify-content:flex-end}
.page-business .biz-problem .wr-lbl{color:rgba(237,242,255,.82)}
.page-business .biz-problem .wr-wrap{background:rgba(255,255,255,.08)}
.page-business .biz-problem .wr-time{background:rgba(8,19,36,.62);border-color:rgba(125,211,252,.25);color:#EAF5FF}
.page-business .biz-problem .wr-num.nb{color:#FCA5A5}
.page-business .biz-problem .wr-num.ng,.page-business .biz-problem .wc-li{color:#D7E9FF}
.page-business .biz-principle .bridge-grid{gap:28px;align-items:stretch}
.page-business .biz-principle .b-human,.page-business .biz-principle .b-freya{border-radius:30px;padding:28px 26px;box-shadow:0 18px 40px rgba(12,23,41,.06)}
.page-business .biz-principle .b-human{background:linear-gradient(180deg,#fff,#f7f4ff)}
.page-business .biz-principle .b-freya{background:linear-gradient(180deg,rgba(14,165,233,.08),rgba(255,255,255,.92))}
.page-business .biz-usecases .uc-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:8px;border-radius:20px;background:rgba(255,255,255,.84);border:1px solid var(--bdr);box-shadow:var(--sh)}
.page-business .biz-usecases .uc-panel{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(320px,.98fr);gap:24px;padding:28px;border-radius:32px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(244,242,237,.86)),radial-gradient(circle at top right,rgba(14,165,233,.08),transparent 40%);border:1px solid rgba(12,23,41,.08);box-shadow:0 26px 70px rgba(12,23,41,.08)}
.page-business .biz-usecases .demo-win{height:100%;border-radius:28px;background:linear-gradient(180deg,#FFFFFF,#F7FBFF);box-shadow:inset 0 0 0 1px rgba(12,23,41,.05),0 16px 42px rgba(12,23,41,.07)}
.page-business .terminal,.page-business .demo-win{position:relative;overflow:hidden}
.page-business .terminal::after,.page-business .demo-win::after{content:"";position:absolute;left:-15%;right:-15%;top:-28%;height:38%;background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,.22),rgba(255,255,255,0));transform:rotate(-6deg);animation:liveSweep 7s ease-in-out infinite;pointer-events:none}
.page-business .biz-agents .agents-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:16px}
.page-business .biz-agents .ag{grid-column:span 3;min-height:220px;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(244,242,237,.92));border:1px solid rgba(12,23,41,.08);box-shadow:0 16px 36px rgba(12,23,41,.06);overflow:hidden}
.page-business .biz-agents .ag:nth-child(1),.page-business .biz-agents .ag:nth-child(10){grid-column:span 6}
.page-business .biz-agents .ag:nth-child(4),.page-business .biz-agents .ag:nth-child(7){transform:none}
.page-business .biz-agents .ag:nth-child(13){grid-column:span 6}
.page-business .biz-agents .ag::before{content:"";display:block;height:4px;background:linear-gradient(90deg,var(--ac),transparent)}
.page-business .biz-simulation .ct-wrap{padding:28px;border-radius:32px;background:linear-gradient(145deg,#0B1628,#10213B);border:1px solid rgba(56,189,248,.16);box-shadow:0 28px 90px rgba(12,23,41,.18)}
.page-business .biz-simulation .ct-head h3,.page-business .biz-simulation .ct-head p,.page-business .biz-simulation .ct-ph,.page-business .biz-simulation .ct-title,.page-business .biz-simulation .ct-tl,.page-business .biz-simulation .ct-lbl,.page-business .biz-simulation .ct-time{color:#EDF2FF}
.page-business .biz-simulation .ct-row{padding:18px;border-radius:22px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06)}
.page-business .biz-simulation .ct-vs{background:rgba(56,189,248,.12);color:#7DD3FC}
.page-business .biz-simulation .ct-m{background:rgba(239,68,68,.12);border-color:rgba(248,113,113,.2)}
.page-business .biz-simulation .ct-f{background:rgba(14,165,233,.12);border-color:rgba(56,189,248,.24)}
.page-business .biz-simulation .ct-lbl.r,.page-business .biz-simulation .ct-time.r{color:#FCA5A5}
.page-business .biz-simulation .ct-lbl.t,.page-business .biz-simulation .ct-time.g{color:#7DD3FC}
.page-business .biz-simulation .ct-toggle{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.08)}
.page-business .biz-simulation .ctt{color:rgba(237,242,255,.68)}
.page-business .biz-simulation .ctt.on{background:rgba(255,255,255,.12);box-shadow:none}
.page-business .biz-simulation .ct-foot{background:rgba(255,255,255,.04)}
.page-business .biz-simulation .btn-more{color:#DDF2FF;background:rgba(56,189,248,.12);border-color:rgba(56,189,248,.26)}
@keyframes liveSweep{0%,100%{transform:translateY(0) rotate(-6deg);opacity:0}18%{opacity:.85}45%{transform:translateY(210%) rotate(-6deg);opacity:0}}
@media(max-width:980px){
  .page-business .biz-problem .cost-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .page-business .biz-problem .cc,
  .page-business .biz-problem .cc:nth-child(1),
  .page-business .biz-problem .cc:nth-child(2),
  .page-business .biz-problem .cc:nth-child(3),
  .page-business .biz-problem .cc:nth-child(4),
  .page-business .biz-problem .cc:nth-child(5),
  .page-business .biz-problem .cc:nth-child(6){grid-column:auto;grid-row:auto}
  .page-business .biz-problem .wc{grid-template-columns:1fr}
  .page-business .biz-problem .wc::before,
  .page-business .biz-problem .wc-h,
  .page-business .biz-problem .wc-s,
  .page-business .biz-problem .wc-bars,
  .page-business .biz-problem .wc-leg,
  .page-business .biz-problem .wr,
  .page-business .biz-problem .wc-gap{grid-column:1;grid-row:auto}
  .page-business .biz-usecases .uc-panel{grid-template-columns:1fr}
  .page-business .biz-agents .agents-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .page-business .biz-agents .ag,
  .page-business .biz-agents .ag:nth-child(1),
  .page-business .biz-agents .ag:nth-child(10),
  .page-business .biz-agents .ag:nth-child(13){grid-column:auto}
  .page-business .biz-agents .ag:nth-child(4),.page-business .biz-agents .ag:nth-child(7){transform:none}
}
@media(max-width:640px){
  .page-business .biz-problem .cost-grid,
  .page-business .biz-agents .agents-grid,
  .page-business .biz-usecases .uc-tabs{grid-template-columns:1fr}
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
<body class="ct-before page-business">
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
      <div class="hero-kicker">For Business &amp; GTM Teams <span class="kd"></span></div>
      <h1 class="hero-h1">Replace your<br><span class="ac">17-tool stack</span><br><span class="dm">with one</span><br><span class="dm">platform.</span></h1>
      <p class="hero-sub">Powered by <strong>Freya</strong>, your autonomous GTM AI.</p>
      <p class="hero-body">Antarious is the first AI-native platform that automates your entire go-to-market function — from campaign strategy to closed deal. Strategy, content, leads, outreach, ads, attribution — all connected, all automated.</p>
      <div class="hero-btns"><button class="btn btn-p">Request Demo <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button><button class="btn btn-g" onclick="location.href='/freya'">Meet Freya →</button></div>
      <div class="hero-stats"><div><div class="hs-v">60%</div><div class="hs-l">Tasks Automated</div></div><div class="hs-sep"></div><div><div class="hs-v">47 hrs</div><div class="hs-l">Saved / Week</div></div><div class="hs-sep"></div><div><div class="hs-v">13</div><div class="hs-l">AI Agents</div></div><div class="hs-sep"></div><div><div class="hs-v">$180K</div><div class="hs-l">Annual Savings</div></div></div>
    </div>
    <div class="terminal">
      <div class="t-bar"><div class="t-dots"><div class="t-dot" style="background:#EF4444"></div><div class="t-dot" style="background:#F59E0B"></div><div class="t-dot" style="background:#10B981"></div></div><div class="t-title">FREYA — GTM OPERATIONS</div><div class="t-live"><span class="t-ldot"></span>ACTIVE</div></div>
      <div class="t-prog"><div class="t-pf"></div></div>
      <div class="t-body">
        <div class="t-frow"><div class="t-morb"><div class="t-mface">F</div><div class="t-mring"></div></div><div><div class="t-fname">Freya</div><div class="t-fstatus">RUNNING · 7 AGENTS ACTIVE</div><div class="t-fagents">14/19 tasks complete · 23 hrs saved today</div></div></div>
        <div class="t-think" id="bizThink">Analysing Q3 campaign performance across all channels…&thinsp;<span class="t-cur">|</span></div>
        <div class="tasks">
          <div class="task done"><div class="tic tcd"></div><div class="task-txt">ICP profile built from CRM + intent signals</div><div class="task-tm tmc">14m </div></div>
          <div class="task done"><div class="tic tcd"></div><div class="task-txt">482 prospects sourced, enriched &amp; scored</div><div class="task-tm tmc">5m </div></div>
          <div class="task done"><div class="tic tcd"></div><div class="task-txt">Competitor intel refreshed — 3 new signals</div><div class="task-tm tmc">Auto </div></div>
          <div class="task run"><div class="tic tcr">⟳</div><div class="task-txt" id="bizTask">Generating 6 email sequence variants…</div><div class="task-tm tmr">● Now</div></div>
          <div class="task wait"><div class="tic tcw">○</div><div class="task-txt">Meta Ads — configure &amp; launch campaigns</div><div class="task-tm tmw">Queued</div></div>
        </div>
        <div class="t-alert"><div style="font-size:13px;flex-shrink:0"><span class="ai-svg-icon-slot" data-ai-icon="alert"></span></div><div><div class="ta-lbl">Freya Alert · 2h ago</div><div class="ta-txt">LinkedIn CTR dropped 34% — creative fatigue detected. 4 variants generated, pending approval.</div></div></div>
        <div class="t-mets"><div class="tm"><div class="tm-v" id="bizLeads">482</div><div class="tm-l">Leads Found</div></div><div class="tm"><div class="tm-v">23h</div><div class="tm-l">Time Saved</div></div><div class="tm"><div class="tm-v">14/19</div><div class="tm-l">Tasks Done</div></div></div>
      </div>
    </div>
  </div>
</div>

<div class="trust-strip"><div class="trust-lbl">Integrates with your existing stack</div><div class="scroll-row"><div class="scroll-inner"><span class="slogo">Salesforce</span><span class="slogo">HubSpot</span><span class="slogo">Apollo.io</span><span class="slogo">Clearbit</span><span class="slogo">ZoomInfo</span><span class="slogo">Meta Ads</span><span class="slogo">Google Ads</span><span class="slogo">LinkedIn</span><span class="slogo">Klaviyo</span><span class="slogo">Instantly</span><span class="slogo">Snowflake</span><span class="slogo">Slack</span><span class="slogo">GA4</span><span class="slogo">SEMrush</span><span class="slogo">Salesforce</span><span class="slogo">HubSpot</span><span class="slogo">Apollo.io</span><span class="slogo">Clearbit</span><span class="slogo">ZoomInfo</span><span class="slogo">Meta Ads</span><span class="slogo">Google Ads</span><span class="slogo">LinkedIn</span><span class="slogo">Klaviyo</span><span class="slogo">Instantly</span></div></div></div>

<!-- PAIN SECTION -->
<section class="biz-problem">
  <div class="page">
    <div class="eyebrow reveal">The Enterprise Problem</div>
    <h2 class="h2 reveal">Your GTM stack is costing you<br><em>more than you realise.</em></h2>
    <p class="sp w reveal">Enterprise GTM teams bleed time, money, and opportunity daily — not because they lack talent, but because fragmented tools create friction at every handoff.</p>
    <div class="cost-grid">
      <div class="cc reveal" style="--cc:var(--red)"><div class="cc-icon">⏳</div><div class="cc-val">47 hrs</div><div class="cc-title">Lost per team, per week</div><div class="cc-desc">Manual tasks requiring zero strategic judgement — consuming your most expensive resource.</div></div>
      <div class="cc reveal d1" style="--cc:var(--amber)"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="calendar"></span></div><div class="cc-val">23 days</div><div class="cc-title">Average campaign launch</div><div class="cc-desc">From strategy to live. Your competitor launched last week.</div></div>
      <div class="cc reveal d2" style="--cc:var(--red)"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="money"></span></div><div class="cc-val">68%</div><div class="cc-title">Warm leads never followed up</div><div class="cc-desc">Two thirds of inbound leads go cold because your team is in calls or off-hours.</div></div>
      <div class="cc reveal d3" style="--cc:var(--amber)"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="settings"></span></div><div class="cc-val">17 tools</div><div class="cc-title">Average GTM stack</div><div class="cc-desc">All disconnected. Every data handoff creates gaps, errors, and lost context.</div></div>
      <div class="cc reveal d1" style="--cc:#7C3AED"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="chart"></span></div><div class="cc-val">4–6 hrs</div><div class="cc-title">Per report, per week</div><div class="cc-desc">Your analytics team spends half a day compiling data Freya generates in real time.</div></div>
      <div class="cc reveal d2" style="--cc:var(--red)"><div class="cc-icon"><span class="ai-svg-icon-slot" data-ai-icon="puzzle"></span></div><div class="cc-val">$180K+</div><div class="cc-title">Annual overhead</div><div class="cc-desc">Salary cost of time spent on tasks Freya automates. Excluding tool licences.</div></div>
    </div>
    <div class="wc reveal">
      <div class="wc-h">Time per task — Manual vs. Freya</div>
      <div class="wc-s">Same work. Completely different outcome.</div>
      <div class="wr"><span class="wr-lbl">ICP &amp; Strategy</span><div class="wr-wrap"><span class="wr-time">4–8 hrs</span><div class="wr-bar m" data-pw="86"></div></div><span class="wr-num nb">–95%</span></div>
      <div class="wr"><span class="wr-lbl sub">&nbsp;</span><div class="wr-wrap"><span class="wr-time">15 min</span><div class="wr-bar f" data-pw="5"></div></div><span class="wr-num ng">Freya</span></div>
      <div class="wc-gap"></div>
      <div class="wr"><span class="wr-lbl">Content &amp; Copy</span><div class="wr-wrap"><span class="wr-time">2–3 days</span><div class="wr-bar m" data-pw="94"></div></div><span class="wr-num nb">–99%</span></div>
      <div class="wr"><span class="wr-lbl sub">&nbsp;</span><div class="wr-wrap"><span class="wr-time">20 min</span><div class="wr-bar f" data-pw="3"></div></div><span class="wr-num ng">Freya</span></div>
      <div class="wc-gap"></div>
      <div class="wr"><span class="wr-lbl">MQL Response</span><div class="wr-wrap"><span class="wr-time">27 hrs avg</span><div class="wr-bar m" data-pw="78"></div></div><span class="wr-num nb">–98%</span></div>
      <div class="wr"><span class="wr-lbl sub">&nbsp;</span><div class="wr-wrap"><span class="wr-time">&lt;30 min</span><div class="wr-bar f" data-pw="2"></div></div><span class="wr-num ng">Freya</span></div>
      <div class="wc-gap"></div>
      <div class="wr"><span class="wr-lbl">Analytics Report</span><div class="wr-wrap"><span class="wr-time">4–6 hrs</span><div class="wr-bar m" data-pw="80"></div></div><span class="wr-num nb">–99%</span></div>
      <div class="wr"><span class="wr-lbl sub">&nbsp;</span><div class="wr-wrap"><span class="wr-time">Real-time</span><div class="wr-bar f" data-pw="1"></div></div><span class="wr-num ng">Freya</span></div>
      <div class="wc-leg"><div class="wc-li"><div class="wc-dot" style="background:rgba(220,38,38,.55)"></div>Manual GTM</div><div class="wc-li"><div class="wc-dot" style="background:var(--td)"></div>With Freya</div></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- BRIDGE -->
<section class="alt biz-principle">
  <div class="page">
    <div class="eyebrow reveal">The Antarious Principle</div>
    <h2 class="h2 reveal">Freya doesn't replace your team.<br><em>It makes them unstoppable.</em></h2>
    <p class="sp w reveal">AI should amplify human judgement and creativity — not replace them. Freya handles everything that doesn't need a human. Your team gets back to everything that does.</p>
    <div class="bridge-grid reveal">
      <div class="b-human"><div class="b-av"><span class="ai-svg-icon-slot" data-ai-icon="user"></span></div><div class="b-name">Your Enterprise Team</div><div class="b-sub">Strategic judgement, relationships, creativity, accountability</div><div class="b-items"><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Strategic decision-making</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Client relationships &amp; trust</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Brand vision &amp; creativity</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Negotiation &amp; closing</div><div class="b-item"><div class="b-dot" style="background:#8B5CF6"></div>Executive communication</div></div></div>
      <div class="b-mid"><div class="b-vl"></div><div class="b-plus">+</div><div class="b-vl"></div></div>
      <div class="b-freya"><div class="b-forb"><div class="bfc"></div><div class="bfi">F</div><div class="bfr1"></div></div><div class="b-name">Freya AI Agent</div><div class="b-sub">Execution, monitoring, automation — 24/7, no errors, unlimited scale</div><div class="b-items"><div class="b-item"><div class="b-dot" style="background:var(--td)"></div>Campaign execution end-to-end</div><div class="b-item"><div class="b-dot" style="background:var(--td)"></div>Lead prospecting &amp; scoring</div><div class="b-item"><div class="b-dot" style="background:var(--td)"></div>Content generation at scale</div><div class="b-item"><div class="b-dot" style="background:var(--td)"></div>24/7 outreach &amp; follow-up</div><div class="b-item"><div class="b-dot" style="background:var(--td)"></div>Real-time analytics &amp; alerting</div></div></div>
    </div>
    <div class="bridge-note reveal"><strong>The result: a GTM team that scales without scaling headcount.</strong><br>Every external action passes through human approval. Freya executes. Humans direct, decide, and own outcomes.</div>
    <div class="bo-strip reveal"><div class="bo"><div class="bo-val">3×</div><div class="bo-lbl">Pipeline, same headcount</div></div><div class="bo"><div class="bo-val">60%</div><div class="bo-lbl">Less time on operations</div></div><div class="bo"><div class="bo-val">23→2</div><div class="bo-lbl">Days to launch campaign</div></div><div class="bo"><div class="bo-val">100%</div><div class="bo-lbl">Audit trail on every action</div></div></div>
  </div>
</section>

<div class="divider"></div>

<!-- USE CASES -->
<section class="biz-usecases">
  <div class="page">
    <div class="eyebrow reveal">Use Cases</div>
    <h2 class="h2 reveal">Built for every <em>GTM role.</em></h2>
    <p class="sp reveal">Freya adapts to how your team works — always running, always learning, always alerting.</p>
    <div class="uc-tabs reveal">
      <button class="uc-tab on" onclick="showUC('cmo',this)">For CMOs</button>
      <button class="uc-tab" onclick="showUC('sdr',this)">For SDR Teams</button>
      <button class="uc-tab" onclick="showUC('ops',this)">For GTM Ops</button>
      <button class="uc-tab" onclick="showUC('agency',this)">For Agencies</button>
    </div>
    <div id="uc-cmo" class="uc-panel on">
      <div><h3 class="uc-h3">Full pipeline visibility.<br><em>Zero report assembly.</em></h3><p class="uc-p">Freya monitors every channel, surfaces anomalies instantly, and delivers Monday 7am executive briefs with attribution, CAC trends, and 90-day forecasts. Board-ready in minutes.</p><div class="uc-stats"><div><div class="uc-sv">4–6h</div><div class="uc-sl">Saved on reports/wk</div></div><div class="uc-div"></div><div><div class="uc-sv">35%</div><div class="uc-sl">Better allocation</div></div><div class="uc-div"></div><div><div class="uc-sv">90-day</div><div class="uc-sl">Forecasts</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Monday 7am executive brief — metrics, anomalies, wins, risks, recommendations</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">5-model attribution shows exactly which campaigns drove closed deals</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">90-day pipeline forecast — base/optimistic/risk — updated weekly from live data</div></div><div class="uc-step"><div class="uc-sn">4</div><div class="uc-st">Board PPTX auto-generated by Freya in under 10 minutes</div></div></div><button class="btn btn-p" style="font-size:13px;padding:11px 22px">Explore CMO features →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">antarious.app / dashboard</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb">F</div><div class="f-tick-txt" id="cmoTick">Freya updating pipeline attribution in real time…</div><div class="f-tick-dot"></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:9px"><div style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:12px"><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;margin-bottom:5px">PIPELINE THIS MONTH</div><div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:var(--td)">$2.4M</div><div style="font-size:10px;color:var(--green);margin-top:2px">↑ 34% vs last month</div></div><div style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:12px"><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;margin-bottom:5px">AVG CAC</div><div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:var(--td)">$384</div><div style="font-size:10px;color:var(--green);margin-top:2px">↓ 18% (target $420)</div></div></div><div style="background:var(--abg);border:1px solid rgba(217,119,6,.2);border-radius:8px;padding:10px;display:flex;gap:8px"><div style="width:22px;height:22px;border-radius:6px;background:conic-gradient(from var(--ca),#0369A1,#38BDF8,#0369A1);animation:conic 4s linear infinite;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-size:10px;font-weight:900;color:#fff;flex-shrink:0">F</div><div><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--amber);letter-spacing:1px;margin-bottom:2px;font-weight:700">FREYA ALERT</div><div style="font-size:11.5px;color:var(--ink2);line-height:1.5">LinkedIn CTR dropped 28%. Creative fatigue detected. 4 variants generated — pending approval.</div></div></div></div></div>
    </div>
    <div id="uc-sdr" class="uc-panel">
      <div><h3 class="uc-h3">Your SDRs close.<br><em>Freya fills the pipe.</em></h3><p class="uc-p">SDR Outreach Agent runs 1,000+ personalised touches per day — 24/7. MQL response drops from 27 hours to under 30 minutes.</p><div class="uc-stats"><div><div class="uc-sv">1,000+</div><div class="uc-sl">Daily touches</div></div><div class="uc-div"></div><div><div class="uc-sv">&lt;30m</div><div class="uc-sl">MQL response</div></div><div class="uc-div"></div><div><div class="uc-sv">482</div><div class="uc-sl">Prospects in 5 min</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Enriched, scored prospect list from ICP in under 5 minutes</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">SDR Agent personalises and sends sequences across email and LinkedIn</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">Replies auto-classified by intent — hot leads surfaced with drafted response</div></div><div class="uc-step"><div class="uc-sn">4</div><div class="uc-st">SDR briefing card generated before every call — intel, pain signals, talk track</div></div></div><button class="btn btn-p" style="font-size:13px;padding:11px 22px">Explore SDR features →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">antarious.app / outreach</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb">F</div><div class="f-tick-txt">SDR Agent: 1,247 touches sent today — 4 meetings booked</div><div class="f-tick-dot"></div></div><div style="display:flex;flex-direction:column;gap:7px"><div style="background:var(--gbg);border:1px solid var(--gbdr);border-radius:8px;padding:10px;display:flex;align-items:center;gap:9px"><div style="font-size:18px"><span class="ai-svg-icon-slot" data-ai-icon="flame"></span></div><div style="flex:1"><div style="font-size:12.5px;font-weight:600;color:var(--ink)">Alex M. — VP Sales, Acme Corp</div><div style="font-size:11px;color:var(--green);margin-top:1px">Replied: "Interested — can we talk Thursday?"</div></div><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--green);background:var(--gbg);border:1px solid var(--gbdr);padding:2px 8px;border-radius:4px;font-weight:700">HOT</div></div><div style="background:var(--tbg);border:1.5px solid var(--tbdr);border-radius:8px;padding:10px"><div style="font-family:'DM Mono',monospace;font-size:8px;font-weight:700;color:var(--td);letter-spacing:1px;margin-bottom:5px">FREYA — SUGGESTED REPLY</div><div style="font-size:11.5px;color:var(--ink2);line-height:1.55">"Thursday works — I'll send a calendar link for 2pm or 4pm…"</div><div style="display:flex;gap:7px;margin-top:8px"><button style="font-size:10px;background:var(--td);color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-weight:700">Send </button><button style="font-size:10px;background:none;color:var(--ink3);border:1px solid var(--bdr);padding:5px 12px;border-radius:5px;cursor:pointer">Edit</button></div></div></div></div></div>
    </div>
    <div id="uc-ops" class="uc-panel">
      <div><h3 class="uc-h3">Operations without<br><em>the overhead.</em></h3><p class="uc-p">GTM Ops teams get configurable automation — approval workflows, attribution modelling, data pipelines — all through one platform. Freya eliminates the coordination tax.</p><div class="uc-stats"><div><div class="uc-sv">17→1</div><div class="uc-sl">Tools consolidated</div></div><div class="uc-div"></div><div><div class="uc-sv">100%</div><div class="uc-sl">Audit trail</div></div><div class="uc-div"></div><div><div class="uc-sv">5-model</div><div class="uc-sl">Attribution</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Replace 17+ tools — CRM sync, ad management, analytics, outreach all connected</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">Configure approval gates per role — granular autonomy controls for every Freya action</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">5-model attribution answers "what campaign closed this deal?" across every channel</div></div></div><button class="btn btn-p" style="font-size:13px;padding:11px 22px">Explore Ops features →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">antarious.app / attribution</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb">F</div><div class="f-tick-txt">Running 5-model attribution update on Q3 data…</div><div class="f-tick-dot"></div></div><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--ink4);letter-spacing:1.5px;margin-bottom:9px;text-transform:uppercase">Attribution — Q3 Closed Deals</div><div style="display:flex;flex-direction:column;gap:7px"><div style="display:flex;align-items:center;gap:10px"><span style="font-size:11.5px;color:var(--ink2);width:110px">LinkedIn Ads</span><div style="flex:1;height:18px;background:var(--bg3);border-radius:4px;overflow:hidden"><div style="width:68%;height:100%;background:var(--td);border-radius:4px"></div></div><span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--td);width:32px;text-align:right;font-weight:700">68%</span></div><div style="display:flex;align-items:center;gap:10px"><span style="font-size:11.5px;color:var(--ink2);width:110px">Email Outreach</span><div style="flex:1;height:18px;background:var(--bg3);border-radius:4px;overflow:hidden"><div style="width:42%;height:100%;background:var(--td);border-radius:4px;opacity:.75"></div></div><span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--td);width:32px;text-align:right;font-weight:700">42%</span></div><div style="display:flex;align-items:center;gap:10px"><span style="font-size:11.5px;color:var(--ink2);width:110px">Google Ads</span><div style="flex:1;height:18px;background:var(--bg3);border-radius:4px;overflow:hidden"><div style="width:28%;height:100%;background:var(--td);border-radius:4px;opacity:.55"></div></div><span style="font-family:'DM Mono',monospace;font-size:10px;color:var(--td);width:32px;text-align:right;font-weight:700">28%</span></div></div><div style="margin-top:11px;background:var(--tbg);border:1.5px solid var(--tbdr);border-radius:8px;padding:9px;font-size:11.5px;color:var(--ink2)"> <strong>Freya:</strong> Shift 15% Google → LinkedIn based on 3.4× higher SQL conversion rate</div></div></div>
    </div>
    <div id="uc-agency" class="uc-panel">
      <div><h3 class="uc-h3">Manage 10 clients.<br><em>With a team of 3.</em></h3><p class="uc-p">Agencies get white-label client portal, multi-workspace isolation, and auto-generated reports — Freya running each client's campaigns autonomously under agency oversight.</p><div class="uc-stats"><div><div class="uc-sv">10×</div><div class="uc-sl">Client capacity</div></div><div class="uc-div"></div><div><div class="uc-sv">White</div><div class="uc-sl">Label portal</div></div><div class="uc-div"></div><div><div class="uc-sv">Auto</div><div class="uc-sl">Client reporting</div></div></div><div class="uc-steps"><div class="uc-step"><div class="uc-sn">1</div><div class="uc-st">Separate workspace per client — full data isolation and brand memory</div></div><div class="uc-step"><div class="uc-sn">2</div><div class="uc-st">White-label client portal with live dashboards — your brand, not Antarious</div></div><div class="uc-step"><div class="uc-sn">3</div><div class="uc-st">Auto-generated client reports with narrative commentary — by Freya, in minutes</div></div></div><button class="btn btn-p" style="font-size:13px;padding:11px 22px">Explore Agency plan →</button></div>
      <div class="demo-win"><div class="dw-bar"><div class="dw-dots"><div class="dw-dot" style="background:#EF4444"></div><div class="dw-dot" style="background:#F59E0B"></div><div class="dw-dot" style="background:#10B981"></div></div><div class="dw-url">agency.antarious.app</div><div class="dw-live"><span class="dw-ldot"></span>LIVE</div></div><div class="dw-prog"><div class="dw-pf"></div></div><div class="dw-body"><div class="f-tick"><div class="f-tick-orb">F</div><div class="f-tick-txt">Compiling FinanceApp monthly report…</div><div class="f-tick-dot"></div></div><div style="display:flex;flex-direction:column;gap:7px"><div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px"><div style="width:8px;height:8px;border-radius:50%;background:var(--green);flex-shrink:0"></div><div style="flex:1;font-size:12px;color:var(--ink)">TechCorp SaaS</div><div style="font-size:11px;color:var(--ink3)">3 campaigns active</div><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--green);background:var(--gbg);border:1px solid var(--gbdr);padding:2px 8px;border-radius:4px;font-weight:700">HEALTHY</div></div><div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--tbg);border:1px solid var(--tbdr);border-radius:8px"><div style="width:8px;height:8px;border-radius:50%;background:var(--td);flex-shrink:0"></div><div style="flex:1;font-size:12px;color:var(--ink)">Growth SaaS Co</div><div style="font-size:11px;color:var(--ink3)">Launch in 2 days</div><div style="font-family:'DM Mono',monospace;font-size:8px;color:var(--td);background:var(--tbg);border:1px solid var(--tbdr);padding:2px 8px;border-radius:4px;font-weight:700">LIVE</div></div></div></div></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- 13 AGENTS -->
<section class="alt biz-agents">
  <div class="page">
    <div class="eyebrow reveal" style="justify-content:center;display:flex">The 13 Agents</div>
    <h2 class="h2 reveal" style="text-align:center">Thirteen specialists.<br><em>One orchestrated team.</em></h2>
    <p class="sp reveal" style="text-align:center;max-width:600px;margin:0 auto 48px">Each agent is domain-expert — trained for a specific GTM function, operating with shared context from Freya.</p>
    <div class="agents-grid">
      <div class="ag reveal" style="--ac:#0EA5E9"><div class="ag-num">Agent 01</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="compass"></span></span><div class="ag-name">GTM Strategist</div><p class="ag-body">Translates quarterly business goals into full GTM plans — ICP profiles, channel mix, budget allocation, and KPIs. Your 24/7 chief strategist.</p><span class="ag-tag" style="background:var(--tbg);color:var(--td);border:1px solid var(--tbdr)">Strategy · Always Active</span></div>
      <div class="ag reveal d1" style="--ac:#B5874F"><div class="ag-num">Agent 02</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="search"></span></span><div class="ag-name">Competitor Intel</div><p class="ag-body">Monitors 50+ live signals across competitor ad libraries, pricing pages, LinkedIn, and news — continuously. Fresh intel every week, automatically.</p><span class="ag-tag" style="background:rgba(181,135,79,.1);color:#B5874F;border:1px solid rgba(181,135,79,.25)">Intelligence · Continuous</span></div>
      <div class="ag reveal d2" style="--ac:#DC2626"><div class="ag-num">Agent 03</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="target"></span></span><div class="ag-name">Lead Prospecting</div><p class="ag-body">ICP definition → enriched, verified, scored prospect list in under 5 minutes. Sources from Apollo, Hunter.io, Clearbit, and ZoomInfo simultaneously.</p><span class="ag-tag" style="background:rgba(220,38,38,.08);color:var(--red);border:1px solid rgba(220,38,38,.2)">Lead Intel · Growth+</span></div>
      <div class="ag reveal" style="--ac:#2563EB"><div class="ag-num">Agent 04</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="pen"></span></span><div class="ag-name">Copywriter</div><p class="ag-body">Generates all campaign copy — email sequences, ad variants, landing pages, social content — trained on your brand voice. Always on-brand, always shipable.</p><span class="ag-tag" style="background:rgba(37,99,235,.08);color:#2563EB;border:1px solid rgba(37,99,235,.2)">Content · All Plans</span></div>
      <div class="ag reveal d1" style="--ac:#EA580C"><div class="ag-num">Agent 05</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="megaphone"></span></span><div class="ag-name">Meta Ads</div><p class="ag-body">Manages Meta ad campaigns end-to-end — campaign structure, creative rotation, budget pacing, A/B testing, bid optimisation. Launches automatically once approved.</p><span class="ag-tag" style="background:rgba(234,88,12,.08);color:#EA580C;border:1px solid rgba(234,88,12,.2)">Paid Media · Growth+</span></div>
      <div class="ag reveal d2" style="--ac:#059669"><div class="ag-num">Agent 06</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="leaf"></span></span><div class="ag-name">SEO</div><p class="ag-body">Keyword research, content gap analysis, optimised blog posts, ranking monitoring — integrated with Google Search Console. Fully aligned to campaign timing.</p><span class="ag-tag" style="background:var(--gbg);color:var(--green);border:1px solid var(--gbdr)">Content · All Plans</span></div>
      <div class="ag reveal" style="--ac:#DB2777"><div class="ag-num">Agent 07</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="mobile"></span></span><div class="ag-name">Social Media</div><p class="ag-body">Monthly social calendars for LinkedIn, Facebook, Instagram. Platform-native captions, scheduling, engagement monitoring — synced to active campaign briefs.</p><span class="ag-tag" style="background:rgba(219,39,119,.08);color:#DB2777;border:1px solid rgba(219,39,119,.2)">Content · All Plans</span></div>
      <div class="ag reveal d1" style="--ac:#D97706"><div class="ag-num">Agent 08</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="shield"></span></span><div class="ag-name">Brand Guardian</div><p class="ag-body">Auto-reviews every content output for brand compliance. Scored 0–1.0. Below 0.75 → returns with notes. Above 0.90 → auto-approved. First line of QA.</p><span class="ag-tag" style="background:rgba(217,119,6,.08);color:#D97706;border:1px solid rgba(217,119,6,.2)">Quality · All Plans</span></div>
      <div class="ag reveal d2" style="--ac:#DC2626"><div class="ag-num">Agent 09</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="mail"></span></span><div class="ag-name">SDR Outreach</div><p class="ag-body">7-touch multi-channel sequences across email and LinkedIn. Personalised first lines, reply classification, OOO handling — 1,000+ touches/day vs. 50–100 manual.</p><span class="ag-tag" style="background:rgba(220,38,38,.08);color:var(--red);border:1px solid rgba(220,38,38,.2)">Outreach · Growth+</span></div>
      <div class="ag reveal" style="--ac:#16A34A"><div class="ag-num">Agent 10</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="chart"></span></span><div class="ag-name">Analytics</div><p class="ag-body">Live data from all sources, 5-model attribution, anomaly detection, CAC by channel, weekly reports. Monday 7am executive brief + board PPTX. Always current.</p><span class="ag-tag" style="background:rgba(22,163,74,.08);color:#16A34A;border:1px solid rgba(22,163,74,.2)">Analytics · All Plans</span></div>
      <div class="ag reveal d1" style="--ac:#0284C7"><div class="ag-num">Agent 11</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="spark"></span></span><div class="ag-name">Forecasting</div><p class="ag-body">Predicts MQL volume, pipeline trajectory, CAC trends, and ROI for 90 days. Three scenario models with confidence intervals. Updated weekly from live data.</p><span class="ag-tag" style="background:var(--tbg);color:var(--td);border:1px solid var(--tbdr)">Analytics · Scale+</span></div>
      <div class="ag reveal d2" style="--ac:#9333EA"><div class="ag-num">Agent 12</div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="chat"></span></span><div class="ag-name">Customer Service AI</div><p class="ag-body">Unified Inbox — classifies every message by intent, drafts responses, auto-handles FAQs, escalates complex issues with full context attached. Always on.</p><span class="ag-tag" style="background:rgba(147,51,234,.08);color:#9333EA;border:1px solid rgba(147,51,234,.2)">Inbox · Growth+</span></div>
      <div class="ag reveal" style="--ac:#B5874F;border-style:dashed"><div class="ag-num">Agent 13 <span style="font-family:'DM Mono',monospace;font-size:8px;background:rgba(217,119,6,.1);color:var(--amber);border:1px solid rgba(217,119,6,.2);padding:1px 6px;border-radius:4px;margin-left:4px">BETA</span></div><span class="ag-icon"><span class="ai-svg-icon-slot" data-ai-icon="phone"></span></span><div class="ag-name">Voice AI</div><p class="ag-body">Inbound and outbound call handling for lead qualification and appointment-setting. 500 min/month on Scale+. Controlled beta, full human override always available.</p><span class="ag-tag" style="background:rgba(181,135,79,.1);color:#B5874F;border:1px solid rgba(181,135,79,.25)">Beta · Scale+</span></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- COMPARISON -->
<section class="biz-simulation">
  <div class="page">
    <div class="eyebrow reveal">GTM Simulation</div>
    <h2 class="h2 reveal">The same workflow.<br><em>A completely different result.</em></h2>
    <p class="sp reveal">Three phases shown. Toggle to see what Freya eliminates at every step.</p>
    <div class="ct-wrap reveal">
      <div class="ct-head"><div><h3>GTM Campaign Launch — Phase by Phase</h3><p>Toggle to see what changes · Full simulation on the Freya page</p></div><div class="ct-toggle"><button class="ctt m on" onclick="ctMode('before',this)">Without Freya</button><button class="ctt f" onclick="ctMode('after',this)">With Freya</button></div></div>
      <div class="ct-body">
        <div class="ct-ph">Phase 01 · Strategy &amp; ICP</div>
        <div class="ct-row"><div class="ct-m"><div class="ct-lbl r">Manual</div><div class="ct-title">Owner defines ICP from scratch</div><div class="ct-time r"><span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 4–8 hours</div></div><div class="ct-vs">VS</div><div class="ct-f"><div class="ct-lbl t">Freya · GTM Strategist</div><div class="ct-title">Data-backed ICP built automatically</div><div class="ct-time g"><span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> ~15 minutes</div></div></div>
        <div style="height:8px"></div>
        <div class="ct-ph">Phase 02 · Content &amp; Copy</div>
        <div class="ct-row"><div class="ct-m"><div class="ct-lbl r">Manual</div><div class="ct-title">Copywriter writes all content</div><div class="ct-time r"><span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 2–3 days · multiple revisions</div></div><div class="ct-vs">VS</div><div class="ct-f"><div class="ct-lbl t">Freya · Copywriter + Brand Guardian</div><div class="ct-title">On-brand copy generated &amp; QA'd</div><div class="ct-time g"><span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> ~20 minutes · brand-safe</div></div></div>
        <div style="height:8px"></div>
        <div class="ct-ph">Phase 03 · Outreach</div>
        <div class="ct-row"><div class="ct-m"><div class="ct-lbl r">Manual</div><div class="ct-title">SDR manually prospects + sequences</div><div class="ct-time r"><span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 6+ hrs/day · 50–100 max</div></div><div class="ct-vs">VS</div><div class="ct-f"><div class="ct-lbl t">Freya · SDR Outreach Agent</div><div class="ct-title">Personalised multi-channel sequences</div><div class="ct-time g"><span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> 24/7 · 1,000+ touches/day</div></div></div>
      </div>
      <div class="ct-foot"><div class="ct-tots"><div><div class="ct-tl">Without Freya</div><div class="ct-tv rv">23 days</div></div><div><div class="ct-tl">With Freya</div><div class="ct-tv tv">2 days</div></div></div><button class="btn-more" onclick="location.href='/freya'">Full 6-phase simulation →</button></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FAQ -->
<section class="alt">
  <div class="page">
    <div class="eyebrow reveal">Business FAQs</div>
    <h2 class="h2 reveal">Answers for <em>GTM and revenue teams.</em></h2>
    <p class="sp reveal">Focused answers for business operators, SDR leaders, RevOps teams, and agencies. For full detail, see the comprehensive FAQ.</p>
    <div class="reveal" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:26px">
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">Can Freya replace our fragmented GTM stack?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Yes. Freya connects CRM, ad channels, analytics, and outreach so execution, reporting, and optimisation run in one operating layer instead of disconnected tools.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">How does SDR automation work in practice?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Freya orchestrates prospecting, enrichment, personalisation, sequence scheduling, and reply classification. Human owners still approve high-impact actions based on your rules.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">Does Freya support attribution across channels?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Yes. The analytics layer runs multi-model attribution across touchpoints and ties signal quality back to pipeline, CAC, and conversion outcomes for better budget allocation.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">Can agencies run multiple client workspaces safely?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Yes. Agencies can isolate client environments, preserve brand context per account, and deliver automated reporting while keeping governance and approvals under agency control.</p></div>
    </div>
    <div class="reveal" style="margin-top:18px"><a href="/faq/comprehensive" class="btn-more">View full FAQ library →</a></div>
  </div>
</section>

<div class="divider"></div>

<!-- CTA -->
<section>
  <div class="page"><div class="cta-card reveal"><div class="cta-dots"></div><div class="cta-c"><div class="cta-ey">Request a Walkthrough</div><h2 class="cta-h2">Ready to put Freya inside your commercial engine?</h2><p class="cta-p">Replace scattered GTM execution with one orchestrated platform built for speed, visibility, and disciplined growth.</p><div class="cta-btns"><button class="btn-cta-p">Request Demo <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button><button class="btn-cta-g" onclick="location.href='/freya'">Explore Freya →</button></div></div></div></div>
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
const bizWasteCard=document.querySelector('.page-business .biz-problem .wc');
if(bizWasteCard&&!bizWasteCard.querySelector('.wc-bars')){
  const legend=bizWasteCard.querySelector('.wc-leg');
  const rows=[...bizWasteCard.querySelectorAll(':scope > .wr')];
  const wrap=document.createElement('div');
  wrap.className='wc-bars';
  for(let i=0;i<rows.length;i+=2){
    const pair=document.createElement('div');
    pair.className='wr-pair';
    pair.append(rows[i]);
    if(rows[i+1])pair.append(rows[i+1]);
    wrap.append(pair);
  }
  bizWasteCard.querySelectorAll(':scope > .wc-gap').forEach(g=>g.remove());
  if(legend)bizWasteCard.insertBefore(wrap,legend);else bizWasteCard.append(wrap);
}
function showUC(k,btn){document.querySelectorAll('.uc-panel').forEach(p=>{p.classList.remove('on');p.style.display='none'});const p=document.getElementById('uc-'+k);if(!p)return;p.style.display='grid';p.classList.add('on');p.style.opacity='0';requestAnimationFrame(()=>{p.style.transition='opacity .35s';p.style.opacity='1'});document.querySelectorAll('.uc-tab').forEach(t=>t.classList.remove('on'));if(btn)btn.classList.add('on')}
document.querySelectorAll('.uc-panel').forEach(p=>{if(!p.classList.contains('on'))p.style.display='none'});
function ctMode(mode,btn){document.body.classList.remove('ct-before','ct-after');document.body.classList.add('ct-'+mode);document.querySelectorAll('.ctt').forEach(b=>b.classList.remove('on'));if(btn)btn.classList.add('on')}
const wio=new IntersectionObserver(ens=>{ens.forEach(en=>{if(en.isIntersecting){document.querySelectorAll('.wr-bar').forEach(b=>{b.style.width='0';setTimeout(()=>{b.style.width=b.dataset.pw+'%'},100)});wio.unobserve(en.target)}})},{threshold:.2});
const wc=document.querySelector('.wc');if(wc)wio.observe(wc);
const thoughts=['Analysing Q3 campaign performance across all channels…','Sourcing 400+ ICP-matched prospects from Apollo…','Generating email sequence variants for launch…','Detecting CTR anomaly on LinkedIn — investigating…','Compiling Monday 7am executive brief…','Running 5-model attribution update…','Forecasting Q4 MQL volume — 3 scenario models…','Refreshing competitor intel — 3 new signals found…'];
let tIdx=0;const thEl=document.getElementById('bizThink');
setInterval(()=>{tIdx=(tIdx+1)%thoughts.length;if(!thEl)return;thEl.style.opacity='0';setTimeout(()=>{thEl.innerHTML=thoughts[tIdx]+'&thinsp;<span class="t-cur">|</span>';thEl.style.transition='opacity .4s';thEl.style.opacity='1'},240)},3200);
const cmoTs=['Freya updating pipeline attribution…','Analytics Agent: new anomaly detected on LinkedIn CTR','Board PPTX generated — ready to review','Forecasting Agent: Q4 MQL projection updated to 920'];
let ci=0;const cmoEl=document.getElementById('cmoTick');if(cmoEl)setInterval(()=>{ci=(ci+1)%cmoTs.length;cmoEl.style.opacity='0';setTimeout(()=>{cmoEl.textContent=cmoTs[ci];cmoEl.style.transition='opacity .4s';cmoEl.style.opacity='1'},200)},2800);
let leads=482;setInterval(()=>{leads+=Math.floor(Math.random()*2);const e=document.getElementById('bizLeads');if(e)e.textContent=leads},4500);
const bizTasksLive=['Generating 6 email sequence variants…','Re-ranking ICP accounts from fresh intent data…','Packaging board-ready revenue brief for approval…','Rebalancing outreach cadence after CTR drift…'];
let bizFastIdx=0;const bizTaskFastEl=document.getElementById('bizTask');
if(bizTaskFastEl)setInterval(()=>{bizFastIdx=(bizFastIdx+1)%bizTasksLive.length;bizTaskFastEl.style.opacity='0';setTimeout(()=>{bizTaskFastEl.textContent=bizTasksLive[bizFastIdx];bizTaskFastEl.style.transition='opacity .3s';bizTaskFastEl.style.opacity='1'},140)},1750);
setInterval(()=>{const e=document.getElementById('bizLeads');if(e){const next=Number((e.textContent||'482').replace(/,/g,''))+Math.floor(Math.random()*4+1);e.style.transform='scale(1.08)';e.textContent=next.toLocaleString();setTimeout(()=>{e.style.transition='transform .2s';e.style.transform='scale(1)'},120)}},1850);
document.querySelectorAll('.t-pf,.dw-pf').forEach((bar,idx)=>{let w=60+(idx*6);setInterval(()=>{w=60+((w+Math.floor(Math.random()*16)+7)%32);bar.style.width=w+'%'},1450+(idx*120))});
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
