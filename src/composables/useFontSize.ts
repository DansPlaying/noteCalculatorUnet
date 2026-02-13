import { ref, computed, watchEffect } from 'vue'
import { useI18n } from '@/i18n'

export type FontSize = 'small' | 'medium' | 'large'

const STORAGE_KEY = 'app-font-size'

// Font size multipliers
const FONT_SIZE_VALUES: Record<FontSize, number> = {
  small: 14,
  medium: 16,
  large: 18,
}

// Get initial font size from localStorage or default to medium
const getInitialFontSize = (): FontSize => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'small' || stored === 'medium' || stored === 'large') {
      return stored
    }
  }
  return 'medium'
}

// Global reactive font size state
const currentFontSize = ref<FontSize>(getInitialFontSize())

// Apply font size to document
const applyFontSize = (size: FontSize) => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--app-font-size', `${FONT_SIZE_VALUES[size]}px`)
    document.documentElement.setAttribute('data-font-size', size)
  }
}

// Initialize on first load
if (typeof window !== 'undefined') {
  applyFontSize(currentFontSize.value)
}

export function useFontSize() {
  const { t } = useI18n()

  const fontSize = computed(() => currentFontSize.value)

  const setFontSize = (newSize: FontSize) => {
    currentFontSize.value = newSize
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newSize)
    }
    applyFontSize(newSize)
  }

  const fontSizeLabel = (size: FontSize): string => {
    const labels = {
      small: t.value.settings?.fontSizeSmall || 'Small',
      medium: t.value.settings?.fontSizeMedium || 'Medium',
      large: t.value.settings?.fontSizeLarge || 'Large',
    }
    return labels[size]
  }

  // Watch for changes and apply
  watchEffect(() => {
    applyFontSize(currentFontSize.value)
  })

  return {
    fontSize,
    setFontSize,
    fontSizeLabel,
    FONT_SIZE_VALUES,
  }
}
