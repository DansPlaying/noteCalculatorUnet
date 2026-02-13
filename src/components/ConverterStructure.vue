<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { convertirNota } from '@/assets/notes'
import { useI18n } from '@/i18n'

const { t } = useI18n()

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

const inputLabel = computed(() =>
  t.value.converter.inputLabel.replace('{scale}', props.escalaOrigen),
)

const errorMessage = computed(() =>
  props.escalaOrigen === '100' ? t.value.converter.error100 : t.value.converter.error9,
)
</script>

<template>
  <div class="converter-item flex items-center gap-2 sm:gap-3">
    <!-- Scale badge -->
    <div
      class="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md flex-shrink-0"
    >
      <span class="text-xs sm:text-sm font-bold">{{ props.escalaOrigen }}</span>
      <font-awesome-icon icon="arrow-right" class="text-[10px] opacity-80" />
      <span class="text-xs sm:text-sm font-bold">{{ props.escalaDestino }}</span>
    </div>

    <!-- Input -->
    <input
      :id="props.escalaOrigen"
      v-model.number="nota"
      type="number"
      :min="props.escalaOrigen === '100' ? 0 : 1"
      :max="props.escalaOrigen === '100' ? 100 : 9"
      :step="props.escalaOrigen === '9' ? 0.1 : 1"
      inputmode="decimal"
      class="flex-1 min-w-0 px-2 py-2 text-sm text-center font-medium bg-white dark:bg-slate-800 border-2 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2"
      :class="
        hasError
          ? 'border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-700'
          : 'border-slate-200 dark:border-slate-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:ring-blue-700'
      "
      :placeholder="props.escalaOrigen === '9' ? '1-9' : '0-100'"
      :aria-label="inputLabel"
      :aria-invalid="hasError"
      :aria-describedby="hasError ? `error-${props.escalaOrigen}` : undefined"
    />

    <font-awesome-icon icon="arrow-right" class="text-slate-300 dark:text-slate-600 text-xs flex-shrink-0" />

    <!-- Result -->
    <div
      class="flex-1 min-w-0 px-2 py-2 text-sm text-center font-bold rounded-xl transition-all duration-300"
      :class="
        resultado !== null && !hasError
          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700'
      "
      role="status"
      aria-live="polite"
    >
      {{ resultado !== null && !hasError ? resultado : '?' }}
    </div>
  </div>

  <!-- Error Message -->
  <Transition name="shake">
    <p
      v-if="hasError"
      :id="`error-${props.escalaOrigen}`"
      role="alert"
      class="mt-2 text-xs font-semibold text-red-600 dark:text-red-400 text-right"
    >
      {{ errorMessage }}
    </p>
  </Transition>
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
