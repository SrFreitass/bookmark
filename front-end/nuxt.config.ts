import Aura from '@primevue/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    "@primevue/nuxt-module", 
    '@nuxtjs/google-fonts',
  ],
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  googleFonts: {
    preconnect: true,
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700]
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