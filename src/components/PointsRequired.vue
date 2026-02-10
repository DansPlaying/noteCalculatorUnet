<template>
  <div
    class="p-5 sm:p-8 md:p-10 rounded-3xl border border-white/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <!-- Header with Dropdown -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h3 class="font-display text-xl font-semibold text-slate-900 dark:text-white">
          ¿Cuánto me falta?
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Ingresa tus parciales y descubre la nota necesaria para cada objetivo.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <label for="notes" class="text-sm font-medium text-slate-700 dark:text-slate-300">
          Parciales:
        </label>
        <select
          id="notes"
          v-model="notesCount"
          @change="ajustarParciales"
          class="px-4 py-2 text-sm bg-white/90 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 transition-all duration-200"
        >
          <option value="2">2 parciales</option>
          <option value="3">3 parciales</option>
          <option value="4">4 parciales</option>
        </select>
        <button
          type="button"
          @click="resetParciales"
          class="px-4 py-2 text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 transition-colors duration-200"
        >
          Limpiar
        </button>
      </div>
    </div>

    <div class="section-spacing">
      <div class="mb-8 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6">
        <div class="flex flex-wrap items-center gap-3">
          <div
            class="inline-flex items-center gap-2 rounded-full bg-slate-100/80 dark:bg-slate-800/60 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            Acumulado: {{ percentage.toFixed(1) }}%
          </div>
          <div
            class="inline-flex items-center gap-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-200"
          >
            Restante: {{ remainingPercentage.toFixed(1) }}%
          </div>
          <div
            v-if="percentageWarning"
            class="text-xs font-semibold text-amber-600 dark:text-amber-400"
          >
            Ajusta porcentajes para continuar.
          </div>
        </div>

        <div
          class="h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden mt-10 translate-y-2"
        >
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="progressBarClass"
            :style="{ width: `${Math.min(percentage, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="py-4">
      <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
        <table
          class="w-full min-w-[600px] text-sm text-left text-slate-500 dark:text-slate-400"
          aria-label="Tabla de parciales"
        >
          <thead
            class="bg-slate-100/80 dark:bg-slate-800 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600"
          >
            <tr>
              <th scope="col" class="px-4 py-4">Parcial</th>
              <th scope="col" class="px-4 py-4">Porcentaje</th>
              <th scope="col" class="px-4 py-4 min-w-[100px]">Nota (1-100)</th>
              <th scope="col" class="px-4 py-4 min-w-[80px]">Nota (1-9)</th>
              <th scope="col" class="px-4 py-4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(parcial, index) in parciales"
              :key="index"
              class="bg-white/90 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-150"
            >
              <th
                scope="row"
                class="px-4 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap"
              >
                {{ parcial.nombre }}
              </th>
              <td class="px-4 py-4">
                <input
                  :id="'percent' + index"
                  type="number"
                  min="0"
                  max="100"
                  v-model.number="parcial.porcentaje"
                  @input="calcularTotal"
                  step="0.1"
                  class="w-full px-3 py-2.5 text-sm bg-white/90 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 transition-all duration-200"
                  :aria-label="`Porcentaje ${parcial.nombre}`"
                  placeholder="%"
                />
              </td>
              <td class="px-4 py-4">
                <input
                  :id="'note' + index"
                  type="number"
                  min="0"
                  max="100"
                  v-model.number="parcial.nota100"
                  @input="calcularTotal"
                  step="0.1"
                  class="w-full px-3 py-2.5 text-sm bg-white/90 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-600 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-blue-500 transition-all duration-200"
                  :aria-label="`Nota ${parcial.nombre}`"
                  placeholder="0-100"
                />
              </td>
              <td class="px-4 py-4 text-center font-medium text-slate-700 dark:text-slate-300">
                {{ parcial.nota9 || '-' }}
              </td>
              <td class="px-4 py-4 text-center font-semibold text-slate-900 dark:text-white">
                {{ parcial.total ? parcial.total.toFixed(2) : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Percentage Warning -->
    <Transition name="shake">
      <div
        v-if="percentageWarning"
        role="alert"
        class="mb-6 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-2xl"
      >
        <div class="flex items-center gap-3">
          <font-awesome-icon
            icon="exclamation-triangle"
            class="text-amber-600 dark:text-amber-400"
          />
          <p class="text-sm font-semibold text-amber-800 dark:text-amber-300">
            El porcentaje total excede 100% ({{ totalPercentage.toFixed(1) }}%)
          </p>
        </div>
      </div>
    </Transition>

    <div
      v-if="!hasAnyInput"
      class="mb-6 rounded-2xl border border-dashed border-slate-300/80 dark:border-slate-600/80 bg-white/60 dark:bg-slate-900/40 p-6 text-sm text-slate-500 dark:text-slate-400"
    >
      Agrega porcentajes y notas para ver el cálculo automático y lo que te falta.
    </div>

    <!-- Accumulated Grade -->
    <Transition name="result">
      <div
        v-if="totalNota9 && !percentageWarning"
        role="status"
        aria-live="polite"
        class="mb-8 p-6 bg-blue-50/90 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
      >
        <div class="flex items-center gap-3">
          <font-awesome-icon icon="check-circle" class="text-xl text-blue-600 dark:text-blue-400" />

          <p class="text-lg font-semibold text-slate-900 dark:text-white">
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
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 pt-4"
      >
        <div
          v-for="(elem, index) in totalRequired"
          :key="index"
          class="p-5 rounded-2xl border transition-all duration-200"
          :class="getResultCardClass(elem)"
        >
          <div v-if="elem.outOfRange">
            <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Para {{ elem.note }}
            </p>
            <p class="text-sm font-bold text-red-600 dark:text-red-400">Fuera de rango</p>
          </div>
          <div v-else>
            <p class="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Para obtener <span class="font-bold text-lg pl-1">{{ elem.note }}</span>
            </p>
            <p
              class="text-sm font-bold"
              :class="
                elem.hasReached
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-blue-600 dark:text-blue-400'
              "
            >
              {{ getRequiredLabel(elem) }}
            </p>
            <div
              v-if="!elem.hasReached"
              class="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400"
            >
              <p>({{ elem.required9.toFixed(1) }} pts)</p>
              <p>
                Aporta {{ elem.missingNote.toFixed(2) }} pts ({{ remainingPercentage.toFixed(1) }}%)
              </p>
            </div>
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
const totalPercentage = ref(0)
const percentageWarning = ref(false)
const totalRequired = ref<Array<Note>>([])
const parciales = reactive<Array<Parcial>>([])

const generarParciales = (n: number) => {
  const count = Math.max(1, n - 1)
  return Array.from({ length: count }, (_, i) => ({
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
  totalPercentage.value = 0
}

const resetParciales = () => {
  parciales.forEach((p) => {
    p.porcentaje = 0
    p.nota100 = 0
    p.nota9 = 0
    p.total = 0
  })
  totalRequired.value = []
  percentageWarning.value = false
  percentage.value = 0
  totalPercentage.value = 0
}

const isParcialComplete = (parcial: Parcial) => {
  return (parcial.porcentaje ?? 0) > 0 && (parcial.nota100 ?? 0) > 0
}

const actualizarNota9 = (index: number) => {
  const parcial = parciales[index]
  if (!isParcialComplete(parcial)) {
    parcial.nota9 = 0
    parcial.total = 0
    return
  }
  parcial.nota9 = convertirNota(parcial.nota100, '100') ?? 0
  parcial.total = parcial.nota9 * (parcial.porcentaje / 100)
}

const totalNota9 = computed(() => {
  let total = 0
  parciales.forEach((p) => {
    if (!isParcialComplete(p)) return
    total += (p.nota9 || 0) * ((p.porcentaje || 0) / 100)
  })
  return total
})

const remainingPercentage = computed(() => {
  return Math.max(0, 100 - percentage.value)
})

const hasAnyInput = computed(() => {
  return parciales.some((p) => (p.porcentaje ?? 0) > 0 || (p.nota100 ?? 0) > 0)
})

const progressBarClass = computed(() => {
  if (percentageWarning.value) return 'bg-amber-500'
  if (percentage.value >= 100) return 'bg-green-500'
  return 'bg-blue-500'
})

const roundToTenth = (value: number) => Math.round(value * 10) / 10

const calculateWhatIsMissing = () => {
  totalRequired.value = []

  const missingPercentage = 100 - percentage.value
  if (missingPercentage <= 0) return

  notesRequired.forEach((element) => {
    const missingNoteRaw = element.required - totalNota9.value
    const missingNote = roundNote(missingNoteRaw)
    const requiredAverage9Raw = missingNoteRaw / (missingPercentage / 100)
    const requiredAverage9 = roundToTenth(requiredAverage9Raw)
    const hasReached = missingNoteRaw <= 0
    const outOfRange = requiredAverage9Raw > 9
    const finalRequiredNote =
      hasReached || outOfRange
        ? 0
        : requiredAverage9 >= 1
          ? (convertirNota(requiredAverage9, '9') ?? 0)
          : 0

    totalRequired.value.push({
      note: element.note,
      required: finalRequiredNote,
      required9: hasReached || outOfRange ? 0 : requiredAverage9,
      missingNote,
      hasReached,
      outOfRange,
    })
  })
}

const calcularTotal = () => {
  percentage.value = 0
  totalPercentage.value = 0
  parciales.forEach((p, i) => {
    totalPercentage.value += p.porcentaje || 0
    if (isParcialComplete(p)) {
      percentage.value += p.porcentaje || 0
    }
    actualizarNota9(i)
  })

  percentageWarning.value = totalPercentage.value > 100

  const hasValidData = parciales.some((p) => isParcialComplete(p))

  if (hasValidData && !percentageWarning.value) {
    calculateWhatIsMissing()
  } else {
    totalRequired.value = []
  }
}

const getResultCardClass = (elem: Note) => {
  if (elem.outOfRange) {
    return 'bg-red-50/90 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  }
  if (elem.hasReached) {
    return 'bg-green-50/90 dark:bg-green-900/20 border-green-200 dark:border-green-800'
  }
  return 'bg-slate-50/90 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
}

const getRequiredLabel = (elem: Note) => {
  if (elem.hasReached) return 'Ya la tienes'
  if (elem.outOfRange) return 'Fuera de rango'
  if (elem.required <= 0) return 'Requiere <1 pt'
  return `Requiere ${elem.required} pts`
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
