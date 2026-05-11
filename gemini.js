(function () {
  const PROXY_URL = window.GEMINI_PROXY_URL || '/.netlify/functions/gemini';

  async function callGemini(prompt, systemPrompt = '') {
    try {
      const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemPrompt })
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`);
      return data.result;
    } catch (err) {
      console.error('Gemini call failed:', err);
      return null;
    }
  }

  window.callGemini = callGemini;
})();
