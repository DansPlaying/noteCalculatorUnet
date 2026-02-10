<script setup lang="ts">
import { ref, computed } from 'vue'
import { convertirNota } from '@/assets/notes'

const props = defineProps<{
  escalaOrigen: '100' | '9'
  escalaDestino: '9' | '100'
}>()

const nota = ref<number | null>(null)
const resultado = ref<number | null>(null)

const hasError = computed(() => {
  if (nota.value === null) return false
  return (
    nota.value < 0 ||
    (props.escalaOrigen === '100' && nota.value > 100) ||
    (props.escalaOrigen === '9' && nota.value > 9)
  )
})

const canCalculate = computed(() => {
  return nota.value !== null && !hasError.value
})

const calcular = () => {
  if (nota.value !== null) {
    resultado.value = convertirNota(nota.value, props.escalaOrigen)
  }
}

const titulo = computed(() => `Escala ${props.escalaOrigen} a ${props.escalaDestino}`)

const descripcion = computed(
  () =>
    `Conversión de notas de la escala ${props.escalaOrigen} a la escala ${props.escalaDestino}.`,
)
</script>

<template>
  <div
    class="flex-1 p-6 bg-white border border-gray-200 rounded-xl shadow-sm
           hover:shadow-md transition-shadow duration-300
           dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- Card Header with Icon -->
    <div class="flex items-center gap-3 mb-4">
      <div
        class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30
               flex items-center justify-center flex-shrink-0"
      >
        <font-awesome-icon icon="calculator" class="text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
          {{ titulo }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ descripcion }}
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="calcular" class="space-y-4">
      <div>
        <label
          :for="props.escalaOrigen"
          class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Ingresa la nota ({{ props.escalaOrigen }} puntos)
        </label>

        <div class="flex items-center gap-3">
          <input
            :id="props.escalaOrigen"
            v-model.number="nota"
            type="number"
            :min="props.escalaOrigen === '100' ? 0 : 1"
            :max="props.escalaOrigen === '100' ? 100 : 9"
            :step="props.escalaOrigen === '9' ? 0.1 : 1"
            class="max-w-[150px] w-full px-4 py-2.5 text-base
                   bg-white dark:bg-gray-700
                   border rounded-lg
                   text-gray-900 dark:text-white
                   placeholder-gray-400 dark:placeholder-gray-500
                   transition-all duration-200
                   focus:outline-none focus:ring-4"
            :class="
              hasError
                ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/30'
            "
            :placeholder="`0-${props.escalaOrigen}`"
            :aria-invalid="hasError"
            :aria-describedby="hasError ? `error-${props.escalaOrigen}` : undefined"
          />

          <!-- Animated Button -->
          <Transition name="slide-fade">
            <button
              v-if="canCalculate"
              :id="'calcular' + props.escalaOrigen"
              type="submit"
              class="px-5 py-2.5 text-sm font-medium
                     bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                     dark:bg-blue-600 dark:hover:bg-blue-500
                     text-white rounded-lg shadow-sm hover:shadow
                     transition-all duration-200 hover:-translate-y-0.5
                     focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30"
            >
              Calcular
            </button>
          </Transition>
        </div>

        <!-- Error Message -->
        <Transition name="shake">
          <p
            v-if="hasError"
            :id="`error-${props.escalaOrigen}`"
            role="alert"
            class="mt-2 text-sm font-medium text-red-600 dark:text-red-400"
          >
            La nota debe estar entre {{ props.escalaOrigen === '100' ? '0 y 100' : '1 y 9' }}.
          </p>
        </Transition>
      </div>

      <!-- Result Display -->
      <Transition name="result">
        <div v-if="resultado !== null" class="pt-2" role="status" aria-live="polite">
          <div
            class="flex items-center gap-3 p-4
                   bg-blue-50 dark:bg-blue-900/20
                   rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <font-awesome-icon
              icon="check-circle"
              class="text-xl text-blue-600 dark:text-blue-400"
            />
            <p class="text-lg font-semibold text-gray-900 dark:text-white">
              Equivalente a
              <span class="text-blue-600 dark:text-blue-400">{{ resultado }}</span>
              puntos
            </p>
          </div>
        </div>
      </Transition>
    </form>
  </div>
</template>

<style scoped>
/* Slide Fade Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(-8px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(8px);
  opacity: 0;
}

/* Result Transition */
.result-enter-active {
  transition: all 0.3s ease-out;
}

.result-enter-from {
  opacity: 0;
  transform: translateY(8px);
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
