import { Router } from 'express';
import { getCuratedWishes } from '../services/fallbackService.js';

const router = Router();

// ── In-memory favorites store ─────────────────────────────────────────────────
// Map<sessionId, Array<{wishId, addedAt}>>
const favoritesStore = new Map();

const CATEGORIES = [
  { id: 'family_emotional',       label: 'Family — Emotional',        recipient: 'family',     tone: 'emotional' },
  { id: 'family_traditional',     label: 'Family — Traditional',      recipient: 'family',     tone: 'traditional' },
  { id: 'friends_funny',          label: 'Friends — Funny',           recipient: 'friends',    tone: 'funny' },
  { id: 'friends_emotional',      label: 'Friends — Emotional',       recipient: 'friends',    tone: 'emotional' },
  { id: 'colleagues_professional',label: 'Colleagues — Professional', recipient: 'colleagues', tone: 'professional' },
  { id: 'partner_romantic',       label: 'Partner — Romantic',        recipient: 'partner',    tone: 'romantic' },
  { id: 'parents_emotional',      label: 'Parents — Emotional',       recipient: 'parents',    tone: 'emotional' },
  { id: 'teacher_professional',   label: 'Teacher — Professional',    recipient: 'teacher',    tone: 'professional' },
  { id: 'hindi',                  label: 'Hindi Wishes',              recipient: 'general',    tone: 'general', language: 'hindi' },
  { id: 'hinglish',               label: 'Hinglish Wishes',           recipient: 'general',    tone: 'general', language: 'hinglish' },
];

/**
 * GET /api/wishes
 * Returns all curated wishes grouped by category.
 */
router.get('/', (_req, res) => {
  const curated = getCuratedWishes();

  const result = CATEGORIES.map((cat) => ({
    ...cat,
    wishes: (curated[cat.id] || []).map((text, i) => ({
      id: `curated-${cat.id}-${i}`,
      text,
      provider: 'curated',
    })),
  }));

  res.json({ success: true, categories: result });
});

/**
 * GET /api/wishes/categories
 * Returns the list of available categories (metadata only).
 */
router.get('/categories', (_req, res) => {
  res.json({ success: true, categories: CATEGORIES });
});

/**
 * POST /api/wishes/favorite
 * Body: { wishId: string, sessionId: string }
 * Adds or removes a wish from the session's favorites (toggle).
 */
router.post('/favorite', (req, res) => {
  const { wishId, sessionId } = req.body;

  if (!wishId || typeof wishId !== 'string') {
    return res.status(400).json({ success: false, message: 'wishId is required.' });
  }
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ success: false, message: 'sessionId is required.' });
  }

  const favorites = favoritesStore.get(sessionId) || [];
  const existingIndex = favorites.findIndex((f) => f.wishId === wishId);

  let action;
  if (existingIndex !== -1) {
    favorites.splice(existingIndex, 1);
    action = 'removed';
  } else {
    favorites.push({ wishId, addedAt: new Date().toISOString() });
    action = 'added';
  }

  favoritesStore.set(sessionId, favorites);

  res.json({ success: true, action, wishId, totalFavorites: favorites.length });
});

/**
 * GET /api/wishes/favorites/:sessionId
 * Returns all favorite wishIds for the given session.
 */
router.get('/favorites/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const favorites = favoritesStore.get(sessionId) || [];
  res.json({ success: true, sessionId, favorites });
});

export default router;
