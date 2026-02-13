<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/i18n'
import { useFontSize, type FontSize } from '@/composables/useFontSize'
import { useTheme } from '@/composables/useTheme'

const { t, locale, setLocale } = useI18n()
const { fontSize, setFontSize, fontSizeLabel } = useFontSize()
const { isDark, toggleTheme } = useTheme()

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMenu() {
  isOpen.value = false
  document.body.style.overflow = ''
}

function selectFontSize(size: FontSize) {
  setFontSize(size)
}

// Close menu on escape key
function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

// Watch for route changes to close menu
watch(
  () => window.location.pathname,
  () => closeMenu(),
)
</script>

<template>
  <!-- Mobile menu button -->
  <button
    @click="toggleMenu"
    class="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-white/70 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
    :aria-label="t.settings?.openMenu || 'Open settings'"
    aria-expanded="false"
  >
    <font-awesome-icon icon="bars" class="text-lg" />
  </button>

  <!-- Teleport to body for proper stacking -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
        style="z-index: 9998;"
        @click="closeMenu"
      />
    </Transition>

    <!-- Side drawer -->
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl md:hidden flex flex-col"
        style="z-index: 9999;"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0"
          :style="{ paddingTop: `calc(1rem + env(safe-area-inset-top, 0px))` }"
        >
          <h2 class="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {{ t.settings?.title || 'Settings' }}
          </h2>
          <button
            @click="closeMenu"
            class="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            :aria-label="t.settings?.close || 'Close'"
          >
            <font-awesome-icon icon="times" class="text-lg" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          <!-- Language Section -->
          <div>
            <h3 class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3">
              {{ t.settings?.language || 'Language' }}
            </h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="setLocale('es')"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                :class="
                  locale === 'es'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-2 border-blue-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                "
              >
                <span>Espa&ntilde;ol</span>
              </button>
              <button
                @click="setLocale('en')"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                :class="
                  locale === 'en'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-2 border-blue-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                "
              >
                <span>English</span>
              </button>
            </div>
          </div>

          <!-- Theme Section -->
          <div>
            <h3 class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3">
              {{ t.settings?.theme || 'Theme' }}
            </h3>
            <button
              @click="toggleTheme"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <div class="flex items-center gap-3">
                <font-awesome-icon
                  :icon="isDark ? 'moon' : 'sun'"
                  class="text-lg"
                  :class="isDark ? 'text-blue-400' : 'text-amber-500'"
                />
                <span class="text-sm font-medium">
                  {{ isDark ? t.theme.dark : t.theme.light }}
                </span>
              </div>
              <div
                class="w-11 h-6 rounded-full relative transition-colors duration-200"
                :class="isDark ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'"
              >
                <div
                  class="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                  :class="isDark ? 'translate-x-6' : 'translate-x-1'"
                />
              </div>
            </button>
          </div>

          <!-- Font Size Section -->
          <div>
            <h3 class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3">
              {{ t.settings?.fontSize || 'Font Size' }}
            </h3>
            <div class="space-y-2">
              <button
                v-for="size in (['small', 'medium', 'large'] as const)"
                :key="size"
                @click="selectFontSize(size)"
                class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                :class="
                  fontSize === size
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-2 border-blue-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                "
              >
                <span>{{ fontSizeLabel(size) }}</span>
                <span
                  class="font-display"
                  :class="{
                    'text-xs': size === 'small',
                    'text-sm': size === 'medium',
                    'text-base': size === 'large',
                  }"
                >
                  Aa
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-center flex-shrink-0"
          :style="{ paddingBottom: `calc(1rem + env(safe-area-inset-bottom, 0px))` }"
        >
          <p class="text-xs text-slate-400 dark:text-slate-500">
            UNET {{ t.header.title }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
