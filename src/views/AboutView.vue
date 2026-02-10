<script setup lang="ts">
import { ref } from 'vue'
import { conversion } from '@/assets/notes'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const activeTooltip = ref<string | null>(null)

function toggleTooltip(col: number, row: number) {
  const key = `${col}-${row}`
  activeTooltip.value = activeTooltip.value === key ? null : key
}

function isTooltipActive(col: number, row: number) {
  return activeTooltip.value === `${col}-${row}`
}

function getRange(column: number, row: number) {
  const start9 = column
  const notaMin = (start9 + row / 10).toFixed(1)
  const notaMax = (start9 + (row + 1) / 10).toFixed(1)

  const valores = conversion
    .filter((entry) => entry.nota9 >= parseFloat(notaMin) && entry.nota9 < parseFloat(notaMax))
    .map((entry) => entry.nota100)
    .sort((a, b) => a - b)

  if (valores[0] === 1) return '1-7'
  if (valores[0] === 95) return '95-100'
  if (valores.length === 0) return '-'
  if (valores.length === 1) return valores[0]
  if (valores[0] === valores[valores.length - 1]) return valores[0]
  return `${valores[0]}–${valores[valores.length - 1]}`
}

function getGradeColorClass(column: number, row: number): string {
  // Excelente (green) - only for 95-100 cell (grade 9.0)
  if (column === 9 && row === 0) return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
  // Muy Bueno (blue) - grades 8.x
  if (column === 8) return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
  // Bueno (indigo) - grades 7.x
  if (column === 7) return 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
  // Aprobado (amber) - 45-72 points
  // Column 6: all rows (62-72), Column 5: all rows (51-61), Column 4: rows 5-9 (45-50)
  if (column === 6 || column === 5 || (column === 4 && row >= 5))
    return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
  // Reprobado (red) - below 45 points (columns 1-3 all, column 4 rows 0-4)
  if (column <= 3 || (column === 4 && row < 5))
    return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
  return 'text-gray-700 dark:text-gray-300'
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12">
    <section
      class="rounded-3xl border border-white/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
    >
      <p class="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
        {{ t.about.context }}
      </p>
      <h1 class="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mt-3">
        {{ t.about.title }}
      </h1>

      <div class="mt-5 space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          {{ t.about.p1 }}
          <strong class="text-slate-900 dark:text-white">{{ t.about.university }}</strong>.
        </p>
        <p>
          {{ t.about.p2Start }}
          <strong class="text-slate-900 dark:text-white">{{ t.about.scale100 }}</strong>{{ t.about.p2Mid }}
          <strong class="text-slate-900 dark:text-white">{{ t.about.scale9 }}</strong>{{ t.about.p2End }}
        </p>
        <p>
          {{ t.about.p3 }}
        </p>
      </div>
    </section>

    <section class="pt-12 pb-2">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 class="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
          {{ t.about.tableTitle }}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          <span class="hidden sm:inline">{{ t.about.tableHintDesktop }}</span>
          <span class="sm:hidden">{{ t.about.tableHintMobile }}</span>
        </p>
      </div>

      <div
        class="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg bg-white/80 dark:bg-slate-900/60"
      >
        <div class="overflow-x-auto overflow-y-visible">
          <table
            class="w-full min-w-[700px] text-sm"
            aria-label="Tabla de conversión de notas UNET"
          >
            <thead
              class="bg-slate-100/80 dark:bg-slate-800 text-xs font-semibold uppercase tracking-wide border-b border-slate-200 dark:border-slate-600"
            >
              <tr>
                <th
                  scope="col"
                  class="px-3 py-3 text-center text-slate-700 dark:text-slate-300 sticky left-0 bg-slate-100/90 dark:bg-slate-800 z-10"
                >
                  .x
                </th>
                <th
                  v-for="col in 9"
                  :key="col"
                  scope="col"
                  class="px-3 py-3 text-center text-slate-700 dark:text-slate-300"
                >
                  {{ col }}.x
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="rowIndex in 10"
                :key="rowIndex"
                class="border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-150"
              >
                <th
                  scope="row"
                  class="px-3 py-2.5 text-center font-semibold text-slate-900 dark:text-white bg-slate-100/90 dark:bg-slate-800 sticky left-0 z-10"
                >
                  .{{ rowIndex - 1 }}
                </th>
                <td
                  v-for="colIndex in 9"
                  :key="colIndex"
                  class="px-3 py-2.5 text-center font-medium relative group cursor-pointer"
                  :class="getGradeColorClass(colIndex, rowIndex - 1)"
                  @click="toggleTooltip(colIndex, rowIndex - 1)"
                >
                  {{ getRange(colIndex, rowIndex - 1) }}

                  <!-- Tooltip -->
                  <div
                    v-if="!(colIndex === 9 && rowIndex > 1)"
                    class="absolute z-20 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-600 rounded-lg shadow-lg bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-150"
                    :class="isTooltipActive(colIndex, rowIndex - 1) ? 'block' : 'hidden group-hover:block'"
                  >
                    {{ t.about.exactGrade }} {{ colIndex }}.{{ rowIndex - 1 }}
                    <div
                      class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-600 rotate-45"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-4 justify-center text-sm pt-5 flex-row-reverse">
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">{{ t.about.excellent }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">{{ t.about.veryGood }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">{{ t.about.good }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">{{ t.about.passed }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">{{ t.about.failed }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
