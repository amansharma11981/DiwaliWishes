import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Sparkles, Flame } from 'lucide-react'
import toast from 'react-hot-toast'
import { soundEngine } from '../utils/soundEngine'
import { useLanguage } from '../context/LanguageContext'

// ─── Firework burst (manual click) ──────────────────────────────────────────
function ClickFirework({ x, y, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1500)
    return () => clearTimeout(timer)
  }, [onDone])

  const particles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16
    const dist = 60 + Math.random() * 60
    const color = ['#FFD700', '#FF6B00', '#FF69B4', '#9B59B6', '#00CED1', '#fff'][i % 6]
    return { angle, dist, color }
  })

  return (
    <div className="fixed pointer-events-none z-50" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: 6, height: 6, background: p.color, left: 0, top: 0 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
            y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.01 }}
        />
      ))}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 0] }}
        transition={{ duration: 0.5 }}
      >
        ✨
      </motion.div>
    </div>
  )
}

// ─── Diya Component ──────────────────────────────────────────────────────────
function Diya({ id, x, y, lit, onLight, clickToLightText }) {
  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onLight(id)}
    >
      <div className="relative text-5xl sm:text-6xl">
        <AnimatePresence>
          {lit && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-flicker"
            >
              🔥
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`transition-all duration-500 ${lit ? 'diya-glow' : 'opacity-50 grayscale'}`}
          style={lit ? { filter: 'drop-shadow(0 0 12px #FFA500) drop-shadow(0 0 24px #FF6B0088)' } : {}}
        >
          🪔
        </div>

        {lit && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-diwali-gold/40"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {!lit && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/30 whitespace-nowrap">
          {clickToLightText}
        </div>
      )}
    </motion.div>
  )
}

// ─── Floating Lantern ────────────────────────────────────────────────────────
function Lantern({ delay, startX }) {
  return (
    <motion.div
      className="fixed pointer-events-none text-4xl"
      style={{ left: `${startX}%`, bottom: -60 }}
      animate={{ y: [-100, -800], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 8, delay, ease: 'easeOut' }}
    >
      🏮
    </motion.div>
  )
}

// ─── Rangoli Pattern ─────────────────────────────────────────────────────────
function RangoliArt() {
  const colors = ['#FFD700', '#FF6B00', '#FF69B4', '#9B59B6', '#00CED1', '#50C878']
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" style={{ maxWidth: 300 }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x = 150 + 120 * Math.cos(angle)
        const y = 150 + 120 * Math.sin(angle)
        return (
          <circle key={`outer-${i}`} cx={x} cy={y} r="8" fill={colors[i % colors.length]} opacity="0.9" />
        )
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const cx = 150 + 80 * Math.cos(angle)
        const cy = 150 + 80 * Math.sin(angle)
        return (
          <ellipse key={`petal-${i}`} cx={cx} cy={cy} rx="15" ry="25"
            fill={colors[(i + 2) % colors.length]}
            transform={`rotate(${i * 45 + 90} ${cx} ${cy})`}
            opacity="0.8" />
        )
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180
        const x = 150 + 50 * Math.cos(angle)
        const y = 150 + 50 * Math.sin(angle)
        return (
          <circle key={`mid-${i}`} cx={x} cy={y} r="10" fill={colors[i % colors.length]} opacity="0.9" />
        )
      })}
      <circle cx="150" cy="150" r="30" fill="#FFD700" opacity="0.8" />
      <circle cx="150" cy="150" r="20" fill="#FF6B00" opacity="0.9" />
      <circle cx="150" cy="150" r="10" fill="#fff" opacity="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        return (
          <line key={`line-${i}`}
            x1="150" y1="150"
            x2={150 + 125 * Math.cos(angle)}
            y2={150 + 125 * Math.sin(angle)}
            stroke={colors[i % colors.length]} strokeWidth="1" opacity="0.4" />
        )
      })}
    </svg>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
const DIYA_POSITIONS = [
  { id: 1, x: 20, y: 35 }, { id: 2, x: 80, y: 35 },
  { id: 3, x: 50, y: 20 }, { id: 4, x: 15, y: 65 },
  { id: 5, x: 85, y: 65 }, { id: 6, x: 35, y: 75 },
  { id: 7, x: 65, y: 75 }, { id: 8, x: 50, y: 50 },
  { id: 9, x: 25, y: 50 }, { id: 10, x: 75, y: 50 },
]

export default function FestivalExperience() {
  const { t } = useLanguage()
  const [litDiyas, setLitDiyas] = useState(new Set())
  const [fireworks, setFireworks] = useState([])
  const [lanterns, setLanterns] = useState([])
  const [soundOn, setSoundOn] = useState(false)
  const [score, setScore] = useState(0)
  const nextId = useRef(0)

  const lightDiya = useCallback((id) => {
    if (litDiyas.has(id)) return
    setLitDiyas(prev => new Set([...prev, id]))
    setScore(s => s + 10)
    soundEngine.playDiyaChime()
    const fw = { id: nextId.current++, x: window.innerWidth / 2 + (Math.random() - 0.5) * 200, y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100 }
    setFireworks(prev => [...prev, fw])
    toast(`🪔 Diya ${id} is glowing!`, { icon: '✨' })

    if (litDiyas.size + 1 === DIYA_POSITIONS.length) {
      setTimeout(() => toast.success('🎆 All diyas lit! Happy Diwali! 🎆', { duration: 4000 }), 300)
    }
  }, [litDiyas])

  const handleClickFirework = (e) => {
    if (e.target.closest('button') || e.target.closest('[data-diya]')) return
    const fw = { id: nextId.current++, x: e.clientX, y: e.clientY }
    setFireworks(prev => [...prev, fw])
    soundEngine.playFirework()
  }

  const removeFw = (id) => setFireworks(prev => prev.filter(f => f.id !== id))

  const launchLanterns = () => {
    const batch = Array.from({ length: 5 }).map((_, i) => ({
      id: nextId.current++,
      delay: i * 0.6,
      startX: 10 + Math.random() * 80,
    }))
    setLanterns(batch)
    soundEngine.playSparkle()
    setTimeout(() => setLanterns([]), 10000)
    toast('🏮 Lanterns released!', { icon: '✨' })
  }

  const lightAllDiyas = () => {
    const all = new Set(DIYA_POSITIONS.map(d => d.id))
    setLitDiyas(all)
    setScore(s => s + DIYA_POSITIONS.length * 10)
    soundEngine.playDiyaChime()
    toast.success('🎆 All diyas illuminated! Happy Diwali!', { duration: 4000 })
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const fw = {
          id: nextId.current++,
          x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
          y: Math.random() * window.innerHeight * 0.5,
        }
        setFireworks(prev => [...prev, fw])
        soundEngine.playFirework()
      }, i * 200)
    }
  }

  const resetAll = () => {
    setLitDiyas(new Set())
    setScore(0)
    toast('🌙 Reset — light the diyas again!', { icon: '🕯️' })
  }

  const toggleSound = () => {
    const nextState = !soundOn
    setSoundOn(nextState)
    soundEngine.toggle(nextState)
    if (nextState) {
      toast('🎵 Festive audio & effects active', { icon: '🪔' })
    } else {
      toast('🔇 Audio muted', { icon: '🔇' })
    }
  }

  useEffect(() => {
    return () => {
      soundEngine.stopAmbient()
    }
  }, [])

  return (
    <div
      className="page-enter min-h-screen pt-20 pb-16 relative overflow-hidden cursor-crosshair"
      onClick={handleClickFirework}
      style={{ background: 'linear-gradient(180deg, #04040F 0%, #0A0A2E 50%, #120820 100%)' }}
    >
      {/* Firework bursts */}
      {fireworks.map(fw => (
        <ClickFirework key={fw.id} x={fw.x} y={fw.y} onDone={() => removeFw(fw.id)} />
      ))}

      {/* Lanterns */}
      {lanterns.map(l => (
        <Lantern key={l.id} delay={l.delay} startX={l.startX} />
      ))}

      {/* Score badge */}
      <div className="fixed top-20 right-4 z-30 glass-gold px-3 py-2 rounded-xl text-diwali-gold text-sm font-bold">
        ✨ {score} {t('experience.pts')}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-4 pt-8 pb-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-5xl mb-4">🎆</div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-gradient-gold mb-3">
            {t('experience.title')}
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <button
            onClick={e => { e.stopPropagation(); lightAllDiyas() }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold font-semibold text-sm"
          >
            <Flame size={15} /> {t('experience.lightAll')}
          </button>
          <button
            onClick={e => { e.stopPropagation(); launchLanterns() }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-glass font-semibold text-sm"
          >
            🏮 {t('experience.releaseLanterns')}
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              const fw = {
                id: nextId.current++,
                x: Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2,
                y: Math.random() * window.innerHeight * 0.4 + 100,
              }
              setFireworks(prev => [...prev, fw])
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/20 text-white/70 hover:text-white font-semibold text-sm"
          >
            <Sparkles size={15} /> {t('experience.launchFirework')}
          </button>
          <button
            onClick={e => { e.stopPropagation(); toggleSound() }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl glass border font-semibold text-sm transition-all ${soundOn ? 'border-diwali-gold/40 text-diwali-gold glass-gold shadow-gold' : 'border-white/20 text-white/50'}`}
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            {soundOn ? t('experience.soundOn') : t('experience.soundOff')}
          </button>
          <button
            onClick={e => { e.stopPropagation(); resetAll() }}
            className="px-4 py-2.5 rounded-xl glass border border-white/10 text-white/40 hover:text-white text-sm"
          >
            {t('experience.reset')}
          </button>
        </div>

        <div className="mt-3 text-xs text-white/30">
          {litDiyas.size}/{DIYA_POSITIONS.length} {t('experience.diyasLit')}
        </div>
      </div>

      {/* Diya field */}
      <div className="relative z-10 max-w-3xl mx-auto mx-4" style={{ height: '50vh', minHeight: 320 }}>
        {DIYA_POSITIONS.map(pos => (
          <Diya
            key={pos.id}
            {...pos}
            lit={litDiyas.has(pos.id)}
            onLight={lightDiya}
            clickToLightText={t('experience.clickToLight')}
          />
        ))}
      </div>

      {/* Rangoli section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8"
        >
          <h2 className="font-display text-2xl font-bold text-gradient-gold text-center mb-6">
            {t('experience.rangoliTitle')}
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-64 h-64 flex-shrink-0">
              <RangoliArt />
            </div>
            <div className="text-white/70 leading-relaxed space-y-3 text-sm">
              <p>{t('experience.rangoliDesc1')}</p>
              <p>{t('experience.rangoliDesc2')}</p>
              <p className="text-diwali-gold/80 font-medium">{t('experience.rangoliColors')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
