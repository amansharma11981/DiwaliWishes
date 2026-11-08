import { body, validationResult } from 'express-validator';

const RECIPIENTS = ['friends', 'family', 'parents', 'partner', 'colleagues', 'teacher'];
const TONES = ['emotional', 'funny', 'romantic', 'professional', 'traditional'];
const LANGUAGES = ['english', 'hindi', 'hinglish', 'sanskrit'];
const LENGTHS = ['short', 'medium', 'long'];

/**
 * Validation chain for the POST /api/ai/generate-wishes endpoint.
 */
export const validateWishRequest = [
  body('recipient')
    .trim()
    .toLowerCase()
    .isIn(RECIPIENTS)
    .withMessage(
      `recipient must be one of: ${RECIPIENTS.join(', ')}`
    ),

  body('tone')
    .trim()
    .toLowerCase()
    .isIn(TONES)
    .withMessage(
      `tone must be one of: ${TONES.join(', ')}`
    ),

  body('language')
    .trim()
    .toLowerCase()
    .isIn(LANGUAGES)
    .withMessage(
      `language must be one of: ${LANGUAGES.join(', ')}`
    ),

  body('length')
    .trim()
    .toLowerCase()
    .isIn(LENGTHS)
    .withMessage(
      `length must be one of: ${LENGTHS.join(', ')}`
    ),

  body('name')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isString()
    .isLength({ max: 60 })
    .withMessage('name must be a string with at most 60 characters'),

  body('count')
    .optional({ nullable: true })
    .isInt({ min: 1, max: 10 })
    .withMessage('count must be an integer between 1 and 10'),

  /**
   * Middleware: collect validation errors and respond 422 if any.
   */
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        error: 'ValidationError',
        details: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }
    next();
  },
];
