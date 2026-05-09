(function () {
  function ensureTutorUi() {
    if (document.getElementById('ai-tutor-fab')) return;
    const style = document.createElement('style');
    style.textContent = `
      #ai-tutor-fab{position:fixed;right:16px;bottom:18px;z-index:9999;border:1px solid rgba(255,255,255,.15);background:#7c5cfc;color:#fff;border-radius:999px;padding:10px 14px;font-weight:700}
      #ai-tutor-panel{position:fixed;right:16px;bottom:68px;width:min(360px,92vw);height:min(520px,70vh);z-index:9999;background:#181c27;border:1px solid rgba(255,255,255,.14);border-radius:14px;display:none;flex-direction:column;overflow:hidden}
      #ai-tutor-panel.open{display:flex}
      #tutor-top{display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid rgba(255,255,255,.1);color:#fff}
      #tutor-messages{flex:1;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:8px}
      .tm{padding:8px 10px;border-radius:10px;max-width:90%;white-space:pre-wrap;color:#e2e8f0;font-size:13px}
      .tm.you{align-self:flex-end;background:#3b82f633}
      .tm.sophia{align-self:flex-start;background:#ffffff14}
      #tutor-bottom{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(255,255,255,.1)}
      #tutor-input{flex:1;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:8px}
      #tutor-send-btn,#tutor-clear-btn,#tutor-close-btn{background:#7c5cfc;color:#fff;border:0;border-radius:8px;padding:8px 10px}
      .ai-explain{margin-top:10px;border:1px solid rgba(124,92,252,.35);background:rgba(124,92,252,.08);color:#e2e8f0;border-radius:10px;padding:8px;font-size:12px;display:none}
    `;
    document.head.appendChild(style);

    const fab = document.createElement('button');
    fab.id = 'ai-tutor-fab';
    fab.type = 'button';
    fab.textContent = 'Ask AI Tutor';

    const panel = document.createElement('div');
    panel.id = 'ai-tutor-panel';
    panel.innerHTML = `
      <div id="tutor-top">
        <button id="tutor-clear-btn" type="button">Clear chat</button>
        <b>Sophia • AI Tutor</b>
        <button id="tutor-close-btn" type="button">×</button>
      </div>
      <div id="tutor-messages"></div>
      <div id="tutor-bottom">
        <input id="tutor-input" placeholder="Ask about grammar, words, translation..." />
        <button id="tutor-send-btn" type="button">Send</button>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    fab.addEventListener('click', () => panel.classList.toggle('open'));
    panel.querySelector('#tutor-close-btn').addEventListener('click', () => panel.classList.remove('open'));
  }

  function appendMessage(role, text) {
    const host = document.getElementById('tutor-messages');
    if (!host) return;
    const div = document.createElement('div');
    div.className = `tm ${role}`;
    div.textContent = text;
    host.appendChild(div);
    host.scrollTop = host.scrollHeight;
  }

  function updateLastMessage(role, text) {
    const host = document.getElementById('tutor-messages');
    if (!host) return;
    const list = host.querySelectorAll(`.tm.${role}`);
    const el = list[list.length - 1];
    if (el) el.textContent = text;
  }

  async function sendTutorMessage(userMessage, chatHistory) {
    const historyText = chatHistory.map(m => `${m.role}: ${m.text}`).join('\n');
    const prompt = `Previous conversation:\n${historyText}\n\nStudent's new message: ${userMessage}`;
    const systemPrompt = `You are Sophia, an expert Koine Greek tutor with deep knowledge of biblical Greek, ancient grammar, and New Testament language. You are warm, encouraging, and patient. Explain concepts clearly using simple English, always giving Greek examples with transliterations and translations. Keep responses under 200 words unless asked for more detail.`;
    return await window.callGemini(prompt, systemPrompt);
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

    ensureTutorUi();
    initTranslateTool();

    const chatHistory = [];
    const sendBtn = document.getElementById('tutor-send-btn');
    const chatInput = document.getElementById('tutor-input');

    sendBtn?.addEventListener('click', async () => {
      const msg = (chatInput.value || '').trim();
      if (!msg) return;
      chatHistory.push({ role: 'Student', text: msg });
      appendMessage('you', msg);
      chatInput.value = '';
      appendMessage('sophia', '...thinking...');
      const reply = await sendTutorMessage(msg, chatHistory);
      updateLastMessage('sophia', reply || 'Sorry, try again.');
      chatHistory.push({ role: 'Sophia', text: reply || '' });
    });

    document.getElementById('tutor-clear-btn')?.addEventListener('click', () => {
      chatHistory.length = 0;
      const host = document.getElementById('tutor-messages');
      if (host) host.innerHTML = '';
    });

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

    chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn?.click();
      }
    });
  });
})();
