import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('diwali_ui_lang')
      return saved === 'hi' ? 'hi' : 'en'
    } catch {
      return 'en'
    }
  })

  const setLang = useCallback((newLang) => {
    const safeLang = newLang === 'hi' ? 'hi' : 'en'
    setLangState(safeLang)
    try {
      localStorage.setItem('diwali_ui_lang', safeLang)
    } catch {}
    document.documentElement.lang = safeLang
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'hi' : 'en')
  }, [lang, setLang])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Translation helper: t('nav.home') or t('home.heroTitle1')
  const t = useCallback((path, fallback = '') => {
    const keys = path.split('.')
    let current = translations[lang] || translations.en
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        // Fallback to English dictionary if key missing
        let enCurrent = translations.en
        for (const enKey of keys) {
          if (enCurrent && typeof enCurrent === 'object' && enKey in enCurrent) {
            enCurrent = enCurrent[enKey]
          } else {
            return fallback || path
          }
        }
        return enCurrent || fallback || path
      }
    }
    return current
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang,
    toggleLang,
    isHindi: lang === 'hi',
    t,
  }), [lang, setLang, toggleLang, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
