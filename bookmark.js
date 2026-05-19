// bookmark.js — Bookmarks & Notes (local-only)
// Injects the UI on every page and persists to localStorage.
(function () {
  const NOTES_KEY = 'kgNotes';
  const BOOKMARKS_KEY = 'kgBookmarks';

  function ensureStyles() {
    if (document.getElementById('kg-bookmark-styles')) return;
    const style = document.createElement('style');
    style.id = 'kg-bookmark-styles';
    style.textContent = `
      #bookmark-btn {
        position: fixed;
        bottom: 24px;
        right: 20px;
        z-index: 1000;
        background: #6c47ff;
        color: #ffffff;
        border: none;
        border-radius: 50px;
        padding: 14px 18px;
        font-size: 1.3rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(108,71,255,0.5);
        transition: transform 0.15s ease;
      }

      #bookmark-btn:active { transform: scale(0.93); }

      .bookmark-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background: #1e1e2e;
        border-top: 2px solid #6c47ff;
        border-radius: 20px 20px 0 0;
        padding: 16px;
        max-height: 70vh;
        overflow-y: auto;
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
      }

      .bookmark-panel.visible { transform: translateY(0); }
      .bookmark-panel.hidden { display: none; }

      .bm-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
        color: #fff;
        font-weight: 600;
      }

      #bm-close {
        background: none;
        border: none;
        color: #aaa;
        font-size: 1.2rem;
        cursor: pointer;
      }

      .bm-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 14px;
      }

      .bm-tab {
        flex: 1;
        padding: 9px;
        border-radius: 8px;
        border: 1px solid #444;
        background: transparent;
        color: #aaa;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.2s;
      }

      .bm-tab.active {
        background: #6c47ff;
        color: #fff;
        border-color: #6c47ff;
      }

      .bm-tab-content { display: none; }
      .bm-tab-content.active { display: block; }

      #bm-note-input {
        width: 100%;
        min-height: 100px;
        background: #2a2a3e;
        border: 1px solid #444;
        border-radius: 10px;
        color: #fff;
        padding: 12px;
        font-size: 0.9rem;
        resize: vertical;
        margin-bottom: 10px;
        font-family: inherit;
      }

      .bm-note-actions {
        display: flex;
        gap: 8px;
        margin-bottom: 14px;
      }

      .bm-note-actions button,
      #bm-bookmark-current {
        flex: 1;
        padding: 10px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 0.85rem;
        transition: background 0.15s;
      }

      .bm-note-actions button:first-child,
      #bm-bookmark-current {
        background: #6c47ff;
        color: #fff;
        width: 100%;
        margin-bottom: 12px;
      }

      .bm-note-actions button:last-child {
        background: #2a2a3e;
        color: #aaa;
        border: 1px solid #444;
      }

      .bm-list { display: flex; flex-direction: column; gap: 10px; }

      .bm-item {
        background: #2a2a3e;
        border: 1px solid #333;
        border-radius: 10px;
        padding: 12px;
        position: relative;
      }

      .bm-item-title {
        font-size: 0.75rem;
        color: #6c47ff;
        margin-bottom: 4px;
      }

      .bm-item-text {
        font-size: 0.85rem;
        color: #ddd;
        line-height: 1.4;
        white-space: pre-wrap;
      }

      .bm-item-date {
        font-size: 0.7rem;
        color: #666;
        margin-top: 6px;
      }

      .bm-item-delete {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 0.8rem;
      }

      .bm-item-delete:hover { color: #ff4444; }

      .bm-empty {
        color:#666;
        font-size:0.85rem;
        text-align:center;
        padding:20px 0;
      }
    `;
    document.head.appendChild(style);
  }

  function injectUi() {
    if (document.getElementById('bookmark-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'bookmark-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Bookmarks and Notes');
    btn.textContent = '🔖';

    const panel = document.createElement('div');
    panel.id = 'bookmark-panel';
    panel.className = 'bookmark-panel hidden';
    panel.innerHTML = `
      <div class="bm-header">
        <span>🔖 My Notes & Bookmarks</span>
        <button id="bm-close" type="button">✕</button>
      </div>

      <div class="bm-tabs">
        <button class="bm-tab active" data-tab="notes" type="button">📝 Notes</button>
        <button class="bm-tab" data-tab="bookmarks" type="button">🔖 Bookmarks</button>
      </div>

      <div id="bm-notes-tab" class="bm-tab-content active">
        <textarea id="bm-note-input" placeholder="Write a note about this lesson, a word you want to remember, or anything useful..."></textarea>
        <div class="bm-note-actions">
          <button id="bm-save-note" type="button">Save Note</button>
          <button id="bm-clear-note" type="button">Clear</button>
        </div>
        <div id="bm-notes-list" class="bm-list"></div>
      </div>

      <div id="bm-bookmarks-tab" class="bm-tab-content">
        <button id="bm-bookmark-current" type="button">+ Bookmark Current Lesson</button>
        <div id="bm-bookmarks-list" class="bm-list"></div>
      </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);
  }

  function getCurrentLessonContext() {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson') || 'general';
    const lessonName = document.title || 'Current Page';
    return { id: String(lessonId), name: String(lessonName) };
  }

  function getNotes() {
    try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '[]'); } catch (_) { return []; }
  }
  function saveNotes(notes) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(Array.isArray(notes) ? notes : []));
  }

  function getBookmarks() {
    try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'); } catch (_) { return []; }
  }
  function saveBookmarks(bookmarks) {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.isArray(bookmarks) ? bookmarks : []));
  }

  function renderNotes() {
    const list = document.getElementById('bm-notes-list');
    if (!list) return;
    const notes = getNotes();
    if (!notes.length) {
      list.innerHTML = `<div class="bm-empty">No notes yet. Write your first note above!</div>`;
      return;
    }
    list.innerHTML = notes.map(note => `
      <div class="bm-item" data-note-id="${String(note.id)}">
        <div class="bm-item-title">${(note.lesson && note.lesson.name) ? escapeHtml(note.lesson.name) : 'General'}</div>
        <div class="bm-item-text">${escapeHtml(String(note.text || ''))}</div>
        <div class="bm-item-date">${escapeHtml(String(note.date || ''))}</div>
        <button class="bm-item-delete" type="button" data-del-note="${String(note.id)}">✕</button>
      </div>
    `).join('');
  }

  function renderBookmarks() {
    const list = document.getElementById('bm-bookmarks-list');
    if (!list) return;
    const bookmarks = getBookmarks();
    if (!bookmarks.length) {
      list.innerHTML = `<div class="bm-empty">No bookmarks yet. Bookmark a lesson above!</div>`;
      return;
    }
    list.innerHTML = bookmarks.map(bm => `
      <div class="bm-item" data-bm-id="${String(bm.id)}">
        <div class="bm-item-title">Lesson ${escapeHtml(String(bm.lessonId || ''))}</div>
        <div class="bm-item-text">${escapeHtml(String(bm.lessonName || ''))}</div>
        <div class="bm-item-date">Saved ${escapeHtml(String(bm.date || ''))}</div>
        <button class="bm-item-delete" type="button" data-del-bm="${String(bm.id)}">✕</button>
        <a href="${escapeAttr(String(bm.url || '#'))}" style="display:block;margin-top:8px;color:#6c47ff;font-size:0.8rem">Go to lesson →</a>
      </div>
    `).join('');
  }

  function openPanel() {
    const panel = document.getElementById('bookmark-panel');
    if (!panel) return;
    panel.classList.remove('hidden');
    setTimeout(() => panel.classList.add('visible'), 10);
    renderNotes();
    renderBookmarks();
  }

  function closePanel() {
    const panel = document.getElementById('bookmark-panel');
    if (!panel) return;
    panel.classList.remove('visible');
    setTimeout(() => panel.classList.add('hidden'), 300);
  }

  function setActiveTab(tabName) {
    const tabs = document.querySelectorAll('.bm-tab');
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    const notesTab = document.getElementById('bm-notes-tab');
    const bmTab = document.getElementById('bm-bookmarks-tab');
    if (notesTab) notesTab.classList.toggle('active', tabName === 'notes');
    if (bmTab) bmTab.classList.toggle('active', tabName === 'bookmarks');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/`/g, '&#96;');
  }

  function notify(msg) {
    try {
      if (typeof window.toast === 'function') window.toast(msg);
      else if (typeof window.showToast === 'function') window.showToast(msg, 'info', 'Notes');
      else console.log(msg);
    } catch (_) {
      console.log(msg);
    }
  }

  function bindEvents() {
    const btn = document.getElementById('bookmark-btn');
    const panel = document.getElementById('bookmark-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isHidden = panel.classList.contains('hidden');
      if (isHidden) openPanel();
      else closePanel();
    });

    panel.addEventListener('click', (e) => {
      const close = e.target.closest('#bm-close');
      if (close) { closePanel(); return; }

      const tab = e.target.closest('.bm-tab');
      if (tab) { setActiveTab(tab.dataset.tab); return; }

      const saveNoteBtn = e.target.closest('#bm-save-note');
      if (saveNoteBtn) {
        const input = document.getElementById('bm-note-input');
        const text = (input && input.value) ? input.value.trim() : '';
        if (!text) return;
        const notes = getNotes();
        notes.unshift({
          id: Date.now(),
          text,
          lesson: getCurrentLessonContext(),
          date: new Date().toLocaleDateString()
        });
        saveNotes(notes);
        if (input) input.value = '';
        renderNotes();
        notify('Note saved.');
        return;
      }

      const clearNoteBtn = e.target.closest('#bm-clear-note');
      if (clearNoteBtn) {
        const input = document.getElementById('bm-note-input');
        if (input) input.value = '';
        return;
      }

      const bookmarkBtn = e.target.closest('#bm-bookmark-current');
      if (bookmarkBtn) {
        const context = getCurrentLessonContext();
        const bookmarks = getBookmarks();
        const exists = bookmarks.find(b => String(b.lessonId) === String(context.id));
        if (exists) {
          notify('This lesson is already bookmarked.');
          return;
        }
        bookmarks.unshift({
          id: Date.now(),
          lessonId: context.id,
          lessonName: context.name,
          url: window.location.href,
          date: new Date().toLocaleDateString()
        });
        saveBookmarks(bookmarks);
        renderBookmarks();
        notify('Bookmark saved.');
        return;
      }

      const delNote = e.target.closest('[data-del-note]');
      if (delNote) {
        const id = Number(delNote.getAttribute('data-del-note'));
        const notes = getNotes().filter(n => Number(n.id) !== id);
        saveNotes(notes);
        renderNotes();
        notify('Note deleted.');
        return;
      }

      const delBm = e.target.closest('[data-del-bm]');
      if (delBm) {
        const id = Number(delBm.getAttribute('data-del-bm'));
        const bookmarks = getBookmarks().filter(b => Number(b.id) !== id);
        saveBookmarks(bookmarks);
        renderBookmarks();
        notify('Bookmark removed.');
        return;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });
  }

  function initBookmarks() {
    ensureStyles();
    injectUi();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', initBookmarks);
})();

