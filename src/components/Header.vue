<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
import LanguageSelector from './LanguageSelector.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <header class="mx-auto w-full max-w-6xl px-4 pt-6 sm:pt-10" role="banner">
    <div
      class="flex flex-col gap-4 sm:gap-6 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl px-4 py-4 sm:px-6 sm:py-6 shadow-lg"
    >
      <div class="flex gap-4 sm:items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" class="h-11 w-11 rounded-2xl shadow-md" />
          <div>
            <h1 class="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 m-0!">
              UNET
            </h1>
            <p class="font-display text-lg font-semibold text-slate-900 dark:text-white m-0!">
              {{ t.header.title }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>

      <nav aria-label="Main navigation" class="flex flex-wrap items-center gap-2 sm:gap-3">
        <RouterLink
          to="/"
          class="nav-link flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
          exact-active-class="!bg-blue-50 dark:!bg-blue-900/30 !text-blue-600 dark:!text-blue-400 !font-semibold"
        >
          <font-awesome-icon icon="calculator" class="text-sm" />
          <span>{{ t.header.calculator }}</span>
        </RouterLink>

        <RouterLink
          to="/about"
          class="nav-link flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
          exact-active-class="!bg-blue-50 dark:!bg-blue-900/30 !text-blue-600 dark:!text-blue-400 !font-semibold"
        >
          <font-awesome-icon icon="info-circle" class="text-sm" />
          <span>{{ t.header.about }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
