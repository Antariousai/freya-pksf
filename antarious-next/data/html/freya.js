const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Meet Freya — Autonomous AI Agent by Antarious</title>
<meta name="description" content="Freya is the autonomous AI agent at the heart of Antarious. Persistent memory, proactive alerting, multi-agent orchestration, transparent reasoning — for Business, NGO, and Government.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&family=DM+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:"Plus Jakarta Sans",sans-serif;line-height:1.65;overflow-x:hidden;transition:background .35s,color .35s}
[data-theme="light"]{
  --bg:#FAFAF7;--bg2:#FFFFFF;--bg3:#F4F2ED;--bg4:#ECE9E2;
  --ink:#0C1729;--ink2:#2D3F5A;--ink3:#5A6E87;--ink4:#94A3B8;--ink5:#CBD5E1;
  --td:#0284C7;--tdd:#0369A1;--tl:#38BDF8;--teal:#0EA5E9;
  --tbg:rgba(14,165,233,.07);--tbg2:rgba(14,165,233,.13);--tbdr:rgba(14,165,233,.2);--tbdr2:rgba(14,165,233,.4);
  --green:#059669;--gbg:rgba(5,150,105,.08);--gbdr:rgba(5,150,105,.2);
  --red:#DC2626;--rbg:rgba(220,38,38,.06);--rbdr:rgba(220,38,38,.17);
  --amber:#D97706;--abg:rgba(217,119,6,.07);
  --purple:#7C3AED;--pbg:rgba(124,58,237,.07);--pbdr:rgba(124,58,237,.2);
  --bdr:rgba(12,23,41,.08);--bdr2:rgba(12,23,41,.05);
  --sh:0 1px 4px rgba(0,0,0,.05),0 8px 32px rgba(0,0,0,.06);
  --sh2:0 4px 24px rgba(0,0,0,.07),0 20px 64px rgba(0,0,0,.07);
  --sht:0 4px 24px rgba(2,132,199,.2);--logo:block;--logo-w:none
}
[data-theme="dark"]{
  --bg:#080E1A;--bg2:#0E1826;--bg3:#141F30;--bg4:#1A2840;
  --ink:#EDF2FF;--ink2:#BDD0EE;--ink3:#7A9AB8;--ink4:#4A6785;--ink5:#2D4660;
  --td:#38BDF8;--tdd:#7DD3FC;--tl:#38BDF8;--teal:#0EA5E9;
  --tbg:rgba(14,165,233,.1);--tbg2:rgba(14,165,233,.18);--tbdr:rgba(14,165,233,.25);--tbdr2:rgba(14,165,233,.45);
  --green:#34D399;--gbg:rgba(52,211,153,.1);--gbdr:rgba(52,211,153,.25);
  --red:#F87171;--rbg:rgba(248,113,113,.08);--rbdr:rgba(248,113,113,.22);
  --amber:#FCD34D;--abg:rgba(252,211,77,.08);
  --purple:#A78BFA;--pbg:rgba(167,139,250,.1);--pbdr:rgba(167,139,250,.25);
  --bdr:rgba(255,255,255,.08);--bdr2:rgba(255,255,255,.05);
  --sh:0 1px 4px rgba(0,0,0,.3),0 8px 32px rgba(0,0,0,.25);
  --sh2:0 4px 24px rgba(0,0,0,.28),0 20px 64px rgba(0,0,0,.3);
  --sht:0 4px 24px rgba(56,189,248,.18);--logo:none;--logo-w:block
}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes floatS{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes spinR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes blink{50%{opacity:0}}
@keyframes liveBar{0%{width:4%}65%{width:87%}85%{width:94%}100%{width:99%}}
@keyframes particleSpin{from{transform:rotate(var(--pr,0deg)) translateX(var(--pd,80px))}to{transform:rotate(calc(var(--pr,0deg) + 360deg)) translateX(var(--pd,80px))}}
@keyframes orbGlow{0%,100%{box-shadow:0 0 0 0 rgba(2,132,199,.35),0 0 60px rgba(2,132,199,.2)}50%{box-shadow:0 0 0 28px rgba(2,132,199,.04),0 0 110px rgba(2,132,199,.32)}}
@keyframes conic{from{--ca:0deg}to{--ca:360deg}}
@keyframes scanOrb{0%{top:5%}100%{top:108%}}
@keyframes rippleOut{0%{transform:scale(1);opacity:.5}100%{transform:scale(2.6);opacity:0}}
@keyframes slideL{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes sanctumPulse{0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,.08)}50%{box-shadow:0 0 0 12px rgba(56,189,248,0)}}
@keyframes sanctumSweep{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
@keyframes auroraShift{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(2%,-2%,0) scale(1.08)}}
@keyframes hudDrift{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes rowScan{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
@keyframes nodeBlink{0%,100%{opacity:.9}50%{opacity:.42}}
@property --ca{syntax:'<angle>';initial-value:0deg;inherits:false}

.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.reveal.in{opacity:1;transform:none}
.d1{transition-delay:.08s}.d2{transition-delay:.15s}.d3{transition-delay:.22s}.d4{transition-delay:.29s}
body{background:var(--bg);color:var(--ink)}
section{padding:96px 0}
.page{max-width:1200px;margin:0 auto;padding:0 48px}
.divider{height:1px;background:var(--bdr)}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:"DM Mono",monospace;font-size:9.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--td);margin-bottom:16px}
.eyebrow::before{content:"";width:16px;height:1.5px;background:var(--td);border-radius:2px;flex-shrink:0}
.h2{font-family:"Outfit",sans-serif;font-size:clamp(26px,3.5vw,52px);font-weight:900;color:var(--ink);line-height:1.04;letter-spacing:-1.8px;margin-bottom:16px}
.h2 em{color:var(--td);font-style:italic}
.sp{font-size:17px;color:var(--ink3);line-height:1.82;max-width:600px;margin-bottom:52px}
.sp.w{max-width:800px}

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
  transition:all .2s;box-shadow:0 4px 14px rgba(12,23,41,.04)
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
.btn-nav-cta{font-family:"Outfit",sans-serif;font-size:13px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--td),var(--tdd));border:none;padding:9px 22px;border-radius:12px;cursor:pointer;transition:all .22s;box-shadow:0 6px 16px rgba(2,132,199,.24)}
.btn-nav-cta:hover{background:linear-gradient(135deg,var(--tdd),#0369A1);transform:translateY(-1px);box-shadow:0 10px 24px rgba(2,132,199,.3)}
.mobile-menu-btn{display:none;flex-direction:column;gap:4px;cursor:pointer;padding:6px;border:none;background:none}
.mmb-line{width:20px;height:2px;background:var(--ink3);border-radius:2px}
.mobile-nav{display:none;position:fixed;inset:0;top:64px;background:var(--bg2);z-index:899;padding:24px;flex-direction:column;gap:4px}
.mobile-nav.open{display:flex}
.mob-nl{font-family:"Outfit",sans-serif;font-size:16px;font-weight:600;color:var(--ink2);padding:12px 16px;border-radius:10px;cursor:pointer;border:none;background:none;text-align:left;transition:background .17s;width:100%}
.mob-nl:hover{background:var(--bg3)}

/* HERO DARK */
.hero-dark{min-height:100vh;background:#060D1A;position:relative;overflow:hidden;display:flex;align-items:center}
[data-theme="dark"] .hero-dark{background:#050A14}
.hd-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 44%,rgba(14,165,233,.15),transparent 55%);pointer-events:none}
.hd-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(14,165,233,.08) 1px,transparent 1px);background-size:38px 38px;mask-image:radial-gradient(ellipse at 50% 40%,black 28%,transparent 68%);pointer-events:none}
.hero-inner{max-width:1240px;margin:0 auto;padding:124px 48px 100px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;z-index:2}
.hero-kicker{display:inline-flex;align-items:center;gap:9px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--tl);margin-bottom:20px;animation:fadeUp .5s ease both}
.hero-kicker::before{content:"";width:18px;height:1.5px;background:var(--tl);flex-shrink:0}
.kd{width:5px;height:5px;border-radius:50%;background:var(--green);box-shadow:0 0 7px rgba(5,150,105,.7);animation:pulse 1.8s ease infinite}
.hero-h1{font-family:"Outfit",sans-serif;font-size:clamp(44px,5.5vw,82px);font-weight:900;color:#F0F7FF;line-height:.92;letter-spacing:-3px;margin-bottom:8px;animation:fadeUp .55s .06s ease both}
.hero-h1 .ac{color:var(--tl);font-style:italic}
.hero-h1 .dm{color:rgba(240,247,255,.38);font-weight:400}
.hero-sub{font-family:"Outfit",sans-serif;font-size:clamp(15px,1.7vw,21px);font-weight:600;color:rgba(240,247,255,.58);margin-bottom:18px;letter-spacing:-.3px;animation:fadeUp .55s .10s ease both;max-width:440px}
.hero-sub strong{color:rgba(240,247,255,.86)}
.hero-body{font-size:15.5px;line-height:1.82;color:rgba(240,247,255,.48);max-width:460px;margin-bottom:32px;animation:fadeUp .55s .14s ease both}
.hero-btns{display:flex;gap:12px;margin-bottom:40px;animation:fadeUp .55s .18s ease both;flex-wrap:wrap}
.hero-tags{display:flex;flex-wrap:wrap;gap:7px;animation:fadeUp .55s .22s ease both}
.h-tag{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;padding:5px 13px;border-radius:20px;background:rgba(14,165,233,.1);border:1px solid rgba(14,165,233,.22);color:rgba(240,247,255,.68)}
.btn-hero-p{font-family:"Outfit",sans-serif;font-size:15px;font-weight:700;color:#fff;background:var(--td);border:none;padding:14px 32px;border-radius:14px;cursor:pointer;transition:all .25s;box-shadow:0 4px 20px rgba(2,132,199,.3);display:inline-flex;align-items:center;gap:8px}
.btn-hero-p:hover{background:var(--teal);transform:translateY(-2px);box-shadow:0 8px 36px rgba(14,165,233,.4)}
.btn-hero-p svg{transition:transform .2s}.btn-hero-p:hover svg{transform:translateX(3px)}
.btn-hero-g{font-family:"Outfit",sans-serif;font-size:15px;font-weight:600;color:rgba(240,247,255,.6);background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);padding:13px 24px;border-radius:14px;cursor:pointer;transition:all .22s}
.btn-hero-g:hover{border-color:rgba(14,165,233,.45);color:var(--tl);background:rgba(14,165,233,.1)}

/* LARGE ORB */
.orb-wrap{width:440px;height:440px;position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin:0 auto}
.o-ring{position:absolute;border-radius:50%;border-style:solid;border-color:rgba(14,165,233,.18)}
.o-r1{width:438px;height:438px;border-width:1px;animation:spinR 30s linear infinite}
.o-r2{width:390px;height:390px;border-width:1px;border-style:dashed;border-color:rgba(14,165,233,.1);animation:spin 22s linear infinite}
.o-r3{width:340px;height:340px;border-width:1.5px;border-color:rgba(14,165,233,.14);animation:spinR 14s linear infinite}
.o-r4{width:290px;height:290px;border-width:1px;border-color:rgba(14,165,233,.1);animation:spin 9s linear infinite}
.o-r1::before,.o-r1::after{content:"";position:absolute;width:6px;height:6px;border-radius:50%;background:rgba(56,189,248,.7);box-shadow:0 0 8px rgba(56,189,248,.5)}
.o-r1::before{top:-3px;left:calc(50% - 3px)}.o-r1::after{bottom:-3px;left:calc(50% - 3px)}
.o-r3::before,.o-r3::after{content:"";position:absolute;width:9px;height:9px;border-radius:50%;background:var(--tl);box-shadow:0 0 16px var(--tl)}
.o-r3::before{top:-4.5px;left:calc(50% - 4.5px)}.o-r3::after{right:-4.5px;top:calc(50% - 4.5px)}
.o-pts{position:absolute;inset:0;pointer-events:none;z-index:3}
.o-pt{position:absolute;top:50%;left:50%;border-radius:50%;background:var(--tl);box-shadow:0 0 8px rgba(56,189,248,.8);margin:-3px 0 0 -3px;transform-origin:0 0}
.o-pt:nth-child(1){width:6px;height:6px;animation:particleSpin 8s linear infinite;--pr:0deg;--pd:168px}
.o-pt:nth-child(2){width:4px;height:4px;opacity:.7;animation:particleSpin 6s .8s linear infinite;--pr:72deg;--pd:156px}
.o-pt:nth-child(3){width:5px;height:5px;opacity:.5;animation:particleSpin 11s 1.5s linear infinite;--pr:144deg;--pd:176px}
.o-pt:nth-child(4){width:6px;height:6px;animation:particleSpin 7s 2.2s linear infinite;--pr:216deg;--pd:150px}
.o-pt:nth-child(5){width:4px;height:4px;opacity:.7;animation:particleSpin 9s 3s linear infinite;--pr:288deg;--pd:164px}
.o-pt:nth-child(6){width:5px;height:5px;animation:particleSpin 5.5s 4s linear infinite;--pr:330deg;--pd:160px}
.o-nd{position:absolute;width:46px;height:46px;border-radius:50%;background:rgba(14,165,233,.1);border:1.5px solid rgba(14,165,233,.3);display:flex;align-items:center;justify-content:center;font-size:18px;z-index:3;transition:all .25s;cursor:default}
.o-nd:hover{background:rgba(14,165,233,.24);transform:scale(1.22)}
.o-nd.nd1{top:16px;left:calc(50% - 23px);animation:floatS 4s ease infinite}
.o-nd.nd2{top:calc(50% - 23px);right:16px;animation:floatS 4s .8s ease infinite}
.o-nd.nd3{bottom:16px;left:calc(50% - 23px);animation:floatS 4s 1.6s ease infinite}
.o-nd.nd4{top:calc(50% - 23px);left:16px;animation:floatS 4s 2.4s ease infinite}
.o-nd.nd5{top:76px;right:76px;animation:floatS 4s .4s ease infinite}
.o-nd.nd6{bottom:76px;left:76px;animation:floatS 4s 2s ease infinite}
.o-core{width:246px;height:246px;border-radius:50%;position:relative;z-index:4;background:conic-gradient(from var(--ca) at 50% 50%,#0369A1 0deg,#0EA5E9 90deg,#38BDF8 150deg,#0891B2 220deg,#0369A1 360deg);animation:conic 6s linear infinite,orbGlow 4s ease infinite;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .4s}
.o-core:hover{transform:scale(1.06)}
.o-glass{position:absolute;inset:13px;border-radius:50%;background:rgba(255,255,255,.1);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:5}
.o-letter{font-family:"Outfit",sans-serif;font-size:84px;font-weight:900;color:#fff;line-height:1;text-shadow:0 0 36px rgba(255,255,255,.5)}
.o-lbl{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:4px;color:rgba(255,255,255,.5);margin-top:2px;text-transform:uppercase}
.o-scan{position:absolute;inset:13px;border-radius:50%;overflow:hidden;z-index:6;pointer-events:none}
.o-scan::after{content:"";position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);animation:scanOrb 3.5s linear infinite}

/* STRIP */
.trust-strip{overflow:hidden;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);background:var(--bg2);padding:14px 0}
.scroll-row{overflow:hidden;white-space:nowrap}
.scroll-inner{display:inline-flex;gap:52px;animation:slideL 28s linear infinite;align-items:center}
.slogo{font-family:"Outfit",sans-serif;font-size:12.5px;font-weight:700;color:var(--ink5);flex-shrink:0;cursor:default;transition:color .2s}
.slogo:hover{color:var(--ink3)}

/* CAPABILITIES */
.cap-intro{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;max-width:980px;margin:0 auto 36px}
.cap-intro .eyebrow,.cap-intro .h2{margin-bottom:0}
.cap-intro .sp{margin:0 auto !important}
.cap-coin-wrap{
  width:min(360px,38vw);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;
  margin:0 auto;background:#FFFFFF;overflow:hidden
}
.cap-coin-video{width:100%;height:100%;display:block;object-fit:contain;background:#FFFFFF;transform:scale(1.08)}
.cap-title-lockup{max-width:980px;margin:0 auto;line-height:.98}
.cap-title-lockup .title-line{display:block;white-space:nowrap}
.cap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.cap{background:var(--bg2);border:1.5px solid var(--bdr);border-top:3px solid var(--ac,var(--td));border-radius:20px;padding:28px 24px;position:relative;transition:all .22s;cursor:default}
.cap:hover{transform:translateY(-4px);box-shadow:var(--sh2)}
.cap-icon{font-size:28px;margin-bottom:14px;display:block}
.cap-num{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ac,var(--td));margin-bottom:6px}
.cap-title{font-family:"Outfit",sans-serif;font-size:18px;font-weight:800;color:var(--ink);margin-bottom:9px}
.cap-body{font-size:13.5px;color:var(--ink3);line-height:1.78}
.cap-badge{display:inline-flex;align-items:center;gap:5px;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;padding:4px 11px;border-radius:5px;margin-top:12px}
.cb-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.5s ease infinite}

/* INDUSTRY TABS — 3 clear tabs */
.ind-tabs-wrap{display:flex;justify-content:center;margin-bottom:48px}
.ind-tabs{display:inline-flex;background:var(--bg2);border:1.5px solid var(--bdr);border-radius:40px;padding:4px;gap:3px}
.ind-tab{font-family:"Outfit",sans-serif;font-size:14px;font-weight:700;padding:11px 30px;border-radius:36px;cursor:pointer;border:none;background:none;color:var(--ink3);transition:all .25s}
.ind-tab:hover:not(.on){color:var(--ink2);background:var(--bg3)}
.ind-tab.on.biz{background:var(--td);color:#fff;box-shadow:0 2px 16px rgba(2,132,199,.3)}
.ind-tab.on.ngo{background:#059669;color:#fff;box-shadow:0 2px 16px rgba(5,150,105,.28)}
.ind-tab.on.gov{background:#660033;color:#fff;box-shadow:0 2px 16px rgba(102,0,51,.28)}
.ind-panel{display:none}
.ind-panel.on{display:block}

/* Industry grid inside panel */
.ind-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.ind-h3{font-family:"Outfit",sans-serif;font-size:clamp(20px,2.5vw,34px);font-weight:900;color:var(--ink);line-height:1.07;letter-spacing:-.8px;margin-bottom:12px}
.ind-h3 em{font-style:italic}
.biz-em em{color:var(--td)}.ngo-em em{color:#059669}.gov-em em{color:#660033}
.ind-p{font-size:15px;color:var(--ink3);line-height:1.8;margin-bottom:18px}
.ind-stats{display:flex;gap:18px;margin-bottom:22px;flex-wrap:wrap;align-items:flex-start}
.ind-sv{font-family:"Outfit",sans-serif;font-size:26px;font-weight:900;line-height:1}
.ind-sl{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink4);margin-top:3px}
.ind-sdiv{width:1px;background:var(--bdr);height:36px;align-self:center;flex-shrink:0}
.ind-agents{display:flex;flex-direction:column;gap:7px;margin-bottom:24px}
.ia{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:10px;background:var(--bg3);border:1px solid var(--bdr2);transition:all .18s;cursor:default}
.ia:hover{border-color:var(--bdr)}
.ia-ic{font-size:16px;flex-shrink:0}
.ia-nm{font-family:"Outfit",sans-serif;font-size:13px;font-weight:700;color:var(--ink)}
.ia-ds{font-size:11.5px;color:var(--ink4)}
.ind-cta-btn{font-family:"Outfit",sans-serif;font-size:14px;font-weight:700;color:#fff;border:none;padding:12px 26px;border-radius:12px;cursor:pointer;transition:all .25s;display:inline-flex;align-items:center;gap:8px;box-shadow:var(--sht)}
.ind-cta-btn:hover{transform:translateY(-2px)}
.ind-cta-btn svg{transition:transform .2s}.ind-cta-btn:hover svg{transform:translateX(3px)}

/* Industry visual panel */
.ind-visual{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:20px;overflow:hidden;box-shadow:var(--sh2)}
.iv-bar{background:var(--bg3);padding:10px 14px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;gap:8px}
.iv-dots{display:flex;gap:4px}.iv-dot{width:9px;height:9px;border-radius:50%}
.iv-url{flex:1;text-align:center;font-family:"DM Mono",monospace;font-size:9.5px;color:var(--ink4)}
.iv-live{display:flex;align-items:center;gap:4px;font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;color:var(--green)}
.iv-ldot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.5s ease infinite}
.iv-prog{height:2px;background:var(--bg3)}
.iv-pf{height:100%;animation:liveBar 3.5s ease-in-out infinite}
.iv-body{padding:18px}
.f-tick{display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:8px;margin-bottom:11px;border:1px solid}
.f-tick-orb{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Outfit",sans-serif;font-size:9px;font-weight:900;color:#fff;flex-shrink:0;animation:conic 4s linear infinite}
.f-tick-txt{display:flex;align-items:center;min-height:30px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;flex:1}
.f-tick-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:pulse 1.4s ease infinite;flex-shrink:0}
.iv-metric-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:10px}
.iv-m{background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:11px}
.iv-m-lbl{font-family:"DM Mono",monospace;font-size:8px;color:var(--ink4);letter-spacing:1px;margin-bottom:4px}
.iv-m-val{font-family:"Outfit",sans-serif;font-size:20px;font-weight:900;line-height:1}
.iv-m-sub{font-size:10px;margin-top:2px}
.iv-alert{border-radius:8px;padding:10px;display:flex;gap:8px;align-items:flex-start}
.iv-a-lbl{font-family:"DM Mono",monospace;font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:2px}
.iv-a-txt{min-height:54px;font-size:11.5px;color:var(--ink2);line-height:1.55}
.iv-tag{display:flex;align-items:center;min-height:42px;font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1px;border-radius:8px;padding:8px;margin-top:9px}

/* SIMULATION */
.sim-sector-tab{font-family:"Outfit",sans-serif;font-size:14px;font-weight:700;padding:11px 30px;border-radius:36px;cursor:pointer;border:none;background:none;color:var(--ink3);transition:all .25s}
.sim-sector-tab:hover:not(.on){color:var(--ink2);background:var(--bg3)}
.sim-sector-tab.on.biz{background:var(--td);color:#fff;box-shadow:0 2px 16px rgba(2,132,199,.3)}
.sim-sector-tab.on.ngo{background:#059669;color:#fff;box-shadow:0 2px 16px rgba(5,150,105,.28)}
.sim-sector-tab.on.gov{background:#660033;color:#fff;box-shadow:0 2px 16px rgba(102,0,51,.28)}
.sim-wrap{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:24px;overflow:hidden;box-shadow:var(--sh2)}
.sim-head{padding:24px 30px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:nowrap}
.sim-head h3{font-family:"Outfit",sans-serif;font-size:19px;font-weight:900;color:var(--ink);margin-bottom:2px}
.sim-head p{font-size:12.5px;color:var(--ink3)}
.sim-toggle{display:flex;gap:3px;background:var(--bg3);border:1px solid var(--bdr);border-radius:16px;padding:3px}
.stt{font-family:"DM Mono",monospace;font-size:9.5px;font-weight:700;letter-spacing:.5px;padding:7px 16px;border-radius:12px;cursor:pointer;transition:all .2s;color:var(--ink3);border:none;background:none}
.stt.on{background:var(--bg2);box-shadow:var(--sh)}.stt.m.on{color:var(--red)}.stt.f.on{color:var(--td)}
.sim-body{padding:22px 30px;display:flex;flex-direction:column;gap:8px}
.sim-ph{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--td);opacity:.65;margin-bottom:3px}
.sim-row{display:grid;grid-template-columns:1fr 44px 1fr;align-items:stretch}
.sim-m{background:var(--rbg);border:1px solid var(--rbdr);border-radius:12px 0 0 12px;padding:13px 15px;transition:opacity .4s}
.sim-f{background:var(--tbg);border:1px solid var(--tbdr);border-radius:0 12px 12px 0;padding:13px 15px;transition:opacity .4s}
.sim-vs{display:flex;align-items:center;justify-content:center;font-family:"DM Mono",monospace;font-size:9px;font-weight:800;color:var(--ink4);background:var(--bg3);border-top:1px solid var(--bdr2);border-bottom:1px solid var(--bdr2)}
.sim-lbl{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px}
.sim-lbl.r{color:var(--red)}.sim-lbl.t{color:var(--td)}
.sim-title{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:3px;line-height:1.4}
.sim-time{font-family:"DM Mono",monospace;font-size:10px;font-weight:700}
.sim-time.r{color:var(--red)}.sim-time.g{color:var(--green)}
.sim-foot{padding:16px 30px;border-top:1px solid var(--bdr2);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;background:var(--bg3)}
.sim-tots{display:flex;gap:28px}
.sim-tl{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink4);margin-bottom:3px}
.sim-tv{font-family:"Outfit",sans-serif;font-size:24px;font-weight:900}
.sim-tv.rv{color:var(--red)}.sim-tv.tv{color:var(--td)}
.btn-more{font-family:"Outfit",sans-serif;font-size:13px;font-weight:700;color:var(--td);background:var(--tbg);border:1.5px solid var(--tbdr);padding:9px 18px;border-radius:10px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.btn-more:hover{background:var(--tbg2);border-color:var(--tbdr2)}
body.ct-before .sim-f{opacity:.25;filter:grayscale(.4)}
body.ct-after .sim-m{opacity:.25;filter:grayscale(.4)}

/* TRUST PILLARS */
.trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.tg{background:var(--bg2);border:1.5px solid var(--bdr);border-radius:18px;padding:24px 20px;text-align:center;transition:all .22s;cursor:default}
.tg:hover{border-color:var(--tbdr);transform:translateY(-3px);box-shadow:var(--sh2)}
.tg-icon{font-size:28px;margin-bottom:12px;display:block}
.tg-title{font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;color:var(--ink);margin-bottom:7px}
.tg-body{font-size:12.5px;color:var(--ink3);line-height:1.68}

/* CTA DARK */
.cta-card{background:#060D1A;border-radius:28px;padding:80px 56px;text-align:center;position:relative;overflow:hidden}
[data-theme="dark"] .cta-card{background:var(--bg2)}
.cta-g{position:absolute;top:-22%;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(14,165,233,.14),transparent 55%);pointer-events:none}
.cta-d{position:absolute;inset:0;background-image:radial-gradient(rgba(14,165,233,.07) 1px,transparent 1px);background-size:36px 36px;mask-image:radial-gradient(ellipse at 50% 40%,black 30%,transparent 68%);pointer-events:none}
.cta-c{position:relative;z-index:2}
.cta-ey{display:inline-flex;align-items:center;gap:8px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--tl);margin-bottom:18px}
.cta-ey::before,.cta-ey::after{content:"";width:18px;height:1.5px;background:var(--tl);flex-shrink:0}
.cta-h2{font-family:"Outfit",sans-serif;font-size:clamp(28px,4vw,54px);font-weight:900;color:#F0F7FF;line-height:1.04;letter-spacing:-1.5px;margin-bottom:14px}
.cta-h2 em{color:var(--tl);font-style:italic}
.cta-p{font-size:16px;color:rgba(240,247,255,.54);line-height:1.75;max-width:460px;margin:0 auto 36px}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-cta-p{font-family:"Outfit",sans-serif;font-size:15px;font-weight:700;color:#fff;background:var(--td);border:none;padding:14px 34px;border-radius:14px;cursor:pointer;transition:all .25s;box-shadow:0 4px 20px rgba(2,132,199,.28);display:inline-flex;align-items:center;gap:8px}
.btn-cta-p:hover{background:var(--teal);transform:translateY(-2px);box-shadow:0 8px 36px rgba(14,165,233,.4)}
.btn-cta-g{font-family:"Outfit",sans-serif;font-size:15px;font-weight:600;color:rgba(240,247,255,.62);background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);padding:13px 26px;border-radius:14px;cursor:pointer;transition:all .22s}
.btn-cta-g:hover{border-color:rgba(14,165,233,.45);color:var(--tl)}

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
@media(max-width:1100px){.hero-inner{grid-template-columns:1fr;max-width:640px;padding:110px 48px 80px}.orb-wrap{width:320px;height:320px;max-width:320px}.o-r1{width:318px;height:318px}.o-r2{width:282px;height:282px}.o-r3{width:246px;height:246px}.o-r4{width:210px;height:210px}.o-core{width:180px;height:180px}.o-letter{font-size:64px}.ind-grid{grid-template-columns:1fr}.footer-top{grid-template-columns:1fr 1fr 1fr}}
@media(max-width:860px){.page{padding:0 20px}.nav{padding:0 20px}.nl{display:none}.mobile-menu-btn{display:flex}section{padding:64px 0}.cap-grid{grid-template-columns:1fr 1fr}.trust-grid{grid-template-columns:1fr 1fr}.cta-card{padding:48px 20px}.footer-top{grid-template-columns:1fr 1fr}.hero-inner{padding:100px 20px 80px;max-width:100%}.ind-tabs{flex-direction:column;border-radius:16px;width:100%;max-width:340px}.ind-tab{border-radius:12px;text-align:center}}
@media(max-width:560px){.cap-grid{grid-template-columns:1fr}.trust-grid{grid-template-columns:1fr 1fr}.sim-row{grid-template-columns:1fr}.sim-vs{display:none}.sim-m{border-radius:12px;margin-bottom:4px}.sim-f{border-radius:12px}}
/* FREYA PAGE REDESIGN */
body.page-freya{background:
radial-gradient(circle at top right,rgba(14,165,233,.08),transparent 24%),
linear-gradient(180deg,#FCFCF8 0%,#F6F9FD 45%,#FAFAF7 100%);overflow-anchor:none}
.page-freya .hero-dark,
.page-freya #capabilities,
.page-freya #industry,
.page-freya #workflow-simulation,
.page-freya .trust-strip,
.page-freya .freya-sanctum,
.page-freya .sanctum-stream,
.page-freya .oracle-grid,
.page-freya .ind-visual,
.page-freya .sim-wrap{overflow-anchor:none}
.page-freya .hero-dark{background:
radial-gradient(circle at 72% 24%,rgba(56,189,248,.16),transparent 24%),
radial-gradient(circle at 80% 78%,rgba(124,58,237,.12),transparent 20%),
#060D1A}
.page-freya .hero-dark .hd-bg{animation:auroraShift 12s ease-in-out infinite}
.page-freya .hero-inner{grid-template-columns:minmax(0,1fr) minmax(480px,560px);gap:72px;align-items:start}
.page-freya .goddess-stage{display:block;align-self:start;width:100%}
.page-freya .freya-sanctum{width:100%;max-width:560px;position:relative;overflow:hidden;border-radius:30px;padding:26px;background:linear-gradient(145deg,rgba(8,20,38,.98),rgba(14,28,52,.96));border:1px solid rgba(56,189,248,.14);box-shadow:0 28px 80px rgba(4,12,24,.28)}
.page-freya .freya-sanctum::before{content:"";position:absolute;inset:0;background:
radial-gradient(circle at top right,rgba(125,211,252,.16),transparent 28%),
linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0));pointer-events:none}
.page-freya .freya-sanctum::after{content:"";position:absolute;top:0;bottom:0;width:38%;background:linear-gradient(90deg,transparent,rgba(125,211,252,.08),transparent);opacity:.8;animation:sanctumSweep 5.8s linear infinite;pointer-events:none}
.page-freya .sanctum-top,.page-freya .sanctum-stream,.page-freya .sanctum-grid,.page-freya .sanctum-note{position:relative;z-index:1}
.page-freya .sanctum-top{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:18px}
.page-freya .sanctum-kicker{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:#7DD3FC;margin-bottom:8px}
.page-freya .sanctum-title{font-family:"Outfit",sans-serif;font-size:26px;font-weight:800;line-height:1.06;letter-spacing:-.8px;color:#F5F9FF;max-width:320px}
.page-freya .sanctum-status{display:inline-flex;align-items:center;gap:8px;font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:1.6px;color:#A7F3D0;padding:9px 12px;border-radius:999px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.18);animation:sanctumPulse 2.8s ease infinite}
.page-freya .sanctum-status span{width:8px;height:8px;border-radius:50%;background:#34D399;box-shadow:0 0 14px rgba(52,211,153,.9);animation:pulse 1.5s ease infinite}
.page-freya .sanctum-stream{display:grid;gap:10px;margin-bottom:18px}
.page-freya .sanctum-line{display:grid;grid-template-columns:10px 96px minmax(0,1fr) auto;align-items:center;gap:10px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07)}
.page-freya .sl-dot{width:8px;height:8px;border-radius:50%;background:#38BDF8;box-shadow:0 0 12px rgba(56,189,248,.85);animation:pulse 1.6s ease infinite}
.page-freya .sl-label{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:rgba(186,230,253,.8)}
.page-freya .sl-text{display:block;min-height:36px;font-size:12.5px;font-weight:600;line-height:1.45;color:#E8F3FF}
.page-freya .sl-tag{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1.1px;color:#A7F3D0;padding:6px 8px;border-radius:999px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.18)}
.page-freya .sanctum-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:16px}
.page-freya .sanctum-metric{padding:15px 14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07)}
.page-freya .sanctum-metric strong{display:block;font-family:"Outfit",sans-serif;font-size:28px;font-weight:900;line-height:1;color:#F5F9FF;margin-bottom:5px}
.page-freya .sanctum-metric span{display:block;font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:rgba(186,230,253,.74)}
.page-freya .oracle-matrix{position:relative;padding:18px;border-radius:22px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);margin-bottom:16px;overflow:hidden}
.page-freya .oracle-matrix::before{content:"";position:absolute;inset:0;background:
linear-gradient(90deg,rgba(56,189,248,.04),transparent 30%,transparent 70%,rgba(167,139,250,.04)),
repeating-linear-gradient(0deg,transparent 0 23px,rgba(255,255,255,.03) 23px 24px);pointer-events:none}
.page-freya .oracle-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;position:relative;z-index:1}
.page-freya .oracle-title{font-family:"DM Mono",monospace;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7DD3FC}
.page-freya .oracle-mode{font-family:"DM Mono",monospace;font-size:9px;font-weight:700;letter-spacing:1.2px;color:#C4B5FD;padding:7px 10px;border-radius:999px;background:rgba(124,58,237,.12);border:1px solid rgba(167,139,250,.18)}
.page-freya .oracle-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.page-freya .oracle-col{display:grid;gap:10px}
.page-freya .oracle-node{position:relative;padding:12px 12px 13px;border-radius:18px;background:rgba(7,18,34,.54);border:1px solid rgba(255,255,255,.07);animation:hudDrift 4.8s ease-in-out infinite}
.page-freya .oracle-col:nth-child(2) .oracle-node{animation-delay:.5s}
.page-freya .oracle-col:nth-child(3) .oracle-node{animation-delay:1s}
.page-freya .oracle-node::before{content:"";position:absolute;top:14px;right:14px;width:8px;height:8px;border-radius:50%;background:#38BDF8;box-shadow:0 0 12px rgba(56,189,248,.8);animation:nodeBlink 1.8s ease infinite}
.page-freya .oracle-node small{display:block;font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:rgba(186,230,253,.74);margin-bottom:8px}
.page-freya .oracle-node strong{display:flex;align-items:center;min-height:38px;font-family:"Outfit",sans-serif;font-size:15px;font-weight:800;line-height:1.25;color:#F8FBFF;margin-bottom:4px}
.page-freya .oracle-node span{display:block;font-size:11.5px;line-height:1.55;color:rgba(226,238,255,.68)}
.page-freya .sanctum-note{padding:14px 16px;border-radius:18px;background:linear-gradient(90deg,rgba(245,158,11,.08),rgba(255,255,255,.04));border:1px solid rgba(245,158,11,.16);font-size:12.5px;line-height:1.6;color:#F8FBFF}
.page-freya .sanctum-note b{font-family:"DM Mono",monospace;font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:#FBBF24;margin-right:10px}
.page-freya #capabilities .cap-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:stretch}
.page-freya #capabilities{background:#FFFFFF !important;padding-top:52px;padding-bottom:88px}
.page-freya #capabilities .cap{display:flex;flex-direction:column;justify-content:flex-start;min-height:100%;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(244,242,237,.92));border:1px solid rgba(12,23,41,.08);box-shadow:0 18px 44px rgba(12,23,41,.06)}
.page-freya #capabilities .cap:nth-child(1){background:linear-gradient(160deg,rgba(255,255,255,.99),rgba(236,249,255,.95))}
.page-freya #capabilities .cap:nth-child(2){background:linear-gradient(160deg,rgba(255,255,255,.99),rgba(241,252,247,.95))}
.page-freya #capabilities .cap:nth-child(3){background:linear-gradient(160deg,rgba(255,255,255,.99),rgba(255,249,238,.95))}
.page-freya #capabilities .cap:nth-child(4){background:linear-gradient(160deg,rgba(255,255,255,.99),rgba(245,240,255,.95))}
.page-freya #capabilities .cap:nth-child(5){background:linear-gradient(160deg,rgba(255,255,255,.99),rgba(238,247,255,.95))}
.page-freya #capabilities .cap:nth-child(6){background:linear-gradient(160deg,rgba(255,255,255,.99),rgba(241,252,247,.95))}
.page-freya #capabilities .cap-title{margin-bottom:10px}
.page-freya #capabilities .cap-body{flex:1}
.page-freya #industry .ind-tabs-wrap{justify-content:flex-start;margin-bottom:18px}
.page-freya #industry .ind-tabs{padding:8px;border-radius:18px;background:rgba(255,255,255,.88);border:1px solid rgba(12,23,41,.08);box-shadow:0 14px 34px rgba(12,23,41,.05)}
.page-freya #industry .ind-panel{padding:12px 0 0}
.page-freya #industry .ind-grid{align-items:start;gap:28px}
.page-freya #industry .ind-visual{display:flex;flex-direction:column;min-height:100%;border-radius:30px;overflow:hidden;background:linear-gradient(180deg,#fff,#f7fbff);box-shadow:0 24px 60px rgba(12,23,41,.08)}
.page-freya #industry .ind-agents{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.page-freya #industry .ia{border-radius:16px;background:rgba(255,255,255,.78);border:1px solid rgba(12,23,41,.07)}
.page-freya #industry .iv-body{display:flex;flex-direction:column;gap:12px;flex:1}
.page-freya #industry .iv-fill{display:grid;grid-template-columns:1.08fr .92fr;gap:12px;flex:1}
.page-freya #industry .iv-flow{display:flex;flex-direction:column;gap:9px;padding:14px;border-radius:16px;background:rgba(255,255,255,.75);border:1px solid rgba(12,23,41,.06)}
.page-freya #industry .iv-flow-h{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px}
.page-freya #industry .iv-flow-t{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--ink4)}
.page-freya #industry .iv-flow-chip{font-family:"DM Mono",monospace;font-size:8px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:999px;padding:6px 8px}
.page-freya #industry .iv-step{position:relative;padding:10px 11px 10px 28px;border-radius:12px;background:var(--bg3);border:1px solid var(--bdr2);font-size:11.5px;font-weight:600;color:var(--ink2);line-height:1.45}
.page-freya #industry .iv-step::before{content:"";position:absolute;left:11px;top:15px;width:8px;height:8px;border-radius:50%;background:currentColor;opacity:.9}
.page-freya #industry .iv-step strong{display:block;font-family:"DM Mono",monospace;font-size:8px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;opacity:.62;margin-bottom:4px}
.page-freya #industry .iv-side{display:flex;flex-direction:column;gap:12px}
.page-freya #industry .iv-panel{padding:14px;border-radius:16px;background:rgba(255,255,255,.78);border:1px solid rgba(12,23,41,.06)}
.page-freya #industry .iv-panel-h{font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--ink4);margin-bottom:10px}
.page-freya #industry .iv-mini-list{display:flex;flex-direction:column;gap:8px}
.page-freya #industry .iv-mini-item{display:flex;align-items:flex-start;gap:8px;padding:9px 10px;border-radius:12px;background:var(--bg3);border:1px solid var(--bdr2);font-size:11.5px;color:var(--ink2);line-height:1.5}
.page-freya #industry .iv-mini-dot{width:8px;height:8px;border-radius:50%;margin-top:5px;flex-shrink:0}
.page-freya #industry .iv-kpis{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.page-freya #industry .iv-kpi{padding:10px 11px;border-radius:12px;background:var(--bg3);border:1px solid var(--bdr2)}
.page-freya #industry .iv-kpi strong{display:block;font-family:"Outfit",sans-serif;font-size:19px;font-weight:900;line-height:1.05;margin-bottom:3px}
.page-freya #industry .iv-kpi span{display:block;font-family:"DM Mono",monospace;font-size:8px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;color:var(--ink4)}
.page-freya #workflow-simulation .sim-wrap{position:relative;padding:30px;border-radius:34px;background:linear-gradient(145deg,#081426,#10213B 52%,#0B1730 100%);border:1px solid rgba(56,189,248,.14);box-shadow:0 30px 100px rgba(12,23,41,.18);overflow:hidden}
.page-freya #workflow-simulation .sim-wrap::before{content:"";position:absolute;inset:0;background:
radial-gradient(circle at top right,rgba(56,189,248,.12),transparent 28%),
radial-gradient(circle at bottom left,rgba(14,165,233,.08),transparent 24%);pointer-events:none}
.page-freya #workflow-simulation .sim-head{position:relative;z-index:1;border-bottom-color:rgba(255,255,255,.08);padding:0 0 24px}
.page-freya #workflow-simulation .sim-head h3{color:#F5F9FF}
.page-freya #workflow-simulation .sim-head p,.page-freya #workflow-simulation .sim-tl{color:rgba(237,242,255,.74)}
.page-freya #workflow-simulation .sim-toggle{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.08)}
.page-freya #workflow-simulation .stt{color:rgba(237,242,255,.62)}
.page-freya #workflow-simulation .stt.on{background:rgba(255,255,255,.14);box-shadow:none}
.page-freya #workflow-simulation .stt.m.on{color:#FCA5A5}
.page-freya #workflow-simulation .stt.f.on{color:#7DD3FC}
.page-freya #workflow-simulation .sim-hud{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:0 0 18px}
.page-freya #workflow-simulation .sim-hud-card{position:relative;padding:14px 15px 15px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);overflow:hidden}
.page-freya #workflow-simulation .sim-hud-card::after{content:"";position:absolute;top:0;bottom:0;width:36%;background:linear-gradient(90deg,transparent,rgba(125,211,252,.1),transparent);animation:rowScan 6.2s linear infinite}
.page-freya #workflow-simulation .sim-hud-card:nth-child(2)::after{animation-delay:1.1s}
.page-freya #workflow-simulation .sim-hud-card:nth-child(3)::after{animation-delay:2.2s}
.page-freya #workflow-simulation .sim-hud-label{display:block;font-family:"DM Mono",monospace;font-size:8.5px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:rgba(186,230,253,.74);margin-bottom:8px;position:relative;z-index:1}
.page-freya #workflow-simulation .sim-hud-value{display:flex;align-items:center;min-height:44px;font-family:"Outfit",sans-serif;font-size:17px;font-weight:800;line-height:1.25;color:#F5F9FF;position:relative;z-index:1}
.page-freya #workflow-simulation .sim-body{display:grid;gap:14px}
.page-freya #workflow-simulation .sim-ph{color:#67E8F9;opacity:.95}
.page-freya #workflow-simulation .sim-row{position:relative;padding:20px;border-radius:24px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);grid-template-columns:minmax(0,1fr) 60px minmax(0,1fr);overflow:hidden}
.page-freya #workflow-simulation .sim-row::before{content:"";position:absolute;left:26px;right:26px;top:0;height:1px;background:linear-gradient(90deg,rgba(56,189,248,0),rgba(56,189,248,.24),rgba(56,189,248,0))}
.page-freya #workflow-simulation .sim-row::after{content:"";position:absolute;top:0;bottom:0;width:24%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);animation:rowScan 8s linear infinite;pointer-events:none}
.page-freya #workflow-simulation .sim-m{background:linear-gradient(180deg,rgba(127,29,29,.28),rgba(69,10,10,.18));border:1px solid rgba(248,113,113,.18)}
.page-freya #workflow-simulation .sim-f{background:linear-gradient(180deg,rgba(8,47,73,.42),rgba(12,74,110,.2));border:1px solid rgba(56,189,248,.18)}
.page-freya #workflow-simulation .sim-vs{background:rgba(56,189,248,.12);color:#7DD3FC;border-color:rgba(255,255,255,.06)}
.page-freya #workflow-simulation .sim-lbl{opacity:.96}
.page-freya #workflow-simulation .sim-title{color:#F5F9FF}
.page-freya #workflow-simulation .sim-time.r{color:#FCA5A5}
.page-freya #workflow-simulation .sim-time.g{color:#86EFAC}
.page-freya #workflow-simulation .sim-foot{position:relative;z-index:1;padding:18px 0 0;border-top-color:rgba(255,255,255,.08);background:transparent}
.page-freya #workflow-simulation .sim-tv{color:#F5F9FF}
.page-freya #workflow-simulation .btn-more{background:rgba(56,189,248,.1);border-color:rgba(56,189,248,.22);color:#BAE6FD}
.page-freya.ct-before #workflow-simulation .sim-f{opacity:.58;filter:none}
.page-freya.ct-after #workflow-simulation .sim-m{opacity:.58;filter:none}
.page-freya .freya-trust .trust-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;align-items:stretch}
.page-freya .freya-trust .tg{display:flex;flex-direction:column;height:100%;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(244,242,237,.92));border:1px solid rgba(12,23,41,.08);box-shadow:0 18px 40px rgba(12,23,41,.06)}
@media(max-width:980px){
  .page-freya .hero-inner{grid-template-columns:1fr;max-width:760px}
  .page-freya .goddess-stage,.page-freya .freya-sanctum{width:100%}
  .page-freya #capabilities .cap-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .page-freya .oracle-grid,
  .page-freya #workflow-simulation .sim-hud,
  .page-freya #industry .iv-fill{grid-template-columns:1fr}
  .page-freya .freya-trust .trust-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .cap-intro{gap:12px;margin-bottom:34px}
  .cap-coin-wrap{width:min(280px,72vw)}
  .cap-title-lockup .title-line{white-space:normal}
  .page-freya #capabilities .cap-grid,
  .page-freya #industry .ind-agents,
  .page-freya .freya-trust .trust-grid{grid-template-columns:1fr}
  .page-freya .sanctum-top{flex-direction:column}
  .page-freya .sanctum-line{grid-template-columns:1fr}
  .page-freya .sanctum-stream{gap:8px}
  .page-freya .sl-tag{justify-self:start}
  .page-freya .sanctum-grid{grid-template-columns:1fr 1fr}
  .page-freya .oracle-grid{grid-template-columns:1fr}
  .page-freya #workflow-simulation .sim-row{grid-template-columns:1fr}
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
<body class="ct-before page-freya">

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
<div class="mobile-nav" id="mobileNav">
  <button class="mob-nl" onclick="location.href='/'">← Back to Platform</button>
  <button class="mob-nl" onclick="location.href='/business'">For Business</button>
  <button class="mob-nl" onclick="location.href='/ngo'">For NGO</button>
  <button class="mob-nl" onclick="location.href='/government'">For Government</button>
</div>

<!-- HERO DARK -->
<div class="hero-dark">
  <div class="hd-bg"></div><div class="hd-dots"></div>
  <div class="hero-inner">
    <div>
      <div class="hero-kicker">Your Autonomous AI Agent <span class="kd"></span></div>
      <h1 class="hero-h1"><span class="ac">Freya.</span><br><span class="dm">She doesn't</span><br><span class="dm">wait to be</span><br><span class="dm">asked.</span></h1>
      <p class="hero-sub">Not a chatbot. Not a copilot. An <strong>autonomous operating agent</strong> for your organisation.</p>
      <p class="hero-body">Freya monitors your operations 24/7, surfaces problems before you notice them, executes complex workflows end-to-end, and remembers every decision your organisation has ever made — powered by up to 13 specialist agents, all orchestrated through a single intelligence layer.</p>
      <div class="hero-btns">
        <button class="btn-hero-p" onclick="location.href='#capabilities'">See Her Capabilities <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button>
        <button class="btn-hero-g" onclick="location.href='#industry'">See Freya in your sector</button>
      </div>
      <div class="hero-tags">
        <span class="h-tag"><span class="ai-svg-icon-slot" data-ai-icon="brain"></span> Persistent Memory</span><span class="h-tag"><span class="ai-svg-icon-slot" data-ai-icon="eye"></span> Proactive Alerting</span>
        <span class="h-tag"><span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Multi-Agent</span><span class="h-tag"><span class="ai-svg-icon-slot" data-ai-icon="signal"></span> Live Data</span>
        <span class="h-tag"><span class="ai-svg-icon-slot" data-ai-icon="link"></span> Transparent Reasoning</span><span class="h-tag"><span class="ai-svg-icon-slot" data-ai-icon="handshake"></span> Human-in-Loop</span>
        <span class="h-tag"> Multi-Sector</span>
      </div>
    </div>
    <div class="goddess-stage">
      <div class="freya-sanctum">
        <div class="sanctum-top">
          <div>
            <div class="sanctum-kicker">Freya Sanctum · Live Orchestration</div>
            <div class="sanctum-title">A sovereign intelligence layer, working without pause.</div>
          </div>
          <div class="sanctum-status"><span></span>ACTIVE</div>
        </div>
        <div class="sanctum-stream">
          <div class="sanctum-line">
            <span class="sl-dot"></span>
            <span class="sl-label">Memory Sync</span>
            <span class="sl-text" id="sanctumTickA">Updating institutional memory from approved decisions...</span>
            <span class="sl-tag">Live</span>
          </div>
          <div class="sanctum-line">
            <span class="sl-dot"></span>
            <span class="sl-label">Reasoning</span>
            <span class="sl-text" id="sanctumTickB">Tracing source confidence across active workflows...</span>
            <span class="sl-tag">Active</span>
          </div>
          <div class="sanctum-line">
            <span class="sl-dot"></span>
            <span class="sl-label">Agents</span>
            <span class="sl-text" id="sanctumTickC">Coordinating specialist agents across business, NGO, and government operations...</span>
            <span class="sl-tag">24/7</span>
          </div>
        </div>
        <div class="sanctum-grid">
          <div class="sanctum-metric"><strong id="sanctumMetric1">289</strong><span>Items processed</span></div>
          <div class="sanctum-metric"><strong id="sanctumMetric2">13</strong><span>Specialist agents</span></div>
          <div class="sanctum-metric"><strong id="sanctumMetric3">24/7</strong><span>Continuous monitoring</span></div>
        </div>
        <div class="oracle-matrix">
          <div class="oracle-head">
            <div class="oracle-title">Freya Intelligence Lattice</div>
            <div class="oracle-mode">GODDESS MODE</div>
          </div>
          <div class="oracle-grid">
            <div class="oracle-col">
              <div class="oracle-node"><small>Signal Intake</small><strong id="oracleA1">24 live feeds</strong><span>Cross-system context enters one operating memory.</span></div>
              <div class="oracle-node"><small>Detection</small><strong id="oracleA2">3 anomaly clusters</strong><span>Deviation patterns surfaced before manual review catches them.</span></div>
            </div>
            <div class="oracle-col">
              <div class="oracle-node"><small>Reasoning Core</small><strong id="oracleB1">92% confidence path</strong><span>Evidence, prior decisions, and active constraints fused into one action graph.</span></div>
              <div class="oracle-node"><small>Agent Mesh</small><strong id="oracleB2">13 experts aligned</strong><span>Specialist agents execute in parallel with shared context and no handoff loss.</span></div>
            </div>
            <div class="oracle-col">
              <div class="oracle-node"><small>Approval Corridor</small><strong id="oracleC1">2 actions awaiting sign-off</strong><span>High-stakes moments stay with your people. Freya prepares, humans decide.</span></div>
              <div class="oracle-node"><small>Outcome Loop</small><strong id="oracleC2">Memory compounding</strong><span>Every approval sharpens institutional memory for the next decision.</span></div>
            </div>
          </div>
        </div>
        <div class="sanctum-note"><b>Signal detected</b> Freya is preserving context, surfacing risk early, and preparing human-ready action paths in real time.</div>
      </div>
    </div>
  </div>
</div>

<!-- CAPABILITIES -->
<section id="capabilities" class="freya-capabilities" style="background:#FFFFFF">
  <div class="page">
    <div class="cap-intro">
      <div class="cap-coin-wrap reveal">
        <video class="cap-coin-video" id="freyaCapabilitiesCoin" autoplay muted loop playsinline preload="auto" disablepictureinpicture>
          <source src="/assets/media/freya-coin-spin.mp4" type="video/mp4">
        </video>
      </div>
    <div class="eyebrow reveal" style="justify-content:center;display:flex">Core Capabilities</div>
    <h2 class="h2 reveal cap-title-lockup">
      <span class="title-line">Six ways Freya works differently</span>
      <span class="title-line"><em>from any AI you've used before.</em></span>
    </h2>
    <p class="sp reveal" style="text-align:center;max-width:620px;margin:0 auto 48px">Freya is not a feature. She is an operating layer — built to bridge the gap between people, systems, and decisions in any complex organisation.</p>
    </div>
    <div class="cap-grid">
      <div class="cap reveal" style="--ac:#0284C7">
        <span class="cap-icon"><span class="ai-svg-icon-slot" data-ai-icon="brain"></span></span>
        <div class="cap-num">01 · Always On</div>
        <div class="cap-title">Persistent Memory</div>
        <p class="cap-body">Freya remembers every decision, preference, and context from every session — permanently. Brief her once. She retains it indefinitely, building an institutional memory that outlasts any individual staff member and strengthens over time.</p>
        <div class="cap-badge" style="color:#0284C7;background:rgba(2,132,199,.07);border:1px solid rgba(2,132,199,.18)"><span class="cb-dot"></span>Compounds with every session</div>
      </div>
      <div class="cap reveal d1" style="--ac:#059669">
        <span class="cap-icon"><span class="ai-svg-icon-slot" data-ai-icon="eye"></span></span>
        <div class="cap-num">02 · Always Watching</div>
        <div class="cap-title">Proactive Alerting</div>
        <p class="cap-body">Freya doesn't wait to be asked. She monitors your live data continuously and surfaces problems before they escalate — with context, likely cause, and a draft response prepared for your review. Not just a number. An insight with a clear path to action.</p>
        <div class="cap-badge" style="color:#059669;background:rgba(5,150,105,.07);border:1px solid rgba(5,150,105,.18)"><span class="cb-dot"></span>Real-time, every data source</div>
      </div>
      <div class="cap reveal d2" style="--ac:#D97706">
        <span class="cap-icon"><span class="ai-svg-icon-slot" data-ai-icon="link"></span></span>
        <div class="cap-num">03 · Always Transparent</div>
        <div class="cap-title">Transparent Reasoning</div>
        <p class="cap-body">Every Freya output shows its full reasoning chain, data sources, confidence level, and timestamp. When she makes a recommendation, you see exactly why — with citations traceable to original data. Full audit trail on every single action taken by any agent.</p>
        <div class="cap-badge" style="color:#D97706;background:rgba(217,119,6,.07);border:1px solid rgba(217,119,6,.18)"><span class="cb-dot" style="background:var(--amber)"></span>Every action fully logged</div>
      </div>
      <div class="cap reveal" style="--ac:#7C3AED">
        <span class="cap-icon"><span class="ai-svg-icon-slot" data-ai-icon="handshake"></span></span>
        <div class="cap-num">04 · Always Controlled</div>
        <div class="cap-title">Human-in-the-Loop</div>
        <p class="cap-body">Freya executes within your configured boundaries. High-stakes actions require explicit human approval. Low-risk tasks run autonomously. You decide exactly what Freya can do without approval — and that boundary scales with your confidence over time. AI prepares. Humans decide and are accountable.</p>
        <div class="cap-badge" style="color:#7C3AED;background:rgba(124,58,237,.07);border:1px solid rgba(124,58,237,.18)"><span class="cb-dot" style="background:#7C3AED"></span>Configurable per action type</div>
      </div>
      <div class="cap reveal d1" style="--ac:#0284C7">
        <span class="cap-icon"><span class="ai-svg-icon-slot" data-ai-icon="bolt"></span></span>
        <div class="cap-num">05 · Always Coordinated</div>
        <div class="cap-title">Multi-Agent Orchestration</div>
        <p class="cap-body">Freya coordinates up to 13 specialist agents simultaneously — each expert in their specific domain, all sharing the same context through a central intelligence layer. No information loss at handoffs. No coordination overhead. A complete complex workflow from a single instruction to Freya.</p>
        <div class="cap-badge" style="color:#0284C7;background:rgba(2,132,199,.07);border:1px solid rgba(2,132,199,.18)"><span class="cb-dot"></span>13 agents, zero friction</div>
      </div>
      <div class="cap reveal d2" style="--ac:#059669">
        <span class="cap-icon"><span class="ai-svg-icon-slot" data-ai-icon="chart"></span></span>
        <div class="cap-num">06 · Always Improving</div>
        <div class="cap-title">Continuous Learning</div>
        <p class="cap-body">Every edit, approval, and override teaches Freya your preferences. Every outcome improves future recommendations. Your Antarious deployment gets more accurate, more tailored, and more powerful every single day — compounding over time. The longer you use it, the better it becomes for your specific organisation.</p>
        <div class="cap-badge" style="color:#059669;background:rgba(5,150,105,.07);border:1px solid rgba(5,150,105,.18)"><span class="cb-dot"></span>Gets smarter with use</div>
      </div>
    </div>
  </div>
</section>

<!-- STRIP -->
<div class="trust-strip"><div class="scroll-row"><div class="scroll-inner">
  <span class="slogo">Salesforce</span><span class="slogo">HubSpot</span><span class="slogo">Meta Ads</span><span class="slogo">Google Workspace</span><span class="slogo">World Bank Systems</span><span class="slogo">ODK Collect</span><span class="slogo">DHIS2</span><span class="slogo">Power BI</span><span class="slogo">SAP</span><span class="slogo">Apollo.io</span><span class="slogo">Slack</span><span class="slogo">KoBoToolbox</span><span class="slogo">ServiceNow</span><span class="slogo">LinkedIn</span><span class="slogo">GA4</span><span class="slogo">Snowflake</span>
  <span class="slogo">Salesforce</span><span class="slogo">HubSpot</span><span class="slogo">Meta Ads</span><span class="slogo">Google Workspace</span><span class="slogo">World Bank Systems</span><span class="slogo">ODK Collect</span><span class="slogo">DHIS2</span><span class="slogo">Power BI</span><span class="slogo">SAP</span><span class="slogo">Apollo.io</span><span class="slogo">Slack</span><span class="slogo">KoBoToolbox</span><span class="slogo">ServiceNow</span><span class="slogo">LinkedIn</span><span class="slogo">GA4</span><span class="slogo">Snowflake</span>
</div></div></div>

<div class="divider"></div>

<!-- INDUSTRY — 3 CLEAR TABS -->
<section id="industry" class="freya-industry">
  <div class="page">
    <div class="eyebrow reveal">Freya Across All Sectors</div>
    <h2 class="h2 reveal">One agent. <em>Three industries.</em><br>Fully configured for each.</h2>
    <p class="sp w reveal">Freya is purpose-built for your sector's specific agents, workflows, data sources, and compliance requirements — not a generic tool adapted for your context. Same intelligence core. Entirely different domain expertise, agent configurations, and operational reality.</p>

    <div class="ind-tabs-wrap reveal">
      <div class="ind-tabs">
        <button class="ind-tab on biz" id="tabBiz" onclick="showInd('biz',this,'biz')">For Business</button>
        <button class="ind-tab" id="tabNgo" onclick="showInd('ngo',this,'ngo')">For NGO</button>
        <button class="ind-tab" id="tabGov" onclick="showInd('gov',this,'gov')">For Government</button>
      </div>
    </div>

    <!-- FOR BUSINESS -->
    <div id="ind-biz" class="ind-panel on">
      <div class="ind-grid">
        <div>
          <h3 class="ind-h3 biz-em">Freya for GTM teams.<br>13 agents. <em>One platform.</em></h3>
          <p class="ind-p">For business and GTM teams, Freya coordinates 13 specialist agents — running strategy, content, lead generation, outreach, paid media, analytics, and forecasting simultaneously. She monitors campaign performance, alerts on anomalies, and executes end-to-end workflows while your team focuses on strategy and relationships.</p>
          <div class="ind-stats">
            <div><div class="ind-sv" style="color:var(--td)">23→2</div><div class="ind-sl">Days to launch</div></div>
            <div class="ind-sdiv"></div>
            <div><div class="ind-sv" style="color:var(--td)">1,000+</div><div class="ind-sl">Touches/day</div></div>
            <div class="ind-sdiv"></div>
            <div><div class="ind-sv" style="color:var(--td)">3×</div><div class="ind-sl">Pipeline growth</div></div>
          </div>
          <div class="ind-agents">
            <div class="ia" style="--h:var(--tbg)"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="compass"></span></span><div><div class="ia-nm">GTM Strategist</div><div class="ia-ds">ICP, channel mix, budget allocation, full quarterly GTM plans</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="search"></span></span><div><div class="ia-nm">Competitor Intel</div><div class="ia-ds">50+ live signals — ad libraries, pricing, LinkedIn, news — always fresh</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="target"></span></span><div><div class="ia-nm">Lead Prospecting</div><div class="ia-ds">ICP → enriched, verified, scored prospects in under 5 minutes</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="pen"></span></span><div><div class="ia-nm">Copywriter + Brand Guardian</div><div class="ia-ds">All campaign copy — generated, QA'd, brand-safe, immediately shipable</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="mail"></span></span><div><div class="ia-nm">SDR Outreach Agent</div><div class="ia-ds">1,000+ personalised touches/day across email &amp; LinkedIn — 24/7</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="chart"></span></span><div><div class="ia-nm">Analytics + Forecasting</div><div class="ia-ds">5-model attribution, anomaly detection, Monday 7am brief, 90-day forecasts</div></div></div>
          </div>
          <button class="ind-cta-btn" style="background:var(--td)" onclick="location.href='/business'">Explore Business Platform <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button>
        </div>
        <div class="ind-visual">
          <div class="iv-bar"><div class="iv-dots"><div class="iv-dot" style="background:#EF4444"></div><div class="iv-dot" style="background:#F59E0B"></div><div class="iv-dot" style="background:#10B981"></div></div><div class="iv-url">antarious.app / gtm-ops</div><div class="iv-live"><span class="iv-ldot"></span>LIVE</div></div>
          <div class="iv-prog"><div class="iv-pf" style="background:linear-gradient(90deg,var(--tl),var(--td))"></div></div>
          <div class="iv-body">
            <div class="f-tick" style="background:var(--tbg);border-color:var(--tbdr)"><div class="f-tick-orb" style="background:conic-gradient(from var(--ca),#0369A1,#38BDF8,#0369A1)">F</div><div class="f-tick-txt" style="color:var(--td)" id="bizTick">Freya: generating 6 email sequence variants for Q3 launch…</div><div class="f-tick-dot"></div></div>
            <div class="iv-metric-grid">
              <div class="iv-m"><div class="iv-m-lbl">PIPELINE THIS MONTH</div><div class="iv-m-val" style="color:var(--td)">$2.4M</div><div class="iv-m-sub" style="color:var(--green)">↑ 34% vs last month</div></div>
              <div class="iv-m"><div class="iv-m-lbl">MQL RESPONSE</div><div class="iv-m-val" style="color:var(--td)">&lt;30m</div><div class="iv-m-sub" style="color:var(--ink3)">Was 27 hrs average</div></div>
            </div>
            <div class="iv-alert" style="background:var(--abg);border:1px solid rgba(217,119,6,.2)">
              <div style="font-size:13px"><span class="ai-svg-icon-slot" data-ai-icon="alert"></span></div>
              <div><div class="iv-a-lbl" style="color:var(--amber)">FREYA ALERT</div><div class="iv-a-txt" id="bizAlert">LinkedIn CTR dropped 28%. Creative fatigue detected. 4 variants generated — pending your approval.</div></div>
            </div>
            <div class="iv-tag" id="bizTag" style="font-family:'DM Mono',monospace;font-size:9px;font-weight:700;letter-spacing:1px;color:var(--td);background:var(--tbg);border:1px solid var(--tbdr)">13 AGENTS ACTIVE · 1,247 TOUCHES SENT TODAY · 4 MEETINGS BOOKED</div>
            <div class="iv-fill">
              <div class="iv-flow">
                <div class="iv-flow-h"><div class="iv-flow-t">Live Execution Flow</div><div class="iv-flow-chip" style="color:var(--td);background:var(--tbg);border:1px solid var(--tbdr)">GTM</div></div>
                <div class="iv-step" style="color:#0284C7"><strong>01 · Strategy</strong>ICP and launch plan assembled from CRM, intent, and campaign context.</div>
                <div class="iv-step" style="color:#0284C7"><strong>02 · Creative</strong>Fresh copy and landing variants generated, checked, and queued.</div>
                <div class="iv-step" style="color:#0284C7"><strong>03 · Outreach</strong>Lead list enriched, scored, and distributed across active channels.</div>
                <div class="iv-step" style="color:#0284C7"><strong>04 · Reporting</strong>Performance summary updated for leadership with next actions prepared.</div>
              </div>
              <div class="iv-side">
                <div class="iv-panel">
                  <div class="iv-panel-h">Approval Queue</div>
                  <div class="iv-mini-list">
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#0284C7"></span><span>Creative set B ready for final sign-off</span></div>
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#F59E0B"></span><span>Budget shift recommendation generated after CTR decline</span></div>
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#10B981"></span><span>Executive brief packaged for Monday revenue review</span></div>
                  </div>
                </div>
                <div class="iv-panel">
                  <div class="iv-panel-h">Operating Tempo</div>
                  <div class="iv-kpis">
                    <div class="iv-kpi"><strong id="bizKpiA" style="color:var(--td)">06</strong><span>Sequences live</span></div>
                    <div class="iv-kpi"><strong id="bizKpiB" style="color:var(--green)">94%</strong><span>Data freshness</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FOR NGO -->
    <div id="ind-ngo" class="ind-panel">
      <div class="ind-grid">
        <div>
          <h3 class="ind-h3 ngo-em">Freya for development teams.<br>10 agents. <em>Zero admin burden.</em></h3>
          <p class="ind-p">For NGO and development organisations, Freya coordinates 10 specialist programme agents — automating M&amp;E reporting, partner data aggregation, beneficiary tracking, compliance monitoring, and donor communications. Your programme officers recover 60% of their time for field work.</p>
          <div class="ind-stats">
            <div><div class="ind-sv" style="color:#059669">65%</div><div class="ind-sl">Reporting time saved</div></div>
            <div class="ind-sdiv"></div>
            <div><div class="ind-sv" style="color:#059669">4 min</div><div class="ind-sl">Donor report</div></div>
            <div class="ind-sdiv"></div>
            <div><div class="ind-sv" style="color:#059669">Week 3</div><div class="ind-sl">Anomaly detection</div></div>
          </div>
          <div class="ind-agents">
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="brain"></span></span><div><div class="ia-nm">Programme Intelligence</div><div class="ia-ds">Natural language queries across all data — any question, 8 seconds</div></div></div>
            <div class="ia"><span class="ia-ic"></span><div><div class="ia-nm">M&amp;E Report Generator</div><div class="ia-ds">Donor-format reports drafted in 4 minutes from live MIS data</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="signal"></span></span><div><div class="ia-nm">Partner Performance Monitor</div><div class="ia-ds">Early warnings in week 3 — corrective action 7 weeks earlier</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="folder"></span></span><div><div class="ia-nm">Field Data Analyst</div><div class="ia-ds">All partner formats auto-ingested, validated, consolidated — zero manual work</div></div></div>
            <div class="ia"><span class="ia-ic"></span><div><div class="ia-nm">Beneficiary Analytics</div><div class="ia-ds">Journey tracking, gender disaggregation, dropout analysis in real time</div></div></div>
            <div class="ia"><span class="ia-ic"></span><div><div class="ia-nm">Psychometric Profiling</div><div class="ia-ds">Credit assessment across 7 dimensions — no formal credit history required</div></div></div>
          </div>
          <button class="ind-cta-btn" style="background:#059669;box-shadow:0 4px 18px rgba(5,150,105,.28)" onclick="location.href='/ngo'">Explore NGO Platform <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button>
        </div>
        <div class="ind-visual">
          <div class="iv-bar"><div class="iv-dots"><div class="iv-dot" style="background:#EF4444"></div><div class="iv-dot" style="background:#F59E0B"></div><div class="iv-dot" style="background:#10B981"></div></div><div class="iv-url">antarious.app / programme-ops</div><div class="iv-live"><span class="iv-ldot"></span>LIVE</div></div>
          <div class="iv-prog"><div class="iv-pf" style="background:linear-gradient(90deg,#34D399,#059669)"></div></div>
          <div class="iv-body">
            <div class="f-tick" style="background:var(--gbg);border-color:var(--gbdr)"><div class="f-tick-orb" style="background:conic-gradient(from var(--ca),#047857,#34D399,#047857)">F</div><div class="f-tick-txt" style="color:#059669" id="ngoTick">Freya: drafting Q2 donor report from live field data…</div><div class="f-tick-dot"></div></div>
            <div class="iv-metric-grid">
              <div class="iv-m"><div class="iv-m-lbl">BENEFICIARIES TRACKED</div><div class="iv-m-val" style="color:#059669">20,482</div><div class="iv-m-sub" style="color:var(--ink3)">Across 280 partner orgs</div></div>
              <div class="iv-m"><div class="iv-m-lbl">REPORT TIME</div><div class="iv-m-val" style="color:#059669">4 min</div><div class="iv-m-sub" style="color:var(--ink3)">Was 2–3 officer-days</div></div>
            </div>
            <div class="iv-alert" style="background:var(--abg);border:1px solid rgba(217,119,6,.2)">
              <div style="font-size:13px"><span class="ai-svg-icon-slot" data-ai-icon="alert"></span></div>
              <div><div class="iv-a-lbl" style="color:var(--amber)">FREYA ALERT</div><div class="iv-a-txt" id="ngoAlert">3 partners are 18%+ behind Q2 targets — corrective action memos drafted, pending your approval.</div></div>
            </div>
            <div class="iv-tag" id="ngoTag" style="font-family:'DM Mono',monospace;font-size:9px;font-weight:700;letter-spacing:1px;color:#059669;background:var(--gbg);border:1px solid var(--gbdr)">10 AGENTS ACTIVE · 280 PARTNERS MONITORED · 0 MANUAL AGGREGATION</div>
            <div class="iv-fill">
              <div class="iv-flow">
                <div class="iv-flow-h"><div class="iv-flow-t">Live Programme Flow</div><div class="iv-flow-chip" style="color:#059669;background:var(--gbg);border:1px solid var(--gbdr)">NGO</div></div>
                <div class="iv-step" style="color:#059669"><strong>01 · Intake</strong>Partner submissions from forms, sheets, and attachments consolidated automatically.</div>
                <div class="iv-step" style="color:#059669"><strong>02 · Validation</strong>Indicator mismatches and missing fields flagged before reports are drafted.</div>
                <div class="iv-step" style="color:#059669"><strong>03 · Reporting</strong>Donor narrative, tables, and exceptions assembled from approved data.</div>
                <div class="iv-step" style="color:#059669"><strong>04 · Intervention</strong>Corrective action notes prepared for underperforming partners and programmes.</div>
              </div>
              <div class="iv-side">
                <div class="iv-panel">
                  <div class="iv-panel-h">Field Signals</div>
                  <div class="iv-mini-list">
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#059669"></span><span>18 new field submissions validated this hour</span></div>
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#F59E0B"></span><span>Region 3 dropout pattern surfaced for programme review</span></div>
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#10B981"></span><span>Quarterly donor brief assembled and ready for leadership review</span></div>
                  </div>
                </div>
                <div class="iv-panel">
                  <div class="iv-panel-h">Programme Tempo</div>
                  <div class="iv-kpis">
                    <div class="iv-kpi"><strong id="ngoKpiA" style="color:#059669">280</strong><span>Partners live</span></div>
                    <div class="iv-kpi"><strong id="ngoKpiB" style="color:var(--green)">07</strong><span>Risks surfaced</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FOR GOVERNMENT -->
    <div id="ind-gov" class="ind-panel">
      <div class="ind-grid">
        <div>
          <h3 class="ind-h3 gov-em">Freya for government departments.<br>8 agents. <em>Real-time intelligence.</em></h3>
          <p class="ind-p">For government departments, Freya coordinates 8 specialist agents — monitoring service delivery across all units, tracking compliance, generating ministerial briefs, and surfacing critical decisions to the right people at the right time. Democratic accountability preserved at every step.</p>
          <div class="ind-stats">
            <div><div class="ind-sv" style="color:#660033">80%</div><div class="ind-sl">Faster briefs</div></div>
            <div class="ind-sdiv"></div>
            <div><div class="ind-sv" style="color:#660033">Real-time</div><div class="ind-sl">Delivery intel</div></div>
            <div class="ind-sdiv"></div>
            <div><div class="ind-sv" style="color:#660033">∞</div><div class="ind-sl">Institutional memory</div></div>
          </div>
          <div class="ind-agents">
            <div class="ia"><span class="ia-ic">️</span><div><div class="ia-nm">Policy Intelligence Agent</div><div class="ia-ds">Cross-department synthesis — any question, cited answer in 8 seconds</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="signal"></span></span><div><div class="ia-nm">Service Delivery Monitor</div><div class="ia-ds">Real-time KPIs across all departments — early warning alerts</div></div></div>
            <div class="ia"><span class="ia-ic"></span><div><div class="ia-nm">Budget &amp; Finance Tracker</div><div class="ia-ds">Utilisation vs. target — anomaly detection, reallocation recommendations</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="shield"></span></span><div><div class="ia-nm">Compliance &amp; Audit Sentinel</div><div class="ia-ds">All obligations tracked — audit portfolios auto-compiled before reviews</div></div></div>
            <div class="ia"><span class="ia-ic"></span><div><div class="ia-nm">Document &amp; Brief Generator</div><div class="ia-ds">Ministerial briefs, Cabinet papers, parliamentary updates — data-sourced</div></div></div>
            <div class="ia"><span class="ia-ic"><span class="ai-svg-icon-slot" data-ai-icon="spark"></span></span><div><div class="ia-nm">Strategic Forecasting</div><div class="ia-ds">3-scenario outcome modelling — updated weekly from live operational data</div></div></div>
          </div>
          <button class="ind-cta-btn" style="background:#660033;box-shadow:0 4px 18px rgba(102,0,51,.28)" onclick="location.href='/government'">Explore Government Platform <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button>
        </div>
        <div class="ind-visual">
          <div class="iv-bar"><div class="iv-dots"><div class="iv-dot" style="background:#EF4444"></div><div class="iv-dot" style="background:#F59E0B"></div><div class="iv-dot" style="background:#10B981"></div></div><div class="iv-url">antarious.app / policy-ops</div><div class="iv-live"><span class="iv-ldot"></span>LIVE</div></div>
          <div class="iv-prog"><div class="iv-pf" style="background:linear-gradient(90deg,#B04A74,#660033)"></div></div>
          <div class="iv-body">
            <div class="f-tick" style="background:rgba(102,0,51,.07);border-color:rgba(102,0,51,.2)"><div class="f-tick-orb" style="background:conic-gradient(from var(--ca),#4D0028,#B04A74,#4D0028)">F</div><div class="f-tick-txt" style="color:#660033" id="govTick">Freya: compiling ministerial morning brief across 24 departments…</div><div class="f-tick-dot"></div></div>
            <div class="iv-metric-grid">
              <div class="iv-m"><div class="iv-m-lbl">DEPT KPI COMPLIANCE</div><div class="iv-m-val" style="color:#660033">87%</div><div class="iv-m-sub" style="color:var(--green)">↑ 12pp vs Q1</div></div>
              <div class="iv-m"><div class="iv-m-lbl">OPEN AUDIT FLAGS</div><div class="iv-m-val" style="color:var(--green)">0</div><div class="iv-m-sub" style="color:var(--ink3)">All obligations current</div></div>
            </div>
            <div class="iv-alert" style="background:var(--abg);border:1px solid rgba(217,119,6,.2)">
              <div style="font-size:13px"><span class="ai-svg-icon-slot" data-ai-icon="alert"></span></div>
              <div><div class="iv-a-lbl" style="color:var(--amber)">FREYA ALERT</div><div class="iv-a-txt" id="govAlert">Dept 7 budget 23% behind target — reallocation recommendation ready for your approval.</div></div>
            </div>
            <div class="iv-tag" id="govTag" style="font-family:'DM Mono',monospace;font-size:9px;font-weight:700;letter-spacing:1px;color:#660033;background:rgba(102,0,51,.07);border:1px solid rgba(102,0,51,.2)">8 AGENTS ACTIVE · 24 DEPARTMENTS MONITORED · 100% AUDIT TRAIL</div>
            <div class="iv-fill">
              <div class="iv-flow">
                <div class="iv-flow-h"><div class="iv-flow-t">Live Decision Flow</div><div class="iv-flow-chip" style="color:#660033;background:rgba(102,0,51,.07);border:1px solid rgba(102,0,51,.2)">Government</div></div>
                <div class="iv-step" style="color:#660033"><strong>01 · Intake</strong>Citizen request and departmental context classified into the correct case stream.</div>
                <div class="iv-step" style="color:#660033"><strong>02 · Briefing</strong>Policy context, prior records, and exceptions assembled into one decision view.</div>
                <div class="iv-step" style="color:#660033"><strong>03 · Routing</strong>Approvals escalated only to the officers who need to decide.</div>
                <div class="iv-step" style="color:#660033"><strong>04 · Audit</strong>Evidence retained automatically for compliance, review, and accountability.</div>
              </div>
              <div class="iv-side">
                <div class="iv-panel">
                  <div class="iv-panel-h">Operational Signals</div>
                  <div class="iv-mini-list">
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#660033"></span><span>Ministerial brief updated with cross-department data this morning</span></div>
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#F59E0B"></span><span>Budget variance recommendation waiting for director approval</span></div>
                    <div class="iv-mini-item"><span class="iv-mini-dot" style="background:#10B981"></span><span>Audit evidence chain remains current across all open workflows</span></div>
                  </div>
                </div>
                <div class="iv-panel">
                  <div class="iv-panel-h">Service Tempo</div>
                  <div class="iv-kpis">
                    <div class="iv-kpi"><strong id="govKpiA" style="color:#660033">24</strong><span>Departments live</span></div>
                    <div class="iv-kpi"><strong id="govKpiB" style="color:var(--green)">100%</strong><span>Trail retained</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- SIMULATION -->
<section id="workflow-simulation" class="freya-simulation" style="background:var(--bg2)">
  <div class="page">
    <div class="eyebrow reveal">Sector Workflow Simulation</div>
    <h2 class="h2 reveal">Three industries. Three very different flows.<br><em>One Freya intelligence layer.</em></h2>
    <p class="sp reveal">Switch sectors to see how Freya changes the operating flow for Business, NGO, and Government teams. The workflow, bottlenecks, approvals, and outputs are different in each environment.</p>
    <div class="ind-tabs-wrap reveal" style="justify-content:flex-start;margin-bottom:24px">
      <div class="ind-tabs">
        <button class="sim-sector-tab on biz" onclick="switchSimSector('business',this,'biz')">Business</button>
        <button class="sim-sector-tab" onclick="switchSimSector('ngo',this,'ngo')">NGO</button>
        <button class="sim-sector-tab" onclick="switchSimSector('government',this,'gov')">Government</button>
      </div>
    </div>
    <div class="sim-wrap reveal">
      <div class="sim-head">
        <div><h3 id="simTitle">GTM Campaign Launch — 6-Phase Simulation</h3><p id="simSubtitle">Business workflow shown · Toggle to compare</p></div>
        <div class="sim-toggle">
          <button class="stt m on" onclick="simMode('before',this)">Without Freya</button>
          <button class="stt f" onclick="simMode('after',this)">With Freya</button>
        </div>
      </div>
      <div class="sim-hud">
        <div class="sim-hud-card"><span class="sim-hud-label">Live Telemetry</span><span class="sim-hud-value" id="simHudA">13 specialist agents active</span></div>
        <div class="sim-hud-card"><span class="sim-hud-label">Operational Scope</span><span class="sim-hud-value" id="simHudB">Multi-channel GTM orchestration live</span></div>
        <div class="sim-hud-card"><span class="sim-hud-label">Decision State</span><span class="sim-hud-value" id="simHudC">High-risk actions queued for approval</span></div>
      </div>
      <div class="sim-body" id="simBody"></div>
      <div class="sim-foot">
        <div class="sim-tots">
          <div><div class="sim-tl">Without Freya</div><div class="sim-tv rv" id="simManualTotal">23 days</div></div>
          <div><div class="sim-tl">With Freya</div><div class="sim-tv tv" id="simFreyaTotal">2 days</div></div>
        </div>
        <button class="btn-more" id="simCta" onclick="location.href='/business'">See full Business platform →</button>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- TRUST & TRANSPARENCY -->
<section class="freya-trust">
  <div class="page">
    <div class="eyebrow reveal">Trust &amp; Transparency</div>
    <h2 class="h2 reveal">Built on a foundation of<br><em>accountability, not blind automation.</em></h2>
    <p class="sp w reveal">Every organisation that deploys Freya is trusting it with real decisions, real data, and real consequences. We built transparency, human control, and security into the architecture from the ground up — not as afterthoughts.</p>
    <div class="trust-grid">
      <div class="tg reveal">
        <span class="tg-icon"><span class="ai-svg-icon-slot" data-ai-icon="user"></span></span>
        <div class="tg-title">Human Always in Control</div>
        <p class="tg-body">Every Freya output requires a human review and approval step before any external action is taken. No agent sends, submits, or triggers without a designated officer authorising it. AI prepares. Humans decide. Accountability stays with your team.</p>
      </div>
      <div class="tg reveal d1">
        <span class="tg-icon"></span>
        <div class="tg-title">Full Audit Trail</div>
        <p class="tg-body">Every action taken by every agent is logged with timestamp, data source, reasoning chain, and the human who approved it. Every decision is permanently queryable. Full transparency — not as a feature, but as a default operating principle.</p>
      </div>
      <div class="tg reveal d2">
        <span class="tg-icon"></span>
        <div class="tg-title">Data Sovereignty</div>
        <p class="tg-body">Your data is hosted in a fully isolated, dedicated environment. No data is shared with other organisations. No data is used to train external models. Full data residency documentation provided. SOC 2 Type II certified, GDPR compliant.</p>
      </div>
      <div class="tg reveal d3">
        <span class="tg-icon">️</span>
        <div class="tg-title">Configurable Autonomy</div>
        <p class="tg-body">You configure exactly what Freya can do autonomously — granular per action type, per agent, per role, per user. Start with maximum oversight. Expand Freya's autonomy as your confidence builds. Always fully within your configured boundary.</p>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FAQ -->
<section>
  <div class="page">
    <div class="eyebrow reveal">Freya FAQs</div>
    <h2 class="h2 reveal">What teams ask most about <em>how Freya works.</em></h2>
    <p class="sp reveal">These answers are adapted from the comprehensive FAQ and focus on Freya's day-to-day operation model.</p>
    <div class="reveal" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:26px">
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">What does Freya actually do?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Freya continuously monitors operations, alerts with context, executes multi-step workflows, and maintains institutional memory across decisions and outcomes.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">How does the morning brief work?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">A daily intelligence brief is generated at a configured time, summarising key changes, anomalies, priorities, and recommended actions for leadership.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">Can teams ask Freya questions in natural language?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Yes. Freya answers from connected sources with cited analysis, while respecting each user's permission scope and data access boundaries.</p></div>
      <div style="background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:16px"><div style="font-weight:800;color:var(--ink);margin-bottom:8px">What if a Freya output is incorrect, and does Freya run 24/7?</div><p style="color:var(--ink2);font-size:13.5px;line-height:1.65">Freya runs continuously for monitoring and analysis, while external actions always require human approval. If an output is incorrect, teams can reject, revise, or correct source data before action, preserving full accountability through the approval trail.</p></div>
    </div>
    <div class="reveal" style="margin-top:18px"><a href="/faq/comprehensive" class="btn-more">View full FAQ library →</a></div>
  </div>
</section>

<div class="divider"></div>

<!-- CTA DARK -->
<section id="cta">
  <div class="page">
    <div class="cta-card reveal">
      <div class="cta-g"></div><div class="cta-d"></div>
      <div class="cta-c">
        <div class="cta-ey">Start Today</div>
        <h2 class="cta-h2">Ready to deploy <em>Freya</em><br>in your organisation?</h2>
        <p class="cta-p">Business, NGO, or Government — Freya is configured for your sector and ready to deploy. Tell us your reality. We'll show you the transformation.</p>
        <div class="cta-btns">
          <button class="btn-cta-p" onclick="location.href='/business'">For Business <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button>
          <button class="btn-cta-g" onclick="location.href='/ngo'">For NGO →</button>
          <button class="btn-cta-g" onclick="location.href='/government'">For Government →</button>
        </div>
      </div>
    </div>
  </div>
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
// NAV SCROLL
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

// MOBILE MENU
const mmb=document.getElementById('mmbtn'),mNav=document.getElementById('mobileNav');
if(mmb)mmb.addEventListener('click',()=>mNav.classList.toggle('open'));

// REVEAL
const io=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -32px 0px'});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));

// INDUSTRY TABS — 3 named tabs
function showInd(k,clickedBtn,cls){
  // Hide all panels
  document.querySelectorAll('.ind-panel').forEach(p=>{p.classList.remove('on');p.style.display='none'});
  const p=document.getElementById('ind-'+k);
  if(!p)return;
  p.style.display='block';
  p.style.opacity='0';
  requestAnimationFrame(()=>{p.style.transition='opacity .4s ease';p.style.opacity='1'});
  p.classList.add('on');
  // Reset all tabs
  document.querySelectorAll('.ind-tab').forEach(t=>{t.classList.remove('on','biz','ngo','gov')});
  // Activate clicked
  clickedBtn.classList.add('on',cls);
}
// Init hidden panels
document.querySelectorAll('.ind-panel').forEach(p=>{if(!p.classList.contains('on'))p.style.display='none'});

const sectorFlows={
  business:{
    title:'GTM Campaign Launch — 6-Phase Simulation',
    subtitle:'Business workflow shown · Toggle to compare',
    manualTotal:'23 days',
    freyaTotal:'2 days',
    ctaLabel:'See full Business platform →',
    ctaHref:'/business',
    hud:['13 specialist agents active','Multi-channel GTM orchestration live','High-risk actions queued for approval'],
    phases:[
      {phase:'Phase 01 · ICP & Strategy',manualLabel:'Manual',manualTitle:'Define ICP from scratch in meetings and spreadsheets',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 4–8 hours · billable team time',freyaLabel:'Freya · GTM Strategist',freyaTitle:'Data-backed ICP built automatically from CRM + intent signals',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> ~15 minutes · zero effort'},
      {phase:'Phase 02 · Competitor Research',manualLabel:'Manual',manualTitle:'Analyst reviews websites, G2, LinkedIn — already 1–2 weeks stale',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 6–10 hours · always outdated',freyaLabel:'Freya · Competitor Intel Agent',freyaTitle:'50+ live signals monitored — always fresh, auto-refreshed weekly',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Always current · zero effort'},
      {phase:'Phase 03 · Content & Copy',manualLabel:'Manual',manualTitle:'Copywriter writes campaign content across multiple revision rounds',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 2–3 days · subjective QA',freyaLabel:'Freya · Copywriter + Brand Guardian',freyaTitle:'On-brand copy generated, QA\\'d, and approved in one operating loop',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> ~20 minutes · brand-safe'},
      {phase:'Phase 04 · Lead Sourcing',manualLabel:'Manual',manualTitle:'SDR pulls lists from Apollo and enriches manually in spreadsheets',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 1–2 days · often stale',freyaLabel:'Freya · Lead Prospecting Agent',freyaTitle:'ICP to enriched, verified, scored prospect list from multiple sources',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> ~5 minutes · fully verified'},
      {phase:'Phase 05 · Outreach & Follow-up',manualLabel:'Manual',manualTitle:'SDR sends 50–100 touches per day and stops after hours',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 6+ hrs/day · no off-hour coverage',freyaLabel:'Freya · SDR Outreach Agent',freyaTitle:'1,000+ personalised multi-channel touches with persistent follow-up',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> 24/7 · scales infinitely'},
      {phase:'Phase 06 · Analytics & Reporting',manualLabel:'Manual',manualTitle:'Analytics team compiles weekly reporting from 17 disconnected tools',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 4–6 hours every week',freyaLabel:'Freya · Analytics + Forecasting',freyaTitle:'Live anomaly detection, attribution, and executive briefing always current',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Real-time · always current'}
    ]
  },
  ngo:{
    title:'M&E & Intervention — 6-Phase Simulation',
    subtitle:'NGO workflow shown · Toggle to compare',
    manualTotal:'10 days',
    freyaTotal:'same-day',
    ctaLabel:'See full NGO platform →',
    ctaHref:'/ngo',
    hud:['10 specialist agents active','280 partner organisations monitored','Donor-ready outputs prepared for review'],
    phases:[
      {phase:'Phase 01 · Partner Submission Intake',manualLabel:'Manual',manualTitle:'Officers chase spreadsheets, attachments, and portal uploads from partner organisations',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 1–2 days · fragmented inputs',freyaLabel:'Freya · Field Data Analyst',freyaTitle:'Forms, spreadsheets, ODK, KoBo, and portal submissions ingested into one operating view',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Continuous · no manual collection'},
      {phase:'Phase 02 · Data Validation & Consolidation',manualLabel:'Manual',manualTitle:'Teams clean duplicates, check mismatches, and reconcile totals line by line',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 1–2 days · error-prone',freyaLabel:'Freya · Validation Layer',freyaTitle:'Submission quality checks, deduplication, and validation rules applied automatically',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Minutes · validation built in'},
      {phase:'Phase 03 · Quarterly Reporting Draft',manualLabel:'Manual',manualTitle:'Programme officers build donor reports from scratch with data lookups and narrative writing',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 2–3 days · repeated effort',freyaLabel:'Freya · M&E Report Generator',freyaTitle:'Narrative, tables, and indicator summaries drafted from live programme data',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> ~4 minutes · review-ready first draft'},
      {phase:'Phase 04 · Partner Performance Review',manualLabel:'Manual',manualTitle:'Underperformance is discussed only after late-cycle review meetings',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Week 10–13 · late visibility',freyaLabel:'Freya · Partner Performance Monitor',freyaTitle:'Anomalies surfaced in week 3 with corrective action memo drafted for approval',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Early warning · actionable'},
      {phase:'Phase 05 · Beneficiary Risk Detection',manualLabel:'Manual',manualTitle:'Dropout and vulnerability signals are found retrospectively in periodic analysis',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> After the fact · limited intervention window',freyaLabel:'Freya · Beneficiary Analytics',freyaTitle:'Journey-level patterns detected in real time with intervention priority surfaced',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Continuous · same-quarter response'},
      {phase:'Phase 06 · Donor & Leadership Briefing',manualLabel:'Manual',manualTitle:'Leadership questions trigger another round of manual lookups and summary writing',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Hours to days · context scattered',freyaLabel:'Freya · Briefing Agent',freyaTitle:'Leadership and donor briefs generated from approved reporting context and institutional memory',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Minutes · cited answer path'}
    ]
  },
  government:{
    title:'Citizen Service & Decision Flow — 6-Phase Simulation',
    subtitle:'Government workflow shown · Toggle to compare',
    manualTotal:'14 days',
    freyaTotal:'1 day',
    ctaLabel:'See full Government platform →',
    ctaHref:'/government',
    hud:['8 specialist agents active','24 departments under live monitoring','Audit trail retained across every action'],
    phases:[
      {phase:'Phase 01 · Request & Case Intake',manualLabel:'Manual',manualTitle:'Incoming requests, documents, and records are checked manually across desks and systems',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 1–2 days · backlog starts here',freyaLabel:'Freya · Intake Intelligence',freyaTitle:'Requests classified, summarised, and matched to workflow rules immediately',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Near-instant · structured intake'},
      {phase:'Phase 02 · Case Context Assembly',manualLabel:'Manual',manualTitle:'Staff search prior records, attachments, and department context before action can begin',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Hours · fragmented systems',freyaLabel:'Freya · Policy Intelligence',freyaTitle:'Relevant records, prior decisions, and policy context assembled into one case view',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Minutes · cited context'},
      {phase:'Phase 03 · Brief & Memo Preparation',manualLabel:'Manual',manualTitle:'Teams manually draft case notes, decision memos, and briefing summaries for review',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 1–3 days · repeated drafting',freyaLabel:'Freya · Document & Brief Generator',freyaTitle:'Decision packs, briefs, and summaries drafted in the correct structure from live data',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Minutes · approval-ready draft'},
      {phase:'Phase 04 · Approval Routing',manualLabel:'Manual',manualTitle:'Approvals move by email and follow-up, with little visibility on delay points',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Days · coordination-heavy',freyaLabel:'Freya · Approval Layer',freyaTitle:'Role-based routing, queue visibility, and escalation triggers handled automatically',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Governed routing · visible status'},
      {phase:'Phase 05 · Compliance & Audit Evidence',manualLabel:'Manual',manualTitle:'Audit evidence is gathered later, often under deadline pressure before review',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> 1–2 days · reactive',freyaLabel:'Freya · Compliance Sentinel',freyaTitle:'Evidence trail, obligations, and exception history retained continuously',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Always-on · audit-ready'},
      {phase:'Phase 06 · Service Backlog Intervention',manualLabel:'Manual',manualTitle:'Leaders discover delays only after backlog has already affected service quality',manualTime:'<span class="ai-svg-icon-slot" data-ai-icon="timer"></span> Weeks late · limited room to respond',freyaLabel:'Freya · Service Delivery Monitor',freyaTitle:'Backlog anomalies surfaced early with escalation notes and corrective options prepared',freyaTime:'<span class="ai-svg-icon-slot" data-ai-icon="bolt"></span> Real-time · intervention before decline'}
    ]
  }
};
function renderSimSector(key){
  const flow=sectorFlows[key]; if(!flow) return;
  document.getElementById('simTitle').textContent=flow.title;
  document.getElementById('simSubtitle').textContent=flow.subtitle;
  document.getElementById('simManualTotal').textContent=flow.manualTotal;
  document.getElementById('simFreyaTotal').textContent=flow.freyaTotal;
  document.getElementById('simHudA').textContent=flow.hud[0];
  document.getElementById('simHudB').textContent=flow.hud[1];
  document.getElementById('simHudC').textContent=flow.hud[2];
  const cta=document.getElementById('simCta');
  cta.textContent=flow.ctaLabel;
  cta.onclick=()=>location.href=flow.ctaHref;
  document.getElementById('simBody').innerHTML=flow.phases.map((item,idx)=>\`\${idx?'<div style="height:8px"></div>':''}<div class="sim-ph">\${item.phase}</div><div class="sim-row"><div class="sim-m"><div class="sim-lbl r">\${item.manualLabel}</div><div class="sim-title">\${item.manualTitle}</div><div class="sim-time r">\${item.manualTime}</div></div><div class="sim-vs">VS</div><div class="sim-f"><div class="sim-lbl t">\${item.freyaLabel}</div><div class="sim-title">\${item.freyaTitle}</div><div class="sim-time g">\${item.freyaTime}</div></div></div>\`).join('');
}
function switchSimSector(key,clickedBtn,cls){
  renderSimSector(key);
  document.querySelectorAll('.sim-sector-tab').forEach(t=>t.classList.remove('on','biz','ngo','gov'));
  clickedBtn.classList.add('on',cls);
}
renderSimSector('business');
// SIMULATION TOGGLE
function simMode(mode,btn){
  document.body.classList.remove('ct-before','ct-after');
  document.body.classList.add('ct-'+mode);
  document.querySelectorAll('.stt').forEach(b=>b.classList.remove('on'));
  if(btn)btn.classList.add('on');
}

// TICKER ROTATIONS
function lockRotatingTextHeight(el,values){
  if(!el||!values||!values.length)return;
  const rect=el.getBoundingClientRect();
  const width=Math.ceil(rect.width);
  if(!width)return;
  const probe=el.cloneNode(false);
  probe.style.position='absolute';
  probe.style.visibility='hidden';
  probe.style.pointerEvents='none';
  probe.style.left='-9999px';
  probe.style.top='0';
  probe.style.width=width+'px';
  probe.style.minHeight='0';
  probe.style.height='auto';
  probe.style.maxHeight='none';
  probe.style.overflow='visible';
  probe.style.whiteSpace=getComputedStyle(el).whiteSpace;
  document.body.appendChild(probe);
  let maxHeight=Math.ceil(rect.height);
  values.forEach(value=>{
    probe.textContent=value;
    maxHeight=Math.max(maxHeight,Math.ceil(probe.getBoundingClientRect().height));
  });
  probe.remove();
  el._rotationValues=values;
  el.style.minHeight=maxHeight+'px';
  el.style.height=maxHeight+'px';
}

function relockRotatingTextHeights(){
  document.querySelectorAll('[data-rotating-text="true"]').forEach(el=>{
    if(el._rotationValues)lockRotatingTextHeight(el,el._rotationValues);
  });
}

function rotateTick(id,arr,delay){
  const el=document.getElementById(id);if(!el)return;
  el.dataset.rotatingText='true';
  lockRotatingTextHeight(el,arr);
  let i=0;
  setInterval(()=>{
    i=(i+1)%arr.length;
    el.style.opacity='0';
    setTimeout(()=>{el.textContent=arr[i];el.style.transition='opacity .35s';el.style.opacity='1'},200);
  },delay||2800);
}
rotateTick('bizTick',[
  'Freya: generating 6 email sequence variants for Q3 launch…',
  'SDR Agent: 1,247 touches sent today — 4 meetings booked',
  'Analytics: LinkedIn CTR anomaly detected — 4 variants generated',
  'Forecasting: Q4 pipeline updated — $3.2M base scenario, 67% confidence'
]);
rotateTick('ngoTick',[
  'Freya: drafting Q2 donor report from live field data…',
  'Field Data Analyst: 280 partner submissions consolidated — 0 manual effort',
  'Partner Monitor: 3 alerts flagged week 3 — corrective memos drafted',
  'Beneficiary Analytics: dropout pattern detected in Region 3 — intervention ready'
]);
rotateTick('govTick',[
  'Freya: compiling ministerial morning brief across 24 departments…',
  'Service Delivery Monitor: 87% KPI compliance — ↑12pp vs Q1',
  'Compliance Sentinel: 0 open flags · Audit portfolio — 247 docs indexed',
  'Forecasting: Q3 policy trajectory — 3 scenarios ready for Cabinet review'
]);
rotateTick('bizAlert',[
  'LinkedIn CTR dropped 28%. Creative fatigue detected. 4 variants generated — pending your approval.',
  'Lead response time fell below target. Freya reprioritised outreach windows and drafted recovery actions.',
  'Pipeline velocity increased in mid-market accounts. Executive note prepared for revenue review.'
],4100);
rotateTick('bizTag',[
  '13 AGENTS ACTIVE · 1,247 TOUCHES SENT TODAY · 4 MEETINGS BOOKED',
  '13 AGENTS ACTIVE · 1,386 TOUCHES SENT TODAY · 6 SEQUENCES RUNNING',
  '13 AGENTS ACTIVE · 4 CAMPAIGNS MONITORED · 2 ALERTS RESOLVED'
],3800);
cycleValues('bizKpiA',['06','07','08'],3600);
cycleValues('bizKpiB',['94%','96%','95%'],3400);
rotateTick('ngoAlert',[
  '3 partners are 18%+ behind Q2 targets — corrective action memos drafted, pending your approval.',
  'Beneficiary dropout risk increased in Region 3. Freya assembled an intervention path for programme leads.',
  'Quarterly donor packet is complete. Exception notes and evidence links are ready for review.'
],4300);
rotateTick('ngoTag',[
  '10 AGENTS ACTIVE · 280 PARTNERS MONITORED · 0 MANUAL AGGREGATION',
  '10 AGENTS ACTIVE · 34 FIELD FILES VALIDATED · 7 RISKS SURFACED',
  '10 AGENTS ACTIVE · DONOR REPORT DRAFTED · LIVE MIS CONTEXT SYNCED'
],3900);
cycleValues('ngoKpiA',['280','284','287'],3700);
cycleValues('ngoKpiB',['07','05','08'],3500);
rotateTick('govAlert',[
  'Dept 7 budget 23% behind target — reallocation recommendation ready for your approval.',
  'Citizen service backlog increased in one unit. Freya drafted an escalation memo for the director.',
  'Ministerial morning brief refreshed with new departmental variance and compliance context.'
],4400);
rotateTick('govTag',[
  '8 AGENTS ACTIVE · 24 DEPARTMENTS MONITORED · 100% AUDIT TRAIL',
  '8 AGENTS ACTIVE · 3 BRIEFS UPDATED · 2 CASE ROUTES ESCALATED',
  '8 AGENTS ACTIVE · LIVE SERVICE WATCH · 0 OPEN AUDIT GAPS'
],4000);
cycleValues('govKpiA',['24','24','26'],3800);
cycleValues('govKpiB',['100%','100%','99.8%'],3600);
rotateTick('sanctumTickA',[
  'Updating institutional memory from approved decisions...',
  'Syncing new approval context into Freya memory graph...',
  'Linking today\\'s outputs to prior institutional precedent...'
],3200);
rotateTick('sanctumTickB',[
  'Tracing source confidence across active workflows...',
  'Recomputing reasoning confidence after new live signals...',
  'Preparing citation-ready brief paths for human review...'
],3400);
rotateTick('sanctumTickC',[
  'Coordinating specialist agents across business, NGO, and government operations...',
  'Rebalancing agent priorities across simultaneous live workloads...',
  'Escalating only the decisions that require human judgment...'
],3600);
function cycleValues(id,vals,delay){
  const el=document.getElementById(id);if(!el)return;
  el.dataset.rotatingText='true';
  lockRotatingTextHeight(el,vals);
  let i=0;
  setInterval(()=>{
    i=(i+1)%vals.length;
    el.style.opacity='0';
    setTimeout(()=>{el.textContent=vals[i];el.style.transition='opacity .25s';el.style.opacity='1'},160);
  },delay||2600);
}
cycleValues('sanctumMetric1',['289','294','301','307'],2600);
cycleValues('sanctumMetric2',['13','13','13','13'],4000);
cycleValues('sanctumMetric3',['24/7','Always on','Live'],4200);
rotateTick('oracleA1',['24 live feeds','31 active data streams','27 monitored channels'],3100);
rotateTick('oracleA2',['3 anomaly clusters','2 risk clusters','5 weak signals surfaced'],3300);
rotateTick('oracleB1',['92% confidence path','94% confidence path','91% confidence path'],2900);
rotateTick('oracleB2',['13 experts aligned','13 parallel agents','13-domain mesh active'],3500);
rotateTick('oracleC1',['2 actions awaiting sign-off','1 action awaiting sign-off','3 actions awaiting sign-off'],3700);
rotateTick('oracleC2',['Memory compounding','Institutional memory growing','Decision graph reinforced'],3900);
rotateTick('simHudA',['13 specialist agents active','16 live execution threads','11 approval-safe pathways active','14 priority queues synchronised'],1900);
rotateTick('simHudB',['Cross-sector orchestration live','Business, NGO, and Government workloads synced','Live data, memory, and routing layer active','Three industry models under one intelligence layer'],2200);
rotateTick('simHudC',['High-risk actions queued for approval','Low-risk actions continue inside configured guardrails','Decision packets prepared for human sign-off','Human approval boundaries enforced in real time'],2400);
document.querySelectorAll('.iv-pf').forEach((bar,idx)=>{let w=61+(idx*9);setInterval(()=>{w=61+((w+Math.floor(Math.random()*18)+8)%31);bar.style.width=w+'%'},1400+(idx*120))});

function initFreyaCapabilitiesCoin(){
  const video=document.getElementById('freyaCapabilitiesCoin');
  if(!video)return;
  video.muted=true;
  video.defaultMuted=true;
  video.playsInline=true;
  function ensurePlayback(){
    if(document.hidden)return;
    if(video.ended)video.currentTime=0;
    if(video.paused){
      const playAttempt=video.play();
      if(playAttempt&&typeof playAttempt.catch==='function'){
        playAttempt.catch(()=>{});
      }
    }
  }
  video.addEventListener('canplay',ensurePlayback);
  video.addEventListener('loadeddata',ensurePlayback);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)ensurePlayback();});
  ensurePlayback();
}

initFreyaCapabilitiesCoin();
window.addEventListener('load',relockRotatingTextHeights);
window.addEventListener('resize',relockRotatingTextHeights);
if(document.fonts&&document.fonts.ready){
  document.fonts.ready.then(relockRotatingTextHeights);
}
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
