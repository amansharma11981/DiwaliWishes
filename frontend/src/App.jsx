import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import AIGenerator from './pages/AIGenerator'
import CardCreator from './pages/CardCreator'
import Gallery from './pages/Gallery'
import FestivalExperience from './pages/FestivalExperience'
import AboutDiwali from './pages/AboutDiwali'
import FireworksCanvas from './components/animations/FireworksCanvas'
import ParticleField from './components/animations/ParticleField'

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Global ambient effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <FireworksCanvas />
          <ParticleField />
          <div className="noise" />
        </div>

        {/* Main layout */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<AIGenerator />} />
              <Route path="/card-creator" element={<CardCreator />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/experience" element={<FestivalExperience />} />
              <Route path="/about" element={<AboutDiwali />} />
            </Routes>
          </main>
          <Footer />
        </div>

        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #2D1B69, #1A0D45)',
              border: '1px solid rgba(255,215,0,0.3)',
              color: 'white',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#FFD700', secondary: '#0A0A2E' },
            },
            error: {
              iconTheme: { primary: '#FF4500', secondary: '#fff' },
            },
          }}
        />
      </Router>
    </LanguageProvider>
  )
}
