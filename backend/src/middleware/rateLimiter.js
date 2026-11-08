import rateLimit from 'express-rate-limit';

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutes
const max = Number(process.env.RATE_LIMIT_MAX) || 50;

/**
 * General API rate limiter applied to all /api routes.
 */
export const apiLimiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'TooManyRequests',
    message: 'Too many requests, please try again later.',
  },
});

/**
 * Stricter limiter for AI-generation endpoints (max 20 per 15 min).
 */
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // always 15 minutes regardless of env override
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'TooManyRequests',
    message:
      'AI generation limit reached. Please wait a few minutes before generating more wishes.',
  },
});
