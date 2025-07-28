<template>
  <button
    @click="toggleTheme"
    class="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white text-black dark:bg-gray-800 dark:text-white transition"
  >
    <span>{{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}</span>
    <font-awesome-icon :icon="isDark ? 'sun' : 'moon'" />
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>

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
