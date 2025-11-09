// js/auth.js
// Demo authentication for Bijouterie Boutique
// Demo user: lala@gmail.com / 123456

(function () {
  const DEMO_USER = {
    name: "Demo User",
    email: "lala@gmail.com",
    password: "123456",
    phone: ""
  };

  const STORAGE_USERS_KEY = "bb_users";
  const STORAGE_CURRENT_KEY = "bb_currentUser";

  const $ = (sel) => document.querySelector(sel);
  const $all = (sel) => Array.from(document.querySelectorAll(sel));

  // ===== Local Storage Helpers =====
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || []; }
    catch { return []; }
  }
  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  }
  function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_CURRENT_KEY)); }
    catch { return null; }
  }
  function setCurrentUser(user) {
    localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify(user));
  }
  function clearCurrentUser() {
    localStorage.removeItem(STORAGE_CURRENT_KEY);
  }

  function ensureDemoUser() {
    const users = getUsers();
    if (!users.some(u => u.email === DEMO_USER.email)) {
      users.push(DEMO_USER);
      saveUsers(users);
    }
  }

  // ===== Redirect Function =====
  function redirectToProfile() {
    console.log("🔀 Immediately redirecting to profile.html");
    // Немедленный редирект без задержки
    window.location.href = "profile.html";
  }

  // ===== Toast Messages =====
  function showToast(msg) {
    const t = document.createElement("div");
    t.textContent = msg;
    Object.assign(t.style, {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: "10px",
      zIndex: 9999,
      fontSize: "0.95rem",
      letterSpacing: "0.3px"
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1500); // Уменьшил время показа тоста
  }

  // ===== Navbar update =====
  function updateNavForAuth() {
    const user = getCurrentUser();
    const authLink = $("#auth-link");
    const profileLink = $("#profile-link");
    const logoutBtn = $("#logout-btn");

    if (user) {
      if (authLink) authLink.style.display = "none";
      if (profileLink) profileLink.style.display = "";
      if (logoutBtn) logoutBtn.style.display = "";
    } else {
      if (authLink) authLink.style.display = "";
      if (profileLink) profileLink.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  // ===== Tabs =====
  function initTabs() {
    const tabButtons = $all(".tab-button");
    const loginForm = $("#login-form");
    const signupForm = $("#signup-form");

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        if (btn.dataset.tab === "login") {
          loginForm.classList.add("active");
          signupForm.classList.remove("active");
        } else {
          signupForm.classList.add("active");
          loginForm.classList.remove("active");
        }
      });
    });
  }

  // ===== Login =====
  function initLogin() {
    const loginForm = $("#login-form");
    if (!loginForm) return;

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = $("#login-email").value.trim();
      const password = $("#login-password").value.trim();
      const emailErr = $("#login-email-error");
      const passErr = $("#login-password-error");

      emailErr.textContent = "";
      passErr.textContent = "";

      if (!email) return (emailErr.textContent = "Email is required");
      if (!password) return (passErr.textContent = "Password is required");

      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) return (emailErr.textContent = "No account with this email");
      if (user.password !== password) return (passErr.textContent = "Incorrect password");

      setCurrentUser({ name: user.name, email: user.email });
      updateNavForAuth();
      showToast("Logged in successfully");

      console.log("✅ Login success, redirecting NOW to profile.html");
      
      // Немедленный редирект
      redirectToProfile();
    });
  }

  // ===== Signup =====
  function initSignup() {
    const signupForm = $("#signup-form");
    if (!signupForm) return;

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("#signup-name").value.trim();
      const email = $("#signup-email").value.trim();
      const password = $("#signup-password").value.trim();
      const phone = $("#signup-phone").value.trim();

      const nameErr = $("#signup-name-error");
      const emailErr = $("#signup-email-error");
      const passErr = $("#signup-password-error");
      const phoneErr = $("#signup-phone-error");

      [nameErr, emailErr, passErr, phoneErr].forEach(el => el.textContent = "");

      if (!name) return (nameErr.textContent = "Full name is required");
      if (!email) return (emailErr.textContent = "Email is required");
      if (!password || password.length < 6) return (passErr.textContent = "Password must be at least 6 characters");
      const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
      if (!phoneRegex.test(phone)) return (phoneErr.textContent = "Enter a valid phone number");

      const users = getUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
        return (emailErr.textContent = "Email already registered");

      const newUser = { name, email, password, phone };
      users.push(newUser);
      saveUsers(users);
      setCurrentUser({ name: newUser.name, email: newUser.email });
      updateNavForAuth();
      showToast("Account created successfully");

      console.log("✅ Signup success, redirecting NOW to profile.html");
      
      // Немедленный редирект
      redirectToProfile();
    });
  }

  // ===== Logout =====
  function initLogout() {
    const logoutBtn = $("#logout-btn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearCurrentUser();
      updateNavForAuth();
      showToast("Logged out");
      // Редирект после логаута
      window.location.href = "index.html";
    });
  }

  // ===== Init =====
  function init() {
    // Force-create demo user if missing
    localStorage.setItem("bb_users", JSON.stringify([
      { name: "Demo User", email: "lala@gmail.com", password: "123456", phone: "" }
    ]));

    ensureDemoUser();
    updateNavForAuth();
    initTabs();
    initLogin();
    initSignup();
    initLogout();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();