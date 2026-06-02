// progress-manager.js
// Unified single source of truth for app progress.
(function(){
  const KEY = 'kgProgress';
  const MIGRATED_KEY = 'kgProgressMigrated';
  const SIGNED_OUT_SCOPE = 'signedout';
  let currentScope = SIGNED_OUT_SCOPE;

  function normalizeScope(scope) {
    const value = String(scope || '').trim();
    return value || SIGNED_OUT_SCOPE;
  }

  function getStorageKey() {
    return `${KEY}:${normalizeScope(currentScope)}`;
  }

  const WORLD_STRUCTURE = [
    { id: 1, lessons: [1,2,3,4,5], requiredWorld: null },
    { id: 2, lessons: [6,7,8,9,10], requiredWorld: 1 },
    { id: 3, lessons: [11,12,13,14,15], requiredWorld: 2 },
    { id: 4, lessons: [16,17,18,19,20], requiredWorld: 3 },
    { id: 5, lessons: [21,22,23,24], requiredWorld: 4 }
  ];

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

  function normalizeLessons(list){
    const set = new Set((Array.isArray(list) ? list : []).map(Number).filter(n => Number.isFinite(n) && n >= 1 && n <= 24));
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
      merged.currentLesson = Math.min(24, merged.currentLesson);
      return merged;
    } catch(_) {
      return { ...DEFAULT_PROGRESS };
    }
  }

  function saveProgress(progress){
    localStorage.setItem(getStorageKey(), JSON.stringify(progress));
  }

  function recalcWorlds(progress){
    const p = progress;
    if (!Array.isArray(p.unlockedWorlds) || !p.unlockedWorlds.length) p.unlockedWorlds = [1];
    if (!Array.isArray(p.completedWorlds)) p.completedWorlds = [];

    WORLD_STRUCTURE.forEach(world => {
      const allDone = world.lessons.every(id => p.completedLessons.includes(id));
      if (allDone && !p.completedWorlds.includes(world.id)) {
        p.completedWorlds.push(world.id);
      }
      if (allDone) {
        const nextWorld = WORLD_STRUCTURE.find(w => w.requiredWorld === world.id);
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
    if (passed) p.currentLesson = Math.min(24, Math.max(Number(p.currentLesson) || 1, id + 1));
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
    const world = WORLD_STRUCTURE.find(w => w.id === Number(worldId));
    if (!world) return { done: 0, total: 0 };
    const done = world.lessons.filter(id => p.completedLessons.includes(id)).length;
    return { done, total: world.lessons.length };
  }

  function isPracticeUnlocked(){
    return getProgress().completedLessons.length >= 1;
  }

  function getNextLesson(){
    const p = getProgress();
    for (const world of WORLD_STRUCTURE) {
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
    const storageKey = `${KEY}:${scope}`;
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
        userRef.collection('private').doc('progress').set({
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
        if (id >= 1 && id <= 24 && !p.completedLessons.includes(id)) p.completedLessons.push(id);
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
        if (id >= 1 && id <= 24 && row.completed) {
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
        if (id >= 1 && id <= 24 && row.completed) {
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
      const doc = await db.collection('users').doc(userId).get();
      if (!doc.exists) return getProgress();

      const firebaseData = doc.data() || {};
      const merged = getProgress();

      const completedCount = Number(firebaseData.lessonsCompleted || 0);
      if (completedCount > 0) {
        for (let id = 1; id <= Math.min(24, completedCount); id++) {
          if (!merged.completedLessons.includes(id)) merged.completedLessons.push(id);
        }
      }

      if (Array.isArray(firebaseData.completedLessons)) {
        firebaseData.completedLessons.forEach(id => {
          id = Number(id);
          if (id >= 1 && id <= 24 && !merged.completedLessons.includes(id)) merged.completedLessons.push(id);
        });
      }

      merged.completedLessons = normalizeLessons(merged.completedLessons);
      if (Number(firebaseData.totalXP) > merged.totalXP) merged.totalXP = Number(firebaseData.totalXP);
      if (Number(firebaseData.xp) > merged.totalXP) merged.totalXP = Number(firebaseData.xp);
      if (Number(firebaseData.currentLesson) > merged.currentLesson) merged.currentLesson = Number(firebaseData.currentLesson);
      if (Number.isFinite(firebaseData.hearts)) merged.hearts = firebaseData.hearts;
      if (Number.isFinite(firebaseData.streak)) merged.streak = firebaseData.streak;
      if (typeof firebaseData.lastActiveDate === 'string' && firebaseData.lastActiveDate) merged.lastStudyDate = firebaseData.lastActiveDate;

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

  migrateOldProgress();

  window.WORLD_STRUCTURE = WORLD_STRUCTURE;
  window.DEFAULT_PROGRESS = DEFAULT_PROGRESS;
  window.getProgress = getProgress;
  window.saveProgress = saveProgress;
  window.markLessonComplete = markLessonComplete;
  window.isLessonComplete = isLessonComplete;
  window.getUnlockedLessons = function(){
    const p = getProgress();
    const unlocked = [];
    WORLD_STRUCTURE.forEach(w => {
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
    syncFromFirebase
  };
})();
