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
    class="flex items-center gap-2 px-4 py-2 rounded-lg
           bg-white/10 hover:bg-white/20
           border border-white/20 hover:border-white/30
           text-white text-sm font-medium
           transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-white/30"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <span class="hidden sm:inline">{{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}</span>
    <font-awesome-icon
      :icon="isDark ? 'sun' : 'moon'"
      class="text-lg transition-transform duration-300 hover:rotate-12"
    />
  </button>
</template>
