// admin-auth.js
// Blocks non-admin users from accessing admin.html
(function () {
  function deny(message) {
    try { alert(message); } catch (_) {}
    window.location.href = 'dashboard.html';
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.firebase || !firebase.auth || !firebase.firestore) {
      deny('Firebase not available. Admin portal cannot load.');
      return;
    }

    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = 'index.html';
        return;
      }

      try {
        const doc = await firebase.firestore().collection('users').doc(user.uid).get();
        const userData = doc.exists ? (doc.data() || {}) : null;

        if (!userData || !userData.isAdmin) {
          deny('Access denied. Admin only.');
          return;
        }

        if (typeof window.initAdminPortal === 'function') {
          window.initAdminPortal(user, userData);
        } else {
          deny('Admin portal failed to initialize.');
        }
      } catch (err) {
        console.error('Admin auth error:', err);
        deny('Admin auth error. Redirecting…');
      }
    });
  });
})();

