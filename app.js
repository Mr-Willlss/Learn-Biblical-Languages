(function () {
  function ensureSharedAiStyles() {
    if (document.getElementById('kg-shared-ai-styles')) return;
    const style = document.createElement('style');
    style.id = 'kg-shared-ai-styles';
    style.textContent = `
      .ai-explain{margin-top:10px;border:1px solid rgba(124,92,252,.35);background:rgba(124,92,252,.08);color:#e2e8f0;border-radius:10px;padding:8px;font-size:12px;display:none}

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

  async function generateDynamicExercises(lessonTopic, vocabulary) {
    const prompt = `Lesson topic: ${lessonTopic}\nVocabulary/letters taught in this lesson:\n${JSON.stringify(vocabulary)}\n\nGenerate 4 new exercises based ONLY on the above.`;
    const systemPrompt = `You are a Koine Greek exercise generator. Return ONLY valid JSON matching this exact structure: {"exercises":[{"type":"multiple_choice","question":"...","options":["..."],"correct":"...","explanation":"..."}]} No markdown, no backticks, no preamble. Pure JSON only.`;
    const raw = await window.callGemini(prompt, systemPrompt);
    if (!raw) return null;
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed.exercises)) {
        parsed.exercises = parsed.exercises.map(ex => ({
          type: ex.type === 'reverse_translate' || ex.type === 'identify' ? 'multiple_choice' : (ex.type || 'multiple_choice'),
          question: ex.question || '',
          options: Array.isArray(ex.options) ? ex.options.slice(0, 4) : [],
          answer: ex.correct || ex.answer || '',
          explanation: ex.explanation || ''
        })).filter(ex => ex.options.length === 4 && ex.answer);
      }
      return parsed;
    } catch (e) {
      console.error('Exercise parse error:', e, raw);
      return null;
    }
  }

  async function explainWrongAnswer(question, userAnswer, correctAnswer) {
    const prompt = `Question asked: ${question}\nUser's wrong answer: ${userAnswer}\nCorrect answer: ${correctAnswer}\n\nExplain why the correct answer is right in 2-3 sentences. Include etymology or a memorable English connection if possible. End with one encouraging sentence. Maximum 60 words.`;
    const systemPrompt = `You are a warm, encouraging Koine Greek tutor. Explain wrong answers briefly and memorably. Always end with encouragement. Maximum 60 words. No bullet points. Plain prose only.`;
    return await window.callGemini(prompt, systemPrompt);
  }

  async function translateGreekText(greekInput) {
    const prompt = `Analyse and translate this Koine Greek text: "${greekInput}"\n\nReturn TRANSLATION, WORD BREAKDOWN, GRAMMAR, and NT EXAMPLE sections.`;
    const systemPrompt = `You are a Koine Greek translation and analysis engine. Always return exactly these four labelled sections: TRANSLATION, WORD BREAKDOWN, GRAMMAR, NT EXAMPLE. Be concise and scholarly but accessible.`;
    const result = await window.callGemini(prompt, systemPrompt);
    const sections = {};
    ['TRANSLATION', 'WORD BREAKDOWN', 'GRAMMAR', 'NT EXAMPLE'].forEach(label => {
      const regex = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n[A-Z ]+:|$)`);
      const match = (result || '').match(regex);
      sections[label] = match ? match[1].trim() : '';
    });
    return sections;
  }

  function initTranslateTool() {
    const btn = document.getElementById('translate-btn');
    btn?.addEventListener('click', async () => {
      const inputEl = document.getElementById('greek-input');
      const input = inputEl ? inputEl.value : '';
      if (!input.trim()) return;
      btn.textContent = 'Translating...';
      const sections = await translateGreekText(input);
      const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value || ''; };
      set('result-translation', sections['TRANSLATION']);
      set('result-breakdown', sections['WORD BREAKDOWN']);
      set('result-grammar', sections['GRAMMAR']);
      set('result-nt', sections['NT EXAMPLE']);
      btn.textContent = 'Translate & Analyse';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sbGroup').forEach(group => {
      const h3 = group.querySelector('h3');
      const nav = group.querySelector('.nav');
      if (!h3 || !nav || h3.textContent.trim().toLowerCase() !== 'learn') return;
      if (nav.querySelector('a[href=\"ai-translate.html\"]')) return;
      const a = document.createElement('a');
      a.href = 'ai-translate.html';
      a.innerHTML = '<span class=\"ic\">🧠</span><span class=\"tx\">AI Translate</span>';
      nav.appendChild(a);
    });

    ensureSharedAiStyles();
    initTranslateTool();

    window.triggerWrongExplanation = async (q, wrong, correct) => {
      const box = document.getElementById('ai-explanation');
      if (!box) return;
      box.textContent = 'Analysing...';
      box.style.display = 'block';
      const text = await explainWrongAnswer(q, wrong, correct);
      box.textContent = text || '';
    };

    document.addEventListener('click', async (e) => {
      const genBtn = e.target.closest('#generate-exercises-btn');
      if (!genBtn) return;
      genBtn.textContent = 'Generating...';
      genBtn.disabled = true;
      const topic = genBtn.dataset.topic || '';
      let vocab = [];
      try { vocab = JSON.parse(genBtn.dataset.vocab || '[]'); } catch (_) {}
      const result = await generateDynamicExercises(topic, vocab);
      if (result?.exercises?.length && typeof window.loadDynamicExercises === 'function') {
        window.loadDynamicExercises(result.exercises);
      }
      genBtn.textContent = 'Generate More Practice';
      genBtn.disabled = false;
    });

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
