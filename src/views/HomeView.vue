<script setup lang="ts">
import ConverterStructure from '@/components/ConverterStructure.vue'
import PointsRequired from '@/components/PointsRequired.vue'
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 py-6">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Calculadora de Notas UNET
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Convierte y calcula tus notas de manera fácil y rápida
      </p>
    </div>

    <!-- Converter Cards -->
    <div class="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
      <ConverterStructure escalaOrigen="100" escalaDestino="9" />
      <ConverterStructure escalaOrigen="9" escalaDestino="100" />
    </div>

    <!-- Points Required Calculator -->
    <div class="mt-6">
      <PointsRequired />
    </div>
  </div>
</template>
