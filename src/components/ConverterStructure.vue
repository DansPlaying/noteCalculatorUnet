<script setup lang="ts">
import { ref, computed } from 'vue'
import { convertirNota } from '@/assets/notes'

const props = defineProps<{
  escalaOrigen: '100' | '9'
  escalaDestino: '9' | '100'
}>()

const nota = ref<number | null>(null)
const resultado = ref<number | null>(null)

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
    class="flex-1 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ titulo }}
    </h5>

    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {{ descripcion }}
    </p>

    <div>
      <label
        :for="props.escalaOrigen"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Nota
      </label>
      <div class="flex items-center gap-4">
        <input
          :id="props.escalaOrigen"
          v-model.number="nota"
          type="number"
          :min="props.escalaOrigen === '100' ? 0 : 1"
          :max="props.escalaOrigen === '100' ? 100 : 9"
          class="max-w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :placeholder="props.escalaOrigen + ' puntos'"
        />

        <button
          v-if="
            nota != null &&
            !(
              nota < 0 ||
              (props.escalaOrigen === '100' && nota > 100) ||
              (props.escalaOrigen === '9' && nota > 9)
            )
          "
          @click="calcular"
          type="button"
          class="text-gray-900 cursor-pointer bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Calcular
        </button>
      </div>

      <div
        v-if="
          nota != null &&
          (nota < 0 ||
            (props.escalaOrigen === '100' && nota > 100) ||
            (props.escalaOrigen === '9' && nota > 9))
        "
      >
        <p class="text-red-500 dark:text-red-400 pt-2">
          La nota debe estar entre 0 y {{ props.escalaOrigen === '100' ? 100 : 9 }}.
        </p>
      </div>

      <div v-if="resultado !== null" class="pt-4 text-lg">
        <p class="text-gray-900 dark:text-white">Equivalente a {{ resultado }} puntos.</p>
      </div>
    </div>
  </div>
</template>
