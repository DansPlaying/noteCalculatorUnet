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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
    <!-- About Content -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sobre la Aplicación</h1>

      <div class="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
        <p>
          Esta aplicación ha sido desarrollada para facilitar el cálculo y seguimiento de las
          calificaciones en el sistema de evaluación de la
          <strong class="text-gray-900 dark:text-white"
            >Universidad Nacional Experimental del Táchira (UNET)</strong
          >.
        </p>
        <p>
          En la UNET, las evaluaciones parciales se califican en una escala de
          <strong class="text-gray-900 dark:text-white">1 a 100 puntos</strong>. Sin embargo, al
          final del período académico, las notas finales deben ser convertidas a una escala de
          <strong class="text-gray-900 dark:text-white">1 a 9 puntos</strong>, siguiendo una tabla
          oficial de equivalencias.
        </p>
        <p>
          La aplicación permite al estudiante ingresar sus calificaciones parciales y los
          porcentajes correspondientes para calcular su nota acumulada. Además, muestra cuánto le
          falta para alcanzar una nota específica, y realiza automáticamente la conversión de las
          notas al sistema de 9 puntos.
        </p>
      </div>
    </div>

    <!-- Conversion Table Section -->
    <section>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Tabla de Conversión Oficial</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Pasa el cursor sobre las celdas para ver la nota exacta
        </p>
      </div>

      <div
        class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <table
          class="w-full min-w-[700px] text-sm"
          aria-label="Tabla de conversión de notas UNET"
        >
          <thead
            class="bg-gray-100 dark:bg-gray-700 text-xs font-medium uppercase tracking-wide border-b border-gray-200 dark:border-gray-600"
          >
            <tr>
              <th
                scope="col"
                class="px-3 py-3 text-center text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-100 dark:bg-gray-700 z-10"
              >
                .x
              </th>
              <th
                v-for="col in 9"
                :key="col"
                scope="col"
                class="px-3 py-3 text-center text-gray-700 dark:text-gray-300"
              >
                {{ col }}.x
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="rowIndex in 10"
              :key="rowIndex"
              class="border-b border-gray-200 dark:border-gray-700 last:border-b-0
                     hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
            >
              <th
                scope="row"
                class="px-3 py-2.5 text-center font-semibold text-gray-900 dark:text-white
                       bg-gray-100 dark:bg-gray-700 sticky left-0 z-10"
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
                  class="absolute z-20 hidden group-hover:block px-3 py-1.5 text-xs font-medium
                         text-white bg-gray-900 dark:bg-gray-600 rounded-lg shadow-lg
                         top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                  Nota exacta: {{ colIndex }}.{{ rowIndex - 1 }}
                  <div
                    class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2
                           bg-gray-900 dark:bg-gray-600 rotate-45"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Legend -->
      <div class="mt-4 flex flex-wrap gap-4 justify-center text-sm">
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
          ></span>
          <span class="text-gray-600 dark:text-gray-400">Excelente (9.x)</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700"
          ></span>
          <span class="text-gray-600 dark:text-gray-400">Muy Bueno (8.x)</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700"
          ></span>
          <span class="text-gray-600 dark:text-gray-400">Bueno (7.x)</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="w-4 h-4 rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700"
          ></span>
          <span class="text-gray-600 dark:text-gray-400">Aprobado (6.x)</span>
        </div>
      </div>
    </section>
  </div>
</template>
