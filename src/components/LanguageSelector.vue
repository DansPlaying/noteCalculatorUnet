<script setup lang="ts">
import { useI18n } from '@/i18n'

const { locale, setLocale } = useI18n()
</script>

<template>
  <div class="flex items-center rounded-full bg-slate-100/80 dark:bg-slate-800/80 p-1">
    <button
      @click="setLocale('es')"
      class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
      :class="
        locale === 'es'
          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
      "
      :aria-pressed="locale === 'es'"
    >
      ES
    </button>
    <button
      @click="setLocale('en')"
      class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
      :class="
        locale === 'en'
          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
      "
      :aria-pressed="locale === 'en'"
    >
      EN
    </button>
  </div>
</template>
