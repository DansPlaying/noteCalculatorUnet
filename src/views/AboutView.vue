<script setup lang="ts">
import { conversion } from '@/assets/notes'

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

function getGradeColorClass(column: number): string {
  if (column === 9) return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
  if (column === 8) return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
  if (column === 7) return 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
  if (column === 6) return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
  return 'text-gray-700 dark:text-gray-300'
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-12">
    <section
      class="rounded-3xl border border-white/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl px-8 py-10 md:px-10 md:py-12"
    >
      <p class="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
        Contexto UNET
      </p>
      <h1 class="font-display text-3xl font-semibold text-slate-900 dark:text-white mt-3">
        Sobre la Aplicación
      </h1>

      <div class="mt-5 space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          Esta aplicación ha sido desarrollada para facilitar el cálculo y seguimiento de las
          calificaciones en el sistema de evaluación de la
          <strong class="text-slate-900 dark:text-white"
            >Universidad Nacional Experimental del Táchira (UNET)</strong
          >.
        </p>
        <p>
          En la UNET, las evaluaciones parciales se califican en una escala de
          <strong class="text-slate-900 dark:text-white">1 a 100 puntos</strong>. Sin embargo, al
          final del período académico, las notas finales deben ser convertidas a una escala de
          <strong class="text-slate-900 dark:text-white">1 a 9 puntos</strong>, siguiendo una tabla
          oficial de equivalencias.
        </p>
        <p>
          La aplicación permite al estudiante ingresar sus calificaciones parciales y los
          porcentajes correspondientes para calcular su nota acumulada. Además, muestra cuánto le
          falta para alcanzar una nota específica, y realiza automáticamente la conversión de las
          notas al sistema de 9 puntos.
        </p>
      </div>
    </section>

    <section class="pt-12 pb-2">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 class="font-display text-2xl font-semibold text-slate-900 dark:text-white">
          Tabla de Conversión Oficial
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Pasa el cursor sobre las celdas para ver la nota exacta
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
                  class="px-3 py-2.5 text-center font-medium relative group"
                  :class="getGradeColorClass(colIndex)"
                >
                  {{ getRange(colIndex, rowIndex - 1) }}

                  <!-- Tooltip -->
                  <div
                    v-if="!(colIndex === 9 && rowIndex > 1)"
                    class="absolute z-20 hidden group-hover:block px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-600 rounded-lg shadow-lg bottom-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    Nota exacta: {{ colIndex }}.{{ rowIndex - 1 }}
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
          <span class="text-slate-600 dark:text-slate-400">Excelente (9.x)</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">Muy Bueno (8.x)</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">Bueno (7.x)</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700"
          ></span>
          <span class="text-slate-600 dark:text-slate-400">Aprobado (6.x)</span>
        </div>
      </div>
    </section>
  </div>
</template>
