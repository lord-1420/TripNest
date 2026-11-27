/* ==========================================================================
   TripNest — Auth Pages (Sign In & Sign Up)
   Pure Vanilla JS + localStorage session
   ========================================================================== */
(function () {
  const Store = window.TripNestStore;
  const UI = window.TripNestUI;

  document.addEventListener("DOMContentLoaded", () => {
    const mode = document.body.dataset.page; // 'sign-in' or 'sign-up'
    const existing = Store.getSession();
    if (existing) {
      window.location.href = Store.dashboardHome(existing.role);
      return;
    }

    // Mount Logos
    const logoLight = document.getElementById("auth-logo-light");
    const logoDark = document.getElementById("auth-logo-dark");
    if (logoLight) logoLight.innerHTML = UI.logoHtml({ tone: "light" });
    if (logoDark) logoDark.innerHTML = UI.logoHtml({ tone: "dark" });

    // Background Ghana drone video (desktop only, respecting reduced motion)
    const videoEl = document.getElementById("auth-bg-video");
    const toggleBtn = document.getElementById("auth-video-toggle");
    if (videoEl) {
      UI.attachBackgroundVideo({ videoEl, toggleBtn, desktopOnly: true });
    }

    if (mode === "sign-in") initSignIn();
    if (mode === "sign-up") initSignUp();
  });

  function safeNextUrl(raw) {
    if (!raw) return "";
    if (/^[a-zA-Z0-9_-]+\.html(\?.*)?$/.test(raw)) return raw;
    return "";
  }

  function initSignIn() {
    const form = document.getElementById("signin-form");
    const errBox = document.getElementById("auth-error");
    const emailInput = document.getElementById("signin-email");
    const passInput = document.getElementById("signin-password");
    const nextUrl = safeNextUrl(UI.param("next"));

    document.querySelectorAll("[data-demo-email]").forEach((btn) => {
      btn.addEventListener("click", () => {
        emailInput.value = btn.dataset.demoEmail;
        passInput.value = "tripnest123";
        errBox.classList.add("hidden");
        emailInput.focus();
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const res = Store.signIn(emailInput.value, passInput.value);
      if (!res.ok) {
        errBox.textContent = res.error;
        errBox.classList.remove("hidden");
        return;
      }
      window.location.href = nextUrl || Store.dashboardHome(res.user.role);
    });
  }

  function initSignUp() {
    const form = document.getElementById("signup-form");
    const errBox = document.getElementById("auth-error");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const role = document.getElementById("signup-role").value;

      const res = Store.signUp({ name, email, password, role });
      if (!res.ok) {
        errBox.textContent = res.error;
        errBox.classList.remove("hidden");
        return;
      }
      window.location.href = Store.dashboardHome(res.user.role);
    });
  }
})();
