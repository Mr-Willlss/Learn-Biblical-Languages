// progress-manager.js
// Unified single source of truth for app progress.
(function(){
  const KEY = 'kgProgress';
  const MIGRATED_KEY = 'kgProgressMigrated';
  const SIGNED_OUT_SCOPE = 'signedout';
  const DEFAULT_LANGUAGE = 'greek';
  const MAX_LESSONS = { greek: 25, hebrew: 24 };
  const WORLD_STRUCTURES = {
    greek: [
      { id: 1, lessons: [1,2,3,4,5], requiredWorld: null },
      { id: 2, lessons: [6,7,8,9,10], requiredWorld: 1 },
      { id: 3, lessons: [11,12,13,14,15], requiredWorld: 2 },
      { id: 4, lessons: [16,17,18,19,20], requiredWorld: 3 },
      { id: 5, lessons: [21,22,23,24,25], requiredWorld: 4 }
    ],
    hebrew: [
      { id: 1, lessons: [1,2,3,4,5], requiredWorld: null },
      { id: 2, lessons: [6,7,8,9,10], requiredWorld: 1 },
      { id: 3, lessons: [11,12,13,14,15], requiredWorld: 2 },
      { id: 4, lessons: [16,17,18,19,20], requiredWorld: 3 },
      { id: 5, lessons: [21,22,23,24], requiredWorld: 4 }
    ]
  };
  let currentScope = SIGNED_OUT_SCOPE;
  let currentLanguage = DEFAULT_LANGUAGE;

  function normalizeScope(scope) {
    const value = String(scope || '').trim();
    return value || SIGNED_OUT_SCOPE;
  }

  function normalizeLanguage(language) {
    return String(language || '').trim().toLowerCase() === 'hebrew' ? 'hebrew' : DEFAULT_LANGUAGE;
  }

  function getMaxLesson() {
    return MAX_LESSONS[currentLanguage] || MAX_LESSONS[DEFAULT_LANGUAGE];
  }

  function getWorldStructure() {
    return WORLD_STRUCTURES[currentLanguage] || WORLD_STRUCTURES[DEFAULT_LANGUAGE];
  }

  function getStorageKey() {
    return `${KEY}:${currentLanguage}:${normalizeScope(currentScope)}`;
  }

  const DEFAULT_PROGRESS = {
    currentLesson: 1,
    completedLessons: [],
    totalXP: 0,
    hearts: 5,
    streak: 0,
    lastStudyDate: null,
    level: 1,
    unlockedWorlds: [1],
    completedWorlds: []
  };

  function safeParse(raw, fallback){
    try { return JSON.parse(raw); } catch(_) { return fallback; }
  }

  function normalizeLessons(list, maxLesson){
    const max = Number.isFinite(maxLesson) ? maxLesson : getMaxLesson();
    const set = new Set((Array.isArray(list) ? list : []).map(Number).filter(n => Number.isFinite(n) && n >= 1 && n <= max));
    return Array.from(set).sort((a,b) => a - b);
  }

  function getProgress(){
    try {
      const raw = localStorage.getItem(getStorageKey());
      if (!raw) return { ...DEFAULT_PROGRESS };
      const parsed = safeParse(raw, {});
      const merged = { ...DEFAULT_PROGRESS, ...(parsed || {}) };
      merged.completedLessons = normalizeLessons(merged.completedLessons);
      merged.unlockedWorlds = normalizeLessons(merged.unlockedWorlds).filter(w => w >= 1 && w <= 5);
      if (!merged.unlockedWorlds.length) merged.unlockedWorlds = [1];
      merged.completedWorlds = normalizeLessons(merged.completedWorlds).filter(w => w >= 1 && w <= 5);
      if (!Number.isFinite(merged.currentLesson) || merged.currentLesson < 1) merged.currentLesson = 1;
      merged.currentLesson = Math.min(getMaxLesson(), merged.currentLesson);
      return merged;
    } catch(_) {
      return { ...DEFAULT_PROGRESS };
    }
  }

  function saveProgress(progress){
    localStorage.setItem(getStorageKey(), JSON.stringify(progress));
    void syncProgressToCloud(progress);
  }

  function buildCloudPayload(progress) {
    const p = progress || getProgress();
    return {
      updatedAt: Date.now(),
      xp: Number(p.totalXP) || 0,
      totalXP: Number(p.totalXP) || 0,
      level: Number(p.level) || 1,
      hearts: Number.isFinite(p.hearts) ? p.hearts : 5,
      streak: Number(p.streak) || 0,
      lastStudyDate: p.lastStudyDate || null,
      currentLesson: Math.min(getMaxLesson(), Math.max(1, Number(p.currentLesson) || 1)),
      lessonsCompleted: Array.isArray(p.completedLessons) ? p.completedLessons.length : 0,
      completedLessons: Array.isArray(p.completedLessons) ? p.completedLessons.slice() : [],
      unlockedWorlds: Array.isArray(p.unlockedWorlds) ? p.unlockedWorlds.slice() : [1],
      completedWorlds: Array.isArray(p.completedWorlds) ? p.completedWorlds.slice() : []
    };
  }

  async function syncProgressToCloud(progress) {
    const scope = normalizeScope(currentScope);
    if (scope === SIGNED_OUT_SCOPE) return;
    if (typeof db === 'undefined' || !db || typeof firebase === 'undefined') return;
    try {
      const payload = buildCloudPayload(progress);
      const userRef = db.collection('users').doc(scope);
      await Promise.all([
        userRef.set({
          xp: payload.xp,
          totalXP: payload.totalXP,
          level: payload.level,
          hearts: payload.hearts,
          streak: payload.streak,
          lastStudyDate: payload.lastStudyDate,
          currentLesson: payload.currentLesson,
          lessonsCompleted: payload.lessonsCompleted,
          completedLessons: payload.completedLessons,
          unlockedWorlds: payload.unlockedWorlds,
          completedWorlds: payload.completedWorlds
        }, { merge: true }),
        userRef.collection('private').doc(`progress_${currentLanguage}`).set(payload, { merge: true })
      ]);
    } catch (error) {
      console.warn('Could not sync progress to cloud:', error);
    }
  }

  function recalcWorlds(progress){
    const p = progress;
    if (!Array.isArray(p.unlockedWorlds) || !p.unlockedWorlds.length) p.unlockedWorlds = [1];
    if (!Array.isArray(p.completedWorlds)) p.completedWorlds = [];

    getWorldStructure().forEach(world => {
      const allDone = world.lessons.every(id => p.completedLessons.includes(id));
      if (allDone && !p.completedWorlds.includes(world.id)) {
        p.completedWorlds.push(world.id);
      }
      if (allDone) {
        const nextWorld = getWorldStructure().find(w => w.requiredWorld === world.id);
        if (nextWorld && !p.unlockedWorlds.includes(nextWorld.id)) {
          p.unlockedWorlds.push(nextWorld.id);
        }
      }
    });

    p.unlockedWorlds = Array.from(new Set(p.unlockedWorlds)).sort((a,b)=>a-b);
    p.completedWorlds = Array.from(new Set(p.completedWorlds)).sort((a,b)=>a-b);
  }

  function markLessonComplete(lessonId, scoreOrXp, xpEarned = 0){
    const id = Number(lessonId);
    if (!Number.isFinite(id) || id < 1) return getProgress();

    const p = getProgress();
    const isScoreMode = Number.isFinite(scoreOrXp) && scoreOrXp >= 0 && scoreOrXp <= 100;
    const passed = !isScoreMode || scoreOrXp >= 60;
    if (passed && !p.completedLessons.includes(id)) p.completedLessons.push(id);
    p.completedLessons = normalizeLessons(p.completedLessons);

    let xpToAdd = 0;
    if (Number.isFinite(xpEarned) && xpEarned > 0) xpToAdd = Math.round(xpEarned);
    else if (Number.isFinite(scoreOrXp) && scoreOrXp > 0 && scoreOrXp > 60) xpToAdd = Math.round(scoreOrXp);

    p.totalXP = Math.max(0, (Number(p.totalXP) || 0) + xpToAdd);
    if (passed) p.currentLesson = Math.min(getMaxLesson(), Math.max(Number(p.currentLesson) || 1, id + 1));
    p.lastStudyDate = new Date().toISOString().split('T')[0];
    recalcWorlds(p);
    saveProgress(p);
    return p;
  }

  function isLessonComplete(lessonId){
    return getProgress().completedLessons.includes(Number(lessonId));
  }

  function getWorldStatus(worldId){
    const p = getProgress();
    if (p.completedWorlds.includes(worldId)) return 'completed';
    if (p.unlockedWorlds.includes(worldId)) return 'active';
    return 'locked';
  }

  function getWorldProgressCount(worldId){
    const p = getProgress();
    const world = getWorldStructure().find(w => w.id === Number(worldId));
    if (!world) return { done: 0, total: 0 };
    const done = world.lessons.filter(id => p.completedLessons.includes(id)).length;
    return { done, total: world.lessons.length };
  }

  function isPracticeUnlocked(){
    return getProgress().completedLessons.length >= 1;
  }

  function getNextLesson(){
    const p = getProgress();
    for (const world of getWorldStructure()) {
      if (!p.unlockedWorlds.includes(world.id)) continue;
      const next = world.lessons.find(id => !p.completedLessons.includes(id));
      if (next) return next;
    }
    return null;
  }

  function getTotalXP(){
    return Number(getProgress().totalXP) || 0;
  }

  async function clearProgress(userId) {
    const scope = normalizeScope(userId || currentScope);
    const storageKey = `${KEY}:${currentLanguage}:${scope}`;
    const fresh = { ...DEFAULT_PROGRESS };
    try {
      localStorage.removeItem(storageKey);
      if (scope === currentScope) {
        saveProgress(fresh);
      }
    } catch (_) {}

    const hasFirebase = typeof firebase !== 'undefined' && firebase && firebase.firestore && typeof db !== 'undefined' && db;
    if (!scope || scope === SIGNED_OUT_SCOPE || !hasFirebase) {
      return fresh;
    }

    try {
      const userRef = db.collection('users').doc(scope);
      await Promise.all([
        userRef.set({
          xp: 0,
          level: 1,
          rank: 'Newcomer',
          lessonsCompleted: 0,
          currentLesson: 1,
          currentWorld: 1,
          streak: 0,
          lastActiveDate: '',
          achievements: {}
        }, { merge: true }),
        userRef.collection('private').doc(`progress_${currentLanguage}`).set({
          ...fresh,
          updatedAt: Date.now()
        })
      ]);
    } catch (error) {
      console.warn('Could not clear remote progress:', error);
    }

    return fresh;
  }

  function migrateOldProgress(){
    if (localStorage.getItem(MIGRATED_KEY)) return getProgress();

    const p = { ...DEFAULT_PROGRESS };
    const collectIds = (list) => {
      if (!Array.isArray(list)) return;
      list.map(Number).filter(Number.isFinite).forEach(id => {
        if (id >= 1 && id <= getMaxLesson() && !p.completedLessons.includes(id)) p.completedLessons.push(id);
      });
    };

    collectIds(safeParse(localStorage.getItem('completedLessons') || 'null', null));
    collectIds(safeParse(localStorage.getItem('lessonsCompleted') || 'null', null));

    const userProgress = safeParse(localStorage.getItem('userProgress') || 'null', null);
    if (userProgress && typeof userProgress === 'object') {
      collectIds(userProgress.completedLessons);
      if (Number.isFinite(userProgress.currentLesson)) p.currentLesson = Math.max(p.currentLesson, userProgress.currentLesson);
      if (Number.isFinite(userProgress.totalXP)) p.totalXP = Math.max(p.totalXP, userProgress.totalXP);
    }

    const oldLessonProgress = safeParse(localStorage.getItem('lessonProgress') || 'null', null);
    if (oldLessonProgress && typeof oldLessonProgress === 'object') {
      Object.keys(oldLessonProgress).forEach(key => {
        const row = oldLessonProgress[key] || {};
        const id = Number(key);
        if (id >= 1 && id <= getMaxLesson() && row.completed) {
          if (!p.completedLessons.includes(id)) p.completedLessons.push(id);
          p.totalXP += Number(row.xpEarned || 0) || 0;
        }
      });
    }

    const koineProgress = safeParse(localStorage.getItem('koine_progress') || 'null', null);
    if (koineProgress && typeof koineProgress === 'object') {
      Object.keys(koineProgress).forEach(key => {
        const row = koineProgress[key] || {};
        const id = Number(key);
        if (id >= 1 && id <= getMaxLesson() && row.completed) {
          if (!p.completedLessons.includes(id)) p.completedLessons.push(id);
          p.totalXP += Number(row.xpEarned || 0) || 0;
        }
      });
    }

    const oldCurrent = Number(localStorage.getItem('currentLesson') || 1);
    if (Number.isFinite(oldCurrent) && oldCurrent > 1) {
      for (let i = 1; i < oldCurrent; i++) {
        if (!p.completedLessons.includes(i)) p.completedLessons.push(i);
      }
      p.currentLesson = Math.max(p.currentLesson, oldCurrent);
    }

    p.completedLessons = normalizeLessons(p.completedLessons);
    recalcWorlds(p);
    if (!p.completedLessons.length) p.currentLesson = 1;
    saveProgress(p);
    console.log('Progress migrated:', p);
    localStorage.setItem(MIGRATED_KEY, 'true');
    return p;
  }

  async function syncFromFirebase(userId){
    try {
      setProgressScope(userId || SIGNED_OUT_SCOPE);
      if (!userId || typeof db === 'undefined' || !db) return getProgress();
      const userRef = db.collection('users').doc(userId);
      const [doc, privateDoc] = await Promise.all([
        userRef.get(),
        userRef.collection('private').doc(`progress_${currentLanguage}`).get()
      ]);
      const firebaseData = {
        ...(privateDoc.exists ? (privateDoc.data() || {}) : {}),
        ...(doc.exists ? (doc.data() || {}) : {})
      };
      const merged = getProgress();

      const completedCount = Number(firebaseData.lessonsCompleted || 0);
      if (completedCount > 0) {
        for (let id = 1; id <= Math.min(getMaxLesson(), completedCount); id++) {
          if (!merged.completedLessons.includes(id)) merged.completedLessons.push(id);
        }
      }

      if (Array.isArray(firebaseData.completedLessons)) {
        firebaseData.completedLessons.forEach(id => {
          id = Number(id);
          if (id >= 1 && id <= getMaxLesson() && !merged.completedLessons.includes(id)) merged.completedLessons.push(id);
        });
      }

      merged.completedLessons = normalizeLessons(merged.completedLessons);
      if (Number(firebaseData.totalXP) > merged.totalXP) merged.totalXP = Number(firebaseData.totalXP);
      if (Number(firebaseData.xp) > merged.totalXP) merged.totalXP = Number(firebaseData.xp);
      if (Number(firebaseData.currentLesson) > merged.currentLesson) merged.currentLesson = Number(firebaseData.currentLesson);
      if (Number.isFinite(firebaseData.lessonsCompleted)) {
        const count = Math.max(0, Number(firebaseData.lessonsCompleted));
        for (let id = 1; id <= Math.min(getMaxLesson(), count); id++) {
          if (!merged.completedLessons.includes(id)) merged.completedLessons.push(id);
        }
      }
      if (Array.isArray(firebaseData.completedLessons)) {
        firebaseData.completedLessons.forEach(id => {
          id = Number(id);
          if (id >= 1 && id <= getMaxLesson() && !merged.completedLessons.includes(id)) merged.completedLessons.push(id);
        });
      }
      if (Number.isFinite(firebaseData.hearts)) merged.hearts = firebaseData.hearts;
      if (Number.isFinite(firebaseData.streak)) merged.streak = firebaseData.streak;
      if (typeof firebaseData.lastActiveDate === 'string' && firebaseData.lastActiveDate) merged.lastStudyDate = firebaseData.lastActiveDate;
      if (typeof firebaseData.lastStudyDate === 'string' && firebaseData.lastStudyDate) merged.lastStudyDate = firebaseData.lastStudyDate;
      if (Number.isFinite(firebaseData.level)) merged.level = Number(firebaseData.level);

      recalcWorlds(merged);
      saveProgress(merged);
      return merged;
    } catch (e) {
      console.warn('Firebase sync failed, using local:', e);
      return getProgress();
    }
  }

  function setProgressScope(scope) {
    currentScope = normalizeScope(scope);
    return currentScope;
  }

  function getProgressScope() {
    return currentScope;
  }

  function setLanguageScope(language) {
    currentLanguage = normalizeLanguage(language);
    try { localStorage.setItem('activeLanguage', currentLanguage); } catch (_) {}
    return currentLanguage;
  }

  function getLanguage() {
    return currentLanguage;
  }

  function getCombinedStats(uid) {
    const scope = normalizeScope(uid || currentScope);
    return ['greek', 'hebrew'].reduce((acc, lang) => {
      const raw = localStorage.getItem(`${KEY}:${lang}:${scope}`);
      const parsed = safeParse(raw, {});
      acc.totalXP += Number(parsed.totalXP || parsed.xp || 0) || 0;
      acc.totalLessons += Array.isArray(parsed.completedLessons) ? parsed.completedLessons.length : (Number(parsed.lessonsCompleted || 0) || 0);
      acc.streak = Math.max(acc.streak, Number(parsed.streak || 0) || 0);
      return acc;
    }, { totalXP: 0, totalLessons: 0, streak: 0 });
  }

  const initialLanguage = normalizeLanguage(localStorage.getItem('activeLanguage') || DEFAULT_LANGUAGE);
  setLanguageScope(initialLanguage);

  migrateOldProgress();

  window.WORLD_STRUCTURE = getWorldStructure();
  window.DEFAULT_PROGRESS = DEFAULT_PROGRESS;
  window.getProgress = getProgress;
  window.saveProgress = saveProgress;
  window.markLessonComplete = markLessonComplete;
  window.isLessonComplete = isLessonComplete;
  window.getUnlockedLessons = function(){
    const p = getProgress();
    const unlocked = [];
    getWorldStructure().forEach(w => {
      if (p.unlockedWorlds.includes(w.id)) unlocked.push(...w.lessons);
    });
    return unlocked.sort((a,b)=>a-b);
  };
  window.getWorldStatus = getWorldStatus;
  window.getWorldProgressCount = getWorldProgressCount;
  window.isPracticeUnlocked = isPracticeUnlocked;
  window.getNextLesson = getNextLesson;
  window.getTotalXP = getTotalXP;
  window.clearProgress = clearProgress;
  window.migrateOldProgress = migrateOldProgress;
  window.setProgressScope = setProgressScope;
  window.getProgressScope = getProgressScope;
  window.setLanguageScope = setLanguageScope;
  window.getLanguage = getLanguage;
  window.getWorldStructure = getWorldStructure;
  window.getMaxLesson = getMaxLesson;
  window.getCombinedStats = getCombinedStats;
  window.syncFromFirebase = syncFromFirebase;

  window.Progress = {
    getProgress,
    saveProgress,
    markLessonComplete,
    isLessonComplete,
    getUnlockedLessons: window.getUnlockedLessons,
    getWorldStatus,
    getWorldProgressCount,
    isPracticeUnlocked,
    getNextLesson,
    getTotalXP,
    clearProgress,
    migrateOldProgress,
    setProgressScope,
    getProgressScope,
    setLanguageScope,
    getLanguage,
    getWorldStructure,
    getMaxLesson,
    getCombinedStats,
    syncFromFirebase
  };
  window.ProgressManager = window.Progress;
})();
