const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Antarious Help Centre — A help centre that thinks with you</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  /* Antarious palette — matched to antarious.com */
  --cream:#F4F1EA;
  --cream-2:#EDE8DC;
  --cream-3:#E4DECF;
  --paper:#FBF9F4;
  --ink:#1A1A1A;
  --ink-soft:#2D2D2D;
  --ink-muted:#5A5A5A;
  --ink-faint:#8A8A8A;
  --line:#D8D2C2;
  --line-soft:#E8E2D2;
  --navy:#1F4E79;
  --navy-deep:#163A5C;
  --navy-soft:#2D6BA0;
  --gold:#B98E2E;
  --gold-bright:#D4A845;
  --gold-deep:#8E6A1E;
  --teal:#0F766E;
  --teal-bright:#14B8A6;
  --sky:#0369A1;
  --sky-bright:#0EA5E9;
  --violet:#5B21B6;
  --violet-bright:#7C3AED;
  --coral:#B91C1C;
  --coral-bright:#DC2626;
  --amber:#B45309;
  --emerald:#047857;
  --console:#0B0F14;
  --console-2:#11161D;
  --console-3:#1A2029;
  --console-line:#2A3340;
  --console-faint:#4A5460;
  --console-text:#D8DEE9;

  --r-sm:6px;
  --r-md:10px;
  --r-lg:16px;
  --r-xl:24px;
  --shadow-sm:0 1px 2px rgba(31,78,121,.06);
  --shadow-md:0 4px 16px rgba(31,78,121,.08);
  --shadow-lg:0 12px 40px rgba(31,78,121,.14);
  --shadow-console:0 8px 32px rgba(11,15,20,.4);

  --font-serif:"Playfair Display", Georgia, serif;
  --font-sans:"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:"JetBrains Mono", "Courier New", monospace;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:var(--font-sans);
  background:var(--cream);
  color:var(--ink);
  line-height:1.55;
  font-size:15px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  overflow-x:hidden;
}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
a{color:inherit;text-decoration:none}
input,textarea{font-family:inherit;font-size:inherit;color:inherit}

/* ==================== TOP BAR ==================== */
.topbar{
  position:sticky;top:0;z-index:50;
  background:rgba(244,241,234,.92);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  border-bottom:1px solid var(--line);
}
.topbar-inner{
  max-width:1480px;margin:0 auto;
  padding:14px 32px;
  display:flex;align-items:center;gap:32px;
}
.brand{display:flex;align-items:center;gap:12px;cursor:pointer}
.brand-orb{
  width:32px;height:32px;border-radius:50%;
  background:radial-gradient(circle at 30% 30%, var(--gold-bright), var(--gold) 60%, var(--gold-deep));
  box-shadow:0 0 0 2px var(--cream), 0 0 24px rgba(185,142,46,.4);
  position:relative;
  animation:brandPulse 4s ease-in-out infinite;
}
.brand-orb::after{
  content:"";position:absolute;inset:6px;border-radius:50%;
  background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.7), transparent 60%);
}
@keyframes brandPulse{
  0%,100%{box-shadow:0 0 0 2px var(--cream), 0 0 24px rgba(185,142,46,.4)}
  50%{box-shadow:0 0 0 2px var(--cream), 0 0 36px rgba(185,142,46,.7)}
}
.brand-name{
  font-family:var(--font-serif);
  font-size:24px;font-weight:600;
  color:var(--navy);letter-spacing:-.5px;
}
.brand-tag{
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:1.5px;
  color:var(--ink-faint);
  margin-top:-4px;
}
.topnav{display:flex;gap:28px;flex:1}
.topnav a{
  font-size:14px;font-weight:500;
  color:var(--ink-soft);
  padding:6px 0;
  position:relative;
  transition:color .2s;
}
.topnav a:hover{color:var(--navy)}
.topnav a.active{color:var(--navy)}
.topnav a.active::after{
  content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;
  background:var(--gold);border-radius:2px;
}
.topbar-cta{
  display:flex;align-items:center;gap:12px;
}
.btn-ghost{
  padding:8px 16px;border-radius:var(--r-md);
  font-size:13px;font-weight:500;color:var(--ink-soft);
  border:1px solid var(--line);
  transition:all .2s;
}
.btn-ghost:hover{border-color:var(--navy);color:var(--navy)}
.btn-primary{
  padding:9px 18px;border-radius:var(--r-md);
  font-size:13px;font-weight:600;color:white;
  background:var(--navy);
  transition:all .2s;
}
.btn-primary:hover{background:var(--navy-deep);transform:translateY(-1px)}
.btn-gold{
  padding:9px 18px;border-radius:var(--r-md);
  font-size:13px;font-weight:600;color:white;
  background:linear-gradient(135deg, var(--gold-bright), var(--gold));
  transition:all .2s;
}
.btn-gold:hover{background:linear-gradient(135deg, var(--gold), var(--gold-deep));transform:translateY(-1px)}

/* ==================== COCKPIT STRIP ==================== */
.cockpit{
  background:var(--console);
  color:var(--console-text);
  border-bottom:1px solid var(--console-line);
  position:sticky;top:62px;z-index:40;
}
.cockpit-inner{
  max-width:1480px;margin:0 auto;
  padding:10px 32px;
  display:grid;grid-template-columns:auto 1fr auto;
  gap:24px;align-items:center;
}
.cockpit-left{display:flex;align-items:center;gap:16px}
.cockpit-status-dot{
  width:8px;height:8px;border-radius:50%;
  background:var(--teal-bright);
  box-shadow:0 0 8px var(--teal-bright);
  animation:livePulse 2s ease-in-out infinite;
}
@keyframes livePulse{
  0%,100%{box-shadow:0 0 4px var(--teal-bright);opacity:.9}
  50%{box-shadow:0 0 12px var(--teal-bright);opacity:1}
}
.cockpit-status-text{
  font-family:var(--font-mono);
  font-size:11px;font-weight:500;
  letter-spacing:.5px;text-transform:uppercase;
  color:#9CA3AF;
}
.cockpit-status-text strong{color:var(--teal-bright);font-weight:600}
.cockpit-stat{
  display:flex;align-items:center;gap:8px;
  padding-left:16px;border-left:1px solid var(--console-line);
}
.cockpit-stat-label{
  font-family:var(--font-mono);font-size:10px;
  color:#6B7280;text-transform:uppercase;letter-spacing:.8px;
}
.cockpit-stat-value{
  font-family:var(--font-mono);font-size:13px;font-weight:600;color:var(--gold-bright);
}

.cockpit-agents{
  display:flex;gap:6px;align-items:center;justify-content:center;
  flex-wrap:wrap;
}
.agent-dot{
  position:relative;
  width:30px;height:30px;border-radius:50%;
  background:var(--console-3);
  border:1px solid var(--console-line);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--font-mono);font-size:9px;font-weight:600;
  color:#9CA3AF;
  cursor:pointer;
  transition:all .2s;
}
.agent-dot::after{
  content:"";position:absolute;top:2px;right:2px;
  width:6px;height:6px;border-radius:50%;
  background:var(--teal-bright);
  box-shadow:0 0 6px var(--teal-bright);
  animation:agentBlip 2s ease-in-out infinite;
}
.agent-dot.warn::after{background:var(--gold-bright);box-shadow:0 0 6px var(--gold-bright)}
.agent-dot.err::after{background:var(--coral-bright);box-shadow:0 0 6px var(--coral-bright)}
.agent-dot:hover{
  background:var(--console-line);
  color:var(--gold-bright);
  border-color:var(--gold);
  transform:scale(1.08);
}
.agent-tooltip{
  position:absolute;top:36px;left:50%;transform:translateX(-50%);
  background:var(--console);border:1px solid var(--gold);
  padding:6px 10px;border-radius:6px;
  font-family:var(--font-mono);font-size:10px;color:var(--cream);
  white-space:nowrap;pointer-events:none;
  opacity:0;transition:opacity .2s;
  z-index:60;
}
.agent-dot:hover .agent-tooltip{opacity:1}

@keyframes agentBlip{
  0%,100%{opacity:.7}
  50%{opacity:1}
}

.cockpit-right{
  display:flex;align-items:center;gap:14px;
  font-family:var(--font-mono);font-size:11px;color:#9CA3AF;
}
.tick-feed{
  display:flex;align-items:center;gap:8px;
  padding:6px 10px;background:var(--console-2);
  border:1px solid var(--console-line);border-radius:6px;
  min-width:280px;
  overflow:hidden;
}
.tick-arrow{color:var(--gold-bright)}
.tick-text{
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  animation:tickFade .4s ease-out;
}
@keyframes tickFade{
  from{opacity:0;transform:translateX(8px)}
  to{opacity:1;transform:translateX(0)}
}

/* ==================== HERO ==================== */
.hero{
  max-width:1480px;margin:0 auto;
  padding:48px 32px 32px;
}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 12px;background:rgba(31,78,121,.08);
  border:1px solid rgba(31,78,121,.15);border-radius:999px;
  font-size:11px;font-weight:600;letter-spacing:1.2px;
  text-transform:uppercase;color:var(--navy);margin-bottom:16px;
}
.hero-eyebrow::before{
  content:"";width:6px;height:6px;border-radius:50%;background:var(--gold);
}
.hero-title{
  font-family:var(--font-serif);
  font-size:clamp(36px, 5vw, 56px);
  font-weight:600;letter-spacing:-1.5px;
  color:var(--navy);line-height:1.05;
  max-width:900px;
  margin-bottom:14px;
}
.hero-title em{
  font-style:italic;color:var(--gold-deep);
  font-weight:500;
}
.hero-sub{
  font-size:17px;color:var(--ink-muted);
  max-width:780px;margin-bottom:36px;line-height:1.6;
}

/* ============== DIAGNOSTIC (FULL WIDTH) ============== */
.diag{
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:var(--r-lg);
  padding:32px 36px 36px;
  position:relative;
  overflow:hidden;
  display:flex;flex-direction:column;
  box-shadow:var(--shadow-md);
  min-height:420px;
}
.diag::before{
  content:"";position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg, var(--navy), var(--gold), var(--teal));
}
.diag-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px}
.diag-label{
  display:inline-flex;align-items:center;gap:6px;
  font-family:var(--font-mono);font-size:10px;font-weight:600;
  text-transform:uppercase;letter-spacing:1.5px;color:var(--navy);
}
.diag-label::before{
  content:"";width:8px;height:8px;border-radius:1px;background:var(--navy);
}
.diag-reset{
  font-size:11px;color:var(--ink-faint);
  display:flex;align-items:center;gap:4px;
  padding:4px 8px;border-radius:4px;
  transition:all .2s;
}
.diag-reset:hover{background:var(--cream-2);color:var(--ink)}
.diag-title{
  font-family:var(--font-serif);font-size:24px;font-weight:600;
  color:var(--navy);letter-spacing:-.4px;margin-bottom:6px;
}
.diag-sub{font-size:13px;color:var(--ink-muted);margin-bottom:24px}

.diag-trail{
  display:flex;flex-wrap:wrap;gap:6px;
  margin-bottom:18px;min-height:24px;
}
.diag-crumb{
  display:inline-flex;align-items:center;gap:6px;
  padding:4px 10px;background:var(--cream-2);
  border:1px solid var(--line-soft);border-radius:999px;
  font-size:11px;color:var(--ink-soft);
  animation:crumbIn .3s ease-out;
}
.diag-crumb-x{color:var(--ink-faint);cursor:pointer;font-size:11px;line-height:1;padding:2px 4px;border-radius:50%;transition:all .15s}
.diag-crumb-x:hover{background:var(--coral);color:white}
@keyframes crumbIn{
  from{opacity:0;transform:translateY(-4px)}
  to{opacity:1;transform:translateY(0)}
}

.diag-step{flex:1;display:flex;flex-direction:column}
.diag-question{
  font-size:15px;font-weight:600;color:var(--ink);
  margin-bottom:14px;line-height:1.4;
  animation:fadeUp .35s ease-out;
}
@keyframes fadeUp{
  from{opacity:0;transform:translateY(8px)}
  to{opacity:1;transform:translateY(0)}
}
.diag-options{display:flex;flex-direction:column;gap:10px}
.diag-opt{
  text-align:left;
  padding:14px 16px;
  background:white;
  border:1px solid var(--line);
  border-radius:var(--r-md);
  font-size:14px;color:var(--ink-soft);font-weight:500;
  display:flex;align-items:center;justify-content:space-between;gap:12px;
  transition:all .2s;
  animation:optIn .35s ease-out backwards;
}
.diag-opt:nth-child(1){animation-delay:.05s}
.diag-opt:nth-child(2){animation-delay:.1s}
.diag-opt:nth-child(3){animation-delay:.15s}
.diag-opt:nth-child(4){animation-delay:.2s}
.diag-opt:nth-child(5){animation-delay:.25s}
@keyframes optIn{
  from{opacity:0;transform:translateY(6px)}
  to{opacity:1;transform:translateY(0)}
}
.diag-opt:hover{
  border-color:var(--navy);
  background:var(--paper);
  transform:translateX(4px);
  color:var(--navy);
}
.diag-opt-arrow{
  color:var(--ink-faint);
  transition:all .2s;font-size:18px;
}
.diag-opt:hover .diag-opt-arrow{color:var(--gold);transform:translateX(2px)}

.diag-result{
  background:white;border:1px solid var(--line);border-radius:var(--r-md);
  padding:20px;
  animation:resultIn .4s ease-out;
}
@keyframes resultIn{
  from{opacity:0;transform:scale(.97)}
  to{opacity:1;transform:scale(1)}
}
.diag-result-tag{
  display:inline-flex;align-items:center;gap:6px;
  padding:4px 10px;background:rgba(15,118,110,.1);
  color:var(--teal);border-radius:999px;
  font-family:var(--font-mono);font-size:10px;font-weight:600;
  text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;
}
.diag-result-tag::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--teal)}
.diag-result-title{
  font-family:var(--font-serif);font-size:20px;font-weight:600;
  color:var(--navy);margin-bottom:8px;line-height:1.3;
}
.diag-result-summary{
  font-size:13px;color:var(--ink-muted);margin-bottom:14px;line-height:1.5;
}
.diag-result-cta{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 14px;background:var(--navy);color:white;
  border-radius:var(--r-md);font-size:12px;font-weight:600;
  transition:all .2s;
}
.diag-result-cta:hover{background:var(--navy-deep);transform:translateX(2px)}

/* ==================== SEARCH ==================== */
.search-wrap{
  max-width:1480px;margin:0 auto;
  padding:0 32px 24px;
}
.search-bar{
  display:flex;align-items:center;gap:14px;
  background:white;
  border:1px solid var(--line);
  border-radius:var(--r-lg);
  padding:6px 6px 6px 22px;
  box-shadow:var(--shadow-sm);
  transition:all .2s;
}
.search-bar:focus-within{
  border-color:var(--navy);
  box-shadow:0 0 0 4px rgba(31,78,121,.08), var(--shadow-sm);
}
.search-icon{font-size:18px;color:var(--ink-faint)}
.search-bar input{
  flex:1;border:none;outline:none;background:none;
  padding:14px 0;font-size:15px;color:var(--ink);
}
.search-bar input::placeholder{color:var(--ink-faint)}
.search-shortcut{
  display:inline-flex;align-items:center;gap:4px;
  padding:4px 8px;background:var(--cream-2);
  border:1px solid var(--line-soft);border-radius:4px;
  font-family:var(--font-mono);font-size:11px;color:var(--ink-faint);
}
.search-go{
  background:var(--navy);color:white;
  padding:11px 22px;border-radius:var(--r-md);
  font-size:13px;font-weight:600;
  transition:all .2s;
}
.search-go:hover{background:var(--navy-deep)}

.search-results{
  margin-top:14px;background:white;
  border:1px solid var(--line);border-radius:var(--r-lg);
  padding:8px;
  box-shadow:var(--shadow-md);
  max-height:380px;overflow-y:auto;
  display:none;
}
.search-results.show{display:block;animation:fadeUp .25s ease-out}
.search-result-item{
  padding:12px 16px;border-radius:var(--r-md);
  display:flex;align-items:flex-start;gap:14px;
  cursor:pointer;transition:all .15s;
}
.search-result-item:hover{background:var(--cream-2)}
.search-result-cat{
  font-family:var(--font-mono);font-size:9px;
  font-weight:600;text-transform:uppercase;letter-spacing:1.2px;
  padding:3px 8px;border-radius:4px;
  background:var(--cream-3);color:var(--ink-soft);flex-shrink:0;margin-top:2px;
}
.search-result-body{flex:1;min-width:0}
.search-result-title{
  font-size:14px;font-weight:600;color:var(--navy);margin-bottom:3px;
}
.search-result-summary{
  font-size:12px;color:var(--ink-muted);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.search-empty{
  text-align:center;padding:24px;color:var(--ink-faint);font-size:13px;
}

/* ==================== BROWSE ==================== */
.browse{
  max-width:1480px;margin:0 auto;
  padding:32px 32px 16px;
}
.section-head{
  display:flex;align-items:flex-end;justify-content:space-between;
  margin-bottom:24px;gap:24px;flex-wrap:wrap;
}
.section-eyebrow{
  font-family:var(--font-mono);font-size:11px;font-weight:600;
  color:var(--gold-deep);text-transform:uppercase;letter-spacing:1.5px;
  margin-bottom:6px;
}
.section-title{
  font-family:var(--font-serif);font-size:32px;font-weight:600;
  color:var(--navy);letter-spacing:-.8px;
}
.section-sub{
  font-size:14px;color:var(--ink-muted);max-width:520px;
}

.cat-grid{
  display:grid;grid-template-columns:repeat(4, 1fr);gap:16px;
}
@media (max-width:1100px){.cat-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:600px){.cat-grid{grid-template-columns:1fr}}

.cat-card{
  background:white;
  border:1px solid var(--line);
  border-radius:var(--r-lg);
  padding:22px 22px 24px;
  position:relative;
  overflow:hidden;
  cursor:pointer;
  transition:all .25s ease;
}
.cat-card::before{
  content:"";position:absolute;top:0;left:0;right:0;height:3px;
  background:var(--cat-color, var(--navy));
  transform:scaleX(0);transform-origin:left;
  transition:transform .35s ease;
}
.cat-card:hover{
  transform:translateY(-3px);
  box-shadow:var(--shadow-md);
  border-color:var(--cat-color, var(--navy));
}
.cat-card:hover::before{transform:scaleX(1)}
.cat-icon{
  width:42px;height:42px;border-radius:10px;
  background:var(--cat-tint, rgba(31,78,121,.1));
  color:var(--cat-color, var(--navy));
  display:flex;align-items:center;justify-content:center;
  font-size:20px;font-weight:600;font-family:var(--font-mono);
  margin-bottom:14px;
}
.cat-name{
  font-family:var(--font-serif);font-size:18px;font-weight:600;
  color:var(--navy);margin-bottom:6px;letter-spacing:-.3px;
}
.cat-count{
  font-family:var(--font-mono);font-size:11px;
  color:var(--ink-faint);text-transform:uppercase;letter-spacing:1px;
  margin-bottom:8px;
}
.cat-desc{font-size:13px;color:var(--ink-muted);line-height:1.5}

/* ==================== FILTERS ==================== */
.filters{
  max-width:1480px;margin:0 auto;
  padding:32px 32px 0;
}
.filter-row{
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  padding:14px 0;border-bottom:1px solid var(--line-soft);
}
.filter-row:first-child{border-bottom:1px solid var(--line)}
.filter-label{
  font-family:var(--font-mono);font-size:10px;font-weight:600;
  text-transform:uppercase;letter-spacing:1.5px;color:var(--ink-faint);
  min-width:84px;
}
.fchips{display:flex;gap:8px;flex-wrap:wrap}
.fchip{
  padding:7px 13px;
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:999px;
  font-size:12px;font-weight:500;color:var(--ink-soft);
  cursor:pointer;transition:all .18s;
  display:inline-flex;align-items:center;gap:6px;
}
.fchip:hover{border-color:var(--navy);color:var(--navy)}
.fchip.active{
  background:var(--navy);border-color:var(--navy);color:white;
}
.fchip-dot{
  width:6px;height:6px;border-radius:50%;background:var(--chip-color, currentColor);
}
.filter-clear{
  font-size:12px;color:var(--ink-faint);
  padding:5px 10px;border-radius:6px;
  transition:all .15s;
}
.filter-clear:hover{background:var(--cream-2);color:var(--ink)}
.filter-summary{
  font-family:var(--font-mono);font-size:11px;
  color:var(--ink-faint);margin-left:auto;
  text-transform:uppercase;letter-spacing:1px;
}
.filter-summary strong{color:var(--navy);font-weight:600}

/* ==================== ARTICLE GRID ==================== */
.articles{
  max-width:1480px;margin:0 auto;
  padding:24px 32px 60px;
}
.art-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:18px;
}
@media (max-width:1100px){.art-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:680px){.art-grid{grid-template-columns:1fr}}

.art-card{
  background:white;
  border:1px solid var(--line);
  border-radius:var(--r-md);
  padding:20px 20px 22px;
  position:relative;
  overflow:hidden;
  cursor:pointer;
  transition:all .22s ease;
  display:flex;flex-direction:column;
}
.art-card::before{
  content:"";position:absolute;left:0;top:0;bottom:0;width:3px;
  background:var(--cat-color, var(--navy));
  transform:scaleY(.3);transform-origin:top;
  transition:transform .25s ease;
}
.art-card:hover{
  border-color:var(--cat-color, var(--navy));
  box-shadow:var(--shadow-md);
  transform:translateY(-2px);
}
.art-card:hover::before{transform:scaleY(1)}
.art-meta{
  display:flex;align-items:center;gap:10px;margin-bottom:10px;
}
.art-cat{
  font-family:var(--font-mono);font-size:9px;font-weight:600;
  text-transform:uppercase;letter-spacing:1.2px;
  color:var(--cat-color, var(--navy));
  padding:3px 8px;border-radius:4px;
  background:var(--cat-tint, rgba(31,78,121,.08));
}
.art-journey{
  font-family:var(--font-mono);font-size:9px;
  color:var(--ink-faint);text-transform:uppercase;letter-spacing:1px;
}
.art-title{
  font-family:var(--font-serif);font-size:17px;font-weight:600;
  color:var(--navy);margin-bottom:8px;line-height:1.3;letter-spacing:-.2px;
}
.art-summary{
  font-size:13px;color:var(--ink-muted);
  line-height:1.55;flex:1;margin-bottom:14px;
}
.art-roles{display:flex;gap:5px;flex-wrap:wrap}
.role-tag{
  font-family:var(--font-mono);font-size:9px;font-weight:500;
  color:var(--ink-faint);text-transform:uppercase;letter-spacing:1px;
  padding:2px 7px;
  background:var(--cream-2);border-radius:3px;
}

.art-empty{
  grid-column:1 / -1;
  text-align:center;padding:60px 20px;
  background:var(--paper);border:1px dashed var(--line);
  border-radius:var(--r-lg);
  color:var(--ink-muted);
}
.art-empty-title{
  font-family:var(--font-serif);font-size:22px;color:var(--navy);
  margin-bottom:8px;
}

/* ==================== MODAL ==================== */
.modal-bg{
  position:fixed;inset:0;background:rgba(11,15,20,.55);
  backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
  z-index:100;display:none;align-items:flex-start;justify-content:center;
  overflow-y:auto;padding:60px 24px;
}
.modal-bg.show{display:flex;animation:fadeBg .25s ease}
@keyframes fadeBg{from{opacity:0}to{opacity:1}}
.modal{
  background:var(--paper);
  border-radius:var(--r-xl);
  max-width:780px;width:100%;
  position:relative;
  box-shadow:var(--shadow-lg);
  animation:modalIn .35s cubic-bezier(.2,.9,.3,1);
}
@keyframes modalIn{
  from{opacity:0;transform:translateY(20px) scale(.97)}
  to{opacity:1;transform:translateY(0) scale(1)}
}
.modal-close{
  position:absolute;top:16px;right:16px;
  width:36px;height:36px;border-radius:50%;
  background:var(--cream-2);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;color:var(--ink-soft);
  transition:all .2s;z-index:5;
}
.modal-close:hover{background:var(--coral);color:white;transform:rotate(90deg)}

/* Modal nav strip — back + breadcrumb */
.modal-nav{
  position:sticky;top:0;z-index:4;
  display:flex;align-items:center;gap:10px;
  padding:14px 56px;
  background:linear-gradient(to bottom, var(--paper) 80%, rgba(251,249,244,0));
  border-bottom:1px solid var(--line-soft);
}
.modal-back{
  display:inline-flex;align-items:center;gap:6px;
  padding:7px 12px;border-radius:var(--r-md);
  background:var(--cream-2);border:1px solid var(--line);
  font-size:12px;font-weight:600;color:var(--navy);
  transition:all .18s;cursor:pointer;
}
.modal-back:hover{background:var(--navy);color:white;border-color:var(--navy);transform:translateX(-2px)}
.modal-back[disabled]{opacity:.35;cursor:not-allowed;pointer-events:none}
.modal-back-icon{font-size:14px;line-height:1}
.modal-crumbs{
  display:flex;align-items:center;gap:6px;flex:1;
  font-family:var(--font-mono);font-size:11px;
  color:var(--ink-faint);text-transform:uppercase;letter-spacing:1.1px;
  overflow:hidden;
}
.modal-crumb{
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  max-width:240px;cursor:pointer;color:var(--ink-muted);
  padding:3px 6px;border-radius:4px;transition:all .15s;
}
.modal-crumb:hover{background:var(--cream-2);color:var(--navy)}
.modal-crumb.current{color:var(--navy);font-weight:600;cursor:default;background:none}
.modal-crumb.current:hover{background:none}
.modal-crumb-sep{color:var(--ink-faint);opacity:.55}

.modal-body{padding:24px 56px 40px}
.modal-meta{display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.modal-cat{
  font-family:var(--font-mono);font-size:10px;font-weight:600;
  text-transform:uppercase;letter-spacing:1.4px;
  padding:4px 10px;border-radius:4px;
  color:var(--cat-color, var(--navy));
  background:var(--cat-tint, rgba(31,78,121,.1));
}
.modal-journey{
  font-family:var(--font-mono);font-size:10px;
  color:var(--ink-faint);text-transform:uppercase;letter-spacing:1.2px;
}
.modal-roles{display:flex;gap:5px;margin-left:auto}
.modal-roles .role-tag{font-size:10px}

.modal-title{
  font-family:var(--font-serif);font-size:32px;font-weight:600;
  color:var(--navy);letter-spacing:-.7px;line-height:1.2;
  margin-bottom:14px;
}
.modal-summary{
  font-size:16px;color:var(--ink-soft);line-height:1.6;margin-bottom:28px;
  padding:18px 20px;background:var(--cream-2);
  border-left:3px solid var(--gold);border-radius:0 var(--r-md) var(--r-md) 0;
}
.modal-content{font-size:15px;color:var(--ink-soft);line-height:1.75}
.modal-content p{margin-bottom:16px}
.modal-content h3{
  font-family:var(--font-serif);font-size:20px;font-weight:600;
  color:var(--navy);margin:28px 0 12px;letter-spacing:-.3px;
}
.modal-content ul{margin:14px 0 18px;padding-left:0;list-style:none}
.modal-content li{
  position:relative;padding:6px 0 6px 26px;
  color:var(--ink-soft);
}
.modal-content li::before{
  content:"";position:absolute;left:8px;top:14px;
  width:6px;height:6px;border-radius:50%;background:var(--gold);
}

.modal-related{
  margin-top:36px;padding-top:28px;
  border-top:1px solid var(--line);
}
.modal-related-head{
  font-family:var(--font-mono);font-size:10px;font-weight:600;
  text-transform:uppercase;letter-spacing:1.5px;color:var(--ink-faint);
  margin-bottom:14px;
}
.related-list{display:flex;flex-direction:column;gap:8px}
.related-item{
  padding:12px 14px;background:white;
  border:1px solid var(--line);border-radius:var(--r-md);
  display:flex;align-items:center;justify-content:space-between;gap:14px;
  cursor:pointer;transition:all .18s;
}
.related-item:hover{
  border-color:var(--navy);
  background:var(--cream-2);
  transform:translateX(3px);
}
.related-item-body{min-width:0;flex:1}
.related-item-cat{
  font-family:var(--font-mono);font-size:9px;font-weight:600;
  text-transform:uppercase;letter-spacing:1.2px;
  color:var(--rel-color, var(--navy));margin-bottom:3px;
}
.related-item-title{font-size:13.5px;font-weight:600;color:var(--ink);}
.related-arrow{color:var(--ink-faint);font-size:18px;transition:all .2s}
.related-item:hover .related-arrow{color:var(--gold);transform:translateX(2px)}

.modal-feedback{
  margin-top:32px;padding:24px;
  background:var(--cream-2);border-radius:var(--r-md);
}
.fb-q{font-size:14px;font-weight:600;color:var(--ink);margin-bottom:14px}
.fb-buttons{display:flex;gap:10px;margin-bottom:14px}
.fb-btn{
  flex:1;padding:10px 16px;
  background:white;border:1px solid var(--line);
  border-radius:var(--r-md);
  font-size:13px;font-weight:500;color:var(--ink-soft);
  display:flex;align-items:center;justify-content:center;gap:8px;
  transition:all .18s;
}
.fb-btn:hover{border-color:var(--navy);transform:translateY(-1px)}
.fb-btn.up:hover,.fb-btn.up.selected{background:rgba(15,118,110,.1);border-color:var(--teal);color:var(--teal)}
.fb-btn.down:hover,.fb-btn.down.selected{background:rgba(180,83,9,.1);border-color:var(--amber);color:var(--amber)}
.fb-text{
  width:100%;
  padding:10px 12px;
  background:white;
  border:1px solid var(--line);
  border-radius:var(--r-md);
  font-size:13px;color:var(--ink);
  resize:vertical;min-height:60px;outline:none;
  display:none;transition:border-color .2s;
}
.fb-text:focus{border-color:var(--navy)}
.fb-text.show{display:block;animation:fadeUp .25s ease-out}
.fb-submit{
  display:none;margin-top:10px;
  padding:8px 16px;border-radius:var(--r-md);
  background:var(--navy);color:white;
  font-size:12px;font-weight:600;
  transition:all .18s;
}
.fb-submit.show{display:inline-flex;animation:fadeUp .25s ease-out}
.fb-submit:hover{background:var(--navy-deep)}
.fb-thanks{
  display:none;text-align:center;font-size:14px;
  color:var(--teal);font-weight:500;padding:14px;
  animation:fadeUp .35s ease-out;
}
.fb-thanks.show{display:block}

/* ==================== FOOTER ==================== */
.footer{
  background:var(--console);color:#9CA3AF;
  padding:54px 32px 36px;margin-top:60px;
}
.footer-inner{max-width:1480px;margin:0 auto}
.footer-grid{
  display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;margin-bottom:36px;
}
@media (max-width:780px){.footer-grid{grid-template-columns:1fr 1fr}}
.footer-brand{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.footer-tag{font-size:13px;line-height:1.6;max-width:320px}
.footer-col h4{
  font-family:var(--font-mono);font-size:10px;font-weight:600;
  color:var(--gold-bright);text-transform:uppercase;letter-spacing:1.5px;
  margin-bottom:14px;
}
.footer-col a{display:block;font-size:13px;padding:5px 0;transition:color .2s;color:#9CA3AF}
.footer-col a:hover{color:var(--gold-bright)}
.footer-bottom{
  border-top:1px solid var(--console-line);
  padding-top:20px;
  display:flex;justify-content:space-between;align-items:center;
  font-size:12px;font-family:var(--font-mono);color:#6B7280;
}
.footer-bottom .legal{display:flex;gap:18px}

/* ==================== FLOAT-IN ANIMATION ==================== */
.fade-in{animation:fadeIn .5s ease-out}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.float-up{animation:floatUp .5s ease-out backwards}
@keyframes floatUp{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:translateY(0)}
}

/* ==================== RESPONSIVE ==================== */
@media (max-width:780px){
  .topnav{display:none}
  .topbar-inner{padding:12px 18px}
  .hero{padding:32px 18px 24px}
  .browse,.filters,.articles,.search-wrap{padding-left:18px;padding-right:18px}
  .modal-body{padding:18px 24px 32px}
  .modal-nav{padding:12px 24px}
  .modal-crumb{max-width:140px}
  .modal-title{font-size:24px}
  .cockpit-inner{grid-template-columns:1fr;padding:8px 18px;gap:10px}
  .cockpit-agents{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding-bottom:4px}
  .cockpit-right{display:none}
}
</style>
<style id="antarious-design-system-overrides">
:root{
  --brand-primary:#0EA5E9;
  --brand-primary-strong:#0284C7;
  --brand-primary-soft:#38BDF8;
  --surface-base:#FFFFFF;
  --surface-muted:#F8FAFC;
  --text-strong:#0F172A;
  --text-body:#334155;
  --text-muted:#64748B;
  --border-subtle:rgba(15,23,42,.09);
}
body{
  background:var(--surface-base);
  color:var(--text-strong);
  padding-top:62px;
}
.theme-logo-main{height:28px;width:auto;display:block}
.nav-logo .theme-logo-main{height:28px}
.footer-brand-img.theme-logo-main,.name .theme-logo-main{height:28px}
@media (max-width:768px){.theme-logo-main{height:24px}}

.nav{
  position:fixed;top:0;left:0;right:0;z-index:999;
  height:62px;display:flex;align-items:center;padding:0 48px;gap:24px;
  background:color-mix(in srgb,var(--surface-base) 92%, transparent);backdrop-filter:blur(24px);
  border-bottom:1px solid var(--border-subtle);
  transition:all .3s;
}
.nav.scrolled{height:54px;box-shadow:0 1px 12px rgba(15,23,42,.06)}
.nav-logo{display:flex;align-items:center;gap:9px;cursor:pointer;flex-shrink:0}
.nav-links{display:flex;list-style:none;gap:2px;margin-left:28px}
.nav-link{
  font-size:13px;font-weight:700;color:var(--text-body);
  padding:8px 16px;border-radius:12px;transition:all .2s;cursor:pointer;
  border:1px solid rgba(14,165,233,.14);background:linear-gradient(135deg,rgba(14,165,233,.08),rgba(255,255,255,.02));
  box-shadow:0 4px 14px rgba(15,23,42,.04);
}
.nav-link:hover,.nav-link.active{color:var(--brand-primary-strong);border-color:rgba(14,165,233,.26);background:linear-gradient(135deg,rgba(14,165,233,.12),rgba(56,189,248,.05));transform:translateY(-1px)}
.nav-right{display:flex;align-items:center;gap:10px;margin-left:auto;flex-shrink:0}
.nav-ghost{
  font-size:13px;font-weight:700;color:var(--brand-primary-strong);
  background:linear-gradient(135deg,rgba(14,165,233,.14),rgba(56,189,248,.08));
  border:1px solid rgba(14,165,233,.24);padding:8px 18px;border-radius:12px;cursor:pointer;
  transition:all .2s;box-shadow:0 8px 22px rgba(14,165,233,.12);
}
.nav-ghost:hover{border-color:rgba(14,165,233,.38);color:var(--brand-primary);transform:translateY(-1px);box-shadow:0 12px 28px rgba(14,165,233,.18)}
.nav-cta{
  font-size:13px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--brand-primary),var(--brand-primary-strong));
  border:none;padding:9px 22px;border-radius:12px;cursor:pointer;transition:all .22s;
  box-shadow:0 6px 18px rgba(14,165,233,.26),0 0 0 1px rgba(14,165,233,.08);
}
.nav-cta:hover{background:linear-gradient(135deg,var(--brand-primary-strong),#0369A1);transform:translateY(-1px);box-shadow:0 10px 24px rgba(14,165,233,.34)}
@media(max-width:860px){.nav{padding:0 20px}}

/* Use shared nav shell, disable uploaded topbar wrapper chrome */
.topbar{background:transparent;border-bottom:none;backdrop-filter:none}
.topbar-inner{max-width:none;margin:0;padding:0;display:block}
.brand,.topbar-cta{display:none!important}
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

<!-- NAV -->
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

<!-- =================== COCKPIT STRIP (PINNED) =================== -->
<div class="cockpit">
  <div class="cockpit-inner">
    <div class="cockpit-left">
      <div class="cockpit-status-dot"></div>
      <div class="cockpit-status-text">All systems <strong>nominal</strong></div>
      <div class="cockpit-stat">
        <span class="cockpit-stat-label">Agents</span>
        <span class="cockpit-stat-value" id="agentCount">13/13</span>
      </div>
      <div class="cockpit-stat">
        <span class="cockpit-stat-label">Approvals</span>
        <span class="cockpit-stat-value" id="apprCount">4</span>
      </div>
      <div class="cockpit-stat">
        <span class="cockpit-stat-label">Latency</span>
        <span class="cockpit-stat-value" id="latency">142ms</span>
      </div>
    </div>
    <div class="cockpit-agents" id="agentGrid"></div>
    <div class="cockpit-right">
      <div class="tick-feed">
        <span class="tick-arrow">›</span>
        <span class="tick-text" id="tickText">Atlas synced 412 records from Salesforce</span>
      </div>
    </div>
  </div>
</div>

<!-- =================== HERO =================== -->
<section class="hero" id="hero">
  <div class="hero-eyebrow">Help Centre · v3.0</div>
  <h1 class="hero-title">A help centre that <em>thinks with you</em>, not at you.</h1>
  <p class="hero-sub">Tell us what you're working on. Three short questions narrow sixty-four articles down to the one that answers you — with the exact configuration steps, the rollback path, and where in the cockpit to find it.</p>

  <!-- ====== DIAGNOSTIC (FULL WIDTH) ====== -->
  <div class="diag">
    <div class="diag-head">
      <div class="diag-label">Diagnostic</div>
      <button class="diag-reset" onclick="resetDiag()">↺ Restart</button>
    </div>
    <div class="diag-title">What brings you here?</div>
    <div class="diag-sub">Three quick questions. We'll route you to the right answer — and surface the steps inline.</div>
    <div class="diag-trail" id="diagTrail"></div>
    <div class="diag-step" id="diagStep"></div>
  </div>
</section>

<!-- =================== SEARCH =================== -->
<section class="search-wrap" id="search">
  <div class="search-bar">
    <span class="search-icon">⌕</span>
    <input type="text" id="searchInput" placeholder="Search across 64 articles — try 'reset approval threshold' or 'why did my agent flag'…" oninput="runSearch(this.value)">
    <span class="search-shortcut">⌘ K</span>
    <button class="search-go" onclick="runSearch(document.getElementById('searchInput').value, true)">Search</button>
  </div>
  <div class="search-results" id="searchResults"></div>
</section>

<!-- =================== BROWSE BY CATEGORY =================== -->
<section class="browse" id="browse">
  <div class="section-head">
    <div>
      <div class="section-eyebrow">Browse by category</div>
      <h2 class="section-title">Eight rooms, sixty-four answers</h2>
    </div>
    <p class="section-sub">Articles are sorted by what you're trying to do, not by which team wrote them. Click any card to filter the library below.</p>
  </div>
  <div class="cat-grid" id="catGrid"></div>
</section>

<!-- =================== FILTERS =================== -->
<section class="filters" id="filters">
  <div class="section-head" style="margin-bottom:8px">
    <div>
      <div class="section-eyebrow">Refine the library</div>
      <h2 class="section-title">Filter by role and journey</h2>
    </div>
    <p class="section-sub">Stack filters to narrow the library to articles that match your role and where you are in the journey.</p>
  </div>
  <div class="filter-row">
    <div class="filter-label">Role</div>
    <div class="fchips" id="roleChips"></div>
    <button class="filter-clear" onclick="clearFilter('role')">Clear roles</button>
  </div>
  <div class="filter-row">
    <div class="filter-label">Journey</div>
    <div class="fchips" id="journeyChips"></div>
    <button class="filter-clear" onclick="clearFilter('journey')">Clear journey</button>
    <div class="filter-summary" id="filterSummary"><strong id="filterCount">64</strong> articles match</div>
  </div>
</section>

<!-- =================== ARTICLE GRID =================== -->
<section class="articles" id="articles">
  <div class="section-head" style="margin-bottom:18px">
    <div>
      <div class="section-eyebrow">Library</div>
      <h2 class="section-title" id="libTitle">All articles</h2>
    </div>
    <button class="btn-ghost" onclick="clearAllFilters()">↺ Reset all filters</button>
  </div>
  <div class="art-grid" id="artGrid"></div>
</section>

<!-- =================== MODAL =================== -->
<div class="modal-bg" id="modalBg" onclick="if(event.target===this)closeModal()">
  <div class="modal" id="modal">
    <button class="modal-close" onclick="closeModal()" aria-label="Close">×</button>
    <div class="modal-nav" id="modalNav">
      <button class="modal-back" id="modalBack" onclick="popArticle()">
        <span class="modal-back-icon">←</span><span>Back</span>
      </button>
      <div class="modal-crumbs" id="modalCrumbs"></div>
    </div>
    <div class="modal-body" id="modalBody"></div>
  </div>
</div>

<!-- =================== FOOTER =================== -->
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
/* ============================================================
   ARTICLE DATA — 64 articles, hybrid taxonomy
   ============================================================ */
const CATEGORIES = {
  approvals:    {name:"Approvals",    color:"var(--gold)",        tint:"rgba(185,142,46,.10)",  icon:"AP", desc:"Routing, thresholds, queues, and audit-friendly approval workflows."},
  agents:       {name:"Agents",       color:"var(--teal)",        tint:"rgba(15,118,110,.10)",  icon:"AG", desc:"How the 13 specialised agents work, configure, fail over, and learn."},
  audit:        {name:"Audit",        color:"var(--sky)",         tint:"rgba(3,105,161,.10)",   icon:"AU", desc:"Tamper-evident logs, exports, retention, and regulator-ready reports."},
  roles:        {name:"Roles",        color:"var(--violet)",      tint:"rgba(91,33,182,.10)",   icon:"RB", desc:"Role-based access, SSO mapping, custom roles, and break-glass."},
  integrations: {name:"Integrations", color:"var(--coral)",       tint:"rgba(185,28,28,.10)",   icon:"IN", desc:"Slack, Salesforce, NetSuite, webhooks, warehouses, and custom connectors."},
  deployment:   {name:"Deployment",   color:"var(--navy)",        tint:"rgba(31,78,121,.10)",   icon:"DP", desc:"Cloud, on-prem, networking, residency, upgrades, and disaster recovery."},
  data:         {name:"Data",         color:"var(--gold-deep)",   tint:"rgba(142,106,30,.10)",  icon:"DT", desc:"Encryption, retention, PII, BYOK, exports, and deletion."},
  billing:      {name:"Billing",      color:"var(--emerald)",     tint:"rgba(4,120,87,.10)",    icon:"BL", desc:"Plans, invoices, usage, taxes, payment methods, and changes."}
};

const ROLES = {
  founder:    {name:"Founder",    color:"var(--gold)"},
  ops:        {name:"Ops Lead",   color:"var(--teal)"},
  engineer:   {name:"Engineer",   color:"var(--sky)"},
  compliance: {name:"Compliance", color:"var(--violet)"}
};

const JOURNEYS = {
  "getting-started": {name:"Getting started"},
  "daily-ops":       {name:"Daily operations"},
  "scaling":         {name:"Scaling up"},
  "troubleshooting": {name:"Troubleshooting"},
  "reference":       {name:"Reference"}
};

const ARTICLES = [
/* ---------- APPROVALS (8) ---------- */
{slug:"appr-overview", title:"How approvals work in Antarious", category:"approvals", roles:["founder","ops","compliance"], journey:"getting-started",
 summary:"Every action above your threshold pauses for human review. This is the spine of how Antarious stays trustworthy.",
 body:[
  "Antarious is built on the principle that AI agents should never act unilaterally on consequential actions. Every operation is scored against your configured thresholds, and anything that exceeds them lands in an approval queue for a human reviewer.",
  "Approvals carry full context: the agent that proposed the action, the trigger that surfaced it, the data it read, and a one-line justification. Reviewers can approve, reject, or send it back with a comment that becomes part of the audit trail.",
  "Approvals are not a brake — they're how the agents earn trust. Once an approver routinely greenlights a class of action, you can graduate it to an auto-approve rule, with a guardrail that flags drift."
 ],
 bullets:[
  "Default threshold: any action with downstream financial, customer-facing, or data-modification impact above $0.",
  "Reviewers see the full reasoning trace, not just the outcome.",
  "Rejected actions feed back into agent training within 24 hours.",
  "Audit log captures who approved, when, and why."
 ],
 related:["appr-thresholds","appr-chains","appr-auto","audit-overview"]},

{slug:"appr-thresholds", title:"Setting approval thresholds", category:"approvals", roles:["ops","compliance"], journey:"getting-started",
 summary:"Tune what counts as 'consequential' for your team. Thresholds can vary by category, amount, recipient, or risk score.",
 body:[
  "Thresholds live in Settings → Approvals → Thresholds. The default policy holds every agent action at zero, meaning any non-trivial operation requires sign-off until you choose otherwise.",
  "You can scope thresholds three ways: by category (e.g. financial transactions, data exports, external messaging), by counterparty (e.g. always pause for new vendors), or by risk score (each agent assigns one).",
  "Most teams start strict, then loosen specific rules as confidence builds. We recommend reviewing thresholds monthly for the first quarter."
 ],
 bullets:[
  "Stack rules — narrowest match wins.",
  "Use 'shadow mode' to test a relaxed threshold without acting on it.",
  "Set quiet hours: route approvals to backup approvers off-hours.",
  "Threshold history is itself audit-logged."
 ],
 related:["appr-overview","appr-auto","appr-routing","roles-overview"]},

{slug:"appr-chains", title:"Multi-level approval chains", category:"approvals", roles:["ops","compliance","founder"], journey:"scaling",
 summary:"Two-eyes, four-eyes, sequential, or parallel — model your real org.",
 body:[
  "Chain rules let you require multiple approvers for high-stakes actions. A two-eyes policy needs any two approvers; four-eyes needs two from distinct roles. Sequential chains step through approvers in order; parallel chains poll all at once.",
  "You can mix tiers: e.g. anything over $10k requires the team lead, anything over $100k requires both the team lead and finance. Antarious notifies each approver in their preferred channel and surfaces SLA timers.",
  "If a chain stalls beyond its SLA, escalation rules promote the request to the next tier or a designated fallback."
 ],
 bullets:[
  "Templates: two-eyes, four-eyes, board-grade, regulator-grade.",
  "Distinct-role enforcement: same person can't approve twice.",
  "SLA timers in minutes, hours, or business days.",
  "Escalation paths are themselves auditable."
 ],
 related:["appr-overview","appr-thresholds","appr-delegate","roles-overview"]},

{slug:"appr-auto", title:"Auto-approve rules and guardrails", category:"approvals", roles:["ops"], journey:"scaling",
 summary:"Graduate trusted actions into auto-approval — but keep a tripwire.",
 body:[
  "When you've approved 50+ instances of the same kind of action without amendment, Antarious suggests an auto-approve rule. You can accept, reject, or scope it more narrowly.",
  "Every auto-approve rule comes with a guardrail: a drift detector that compares each new instance against the historical pattern and pauses if anything looks unusual. The guardrail is not optional.",
  "Auto-approved actions are still fully audited, with an extra flag indicating they were auto-routed and which rule fired."
 ],
 bullets:[
  "Suggestions appear in Settings → Approvals → Suggestions.",
  "Guardrail thresholds: amount drift, frequency drift, recipient drift.",
  "Auto-approve can be paused globally with one click.",
  "Daily digest shows what was auto-approved and why."
 ],
 related:["appr-overview","appr-thresholds","appr-audit","agents-overview"]},

{slug:"appr-routing", title:"Approval routing by category, amount, or recipient", category:"approvals", roles:["ops","compliance"], journey:"daily-ops",
 summary:"Send the right approval to the right reviewer, without manual triage.",
 body:[
  "Routing rules decide who sees what. They evaluate top-down, first-match-wins, and can dispatch to individuals, groups, channels, or the on-call rotation.",
  "Common patterns: route financial actions to finance, customer-facing actions to the relevant account owner, data exports to security. Anything unmatched falls through to the global default reviewer pool.",
  "When a reviewer is OOO, routing automatically falls back to their delegate, with the substitution recorded in the audit log."
 ],
 bullets:[
  "Match on agent, action type, amount, counterparty, tags, or risk score.",
  "Send via Slack, Teams, email, mobile push, or all four.",
  "Routing rules can themselves require approval to change.",
  "Use the Routing Simulator to dry-run a rule before activating."
 ],
 related:["appr-overview","appr-chains","appr-delegate","int-slack"]},

{slug:"appr-queue", title:"Reviewing the approvals queue", category:"approvals", roles:["ops","founder"], journey:"daily-ops",
 summary:"How to triage 50 approvals in 10 minutes without losing context.",
 body:[
  "The queue groups by urgency, agent, and category. Use keyboard shortcuts (J/K to move, A to approve, R to reject, ? for full list) to clear it fast.",
  "Each item shows the agent's reasoning, the inputs it considered, and a confidence score. You can expand to see the full chain, or hover to preview without committing.",
  "Bulk actions: select multiple low-risk items and approve in one stroke. Antarious will require you to type 'I have reviewed each' before processing more than 20.",
  "Filters persist per user, so your queue view stays consistent across sessions."
 ],
 bullets:[
  "Saved filter presets — e.g. 'urgent, financial, my team'.",
  "Snooze items for up to 24h with a required reason.",
  "Comment on rejection — the agent learns from it.",
  "Mobile push notifications for urgent items."
 ],
 related:["appr-overview","appr-thresholds","audit-search","agents-flagged"]},

{slug:"appr-audit", title:"Approval audit trail", category:"approvals", roles:["compliance","ops"], journey:"reference",
 summary:"Every approval, rejection, comment, and rule change — captured permanently.",
 body:[
  "The approval audit trail is a write-once log of every decision made in your tenant. Each entry records the actor, the timestamp (signed), the action, and the full input/output snapshot.",
  "The trail is tamper-evident: each entry links cryptographically to the previous one. If anyone tampered with a record, the chain breaks and it's flagged automatically.",
  "Auditors and regulators can be granted scoped, read-only access — they see the trail but nothing else in your tenant."
 ],
 bullets:[
  "Retention: 7 years by default, configurable up to 25.",
  "Export to CSV, JSON, or signed PDF.",
  "Cryptographic verification command exposed via API.",
  "Read-only auditor accounts available."
 ],
 related:["audit-overview","audit-export","audit-tamper","appr-overview"]},

{slug:"appr-delegate", title:"Delegating approvals when out of office", category:"approvals", roles:["ops","founder"], journey:"daily-ops",
 summary:"Hand approval authority to a colleague for a window — never your account, just the authority.",
 body:[
  "Delegation gives a colleague your approval rights for a defined window. They never see your account or any other data — only the queue items they're delegated to handle.",
  "Set a date range, a category scope, and (optionally) a maximum amount. The delegate gets a notification and a one-click acceptance.",
  "Every delegated approval is double-tagged: the delegate's name appears alongside yours in the audit log, with a clear 'acting on behalf of' annotation."
 ],
 bullets:[
  "Recurring delegation: e.g. every Friday afternoon.",
  "Compliance-grade trail of who approved on whose behalf.",
  "Delegate cannot re-delegate.",
  "Revoke delegation in one click."
 ],
 related:["appr-routing","appr-chains","roles-overview","appr-overview"]},

/* ---------- AGENTS (8) ---------- */
{slug:"agents-overview", title:"The 13 specialised agents at a glance", category:"agents", roles:["founder","ops","engineer"], journey:"getting-started",
 summary:"Atlas, Lyra, Orion, Vega, Nova, Theta, Iris, Rhea, Helios, Pyx, Cetus, Draco, Phoenix — what each one does.",
 body:[
  "Antarious deploys 13 specialised agents, each with a defined scope. They are not generalist chatbots — every agent has a narrow domain, its own toolset, and clear handoff rules to the others.",
  "The agents collaborate through a shared message bus. When Atlas (data sync) finishes pulling records, it pings Lyra (data quality) automatically. Lyra surfaces anomalies to Iris (operations), who decides whether to escalate to a human or self-heal.",
  "You can pause, scope, or audit any agent independently. Agents inherit your tenant-level approval thresholds — they can never bypass them."
 ],
 bullets:[
  "Atlas — sync between systems · Lyra — data quality · Orion — approvals · Vega — billing & finance",
  "Nova — customer comms · Theta — scheduling · Iris — operations · Rhea — research · Helios — exec briefings",
  "Pyx — security & access · Cetus — integrations · Draco — incident response · Phoenix — reconciliation",
  "Each agent reports to the cockpit; click any dot at the top of the page to see its current state."
 ],
 related:["agents-capabilities","agents-pause","agents-flagged","agents-failover"]},

{slug:"agents-capabilities", title:"Agent capabilities and limits", category:"agents", roles:["engineer","ops"], journey:"reference",
 summary:"What each agent can read, write, and decide — and what is permanently off-limits.",
 body:[
  "Each agent ships with a capability manifest: the tools it can call, the systems it can read from, the systems it can write to, and the actions it cannot perform under any circumstance.",
  "Capabilities are scoped narrowly. Atlas can read CRM contacts but cannot read HR data. Vega can issue invoices but cannot move funds between accounts. The capability matrix is visible in Settings → Agents → Capabilities.",
  "Capabilities can be tightened by an admin but never widened by the agent itself, even via clever prompting. Attempts to escalate are logged and surfaced to security."
 ],
 bullets:[
  "Capability changes require admin approval and are audit-logged.",
  "Each agent has a hard 'never' list that no setting can override.",
  "Agents cannot grant themselves access to new tools.",
  "Capability reviews are recommended quarterly."
 ],
 related:["agents-overview","agents-pause","roles-overview","data-pii"]},

{slug:"agents-pause", title:"Pausing or disabling an agent", category:"agents", roles:["ops","engineer"], journey:"troubleshooting",
 summary:"Pause for an hour, a day, or indefinitely. The cockpit reflects the change instantly.",
 body:[
  "If an agent is misbehaving or needs maintenance, pause it from the cockpit (click the agent dot, then 'Pause'). You can pause for a fixed window or indefinitely.",
  "Paused agents stop accepting new work but preserve in-flight tasks gracefully — they finish what they've started, then halt. Other agents that depend on them route around the gap if possible.",
  "Disabling is harder: it requires an admin and logs a reason. Disabled agents drop in-flight tasks to the dead-letter queue for review."
 ],
 bullets:[
  "Pause is reversible; disable is not without an admin.",
  "Paused agents send a heads-up to dependent agents.",
  "Dead-letter queue retains data for 30 days.",
  "Use 'Pause + drain' for a clean shutdown."
 ],
 related:["agents-overview","agents-flagged","agents-failover","agents-logs"]},

{slug:"agents-logs", title:"Reading agent activity logs", category:"agents", roles:["engineer","compliance"], journey:"troubleshooting",
 summary:"Every action, every reasoning step, every input considered — log-grep your way to root cause.",
 body:[
  "Activity logs capture five layers: trigger, inputs, reasoning trace, tools called, and outcome. They're queryable by agent, time window, status, and free-text.",
  "Reasoning traces are the most valuable layer for debugging. They show what the agent considered, what it ruled out, and why. Traces are kept for 30 days by default, longer for actions that triggered approvals.",
  "Logs export to your SIEM via Cetus (the integrations agent), or download as JSON for offline analysis."
 ],
 bullets:[
  "Filter syntax: agent:atlas status:flagged after:7d",
  "Reasoning traces are included in approval audit records.",
  "Logs are immutable once written.",
  "Search returns up to 10,000 hits; refine for more."
 ],
 related:["agents-overview","audit-search","audit-overview","agents-flagged"]},

{slug:"agents-config", title:"Custom agent configuration", category:"agents", roles:["engineer","ops"], journey:"scaling",
 summary:"Tune temperature, allowed tools, retry policy, and escalation rules per agent.",
 body:[
  "Each agent exposes a configuration profile: model temperature, tool allowlist, retry policy, escalation thresholds, and prompt prefix. Changes apply immediately and are versioned.",
  "Most teams leave defaults in place. Common customisations: tightening temperature for compliance-sensitive agents, expanding the tool allowlist for engineering, and adjusting escalation to match the org chart.",
  "Bad configurations can be rolled back with one click — every config change is a discrete revision."
 ],
 bullets:[
  "Config diff view shows exactly what changed and who changed it.",
  "Test changes in 'shadow mode' before promoting to production.",
  "Templates: conservative, balanced, exploratory.",
  "Per-agent config can be overridden by tenant-wide policy."
 ],
 related:["agents-capabilities","agents-failover","agents-overview","deploy-upgrade"]},

{slug:"agents-failover", title:"Agent failover and redundancy", category:"agents", roles:["engineer","ops"], journey:"scaling",
 summary:"Each agent runs primary + warm secondary. If the primary stalls, the secondary takes over within seconds.",
 body:[
  "Agents are deployed in primary/secondary pairs. The primary handles all live traffic; the secondary mirrors state and is ready to take over within five seconds if the primary becomes unhealthy.",
  "Failover is automatic and transparent — your dashboards keep working, and in-flight approvals are not lost. The cockpit logs the failover event but does not interrupt your session.",
  "If both fail, the agent enters degraded mode: it accepts no new work, holds existing work, and pages the on-call team."
 ],
 bullets:[
  "Failover detection: heartbeat + health probe, every 2s.",
  "RTO under 5s, RPO under 1s for agent state.",
  "Read-only standby in a second region for cross-region resilience.",
  "Quarterly failover drills run automatically."
 ],
 related:["agents-overview","deploy-dr","deploy-upgrade","agents-pause"]},

{slug:"agents-flagged", title:"Why an agent flagged for review", category:"agents", roles:["ops","compliance"], journey:"troubleshooting",
 summary:"When an agent stops and asks for help, it's a feature — not a failure. Read the reasoning, decide, move on.",
 body:[
  "Agents flag when they hit any of: an approval threshold, a confidence floor, a capability limit, or a pre-set rule (e.g. 'always flag exports of 1k+ rows'). The flag is not an error — it's the safety mechanism working.",
  "Each flag carries: the trigger, the agent's confidence, what it considered, and a recommended action. Most flags resolve in under 30 seconds: read, decide, move on.",
  "Frequent flags from the same agent on similar inputs are a signal to either widen the agent's capability or train it on more examples."
 ],
 bullets:[
  "Flag dashboard groups recurrent patterns.",
  "Resolve a flag with approve, reject, or amend.",
  "Comments on flags become training signal.",
  "Flag rate per agent is a top-line health metric."
 ],
 related:["appr-overview","agents-overview","agents-logs","agents-config"]},

{slug:"agents-add", title:"Adding a new agent role", category:"agents", roles:["engineer","founder"], journey:"scaling",
 summary:"Custom agents extend the 13 — for your unique workflow.",
 body:[
  "If your workflow doesn't map cleanly to the 13 default agents, you can add a custom agent. They run on the same infrastructure, inherit the same audit and approval rules, and live in the cockpit alongside the others.",
  "Custom agents start from one of three templates: read-only analyst, action-taking operator, or conversational assistant. From there you define scope, tools, escalation, and the approval categories the agent inherits.",
  "Custom agents are isolated in their own VM until you promote them. Promotion requires a security review and an admin sign-off."
 ],
 bullets:[
  "Maximum 10 custom agents per tenant on Standard, unlimited on Enterprise.",
  "Custom agent IDs are namespaced under your tenant.",
  "All custom agents are subject to the tenant-level capability matrix.",
  "Antarious can review your design before promotion if you ask."
 ],
 related:["agents-overview","agents-config","deploy-upgrade","int-custom"]},

/* ---------- AUDIT (8) ---------- */
{slug:"audit-overview", title:"What's recorded in your audit log", category:"audit", roles:["compliance","engineer","founder"], journey:"getting-started",
 summary:"Every action, every approval, every config change — written once, signed, and replayable.",
 body:[
  "The audit log is the single source of truth for everything that happened in your Antarious tenant. It records user actions, agent actions, approvals, rejections, configuration changes, role assignments, and system events.",
  "Each entry is signed at write time. The signatures form a hash chain, so any tampering breaks the chain and is detectable instantly. The log is write-once, append-only, and never editable — even by admins.",
  "Logs are queryable through the UI, the API, or your SIEM via the Cetus integration."
 ],
 bullets:[
  "Default retention: 7 years. Configurable up to 25 years on Enterprise.",
  "Standard fields: timestamp, actor, action, target, before/after snapshot, IP, session.",
  "Cryptographic verification CLI: antarious audit verify <range>.",
  "Logs survive tenant deletion (held in escrow per contract)."
 ],
 related:["audit-search","audit-export","audit-tamper","appr-audit"]},

{slug:"audit-search", title:"Searching the audit trail", category:"audit", roles:["compliance","engineer"], journey:"daily-ops",
 summary:"Filter, free-text, regex, time-window. The query language is small but powerful.",
 body:[
  "Search supports a compact filter syntax: actor:alice action:approve target:invoice category:financial after:2026-01-01. Filters can be combined and inverted (NOT actor:alice).",
  "Free-text search runs across action narratives and comment fields. Regex is allowed but throttled. For very large windows, use the export-then-grep workflow described in 'Exporting audit logs'.",
  "Saved searches let you replay an investigation. Every search is itself audit-logged with the actor and the query."
 ],
 bullets:[
  "Operators: AND, OR, NOT, parentheses, =, !=, ~, in().",
  "Time windows: absolute (2026-01-01..2026-02-01), relative (last 7d), or named (this-quarter).",
  "Up to 50,000 results per query; refine to narrow further.",
  "Search history retained for 90 days."
 ],
 related:["audit-overview","audit-export","appr-audit","audit-investigate"]},

{slug:"audit-export", title:"Exporting audit logs for compliance", category:"audit", roles:["compliance"], journey:"reference",
 summary:"CSV, JSON, signed PDF, or direct SIEM stream — pick what your auditor expects.",
 body:[
  "Exports are scoped: define a time window, the actors or actions you care about, and the format. The export job runs in the background; you'll be notified by email when it's ready.",
  "Signed PDF is the regulator-friendly format — each page carries the cryptographic signature and a verification URL. CSV/JSON are best for ingestion into your own tooling.",
  "Direct SIEM streaming via Cetus is the lowest-friction option for ongoing compliance: events forward in near-real-time to Splunk, Datadog, or your warehouse."
 ],
 bullets:[
  "Export size limit: 10GB per job, run multiple jobs for larger windows.",
  "Exports are themselves audit-logged.",
  "Signed PDFs are tamper-evident — opening in any PDF reader works.",
  "SIEM stream uses TLS 1.3 and your tenant-specific signing key."
 ],
 related:["audit-overview","audit-search","audit-retention","int-warehouse"]},

{slug:"audit-retention", title:"Audit retention and archival", category:"audit", roles:["compliance"], journey:"reference",
 summary:"7 years default, 25 max, configurable per record class. Pre-archive logs are queryable; archived ones are restorable.",
 body:[
  "Retention is set per record class (approvals, agent actions, config changes, etc.). The default is 7 years for everything, which covers most regulatory requirements (SOX, GDPR, HIPAA).",
  "After retention expires, records move to cold archive. They remain restorable for an additional grace period (180 days), after which they are permanently deleted with a tombstone left in the active log.",
  "Some record classes have legally enforced minimums (e.g. financial: 7 years for SOX). Antarious will block any setting that violates these."
 ],
 bullets:[
  "Cold archive: cheaper storage, queryable with 24h SLA.",
  "Permanent deletion is logged with a tombstone for audit.",
  "Per-class minimums are enforced based on detected jurisdiction.",
  "Legal hold pauses deletion entirely."
 ],
 related:["audit-overview","audit-export","data-retention","audit-overview"]},

{slug:"audit-tamper", title:"Tamper-evident logging explained", category:"audit", roles:["compliance","engineer"], journey:"reference",
 summary:"How the hash chain works, why it matters, and how to verify integrity yourself.",
 body:[
  "Each audit entry includes the SHA-256 of itself plus the previous entry's hash. The chain is anchored hourly to a public timestamping service (RFC 3161) and weekly to a permissioned blockchain.",
  "If anyone — including Antarious staff — modifies a past entry, the hashes diverge from that point forward and any verification breaks. The break is flagged by the integrity monitor within minutes.",
  "You can verify integrity yourself with the CLI tool, or have your auditor do so. The verification process needs only your tenant's public key."
 ],
 bullets:[
  "Verification command: antarious audit verify --range last-30d",
  "Public anchors: opentimestamps.org + private blockchain.",
  "Even a single-character change breaks verification.",
  "Antarious cannot fix a broken chain — you'll be informed and asked how to proceed."
 ],
 related:["audit-overview","audit-investigate","audit-overview","data-keys"]},

{slug:"audit-siem", title:"Audit log integrations (SIEM)", category:"audit", roles:["engineer","compliance"], journey:"scaling",
 summary:"Stream events to Splunk, Datadog, Sumo, Elastic, or your warehouse — in near-real-time.",
 body:[
  "Cetus, the integrations agent, can forward audit events to your SIEM continuously. Latency from event to SIEM is typically under 30 seconds.",
  "Setup is two steps: add a SIEM destination in Settings → Integrations → SIEM, paste the credentials, and pick the event classes to forward. Common patterns: forward all approvals, all agent flags, and all role changes.",
  "Forwarded events keep their cryptographic signatures, so you can verify integrity in your SIEM without round-tripping back to Antarious."
 ],
 bullets:[
  "Supported targets: Splunk, Datadog, Sumo Logic, Elastic, Snowflake, BigQuery, S3, Azure Log Analytics.",
  "Schema docs: docs.antarious.com/audit-schema",
  "Replay last N days on demand if your SIEM was down.",
  "Sampling allowed but discouraged — most teams forward 100%."
 ],
 related:["audit-export","audit-overview","int-warehouse","int-custom"]},

{slug:"audit-investigate", title:"Investigating a flagged event", category:"audit", roles:["compliance","engineer"], journey:"troubleshooting",
 summary:"From a single anomaly to a full timeline in three queries.",
 body:[
  "Start with the flagged record's ID. Pull its full reasoning trace, then pivot on the actor, the target, and the session — those three pivots usually surface adjacent activity.",
  "Use the timeline view (Audit → Investigate → Timeline) to lay everything out chronologically. Bookmark the timeline; it's stable and shareable with auditors.",
  "If the investigation needs to extend beyond your tenant's logs (for example, into Slack or Salesforce), Cetus can pull correlating events from those systems on demand."
 ],
 bullets:[
  "Pivots: actor, target, session, IP, agent, time window.",
  "Timeline supports up to 10,000 events.",
  "Annotated timelines are exportable as a signed PDF.",
  "Investigations are themselves audit-logged."
 ],
 related:["audit-search","audit-overview","agents-flagged","appr-audit"]},

{slug:"audit-reports", title:"Audit reports for board, regulators, and customers", category:"audit", roles:["compliance","founder"], journey:"reference",
 summary:"Pre-built templates for common reporting needs: SOC 2, board pack, customer DPA, regulator response.",
 body:[
  "Antarious ships pre-built report templates that pull directly from the audit log: SOC 2 Type II evidence, ISO 27001 controls, GDPR Article 30 records, board oversight summaries, and customer Data Processing Agreement (DPA) evidence packs.",
  "Each template renders to a signed PDF with embedded evidence — no manual screenshotting, no copy-paste errors. Templates accept parameters (e.g. customer name, reporting period) and remember your last run.",
  "If you need a custom template, the report builder accepts a YAML spec; common customisations are answered in the template gallery."
 ],
 bullets:[
  "Run on demand or schedule (monthly, quarterly, annually).",
  "Reports inherit the signing chain — auditors trust the artefact.",
  "Custom templates can be reviewed by Antarious before first use.",
  "Report runs are themselves audit-logged."
 ],
 related:["audit-export","audit-overview","audit-overview","data-export"]},

/* ---------- ROLES (8) ---------- */
{slug:"roles-overview", title:"Role-based access control overview", category:"roles", roles:["compliance","engineer","ops"], journey:"getting-started",
 summary:"Roles bundle permissions; people get roles. The whole model is auditable and reversible.",
 body:[
  "Antarious uses RBAC: a role is a named bundle of permissions, and a user gets one or more roles. Permissions are fine-grained — read/write/execute on each resource and each agent.",
  "Default roles cover most needs out of the box: Admin, Approver, Reviewer, Engineer, Compliance, Read-only, Auditor, and Service. Custom roles fill in the gaps.",
  "Every role assignment, change, and revocation is audit-logged. Roles can be time-bound (e.g. for a contractor) and tied to SSO group membership."
 ],
 bullets:[
  "Permissions are inheritable — Admin includes Approver includes Reviewer.",
  "Roles never grant retroactive access (logs can't be re-read because of a role change).",
  "Service accounts have their own role family.",
  "Quarterly role review reminders built in."
 ],
 related:["roles-default","roles-custom","roles-sso","roles-review"]},

{slug:"roles-default", title:"Default roles and permissions", category:"roles", roles:["engineer","compliance"], journey:"reference",
 summary:"What each default role sees, does, and cannot do.",
 body:[
  "Default roles are designed to cover 90% of usage with zero configuration. Admin can configure everything except billing. Approver can review and approve queue items in their assigned categories. Reviewer can read approval queues and comment but not approve.",
  "Engineer covers integration setup, agent configuration, and read access to logs. Compliance covers audit search, exports, retention, and read access to everything except live data. Read-only is exactly what it sounds like.",
  "Auditor is special: external read-only access scoped to the audit log only. Service is for non-human accounts (CI, automations) with action-but-not-config access."
 ],
 bullets:[
  "Admin cannot grant themselves Billing rights — that's separated.",
  "Approver can be scoped by category or by amount.",
  "Compliance cannot delete or modify records.",
  "Service accounts must rotate credentials every 90 days."
 ],
 related:["roles-overview","roles-custom","roles-sso","data-pii"]},

{slug:"roles-custom", title:"Creating a custom role", category:"roles", roles:["engineer","compliance"], journey:"scaling",
 summary:"Compose permissions from the catalogue, save, assign. Three minutes for the common cases.",
 body:[
  "Custom roles are built from a permission catalogue (about 240 fine-grained permissions). The role builder shows what the role can and cannot do as you toggle each permission, and warns about combinations that are unsafe.",
  "Common patterns: 'Finance Approver' (approve only financial, up to $50k), 'External Auditor' (read-only audit log for the last quarter), 'Vendor Manager' (read CRM, comment on approvals).",
  "Custom roles can be reviewed and approved by an admin before first assignment, depending on your tenant's settings."
 ],
 bullets:[
  "Start from a default role to save time.",
  "Test a custom role by assigning to a test user first.",
  "Custom role changes propagate within 60 seconds.",
  "Antarious flags risky combinations (e.g. read+delete on audit)."
 ],
 related:["roles-overview","roles-default","roles-sso","audit-overview"]},

{slug:"roles-assign", title:"Assigning and revoking roles", category:"roles", roles:["ops","engineer"], journey:"daily-ops",
 summary:"One person, multiple roles, optional time bounds. Revocation takes effect within a minute.",
 body:[
  "Assign roles in Settings → People → [user] → Roles. You can assign multiple roles per user — permissions are unioned, never intersected.",
  "Time-bound assignments (e.g. for a 2-week contractor) auto-expire and surface a notification a week before. They cannot be silently extended; an extension is a new assignment with its own audit trail.",
  "Revocation is immediate: within 60 seconds, the user's session refreshes and they lose access. In-flight actions are completed; new ones are blocked."
 ],
 bullets:[
  "Bulk assign via CSV or SCIM.",
  "Revocation pauses any in-flight actions over the user's threshold.",
  "Reactivation requires a fresh assignment.",
  "Self-revocation is supported for short-lived elevations."
 ],
 related:["roles-overview","roles-sso","roles-review","roles-emergency"]},

{slug:"roles-sso", title:"SSO and role mapping", category:"roles", roles:["engineer"], journey:"getting-started",
 summary:"Map your IdP groups to Antarious roles once. Updates flow automatically.",
 body:[
  "SSO works with any SAML 2.0 or OIDC provider — Okta, Azure AD, Google, Auth0, JumpCloud, OneLogin, and others. Setup is in Settings → SSO and takes about 15 minutes.",
  "Role mapping is the key step: each IdP group becomes an Antarious role. When a user is added to or removed from a group in your IdP, their roles update in Antarious within 5 minutes via SCIM.",
  "If you don't use SCIM, role updates happen at the user's next login. SCIM is strongly recommended for compliance-grade workflows."
 ],
 bullets:[
  "Just-in-time provisioning supported.",
  "MFA enforcement inherited from your IdP.",
  "SCIM 2.0 for automated provisioning/deprovisioning.",
  "Backup local admin available for SSO outages."
 ],
 related:["roles-overview","deploy-sso","roles-assign","roles-emergency"]},

{slug:"roles-service", title:"Service accounts and machine roles", category:"roles", roles:["engineer"], journey:"scaling",
 summary:"For CI, automations, and other non-humans. Same RBAC, with credential rotation.",
 body:[
  "Service accounts let non-human actors (CI pipelines, scripts, scheduled jobs) interact with Antarious. They use API keys or mTLS certificates rather than SSO.",
  "Service accounts have their own role family — they can be granted action permissions but not configuration permissions, and they cannot create other service accounts.",
  "Credentials must rotate every 90 days. Antarious nags at 60 days, hard-stops the account at 90."
 ],
 bullets:[
  "API keys, mTLS, or workload identity (Spiffe/Spire).",
  "Per-environment scoping (dev, stage, prod).",
  "Rotation is one click; old creds are revocable instantly.",
  "All service-account actions are tagged in audit."
 ],
 related:["roles-overview","int-custom","deploy-network","data-keys"]},

{slug:"roles-emergency", title:"Emergency access and break-glass", category:"roles", roles:["compliance","engineer"], journey:"reference",
 summary:"For when SSO is down or a human can't be reached. Loud, time-bound, audited.",
 body:[
  "Break-glass accounts exist for rare emergencies: SSO outage, regulator demand, data subject access request that can't wait. They are not a regular operations tool.",
  "Activation requires two admins and a written reason. Once activated, the account has elevated access for a hard 4-hour window, after which it auto-revokes regardless of what you do.",
  "Every break-glass session is recorded in fine detail: every keystroke, every API call, every file accessed. Sessions are reviewed by compliance within 24 hours."
 ],
 bullets:[
  "Two-person activation, signed reason required.",
  "Session recording with auto-redaction of secrets.",
  "Auto-revocation at 4 hours, no extension.",
  "Mandatory post-mortem within 5 business days."
 ],
 related:["roles-sso","roles-overview","audit-overview","audit-overview"]},

{slug:"roles-review", title:"Reviewing role assignments quarterly", category:"roles", roles:["compliance"], journey:"reference",
 summary:"Antarious queues a role review every quarter. Confirm, revoke, or scope down — in 30 minutes.",
 body:[
  "Quarterly role reviews are a SOC 2 / ISO 27001 control. Antarious automates the queue: at the start of each quarter, every role assignment is queued for review by the assigning admin.",
  "Review options: confirm, revoke, scope down (e.g. drop a permission), time-bound (e.g. 'only until next review'). The reviewer adds a one-line justification.",
  "If a review is skipped, the assignment auto-revokes after 30 days. The grace period is configurable per tenant."
 ],
 bullets:[
  "Reviews are bundled into a single dashboard for efficiency.",
  "Auto-revocation after grace period — no exceptions.",
  "Reviewer cannot review their own assignments.",
  "Review evidence becomes audit log artefact."
 ],
 related:["roles-overview","audit-overview","audit-overview","roles-assign"]},

/* ---------- INTEGRATIONS (8) ---------- */
{slug:"int-slack", title:"Connecting Slack, Teams, and email", category:"integrations", roles:["ops","engineer"], journey:"getting-started",
 summary:"Where your team already works — Antarious shows up there. Approvals, alerts, and Freya summons.",
 body:[
  "Antarious integrates with Slack, Microsoft Teams, and email so approvals and alerts surface in the channel where your team already works. Each integration takes ~5 minutes to set up.",
  "Approvals appear as interactive cards: approve, reject, or open a thread to discuss. Replies feed back into the audit trail. Freya can be summoned in Slack or Teams with a slash command.",
  "Per-channel routing means alerts go where they're useful — security alerts to #sec, billing approvals to #finance, customer-facing communications to your CS channel."
 ],
 bullets:[
  "OAuth setup; no agent install required.",
  "Per-user notification preferences override channel defaults.",
  "Threads and reactions sync to the audit trail.",
  "Email approvals supported via reply-to-approve."
 ],
 related:["int-crm","int-erp","appr-routing","agents-overview"]},

{slug:"int-crm", title:"CRM integrations (Salesforce, HubSpot, Pipedrive)", category:"integrations", roles:["ops","engineer"], journey:"getting-started",
 summary:"Read contacts, write activities, sync opportunities — read-only by default.",
 body:[
  "CRM integrations let agents (especially Atlas, Nova, and Helios) read your customer data, write back activities, and surface opportunities to humans. Default mode is read + write activities, but never edit deal stages without an approval.",
  "Setup is OAuth for Salesforce and HubSpot; API key for Pipedrive. Field mapping is auto-detected with a UI to override; most tenants accept the defaults.",
  "All CRM writes flow through the approval system — no agent silently mutates your CRM."
 ],
 bullets:[
  "Initial sync: ~10 minutes for 100k records.",
  "Bidirectional sync supported; approval required to enable.",
  "Custom objects and custom fields fully supported.",
  "Field-level access controls respected."
 ],
 related:["int-slack","int-erp","int-warehouse","data-pii"]},

{slug:"int-erp", title:"ERP integrations (NetSuite, SAP, Microsoft Dynamics)", category:"integrations", roles:["engineer"], journey:"scaling",
 summary:"Vega and Phoenix talk to your ERP for billing, reconciliation, and finance ops.",
 body:[
  "ERP integrations are deeper than CRM and require more care. The setup process includes a guided field mapping, a sandbox sync, and a sign-off step before any data flows in production.",
  "Vega (finance) handles invoicing and payment reconciliation. Phoenix handles month-end close support. Both operate exclusively through the approval system for ERP writes — no exceptions.",
  "ERP integrations support write-back via either the native API or middleware (MuleSoft, Boomi). Native is preferred for performance."
 ],
 bullets:[
  "Initial integration: 1-2 weeks with our team's support included.",
  "Sandbox-first: test in your ERP sandbox before production.",
  "Read latency: under 5 minutes; write latency: minutes to hours per ERP rules.",
  "Custom objects supported with field-mapping UI."
 ],
 related:["int-crm","int-warehouse","appr-overview","audit-overview"]},

{slug:"int-webhooks", title:"Webhooks and API basics", category:"integrations", roles:["engineer"], journey:"reference",
 summary:"REST + webhooks for everything else. Signed payloads, idempotent retries, and a Postman collection.",
 body:[
  "The Antarious API is a small, REST-shaped surface for tenant administration, approvals, and audit access. Outbound webhooks fire on every approval, agent flag, role change, and config change.",
  "Webhooks are signed (HMAC-SHA256). Verify the signature before processing — the signing key is in Settings → Integrations → Webhooks. Retries follow exponential backoff up to 24 hours, idempotency keys prevent duplicate processing.",
  "API rate limits are generous (1000 req/min) with burst tolerance. The OpenAPI spec is at docs.antarious.com/api."
 ],
 bullets:[
  "All API calls require an API key with explicit scope.",
  "Webhook delivery has at-least-once semantics.",
  "Postman collection and SDKs in TS, Python, Go.",
  "Sandbox tenant available for integration testing."
 ],
 related:["int-custom","int-warehouse","agents-add","data-keys"]},

{slug:"int-warehouse", title:"Data warehouse sync (Snowflake, BigQuery, Redshift)", category:"integrations", roles:["engineer","ops"], journey:"scaling",
 summary:"Stream tenant data and audit events to your warehouse for analytics — no data leaves your control plane unnecessarily.",
 body:[
  "Warehouse sync forwards your audit log, agent activity, and configurable subset of operational data to your own warehouse. Latency is under 60 seconds for hot events, batch-loaded for cold.",
  "Authentication uses your warehouse's native mechanisms: key-pair for Snowflake, service account for BigQuery, IAM role for Redshift. Antarious never stores warehouse credentials in clear text.",
  "Schemas are stable and versioned. Schema changes follow a 90-day deprecation window with email notice."
 ],
 bullets:[
  "Supported: Snowflake, BigQuery, Redshift, Databricks, Postgres.",
  "Stream + batch hybrid loading.",
  "Schemas: docs.antarious.com/warehouse-schemas",
  "Backfill up to 13 months on demand."
 ],
 related:["audit-siem","int-webhooks","data-export","int-custom"]},

{slug:"int-calendar", title:"Calendar integrations (Google, Outlook)", category:"integrations", roles:["ops"], journey:"daily-ops",
 summary:"Theta knows when you're available — and when not to interrupt.",
 body:[
  "Calendar integration lets Theta (the scheduling agent) coordinate timing for approvals, scheduled actions, and human availability. It reads availability metadata only — never event content.",
  "Privacy-first: Antarious never stores calendar events themselves, only free/busy intervals. The integration honours your IdP's calendar permissions.",
  "Common uses: route urgent approvals away from people in deep-work blocks, schedule monthly reports for when the recipient is available, suggest delegation when an approver will be OOO."
 ],
 bullets:[
  "Free/busy only — no event titles, attendees, or descriptions.",
  "Per-user opt-out available.",
  "Latency: 30 seconds from calendar update.",
  "Works with shared calendars at the user's permission level."
 ],
 related:["int-slack","appr-delegate","data-pii","data-export"]},

{slug:"int-storage", title:"Document storage (Drive, SharePoint, Dropbox, Box)", category:"integrations", roles:["engineer","compliance"], journey:"scaling",
 summary:"Read or write specific folders. Antarious can attach to approvals or pull context for agents.",
 body:[
  "Document storage integrations let agents read shared documents (e.g. policies, contracts, knowledge bases) and write artefacts (e.g. signed reports, exports) to a designated folder.",
  "Scope is folder-level. The agent never gets blanket access to your drive — only the folders you explicitly designate. Permissions are enforced per file at read time.",
  "Files attached to approvals are watermarked with the approval ID so they're traceable back to the decision they supported."
 ],
 bullets:[
  "Folder-scoped, never blanket access.",
  "Read-only by default; write requires admin consent.",
  "All accesses are audit-logged.",
  "Watermarking on writes."
 ],
 related:["int-warehouse","data-pii","audit-overview","audit-overview"]},

{slug:"int-custom", title:"Building a custom connector", category:"integrations", roles:["engineer"], journey:"scaling",
 summary:"For internal systems we don't ship out-of-the-box — a small SDK and a pattern.",
 body:[
  "If your system isn't on the integrations list, you can build a custom connector. The connector SDK is available in TypeScript, Python, and Go, and ships with three example connectors covering common patterns.",
  "Connectors run in a sandbox VM in your tenant — they cannot access other tenants' data, the rest of the Antarious stack, or the public internet without explicit allowlisting.",
  "Connectors must declare their capabilities (read/write/delete on what kinds of resources). Capabilities are enforced at runtime and audit-logged."
 ],
 bullets:[
  "Sandboxed runtime, network allowlist required.",
  "Pre-built scaffolds for REST, GraphQL, gRPC, JDBC.",
  "Mandatory capability manifest.",
  "Antarious can review your connector before promotion."
 ],
 related:["int-webhooks","agents-add","deploy-network","audit-overview"]},

/* ---------- DEPLOYMENT (8) ---------- */
{slug:"deploy-cloud-onprem", title:"Cloud vs on-prem deployment", category:"deployment", roles:["engineer","founder"], journey:"getting-started",
 summary:"SaaS, single-tenant cloud, or fully on-prem. Three modes, same product.",
 body:[
  "Antarious ships in three deployment modes. Multi-tenant SaaS is the fastest start (minutes) and best for most teams. Single-tenant cloud (your own VPC) gives you isolated infrastructure with the operational simplicity of SaaS. On-prem (your own data centre or air-gapped network) is for teams with the strictest residency requirements.",
  "Feature parity is identical across modes. Latency is similar. Pricing differs — SaaS is per-seat, single-tenant adds infra cost, on-prem is annual licence + your operations.",
  "You can start on SaaS and migrate to single-tenant or on-prem later. The migration is staffed by Antarious."
 ],
 bullets:[
  "SaaS: hours to deploy, $99/seat starting.",
  "Single-tenant: 1-2 weeks, your AWS/GCP/Azure account.",
  "On-prem: 4-8 weeks, your hardware or air-gapped.",
  "Migration paths between modes supported."
 ],
 related:["deploy-checklist","deploy-network","deploy-residency","deploy-dr"]},

{slug:"deploy-checklist", title:"Initial provisioning checklist", category:"deployment", roles:["engineer"], journey:"getting-started",
 summary:"Twelve items, in order. Most teams complete in a day.",
 body:[
  "Start with the basics: confirm your deployment mode, identify your admin team (minimum two), pick your data residency region, and choose your SSO provider. Then move to access: provision your IdP, configure SSO, and create the initial admin role assignments.",
  "Next, integrations: pick one CRM, one comms (Slack/Teams), and one calendar to start. Don't connect everything at once — confidence comes from running the basics first. Then test the approval flow end-to-end with a non-production action.",
  "Finally, audit: confirm the audit log is populating, verify a signed export, and walk through your first compliance template. You're ready for production."
 ],
 bullets:[
  "Required: 2 admins, IdP, region, comms tool.",
  "Recommended: SIEM destination configured before go-live.",
  "Pilot phase: one team, two weeks, daily check-ins.",
  "Go-live readiness checklist signed off by Antarious."
 ],
 related:["deploy-cloud-onprem","deploy-network","deploy-sso","deploy-dr"]},

{slug:"deploy-network", title:"Network and firewall requirements", category:"deployment", roles:["engineer"], journey:"reference",
 summary:"What ports, what egress, what allowlists. The full topology in one page.",
 body:[
  "For SaaS, only outbound HTTPS to *.antarious.com is needed from your IdP and any system you integrate (CRM, ERP, etc.). Antarious never initiates connections into your network.",
  "Single-tenant cloud follows the same outbound pattern but in your VPC. Required AWS/GCP/Azure services are documented per-cloud (compute, storage, KMS, network).",
  "On-prem requires a hardened network plan: minimum three nodes for HA, dedicated subnet, firewall rules in the doc, optional reverse proxy."
 ],
 bullets:[
  "Outbound only — no inbound from Antarious to you.",
  "Optional VPC peering for high-throughput CRM/ERP.",
  "Air-gapped on-prem documented and supported.",
  "DNS and SSL certificate requirements per mode."
 ],
 related:["deploy-cloud-onprem","deploy-checklist","deploy-residency","data-encryption"]},

{slug:"deploy-sso", title:"SSO setup (Okta, Azure AD, Google, others)", category:"deployment", roles:["engineer"], journey:"getting-started",
 summary:"15-20 minutes per IdP. Step-by-step screenshots in the docs.",
 body:[
  "SSO is required for production and recommended for trial. Setup is done in two places: your IdP (configure an Antarious app) and Antarious (paste IdP metadata).",
  "We support SAML 2.0 and OIDC. Step-by-step guides exist for Okta, Azure AD, Google, OneLogin, JumpCloud, Auth0, Ping. SCIM provisioning is recommended for compliance-grade workflows.",
  "If your IdP isn't on the list, generic SAML/OIDC configuration is supported with a 30-minute call with our team."
 ],
 bullets:[
  "MFA required by Antarious for admin roles.",
  "Just-in-time user creation.",
  "Group-to-role mapping in the SSO config.",
  "Session length configurable (default 12h)."
 ],
 related:["deploy-checklist","roles-sso","deploy-network","roles-emergency"]},

{slug:"deploy-residency", title:"Data residency options", category:"deployment", roles:["compliance","engineer"], journey:"getting-started",
 summary:"US, EU, UK, Canada, Australia, Singapore — pick once, locked permanently.",
 body:[
  "Pick your residency at provisioning. All tenant data, logs, and backups stay in the chosen region. Antarious never moves data across regions, even for support — engineers connect into your region's instance.",
  "Cross-region failover is opt-in and requires explicit consent. By default, regional outage means waiting for your region to recover.",
  "Multi-region deployment (active-active across two regions) is available on Enterprise for global teams."
 ],
 bullets:[
  "Available regions: US-East, US-West, EU-West, UK, CA-Central, AU, SG.",
  "Region change requires data migration project.",
  "Backups stay in-region by default.",
  "Sovereign cloud available in select regions."
 ],
 related:["deploy-cloud-onprem","data-encryption","audit-overview","data-cross-border"]},

{slug:"deploy-upgrade", title:"Upgrade and patch cadence", category:"deployment", roles:["engineer"], journey:"reference",
 summary:"Monthly minor releases, quarterly majors. SaaS is automatic; single-tenant is scheduled with you.",
 body:[
  "SaaS upgrades happen during a configurable maintenance window (default Sundays 02:00 in your region) with zero downtime via blue/green deployment. You're notified 7 days in advance.",
  "Single-tenant cloud follows your maintenance window with the same blue/green model. On-prem is scheduled per your release calendar with our team's support.",
  "Security patches bypass the regular cadence — they're deployed within 24 hours of CVE disclosure for severity-critical, 7 days for high."
 ],
 bullets:[
  "Release notes published 14 days before deployment.",
  "Rollback within one hour if needed.",
  "LTS branch supported with 18-month maintenance.",
  "Security patches: 24h critical, 7d high, 30d medium."
 ],
 related:["deploy-cloud-onprem","deploy-dr","agents-failover","deploy-decommission"]},

{slug:"deploy-dr", title:"Disaster recovery and backups", category:"deployment", roles:["engineer","compliance"], journey:"reference",
 summary:"Hourly snapshots, point-in-time restore, 1-hour RTO, 5-minute RPO.",
 body:[
  "Backups run hourly with point-in-time restore over the last 30 days, daily with 90-day retention beyond that, and weekly with 1-year retention for long-tail recovery. All backups are encrypted with your tenant's key.",
  "Recovery time objective is 1 hour for full tenant restore in the same region. Recovery point objective is 5 minutes — the most data you'd lose in a worst-case scenario.",
  "DR drills run quarterly without your involvement, and we publish the results in your tenant's status page."
 ],
 bullets:[
  "Cross-region backup available on Enterprise.",
  "Restore to point-in-time supported via UI or CLI.",
  "Backups encrypted with your KMS key.",
  "DR drill reports available on demand."
 ],
 related:["deploy-residency","agents-failover","data-encryption","data-keys"]},

{slug:"deploy-decommission", title:"Decommissioning and offboarding", category:"deployment", roles:["compliance","engineer"], journey:"reference",
 summary:"What happens to your data when you leave. Spoiler: you control it.",
 body:[
  "When you offboard, you choose what to do with your data. Options: full export and erase (most common), full export and 90-day cold archive (for litigation hold), or in-place handover to a successor tenant.",
  "Full erase is cryptographic — your KMS keys are destroyed, and the data becomes unreadable even if backups exist. Antarious provides a signed certificate of destruction.",
  "Audit logs are governed by your retention setting and continue to be retained for the contracted period unless you explicitly purge them."
 ],
 bullets:[
  "Export formats: CSV, JSON, signed PDF, parquet.",
  "Cryptographic erase with signed certificate.",
  "90-day grace period for accidental offboarding.",
  "Audit logs governed by retention policy independently."
 ],
 related:["deploy-residency","data-export","data-deletion","audit-retention"]},

/* ---------- DATA (8) ---------- */
{slug:"data-overview", title:"What data Antarious processes", category:"data", roles:["compliance","engineer"], journey:"getting-started",
 summary:"Tenant config, integration data (with your consent), audit log, and agent context. Nothing else.",
 body:[
  "Antarious processes four data classes: tenant configuration (your settings, role assignments, approval rules), integration data (CRM, ERP, comms — only what you connect), audit logs (every action), and agent context (the data agents need to do their work).",
  "Antarious does not train its models on your data. Training happens on synthetic and licensed data only. Your tenant's data stays in your tenant.",
  "Inference uses your data ephemerally — at request time, with no persistent retention beyond audit. Embeddings derived from your data are tenant-isolated."
 ],
 bullets:[
  "No model training on customer data, ever.",
  "Embeddings tenant-isolated and tenant-encrypted.",
  "Inference data deleted post-completion.",
  "Data inventory available for SOC 2/ISO audits."
 ],
 related:["data-encryption","data-pii","data-retention","audit-overview"]},

{slug:"data-encryption", title:"Encryption at rest and in transit", category:"data", roles:["compliance","engineer"], journey:"reference",
 summary:"AES-256 at rest, TLS 1.3 in transit. Your KMS, your keys, your control.",
 body:[
  "All data at rest is encrypted with AES-256-GCM. All data in transit uses TLS 1.3 with modern cipher suites. Internal service-to-service traffic uses mTLS.",
  "Keys are managed via KMS — by default, Antarious-managed in your region. For Enterprise tenants, BYOK is supported via AWS KMS, GCP Cloud KMS, or Azure Key Vault — keys never leave your KMS.",
  "Field-level encryption is available for highly sensitive fields (e.g. SSN, account numbers) — those fields are encrypted with a per-tenant DEK that Antarious cannot read at rest."
 ],
 bullets:[
  "TLS 1.3 mandatory; older TLS rejected.",
  "BYOK on Enterprise via AWS/GCP/Azure KMS.",
  "Field-level encryption for designated fields.",
  "Keys rotated annually by default."
 ],
 related:["data-keys","data-overview","deploy-residency","audit-overview"]},

{slug:"data-retention", title:"Data retention policies", category:"data", roles:["compliance"], journey:"reference",
 summary:"Per-class retention. Most data follows the 7-year audit default; some has shorter or longer windows.",
 body:[
  "Different classes of data have different retention defaults. Audit logs: 7 years. Approval records: 7 years. Agent reasoning traces: 30 days (extendable). Integration mirror data: 30 days. Operational metrics: 13 months.",
  "All defaults are configurable within a band — you can extend up to 25 years on Enterprise, or shorten subject to legal minimums (Antarious blocks settings below the floor for your jurisdiction).",
  "Retention changes apply forward only — past data continues at its prior retention until expired."
 ],
 bullets:[
  "Class-by-class config in Settings → Data → Retention.",
  "Legal-floor enforcement based on detected jurisdiction.",
  "Retention change history is itself audit-logged.",
  "Tombstones left after deletion for audit completeness."
 ],
 related:["data-overview","audit-retention","data-deletion","audit-overview"]},

{slug:"data-pii", title:"PII handling and redaction", category:"data", roles:["compliance","engineer"], journey:"reference",
 summary:"PII is detected, classified, and either redacted or quarantined per your policy.",
 body:[
  "Antarious detects PII automatically across structured and unstructured data: names, addresses, phone numbers, emails, SSN, account numbers, and 30+ other classes. Detection runs at ingestion time and on every agent input.",
  "PII handling policy is configurable per data class: pass through, redact in displays, quarantine to a restricted column, or block entirely. Different policies for different agents are supported.",
  "Some PII is unavoidably in scope for certain agents (e.g. customer name for Nova). Antarious surfaces what's in scope and what's not, so you can prove minimisation."
 ],
 bullets:[
  "Detection covers structured and unstructured.",
  "Per-class policy: pass, redact, quarantine, block.",
  "Agent-level overrides for legitimate scope.",
  "Audit log records every PII touch."
 ],
 related:["data-overview","data-encryption","data-deletion","audit-overview"]},

{slug:"data-export", title:"Data export and portability", category:"data", roles:["compliance","engineer"], journey:"reference",
 summary:"Export everything. Anytime. Multiple formats. Yours.",
 body:[
  "Your data is yours. Export at any time via Settings → Data → Export. Choose what to export (specific classes or everything), the format (CSV, JSON, parquet, signed PDF), and the destination (download, S3, GCS, or your warehouse).",
  "Exports include audit log integrity signatures so the receiving system can verify they weren't tampered with in transit.",
  "Large exports run as background jobs — you'll get an email when ready. Maximum job size is 10GB; for larger, run multiple jobs."
 ],
 bullets:[
  "Formats: CSV, JSON, parquet, signed PDF.",
  "Destinations: direct download, S3, GCS, Azure Blob.",
  "Schemas stable across exports.",
  "Exports themselves are audit-logged."
 ],
 related:["data-overview","audit-export","int-warehouse","deploy-decommission"]},

{slug:"data-keys", title:"Bring-your-own-key (BYOK)", category:"data", roles:["compliance","engineer"], journey:"scaling",
 summary:"Hold the keys to your data. Revoke them and Antarious can't read your data — including by us.",
 body:[
  "BYOK lets you supply the encryption keys for your tenant. Keys live in your KMS (AWS, GCP, or Azure). Antarious calls into your KMS to decrypt at request time but never sees the raw key material.",
  "If you revoke the key, your data immediately becomes unreadable — including by Antarious. This is a powerful guarantee, and the implication (we cannot recover for you) is real.",
  "BYOK is on Enterprise plans. Setup takes about a day with our team's involvement to validate the KMS configuration."
 ],
 bullets:[
  "Per-tenant DEK wrapped by your KEK.",
  "Key rotation cadence controlled by you.",
  "Audit log captures every KMS call.",
  "Cryptographic erase = revoke and rotate."
 ],
 related:["data-encryption","audit-overview","deploy-residency","deploy-decommission"]},

{slug:"data-cross-border", title:"Cross-border data transfer", category:"data", roles:["compliance"], journey:"reference",
 summary:"Default: data stays in-region. Cross-border transfers are explicit, logged, and contractually framed.",
 body:[
  "Data does not cross regions by default. If your workflow requires cross-border transfer (e.g. EU → US for a specific report), it must be explicitly enabled with a documented purpose, a defined data scope, and a time-bounded window.",
  "Standard Contractual Clauses (SCCs), the EU-US Data Privacy Framework, and equivalents are pre-positioned in your DPA. Country-specific addenda are available on request.",
  "Cross-border transfers are tagged in the audit log and visible in your residency dashboard."
 ],
 bullets:[
  "Default: in-region only.",
  "Explicit, scoped, time-bounded transfers.",
  "SCCs and DPF pre-positioned.",
  "Residency dashboard shows every cross-border touch."
 ],
 related:["deploy-residency","data-overview","audit-overview","data-export"]},

{slug:"data-deletion", title:"Data deletion requests", category:"data", roles:["compliance"], journey:"reference",
 summary:"GDPR Article 17, CCPA, and friends — automated where possible, traceable always.",
 body:[
  "Data subject deletion requests (DSARs) are first-class. Submit via the dashboard or programmatically; Antarious runs the deletion across all data classes within 30 days (typically same day) and produces a signed certificate.",
  "Deletion is cryptographic where possible (key destruction) and physical otherwise (overwrite). Backups are honoured per your contract — typically deleted on next backup rotation.",
  "Deletion requests interact with legal hold: if a hold is active, deletion is paused and the requester is notified per regulatory rules."
 ],
 bullets:[
  "Standard SLA: 30 days, typical actual: same day.",
  "Signed certificate of deletion provided.",
  "Backups honoured on next rotation.",
  "Legal hold pauses deletion with notification."
 ],
 related:["data-retention","data-overview","audit-overview","audit-retention"]},

/* ---------- BILLING (8) ---------- */
{slug:"billing-plans", title:"Pricing tiers and what they include", category:"billing", roles:["founder","ops"], journey:"getting-started",
 summary:"Starter, Growth, Scale, Enterprise. Per-seat with usage adjustments.",
 body:[
  "Four tiers. Starter ($99/seat) covers small teams with the 13 default agents, basic integrations, and 30-day audit retention. Growth ($249/seat) adds custom agents, full integrations, and 1-year audit retention. Scale ($499/seat) adds BYOK, single-tenant cloud option, and 7-year audit retention. Enterprise is custom — on-prem, BYOK, advanced compliance.",
  "All tiers include unlimited approvals, unlimited agent runs, and standard support. Premium support and dedicated SRE are add-ons available on Scale and above.",
  "Annual contracts get a discount; monthly available without commitment."
 ],
 bullets:[
  "Free 14-day trial — every tier, no credit card.",
  "Annual: 17% off vs monthly.",
  "Volume discounts at 50/250/1000 seats.",
  "Non-profit and education discounts available."
 ],
 related:["billing-invoice","billing-seats","billing-usage","billing-annual"]},

{slug:"billing-invoice", title:"Reading your monthly invoice", category:"billing", roles:["ops","founder"], journey:"daily-ops",
 summary:"Three sections — base subscription, usage, taxes. Each line is a link to the underlying detail.",
 body:[
  "Invoices are itemised in three sections. First, base subscription (number of seats × seat price, prorated). Second, usage (extra storage, premium support, custom agents above tier). Third, taxes (VAT, sales tax, etc.) calculated per your billing address.",
  "Each line links to the underlying detail. Clicking 'seats' shows the user list; clicking 'storage' shows the breakdown by data class. No hidden fees.",
  "Invoices are issued on the 1st of each month for the prior month, due net-30. Late payments accrue 1% monthly."
 ],
 bullets:[
  "PDF invoice plus interactive UI version.",
  "All line items click through to detail.",
  "Multi-currency: USD, EUR, GBP, CAD, AUD.",
  "Pro-rata mid-month seat changes."
 ],
 related:["billing-plans","billing-seats","billing-tax","billing-payment"]},

{slug:"billing-seats", title:"Adding seats or upgrading tier", category:"billing", roles:["ops","founder"], journey:"daily-ops",
 summary:"Add seats anytime, prorated from now. Upgrade tier anytime, effective immediately.",
 body:[
  "Seats can be added in Settings → Billing → Seats. New seats prorate from the day added through the end of the billing period. Removed seats refund prorated, applied to the next invoice.",
  "Tier upgrades take effect immediately and prorate the same way. Downgrades take effect at the end of the current billing period to avoid mid-period feature loss.",
  "Bulk seat changes (e.g. adding 100+ seats) trigger a manual review for accurate proration — no surprises."
 ],
 bullets:[
  "Self-serve up to 50 seats; sales-assist beyond.",
  "Tier upgrade: immediate, prorated.",
  "Tier downgrade: end of period.",
  "Volume pricing automatically applied at thresholds."
 ],
 related:["billing-plans","billing-invoice","billing-cancel","roles-assign"]},

{slug:"billing-usage", title:"Usage-based billing components", category:"billing", roles:["ops","founder"], journey:"reference",
 summary:"Storage, custom agents, dedicated support — these are the meters.",
 body:[
  "Most tiers include unlimited core usage. Three meters can drive overage charges: storage beyond plan limit, custom agents beyond plan limit, and dedicated support hours beyond included.",
  "Each tier has generous defaults. Most teams never exceed any limit. The dashboard shows current usage vs limit at all times so there are no surprise overages.",
  "If you're approaching a limit, Antarious notifies you 14, 7, and 1 day in advance. You can choose to upgrade tier or accept the overage."
 ],
 bullets:[
  "Storage: $0.05/GB-month over plan limit.",
  "Custom agents: $50/agent-month over plan limit.",
  "Premium support hours: $400/hour over plan included.",
  "Notifications at 14/7/1 days before threshold."
 ],
 related:["billing-plans","billing-invoice","data-retention","agents-add"]},

{slug:"billing-annual", title:"Annual vs monthly plans", category:"billing", roles:["founder"], journey:"reference",
 summary:"Annual saves 17%. Switch anytime; transition is prorated.",
 body:[
  "Annual plans bill once for 12 months and save 17% vs monthly. Most teams pick annual after their first quarter when usage is established.",
  "Switching from monthly to annual is one click in Settings → Billing → Plan. Antarious credits your remaining monthly period and charges the prorated annual amount.",
  "Switching from annual to monthly happens at the renewal date (no refund mid-year). Plans can be cancelled at the end of the term with no penalty."
 ],
 bullets:[
  "17% discount on annual.",
  "Multi-year discounts negotiable on Enterprise.",
  "Annual plans renew automatically; opt out 30 days before.",
  "Co-term multiple subscriptions to one renewal date."
 ],
 related:["billing-plans","billing-cancel","billing-payment","billing-invoice"]},

{slug:"billing-tax", title:"Tax, VAT, and reverse charge", category:"billing", roles:["ops","compliance"], journey:"reference",
 summary:"Sales tax, VAT, GST, and reverse charge handled automatically based on your billing address and registration.",
 body:[
  "Antarious calculates taxes based on your billing address. US: state sales tax where applicable. EU/UK: VAT, with reverse charge for B2B if you provide a valid VAT number. Canada: GST/HST/PST. Australia: GST.",
  "Add your VAT/tax number in Settings → Billing → Tax. Reverse charge applies automatically once verified. Tax-exempt customers can upload a certificate for instant exemption.",
  "Invoices show tax-inclusive and tax-exclusive amounts side by side. Tax remittance is handled by Antarious — you don't need to remit anything."
 ],
 bullets:[
  "Real-time VAT validation via VIES.",
  "Tax-exempt certificate upload supported.",
  "Reverse charge B2B in EU/UK.",
  "Tax remittance handled by Antarious."
 ],
 related:["billing-invoice","billing-payment","billing-plans","audit-overview"]},

{slug:"billing-payment", title:"Payment methods and ACH", category:"billing", roles:["ops"], journey:"reference",
 summary:"Card, ACH, SEPA, wire, BACS — pick what your finance team prefers.",
 body:[
  "Payment methods are flexible. Cards (Visa, MC, Amex, Discover) are fastest to set up. ACH/SEPA/BACS are preferred for larger invoices — savings on fees passed through. Wire transfer is supported for Enterprise on annual plans.",
  "Card payments via Stripe; ACH/SEPA via Stripe ACH or via direct bank transfer. Wire instructions are on the invoice.",
  "Update payment methods anytime in Settings → Billing → Payment. Change becomes the default for the next invoice."
 ],
 bullets:[
  "PCI-compliant: Antarious never sees your card number.",
  "ACH discount: 1% off invoice for ACH-paid customers.",
  "Multiple payment methods supported (primary + backup).",
  "Failed payments retry automatically with notifications."
 ],
 related:["billing-invoice","billing-tax","billing-plans","billing-cancel"]},

{slug:"billing-cancel", title:"Cancelling or downgrading", category:"billing", roles:["founder"], journey:"reference",
 summary:"Cancel anytime in two clicks. We'll be sad. Your data is safe either way.",
 body:[
  "Cancellation is in Settings → Billing → Plan → Cancel. Two clicks plus a one-line reason. Effective at the end of the current billing period — full access until then.",
  "Downgrade follows the same flow. The downgraded tier takes effect at the end of the period to avoid mid-period feature loss.",
  "When you cancel, your data follows the offboarding flow described in 'Decommissioning and offboarding'. You have 90 days post-cancellation to export, after which data is cryptographically erased per your contract."
 ],
 bullets:[
  "Full access through end of period.",
  "90-day grace post-cancellation.",
  "Reactivation in 90 days restores everything.",
  "Antarious never holds your data hostage."
 ],
 related:["billing-plans","deploy-decommission","data-export","billing-invoice"]}
];

/* ---------- COMPLIANCE OVERVIEW ALIAS ---------- */
const COMPLIANCE_REFS = ["audit-overview","data-overview","data-encryption","roles-overview"];

/* ============================================================
   AGENT GRID + COCKPIT
   ============================================================ */
const AGENT_NAMES = [
  ["AT","Atlas — sync"],
  ["LY","Lyra — quality"],
  ["OR","Orion — approvals"],
  ["VG","Vega — finance"],
  ["NV","Nova — comms"],
  ["TH","Theta — schedule"],
  ["IR","Iris — operations"],
  ["RH","Rhea — research"],
  ["HE","Helios — exec"],
  ["PX","Pyx — security"],
  ["CT","Cetus — integ"],
  ["DR","Draco — incidents"],
  ["PH","Phoenix — recon"]
];

function renderAgents(){
  const g = document.getElementById('agentGrid');
  g.innerHTML = AGENT_NAMES.map((a,i)=>{
    const cls = i===5 ? 'warn' : (i===10 ? 'err' : '');
    return \`<div class="agent-dot \${cls}" data-i="\${i}">\${a[0]}<div class="agent-tooltip">\${a[1]}</div></div>\`;
  }).join('');
}

const TICKS = [
  "Atlas synced 412 records from Salesforce",
  "Orion routed 3 approvals to ops-lead",
  "Vega reconciled $48,200 across 7 invoices",
  "Pyx flagged unusual login from new IP",
  "Lyra detected duplicate vendor records — pending review",
  "Helios composed exec brief for Friday",
  "Nova drafted 12 customer follow-ups",
  "Cetus refreshed Snowflake export at 02:14",
  "Phoenix matched 198/200 transactions for July close",
  "Iris paused Theta for scheduled maintenance window",
  "Rhea summarised 6 vendor proposals into a comparison",
  "Draco closed P3 incident #4012 at 01:08"
];

function startTickFeed(){
  let i = 0;
  const el = document.getElementById('tickText');
  setInterval(()=>{
    i = (i+1) % TICKS.length;
    el.style.animation = 'none';
    el.offsetWidth; // reflow
    el.style.animation = 'tickFade .4s ease-out';
    el.textContent = TICKS[i];
  }, 2400);
}

function startLatencyFlux(){
  const el = document.getElementById('latency');
  setInterval(()=>{
    const v = 130 + Math.floor(Math.random()*30);
    el.textContent = v + 'ms';
  }, 1800);
}

/* ============================================================
   DIAGNOSTIC TREE
   ============================================================ */
const TREE = {
  q: "What brings you here today?",
  options: [
    {label:"Something feels stuck or off", icon:"⚠", next:"stuck"},
    {label:"I'm trying to learn how something works", icon:"◐", next:"learn"},
    {label:"I need to make a change in settings", icon:"⚙", next:"change"},
    {label:"I have a compliance or audit question", icon:"§", next:"compliance"}
  ]
};

const SUBTREES = {
  stuck: {q:"Where is the stickiness?",
    options:[
      {label:"An approval is hung in the queue", icon:"►", result:"appr-queue"},
      {label:"An agent flagged for review", icon:"!", result:"agents-flagged"},
      {label:"Integration sync isn't running", icon:"⇄", result:"int-webhooks"},
      {label:"User can't log in / SSO failing", icon:"◯", result:"deploy-sso"}
    ]
  },
  learn: {q:"What concept?",
    options:[
      {label:"How approvals work end-to-end", icon:"✓", result:"appr-overview"},
      {label:"What the 13 agents actually do", icon:"⌬", result:"agents-overview"},
      {label:"Audit log and tamper-evident logging", icon:"☼", result:"audit-overview"},
      {label:"Roles, permissions, and SSO mapping", icon:"⚙", result:"roles-overview"}
    ]
  },
  change: {q:"What kind of change?",
    options:[
      {label:"Adjust approval thresholds", icon:"≡", result:"appr-thresholds"},
      {label:"Add or modify a role", icon:"+", result:"roles-custom"},
      {label:"Connect a new integration", icon:"⇄", result:"int-slack"},
      {label:"Change billing plan or seats", icon:"$", result:"billing-seats"}
    ]
  },
  compliance: {q:"What's the regulatory angle?",
    options:[
      {label:"Audit retention and exports", icon:"☐", result:"audit-export"},
      {label:"Data residency and cross-border", icon:"⌖", result:"data-cross-border"},
      {label:"PII handling and DSARs", icon:"⛨", result:"data-pii"},
      {label:"BYOK and encryption controls", icon:"⚿", result:"data-encryption"}
    ]
  }
};

let diagPath = [];
let diagState = "root";

function resetDiag(){
  diagPath = [];
  diagState = "root";
  renderDiag();
}

function renderDiag(){
  const trail = document.getElementById('diagTrail');
  const step = document.getElementById('diagStep');

  trail.innerHTML = diagPath.map((p,i)=>\`<div class="diag-crumb">\${escapeHtml(p)}<span class="diag-crumb-x" onclick="popDiag(\${i})">×</span></div>\`).join('');

  if (diagState === 'root'){
    step.innerHTML = \`
      <div class="diag-question">\${TREE.q}</div>
      <div class="diag-options">
        \${TREE.options.map(o=>\`<button class="diag-opt" onclick="pickDiag('\${o.next}','\${escapeHtml(o.label)}')"><span><span style="color:var(--gold);margin-right:8px">\${o.icon}</span>\${o.label}</span><span class="diag-opt-arrow">→</span></button>\`).join('')}
      </div>\`;
  } else if (SUBTREES[diagState]){
    const t = SUBTREES[diagState];
    step.innerHTML = \`
      <div class="diag-question">\${t.q}</div>
      <div class="diag-options">
        \${t.options.map(o=>\`<button class="diag-opt" onclick="resultDiag('\${o.result}','\${escapeHtml(o.label)}')"><span><span style="color:var(--gold);margin-right:8px">\${o.icon}</span>\${o.label}</span><span class="diag-opt-arrow">→</span></button>\`).join('')}
      </div>\`;
  } else {
    // result state
    const slug = diagState;
    const a = ARTICLES.find(x=>x.slug===slug);
    if (a){
      step.innerHTML = \`
        <div class="diag-result">
          <div class="diag-result-tag">Recommended answer</div>
          <div class="diag-result-title">\${a.title}</div>
          <div class="diag-result-summary">\${a.summary}</div>
          <button class="diag-result-cta" onclick="openArticle('\${slug}')">Read full article →</button>
        </div>\`;
    }
  }
}

function pickDiag(next, label){
  diagPath.push(label);
  diagState = next;
  renderDiag();
}
function resultDiag(slug, label){
  diagPath.push(label);
  diagState = slug;
  renderDiag();
}
function popDiag(i){
  diagPath = diagPath.slice(0,i);
  if (diagPath.length === 0){
    diagState = "root";
  } else if (diagPath.length === 1){
    // first crumb determines subtree, find it
    const first = diagPath[0];
    const sub = TREE.options.find(o=>o.label===first);
    diagState = sub ? sub.next : "root";
    diagPath = [first];
  } else {
    // dropped to second-level subtree question
    const first = diagPath[0];
    const sub = TREE.options.find(o=>o.label===first);
    diagState = sub ? sub.next : "root";
    diagPath = [first];
  }
  renderDiag();
}

/* (Freya widget removed in v3.0 — diagnostic + search are the two ways in.) */

/* ============================================================
   SEARCH
   ============================================================ */
function runSearch(q, force){
  const results = document.getElementById('searchResults');
  if (!q || q.length < 2){
    results.classList.remove('show');
    results.innerHTML = '';
    return;
  }
  const ql = q.toLowerCase();
  const hits = ARTICLES.map(a=>{
    const titleHit = a.title.toLowerCase().includes(ql) ? 3 : 0;
    const sumHit = a.summary.toLowerCase().includes(ql) ? 2 : 0;
    const bodyHit = (a.body.join(' ') + a.bullets.join(' ')).toLowerCase().includes(ql) ? 1 : 0;
    return {a, score: titleHit + sumHit + bodyHit};
  }).filter(x=>x.score>0).sort((x,y)=>y.score - x.score).slice(0, 8);

  if (hits.length === 0){
    results.innerHTML = \`<div class="search-empty">No results for "\${escapeHtml(q)}". Try a broader term, or pick a category below.</div>\`;
    results.classList.add('show');
    return;
  }

  results.innerHTML = hits.map(({a})=>{
    const c = CATEGORIES[a.category];
    return \`<div class="search-result-item" onclick="openArticle('\${a.slug}');document.getElementById('searchResults').classList.remove('show')">
      <div class="search-result-cat" style="color:\${c.color};background:\${c.tint}">\${c.name}</div>
      <div class="search-result-body">
        <div class="search-result-title">\${highlight(a.title, q)}</div>
        <div class="search-result-summary">\${highlight(a.summary, q)}</div>
      </div>
    </div>\`;
  }).join('');
  results.classList.add('show');
}

function highlight(text, q){
  if (!q) return escapeHtml(text);
  const re = new RegExp('(' + q.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&') + ')', 'ig');
  return escapeHtml(text).replace(re, '<strong style="background:rgba(212,168,69,.4);color:var(--ink);padding:0 2px;border-radius:2px">$1</strong>');
}

document.addEventListener('keydown', (e)=>{
  if ((e.metaKey || e.ctrlKey) && e.key === 'k'){
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key === 'Escape'){
    document.getElementById('searchResults').classList.remove('show');
    closeModal();
  }
});

document.addEventListener('click', (e)=>{
  if (!e.target.closest('.search-wrap')){
    document.getElementById('searchResults').classList.remove('show');
  }
});

/* ============================================================
   CATEGORIES + FILTERS
   ============================================================ */
const FILTERS = {role:null, journey:null, category:null};

function renderCategories(){
  const g = document.getElementById('catGrid');
  g.innerHTML = Object.keys(CATEGORIES).map(k=>{
    const c = CATEGORIES[k];
    const count = ARTICLES.filter(a=>a.category===k).length;
    return \`<div class="cat-card" style="--cat-color:\${c.color};--cat-tint:\${c.tint}" onclick="setFilter('category','\${k}');document.getElementById('articles').scrollIntoView({behavior:'smooth'})">
      <div class="cat-icon">\${c.icon}</div>
      <div class="cat-name">\${c.name}</div>
      <div class="cat-count">\${count} articles</div>
      <div class="cat-desc">\${c.desc}</div>
    </div>\`;
  }).join('');
}

function renderRoleChips(){
  const r = document.getElementById('roleChips');
  r.innerHTML = Object.keys(ROLES).map(k=>{
    const role = ROLES[k];
    return \`<button class="fchip" data-role="\${k}" onclick="toggleFilter('role','\${k}')"><span class="fchip-dot" style="--chip-color:\${role.color}"></span>\${role.name}</button>\`;
  }).join('');
}

function renderJourneyChips(){
  const j = document.getElementById('journeyChips');
  j.innerHTML = Object.keys(JOURNEYS).map(k=>{
    return \`<button class="fchip" data-journey="\${k}" onclick="toggleFilter('journey','\${k}')">\${JOURNEYS[k].name}</button>\`;
  }).join('');
}

function toggleFilter(kind, value){
  FILTERS[kind] = (FILTERS[kind] === value) ? null : value;
  applyFilters();
}

function setFilter(kind, value){
  FILTERS[kind] = value;
  applyFilters();
}

function clearFilter(kind){
  FILTERS[kind] = null;
  applyFilters();
}

function clearAllFilters(){
  FILTERS.role = null;
  FILTERS.journey = null;
  FILTERS.category = null;
  applyFilters();
}

function applyFilters(){
  // update chip active state
  document.querySelectorAll('.fchip').forEach(c=>c.classList.remove('active'));
  if (FILTERS.role){
    const el = document.querySelector(\`.fchip[data-role="\${FILTERS.role}"]\`);
    if (el) el.classList.add('active');
  }
  if (FILTERS.journey){
    const el = document.querySelector(\`.fchip[data-journey="\${FILTERS.journey}"]\`);
    if (el) el.classList.add('active');
  }

  // filter articles
  const filtered = ARTICLES.filter(a=>{
    if (FILTERS.category && a.category !== FILTERS.category) return false;
    if (FILTERS.role && !a.roles.includes(FILTERS.role)) return false;
    if (FILTERS.journey && a.journey !== FILTERS.journey) return false;
    return true;
  });

  document.getElementById('filterCount').textContent = filtered.length;
  renderArticles(filtered);

  // update library title
  const t = document.getElementById('libTitle');
  const parts = [];
  if (FILTERS.category) parts.push(CATEGORIES[FILTERS.category].name);
  if (FILTERS.role) parts.push(ROLES[FILTERS.role].name);
  if (FILTERS.journey) parts.push(JOURNEYS[FILTERS.journey].name);
  t.textContent = parts.length ? parts.join(' · ') : 'All articles';
}

function renderArticles(list){
  const g = document.getElementById('artGrid');
  if (list.length === 0){
    g.innerHTML = \`<div class="art-empty">
      <div class="art-empty-title">No articles match these filters</div>
      <div>Try removing a filter or browsing a different category.</div>
      <button class="btn-primary" onclick="clearAllFilters()" style="margin-top:18px">Reset filters</button>
    </div>\`;
    return;
  }
  g.innerHTML = list.map((a,i)=>{
    const c = CATEGORIES[a.category];
    return \`<div class="art-card float-up" style="--cat-color:\${c.color};--cat-tint:\${c.tint};animation-delay:\${Math.min(i*30,300)}ms" onclick="openArticle('\${a.slug}')">
      <div class="art-meta">
        <span class="art-cat">\${c.name}</span>
        <span class="art-journey">\${JOURNEYS[a.journey].name}</span>
      </div>
      <div class="art-title">\${a.title}</div>
      <div class="art-summary">\${a.summary}</div>
      <div class="art-roles">\${a.roles.map(r=>\`<span class="role-tag">\${ROLES[r].name}</span>\`).join('')}</div>
    </div>\`;
  }).join('');
}

/* ============================================================
   MODAL
   ============================================================ */
/* ============================================================
   ARTICLE MODAL — back stack + breadcrumb
   ============================================================ */
let articleStack = [];

function openArticle(slug, opts){
  opts = opts || {};
  const a = ARTICLES.find(x=>x.slug===slug);
  if (!a) return;
  // Push to stack unless we're replaying via back/crumb
  if (!opts.fromHistory){
    if (articleStack.length === 0 || articleStack[articleStack.length-1] !== slug){
      articleStack.push(slug);
    }
  }
  renderArticle(a);
  document.getElementById('modalBg').classList.add('show');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal').scrollTop = 0;
}

function renderArticle(a){
  const c = CATEGORIES[a.category];
  const body = document.getElementById('modalBody');

  body.innerHTML = \`
    <div style="--cat-color:\${c.color};--cat-tint:\${c.tint}">
      <div class="modal-meta">
        <span class="modal-cat" style="color:\${c.color};background:\${c.tint}">\${c.name}</span>
        <span class="modal-journey">· \${JOURNEYS[a.journey].name}</span>
        <span class="modal-roles">\${a.roles.map(r=>\`<span class="role-tag">\${ROLES[r].name}</span>\`).join('')}</span>
      </div>
      <h1 class="modal-title">\${a.title}</h1>
      <div class="modal-summary">\${a.summary}</div>
      <div class="modal-content">
        \${a.body.map(p=>\`<p>\${p}</p>\`).join('')}
        <h3>Key points</h3>
        <ul>\${a.bullets.map(b=>\`<li>\${b}</li>\`).join('')}</ul>
      </div>
      <div class="modal-related">
        <div class="modal-related-head">Related articles</div>
        <div class="related-list">\${a.related.map(rs=>{
          const r = ARTICLES.find(x=>x.slug===rs);
          if (!r) return '';
          const rc = CATEGORIES[r.category];
          return \`<div class="related-item" style="--rel-color:\${rc.color}" onclick="openArticle('\${r.slug}')">
            <div class="related-item-body">
              <div class="related-item-cat">\${rc.name}</div>
              <div class="related-item-title">\${r.title}</div>
            </div>
            <div class="related-arrow">→</div>
          </div>\`;
        }).join('')}</div>
      </div>
      <div class="modal-feedback">
        <div class="fb-q">Was this helpful?</div>
        <div class="fb-buttons">
          <button class="fb-btn up" onclick="fb(true,this)">👍 Yes, this answered it</button>
          <button class="fb-btn down" onclick="fb(false,this)">👎 Not quite</button>
        </div>
        <textarea class="fb-text" id="fbText_\${a.slug}" placeholder="What were you looking for? (optional)"></textarea>
        <button class="fb-submit" id="fbSubmit_\${a.slug}" onclick="fbSubmit('\${a.slug}')">Send feedback</button>
        <div class="fb-thanks" id="fbThanks_\${a.slug}">Thanks — your feedback helps us write better articles.</div>
      </div>
    </div>
  \`;
  renderCrumbs();
  document.getElementById('modal').scrollTop = 0;
}

function renderCrumbs(){
  const back = document.getElementById('modalBack');
  back.disabled = articleStack.length < 2;
  if (articleStack.length < 2) back.setAttribute('disabled','');
  else back.removeAttribute('disabled');

  const crumbs = document.getElementById('modalCrumbs');
  // Show Help Centre · Category · Title (last 3 stops max)
  const tail = articleStack.slice(-3);
  const parts = [\`<span class="modal-crumb" onclick="closeModal()">Help Centre</span>\`];
  tail.forEach((slug, i)=>{
    const a = ARTICLES.find(x=>x.slug===slug);
    if (!a) return;
    const isLast = i === tail.length - 1;
    parts.push(\`<span class="modal-crumb-sep">›</span>\`);
    if (isLast){
      parts.push(\`<span class="modal-crumb current" title="\${escapeHtml(a.title)}">\${escapeHtml(a.title)}</span>\`);
    } else {
      const idx = articleStack.length - tail.length + i;
      parts.push(\`<span class="modal-crumb" onclick="jumpStack(\${idx})" title="\${escapeHtml(a.title)}">\${escapeHtml(a.title)}</span>\`);
    }
  });
  crumbs.innerHTML = parts.join('');
}

function popArticle(){
  if (articleStack.length < 2) return;
  articleStack.pop();
  const slug = articleStack[articleStack.length-1];
  const a = ARTICLES.find(x=>x.slug===slug);
  if (a) renderArticle(a);
}

function jumpStack(idx){
  if (idx < 0 || idx >= articleStack.length-1) return;
  articleStack = articleStack.slice(0, idx+1);
  const slug = articleStack[articleStack.length-1];
  const a = ARTICLES.find(x=>x.slug===slug);
  if (a) renderArticle(a);
}

function closeModal(){
  document.getElementById('modalBg').classList.remove('show');
  document.body.style.overflow = '';
  articleStack = [];
}

function fb(positive, btn){
  // toggle selected state
  const buttons = btn.parentElement.querySelectorAll('.fb-btn');
  buttons.forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  // show text + submit
  const text = btn.parentElement.parentElement.querySelector('.fb-text');
  const submit = btn.parentElement.parentElement.querySelector('.fb-submit');
  text.classList.add('show');
  submit.classList.add('show');
  text.placeholder = positive ? "Anything else we could add? (optional)" : "What were you looking for?";
}

function fbSubmit(slug){
  const text = document.getElementById('fbText_'+slug);
  const submit = document.getElementById('fbSubmit_'+slug);
  const thanks = document.getElementById('fbThanks_'+slug);
  text.style.display = 'none';
  submit.style.display = 'none';
  text.parentElement.querySelector('.fb-buttons').style.display = 'none';
  text.parentElement.querySelector('.fb-q').style.display = 'none';
  thanks.classList.add('show');
}

/* ============================================================
   UTILITIES
   ============================================================ */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', ()=>{
  renderAgents();
  startTickFeed();
  startLatencyFlux();
  resetDiag();
  renderCategories();
  renderRoleChips();
  renderJourneyChips();
  applyFilters();

  // sticky nav active state on scroll
  const sections = ['hero','browse','filters','articles'];
  const navLinks = Array.from(document.querySelectorAll('.topnav a'));
  window.addEventListener('scroll', ()=>{
    let active = 'hero';
    for (const id of sections){
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 200) active = id;
    }
    navLinks.forEach(l=>{
      l.classList.toggle('active', l.getAttribute('href')==='#'+active);
    });
  });
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
