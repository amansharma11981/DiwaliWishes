import { generateWithGemini } from './geminiService.js';
import { generateWithOpenAI } from './openaiService.js';
import { generateFallback } from './fallbackService.js';

/**
 * Strategy-pattern AI provider.
 *
 * Order of attempts:
 *  1. Configured primary provider (AI_PROVIDER env var).
 *  2. Any other available provider (key set but not primary).
 *  3. Hardcoded fallback.
 *
 * @param {object} params - Wish generation parameters.
 * @returns {Promise<Array<{id:string, text:string, provider:string}>>}
 */
export async function generateWishes(params) {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();

  // ── 1. Try the configured primary provider ──────────────────────────────────
  if (provider === 'gemini' && process.env.GEMINI_API_KEY) {
    try {
      return await generateWithGemini(params);
    } catch (e) {
      console.error('[aiProvider] Gemini failed, trying OpenAI:', e.message);
    }
  }

  if (provider === 'openai' && process.env.OPENAI_API_KEY) {
    try {
      return await generateWithOpenAI(params);
    } catch (e) {
      console.error('[aiProvider] OpenAI failed, using fallback:', e.message);
    }
  }

  // ── 2. Try any other available provider ────────────────────────────────────
  if (process.env.GEMINI_API_KEY && provider !== 'gemini') {
    try {
      return await generateWithGemini(params);
    } catch (e) {
      console.error('[aiProvider] Secondary Gemini attempt failed:', e.message);
    }
  }

  if (process.env.OPENAI_API_KEY && provider !== 'openai') {
    try {
      return await generateWithOpenAI(params);
    } catch (e) {
      console.error('[aiProvider] Secondary OpenAI attempt failed:', e.message);
    }
  }

  // ── 3. Hardcoded fallback ──────────────────────────────────────────────────
  console.log('[aiProvider] All AI providers unavailable — using fallback wishes.');
  return generateFallback(params);
}
