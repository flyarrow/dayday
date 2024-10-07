// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@element-plus/nuxt'
  ],

  elementPlus: {
    /** Options */
  },

  runtimeConfig: {
    public: {
      LEANCLOUD_APP_ID: process.env.LEANCLOUD_APP_ID,
      LEANCLOUD_APP_KEY: process.env.LEANCLOUD_APP_KEY,
      LEANCLOUD_SERVER_URL: process.env.LEANCLOUD_SERVER_URL
    }
  },

  compatibilityDate: '2024-10-06',

  plugins: [
    { src: '~/plugins/leancloud', mode: 'client' }
  ]
})