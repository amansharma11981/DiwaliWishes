import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, Copy, Share2, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import { galleryWishes, categories } from '../data/wishes'
import { copyToClipboard, shareOnWhatsApp } from '../utils/helpers'

const TONE_FILTERS = ['all', 'emotional', 'funny', 'romantic', 'professional', 'traditional']
const LANG_FILTERS = ['all', 'english', 'hindi', 'hinglish']

function WishCard({ wish, isFavorite, onFavorite }) {
  const categoryInfo = categories.find(c => c.id === wish.category)

  const handleCopy = async () => {
    await copyToClipboard(wish.text)
    toast.success('Copied to clipboard! 🪔')
  }

  const handleShare = () => {
    shareOnWhatsApp(`🪔 Happy Diwali! 🎆\n\n${wish.text}\n\n— Shared from DiwaliWish ✨`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="diwali-card p-5 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryInfo?.emoji || '🪔'}</span>
          <div>
            <span className="text-xs font-semibold text-diwali-gold/70 capitalize">{wish.category}</span>
            <span className="mx-1.5 text-white/20">·</span>
            <span className="text-xs text-white/40 capitalize">{wish.tone}</span>
            {wish.language !== 'english' && (
              <>
                <span className="mx-1.5 text-white/20">·</span>
                <span className="text-xs text-diwali-saffron/70 capitalize">{wish.language}</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => onFavorite(wish.id)}
          className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
            isFavorite
              ? 'text-red-400 bg-red-400/10 scale-110'
              : 'text-white/30 hover:text-red-400 hover:bg-red-400/10'
          }`}
          aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
        >
          <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Wish text */}
      <p className="text-white/85 text-sm leading-relaxed flex-1 font-hindi">{wish.text}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-diwali-gold/10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-gold text-diwali-gold text-xs font-medium hover:shadow-gold transition-all"
        >
          <Copy size={11} /> Copy
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-600/15 border border-green-500/25 text-green-400 text-xs font-medium hover:bg-green-600/30 transition-all"
        >
          <Share2 size={11} /> WhatsApp
        </button>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTone, setSelectedTone] = useState('all')
  const [selectedLang, setSelectedLang] = useState('all')
  const [favorites, setFavorites] = useState(new Set())
  const [showFavsOnly, setShowFavsOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        toast('Removed from favorites', { icon: '💔' })
      } else {
        next.add(id)
        toast.success('Added to favorites! ❤️')
      }
      return next
    })
  }

  const filtered = useMemo(() => {
    return galleryWishes.filter(w => {
      if (showFavsOnly && !favorites.has(w.id)) return false
      if (selectedCategory !== 'all' && w.category !== selectedCategory) return false
      if (selectedTone !== 'all' && w.tone !== selectedTone) return false
      if (selectedLang !== 'all' && w.language !== selectedLang) return false
      if (search) {
        const q = search.toLowerCase()
        return w.text.toLowerCase().includes(q) || w.category.includes(q) || w.tone.includes(q)
      }
      return true
    })
  }, [search, selectedCategory, selectedTone, selectedLang, favorites, showFavsOnly])

  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="text-5xl mb-4">🖼️</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-gradient-gold mb-3">
            Wishes Gallery
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Browse our curated collection of Diwali wishes — copy, share, or save your favorites.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="glass rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search wishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-diwali-gold/50 text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(f => !f)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${showFilters ? 'btn-gold' : 'btn-glass'}`}
            >
              <Filter size={14} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={() => setShowFavsOnly(f => !f)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${showFavsOnly ? 'bg-red-500/20 border border-red-400/40 text-red-400' : 'glass border border-white/10 text-white/60'}`}
            >
              <Heart size={14} fill={showFavsOnly ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">{favorites.size}</span>
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-2 border-t border-diwali-gold/10"
              >
                {/* Category */}
                <div>
                  <span className="text-xs text-diwali-gold/60 uppercase tracking-wider mr-3">Category:</span>
                  <div className="inline-flex flex-wrap gap-2 mt-1">
                    {[{ id: 'all', label: '🌟 All', emoji: '' }, ...categories].map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedCategory === c.id ? 'btn-gold' : 'glass border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {c.emoji && <span className="mr-1">{c.emoji}</span>}
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone */}
                <div>
                  <span className="text-xs text-diwali-gold/60 uppercase tracking-wider mr-3">Tone:</span>
                  <div className="inline-flex flex-wrap gap-2 mt-1">
                    {TONE_FILTERS.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTone(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                          selectedTone === t ? 'btn-gold' : 'glass border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {t === 'all' ? '🌟 All' : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <span className="text-xs text-diwali-gold/60 uppercase tracking-wider mr-3">Language:</span>
                  <div className="inline-flex flex-wrap gap-2 mt-1">
                    {LANG_FILTERS.map(l => (
                      <button
                        key={l}
                        onClick={() => setSelectedLang(l)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                          selectedLang === l ? 'btn-gold' : 'glass border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {l === 'all' ? '🌐 All' : l}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result count */}
        <div className="text-white/40 text-sm mb-6 flex items-center gap-2">
          <span className="text-diwali-gold font-semibold text-base">{filtered.length}</span>
          wishes found
          {favorites.size > 0 && (
            <span className="text-xs bg-red-500/10 border border-red-400/20 text-red-400 px-2 py-0.5 rounded-full ml-2">
              ❤️ {favorites.size} saved
            </span>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((wish) => (
                <WishCard
                  key={wish.id}
                  wish={wish}
                  isFavorite={favorites.has(wish.id)}
                  onFavorite={toggleFavorite}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-white/40"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg font-medium">No wishes found</p>
              <p className="text-sm mt-2">Try adjusting your filters or search term</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('all'); setSelectedTone('all'); setSelectedLang('all'); setShowFavsOnly(false) }}
                className="mt-4 px-6 py-2 rounded-xl btn-glass text-sm font-medium"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
