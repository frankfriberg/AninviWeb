export default {
  target: 'server',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/axios', '@nuxtjs/i18n'],
  serverMiddleware: {},
  build: {},
  i18n: {
    locales: [
      {
        code: 'no',
        file: 'no.js',
      },
      {
        code: 'en',
        file: 'en.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix',
    defaultLocale: 'no',
  },
  axios: {
    baseURL: process.env.API_URL,
  },
}
