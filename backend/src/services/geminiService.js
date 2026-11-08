import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildPrompt } from './promptBuilder.js';

let genAIClient = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAIClient;
}

/**
 * Generate Diwali wishes using the Gemini API.
 *
 * @param {object} params
 * @returns {Promise<Array<{id:string, text:string, provider:string}>>}
 */
export async function generateWithGemini({ recipient, tone, language, length, name, count = 3 }) {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  });

  const prompt = buildPrompt({ recipient, tone, language, length, name, count });
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return parseWishes(text, count, 'gemini');
}

/**
 * Parse a numbered-list AI response into structured wish objects.
 */
function parseWishes(text, count, provider) {
  const lines = text.split(/\n+/).filter((l) => l.trim());
  const wishes = [];
  let current = '';

  for (const line of lines) {
    if (/^[\d]+[.)]\s/.test(line)) {
      if (current.trim()) wishes.push(current.trim());
      current = line.replace(/^[\d]+[.)]\s*/, '');
    } else {
      current += ' ' + line;
    }
  }
  if (current.trim()) wishes.push(current.trim());

  // Fallback: if parsing produced nothing, treat the whole response as one wish
  if (wishes.length === 0) wishes.push(text.trim());

  return wishes.slice(0, count).map((wish, i) => ({
    id: `${provider}-${Date.now()}-${i}`,
    text: wish,
    provider,
  }));
}
