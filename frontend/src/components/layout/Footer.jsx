import { Link } from 'react-router-dom'
import { Heart, Globe, Share2, MessageCircle } from 'lucide-react'

export default function Footer() {
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
                Celebrate the Festival of Lights with AI-powered wishes, beautiful greeting cards,
                and immersive festive experiences. Spread joy and light this Diwali!
              </p>
              <p className="text-diwali-gold/80 text-sm font-hindi">
                दीपों का यह पर्व जीवन में उजाला लाए 🪔
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-diwali-gold font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { to: '/', label: '🏠 Home' },
                  { to: '/generate', label: '✨ AI Wishes' },
                  { to: '/card-creator', label: '🎨 Card Creator' },
                  { to: '/gallery', label: '🖼️ Gallery' },
                  { to: '/experience', label: '🪔 Festival Experience' },
                  { to: '/about', label: '📖 About Diwali' },
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
              <h3 className="text-diwali-gold font-semibold mb-4 text-sm uppercase tracking-wider">Features</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>🤖 AI Wish Generation</li>
                <li>🎨 Greeting Card Editor</li>
                <li>📱 WhatsApp Sharing</li>
                <li>💾 Download Cards</li>
                <li>🌐 Multilingual Support</li>
                <li>🪔 Interactive Diya</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-diwali-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © 2026 DiwaliWish. Made with{' '}
              <Heart size={12} className="inline text-red-400 fill-red-400" />{' '}
              for the Festival of Lights.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/30">Connect & share:</span>
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
