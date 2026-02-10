<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="mx-auto w-full max-w-6xl px-4 pt-6 sm:pt-10" role="banner">
    <div
      class="flex flex-col gap-4 sm:gap-6 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl px-4 py-4 sm:px-6 sm:py-6 shadow-lg"
    >
      <div class="flex gap-4 sm:items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-md"
          >
            <font-awesome-icon icon="calculator" class="text-base" />
          </div>
          <div>
            <h1 class="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 m-0!">
              UNET
            </h1>
            <p class="font-display text-lg font-semibold text-slate-900 dark:text-white m-0!">
              Calculadora de Notas
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end gap-3">
          <ThemeToggle />
        </div>
      </div>

      <nav aria-label="Main navigation" class="flex flex-wrap items-center gap-4 sm:gap-8">
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-200 hover:text-slate-900 dark:hover:text-white"
          exact-active-class="!text-slate-900 dark:!text-white font-semibold"
        >
          <font-awesome-icon icon="calculator" class="text-sm" />
          <span>Calculadora</span>
        </RouterLink>

        <RouterLink
          to="/about"
          class="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-200 hover:text-slate-900 dark:hover:text-white"
          exact-active-class="!text-slate-900 dark:!text-white font-semibold"
        >
          <font-awesome-icon icon="info-circle" class="text-sm" />
          <span>Sobre el App</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
