import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw, Copy, Share2, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { aiService } from '../services/api'
import { galleryWishes } from '../data/wishes'
import { copyToClipboard, shareOnWhatsApp } from '../utils/helpers'
import { toPng } from 'html-to-image'

const OPTIONS = {
  recipient: ['friends', 'family', 'parents', 'partner', 'colleagues', 'teacher'],
  language: ['english', 'hindi', 'hinglish', 'sanskrit'],
  tone: ['emotional', 'funny', 'romantic', 'professional', 'traditional'],
  length: ['short', 'medium', 'long'],
}

const LABELS = {
  recipient: { friends: '👫 Friends', family: '👨‍👩‍👧‍👦 Family', parents: '🙏 Parents', partner: '❤️ Partner', colleagues: '💼 Colleagues', teacher: '📚 Teacher' },
  language: { english: '🇬🇧 English', hindi: '🇮🇳 Hindi', hinglish: '🌟 Hinglish', sanskrit: '🕉️ Sanskrit-inspired' },
  tone: { emotional: '💖 Emotional', funny: '😄 Funny', romantic: '🌹 Romantic', professional: '💼 Professional', traditional: '🙏 Traditional' },
  length: { short: '📝 Short', medium: '📄 Medium', long: '📃 Long' },
}

function SelectGroup({ label, field, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-diwali-gold/80 uppercase tracking-wider">{label}</label>
      <div className="flex flex-wrap gap-2">
        {OPTIONS[field].map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(field, opt)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              value === opt
                ? 'btn-gold shadow-gold'
                : 'glass border border-white/10 text-white/70 hover:border-diwali-gold/30 hover:text-white'
            }`}
          >
            {LABELS[field][opt]}
          </button>
        ))}
      </div>
    </div>
  )
}

function WishCard({ wish, index }) {
  const [downloaded, setDownloaded] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard(wish.text)
    toast.success('Wish copied to clipboard! 🪔')
  }

  const handleShare = () => {
    shareOnWhatsApp(`🪔 Happy Diwali! 🎆\n\n${wish.text}\n\nGenerated with DiwaliWish ✨`)
    toast.success('Opening WhatsApp... 📱')
  }

  const handleDownload = async () => {
    const el = document.getElementById(`wish-card-${index}`)
    if (!el) return
    setDownloaded(true)
    try {
      const dataUrl = await toPng(el, { quality: 0.95, backgroundColor: '#1A0D45' })
      const link = document.createElement('a')
      link.download = `diwali-wish-${index + 1}.png`
      link.href = dataUrl
      link.click()
      toast.success('Wish downloaded! 🎆')
    } catch {
      toast.error('Download failed, please try again.')
    } finally {
      setTimeout(() => setDownloaded(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="diwali-card overflow-hidden"
    >
      <div
        id={`wish-card-${index}`}
        className="p-6 min-h-[160px] relative"
        style={{ background: 'linear-gradient(135deg, #1A0D45, #2D1B69)' }}
      >
        <div className="absolute top-3 right-3 text-2xl opacity-30">🪔</div>
        <div className="absolute bottom-3 left-3 text-lg opacity-20">✨</div>
        <span className="text-xs font-semibold text-diwali-saffron/80 uppercase tracking-widest block mb-3">
          Wish #{index + 1} · {wish.provider || 'AI Generated'}
        </span>
        <p className="text-white/90 leading-relaxed font-body text-sm sm:text-base">{wish.text}</p>
      </div>
      <div className="px-6 py-4 border-t border-diwali-gold/10 flex items-center gap-2">
        <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-gold text-diwali-gold text-xs font-medium hover:shadow-gold transition-all">
          <Copy size={12} /> Copy
        </button>
        <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-600/40 transition-all">
          <Share2 size={12} /> WhatsApp
        </button>
        <button onClick={handleDownload} className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass border border-white/10 text-white/60 text-xs font-medium hover:text-white transition-all ml-auto">
          <Download size={12} /> {downloaded ? 'Saving...' : 'Save'}
        </button>
      </div>
    </motion.div>
  )
}

export default function AIGenerator() {
  const [form, setForm] = useState({
    recipient: 'family',
    language: 'english',
    tone: 'emotional',
    length: 'medium',
    name: '',
    count: 3,
  })
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(false)
  const [usedFallback, setUsedFallback] = useState(false)

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
  }

  const adaptLength = (rawText, len, lang) => {
    if (len === 'short') {
      let shortText = rawText.split(/[—;]/)[0].trim().split(/[.!?।]\s+/)[0].trim()
      if (!shortText.endsWith('!') && !shortText.endsWith('।') && !shortText.endsWith('.')) {
        shortText += '!'
      }
      return `${shortText} 🪔✨`
    }
    if (len === 'long') {
      if (lang === 'hindi') {
        return `दीपों की पावन ज्योति आपके जीवन के समस्त अंधकारों को मिटा दे। रंगोली के रंगों की भाँति आपका हर दिन खुशियों से महकता रहे। ${rawText} माँ लक्ष्मी और विघ्नहर्ता भगवान श्री गणेश जी की असीम अनुकंपा आपके पूरे परिवार पर सदैव बनी रहे। सपरिवार दीपावली की हार्दिक शुभकामनाएँ! 🪷🪔🎆`
      }
      if (lang === 'hinglish') {
        return `Diwali ki ye glittering night aapki life mein endless happiness lekar aaye! Har diya jo jale, wo aapke saare stress ko hamesha ke liye door kar de. ${rawText} Wishing you and your entire family unbounded laughter, delicious sweets, aur Maa Lakshmi ka endless aashirwaad. Have a truly wonderful and safe Diwali! 🪔🎆✨`
      }
      return `As thousands of golden diyas illuminate the night and sacred chants echo with devotion, may the divine light guide your footsteps toward boundless success. ${rawText} May your days be adorned with good health, your nights with tranquility, and your heart with the eternal warmth of those you love. May Goddess Lakshmi bestow spiritual wisdom and worldly abundance upon your household. Shubh Deepawali! 🪷🪔✨`
    }
    return rawText
  }

  const getFallbackWishes = useCallback(() => {
    // Pick from gallery wishes matching the category
    const matches = galleryWishes.filter(w =>
      w.category === form.recipient &&
      (form.language === 'english' ? w.language === 'english' : w.language === form.language)
    )
    const pool = matches.length >= form.count ? matches : galleryWishes.filter(w => w.language === form.language || w.language === 'english')
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, form.count).map(w => ({
      id: `${w.id}-${form.length}-${Date.now()}`,
      text: adaptLength(w.text, form.length, form.language),
      provider: 'curated'
    }))
  }, [form])

  const generate = useCallback(async () => {
    setLoading(true)
    setWishes([])
    setUsedFallback(false)
    try {
      const result = await aiService.generateWishes({
        recipient: form.recipient,
        language: form.language,
        tone: form.tone,
        length: form.length,
        name: form.name,
        count: form.count,
      })
      setWishes(result.wishes || [])
      if (result.provider === 'fallback' || result.wishes?.[0]?.provider === 'fallback') {
        setUsedFallback(true)
      }
      toast.success(`${form.count} wishes generated! 🎆`)
    } catch {
      // Backend not running or error — use frontend fallback
      const fb = getFallbackWishes()
      setWishes(fb)
      setUsedFallback(true)
      toast('Using curated wishes (AI backend offline) 🪔', { icon: '📚' })
    } finally {
      setLoading(false)
    }
  }, [form, getFallbackWishes])

  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-5xl mb-4">✨</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-gradient-gold mb-3">
            AI Wishes Generator
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Craft personalized Diwali greetings powered by Google Gemini AI — in multiple languages, tones, and styles.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6 sm:p-8 space-y-6 mb-8"
        >
          <SelectGroup label="Who is it for?" field="recipient" value={form.recipient} onChange={handleChange} />
          <SelectGroup label="Language" field="language" value={form.language} onChange={handleChange} />
          <SelectGroup label="Tone" field="tone" value={form.tone} onChange={handleChange} />
          <SelectGroup label="Length" field="length" value={form.length} onChange={handleChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-diwali-gold/80 uppercase tracking-wider">
                Recipient's Name <span className="text-white/30 font-normal normal-case">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Priya, Mom, Rahul..."
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-diwali-gold/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-diwali-gold/80 uppercase tracking-wider">
                Number of Variations
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range" min={1} max={5} value={form.count}
                  onChange={e => handleChange('count', Number(e.target.value))}
                  className="flex-1"
                />
                <span className="glass-gold px-3 py-1 rounded-lg text-diwali-gold font-bold text-lg min-w-[2.5rem] text-center">
                  {form.count}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={generate}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl btn-gold text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="loading-dots flex gap-1">
                    <span /><span /><span />
                  </div>
                  Generating magic...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Wishes
                </>
              )}
            </button>
            {wishes.length > 0 && (
              <button
                onClick={generate}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl btn-glass font-semibold"
              >
                <RefreshCw size={16} />
                Regenerate
              </button>
            )}
          </div>
        </motion.div>

        {/* Fallback notice */}
        {usedFallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300/80 text-sm flex items-center gap-2"
          >
            📚 Showing curated wishes — connect the backend with a Gemini API key for AI-generated wishes!
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {wishes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h2 className="font-display text-xl font-bold text-diwali-gold flex items-center gap-2">
                <Sparkles size={18} />
                Your Personalized Wishes
              </h2>
              {wishes.map((wish, i) => (
                <WishCard key={wish.id || i} wish={wish} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!loading && wishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-white/40"
          >
            <div className="text-6xl mb-4">🪔</div>
            <p className="text-lg">Configure your options above and click <strong className="text-diwali-gold">Generate Wishes</strong></p>
            <p className="text-sm mt-2">AI will craft personalized Diwali greetings just for you</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
