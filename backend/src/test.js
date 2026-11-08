import assert from 'node:assert/strict';
import { generateFallback } from './services/fallbackService.js';
import { buildPrompt } from './services/promptBuilder.js';
import { generateWishes } from './services/aiProvider.js';

console.log('🧪 Running Backend Automated Test Suite...');

// 1. Test Prompt Builder
console.log('  Testing prompt builder...');
const prompt = buildPrompt({
  recipient: 'family',
  tone: 'emotional',
  language: 'english',
  length: 'medium',
  name: 'Parents',
  count: 3,
});
assert.ok(prompt.includes('Diwali'), 'Prompt should mention Diwali');
assert.ok(prompt.includes('Parents'), 'Prompt should include custom name');

// 2. Test Fallback Service
console.log('  Testing fallback service...');
const fallbackResults = generateFallback({
  recipient: 'friends',
  tone: 'funny',
  language: 'english',
  count: 2,
});
assert.equal(fallbackResults.length, 2, 'Should generate requested number of fallback wishes');
assert.ok(fallbackResults[0].text.length > 10, 'Wish text should not be empty');
assert.equal(fallbackResults[0].provider, 'fallback', 'Provider must be fallback');

// 3. Test Multilingual Fallback
console.log('  Testing multilingual generation (Hindi & Hinglish)...');
const hindiWishes = generateFallback({
  recipient: 'family',
  tone: 'traditional',
  language: 'hindi',
  count: 1,
});
assert.ok(/[\u0900-\u097F]/.test(hindiWishes[0].text), 'Hindi wish should contain Devanagari characters');

// 4. Test AI Provider Strategy Orchestrator
console.log('  Testing AI Provider Strategy orchestration...');
const providerWishes = await generateWishes({
  recipient: 'partner',
  tone: 'romantic',
  language: 'english',
  count: 2,
});
assert.equal(providerWishes.length, 2, 'Provider orchestrator must return requested count');

console.log('✅ All backend tests passed successfully!');
process.exit(0);
