// language-support.js
(function(){
  function getActiveLanguage() {
    try {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || localStorage.getItem('activeLanguage') || 'greek';
      return String(lang).trim().toLowerCase() === 'hebrew' ? 'hebrew' : 'greek';
    } catch (_) {
      return 'greek';
    }
  }

  function getLanguageLabel(lang) {
    return String(lang || getActiveLanguage()).toLowerCase() === 'hebrew' ? 'Biblical Hebrew' : 'Koine Greek';
  }

  function getLessonDataMap() {
    const lang = getActiveLanguage();
    if (lang === 'hebrew' && window.HEBREW_LESSON_DATA) return window.HEBREW_LESSON_DATA;
    if (window.LESSON_DATA) return window.LESSON_DATA;
    return window.GREEK_LESSON_DATA || {};
  }

  function getLessonMax() {
    return getActiveLanguage() === 'hebrew' ? 24 : 25;
  }

  function applyLanguageScope() {
    const lang = getActiveLanguage();
    if (typeof window.setLanguageScope === 'function') {
      try { window.setLanguageScope(lang); } catch (_) {}
    }
    try { localStorage.setItem('activeLanguage', lang); } catch (_) {}
    return lang;
  }

  function applyLanguageLinks(root) {
    const lang = getActiveLanguage();
    const scope = root || document;
    if (!scope || typeof scope.querySelectorAll !== 'function') return lang;

    const pageMap = {
      'dashboard.html': 'dashboard-hebrew.html',
      'lessons.html': 'lessons-hebrew.html',
      'practice.html': 'practice-hebrew.html',
      'vocabulary.html': 'vocabulary-hebrew.html',
      'quests.html': 'quests-hebrew.html',
      'leaderboard.html': 'leaderboard-hebrew.html',
      'rewards.html': 'rewards-hebrew.html',
      'friends.html': 'friends-hebrew.html',
      'study-room.html': 'study-room-hebrew.html',
      'lesson-player.html': 'lesson-hebrew.html',
      'profile.html': 'profile.html'
    };

    const reverseMap = Object.fromEntries(Object.entries(pageMap).map(([key, value]) => [value, key]));

    function buildHref(href) {
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return null;
      try {
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) return null;
        const filename = url.pathname.split('/').pop();
        const params = new URLSearchParams(url.search);

        if (lang === 'hebrew') {
          if (filename === 'lesson-player.html') {
            url.pathname = url.pathname.replace(/[^/]*$/, 'lesson-hebrew.html');
            params.set('lang', 'hebrew');
            url.search = params.toString() ? `?${params.toString()}` : '';
            return url.pathname + url.search + url.hash;
          }
          if (filename === 'profile.html') {
            params.set('lang', 'hebrew');
            url.search = `?${params.toString()}`;
            return url.pathname + url.search + url.hash;
          }
          if (filename in pageMap) {
            url.pathname = url.pathname.replace(/[^/]*$/, pageMap[filename]);
            params.set('lang', 'hebrew');
            url.search = `?${params.toString()}`;
            return url.pathname + url.search + url.hash;
          }
        } else {
          if (filename === 'lesson-hebrew.html') {
            url.pathname = url.pathname.replace(/[^/]*$/, 'lesson-player.html');
            params.delete('lang');
            url.search = params.toString() ? `?${params.toString()}` : '';
            return url.pathname + url.search + url.hash;
          }
          if (filename === 'profile.html') {
            params.delete('lang');
            url.search = params.toString() ? `?${params.toString()}` : '';
            return url.pathname + url.search + url.hash;
          }
          if (filename in reverseMap) {
            url.pathname = url.pathname.replace(/[^/]*$/, reverseMap[filename]);
            params.delete('lang');
            url.search = params.toString() ? `?${params.toString()}` : '';
            return url.pathname + url.search + url.hash;
          }
        }
      } catch (_) {
        return null;
      }
      return null;
    }

    scope.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      const target = buildHref(href);
      if (target) a.setAttribute('href', target);
    });

    return lang;
  }

  window.getActiveLanguage = getActiveLanguage;
  window.getLanguageLabel = getLanguageLabel;
  window.getLessonDataMap = getLessonDataMap;
  window.getLessonMax = getLessonMax;
  window.applyLanguageScope = applyLanguageScope;
  window.applyLanguageLinks = applyLanguageLinks;
})();
