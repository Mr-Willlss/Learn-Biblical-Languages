// admin.js — Admin Portal logic (Firebase compat)
// Exposes initAdminPortal(user, userData) for admin-auth.js.
(function () {
  let unsubStudents = null;
  let unsubGroups = null;
  let unsubAnnouncements = null;
  let unsubLeaderboard = null;
  let unsubActivity = null;

  const state = {
    me: null,
    meData: null,
    students: [],
    groups: [],
    announcements: [],
    leaderboard: [],
    sort: { key: 'displayName', dir: 'asc' },
    search: ''
  };

  function $(id) { return document.getElementById(id); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function todayStr() {
    return new Date().toISOString().split('T')[0];
  }

  function daysAgo(dateStr) {
    if (!dateStr) return Infinity;
    const ms = Date.parse(dateStr);
    if (!Number.isFinite(ms)) return Infinity;
    return Math.floor((Date.now() - ms) / 86400000);
  }

  function setView(view) {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    document.querySelectorAll('.view').forEach(sec => sec.classList.remove('active'));
    const v = $(`view-${view}`);
    if (v) v.classList.add('active');

    const title = ({
      overview: ['Overview', 'Monitor progress, engagement, and at-risk learners.'],
      students: ['Students', 'Search, sort, drill down, and take quick actions.'],
      lessons: ['Lessons', 'Spot which lessons are hardest and where students struggle.'],
      leaderboard: ['Leaderboard', 'Top performers across the cohort.'],
      groups: ['Study Groups', 'Create and manage group goals and membership.'],
      announcements: ['Announcements', 'Broadcast messages that appear in student notifications.'],
      settings: ['Settings', 'Admin account controls.']
    })[view] || ['Admin', ''];

    $('view-title').textContent = title[0];
    $('view-sub').textContent = title[1];
  }

  function showApp() {
    $('admin-loader').style.display = 'none';
    $('admin-app').style.display = 'flex';
  }

  function hideApp() {
    $('admin-loader').style.display = 'flex';
    $('admin-app').style.display = 'none';
  }

  function computeMetrics(students) {
    const total = students.length;
    const today = todayStr();
    const activeToday = students.filter(s => (s.lastActiveDate || '') === today).length;
    const accVals = students.map(s => Number(s.accuracy || 0)).filter(n => Number.isFinite(n) && n > 0);
    const streakVals = students.map(s => Number(s.streak || 0)).filter(n => Number.isFinite(n));
    const avgAcc = accVals.length ? (accVals.reduce((a,b)=>a+b,0) / accVals.length) : 0;
    const avgStreak = streakVals.length ? (streakVals.reduce((a,b)=>a+b,0) / streakVals.length) : 0;
    return {
      total,
      activeToday,
      avgAcc,
      avgStreak
    };
  }

  function renderOverview() {
    const m = computeMetrics(state.students);
    $('m-total').textContent = String(m.total);
    $('m-active').textContent = String(m.activeToday);
    $('m-acc').textContent = `${Math.round(m.avgAcc)}%`;
    $('m-streak').textContent = `${Math.round(m.avgStreak)}d`;

    renderAtRisk();
    renderWorldBars();
  }

  function studentLabel(s) {
    return (s.displayName || s.username || s.email || 'Student').trim();
  }

  function normalizeUser(id, d) {
    const data = d || {};
    return {
      id,
      // Identity
      displayName: data.displayName || (data.profile && data.profile.displayName) || 'Unknown',
      username: data.username || (data.profile && data.profile.username) || '',
      email: data.email || (data.profile && data.profile.email) || '—',
      photoURL: data.photoURL || (data.profile && data.profile.photoURL) || null,

      // Progress / performance
      level: Number(data.level) || Number(data.stats && data.stats.level) || 1,
      xp: Number(data.xp) || Number(data.stats && data.stats.totalXp) || 0,
      currentLesson: Number(data.currentLesson) || 1,
      lessonsCompleted: Number(data.lessonsCompleted) || Number(data.stats && data.stats.totalLessonsCompleted) || 0,
      streak: Number(data.streak) || Number(data.stats && data.stats.streakDays) || 0,
      hearts: (typeof data.hearts !== 'undefined') ? Number(data.hearts) : 5,
      lastActiveDate: data.lastActiveDate || '—',

      // Admin flag
      isAdmin: data.isAdmin === true,

      // Keep additional fields for other views (safe defaults)
      accuracy: Number(data.accuracy) || 0
    };
  }

  function renderAtRisk() {
    const host = $('at-risk-list');
    if (!host) return;
    const risky = state.students
      .map(s => {
        const inactiveDays = daysAgo(s.lastActiveDate);
        const lowAcc = Number(s.accuracy || 0) > 0 && Number(s.accuracy) < 50;
        const noHearts = Number(s.hearts) === 0;
        const issues = [];
        if (inactiveDays >= 7) issues.push(`Inactive ${inactiveDays}d`);
        if (lowAcc) issues.push(`Accuracy ${Math.round(Number(s.accuracy))}%`);
        if (noHearts) issues.push('0 hearts');
        return { s, issues, inactiveDays, lowAcc, noHearts };
      })
      .filter(x => x.issues.length)
      .sort((a,b) => b.issues.length - a.issues.length)
      .slice(0, 20);

    if (!risky.length) {
      host.innerHTML = `<div class="muted">No at-risk students flagged right now.</div>`;
      return;
    }

    host.innerHTML = risky.map(({ s, issues }) => `
      <div class="list-item">
        <div>
          <div class="tag red">⚠ ${escapeHtml(studentLabel(s))}</div>
          <div class="muted">${escapeHtml(issues.join(' • '))}</div>
        </div>
        <button class="btn" type="button" data-msg="${escapeHtml(s.id)}">Message</button>
      </div>
    `).join('');

    host.querySelectorAll('[data-msg]').forEach(btn => btn.addEventListener('click', async () => {
      const uid = btn.getAttribute('data-msg');
      await openMessagePrompt(uid);
    }));
  }

  function renderWorldBars() {
    const host = $('world-bars');
    if (!host) return;
    const total = Math.max(1, state.students.length);
    const completedCounts = [1,2,3,4,5].map(worldId => {
      const threshold = worldId === 1 ? 5 : worldId === 2 ? 10 : worldId === 3 ? 15 : worldId === 4 ? 20 : 24;
      const done = state.students.filter(s => Number(s.lessonsCompleted || 0) >= threshold).length;
      return { worldId, done, pct: Math.round((done / total) * 100) };
    });
    host.innerHTML = completedCounts.map(w => `
      <div class="bar-row">
        <div class="bar-label">World ${w.worldId}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${w.pct}%"></div></div>
        <div class="bar-val">${w.pct}%</div>
      </div>
    `).join('');
  }

  function renderActivity(items) {
    const host = $('activity-feed');
    if (!host) return;
    if (!items.length) {
      host.innerHTML = `<div class="muted">No recent activity found.</div>`;
      return;
    }
    host.innerHTML = items.map(a => {
      const rawWhen = a.createdAt || a.timestamp || null;
      const when = rawWhen && rawWhen.toDate ? rawWhen.toDate() : (rawWhen ? new Date(rawWhen) : null);
      const ts = when ? when.toLocaleString() : '';
      const t = a.title || a.description || a.type || 'Activity';
      const xp = (a.awardedXp ?? a.xpEarned) || 0;
      const right = xp ? `+${xp} XP` : ts;
      return `<div class="feed-item"><div><div class="t">${escapeHtml(t)}</div><div class="d">${escapeHtml(ts)}</div></div><div class="d">${escapeHtml(String(right))}</div></div>`;
    }).join('');
  }

  function getFilteredStudents() {
    const q = state.search.trim().toLowerCase();
    let list = state.students.slice();
    if (q) {
      list = list.filter(s =>
        String(s.displayName || '').toLowerCase().includes(q) ||
        String(s.username || '').toLowerCase().includes(q) ||
        String(s.email || '').toLowerCase().includes(q)
      );
    }
    const { key, dir } = state.sort;
    const mult = dir === 'desc' ? -1 : 1;
    list.sort((a,b) => {
      const av = a[key];
      const bv = b[key];
      if (key === 'displayName' || key === 'lastActiveDate') {
        return String(av || '').localeCompare(String(bv || '')) * mult;
      }
      return ((Number(av) || 0) - (Number(bv) || 0)) * mult;
    });
    return list;
  }

  function renderStudentsTable() {
    const tbody = $('students-table')?.querySelector('tbody');
    if (!tbody) return;
    const list = getFilteredStudents();
    $('student-count').textContent = `${list.length} student(s)`;

    tbody.innerHTML = list.map(s => `
      <tr class="student-row" data-id="${escapeHtml(s.id)}">
        <td>
          <div class="student-name-cell">
            ${s.photoURL
              ? `<img src="${escapeHtml(s.photoURL)}" class="student-thumb" alt="${escapeHtml(s.displayName)}">`
              : `<div class="student-thumb-placeholder">${escapeHtml(String(s.displayName || '?').charAt(0))}</div>`
            }
            <div>
              <div class="student-display-name">
                ${escapeHtml(s.displayName)}
                ${s.isAdmin ? '<span class="admin-label">👑 Admin</span>' : ''}
              </div>
              <div class="student-username">@${escapeHtml(s.username || '')}</div>
            </div>
          </div>
        </td>
        <td class="student-email">${escapeHtml(s.email || '—')}</td>
        <td>${escapeHtml(String(s.level || 1))}</td>
        <td>${escapeHtml(String(s.xp || 0))} XP</td>
        <td>Lesson ${escapeHtml(String(s.currentLesson || 1))}</td>
        <td>${escapeHtml(String(s.lessonsCompleted || 0))}</td>
        <td>${escapeHtml(String(s.streak || 0))}d 🔥</td>
        <td>${escapeHtml(String((s.hearts ?? 5)))}\/5 ❤️</td>
        <td>${escapeHtml(String(s.lastActiveDate || '—'))}</td>
        <td>
          <div class="action-dropdown">
            <select class="student-action" data-id="${escapeHtml(s.id)}">
              <option value="">Actions...</option>
              <option value="view">View Full Profile</option>
              <option value="message">Send Message</option>
              <option value="resetHearts">Reset Hearts</option>
              <option value="flag">Flag as At-Risk</option>
            </select>
          </div>
        </td>
      </tr>
    `).join('');

    // Row click opens drawer
    tbody.querySelectorAll('.student-row').forEach(row => row.addEventListener('click', () => {
      const uid = row.getAttribute('data-id');
      openStudentDrawer(uid);
    }));

    // Actions dropdown
    tbody.querySelectorAll('.student-action').forEach(sel => sel.addEventListener('change', async (event) => {
      event.stopPropagation();
      const uid = sel.getAttribute('data-id');
      const action = sel.value;
      sel.value = '';
      if (!action) return;
      await handleStudentAction(action, uid);
    }));
  }

  async function handleStudentAction(action, studentId) {
    const studentData = state.students.find(s => s.id === studentId) || null;
    if (!studentData) return;

    switch (action) {
      case 'view':
        openStudentDrawer(studentId);
        return;
      case 'message':
        setView('announcements');
        // Best-effort preselect student if dropdown exists
        setTimeout(() => {
          const dropdown = $('announcement-student-select');
          const targetSelect = $('announcement-target');
          if (targetSelect) {
            targetSelect.value = 'individual';
            targetSelect.dispatchEvent(new Event('change'));
          }
          if (dropdown) dropdown.value = studentId;
        }, 250);
        return;
      case 'resetHearts':
        if (window.confirm(`Reset hearts for ${studentData.displayName} to 5?`)) {
          await resetHearts(studentId);
          renderStudentsTable();
        }
        return;
      case 'flag':
        if (window.confirm(`Flag ${studentData.displayName} as at-risk?`)) {
          await flagAtRisk(studentId);
          renderStudentsTable();
        }
        return;
      default:
        return;
    }
  }

  async function openStudentDrawer(uid) {
    const drawer = $('student-drawer');
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    const body = $('drawer-body');
    body.innerHTML = `<div class="muted">Loading…</div>`;

    try {
      const doc = await firebase.firestore().collection('users').doc(uid).get();
      const s = doc.exists ? ({ id: doc.id, ...(doc.data() || {}) }) : null;
      if (!s) throw new Error('Student not found.');

      const joined = s.joinedDate && s.joinedDate.toDate ? s.joinedDate.toDate().toLocaleDateString() : '—';
      $('drawer-title').textContent = studentLabel(s);

      let activity = [];
      try {
        const actSnap = await firebase.firestore().collection('users').doc(uid).collection('activity').orderBy('timestamp','desc').limit(12).get();
        activity = actSnap.docs.map(d => d.data() || {});
      } catch (_) {}

      body.innerHTML = `
        <div class="kv"><div class="k">Email</div><div class="v">${escapeHtml(s.email || '—')}</div></div>
        <div class="kv"><div class="k">Level</div><div class="v">${escapeHtml(String(s.level || 1))}</div></div>
        <div class="kv"><div class="k">XP</div><div class="v">${escapeHtml(String(s.xp || 0))}</div></div>
        <div class="kv"><div class="k">Current Lesson</div><div class="v">${escapeHtml(String(s.currentLesson || 1))}</div></div>
        <div class="kv"><div class="k">Accuracy</div><div class="v">${escapeHtml(String(Math.round(Number(s.accuracy || 0))))}%</div></div>
        <div class="kv"><div class="k">Streak</div><div class="v">${escapeHtml(String(s.streak || 0))} day(s)</div></div>
        <div class="kv"><div class="k">Hearts</div><div class="v">${escapeHtml(String(Number.isFinite(s.hearts) ? s.hearts : 5))}</div></div>
        <div class="kv"><div class="k">Joined</div><div class="v">${escapeHtml(String(joined))}</div></div>
        <div class="kv"><div class="k">Last Active</div><div class="v">${escapeHtml(String(s.lastActiveDate || '—'))}</div></div>
        <div class="card" style="margin-top:12px">
          <div class="card-head">
            <div class="card-title">Recent activity</div>
            <div class="muted">Last 12</div>
          </div>
          <div class="feed">
            ${activity.length ? activity.map(a => {
              const when = a.timestamp && a.timestamp.toDate ? a.timestamp.toDate() : null;
              return `<div class="feed-item"><div><div class="t">${escapeHtml(a.description || a.type || 'Activity')}</div><div class="d">${escapeHtml(when ? when.toLocaleString() : '')}</div></div><div class="d">${a.xpEarned ? ('+'+escapeHtml(String(a.xpEarned))+' XP') : ''}</div></div>`;
            }).join('') : `<div class="muted">No activity recorded yet.</div>`}
          </div>
        </div>
      `;
    } catch (e) {
      body.innerHTML = `<div class="muted">${escapeHtml(e.message || 'Could not load student.')}</div>`;
    }
  }

  function closeStudentDrawer() {
    const drawer = $('student-drawer');
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  async function resetHearts(uid) {
    try {
      await firebase.firestore().collection('users').doc(uid).set({ hearts: 5, heartsUpdatedAt: Date.now() }, { merge: true });
    } catch (e) {
      console.warn(e);
    }
  }

  async function flagAtRisk(uid) {
    // Lightweight flag (admin-only note). Students can ignore it; admins can filter later.
    try {
      await firebase.firestore().collection('users').doc(uid).set({ adminFlagAtRisk: true }, { merge: true });
    } catch (e) {
      console.warn(e);
    }
  }

  async function openMessagePrompt(uid) {
    const student = state.students.find(s => s.id === uid);
    const name = student ? studentLabel(student) : uid;
    const text = window.prompt(`Message to ${name} (sent as a notification):`, 'Hi! Just checking in — how is your Greek going this week?');
    if (!text || !text.trim()) return;
    try {
      await firebase.firestore().collection('users').doc(uid).collection('notifications').add({
        type: 'system',
        message: text.trim(),
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.warn(e);
    }
  }

  function renderLessonsView() {
    const host = $('lessons-table-wrap');
    if (!host) return;
    const lessonCount = 24;
    const rows = [];
    for (let id = 1; id <= lessonCount; id++) {
      const world = id <= 5 ? 1 : id <= 10 ? 2 : id <= 15 ? 3 : id <= 20 ? 4 : 5;
      const title = (window.LESSON_DATA && window.LESSON_DATA[id] && window.LESSON_DATA[id].title) ? window.LESSON_DATA[id].title : `Lesson ${id}`;
      const completionRate = state.students.length ? Math.round(state.students.filter(s => Number(s.lessonsCompleted || 0) >= id).length / state.students.length * 100) : 0;
      const avgAcc = Math.round(Number(state.students.reduce((sum, s) => sum + (Number(s.accuracy || 0) || 0), 0)) / Math.max(1, state.students.length));
      rows.push({ id, title, world, completionRate, avgAcc });
    }
    host.innerHTML = `
      <table class="table" style="min-width:880px">
        <thead><tr>
          <th>Lesson #</th><th>Title</th><th>World</th><th>Avg Accuracy</th><th>Completion Rate</th><th>Avg Attempts</th><th>Hardest Exercise</th>
        </tr></thead>
        <tbody>
          ${rows.map(r => `
            <tr>
              <td>${r.id}</td>
              <td>${escapeHtml(r.title)}</td>
              <td>${r.world}</td>
              <td>${r.avgAcc}%</td>
              <td>${r.completionRate}%</td>
              <td>—</td>
              <td>—</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="muted" style="margin-top:10px">
        Note: Avg Attempts / Hardest Exercise require per-exercise attempt logging, which isn’t stored in the current student schema.
      </div>
    `;
  }

  function renderLeaderboard() {
    const host = $('leaderboard-list');
    if (!host) return;
    if (!state.leaderboard.length) {
      host.innerHTML = `<div class="muted">No leaderboard data yet.</div>`;
      return;
    }
    host.innerHTML = state.leaderboard.slice(0, 50).map((row, idx) => `
      <div class="list-item">
        <div>
          <div class="tag green">#${idx + 1} ${escapeHtml(row.displayName || 'Scholar')}</div>
          <div class="muted">${escapeHtml(String(row.xp || 0))} XP • Streak ${escapeHtml(String(row.streak || 0))}d • Level ${escapeHtml(String(row.level || 1))}</div>
        </div>
      </div>
    `).join('');
  }

  function renderGroups() {
    const host = $('groups-list');
    if (!host) return;
    if (!state.groups.length) {
      host.innerHTML = `<div class="muted">No groups yet.</div>`;
      return;
    }
    host.innerHTML = state.groups.map(g => `
      <div class="list-item">
        <div>
          <div class="tag gold">${escapeHtml(g.name || 'Group')}</div>
          <div class="muted">${escapeHtml(String((g.members || []).length))} member(s) • ${escapeHtml(g.goal || '')}</div>
        </div>
        <button class="btn" type="button" data-group-msg="${escapeHtml(g.id)}">Message</button>
      </div>
    `).join('');
    host.querySelectorAll('[data-group-msg]').forEach(btn => btn.addEventListener('click', async () => {
      const gid = btn.getAttribute('data-group-msg');
      const group = state.groups.find(x => x.id === gid);
      if (!group) return;
      const text = window.prompt(`Message group "${group.name}" (sent as notifications):`, 'Reminder: your group goal is coming up — keep going!');
      if (!text || !text.trim()) return;
      await sendAnnouncementToUids(text.trim(), (group.members || []).slice(), `Group: ${group.name}`);
    }));
  }

  function renderAnnouncements() {
    const host = $('ann-list');
    if (!host) return;
    if (!state.announcements.length) {
      host.innerHTML = `<div class="muted">No announcements yet.</div>`;
      return;
    }
    host.innerHTML = state.announcements.slice(0, 20).map(a => {
      const when = a.sentAt && a.sentAt.toDate ? a.sentAt.toDate() : (a.sentAt ? new Date(a.sentAt) : null);
      const ts = when ? when.toLocaleString() : '';
      const target = a.target === 'all' ? 'All students' : (a.target === 'group' ? `Group ${a.targetId || ''}` : `User ${a.targetId || ''}`);
      return `<div class="feed-item"><div><div class="t">${escapeHtml(a.title || 'Announcement')}</div><div class="d">${escapeHtml(target)} • ${escapeHtml(ts)}</div></div><div class="d"></div></div>`;
    }).join('');
  }

  function hydrateAnnouncementTargets() {
    const targetSel = $('ann-target');
    const targetIdSel = $('ann-target-id');
    if (!targetSel || !targetIdSel) return;

    const rebuild = () => {
      const mode = targetSel.value;
      if (mode === 'all') {
        targetIdSel.innerHTML = `<option value="">(Everyone)</option>`;
        targetIdSel.disabled = true;
        return;
      }
      targetIdSel.disabled = false;
      if (mode === 'group') {
        targetIdSel.innerHTML = state.groups.map(g => `<option value="${escapeHtml(g.id)}">${escapeHtml(g.name || g.id)}</option>`).join('') || `<option value="">No groups</option>`;
      } else {
        targetIdSel.innerHTML = state.students.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(studentLabel(s))}</option>`).join('') || `<option value="">No students</option>`;
      }
    };

    targetSel.addEventListener('change', rebuild);
    rebuild();
  }

  async function sendAnnouncementToUids(message, uids, title) {
    const msg = String(message || '').trim();
    if (!msg) return;
    const list = Array.from(new Set((uids || []).filter(Boolean)));
    if (!list.length) return;

    const batch = firebase.firestore().batch();
    list.forEach(uid => {
      const ref = firebase.firestore().collection('users').doc(uid).collection('notifications').doc();
      batch.set(ref, {
        type: 'system',
        message: title ? `${title}: ${msg}` : msg,
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
    await batch.commit();
  }

  function wireUi() {
    document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
    $('refresh-btn').addEventListener('click', () => renderAll());
    $('drawer-close').addEventListener('click', closeStudentDrawer);
    $('student-drawer').addEventListener('click', (e) => { if (e.target === $('student-drawer')) closeStudentDrawer(); });

    $('student-search').addEventListener('input', (e) => {
      state.search = e.target.value || '';
      renderStudentsTable();
    });
    $('students-table').querySelectorAll('th[data-sort]').forEach(th => th.addEventListener('click', () => {
      const key = th.getAttribute('data-sort');
      if (state.sort.key === key) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
      else state.sort = { key, dir: 'asc' };
      renderStudentsTable();
    }));

    $('group-create').addEventListener('click', async () => {
      const name = $('group-name').value.trim();
      const desc = $('group-desc').value.trim();
      const goal = $('group-goal').value.trim();
      const picker = $('group-member-picker');
      const memberIds = Array.from(picker.querySelectorAll('.chip.active')).map(ch => ch.getAttribute('data-uid'));
      if (!name) return;
      try {
        await firebase.firestore().collection('study_groups').add({
          name,
          description: desc,
          goal,
          members: memberIds,
          createdBy: state.me.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          isAdminCreated: true
        });
        $('group-name').value = '';
        $('group-desc').value = '';
        $('group-goal').value = '';
      } catch (e) {
        console.warn(e);
      }
    });

    $('ann-send').addEventListener('click', async () => {
      const title = $('ann-title').value.trim();
      const body = $('ann-body').value.trim();
      const target = $('ann-target').value;
      const targetId = $('ann-target-id').value;
      if (!title || !body) return;

      try {
        // Store record for admin review
        await firebase.firestore().collection('announcements').add({
          title,
          message: body,
          target,
          targetId: target === 'all' ? '' : targetId,
          sentBy: state.me.uid,
          sentAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Fan-out notifications to student app bell center
        if (target === 'all') {
          await sendAnnouncementToUids(body, state.students.map(s => s.id), title);
        } else if (target === 'group') {
          const group = state.groups.find(g => g.id === targetId);
          await sendAnnouncementToUids(body, (group?.members || []), title);
        } else {
          await sendAnnouncementToUids(body, [targetId], title);
        }

        $('ann-title').value = '';
        $('ann-body').value = '';
      } catch (e) {
        console.warn(e);
      }
    });

    $('open-student-app').addEventListener('click', () => window.location.href = 'dashboard.html');
    $('recheck-access').addEventListener('click', () => window.location.reload());
    $('admin-signout').addEventListener('click', async () => {
      try { await firebase.auth().signOut(); } catch (_) {}
      window.location.href = 'index.html';
    });
  }

  function renderMemberPicker() {
    const host = $('group-member-picker');
    if (!host) return;
    host.innerHTML = state.students.slice(0, 200).map(s => `<button class="chip" type="button" data-uid="${escapeHtml(s.id)}">${escapeHtml(studentLabel(s))}</button>`).join('');
    host.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => chip.classList.toggle('active')));
  }

  function renderAll() {
    renderOverview();
    renderStudentsTable();
    renderLessonsView();
    renderLeaderboard();
    renderGroups();
    renderAnnouncements();
    hydrateAnnouncementTargets();
    renderMemberPicker();
  }

  function attachRealtime() {
    // Students (users)
    if (unsubStudents) unsubStudents();
    unsubStudents = firebase.firestore()
      .collection('users')
      .onSnapshot((snap) => {
        const all = snap.docs.map(d => ({ id: d.id, ...(d.data() || {}) }));
        state.students = all.map(u => normalizeUser(u.id, u));
        renderAll();
      }, (err) => console.warn('students snapshot error', err));

    // Study groups
    if (unsubGroups) unsubGroups();
    unsubGroups = firebase.firestore()
      .collection('study_groups')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot((snap) => {
        state.groups = snap.docs.map(d => ({ id: d.id, ...(d.data() || {}) }));
        renderGroups();
        hydrateAnnouncementTargets();
      }, (err) => console.warn('groups snapshot error', err));

    // Announcements
    if (unsubAnnouncements) unsubAnnouncements();
    unsubAnnouncements = firebase.firestore()
      .collection('announcements')
      .orderBy('sentAt', 'desc')
      .limit(20)
      .onSnapshot((snap) => {
        state.announcements = snap.docs.map(d => ({ id: d.id, ...(d.data() || {}) }));
        renderAnnouncements();
      }, (err) => console.warn('ann snapshot error', err));

    // Leaderboard
    if (unsubLeaderboard) unsubLeaderboard();
    unsubLeaderboard = firebase.firestore()
      .collection('leaderboard')
      .orderBy('xp', 'desc')
      .limit(50)
      .onSnapshot((snap) => {
        state.leaderboard = snap.docs.map(d => ({ id: d.id, ...(d.data() || {}) }));
        renderLeaderboard();
      }, (err) => console.warn('leaderboard snapshot error', err));

    // Activity feed (top-level `activities` collection)
    if (unsubActivity) unsubActivity();
    unsubActivity = firebase.firestore()
      .collection('activities')
      .where('visibility', '==', 'public')
      .orderBy('createdAt', 'desc')
      .limit(20)
      .onSnapshot((snap) => {
        const items = snap.docs.map(d => ({ id: d.id, ...(d.data() || {}) }));
        renderActivity(items);
      }, (err) => {
        console.warn('activity snapshot error', err);
        renderActivity([]);
      });
  }

  function bootAdmin(user, userData) {
    state.me = user;
    state.meData = userData || {};
    $('admin-me-name').textContent = (userData.displayName || user.displayName || user.email || 'Admin').trim();
    $('admin-me-email').textContent = user.email || '—';
    showApp();
    wireUi();
    attachRealtime();
    renderAll();
  }

  window.initAdminPortal = function initAdminPortal(user, userData) {
    hideApp();
    bootAdmin(user, userData);
  };
})();
