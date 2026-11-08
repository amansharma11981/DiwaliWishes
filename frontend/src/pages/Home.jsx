import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Image, BookOpen, ChevronDown } from 'lucide-react'
import { getDiwaliCountdown, formatDate } from '../utils/helpers'

// ─── Countdown Widget ───────────────────────────────────────────────────────
function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass border-animated rounded-2xl px-4 py-3 min-w-[72px] text-center">
        <span className="font-display font-bold text-3xl sm:text-4xl text-gradient-gold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-white/50 mt-2 uppercase tracking-widest">{label}</span>
    </div>
  )
}

function DiwaliCountdown() {
  const [time, setTime] = useState(getDiwaliCountdown())

  useEffect(() => {
    const id = setInterval(() => setTime(getDiwaliCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="text-center"
    >
      {time.isToday ? (
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-gold border border-diwali-gold/50 shadow-gold animate-pulse-gold text-diwali-gold font-bold text-sm sm:text-base">
            <span className="text-xl">🪔</span>
            <span>Today is Diwali {time.year}! Shubh Deepavali!</span>
            <span className="text-xl">🎆</span>
          </div>
          <p className="text-white/60 text-xs sm:text-sm">
            Celebration in full swing! Time left in today's festival day:
          </p>
          <div className="flex items-start justify-center gap-3 sm:gap-4 mt-2">
            <CountdownUnit value={time.hours} label="Hours Left" />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.minutes} label="Mins" />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.seconds} label="Secs" />
          </div>
          <p className="text-white/40 text-xs mt-2 italic">
            Once midnight strikes, countdown to Diwali {time.year + 1} begins automatically!
          </p>
        </div>
      ) : (
        <div>
          <p className="text-diwali-gold/80 text-sm mb-3 font-medium">
            ✨ Next Diwali {time.year} {time.date && `— ${formatDate(time.date)}`}
          </p>
          <div className="flex items-start justify-center gap-3 sm:gap-4">
            <CountdownUnit value={time.days} label="Days" />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.hours} label="Hours" />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.minutes} label="Mins" />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.seconds} label="Secs" />
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── Diya SVG Illustration ──────────────────────────────────────────────────
function DiyaIllustration() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative select-none"
    >
      <svg width="140" height="140" viewBox="0 0 140 140" className="diya-glow">
        {/* Flame glow */}
        <ellipse cx="70" cy="30" rx="12" ry="20" fill="rgba(255,180,0,0.2)" className="animate-pulse"/>
        {/* Outer flame */}
        <ellipse cx="70" cy="34" rx="8" ry="16" fill="#FF6B00" className="animate-flicker"/>
        {/* Inner flame */}
        <ellipse cx="70" cy="38" rx="4" ry="10" fill="#FFD700" className="animate-flicker"/>
        {/* Flame tip */}
        <ellipse cx="70" cy="27" rx="2" ry="5" fill="#fff" className="animate-flicker"/>
        {/* Wick */}
        <rect x="69" y="48" width="2" height="8" fill="#8B4513" rx="1"/>
        {/* Diya bowl */}
        <path d="M40 72 Q70 56 100 72 Q95 95 70 95 Q45 95 40 72Z" fill="#D2691E"/>
        <path d="M40 72 Q70 60 100 72 Q96 80 70 80 Q44 80 40 72Z" fill="#CD853F"/>
        {/* Oil */}
        <ellipse cx="70" cy="72" rx="22" ry="8" fill="rgba(255,165,0,0.6)"/>
        {/* Rim decoration */}
        <path d="M42 74 Q70 65 98 74" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
        {/* Spout */}
        <path d="M94 68 Q110 65 108 72 Q104 76 95 76Z" fill="#CD853F"/>
        {/* Base */}
        <ellipse cx="70" cy="95" rx="30" ry="6" fill="#8B4513"/>
        <ellipse cx="70" cy="95" rx="30" ry="4" fill="#CD853F"/>
        {/* Glow halo */}
        <circle cx="70" cy="35" r="20" fill="rgba(255,215,0,0.08)" className="animate-pulse"/>
        {/* Sparkles */}
        <text x="20" y="25" fontSize="12" className="animate-twinkle">✦</text>
        <text x="108" y="30" fontSize="10" className="animate-twinkle" style={{animationDelay:'0.5s'}}>✦</text>
        <text x="90" y="15" fontSize="8" className="animate-twinkle" style={{animationDelay:'1s'}}>✦</text>
      </svg>
      {/* Halo rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border border-diwali-gold/20 rounded-full animate-ping" style={{animationDuration:'3s'}}/>
      </div>
    </motion.div>
  )
}

// ─── Feature Card ────────────────────────────────────────────────────────────
function FeatureCard({ title, desc, to, emoji, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <Link to={to} className="block diwali-card p-6 h-full group">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>
          {emoji}
        </div>
        <h3 className="font-display text-xl font-bold text-diwali-gold mb-2 group-hover:text-gradient-gold transition-all">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
        <div className="mt-4 text-diwali-gold/60 text-sm font-medium group-hover:text-diwali-gold transition-colors flex items-center gap-1">
          Explore <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Home Page ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-diwali" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Mandala decoration */}
        <div className="absolute top-20 left-10 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="animate-spin-slow">
            <circle cx="100" cy="100" r="95" fill="none" stroke="#FFD700" strokeWidth="1"/>
            <circle cx="100" cy="100" r="70" fill="none" stroke="#FFD700" strokeWidth="1"/>
            <circle cx="100" cy="100" r="45" fill="none" stroke="#FFD700" strokeWidth="1"/>
            {Array.from({length:12}).map((_,i) => (
              <line key={i} x1="100" y1="5" x2="100" y2="195"
                stroke="#FFD700" strokeWidth="0.5"
                transform={`rotate(${i*30} 100 100)`}/>
            ))}
            {Array.from({length:12}).map((_,i) => (
              <circle key={i} cx={100 + 70*Math.cos(i*Math.PI/6-Math.PI/2)} cy={100 + 70*Math.sin(i*Math.PI/6-Math.PI/2)} r="5"
                fill="#FFD700"/>
            ))}
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-48 h-48 opacity-5">
          <svg viewBox="0 0 200 200" className="animate-spin-slow" style={{animationDirection:'reverse', animationDuration:'25s'}}>
            <circle cx="100" cy="100" r="95" fill="none" stroke="#FF6B00" strokeWidth="1"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#FF6B00" strokeWidth="1"/>
            {Array.from({length:8}).map((_,i) => (
              <ellipse key={i} cx="100" cy="50" rx="8" ry="20" fill="#FF6B00"
                transform={`rotate(${i*45} 100 100)`}/>
            ))}
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass-gold rounded-full text-diwali-gold text-sm font-medium"
          >
            <span className="animate-flicker">🪔</span>
            Happy Diwali! Festival of Lights
            <span className="animate-flicker" style={{animationDelay:'0.3s'}}>🪔</span>
          </motion.div>

          {/* Diya */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', bounce: 0.4 }}
            className="flex justify-center"
          >
            <DiyaIllustration />
          </motion.div>

          {/* Headline */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-tight"
            >
              <span className="text-gradient-gold">Illuminate Your World</span>
              <br />
              <span className="text-white">with Happiness!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-4 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Celebrate the Festival of Lights with Love, Joy and Togetherness.
              Create AI-powered wishes, beautiful greeting cards, and share the magic of Diwali.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/generate"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl btn-gold text-base font-bold shadow-gold animate-pulse-gold"
            >
              <Sparkles size={18} />
              Generate AI Wishes
            </Link>
            <Link
              to="/card-creator"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl btn-glass text-base font-semibold"
            >
              <Image size={18} />
              Create Greeting Card
            </Link>
            <Link
              to="/gallery"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white/80 hover:text-white hover:border-diwali-gold/30 transition-all text-base font-semibold"
            >
              <BookOpen size={18} />
              Explore Wishes
            </Link>
          </motion.div>

          {/* Countdown */}
          <DiwaliCountdown />

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/30 flex justify-center mt-8"
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold mb-4">
            Celebrate Every Moment
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From AI-generated personalized wishes to beautiful greeting cards — make this Diwali unforgettable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              emoji: '🤖', title: 'AI Wishes Generator', to: '/generate', delay: 0,
              color: 'from-yellow-500 to-orange-500',
              desc: 'Generate personalized Diwali wishes in English, Hindi, Hinglish and more — powered by Google Gemini AI.',
            },
            {
              emoji: '🎨', title: 'Greeting Card Creator', to: '/card-creator', delay: 0.1,
              color: 'from-pink-500 to-purple-600',
              desc: 'Design beautiful Diwali greeting cards with customizable templates, fonts, and festive decorations.',
            },
            {
              emoji: '🖼️', title: 'Wishes Gallery', to: '/gallery', delay: 0.2,
              color: 'from-blue-500 to-teal-500',
              desc: 'Explore a curated collection of Diwali wishes sorted by relationship, tone, and language.',
            },
            {
              emoji: '🪔', title: 'Festival Experience', to: '/experience', delay: 0.3,
              color: 'from-orange-500 to-red-600',
              desc: 'Light interactive diyas, launch fireworks, and immerse yourself in the magic of Diwali.',
            },
            {
              emoji: '📱', title: 'Instant Sharing', to: '/generate', delay: 0.4,
              color: 'from-green-500 to-emerald-600',
              desc: 'Share wishes on WhatsApp, copy to clipboard, or download as beautiful images in one click.',
            },
            {
              emoji: '📖', title: 'About Diwali', to: '/about', delay: 0.5,
              color: 'from-purple-500 to-pink-500',
              desc: 'Discover the rich history, traditions, and cultural significance of the Festival of Lights.',
            },
          ].map((card) => (
            <FeatureCard key={card.to + card.emoji} {...card} />
          ))}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="py-16 overflow-hidden">
        <div className="glass-dark border-y border-diwali-gold/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '50+', label: 'Wish Templates', emoji: '📝' },
                { number: '6', label: 'Languages', emoji: '🌐' },
                { number: '6', label: 'Card Templates', emoji: '🎨' },
                { number: '∞', label: 'AI Combinations', emoji: '🤖' },
              ].map(({ number, label, emoji }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="space-y-1"
                >
                  <div className="text-3xl">{emoji}</div>
                  <div className="font-display font-bold text-4xl text-gradient-gold">{number}</div>
                  <div className="text-white/50 text-sm">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Diwali Quote ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border-animated rounded-3xl p-10"
        >
          <div className="text-5xl mb-6">🪔</div>
          <blockquote className="font-display text-2xl sm:text-3xl font-bold text-white/90 leading-relaxed mb-6">
            "Light a thousand lamps from one lamp — the light is not diminished. Share joy freely, for it only multiplies."
          </blockquote>
          <p className="text-diwali-gold/70 text-sm">— Inspired by Indian Philosophy</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate" className="px-8 py-3 rounded-xl btn-gold font-semibold">
              ✨ Start Creating
            </Link>
            <Link to="/experience" className="px-8 py-3 rounded-xl btn-glass font-semibold">
              🪔 Light a Diya
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
