<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import ThemeToggle from './components/ThemeToggle.vue'
onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <div class="flex flex-col h-screen dark:bg-gray-600">
    <div
      class="flex justify-between items-center p-4 bg-[#0f47ad] shadow-sm m-4 text-white dark:bg-gray-800"
    >
      <nav>
        <RouterLink to="/" class="dark:text-white">Calculadora</RouterLink>
        <RouterLink to="/about" class="dark:text-white pl-4">Sobre el App</RouterLink>
      </nav>

      <ThemeToggle />
    </div>

    <div class="flex-1 overflow-auto">
      <RouterView />
    </div>

    <footer class="bg-[#0f47ad] shadow-sm m-4 dark:bg-gray-800 text-md flex justify-center">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-white sm:text-center"
          >© {{ new Date().getFullYear() }}
          <a class="hover:underline">Calculadora Notas UNET™</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 font-medium text-white sm:mt-0 pt-4 md:pt-0">
          <li>
            <a
              target="_blank"
              rel="noreferer noopener"
              href="https://www.linkedin.com/in/danielurbina007"
              class="hover:underline me-4 md:me-6"
              >LinkedIn</a
            >
          </li>
          <li class="px-4">
            <a
              target="_blank"
              rel="noreferer noopener"
              href="https://github.com/DansPlaying/noteCalculatorUnet"
              class="hover:underline me-4 md:me-6"
              >GitHub</a
            >
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
