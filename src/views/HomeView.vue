<script setup lang="ts">
import ConverterStructure from '@/components/ConverterStructure.vue'
import PointsRequired from '@/components/PointsRequired.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 py-6 sm:py-10 md:py-12">
    <section class="grid gap-7 lg:grid-cols-[1.1fr,0.9fr] section-spacing">
      <div
        class="rounded-3xl border border-white/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl px-4 py-5 sm:px-6 sm:py-6"
      >
        <span
          class="inline-flex items-center gap-2 rounded-full bg-blue-100/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 px-3 py-1 text-xs font-semibold uppercase tracking-widest"
        >
          {{ t.home.badge }}
        </span>
        <h1
          class="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          {{ t.home.title }}
        </h1>
        <p
          class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed"
        >
          {{ t.home.subtitle }}
        </p>
      </div>
    </section>

    <section id="conversion-section" class="section-spacing scroll-mt-24">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <h2 class="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
          {{ t.home.instantConversion }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ t.home.instantConversionSubtitle }}
        </p>
      </div>

      <!-- Converters Card -->
      <div
        class="rounded-3xl border border-blue-100 dark:border-slate-700/70 bg-blue-50/50 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg p-4 sm:p-6 mb-8"
      >
        <div class="space-y-3">
          <div
            id="conversion-100"
            class="rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm p-3 sm:p-4 scroll-mt-28"
          >
            <ConverterStructure escalaOrigen="100" escalaDestino="9" />
          </div>
          <div class="h-4"></div>
          <div
            id="conversion-9"
            class="rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm p-3 sm:p-4 scroll-mt-28"
          >
            <ConverterStructure escalaOrigen="9" escalaDestino="100" />
          </div>
        </div>
      </div>
    </section>

    <section class="section-spacing">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-7">
        <h2 class="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
          {{ t.home.gradeProjection }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ t.home.gradeProjectionSubtitle }}
        </p>
      </div>
      <PointsRequired />
    </section>
  </div>
</template>
