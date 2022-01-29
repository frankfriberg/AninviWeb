import { join } from 'path'

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
  css: ['@/assets/css/main.css'],
  buildModules: ['@nuxt/postcss8', '@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios', '@nuxtjs/i18n', '@nuxtjs/auth-next'],
  serverMiddleware: {},
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
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
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/user',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 3600,
          global: true,
        },
        user: {
          property: false,
        },
        endpoints: {
          logout: {
            url: 'auth/logout',
            method: 'post',
          },
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: 'data.token',
          },
          user: {
            url: 'auth/user',
            method: 'get',
          },
        },
      },
    },
  },
  axios: {
    baseURL: process.env.API_URL,
  },
}
