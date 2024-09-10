import Aura from '@primevue/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    "@primevue/nuxt-module"
  ],
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  primevue: {
    autoImport: true,
    options: {
      theme: {
          preset: Aura
      }
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }


})
