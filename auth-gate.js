/* auth-gate.js — full-screen credential gate for VERTICAL pages.
   Unlock persists for the browser session (sessionStorage), so navigating
   between pages doesn't re-prompt. Client-side only. */
(function () {
  const KEY = 'vertical_auth';
  const USER = 'ceresio';
  const PASS = 'ceresio2026';

  class AuthGate extends HTMLElement {
    connectedCallback() {
      if (sessionStorage.getItem(KEY) === 'granted') { this.remove(); return; }
      document.body.style.overflow = 'hidden';
      this.innerHTML = `
        <div style="position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',sans-serif">
          <form style="display:flex;flex-direction:column;gap:18px;width:min(340px,86vw)">
            <div style="display:flex;align-items:center;gap:9px;margin-bottom:10px">
              <span style="display:block;width:3px;height:22px;background:linear-gradient(180deg,#EAFBFD 0%,#21DFF0 45%,rgba(33,223,240,0) 100%)"></span>
              <span style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:16px;letter-spacing:.18em;color:#EAF2F6">VERTIC\u039BL<span style="color:#21DFF0">.</span></span>
            </div>
            <label style="display:flex;flex-direction:column;gap:6px">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.26em;color:#8FA3B0">USERNAME</span>
              <input name="u" type="text" autocomplete="username" autocapitalize="none" style="background:#070D14;border:1px solid rgba(160,220,235,0.18);color:#EAF2F6;font-family:'IBM Plex Mono',monospace;font-size:16px;padding:12px 14px;outline:none;border-radius:0">
            </label>
            <label style="display:flex;flex-direction:column;gap:6px">
              <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.26em;color:#8FA3B0">PASSWORD</span>
              <input name="p" type="password" autocomplete="current-password" style="background:#070D14;border:1px solid rgba(160,220,235,0.18);color:#EAF2F6;font-family:'IBM Plex Mono',monospace;font-size:16px;padding:12px 14px;outline:none;border-radius:0">
            </label>
            <div data-err style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.2em;color:#FF5C5C;min-height:14px"></div>
            <button type="submit" style="background:#21DFF0;color:#04070C;border:none;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.3em;font-weight:500;padding:14px;cursor:pointer">ENTER</button>
          </form>
        </div>`;
      const form = this.querySelector('form');
      const err = this.querySelector('[data-err]');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = form.u.value.trim().toLowerCase();
        const p = form.p.value;
        if (u === USER && p === PASS) {
          sessionStorage.setItem(KEY, 'granted');
          document.body.style.overflow = '';
          this.remove();
        } else {
          err.textContent = 'ACCESS DENIED';
          form.p.value = '';
        }
      });
      this.querySelector('input[name="u"]').focus();
    }
    disconnectedCallback() { /* body overflow restored on unlock */ }
  }
  if (!customElements.get('auth-gate')) customElements.define('auth-gate', AuthGate);
})();
