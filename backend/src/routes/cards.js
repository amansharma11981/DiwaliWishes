import { Router } from 'express';
import { randomUUID } from 'crypto';

const router = Router();

// ── In-memory card store ───────────────────────────────────────────────────────
// Map<id, CardObject>
const cardStore = new Map();

// ── Template catalogue (hardcoded) ────────────────────────────────────────────
const TEMPLATES = [
  {
    id: 'golden-diya',
    name: 'Golden Diya',
    description: 'Warm golden tones with an ornate diya centrepiece.',
    thumbnail: '/assets/templates/golden-diya.png',
    primaryColor: '#F5A623',
    secondaryColor: '#D4700A',
    textColor: '#3B1A00',
    emoji: '🪔',
    tags: ['traditional', 'warm', 'classic'],
  },
  {
    id: 'rangoli-bloom',
    name: 'Rangoli Bloom',
    description: 'Vibrant rangoli-inspired floral patterns in pink and purple.',
    thumbnail: '/assets/templates/rangoli-bloom.png',
    primaryColor: '#E91E8C',
    secondaryColor: '#9B2CBF',
    textColor: '#1A0030',
    emoji: '🪷',
    tags: ['colourful', 'floral', 'festive'],
  },
  {
    id: 'starry-night',
    name: 'Starry Night Fireworks',
    description: 'Deep indigo sky bursting with silver and gold fireworks.',
    thumbnail: '/assets/templates/starry-night.png',
    primaryColor: '#1A237E',
    secondaryColor: '#FFD700',
    textColor: '#FFFFFF',
    emoji: '🎆',
    tags: ['night', 'dramatic', 'modern'],
  },
  {
    id: 'lotus-pond',
    name: 'Lotus Pond',
    description: 'Serene lotus blossoms on a glowing water reflection.',
    thumbnail: '/assets/templates/lotus-pond.png',
    primaryColor: '#00695C',
    secondaryColor: '#F48FB1',
    textColor: '#FFFFFF',
    emoji: '🪷',
    tags: ['serene', 'spiritual', 'elegant'],
  },
  {
    id: 'sparkle-gold',
    name: 'Sparkle Gold',
    description: 'Minimalist card with shimmering gold confetti and clean typography.',
    thumbnail: '/assets/templates/sparkle-gold.png',
    primaryColor: '#FFF8E1',
    secondaryColor: '#FFC107',
    textColor: '#3E2723',
    emoji: '✨',
    tags: ['minimal', 'professional', 'modern'],
  },
  {
    id: 'crimson-celebration',
    name: 'Crimson Celebration',
    description: 'Bold crimson and gold — a regal festival card for grand wishes.',
    thumbnail: '/assets/templates/crimson-celebration.png',
    primaryColor: '#B71C1C',
    secondaryColor: '#FFD700',
    textColor: '#FFFFFF',
    emoji: '🎇',
    tags: ['bold', 'regal', 'festive'],
  },
];

/**
 * GET /api/cards/templates
 * Returns the list of available greeting card templates.
 */
router.get('/templates', (_req, res) => {
  res.json({ success: true, templates: TEMPLATES });
});

/**
 * POST /api/cards/save
 * Body: { title, message, recipient, template, senderName? }
 * Saves a card and returns { id, shareUrl }.
 */
router.post('/save', (req, res) => {
  const { title, message, recipient, template, senderName } = req.body;

  // Basic validation
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'message is required.' });
  }
  if (!template || typeof template !== 'string') {
    return res.status(400).json({ success: false, message: 'template is required.' });
  }

  const templateExists = TEMPLATES.some((t) => t.id === template);
  if (!templateExists) {
    return res.status(400).json({
      success: false,
      message: `Template "${template}" not found. Use GET /api/cards/templates for valid options.`,
    });
  }

  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const card = {
    id,
    title: title?.trim() || '🪔 Happy Diwali!',
    message: message.trim(),
    recipient: recipient?.trim() || null,
    senderName: senderName?.trim() || null,
    template,
    createdAt,
    views: 0,
  };

  cardStore.set(id, card);

  const shareUrl = `/share/${id}`;

  res.status(201).json({
    success: true,
    id,
    shareUrl,
    card,
  });
});

/**
 * GET /api/cards/:id
 * Retrieves a saved card by its id.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const card = cardStore.get(id);

  if (!card) {
    return res.status(404).json({
      success: false,
      message: `Card with id "${id}" not found.`,
    });
  }

  // Increment view count
  card.views += 1;
  cardStore.set(id, card);

  const templateMeta = TEMPLATES.find((t) => t.id === card.template) || null;

  res.json({
    success: true,
    card,
    templateMeta,
  });
});

export default router;
