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
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <header
      class="flex justify-between items-center p-4 md:p-6 m-4 md:m-6
             bg-gradient-to-r from-blue-600 to-blue-700
             dark:from-gray-800 dark:to-gray-900
             rounded-xl shadow-lg text-white"
      role="banner"
    >
      <nav aria-label="Main navigation" class="flex items-center gap-6">
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-200 font-medium"
          exact-active-class="!text-white font-semibold"
        >
          <font-awesome-icon icon="calculator" class="text-sm" />
          <span>Calculadora</span>
        </RouterLink>

        <RouterLink
          to="/about"
          class="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-200 font-medium"
          exact-active-class="!text-white font-semibold"
        >
          <font-awesome-icon icon="info-circle" class="text-sm" />
          <span>Sobre el App</span>
        </RouterLink>
      </nav>

      <ThemeToggle />
    </header>

    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>

    <footer
      class="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900
             shadow-lg m-4 md:m-6 rounded-xl"
      role="contentinfo"
    >
      <div class="w-full mx-auto max-w-screen-xl p-4 md:p-6 md:flex md:items-center md:justify-between">
        <span class="text-sm text-white/90">
          © {{ new Date().getFullYear() }}
          <span class="font-medium">Calculadora Notas UNET</span>. Todos los derechos reservados.
        </span>
        <ul class="flex flex-wrap items-center gap-6 mt-4 md:mt-0 text-sm">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/danielurbina007"
              class="text-white/90 hover:text-white hover:underline transition-colors duration-200 flex items-center gap-2"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" />
              LinkedIn
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/DansPlaying/noteCalculatorUnet"
              class="text-white/90 hover:text-white hover:underline transition-colors duration-200 flex items-center gap-2"
            >
              <font-awesome-icon :icon="['fab', 'github']" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
