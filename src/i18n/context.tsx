import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { idTranslations } from "./id"
import { enTranslations } from "./en"
import type { Language, Translations } from "./types"

interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = "obersai_docs_lang"

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "id"
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "id" || saved === "en") return saved
  } catch {
    // ponytail: ignore localstorage failures in sandboxed/iframe environments
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("id") ? "id" : "en"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
      document.documentElement.lang = lang
    } catch {
      // ponytail: ignore storage errors on private mode
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useMemo(() => (language === "en" ? enTranslations : idTranslations), [language])

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
