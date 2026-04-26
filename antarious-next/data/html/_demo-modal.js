// Shared "Request a demo" modal injected into every page that needs one.
// Self-contained: own class prefix (`adm-`), own CSS variables, no dependency
// on host-page styles. Exposes `window.openAntariousDemoModal()` /
// `window.closeAntariousDemoModal()`. POSTs to clouvie-backend.

const DEMO_MODAL_HTML = `
<style>
  :root {
    --adm-motion-fast: 180ms;
    --adm-motion-base: 260ms;
    --adm-ease: cubic-bezier(.22,1,.36,1);
  }
  .adm-overlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(8, 12, 24, 0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: none; align-items: center; justify-content: center;
    padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    animation: adm-fade var(--adm-motion-fast) var(--adm-ease);
  }
  .adm-overlay[data-open="true"] { display: flex; }
  @keyframes adm-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes adm-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .adm-card {
    --adm-navy: #1F4E79;
    --adm-gold: #B98E2E;
    --adm-cream: #F4F1EA;
    --adm-text: #1a1d24;
    --adm-muted: #6b7280;
    --adm-border: #e5e7eb;
    --adm-error: #c2410c;
    width: 100%; max-width: 520px;
    background: #ffffff; color: var(--adm-text);
    border-radius: 16px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.32), 0 4px 12px rgba(0,0,0,0.18);
    border-top: 4px solid var(--adm-navy);
    padding: 32px;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    position: relative;
    animation: adm-rise var(--adm-motion-base) var(--adm-ease);
  }
  .adm-card *, .adm-card *::before, .adm-card *::after { box-sizing: border-box; }

  .adm-eyebrow { font-size: 11px; letter-spacing: 0.22em; color: var(--adm-navy); font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; }
  .adm-title { font-size: 22px; line-height: 1.3; margin: 0 0 6px 0; color: var(--adm-navy); font-weight: 600; letter-spacing: -0.01em; }
  .adm-sub { font-size: 14px; line-height: 1.5; color: var(--adm-muted); margin: 0 0 22px 0; }

  .adm-close {
    position: absolute; top: 14px; right: 14px;
    width: 32px; height: 32px; border-radius: 50%;
    border: none; background: transparent; color: var(--adm-muted);
    font-size: 18px; cursor: pointer; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    transition: background var(--adm-motion-fast) var(--adm-ease), color var(--adm-motion-fast) var(--adm-ease);
  }
  .adm-close:hover { background: var(--adm-cream); color: var(--adm-text); }

  .adm-row { display: flex; flex-direction: column; gap: 14px; }
  .adm-field label { display: block; font-size: 12px; font-weight: 600; color: var(--adm-text); margin-bottom: 6px; letter-spacing: 0.02em; }
  .adm-field input, .adm-field select, .adm-field textarea {
    width: 100%;
    padding: 11px 13px;
    font-size: 14px;
    font-family: inherit;
    color: var(--adm-text);
    background: #fff;
    border: 1px solid var(--adm-border);
    border-radius: 8px;
    transition: border-color var(--adm-motion-fast) var(--adm-ease), box-shadow var(--adm-motion-fast) var(--adm-ease);
    outline: none;
  }
  .adm-field textarea { resize: vertical; min-height: 96px; }
  .adm-field input:focus, .adm-field select:focus, .adm-field textarea:focus {
    border-color: var(--adm-navy);
    box-shadow: 0 0 0 3px rgba(31, 78, 121, 0.12);
  }
  .adm-field.adm-has-error input,
  .adm-field.adm-has-error select,
  .adm-field.adm-has-error textarea { border-color: var(--adm-error); }
  .adm-error-msg { display: none; color: var(--adm-error); font-size: 12px; margin-top: 4px; }
  .adm-field.adm-has-error .adm-error-msg { display: block; }

  .adm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 460px) { .adm-grid-2 { grid-template-columns: 1fr; } }
  @media (max-width: 640px) {
    .adm-card { padding: 22px; max-width: 100%; border-radius: 12px; }
    .adm-actions { margin-top: 18px; }
    .adm-submit { width: 100%; }
  }

  .adm-actions { margin-top: 22px; display: flex; gap: 10px; align-items: center; }
  .adm-submit {
    flex: 1; padding: 12px 18px;
    background: var(--adm-navy); color: #fff;
    border: none; border-radius: 8px;
    font-size: 14px; font-weight: 600; letter-spacing: 0.02em;
    cursor: pointer; transition: background var(--adm-motion-fast) var(--adm-ease), transform 0.05s;
  }
  .adm-submit:hover:not(:disabled) { background: #173d61; }
  .adm-submit:active:not(:disabled) { transform: translateY(1px); }
  .adm-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .adm-form-error { display: none; color: var(--adm-error); font-size: 13px; margin-top: 10px; }
  .adm-form-error[data-show="true"] { display: block; }

  .adm-success { display: none; text-align: center; padding: 12px 0 4px 0; }
  .adm-success[data-show="true"] { display: block; }
  .adm-success-icon {
    width: 56px; height: 56px; border-radius: 50%;
    background: rgba(31, 78, 121, 0.08);
    color: var(--adm-navy);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px auto;
    font-size: 28px; font-weight: 600;
  }
  .adm-success h3 { font-size: 18px; color: var(--adm-navy); margin: 0 0 8px 0; }
  .adm-success p { font-size: 14px; color: var(--adm-muted); line-height: 1.55; margin: 0 0 18px 0; }
  .adm-success-close {
    background: var(--adm-cream); color: var(--adm-navy); border: none;
    padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600;
    cursor: pointer;
  }
  .adm-success-close:hover { background: #ebe5d4; }

  .adm-hidden { display: none !important; }

  body.adm-locked { overflow: hidden; }
  @media (prefers-reduced-motion: reduce) {
    .adm-overlay,
    .adm-card,
    .adm-submit,
    .adm-close,
    .adm-field input,
    .adm-field select,
    .adm-field textarea {
      animation: none !important;
      transition: none !important;
    }
  }
</style>

<div class="adm-overlay" id="admOverlay" role="dialog" aria-modal="true" aria-labelledby="admTitle" data-open="false">
  <div class="adm-card" role="document">
    <button type="button" class="adm-close" id="admClose" aria-label="Close">&times;</button>

    <div id="admFormWrap">
      <p class="adm-eyebrow">Request a demo</p>
      <h2 class="adm-title" id="admTitle">See Antarious in action</h2>
      <p class="adm-sub">Tell us a bit about you and your team. We'll reach out within 24 hours with tailored access and a live walkthrough.</p>

      <form id="admForm" novalidate>
        <div class="adm-row">
          <div class="adm-field" data-field="name">
            <label for="admName">Full name</label>
            <input type="text" id="admName" name="name" required maxlength="255" autocomplete="name">
            <div class="adm-error-msg"></div>
          </div>
          <div class="adm-field" data-field="email">
            <label for="admEmail">Work email</label>
            <input type="email" id="admEmail" name="email" required maxlength="255" autocomplete="email">
            <div class="adm-error-msg"></div>
          </div>
          <div class="adm-field" data-field="company">
            <label for="admCompany">Company / organisation</label>
            <input type="text" id="admCompany" name="company" required maxlength="255" autocomplete="organization">
            <div class="adm-error-msg"></div>
          </div>
          <div class="adm-grid-2">
            <div class="adm-field" data-field="role">
              <label for="admRole">Role <span style="color:var(--adm-muted); font-weight:400;">(optional)</span></label>
              <input type="text" id="admRole" name="role" maxlength="120" autocomplete="organization-title">
              <div class="adm-error-msg"></div>
            </div>
            <div class="adm-field" data-field="team_size">
              <label for="admTeamSize">Team size <span style="color:var(--adm-muted); font-weight:400;">(optional)</span></label>
              <select id="admTeamSize" name="team_size">
                <option value="">Select…</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="200+">200+</option>
              </select>
              <div class="adm-error-msg"></div>
            </div>
          </div>
          <div class="adm-field" data-field="use_case">
            <label for="admUseCase">What would you like to use Antarious for? <span style="color:var(--adm-muted); font-weight:400;">(optional)</span></label>
            <textarea id="admUseCase" name="use_case" maxlength="4000" placeholder="e.g. compliance reviews, customer support, internal Q&A…"></textarea>
            <div class="adm-error-msg"></div>
          </div>
        </div>

        <div class="adm-actions">
          <button type="submit" class="adm-submit" id="admSubmit">Request a demo</button>
        </div>
        <div class="adm-form-error" id="admFormError" role="alert"></div>
      </form>
    </div>

    <div class="adm-success" id="admSuccess" role="status" aria-live="polite">
      <div class="adm-success-icon">&#10003;</div>
      <h3>Got it &mdash; talk soon.</h3>
      <p id="admSuccessMsg">Thanks! The Antarious team will be in touch within 24 hours. A confirmation has been sent to your inbox.</p>
      <button type="button" class="adm-success-close" id="admSuccessClose">Close</button>
    </div>
  </div>
</div>

<script>
(function () {
  if (window.__antariousDemoModalInit) return;
  window.__antariousDemoModalInit = true;

  var ENDPOINT = 'https://backend.clouvie.com/api/antarious/demo';
  var overlay, form, submitBtn, formError, formWrap, successPanel, successMsg, lastFocus;

  function $(id) { return document.getElementById(id); }

  function clearFieldErrors() {
    var fields = overlay.querySelectorAll('.adm-field');
    for (var i = 0; i < fields.length; i++) {
      fields[i].classList.remove('adm-has-error');
      var msg = fields[i].querySelector('.adm-error-msg');
      if (msg) msg.textContent = '';
    }
    formError.textContent = '';
    formError.dataset.show = 'false';
  }

  function showFieldError(fieldName, message) {
    var field = overlay.querySelector('.adm-field[data-field="' + fieldName + '"]');
    if (!field) return;
    field.classList.add('adm-has-error');
    var msg = field.querySelector('.adm-error-msg');
    if (msg) msg.textContent = message;
  }

  function showFormError(message) {
    formError.textContent = message;
    formError.dataset.show = 'true';
  }

  function open() {
    if (!overlay) return;
    lastFocus = document.activeElement;
    overlay.dataset.open = 'true';
    document.body.classList.add('adm-locked');
    setTimeout(function () {
      var firstInput = overlay.querySelector('input, select, textarea');
      if (firstInput) firstInput.focus();
    }, 40);
  }

  function close() {
    if (!overlay) return;
    overlay.dataset.open = 'false';
    document.body.classList.remove('adm-locked');
    // Reset form/success state for next open
    setTimeout(function () {
      form.reset();
      clearFieldErrors();
      formWrap.classList.remove('adm-hidden');
      successPanel.dataset.show = 'false';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request a demo';
      if (lastFocus && typeof lastFocus.focus === 'function') {
        try { lastFocus.focus(); } catch (e) {}
      }
    }, 180);
  }

  function showSuccess(message) {
    formWrap.classList.add('adm-hidden');
    if (message) successMsg.textContent = message;
    successPanel.dataset.show = 'true';
    var btn = $('admSuccessClose');
    if (btn) btn.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submitBtn.disabled) return;
    clearFieldErrors();

    var payload = {
      name: ($('admName').value || '').trim(),
      email: ($('admEmail').value || '').trim(),
      company: ($('admCompany').value || '').trim(),
      role: ($('admRole').value || '').trim(),
      team_size: $('admTeamSize').value || '',
      use_case: ($('admUseCase').value || '').trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          return { status: res.status, ok: res.ok, body: body };
        });
      })
      .then(function (r) {
        if (r.ok) {
          showSuccess(r.body && r.body.message);
          return;
        }
        if (r.status === 422 && r.body && r.body.errors) {
          var keys = Object.keys(r.body.errors);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var arr = r.body.errors[k];
            if (arr && arr.length) showFieldError(k, arr[0]);
          }
          if (!keys.length) showFormError('Please double-check the form fields and try again.');
        } else {
          showFormError((r.body && r.body.message) || 'Something went wrong. Please try again.');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request a demo';
      })
      .catch(function () {
        showFormError("Couldn't reach the server. Please check your connection and try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request a demo';
      });
  }

  function init() {
    overlay = $('admOverlay');
    if (!overlay) return;
    form = $('admForm');
    submitBtn = $('admSubmit');
    formError = $('admFormError');
    formWrap = $('admFormWrap');
    successPanel = $('admSuccess');
    successMsg = $('admSuccessMsg');

    $('admClose').addEventListener('click', close);
    $('admSuccessClose').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.dataset.open === 'true') close();
    });
    form.addEventListener('submit', handleSubmit);

    window.openAntariousDemoModal = open;
    window.closeAntariousDemoModal = close;

    // Wire any element with [data-antarious-demo] or matching legacy hooks.
    document.addEventListener('click', function (e) {
      var el = e.target;
      while (el && el !== document.body) {
        if (el.dataset && el.dataset.antariousDemo !== undefined) {
          e.preventDefault();
          open();
          return;
        }
        el = el.parentElement;
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
`;

export default DEMO_MODAL_HTML;
export { DEMO_MODAL_HTML };
