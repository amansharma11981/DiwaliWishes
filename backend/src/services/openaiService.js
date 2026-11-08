import OpenAI from 'openai';
import { buildPrompt } from './promptBuilder.js';

let openaiClient = null;

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

/**
 * Generate Diwali wishes using the OpenAI API.
 *
 * @param {object} params
 * @returns {Promise<Array<{id:string, text:string, provider:string}>>}
 */
export async function generateWithOpenAI({ recipient, tone, language, length, name, count = 3 }) {
  const client = getClient();
  const prompt = buildPrompt({ recipient, tone, language, length, name, count });

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a creative Diwali greeting writer. Follow the user instructions precisely and output only the numbered wishes — no preamble, no commentary.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.9,
    max_tokens: 2048,
    top_p: 0.95,
  });

  const text = response.choices[0]?.message?.content || '';
  return parseWishes(text, count, 'openai');
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

  if (wishes.length === 0) wishes.push(text.trim());

  return wishes.slice(0, count).map((wish, i) => ({
    id: `${provider}-${Date.now()}-${i}`,
    text: wish,
    provider,
  }));
}
