(function () {
  function ensureSharedUiStyles() {
    if (document.getElementById('kg-shared-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'kg-shared-ui-styles';
    style.textContent = `
      /* Mobile header breathing room (student app) */
      #top-bar{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:10px 12px !important;
        gap:0 !important;
        overflow:hidden;
        min-height:52px;
        max-height:60px;
        width:100%;
        box-sizing:border-box;
      }
      #top-bar .tbTitle{
        font-size:0.95rem !important;
        font-weight:800;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        max-width:90px;
        flex-shrink:0;
      }
      #top-bar .tbRight{
        display:flex;
        align-items:center;
        gap:6px !important;
        flex-shrink:0;
        margin-left:auto;
      }
      #top-bar .pill{
        padding:6px 8px !important;
        font-size:0.80rem !important;
        gap:6px !important;
      }
      #top-bar .avatar{width:28px !important;height:28px !important;border-radius:50% !important}
      #top-bar .miniName{display:none !important}
      @media (min-width: 600px){
        #top-bar .tbTitle{max-width:160px !important;font-size:1.05rem !important}
        #top-bar .avatar{width:34px !important;height:34px !important;border-radius:12px !important}
        #top-bar .miniName{display:flex !important}
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureSharedUiStyles();

    // Add an Admin Portal link in the student sidebar (admins only).
    // We keep this lightweight and non-blocking.
    document.addEventListener('authReady', async (ev) => {
      const user = ev?.detail || null;
      if (!user || !window.firebase || !firebase.firestore) return;
      const nav = document.querySelector('.nav');
      if (!nav || nav.querySelector('a[href="admin.html"]')) return;
      try {
        const snap = await firebase.firestore().collection('users').doc(user.uid).get();
        const data = snap.exists ? (snap.data() || {}) : {};
        if (!data.isAdmin) return;
        const a = document.createElement('a');
        a.href = 'admin.html';
        a.innerHTML = '<span class="ic">⚙️</span><span class="tx">Admin Portal</span>';
        nav.appendChild(a);
      } catch (_) {}
    }, { once: true });
  });
})();
