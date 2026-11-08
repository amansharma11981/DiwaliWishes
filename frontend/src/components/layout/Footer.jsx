import { Link } from 'react-router-dom'
import { Heart, Globe, Share2, MessageCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative mt-20 border-t border-diwali-gold/10">
      <div className="glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl animate-flicker">🪔</span>
                <span className="font-display text-xl font-bold text-gradient-gold">DiwaliWish</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {t('footer.tagline')}
              </p>
              <p className="text-diwali-gold/80 text-sm font-hindi">
                {t('footer.mantra')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-diwali-gold font-semibold mb-4 text-sm uppercase tracking-wider">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-2">
                {[
                  { to: '/', label: `🏠 ${t('nav.home')}` },
                  { to: '/generate', label: `✨ ${t('nav.aiWishes')}` },
                  { to: '/card-creator', label: `🎨 ${t('nav.cardCreator')}` },
                  { to: '/gallery', label: `🖼️ ${t('nav.gallery')}` },
                  { to: '/experience', label: `🪔 ${t('nav.experience')}` },
                  { to: '/about', label: `📖 ${t('nav.about')}` },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-white/60 hover:text-diwali-gold text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-diwali-gold font-semibold mb-4 text-sm uppercase tracking-wider">
                {t('footer.features')}
              </h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>🤖 {t('home.feature1Title')}</li>
                <li>🎨 {t('home.feature2Title')}</li>
                <li>📱 {t('home.feature5Title')}</li>
                <li>💾 {t('generator.download')}</li>
                <li>🌐 {t('home.statLanguages')}</li>
                <li>🪔 {t('home.feature4Title')}</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-diwali-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © 2026 DiwaliWish. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/30">{t('footer.shareTheLight')}</span>
              {[
                { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/?text=Celebrate%20Diwali%20with%20DiwaliWish!%20%F0%9F%AA%94' },
                { icon: Share2, label: 'Share', href: 'https://twitter.com/intent/tweet?text=Happy%20Diwali%20from%20DiwaliWish%20%F0%9F%AA%94%E2%9C%A8' },
                { icon: Globe, label: 'Community', href: 'https://diwaliwish.org' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg glass text-white/50 hover:text-diwali-gold transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diwali row decoration */}
      <div className="text-center py-2 text-lg select-none">
        {'🪔 '.repeat(20)}
      </div>
    </footer>
  )
}
