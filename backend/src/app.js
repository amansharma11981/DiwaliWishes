import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { apiLimiter } from './middleware/rateLimiter.js';
import wishesRouter from './routes/wishes.js';
import aiRouter from './routes/ai.js';
import cardsRouter from './routes/cards.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ── Security & utility middleware ──────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((u) => u.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Rate limiting (applies to all /api routes) ─────────────────────────────────
app.use('/api', apiLimiter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ── Feature routes ─────────────────────────────────────────────────────────────
app.use('/api/wishes', wishesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/cards', cardsRouter);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'The requested endpoint does not exist.',
  });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);

  const status = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'An internal server error occurred.'
      : err.message || 'An internal server error occurred.';

  res.status(status).json({
    success: false,
    error: err.name || 'Error',
    message,
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🪔 DiwaliWish backend running on http://localhost:${PORT}`);
  console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   AI provider : ${process.env.AI_PROVIDER || 'gemini'}`);
  console.log(
    `   Gemini key  : ${process.env.GEMINI_API_KEY ? '✅ set' : '❌ not set'}`
  );
  console.log(
    `   OpenAI key  : ${process.env.OPENAI_API_KEY ? '✅ set' : '❌ not set'}`
  );
});

export default app;
