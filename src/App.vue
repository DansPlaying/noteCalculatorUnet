<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import ThemeToggle from './components/ThemeToggle.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <div
    class="flex items-center min-h-screen flex-col app-bg text-slate-900 dark:text-slate-100 transition-colors duration-300"
  >
    <Header />

    <main class="flex-1">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
