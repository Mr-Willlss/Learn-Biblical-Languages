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
    const map = lang === 'hebrew' ? {
      'dashboard.html': 'dashboard-hebrew.html?lang=hebrew',
      'lessons.html': 'lessons-hebrew.html?lang=hebrew',
      'practice.html': 'practice-hebrew.html?lang=hebrew',
      'vocabulary.html': 'vocabulary-hebrew.html?lang=hebrew',
      'lesson-player.html': 'lesson-hebrew.html',
      'quests.html': 'quests-hebrew.html?lang=hebrew',
      'leaderboard.html': 'leaderboard-hebrew.html?lang=hebrew',
      'rewards.html': 'rewards-hebrew.html?lang=hebrew',
      'friends.html': 'friends-hebrew.html?lang=hebrew',
      'study-room.html': 'study-room-hebrew.html?lang=hebrew',
      'profile.html': 'profile.html?lang=hebrew'
    } : {
      'dashboard-hebrew.html?lang=hebrew': 'dashboard.html',
      'lessons-hebrew.html?lang=hebrew': 'lessons.html',
      'practice-hebrew.html?lang=hebrew': 'practice.html',
      'vocabulary-hebrew.html?lang=hebrew': 'vocabulary.html',
      'lesson-hebrew.html': 'lesson-player.html',
      'quests-hebrew.html?lang=hebrew': 'quests.html',
      'leaderboard-hebrew.html?lang=hebrew': 'leaderboard.html',
      'rewards-hebrew.html?lang=hebrew': 'rewards.html',
      'friends-hebrew.html?lang=hebrew': 'friends.html',
      'study-room-hebrew.html?lang=hebrew': 'study-room.html'
    };
    scope.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (lang === 'hebrew') {
        if (href === 'dashboard.html') a.setAttribute('href', map['dashboard.html']);
        if (href === 'lessons.html') a.setAttribute('href', map['lessons.html']);
        if (href === 'practice.html') a.setAttribute('href', map['practice.html']);
        if (href === 'vocabulary.html') a.setAttribute('href', map['vocabulary.html']);
        if (href === 'quests.html') a.setAttribute('href', map['quests.html']);
        if (href === 'leaderboard.html') a.setAttribute('href', map['leaderboard.html']);
        if (href === 'rewards.html') a.setAttribute('href', map['rewards.html']);
        if (href === 'friends.html') a.setAttribute('href', map['friends.html']);
        if (href === 'study-room.html') a.setAttribute('href', map['study-room.html']);
        if (href === 'profile.html') a.setAttribute('href', map['profile.html']);
        if (href.startsWith('lesson-player.html?')) a.setAttribute('href', `lesson-hebrew.html?${href.split('?')[1] || ''}`);
      } else {
        if (href === 'dashboard-hebrew.html?lang=hebrew') a.setAttribute('href', map['dashboard-hebrew.html?lang=hebrew']);
        if (href === 'lessons-hebrew.html?lang=hebrew') a.setAttribute('href', map['lessons-hebrew.html?lang=hebrew']);
        if (href === 'practice-hebrew.html?lang=hebrew') a.setAttribute('href', map['practice-hebrew.html?lang=hebrew']);
        if (href === 'vocabulary-hebrew.html?lang=hebrew') a.setAttribute('href', map['vocabulary-hebrew.html?lang=hebrew']);
        if (href.startsWith('lesson-hebrew.html?')) a.setAttribute('href', `lesson-player.html?${href.split('?')[1] || ''}`);
        if (href === 'quests-hebrew.html?lang=hebrew') a.setAttribute('href', map['quests-hebrew.html?lang=hebrew']);
        if (href === 'leaderboard-hebrew.html?lang=hebrew') a.setAttribute('href', map['leaderboard-hebrew.html?lang=hebrew']);
        if (href === 'rewards-hebrew.html?lang=hebrew') a.setAttribute('href', map['rewards-hebrew.html?lang=hebrew']);
        if (href === 'friends-hebrew.html?lang=hebrew') a.setAttribute('href', map['friends-hebrew.html?lang=hebrew']);
        if (href === 'study-room-hebrew.html?lang=hebrew') a.setAttribute('href', map['study-room-hebrew.html?lang=hebrew']);
      }
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
