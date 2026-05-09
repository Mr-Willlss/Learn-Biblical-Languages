exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { prompt, systemPrompt } = JSON.parse(event.body || "{}");
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing GEMINI_API_KEY" })
      };
    }

    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const r = await fetch(`${endpoint}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt || "" }] },
        contents: [{ parts: [{ text: prompt || "" }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
      })
    });

    const data = await r.json();

    if (!r.ok) {
      return {
        statusCode: r.status,
        body: JSON.stringify({ error: data?.error?.message || "Gemini API request failed" })
      };
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      statusCode: 200,
      body: JSON.stringify({ result: text })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini request failed" })
    };
  }
};
