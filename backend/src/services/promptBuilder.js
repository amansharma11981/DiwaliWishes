/**
 * Builds a rich Diwali-wish generation prompt for any AI backend.
 *
 * @param {object} opts
 * @param {string} opts.recipient  - e.g. 'family' | 'friends' | …
 * @param {string} opts.tone       - e.g. 'emotional' | 'funny' | …
 * @param {string} opts.language   - 'english' | 'hindi' | 'hinglish' | 'sanskrit'
 * @param {string} opts.length     - 'short' | 'medium' | 'long'
 * @param {string} [opts.name]     - optional recipient's name
 * @param {number} [opts.count=3]  - number of wishes to generate
 * @returns {string} the full prompt text
 */
export function buildPrompt({ recipient, tone, language, length, name, count = 3 }) {
  const recipientDesc = getRecipientDescription(recipient);
  const toneDesc = getToneDescription(tone);
  const languageDesc = getLanguageDescription(language);
  const lengthDesc = getLengthDescription(length);
  const nameClause = name
    ? `Address the wishes to "${name}" by name naturally within the text.`
    : 'Do not address a specific person by name.';

  return `You are a creative Diwali greeting writer specializing in heartfelt, culturally authentic festival wishes.

Generate exactly ${count} unique Diwali wishes with the following specifications:

RECIPIENT: ${recipientDesc}
TONE: ${toneDesc}
LANGUAGE: ${languageDesc}
LENGTH: ${lengthDesc}
NAME: ${nameClause}

FORMATTING RULES:
- Number each wish clearly: 1. 2. 3. etc.
- Each wish must be on its own line(s), separated by a blank line from the next.
- Include relevant festival emojis naturally (🪔 diyas, 🎆 fireworks, 🪷 lotus, ✨ sparkles, 🎇 sparkler).
- Do NOT use generic openers like "Wishing you…" for every wish.
- CRITICAL LENGTH ENFORCEMENT: If LENGTH is SHORT, keep each wish to exactly 1 sentence. If LENGTH is LONG, write a comprehensive, rich paragraph of 5+ sentences with deep substance. Do not make all sizes look the same.

QUALITY STANDARDS:
- Authentic to Indian festival spirit and cultural warmth.
- Reflect the Festival of Lights: light dispelling darkness, prosperity, new beginnings, family bonds, joy, sweets, lamps, rangoli.
- Avoid clichés — be fresh, evocative, and heartfelt.
- Do not include any commentary, explanations, or preamble — output the numbered wishes only.

Generate the ${count} wishes now:`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRecipientDescription(recipient) {
  const map = {
    friends:
      'Close friends — the tone should feel warm, fun, and personal, like a message between people who truly know each other.',
    family:
      'Family members — the tone should be deeply warm, affectionate, and rooted in shared bonds and memories.',
    parents:
      'Parents — the tone should carry reverence, gratitude, and deep love for their sacrifices and guidance.',
    partner:
      'Romantic partner — the tone should be tender, intimate, and celebratory of the love you share.',
    colleagues:
      'Work colleagues or professional contacts — the tone should be warm yet polished, respectful, and inclusive.',
    teacher:
      'A teacher or mentor — the tone should express genuine gratitude, respect, and acknowledgement of their positive influence.',
  };
  return map[recipient] || recipient;
}

function getToneDescription(tone) {
  const map = {
    emotional:
      'Deeply emotional and touching — evoking feelings of gratitude, love, and the deeper meaning of the festival.',
    funny:
      'Light-hearted, witty, and genuinely funny — use playful Diwali metaphors (sweets, firecrackers, lamps) for humor; avoid sarcasm.',
    romantic:
      'Romantic and poetic — celebrate togetherness, the glow of love likened to diya flames, and shared joy.',
    professional:
      'Professional and refined — warm and sincere without being overly personal; suitable for a work context.',
    traditional:
      "Traditional and devotional — rooted in Hindu culture, referencing Lakshmi, Rama's return, light vs. darkness, and timeless festival values.",
  };
  return map[tone] || tone;
}

function getLanguageDescription(language) {
  const map = {
    english:
      'English — clear, expressive, and culturally aware. Use Indian English where it feels natural.',
    hindi:
      'Hindi written entirely in Devanagari script (हिंदी). Do NOT romanize — use the native script throughout. The language must be grammatically correct literary Hindi.',
    hinglish:
      'Hinglish — a natural, conversational blend of Hindi and English in Roman script (e.g., "Diwali ki khushiyan aapke saath ho, have an amazing celebration!"). Reflect urban Indian speech patterns authentically.',
    sanskrit:
      'English prose with a Sanskrit-inspired, poetic feel — use Sanskrit loan-words (e.g., ananda, shubha, prakasha, mangala, divya) and a shloka-like rhythm. You may open with a brief Sanskrit phrase in Devanagari followed by its meaning, then continue in English.',
  };
  return map[language] || language;
}

function getLengthDescription(length) {
  const map = {
    short:
      'STRICTLY SHORT: Exactly 1 single punchy sentence (maximum 12 to 20 words). Very brief, crisp, and direct. Do NOT write multiple sentences.',
    medium:
      'MEDIUM: Exactly 2 to 3 well-balanced sentences (35 to 55 words). Warm, conversational, and complete.',
    long:
      'STRICTLY LONG & ELABORATE: An extensive, detailed paragraph of 5 to 7 full sentences (minimum 90 to 140 words). Rich with evocative imagery of clay diyas, fragrant marigolds, festive rangolis, and profound blessings for lifelong health, wealth, and inner peace.',
  };
  return map[length] || length;
}
