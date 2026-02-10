<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
    (props.escalaOrigen === '9' && (nota.value > 9 || nota.value < 1))
  )
})

watch(nota, () => {
  if (nota.value === null) {
    resultado.value = null
    return
  }
  if (!hasError.value) {
    resultado.value = convertirNota(nota.value, props.escalaOrigen)
  }
})

const titulo = computed(() => `Escala ${props.escalaOrigen} a ${props.escalaDestino}`)

const descripcion = computed(
  () =>
    `Conversión de notas de la escala ${props.escalaOrigen} a la escala ${props.escalaDestino}.`,
)
</script>

<template>
  <div
    class="relative flex-1 p-8 md:p-10 rounded-3xl border border-white/70 dark:border-slate-700/70
           bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg
           hover:shadow-xl transition-shadow duration-300 overflow-hidden"
  >
    <div
      class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300"
    ></div>
    <!-- Card Header with Icon -->
    <div class="flex items-center gap-3 mb-7">
      <div
        class="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-900/30
               flex items-center justify-center flex-shrink-0 shadow-sm"
      >
        <font-awesome-icon icon="calculator" class="text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h3 class="font-display text-xl font-semibold text-slate-900 dark:text-white">
          {{ titulo }}
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {{ descripcion }}
        </p>
      </div>
    </div>

    <!-- Form -->
    <div class="space-y-7">
      <div>
        <label
          :for="props.escalaOrigen"
          class="block mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          Ingresa la nota ({{ props.escalaOrigen }} puntos)
        </label>

        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            :id="props.escalaOrigen"
            v-model.number="nota"
            type="number"
            :min="props.escalaOrigen === '100' ? 0 : 1"
            :max="props.escalaOrigen === '100' ? 100 : 9"
            :step="props.escalaOrigen === '9' ? 0.1 : 1"
            inputmode="decimal"
            class="max-w-[170px] w-full px-4 py-2.5 text-base
                   bg-white/90 dark:bg-slate-800/70
                   border rounded-2xl
                   text-slate-900 dark:text-white
                   placeholder-slate-400 dark:placeholder-slate-500
                   transition-all duration-200
                   focus:outline-none focus:ring-4"
            :class="
              hasError
                ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30'
                : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/30'
            "
            :placeholder="props.escalaOrigen === '9' ? '1-9' : '0-100'"
            :aria-invalid="hasError"
            :aria-describedby="hasError ? `error-${props.escalaOrigen}` : undefined"
          />
          <Transition name="result">
            <div
              v-if="resultado !== null && !hasError"
              class="flex-1"
              role="status"
              aria-live="polite"
            >
              <div
                class="flex items-center gap-2 px-4 py-3
                       bg-blue-50/90 dark:bg-blue-900/20
                       rounded-2xl border border-blue-200 dark:border-blue-800"
              >
                <font-awesome-icon
                  icon="check-circle"
                  class="text-base text-blue-600 dark:text-blue-400"
                />
                <p class="text-sm font-semibold text-slate-900 dark:text-white">
                  {{ resultado }} pts
                </p>
              </div>
            </div>
          </Transition>
        </div>

        <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Se redondea automáticamente a la equivalencia oficial más cercana.
        </p>

        <!-- Error Message -->
        <Transition name="shake">
          <p
            v-if="hasError"
            :id="`error-${props.escalaOrigen}`"
            role="alert"
            class="mt-4 text-sm font-semibold text-red-600 dark:text-red-400"
          >
            La nota debe estar entre {{ props.escalaOrigen === '100' ? '0 y 100' : '1 y 9' }}.
          </p>
        </Transition>
      </div>

    </div>
  </div>
</template>

<style scoped>
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
