<template>
  <div class="px-4 sm:px-8 md:px-16 pt-8 dark:text-white">
    <p>
      Esta aplicación ha sido desarrollada para facilitar el cálculo y seguimiento de las
      calificaciones en el sistema de evaluación de la Universidad Nacional Experimental del Táchira
      (UNET).
    </p>
    <p>
      En la UNET, las evaluaciones parciales se califican en una escala de 1 a 100 puntos. Sin
      embargo, al final del período académico, las notas finales deben ser convertidas a una escala
      de 1 a 9 puntos, siguiendo una tabla oficial de equivalencias.
    </p>
    <p>
      La aplicación permite al estudiante ingresar sus calificaciones parciales y los porcentajes
      correspondientes para calcular su nota acumulada. Además, muestra cuánto le falta para
      alcanzar una nota específica, y realiza automáticamente la conversión de las notas al sistema
      de 9 puntos.
    </p>

    <div class="overflow-auto pt-4 rounded-lg pb-6">
      <h2 class="text-xl font-bold mb-2 dark:text-white">Tabla de Conversión</h2>
      <table
        class="min-w-[700px] text-sm text-left text-gray-500 dark:text-gray-300 border dark:border-gray-600"
      >
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
          <tr>
            <th class="px-2 py-1">Nota</th>
            <th v-for="col in 9" :key="col" class="px-2 py-1 text-center">{{ col }}.</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
            v-for="rowIndex in 10"
            :key="rowIndex"
          >
            <td
              class="px-2 py-1 font-semibold text-center text-gray-800 bg-gray-200 dark:dark:bg-gray-800 dark:text-white"
            >
              {{ rowIndex - 1 }}
            </td>
            <td v-for="colIndex in 9" :key="colIndex" class="px-2 py-1 text-center">
              {{ getRange(colIndex, rowIndex - 1) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

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
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
