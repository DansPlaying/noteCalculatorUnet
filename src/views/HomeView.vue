<script setup lang="ts">
import ConverterStructure from '@/components/ConverterStructure.vue'
</script>

<template>
  <main class="bg-white shadow-sm m-4 dark:bg-gray-600 py-4">
    <h2 class="dark:text-white text-center font-bold text-xl md:text-2xl">
      CALCULADORA NOTAS UNET
    </h2>

    <div class="flex flex-col md:flex-row justify-center w-full gap-4 px-4 pt-4">
      <ConverterStructure escalaOrigen="100" escalaDestino="9" />
      <ConverterStructure escalaOrigen="9" escalaDestino="100" />
    </div>
  </main>
</template>
