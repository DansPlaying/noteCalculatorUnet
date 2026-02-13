import { ref, watch } from 'vue'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'

const isDark = ref(false)

export function useTheme() {
  const initTheme = () => {
    isDark.value = localStorage.getItem('theme') === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
    updateStatusBar()
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    updateStatusBar()
  }

  const updateStatusBar = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await StatusBar.setStyle({
          style: isDark.value ? Style.Dark : Style.Light,
        })
        // Set background color to match app theme
        await StatusBar.setBackgroundColor({
          color: isDark.value ? '#020617' : '#f8fafc',
        })
      } catch (error) {
        console.warn('StatusBar not available:', error)
      }
    }
  }

  return {
    isDark,
    initTheme,
    toggleTheme,
  }
}
