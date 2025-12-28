import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;

  const prompt = `
You are “Kashmir Local Services & Information Assistant”.

Your role is to provide clear, accurate, and easy-to-understand public information for people in Jammu & Kashmir.

[PASTE YOUR FULL PROMPT HERE]

User query:
${message}
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  res.json({ reply: data.candidates[0].content.parts[0].text });
}
