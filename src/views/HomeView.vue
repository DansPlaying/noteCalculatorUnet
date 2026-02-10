<script setup lang="ts">
import ConverterStructure from '@/components/ConverterStructure.vue'
import PointsRequired from '@/components/PointsRequired.vue'
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-12">
    <section class="grid gap-7 lg:grid-cols-[1.1fr,0.9fr] section-spacing">
      <div
        class="rounded-3xl border border-white/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl px-8 py-10 md:px-10 md:py-12"
      >
        <span
          class="inline-flex items-center gap-2 rounded-full bg-blue-100/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 px-3 py-1 text-xs font-semibold uppercase tracking-widest"
        >
          Herramienta oficial UNET
        </span>
        <h1
          class="font-display text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-6"
        >
          Calcula, convierte y proyecta tus notas con claridad total.
        </h1>
        <p class="text-base md:text-lg text-slate-600 dark:text-slate-300 mt-5 leading-relaxed">
          Diseñada para ayudarte a planificar tu rendimiento académico en segundos, con
          equivalencias oficiales y resultados explicados.
        </p>

        <div class="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div
            class="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-800/60 px-6 py-5 shadow-sm"
          >
            <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Escala
            </p>
            <p class="font-display text-lg font-semibold text-slate-900 dark:text-white mt-1">
              1 - 100
            </p>
          </div>
          <div
            class="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-800/60 px-6 py-5 shadow-sm"
          >
            <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Conversión
            </p>
            <p class="font-display text-lg font-semibold text-slate-900 dark:text-white mt-1">
              1 - 9
            </p>
          </div>
          <div
            class="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-800/60 px-6 py-5 shadow-sm"
          >
            <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Tabla
            </p>
            <p class="font-display text-lg font-semibold text-slate-900 dark:text-white mt-1">
              Oficial
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section-spacing">
      <div
        class="rounded-3xl border border-white/60 dark:border-slate-700/70 bg-gradient-to-br from-gray-100 via-slate-50 to-white/35 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-8 py-10 md:px-10 md:py-12 dark:text-white shadow-xl"
      >
        <h2 class="font-display text-xl md:text-2xl font-semibold">Guía rápida</h2>
        <p class="dark:text-slate-200 mt-4 leading-relaxed">
          Completa tu progreso y descubre exactamente qué necesitas para tu meta.
        </p>
        <div class="mt-8 space-y-6">
          <div class="flex items-start gap-3">
            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm font-semibold"
              >1</span
            >
            <p class="text-sm dark:text-slate-100 leading-relaxed">
              Convierte tus notas entre escalas con resultados al instante.
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm font-semibold"
              >2</span
            >
            <p class="text-sm dark:text-slate-100 leading-relaxed">
              Ingresa porcentaje y nota de cada parcial para calcular el acumulado.
            </p>
          </div>
          <div class="flex items-start gap-3">
            <span
              class="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm font-semibold"
              >3</span
            >
            <p class="text-sm dark:text-slate-100 leading-relaxed">
              Revisa lo que te falta para alcanzar cada objetivo de nota final.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-spacing">
      <div class="flex items-center justify-between mb-7">
        <h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">
          Conversión instantánea
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Resultados inmediatos y precisos</p>
      </div>
      <div class="flex flex-col md:flex-row gap-6 md:gap-8 mb-12">
        <ConverterStructure escalaOrigen="100" escalaDestino="9" />
        <ConverterStructure escalaOrigen="9" escalaDestino="100" />
      </div>
    </section>

    <section class="section-spacing">
      <div class="flex items-center justify-between mb-7">
        <h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">
          Proyección de parciales
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Calcula qué necesitas para tu meta</p>
      </div>
      <PointsRequired />
    </section>
  </div>
</template>
