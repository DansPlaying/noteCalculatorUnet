import { ref, computed } from 'vue'
import { translations, type Locale } from './translations'

const STORAGE_KEY = 'app-locale'

// Get initial locale from localStorage or default to Spanish
const getInitialLocale = (): Locale => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') {
      return stored
    }
  }
  return 'es'
}

// Global reactive locale state
const currentLocale = ref<Locale>(getInitialLocale())

export function useI18n() {
  const locale = computed(() => currentLocale.value)

  const t = computed(() => translations[currentLocale.value])

  const setLocale = (newLocale: Locale) => {
    currentLocale.value = newLocale
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale)
    }
  }

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'es' ? 'en' : 'es')
  }

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
  }
}
