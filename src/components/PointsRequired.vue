<template>
  <div
    class="flex-1 p-6 ml-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-center items-center">
      <h5 class="text-center dark:text-white pr-4">¿CUANTO ME FALTA?</h5>
      <select
        id="notes"
        v-model="notesCount"
        @change="ajustarParciales"
        class="bg-gray-50 border w-[120px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="1">2 parciales</option>
        <option value="2">3 parciales</option>
        <option value="3">4 parciales</option>
      </select>
    </div>

    <div class="sm:rounded-lg pt-4 flex justify-center">
      <table
        class="w-full max-w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Parcial</th>
            <th scope="col" class="px-6 py-3">Porcentaje</th>
            <th scope="col" class="px-6 py-3">1-100</th>
            <th scope="col" class="px-6 py-3">1-9</th>
            <th scope="col" class="px-6 py-3">Total note</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(parcial, index) in parciales"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-4 py-2">{{ parcial.nombre }}</td>
            <td class="px-4 py-2">
              <input
                :id="'percent' + index"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                v-model.number="parcial.porcentaje"
                @input="calcularTotal"
              />
            </td>
            <td class="px-4 py-2">
              <input
                :id="'note' + index"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                v-model.number="parcial.nota100"
                @input="actualizarNota9(index)"
              />
            </td>
            <td class="px-4 py-2">
              <p class="text-center">{{ parcial.nota9 }}</p>
            </td>
            <td>
              <p class="text-center">{{ parcial.total }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="dark:text-white font-bold text-xl pt-4 text-center pr-2">
      Nota acumulada: {{ totalNota9.toFixed(2) }} puntos
    </h3>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { convertirNota } from '@/assets/notes'
import type { Parcial } from '@/utils/parcial'

const notesCount = ref(1)
const parciales = reactive<Array<Parcial>>([])

const generarParciales = (n: number) => {
  return Array.from({ length: n }, (_, i) => ({
    nombre: `Parcial ${i + 1}`,
    porcentaje: 0,
    nota100: 0,
    nota9: 0,
    total: 0,
  }))
}

parciales.push(...generarParciales(notesCount.value))

const ajustarParciales = () => {
  const nuevos = generarParciales(notesCount.value)
  parciales.splice(0, parciales.length, ...nuevos)
}

const actualizarNota9 = (index: number) => {
  const parcial = parciales[index]
  parcial.nota9 = convertirNota(parcial.nota100, '100') ?? 0
  parcial.total = parcial.nota9 * (parcial.porcentaje / 100)
}

const totalNota9 = computed(() => {
  let total = 0
  parciales.forEach((p) => {
    total += (p.nota9 || 0) * ((p.porcentaje || 0) / 100)
  })
  return total
})

const calcularTotal = () => {
  parciales.forEach((p, i) => {
    actualizarNota9(i)
  })
}
</script>
