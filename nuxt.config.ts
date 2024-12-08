// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    api_username: process.env.API_USERNAME || "tetsthis",
    api_password: process.env.API_PW
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  'css': ['~/assets/css/input.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/ui'],
})