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

    <div class="sm:rounded-lg pt-4 flex md:justify-center overflow-auto">
      <table
        class="w-full max-w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Parcial</th>
            <th scope="col" class="px-6 py-3">Porcentaje</th>
            <th scope="col" class="px-6 py-3 min-w-[100px]">1-100</th>
            <th scope="col" class="px-6 py-3 min-w-[74px]">1-9</th>
            <th scope="col" class="px-6 py-3">Nota parcial</th>
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
                @input="calcularTotal"
              />
            </td>
            <td class="px-4 py-2">
              <p class="text-center">{{ parcial.nota9 }}</p>
            </td>
            <td>
              <p class="text-center">{{ parcial.total.toFixed(2) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 v-if="totalNota9" class="dark:text-white font-bold text-xl pt-4 text-center pr-2">
      Nota acumulada: {{ totalNota9.toFixed(2) }} puntos
    </h3>

    <div
      id="totalRequired"
      v-if="totalRequired.length > 0"
      class="flex flex-wrap gap-2 justify-evenly sm:justify-start pt-4"
    >
      <div
        v-for="(elem, index) in totalRequired"
        :key="index"
        class="w-[140px] md:w-[160px] p-2 h-[66px] bg-white dark:text-white border-2 border-gray-600 rounded-lg shadow-sm dark:bg-gray-500 dark:border-gray-700"
      >
        <div v-if="elem.required != 0 || elem.missingNote <= 1">
          <h6>Para obtener {{ elem.note }}</h6>
          <p class="text-green-200">
            {{
              elem.required > 0
                ? `requiere ${elem.required} ${elem.required == 1 ? 'pt' : 'pts'}.`
                : 'ya tiene la nota.'
            }}
          </p>
        </div>
        <div v-else>
          <p class="text-red-200">Fuera de rango para obtener {{ elem.note }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { convertirNota, notesRequired, roundNote } from '@/assets/notes'
import type { Parcial, Note } from '@/utils/parcial'

const notesCount = ref(1)
const percentage = ref(0)
const totalRequired = ref<Array<Note>>([])
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
  totalRequired.value = []
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

const calculateWhatIsMissing = () => {
  totalRequired.value = []

  if (percentage.value >= 100) return

  const missingPercentage = 100 - percentage.value

  notesRequired.forEach((element) => {
    const noteDifference = roundNote(element.required - totalNota9.value)
    const missingNote = Math.ceil(noteDifference * 10) / 10
    const noteOn100 = Math.ceil((missingNote / missingPercentage) * 1000) / 10
    const finalRequiredNote = convertirNota(noteOn100, '9') ?? 0

    totalRequired.value.push({
      note: element.note,
      required: finalRequiredNote,
      missingNote: noteDifference,
    })
  })
}

const calcularTotal = () => {
  let calculateMissing = false
  percentage.value = 0
  parciales.forEach((p, i) => {
    calculateMissing = p.nota100 != 0 && p.porcentaje != 0
    percentage.value += p.porcentaje
    actualizarNota9(i)
  })

  console.log(calculateMissing, percentage.value)
  if (calculateMissing) {
    calculateWhatIsMissing()
  } else {
    totalRequired.value = []
  }
}
</script>
