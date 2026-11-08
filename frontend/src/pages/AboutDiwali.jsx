import { motion } from 'framer-motion'
import { Sparkles, Calendar, Heart, Flame, Shield, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const FIVE_DAYS_EN = [
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
    rituals: ['Abhyanga Snan (fragrant herbal oil bath before sunrise)', 'Lighting 14 earthen diyas around the house', 'Preparing delicacies and festive snacks (Faral)'],
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
    rituals: ['Elaborate Lakshmi-Ganesha Puja with lotus flowers and sweets', 'Illuminating every doorway and courtyard with ghee diyas', 'Sharing sweets, dry fruits, and gifts with loved ones'],
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
    rituals: ['Building miniature Govardhan hillocks with flowers and devotion', 'Annakut: Offering an elaborate feast of 56 gastronomic varieties (Chhappan Bhog)', 'Worshiping cattle, agriculture, and working tools'],
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
    rituals: ['Sisters applying vermilion and rice tilak on brothers’ foreheads', 'Aarti and prayers for longevity, success, and well-being', 'Exchange of heartfelt vows, gifts, and special sweets'],
  },
]

const FIVE_DAYS_HI = [
  {
    day: 'दिवस १',
    name: 'धनतेरस / धनत्रयोदशी',
    subtitle: 'आरोग्य, धन और ऐश्वर्य का महापर्व',
    date: 'कार्तिक कृष्ण पक्ष त्रयोदशी',
    emoji: '🪙',
    color: 'from-amber-500/20 to-yellow-600/20',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    description:
      'धनतेरस दीपावली महापर्व का प्रथम दिन है। इस दिन समुद्र मंथन से अमृत कलश लेकर प्रकट हुए देवताओं के वैद्य भगवान धन्वंतरि और माता लक्ष्मी का पूजन किया जाता है। इस दिन नवीन बर्तन, स्वर्ण-रजत और उपयोगी वस्तुओं की खरीदारी अत्यंत मंगलकारी मानी जाती है।',
    rituals: ['सोना, चांदी या नए पीतल/तांबे के बर्तनों की खरीदारी', 'अकाल मृत्यु से रक्षा हेतु दक्षिण दिशा में यमदीप प्रज्वलित करना', 'माता लक्ष्मी, कुबेर देव और धन्वंतरि भगवान का सायंकालीन पूजन'],
  },
  {
    day: 'दिवस २',
    name: 'नरक चतुर्दशी / छोटी दीवाली',
    subtitle: 'आंतरिक अंधकार और भय पर विजय',
    date: 'कार्तिक कृष्ण पक्ष चतुर्दशी',
    emoji: '⚔️',
    color: 'from-orange-500/20 to-red-600/20',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    description:
      'भगवान श्रीकृष्ण और सत्यभामा द्वारा अत्याचारी नरकासुर का वध कर 16,000 बंदियों को मुक्त कराने का पावन स्मरण। यह दिन शरीर, मन और विचारों से आलस्य व नकारात्मकता को धोकर नई ऊर्जा के स्वागत का संदेश देता है।',
    rituals: ['सूर्योदय पूर्व उबटन और सुगंधित तेल से अभ्यंग स्नान', 'घर की चौखट और तुलसी पर 14 दीपक जलाना', 'पारंपरिक नमकीन व मिठाइयों (फराल) का आस्वाद'],
  },
  {
    day: 'दिवस ३',
    name: 'लक्ष्मी पूजन / मुख्य दीवाली',
    subtitle: 'दीपों की पावन जगमगाती निशा',
    date: 'कार्तिक कृष्ण पक्ष अमावस्या',
    emoji: '🪔',
    color: 'from-yellow-500/20 to-amber-700/20',
    borderColor: 'border-diwali-gold/40',
    iconColor: 'text-diwali-gold',
    description:
      'दीपावली का मुख्य और सर्वाधिक प्रकाशमान दिन। 14 वर्ष के वनवास और लंका पर विजय के पश्चात मर्यादा पुरुषोत्तम भगवान श्री राम, माता सीता और लक्ष्मण जी के अयोध्या आगमन पर अयोध्यावासियों ने घी के दीप जलाकर अमावस्या को पूर्णिमा जैसा प्रकाशित कर दिया था। इस रात्रि सुख-समृद्धि की देवी माता लक्ष्मी और विघ्नहर्ता गणेश जी की विशेष अर्चना की जाती है।',
    rituals: ['कमल पुष्प, खील-बताशे से श्री लक्ष्मी-गणेश महापूजन', 'घर, आंगन, छत और कार्यस्थल पर मिट्टी के दीपों की कतारें सजाना', 'परस्पर मिठाइयां, उपहार बांटना और बड़ों का चरण-स्पर्श कर आशीर्वाद लेना'],
  },
  {
    day: 'दिवस ४',
    name: 'गोवर्धन पूजा / अन्नकूट',
    subtitle: 'प्रकृति, गौ-माता और अन्न के प्रति कृतज्ञता',
    date: 'कार्तिक शुक्ल पक्ष प्रतिपदा',
    emoji: '🌾',
    color: 'from-emerald-500/20 to-teal-700/20',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    description:
      'इंद्रदेव के मानमर्दन हेतु और ब्रजवासियों की रक्षा के लिए भगवान श्रीकृष्ण द्वारा कनिष्ठिका उंगली पर गोवर्धन पर्वत धारण करने की लीला का उत्सव। यह पर्व पर्यावरण, कृषि, गौ-वंश और प्रकृति संरक्षण के प्रति हमारी सनातन कृतज्ञता का प्रतीक है। गुजरात में इसे नूतन वर्ष (बेस्तू वरस) के रूप में मनाया जाता है।',
    rituals: ['गोवर्धन पर्वत का निर्माण कर पुष्पों से परिक्रमा पूजन', 'अन्नकूट महोत्सव: भगवान को 56 भोग अर्पित करना', 'गौमाता और कृषि उपकरणों की विशेष सेवा व पूजन'],
  },
  {
    day: 'दिवस ५',
    name: 'भाई दूज / यम द्वितीया',
    subtitle: 'भाई-बहन के असीम स्नेह और रक्षा का बंधन',
    date: 'कार्तिक शुक्ल पक्ष द्वितीया',
    emoji: '🌸',
    color: 'from-pink-500/20 to-purple-600/20',
    borderColor: 'border-pink-500/30',
    iconColor: 'text-pink-400',
    description:
      'भाई-बहन के पवित्र और निस्वार्थ प्रेम का पर्व। पौराणिक मान्यतानुसार इस दिन यमराज अपनी बहन यमुना के घर गए थे, जहाँ यमुना ने उनका सत्कार कर तिलक लगाया। यमराज ने वरदान दिया कि जो भाई आज के दिन बहन के हाथों से बना भोजन ग्रहण कर तिलक कराएगा, उसे अकाल मृत्यु का भय नहीं रहेगा।',
    rituals: ['बहन द्वारा भाई के माथे पर कुमकुम-अक्षत का मंगल तिलक', 'भाई की लंबी उम्र, स्वास्थ्य और सफलता के लिए आरती व प्रार्थना', 'उपहार और मिष्ठान्न का स्नेहपूर्ण आदान-प्रदान'],
  },
]

const SIGNIFICANCE_EN = [
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

const SIGNIFICANCE_HI = [
  {
    icon: Flame,
    title: 'अंधकार पर प्रकाश की विजय',
    desc: 'एक छोटा सा मिट्टी का दीया सिद्ध करता है कि अच्छाई और सत्य की एक छोटी सी लौ भी अज्ञान और निराशा के घने अंधकार को पल भर में दूर कर सकती है।',
  },
  {
    icon: Shield,
    title: 'अधर्म पर धर्म की जय',
    desc: 'लंकापति रावण पर श्री राम की विजय और नरकासुर पर श्री कृष्ण का विजयोत्सव। यह सनातन विश्वास है कि सत्य और धर्म के मार्ग पर चलने वालों की पराजय कभी नहीं होती।',
  },
  {
    icon: Heart,
    title: 'प्रेम, सद्भाव और क्षमाशीलता',
    desc: 'दीपावली मनमुटाव भुलाने का पावन अवसर है। दूर देशों से परिवार एक होते हैं, मिठाइयों के साथ गिले-शिकवे मिटाए जाते हैं और समाज में समरसता का संचार होता है।',
  },
  {
    icon: Sun,
    title: 'आत्मिक शुद्धि और नव-चेतना',
    desc: 'घर की सफाई मन के भीतर छिपे काम, क्रोध, लोभ और अहंकार को बुहारने का प्रतीक है, जिससे हृदय मंदिर में दिव्य ज्ञान और शांति की ज्योति जल सके।',
  },
]

export default function AboutDiwali() {
  const { isHindi, t } = useLanguage()
  const fiveDays = isHindi ? FIVE_DAYS_HI : FIVE_DAYS_EN
  const significance = isHindi ? SIGNIFICANCE_HI : SIGNIFICANCE_EN

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
            {t('about.badge')}
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-gradient-gold">
            {t('about.title')}
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
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
              {t('about.whyTitle')}
            </h2>
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed text-base sm:text-lg">
            {isHindi ? (
              <>
                <p>
                  महाकाव्य <em className="text-diwali-gold">श्री रामचरितमानस एवं वाल्मीकि रामायण</em> के अनुसार, 14 वर्षों के वनवास और लंकापति रावण पर धर्म की विजय के पश्चात प्रभु श्री राम, माता जानकी और लक्ष्मण जी का कार्तिक अमावस्या की निशा को अपनी जन्मभूमि अयोध्या आगमन हुआ था।
                </p>
                <p>
                  अपने प्राणप्रिय राजा के स्वागत में संपूर्ण अयोध्या नगरी ने अमावस की घोर काली रात को लाखों स्वर्णमयी घृत दीपकों (दीयों) की मालाओं से सजाकर पूर्णिमा से भी अधिक प्रकाशमान कर दिया था।
                </p>
                <p>
                  इसके साथ ही, इसी दिन क्षीरसागर के दिव्य <strong className="text-diwali-gold">समुद्र मंथन</strong> से ऐश्वर्य, सौभाग्य और पवित्रता की अधिष्ठात्री देवी माँ महालक्ष्मी का प्राकट्य हुआ था, जिन्होंने श्रीहरि विष्णु को वरमाला पहनाकर सृष्टि को सुख और समृद्धि का आशीर्वाद दिया।
                </p>
              </>
            ) : (
              <>
                <p>
                  According to the epic <em className="text-diwali-gold">Ramayana</em>, Lord Rama, alongside his consort Sita and loyal brother Lakshmana, returned to their kingdom of Ayodhya on the moonless night of <em>Kartik Amavasya</em> after 14 years of forest exile and the decisive defeat of the demon king Ravana.
                </p>
                <p>
                  The overjoyed residents of Ayodhya turned the pitch-black night into a dazzling constellation of gold by lining every terrace, pathway, riverbank, and doorstep with millions of pure ghee-lit clay lamps (diyas).
                </p>
                <p>
                  Simultaneously, Diwali honors the divine manifestation of <strong className="text-diwali-gold">Goddess Lakshmi</strong> during the primordial churning of the cosmic ocean (<em>Samudra Manthan</em>), selecting Lord Vishnu as her consort to bestow grace, righteousness, and boundless auspiciousness onto the cosmos.
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Core Cultural Significance Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-gradient-gold mb-2">
              {t('about.significanceTitle')}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm">
              {t('about.significanceSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {significance.map((item, idx) => {
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
              {t('about.calendarBadge')}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold">
              {t('about.fiveDaysTitle')}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm mt-2">
              {t('about.fiveDaysSub')}
            </p>
          </div>

          <div className="space-y-6">
            {fiveDays.map((day, idx) => (
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
                    {isHindi ? 'प्रमुख परंपराएं व पूजन विधि:' : 'Key Observances & Traditions:'}
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
            <em>
              {isHindi
                ? 'हे प्रभु, हमें असत्य से सत्य की ओर ले चलो। हमें अंधकार से प्रकाश की ओर ले चलो। हमें मृत्यु से अमरता और दिव्य ज्ञान की ओर ले चलो।'
                : '"From ignorance, lead me to truth. From darkness, lead me to light. From mortality, lead me to the immortal nectar of wisdom and boundless love."'}
            </em>
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/generate"
              className="px-8 py-3.5 rounded-xl btn-gold font-bold text-sm shadow-gold"
            >
              ✨ {t('about.btnAI')}
            </Link>
            <Link
              to="/card-creator"
              className="px-8 py-3.5 rounded-xl btn-glass font-semibold text-sm"
            >
              🎨 {t('about.btnCard')}
            </Link>
            <Link
              to="/experience"
              className="px-8 py-3.5 rounded-xl glass border border-white/20 text-white hover:border-diwali-gold/40 text-sm font-semibold transition-all"
            >
              🪔 {t('about.btnExp')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
