(function () {
  const PROXY_URL = window.GEMINI_PROXY_URL ||
    ((location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? 'http://localhost:3001/api/gemini'
      : '/api/gemini');

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
