import { motion } from 'framer-motion'
import { Sparkles, Calendar, BookOpen, Heart, Flame, Shield, Sun, Moon } from 'lucide-react'
import { Link } from 'react-router-dom'

const FIVE_DAYS = [
  {
    day: 'Day 1',
    name: 'Dhanteras',
    subtitle: 'Festival of Wealth & Prosperity',
    date: 'Trayodashi of Kartik Krishna Paksha',
    emoji: '🪙',
    color: 'from-amber-500/20 to-yellow-600/20',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    description:
      'Dhanteras marks the official beginning of Diwali festivities. Devotees worship Lord Dhanvantari (the physician of the Gods) for health and longevity, and Goddess Lakshmi for prosperity. It is traditionally considered auspicious to purchase precious metals, utensils, or new assets on this day.',
    rituals: ['Purchasing gold, silver, brass or copper utensils', 'Lighting the Yamadeep to ward off untimely demise', 'Evening puja of Goddess Lakshmi and Lord Kuber'],
  },
  {
    day: 'Day 2',
    name: 'Naraka Chaturdashi / Chhoti Diwali',
    subtitle: 'The Triumph Over Inner Darkness',
    date: 'Chaturdashi of Kartik Krishna Paksha',
    emoji: '⚔️',
    color: 'from-orange-500/20 to-red-600/20',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    description:
      'Commemorates Lord Krishna and Queen Satyabhama slaying the tyrant demon Narakasura, releasing sixteen thousand captives. It signifies the cleansing of internal negativity, fear, and sluggishness, welcoming spiritual renewal and vitality.',
    rituals: ['Abhyanga Snan (holy fragrant herbal oil bath before sunrise)', 'Lighting 14 earthen diyas around the house', 'Preparing delicacies and festive snacks (Faral)'],
  },
  {
    day: 'Day 3',
    name: 'Lakshmi Puja / Main Diwali',
    subtitle: 'The Splendorous Night of Lights',
    date: 'Amavasya (New Moon) of Kartik Month',
    emoji: '🪔',
    color: 'from-yellow-500/20 to-amber-700/20',
    borderColor: 'border-diwali-gold/40',
    iconColor: 'text-diwali-gold',
    description:
      'The crown night of Diwali. Houses are illuminated with rows of clay diyas to welcome Goddess Lakshmi, the deity of spiritual and material abundance, and Lord Ganesha, the remover of obstacles. It also marks the jubilant return of Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years in exile.',
    rituals: ['Elaborate Lakshmi-Ganesha Puja with lotus flowers and batashas', 'Illuminating every doorway, balcony, and courtyard with ghee/mustard diyas', 'Sharing sweets, dry fruits, and gifts with neighbors and loved ones'],
  },
  {
    day: 'Day 4',
    name: 'Govardhan Puja / Annakut',
    subtitle: 'Gratitude to Mother Nature & Sustenance',
    date: 'Pratipada of Kartik Shukla Paksha',
    emoji: '🌾',
    color: 'from-emerald-500/20 to-teal-700/20',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    description:
      'Celebrates Lord Krishna lifting Mount Govardhan on his little finger to shield the villagers and cattle of Vrindavan from torrential storms. It represents humanity’s ecological gratitude and harmony with nature. In Gujarat, this day begins the Gujarati New Year (Bestu Varas).',
    rituals: ['Building miniature Govardhan hillocks with cow dung and flowers', 'Annakut: Offering an elaborate feast of 56 gastronomic varieties (Chhappan Bhog)', 'Worshiping cattle, agriculture, and working tools'],
  },
  {
    day: 'Day 5',
    name: 'Bhai Dooj / Bhau Beej',
    subtitle: 'The Sacred Bond of Siblings',
    date: 'Dwitiya of Kartik Shukla Paksha',
    emoji: '🌸',
    color: 'from-pink-500/20 to-purple-600/20',
    borderColor: 'border-pink-500/30',
    iconColor: 'text-pink-400',
    description:
      'Celebrates the protective, loving bond between brothers and sisters. Legend tells of Yamraj (God of Death) visiting his sister Yamuna, who welcomed him with tilak and sumptuous food; touched by her love, Yamraj declared that any brother receiving tilak on this day would be protected from adversity.',
    rituals: ['Sisters applying vermilion and rice tilak on brothers’ foreheads', 'Aarti and prayers for longevity, success, and well-being', 'Exchange of heartfelt vows, gifts, and special sweets like basundi or pedas'],
  },
]

const SIGNIFICANCE = [
  {
    icon: Flame,
    title: 'Victory of Light Over Darkness',
    desc: 'The humble earthen diya proves that even the smallest spark of goodness, truth (Satya), and virtue can instantly banish the thickest shadows of ignorance and sorrow.',
  },
  {
    icon: Shield,
    title: 'Good Over Evil (Dharma)',
    desc: 'Honoring Lord Rama’s return after conquering Ravana, and Lord Krishna vanquishing Narakasura. It is a timeless affirmation that righteous courage always overcomes tyranny.',
  },
  {
    icon: Heart,
    title: 'Togetherness and Forgiveness',
    desc: 'Diwali dissolves grudges. Families reunite across continents, neighbors bridge gaps with boxes of mithai, and communities gather with unconditional warmth and hospitality.',
  },
  {
    icon: Sun,
    title: 'Spiritual Rebirth & Cleanliness',
    desc: 'Cleaning homes symbolizes purging internal clutter—greed, anger, and ego. It prepares the altar of our mind and heart for fresh wisdom and peaceful aspirations.',
  },
]

export default function AboutDiwali() {
  return (
    <div className="page-enter min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-diwali-gold text-sm font-semibold mb-2">
            <Sparkles size={14} />
            Heritage & Traditions
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-gradient-gold">
            The Story & Spirit of Diwali
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Deepavali, translating to <span className="text-diwali-gold font-semibold italic">"a row of clay lamps"</span>,
            is one of humanity's oldest and most luminous celebrations. Explore its timeless mythology, five sacred days, and cultural legacy.
          </p>
        </motion.div>

        {/* Why Diwali is Celebrated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 select-none pointer-events-none">
            🪔
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📖</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-diwali-gold">
              Why We Celebrate Diwali
            </h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed text-base sm:text-lg">
            <p>
              According to the epic <em className="text-diwali-gold">Ramayana</em>, Lord Rama, alongside his consort Sita and loyal brother Lakshmana, returned to their kingdom of Ayodhya on the moonless night of <em>Kartik Amavasya</em> after 14 years of forest exile and the decisive defeat of the demon king Ravana.
            </p>
            <p>
              The overjoyed residents of Ayodhya turned the pitch-black night into a dazzling constellation of gold by lining every terrace, pathway, riverbank, and doorstep with millions of pure ghee-lit clay lamps (diyas).
            </p>
            <p>
              Simultaneously, Diwali honors the divine manifestation of <strong className="text-diwali-gold">Goddess Lakshmi</strong> during the primordial churning of the cosmic ocean (<em>Samudra Manthan</em>), selecting Lord Vishnu as her consort to bestow grace, righteousness, and boundless auspiciousness onto the cosmos.
            </p>
          </div>
        </motion.div>

        {/* Core Cultural Significance Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-gradient-gold mb-2">
              Philosophical & Cultural Significance
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm">
              Beyond firecrackers and confections lies a profound meditation on the human journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SIGNIFICANCE.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="diwali-card p-6 rounded-2xl flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl glass-gold flex items-center justify-center flex-shrink-0 text-diwali-gold">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-diwali-gold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* The Five Days of Diwali */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-diwali-gold/10 text-diwali-gold text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar size={13} />
              The Festive Calendar
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold">
              The Five Sacred Days of Diwali
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm mt-2">
              Each day of the festival carries its own sacred narrative, rituals, and festive flavor.
            </p>
          </div>

          <div className="space-y-6">
            {FIVE_DAYS.map((day, idx) => (
              <motion.div
                key={day.name}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`glass border ${day.borderColor} rounded-2xl p-6 sm:p-8 bg-gradient-to-r ${day.color} relative overflow-hidden`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-black/30 border border-white/10">
                      {day.emoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-widest text-diwali-gold uppercase">
                          {day.day}
                        </span>
                        <span className="text-white/40 text-xs">•</span>
                        <span className="text-xs text-white/50">{day.date}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {day.name}
                      </h3>
                      <p className={`text-sm font-medium ${day.iconColor}`}>
                        {day.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
                  {day.description}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-diwali-gold/90 mb-2">
                    Key Observances & Traditions:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {day.rituals.map((r, rIdx) => (
                      <li
                        key={rIdx}
                        className="text-xs text-white/70 bg-black/25 rounded-lg px-3 py-2 border border-white/5 flex items-start gap-1.5"
                      >
                        <span className="text-diwali-gold mt-0.5">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Universal Message CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-dark border border-diwali-gold/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden"
        >
          <div className="text-5xl animate-bounce-gentle">🪷</div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-gradient-gold">
            "Tamaso Ma Jyotirgamaya"
          </h2>
          <p className="font-hindi text-xl text-diwali-gold/90">
            असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥
          </p>
          <p className="text-white/75 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            <em>"From ignorance, lead me to truth. From darkness, lead me to light. From mortality, lead me to the immortal nectar of wisdom and boundless love."</em>
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/generate"
              className="px-8 py-3.5 rounded-xl btn-gold font-bold text-sm shadow-gold"
            >
              ✨ Generate AI Wishes
            </Link>
            <Link
              to="/card-creator"
              className="px-8 py-3.5 rounded-xl btn-glass font-semibold text-sm"
            >
              🎨 Create a Greeting Card
            </Link>
            <Link
              to="/experience"
              className="px-8 py-3.5 rounded-xl glass border border-white/20 text-white hover:border-diwali-gold/40 text-sm font-semibold transition-all"
            >
              🪔 Light Diyas Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
