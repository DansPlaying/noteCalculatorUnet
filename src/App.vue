<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, watch } from 'vue'
import { initFlowbite } from 'flowbite'
import ThemeToggle from './components/ThemeToggle.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useI18n } from '@/i18n'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { initTheme } = useTheme()

// Update document title when language changes
watch(
  locale,
  () => {
    document.title = `${t.value.header.title} UNET`
  },
  { immediate: true },
)

onMounted(() => {
  initFlowbite()
  initTheme()
})
</script>

<template>
  <div
    class="flex items-center min-h-screen flex-col app-bg text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden w-full safe-area-inset"
  >
    <Header />

    <main class="lg:flex lg:justify-center flex-1 w-full overflow-x-hidden">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
