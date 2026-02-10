<template>
  <div
    class="p-6 bg-white border border-gray-200 rounded-xl shadow-sm
           hover:shadow-md transition-shadow duration-300
           dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- Header with Dropdown -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">
        ¿Cuánto me falta?
      </h3>

      <div class="flex items-center gap-3">
        <label for="notes" class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Parciales:
        </label>
        <select
          id="notes"
          v-model="notesCount"
          @change="ajustarParciales"
          class="px-4 py-2 text-sm bg-white dark:bg-gray-700
                 border border-gray-300 dark:border-gray-600
                 rounded-lg text-gray-900 dark:text-white
                 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30
                 focus:border-blue-500 transition-all duration-200"
        >
          <option value="2">2 parciales</option>
          <option value="3">3 parciales</option>
          <option value="4">4 parciales</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
      <table
        class="w-full min-w-[600px] text-sm text-left text-gray-500 dark:text-gray-400"
        aria-label="Tabla de parciales"
      >
        <thead
          class="bg-gray-100 dark:bg-gray-700 text-xs font-medium uppercase tracking-wide
                 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
        >
          <tr>
            <th scope="col" class="px-4 py-3">Parcial</th>
            <th scope="col" class="px-4 py-3">Porcentaje</th>
            <th scope="col" class="px-4 py-3 min-w-[100px]">Nota (1-100)</th>
            <th scope="col" class="px-4 py-3 min-w-[80px]">Nota (1-9)</th>
            <th scope="col" class="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(parcial, index) in parciales"
            :key="index"
            class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700
                   hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
          >
            <th
              scope="row"
              class="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ parcial.nombre }}
            </th>
            <td class="px-4 py-3">
              <input
                :id="'percent' + index"
                type="number"
                min="0"
                max="100"
                v-model.number="parcial.porcentaje"
                @input="calcularTotal"
                class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700
                       border border-gray-300 dark:border-gray-600
                       rounded-lg text-gray-900 dark:text-white
                       focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30
                       focus:border-blue-500 transition-all duration-200"
                :aria-label="`Porcentaje ${parcial.nombre}`"
                placeholder="%"
              />
            </td>
            <td class="px-4 py-3">
              <input
                :id="'note' + index"
                type="number"
                min="0"
                max="100"
                v-model.number="parcial.nota100"
                @input="calcularTotal"
                class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700
                       border border-gray-300 dark:border-gray-600
                       rounded-lg text-gray-900 dark:text-white
                       focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30
                       focus:border-blue-500 transition-all duration-200"
                :aria-label="`Nota ${parcial.nombre}`"
                placeholder="0-100"
              />
            </td>
            <td class="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">
              {{ parcial.nota9 || '-' }}
            </td>
            <td class="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
              {{ parcial.total ? parcial.total.toFixed(2) : '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Percentage Warning -->
    <Transition name="shake">
      <div
        v-if="percentageWarning"
        role="alert"
        class="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20
               border border-amber-300 dark:border-amber-700 rounded-lg"
      >
        <div class="flex items-center gap-3">
          <font-awesome-icon
            icon="exclamation-triangle"
            class="text-amber-600 dark:text-amber-400"
          />
          <p class="text-sm font-medium text-amber-800 dark:text-amber-300">
            El porcentaje total excede 100% ({{ percentage }}%)
          </p>
        </div>
      </div>
    </Transition>

    <!-- Accumulated Grade -->
    <Transition name="result">
      <div
        v-if="totalNota9 && !percentageWarning"
        role="status"
        aria-live="polite"
        class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20
               rounded-lg border border-blue-200 dark:border-blue-800"
      >
        <div class="flex items-center gap-3">
          <font-awesome-icon icon="check-circle" class="text-xl text-blue-600 dark:text-blue-400" />
          <p class="text-lg font-semibold text-gray-900 dark:text-white">
            Nota acumulada:
            <span class="text-blue-600 dark:text-blue-400">{{ totalNota9.toFixed(2) }}</span>
            puntos
          </p>
        </div>
      </div>
    </Transition>

    <!-- Results Grid -->
    <Transition name="fade">
      <div
        v-if="totalRequired.length > 0"
        id="totalRequired"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        <div
          v-for="(elem, index) in totalRequired"
          :key="index"
          class="p-3 rounded-lg border transition-all duration-200"
          :class="getResultCardClass(elem)"
        >
          <div v-if="elem.required != 0 || elem.missingNote <= 1">
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Para obtener {{ elem.note }}
            </p>
            <p
              class="text-sm font-bold"
              :class="
                elem.required > 0
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-green-600 dark:text-green-400'
              "
            >
              {{ elem.required > 0 ? `Requiere ${elem.required} pts` : 'Ya la tienes' }}
            </p>
          </div>
          <div v-else>
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Para {{ elem.note }}
            </p>
            <p class="text-sm font-bold text-red-600 dark:text-red-400">Fuera de rango</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { convertirNota, notesRequired, roundNote } from '@/assets/notes'
import type { Parcial, Note } from '@/utils/parcial'

const notesCount = ref(2)
const percentage = ref(0)
const percentageWarning = ref(false)
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
  percentageWarning.value = false
  percentage.value = 0
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
  percentage.value = 0
  parciales.forEach((p, i) => {
    percentage.value += p.porcentaje || 0
    actualizarNota9(i)
  })

  percentageWarning.value = percentage.value > 100

  const hasValidData = parciales.some((p) => p.nota100 !== 0 && p.porcentaje !== 0)

  if (hasValidData && percentage.value <= 100) {
    calculateWhatIsMissing()
  } else {
    totalRequired.value = []
  }
}

const getResultCardClass = (elem: Note) => {
  if (elem.missingNote > 1) {
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  }
  if (elem.required <= 0) {
    return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
  }
  return 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
}
</script>

<style scoped>
/* Result Transition */
.result-enter-active {
  transition: all 0.3s ease-out;
}

.result-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

/* Fade Transition */
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

/* Shake Transition */
.shake-enter-active {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-4px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(4px);
  }
}
</style>
