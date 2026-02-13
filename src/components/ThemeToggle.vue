<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '@/i18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { isDark, initTheme, toggleTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <button
    @click="toggleTheme"
    id="theme-toggle"
    class="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-slate-800/70 border border-white/70 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50"
    :aria-label="isDark ? t.theme.switchToLight : t.theme.switchToDark"
  >
    <span class="hidden sm:inline">{{ isDark ? t.theme.light : t.theme.dark }}</span>
    <font-awesome-icon
      :icon="isDark ? 'sun' : 'moon'"
      class="text-lg transition-transform duration-300 group-hover:rotate-12"
    />
  </button>
</template>
