import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, RefreshCw, Palette, Type, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import { toPng } from 'html-to-image'
import { cardTemplates, fontOptions, colorSchemes } from '../data/templates'
import { shareOnWhatsApp } from '../utils/helpers'

const DEFAULT_CARD = {
  recipientName: 'Dear Friend',
  message: 'Wishing you and your family a bright, joyful, and prosperous Diwali! May the Festival of Lights fill your home with love, laughter, and abundance. 🪔✨',
  template: cardTemplates[0],
  font: fontOptions[0],
  accentColor: colorSchemes[0],
}

function CardPreview({ card, previewRef }) {
  const t = card.template
  return (
    <div
      ref={previewRef}
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '4/3',
        background: t.bg,
        border: t.border,
        borderRadius: '20px',
        fontFamily: card.font.family,
        minHeight: '300px',
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${card.accentColor.accent}22 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top decoration */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 pt-3 text-2xl opacity-60">
        <span>🪔</span>
        <span>🎆</span>
        <span>🪷</span>
        <span>🎆</span>
        <span>🪔</span>
      </div>

      {/* Mandala corner decorations */}
      <div className="absolute top-2 left-2 w-16 h-16 opacity-10">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="none" stroke={t.titleColor} strokeWidth="1"/>
          <circle cx="30" cy="30" r="18" fill="none" stroke={t.titleColor} strokeWidth="1"/>
          {Array.from({length:8}).map((_,i)=>(
            <line key={i} x1="30" y1="2" x2="30" y2="58" stroke={t.titleColor} strokeWidth="0.5" transform={`rotate(${i*22.5} 30 30)`}/>
          ))}
        </svg>
      </div>
      <div className="absolute top-2 right-2 w-16 h-16 opacity-10" style={{transform:'scaleX(-1)'}}>
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="none" stroke={t.titleColor} strokeWidth="1"/>
          <circle cx="30" cy="30" r="18" fill="none" stroke={t.titleColor} strokeWidth="1"/>
          {Array.from({length:8}).map((_,i)=>(
            <line key={i} x1="30" y1="2" x2="30" y2="58" stroke={t.titleColor} strokeWidth="0.5" transform={`rotate(${i*22.5} 30 30)`}/>
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 sm:px-10 py-12 text-center gap-3">
        <div className="text-3xl animate-bounce-gentle">{t.emoji.split('')[0]}</div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-1 opacity-60" style={{ color: t.accentColor }}>
            🌸 Shubh Deepavali 🌸
          </p>
          <h2
            className="font-bold text-xl sm:text-3xl leading-tight"
            style={{ color: t.titleColor, fontFamily: card.font.family, textShadow: `0 0 20px ${t.titleColor}44` }}
          >
            Dear {card.recipientName || 'Friend'}
          </h2>
        </div>

        <p
          className="text-sm sm:text-base leading-relaxed max-w-sm"
          style={{ color: t.textColor, fontFamily: card.font.family, opacity: 0.9 }}
        >
          {card.message}
        </p>

        <div
          className="text-xs font-semibold tracking-wider uppercase mt-2 px-4 py-1 rounded-full"
          style={{ background: `${card.accentColor.accent}22`, color: card.accentColor.accent, border: `1px solid ${card.accentColor.accent}44` }}
        >
          Happy Diwali 2026 ✨
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2 text-lg opacity-40">
        <span>🎆</span><span>🪔</span><span>🌸</span><span>🪔</span><span>🎆</span>
      </div>

      {/* Rangoli bottom corners */}
      <div className="absolute bottom-2 left-2 w-12 h-12 opacity-10" style={{transform:'rotate(180deg)'}}>
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="none" stroke={t.accentColor} strokeWidth="1"/>
          {Array.from({length:6}).map((_,i)=>(
            <ellipse key={i} cx="30" cy="10" rx="5" ry="10" fill={t.accentColor} transform={`rotate(${i*60} 30 30)`}/>
          ))}
        </svg>
      </div>
    </div>
  )
}

export default function CardCreator() {
  const [card, setCard] = useState(DEFAULT_CARD)
  const [activeTab, setActiveTab] = useState('template')
  const [downloading, setDownloading] = useState(false)
  const previewRef = useRef(null)

  const update = (key, value) => setCard(c => ({ ...c, [key]: value }))

  const handleDownload = async () => {
    if (!previewRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#1A0D45',
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'diwali-greeting-card.png'
      a.click()
      toast.success('Card downloaded! 🎆')
    } catch {
      toast.error('Download failed — please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = () => {
    const text = `🪔 Happy Diwali, ${card.recipientName}! 🎆\n\n${card.message}\n\nCreated with DiwaliWish ✨`
    shareOnWhatsApp(text)
  }

  const tabs = [
    { id: 'template', label: 'Templates', icon: Palette },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'colors', label: 'Colors', icon: MessageSquare },
    { id: 'font', label: 'Font', icon: Type },
  ]

  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="text-5xl mb-4">🎨</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-gradient-gold mb-3">
            Greeting Card Creator
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Design a beautiful Diwali greeting card with festive templates, custom messages, and stunning visuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Editor */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {/* Tabs */}
            <div className="flex gap-1 glass rounded-2xl p-1 mb-6">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? 'btn-gold'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Panel content */}
            <div className="glass rounded-2xl p-5 min-h-[320px]">
              {/* Template Selection */}
              {activeTab === 'template' && (
                <div className="space-y-3">
                  <h3 className="text-diwali-gold font-semibold text-sm uppercase tracking-wider mb-4">Choose Template</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {cardTemplates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => update('template', t)}
                        className={`relative p-4 rounded-xl transition-all ${
                          card.template.id === t.id
                            ? 'ring-2 ring-diwali-gold shadow-gold'
                            : 'glass border border-white/10 hover:border-diwali-gold/30'
                        }`}
                        style={{ background: t.bg }}
                      >
                        <div className="text-2xl mb-1">{t.preview}</div>
                        <div className="text-xs font-medium" style={{ color: t.titleColor }}>{t.name}</div>
                        {card.template.id === t.id && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-diwali-gold rounded-full flex items-center justify-center">
                            <span className="text-xs text-diwali-blue font-bold">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Editing */}
              {activeTab === 'text' && (
                <div className="space-y-4">
                  <h3 className="text-diwali-gold font-semibold text-sm uppercase tracking-wider mb-4">Edit Text</h3>
                  <div>
                    <label className="block text-xs text-white/60 mb-2">Recipient Name</label>
                    <input
                      type="text"
                      value={card.recipientName}
                      onChange={e => update('recipientName', e.target.value)}
                      placeholder="e.g. Priya, Mom, Team..."
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-diwali-gold/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-2">Message</label>
                    <textarea
                      value={card.message}
                      onChange={e => update('message', e.target.value)}
                      rows={6}
                      placeholder="Write your Diwali message..."
                      className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-diwali-gold/50 text-sm resize-none"
                    />
                    <div className="text-xs text-white/30 mt-1">{card.message.length} characters</div>
                  </div>
                  <button
                    onClick={() => update('message', DEFAULT_CARD.message)}
                    className="text-xs text-diwali-gold/60 hover:text-diwali-gold flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw size={10} /> Reset to default
                  </button>
                </div>
              )}

              {/* Color Scheme */}
              {activeTab === 'colors' && (
                <div>
                  <h3 className="text-diwali-gold font-semibold text-sm uppercase tracking-wider mb-4">Accent Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {colorSchemes.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => update('accentColor', c)}
                        title={c.id}
                        className={`w-10 h-10 rounded-full transition-all ${
                          card.accentColor.id === c.id ? 'ring-2 ring-white scale-110 shadow-lg' : 'hover:scale-105'
                        }`}
                        style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.secondary})` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Font Selection */}
              {activeTab === 'font' && (
                <div>
                  <h3 className="text-diwali-gold font-semibold text-sm uppercase tracking-wider mb-4">Choose Font</h3>
                  <div className="space-y-2">
                    {fontOptions.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => update('font', f)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                          card.font.id === f.id
                            ? 'glass-gold text-diwali-gold border border-diwali-gold/40'
                            : 'glass border border-white/10 text-white/70 hover:border-diwali-gold/20'
                        }`}
                        style={{ fontFamily: f.family }}
                      >
                        <span className="text-sm font-medium">{f.name}</span>
                        <span className="ml-3 text-xs opacity-50">Happy Diwali 🪔</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-gold font-semibold text-sm"
              >
                <Download size={16} />
                {downloading ? 'Saving...' : 'Download PNG'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 font-semibold text-sm hover:bg-green-600/40 transition-all"
              >
                <Share2 size={16} />
                WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Right — Preview */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="sticky top-24">
              <h3 className="text-diwali-gold/80 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🖼️</span> Live Preview
              </h3>
              <CardPreview card={card} previewRef={previewRef} />
              <p className="text-center text-white/30 text-xs mt-3">
                Changes reflect in real-time · High-quality PNG export
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
