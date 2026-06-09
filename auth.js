// Authentication wrapper with Google sign-in.
const authState = {
  user: null
};

function getScopedProgressKey(uid) {
  const id = String(uid || "").trim();
  if (window.ProgressManager && typeof window.ProgressManager.getStorageKey === "function") {
    const prevScope = window.gqProgressActiveUid;
    const prevLang = window.getLanguage ? window.getLanguage() : (localStorage.getItem("activeLanguage") || "greek");
    if (typeof window.setProgressScope === "function") {
      try { window.setProgressScope(id); } catch (_) {}
    }
    if (typeof window.setLanguageScope === "function") {
      try { window.setLanguageScope(localStorage.getItem("activeLanguage") || prevLang || "greek"); } catch (_) {}
    }
    const key = window.ProgressManager.getStorageKey();
    if (typeof window.setProgressScope === "function") {
      try { window.setProgressScope(prevScope || ""); } catch (_) {}
    }
    if (typeof window.setLanguageScope === "function") {
      try { window.setLanguageScope(prevLang || "greek"); } catch (_) {}
    }
    return key;
  }
  const lang = String(localStorage.getItem("activeLanguage") || "greek").trim().toLowerCase() === "hebrew" ? "hebrew" : "greek";
  return `biblicalLang:${lang}:${id || "signedout"}`;
}

function setActiveProgressScope(uid) {
  const scope = String(uid || "").trim();
  window.gqProgressActiveUid = scope;
  try {
    localStorage.setItem("greekQuestProgressActiveUid", scope || "signedout");
  } catch (_) {}
  if (typeof setProgressScope === "function") {
    try { setProgressScope(scope); } catch (_) {}
  }
}

function updateAuthButton() {
  const signBtn = document.getElementById("sign-in-btn");
  const logBtn = document.getElementById("log-in-btn");
  const outBtn = document.getElementById("logout-btn");
  const heroSignBtn = document.getElementById("hero-sign-in-btn");
  const heroLogBtn = document.getElementById("hero-log-in-btn");
  const heroOutBtn = document.getElementById("hero-logout-btn");
  const buttons = [signBtn, logBtn, outBtn, heroSignBtn, heroLogBtn, heroOutBtn].filter(Boolean);
  if (!buttons.length) return;

  const st = window.GreekQuestFirebaseState;

  if (!st || !st.configured) {
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.title = st?.reason || "Firebase not configured.";
    });
    return;
  }

  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.title = "";
  });
}

function signInWithGoogle(options = {}) {
  const st = window.GreekQuestFirebaseState;

  if (!st || !st.configured || !auth) {
    const msg = st?.reason || "Firebase not configured.";
    toast(msg);
    if (typeof showModal === "function") {
      const body = document.createElement("div");
      body.innerHTML = `<p>${msg}</p><p>Sign-in requires hosting over https:// (or http://localhost) with a valid Firebase web config.</p>`;
      showModal("Sign-in blocked", body);
    }
    return Promise.resolve({ started: false, reason: "not-configured" });
  }

  // Extra guard for insecure context
  const secure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!secure) {
    const note = "Google sign-in needs https:// or http://localhost. Current context is blocked (likely a firewall/security restriction).";
    toast(note);
    if (typeof showModal === "function") {
      const body = document.createElement("div");
      body.innerHTML = `<p>${note}</p><p>Please host the folder with a local server (e.g., VS Code Live Server) or deploy to GitHub Pages.</p>`;
      showModal("Sign-in blocked", body);
    }
    return Promise.resolve({ started: false, reason: "insecure-context" });
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const isOpera = /OPR\//i.test(navigator.userAgent) || /Opera/i.test(navigator.userAgent);

  const doRedirect = () =>
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => auth.signInWithRedirect(provider))
      .then(() => ({ started: true, mode: "redirect" }))
      .catch((err) => {
        toast(err.message);
        return { started: false, reason: err.code || "redirect-failed" };
      });

  toast("Opening Google sign-in...");

  const tryPopup = () =>
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => auth.signInWithPopup(provider))
      .then(() => ({ started: true, mode: "popup" }))
      .catch((error) => {
        if (
          error.code === "auth/operation-not-supported-in-this-environment" ||
          error.code === "auth/popup-blocked" ||
          error.code === "auth/popup-closed-by-user"
        ) {
          return doRedirect();
        } else {
          toast(error.message);
          return { started: false, reason: error.code || "popup-failed" };
        }
      });

  if (options.forceRedirect || isMobile || isOpera) {
    return doRedirect();
  }

  return tryPopup();
}

function observeAuth() {
  if (!auth) {
    return;
  }
  auth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => auth.getRedirectResult())
    .catch((error) => {
      console.error("Redirect error", error);
      if (error && /missing initial state/i.test(error.message || "")) {
        toast("Sign-in blocked by browser storage. Enable cookies for firebaseapp.com and retry.");
      } else {
        toast(error.message || "Sign-in failed. Check authorized domain.");
      }
    })
    .finally(() => {
      auth.onAuthStateChanged((user) => {
        authState.user = user || null;
        if (user) {
          setActiveProgressScope(user.uid);
          window.gqProgressHydrated = false;
          toast(`Signed in as ${user.displayName || user.email}`);
          loadRemoteProgress(user.uid);
          if (typeof syncSocialAuthProfile === "function") {
            syncSocialAuthProfile().catch((error) => console.error("Social profile sync failed", error));
          }
        } else {
          setActiveProgressScope("");
          window.gqProgressHydrated = true;
          toast("Signed out. Please sign in to continue.");
          if (typeof resetSocialState === "function") {
            resetSocialState();
          }
        }
        const signBtn = document.getElementById("sign-in-btn");
        const logBtn = document.getElementById("log-in-btn");
        const outBtn = document.getElementById("logout-btn");
        const heroSignBtn = document.getElementById("hero-sign-in-btn");
        const heroLogBtn = document.getElementById("hero-log-in-btn");
        const heroOutBtn = document.getElementById("hero-logout-btn");
        const syncBadge = document.getElementById("hero-sync-badge");
        if (signBtn && logBtn && outBtn) {
          const signedIn = !!user;
          signBtn.style.display = signedIn ? "none" : "";
          logBtn.style.display = signedIn ? "none" : "";
          outBtn.style.display = signedIn ? "" : "none";
        }
        if (heroSignBtn && heroLogBtn && heroOutBtn) {
          const signedIn = !!user;
          heroSignBtn.style.display = signedIn ? "none" : "";
          heroLogBtn.style.display = signedIn ? "none" : "";
          heroOutBtn.style.display = signedIn ? "" : "none";
        }
        if (syncBadge) {
          syncBadge.textContent = user ? "Google sync on" : "Sign in required";
        }
        window.dispatchEvent(new CustomEvent("gq-auth-changed", { detail: { user: authState.user } }));
      });
    });
}

function loadRemoteProgress(uid) {
  if (!db) {
    window.gqProgressHydrated = true;
    return;
  }
  const lang = String(localStorage.getItem("activeLanguage") || (typeof window.getLanguage === "function" ? window.getLanguage() : "greek")).trim().toLowerCase() === "hebrew" ? "hebrew" : "greek";
  const key = getScopedProgressKey(uid);
  db.collection("users")
    .doc(uid)
    .collection("private")
    .doc(`progress_${lang}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const remoteData = doc.data() || {};
        const localRaw = localStorage.getItem(key);
        let localUpdatedAt = 0;
        if (localRaw) {
          try {
            localUpdatedAt = JSON.parse(localRaw)?.updatedAt || 0;
          } catch (error) {
            console.error("Could not parse local progress timestamp", error);
          }
        }
        const remoteUpdatedAt = Number.isFinite(remoteData.updatedAt) ? remoteData.updatedAt : 0;
        if (localUpdatedAt > remoteUpdatedAt) {
          saveRemoteProgress(uid);
          window.gqProgressHydrated = true;
          window.dispatchEvent(new CustomEvent("gq-progress-hydrated"));
          return;
        }
        applyProgress(remoteData);
        localStorage.setItem(key, JSON.stringify({
          ...(typeof getProgressPayload === "function" ? getProgressPayload() : {}),
          ...remoteData
        }));
      } else {
        saveRemoteProgress(uid);
      }
      window.gqProgressHydrated = true;
      window.dispatchEvent(new CustomEvent("gq-progress-hydrated"));
    })
    .catch(() => {
      window.gqProgressHydrated = true;
      window.dispatchEvent(new CustomEvent("gq-progress-hydrated"));
    });
}

function saveRemoteProgress(uid) {
  if (!db) {
    return;
  }
  const payload = typeof getRemoteProgressPayload === "function" ? getRemoteProgressPayload() : getProgressPayload();
  const lang = String(localStorage.getItem("activeLanguage") || (typeof window.getLanguage === "function" ? window.getLanguage() : "greek")).trim().toLowerCase() === "hebrew" ? "hebrew" : "greek";
  const key = getScopedProgressKey(uid);
  try {
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (_) {}
  db.collection("users").doc(uid).collection("private").doc(`progress_${lang}`).set(payload, { merge: true });
}

function syncProgress() {
  if (authState.user) {
    saveRemoteProgress(authState.user.uid);
  }
}

function signOutUser() {
  if (!auth) {
    toast("Firebase not ready.");
    return;
  }
  auth.signOut().catch((err) => toast(err.message));
}

document.addEventListener("DOMContentLoaded", () => {
  updateAuthButton();
  if (typeof applySidebarPreference === "function") {
    applySidebarPreference();
    window.addEventListener("resize", applySidebarPreference);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      syncProgress();
    }
  });
  window.addEventListener("pagehide", syncProgress);
});

observeAuth();
