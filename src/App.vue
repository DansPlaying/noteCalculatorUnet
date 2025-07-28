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
  <div class="flex justify-between items-center p-4 bg-white shadow-sm m-4 dark:bg-gray-800">
    <nav>
      <RouterLink to="/" class="dark:text-white">Calculadora</RouterLink>
      <RouterLink to="/about" class="dark:text-white pl-4">Sobre el App</RouterLink>
    </nav>

    <ThemeToggle />
  </div>

  <div class="">
    <RouterView />
  </div>

  <footer class="bg-white shadow-sm m-4 dark:bg-gray-800 text-md flex justify-center">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023
        <a href="https://flowbite.com/" class="hover:underline">Calculadora Notas UNET™</a>. All
        Rights Reserved.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
      >
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">LinkedIn</a>
        </li>
        <li class="px-4">
          <a href="#" class="hover:underline me-4 md:me-6">GitHub</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
  </footer>
</template>
