import { Router } from 'express';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { validateWishRequest } from '../middleware/validator.js';
import { generateWishes } from '../services/aiProvider.js';

const router = Router();

/**
 * POST /api/ai/generate-wishes
 * Body: { recipient, tone, language, length, name?, count? }
 * Returns: { success, wishes, provider, generated_at }
 */
router.post('/generate-wishes', aiLimiter, validateWishRequest, async (req, res, next) => {
  try {
    const { recipient, tone, language, length, name, count = 3 } = req.body;

    const wishes = await generateWishes({
      recipient,
      tone,
      language,
      length,
      name: name || null,
      count: Number(count),
    });

    const provider = wishes[0]?.provider || 'unknown';

    res.json({
      success: true,
      wishes,
      provider,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/ai/health
 * Returns provider availability status.
 */
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    providers: {
      gemini: !!process.env.GEMINI_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
    },
    primary: process.env.AI_PROVIDER || 'gemini',
  });
});

export default router;
