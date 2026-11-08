import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Image, BookOpen, ChevronDown } from 'lucide-react'
import { getDiwaliCountdown, formatDate } from '../utils/helpers'
import { useLanguage } from '../context/LanguageContext'

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
  const { t } = useLanguage()

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
            <span>{t('home.todayIsDiwali')} {time.year}! {t('home.shubhDeepavali')}</span>
            <span className="text-xl">🎆</span>
          </div>
          <p className="text-white/60 text-xs sm:text-sm">
            {t('home.celebrationLive')}
          </p>
          <div className="flex items-start justify-center gap-3 sm:gap-4 mt-2">
            <CountdownUnit value={time.hours} label={t('home.hoursLeft')} />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.minutes} label={t('home.mins')} />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.seconds} label={t('home.secs')} />
          </div>
          <p className="text-white/40 text-xs mt-2 italic">
            {t('home.countdownSub').replace('{year}', time.year + 1)}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-diwali-gold/80 text-sm mb-3 font-medium">
            ✨ {t('home.nextDiwali')} {time.year} {time.date && `— ${formatDate(time.date)}`}
          </p>
          <div className="flex items-start justify-center gap-3 sm:gap-4">
            <CountdownUnit value={time.days} label={t('home.days')} />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.hours} label={t('home.hours')} />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.minutes} label={t('home.mins')} />
            <span className="text-diwali-gold/60 text-3xl font-bold mt-2">:</span>
            <CountdownUnit value={time.seconds} label={t('home.secs')} />
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
        <ellipse cx="70" cy="30" rx="12" ry="20" fill="rgba(255,180,0,0.2)" className="animate-pulse"/>
        <ellipse cx="70" cy="34" rx="8" ry="16" fill="#FF6B00" className="animate-flicker"/>
        <ellipse cx="70" cy="38" rx="4" ry="10" fill="#FFD700" className="animate-flicker"/>
        <ellipse cx="70" cy="27" rx="2" ry="5" fill="#fff" className="animate-flicker"/>
        <rect x="69" y="48" width="2" height="8" fill="#8B4513" rx="1"/>
        <path d="M40 72 Q70 56 100 72 Q95 95 70 95 Q45 95 40 72Z" fill="#D2691E"/>
        <path d="M40 72 Q70 60 100 72 Q96 80 70 80 Q44 80 40 72Z" fill="#CD853F"/>
        <ellipse cx="70" cy="72" rx="22" ry="8" fill="rgba(255,165,0,0.6)"/>
        <path d="M42 74 Q70 65 98 74" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
        <path d="M94 68 Q110 65 108 72 Q104 76 95 76Z" fill="#CD853F"/>
        <ellipse cx="70" cy="95" rx="30" ry="6" fill="#8B4513"/>
        <ellipse cx="70" cy="95" rx="30" ry="4" fill="#CD853F"/>
        <circle cx="70" cy="35" r="20" fill="rgba(255,215,0,0.08)" className="animate-pulse"/>
        <text x="20" y="25" fontSize="12" className="animate-twinkle">✦</text>
        <text x="108" y="30" fontSize="10" className="animate-twinkle" style={{animationDelay:'0.5s'}}>✦</text>
        <text x="90" y="15" fontSize="8" className="animate-twinkle" style={{animationDelay:'1s'}}>✦</text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border border-diwali-gold/20 rounded-full animate-ping" style={{animationDuration:'3s'}}/>
      </div>
    </motion.div>
  )
}

function FeatureCard({ title, desc, to, emoji, color, delay, exploreLabel }) {
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
          {exploreLabel} <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-diwali" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass-gold rounded-full text-diwali-gold text-sm font-medium"
          >
            <span className="animate-flicker">🪔</span>
            {t('home.badge')}
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
              <span className="text-gradient-gold">{t('home.heroTitle1')}</span>
              <br />
              <span className="text-white">{t('home.heroTitle2')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-4 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              {t('home.heroSubtitle')}
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
              {t('home.btnAI')}
            </Link>
            <Link
              to="/card-creator"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl btn-glass text-base font-semibold"
            >
              <Image size={18} />
              {t('home.btnCard')}
            </Link>
            <Link
              to="/gallery"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white/80 hover:text-white hover:border-diwali-gold/30 transition-all text-base font-semibold"
            >
              <BookOpen size={18} />
              {t('home.btnGallery')}
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
            {t('home.featuresTitle')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('home.featuresSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              emoji: '🤖', title: t('home.feature1Title'), to: '/generate', delay: 0,
              color: 'from-yellow-500 to-orange-500',
              desc: t('home.feature1Desc'),
            },
            {
              emoji: '🎨', title: t('home.feature2Title'), to: '/card-creator', delay: 0.1,
              color: 'from-pink-500 to-purple-600',
              desc: t('home.feature2Desc'),
            },
            {
              emoji: '🖼️', title: t('home.feature3Title'), to: '/gallery', delay: 0.2,
              color: 'from-blue-500 to-teal-500',
              desc: t('home.feature3Desc'),
            },
            {
              emoji: '🪔', title: t('home.feature4Title'), to: '/experience', delay: 0.3,
              color: 'from-orange-500 to-red-600',
              desc: t('home.feature4Desc'),
            },
            {
              emoji: '📱', title: t('home.feature5Title'), to: '/generate', delay: 0.4,
              color: 'from-green-500 to-emerald-600',
              desc: t('home.feature5Desc'),
            },
            {
              emoji: '📖', title: t('home.feature6Title'), to: '/about', delay: 0.5,
              color: 'from-purple-500 to-pink-500',
              desc: t('home.feature6Desc'),
            },
          ].map((card) => (
            <FeatureCard key={card.to + card.emoji} {...card} exploreLabel={t('home.explore')} />
          ))}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="py-16 overflow-hidden">
        <div className="glass-dark border-y border-diwali-gold/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '50+', label: t('home.statTemplates'), emoji: '📝' },
                { number: '6', label: t('home.statLanguages'), emoji: '🌐' },
                { number: '6', label: t('home.statCards'), emoji: '🎨' },
                { number: '∞', label: t('home.statCombinations'), emoji: '🤖' },
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
            {t('home.quote')}
          </blockquote>
          <p className="text-diwali-gold/70 text-sm">{t('home.quoteAuthor')}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate" className="px-8 py-3 rounded-xl btn-gold font-semibold">
              ✨ {t('home.startCreating')}
            </Link>
            <Link to="/experience" className="px-8 py-3 rounded-xl btn-glass font-semibold">
              🪔 {t('home.lightDiya')}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
