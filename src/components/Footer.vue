<template>
  <footer class="mx-auto w-full max-w-6xl px-4 pb-10" role="contentinfo">
    <div
      class="rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl px-6 py-6 shadow-lg"
    >
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span class="text-sm text-slate-600 dark:text-slate-300">
          © {{ new Date().getFullYear() }}
          <span class="font-semibold text-slate-900 dark:text-white"> Calculadora Notas UNET </span>
          . Todos los derechos reservados.
        </span>
        <ul class="flex flex-wrap items-center gap-6 text-sm">
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/danielurbina007"
              class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
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
              class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <font-awesome-icon :icon="['fab', 'github']" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
