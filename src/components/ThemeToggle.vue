<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <button
    @click="toggleTheme"
    id="theme-toggle"
    class="group flex items-center gap-2 px-4 py-2 rounded-full
           bg-white/70 dark:bg-slate-800/70
           border border-white/70 dark:border-slate-700/80
           text-slate-700 dark:text-slate-200 text-sm font-semibold
           shadow-sm hover:shadow-md transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <span class="hidden sm:inline">{{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}</span>
    <font-awesome-icon
      :icon="isDark ? 'sun' : 'moon'"
      class="text-lg transition-transform duration-300 group-hover:rotate-12"
    />
  </button>
</template>
