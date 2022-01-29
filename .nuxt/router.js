import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6833382b = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _7bff0e88 = () => interopDefault(import('../pages/user/index.vue' /* webpackChunkName: "pages/user/index" */))
const _53434f0a = () => interopDefault(import('../pages/user/new.vue' /* webpackChunkName: "pages/user/new" */))
const _110a2472 = () => interopDefault(import('../pages/i/_event/index.vue' /* webpackChunkName: "pages/i/_event/index" */))
const _777e0064 = () => interopDefault(import('../pages/user/_event/index.vue' /* webpackChunkName: "pages/user/_event/index" */))
const _7f004d01 = () => interopDefault(import('../pages/user/_event/settings.vue' /* webpackChunkName: "pages/user/_event/settings" */))
const _c2e8d5d8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _6833382b,
    name: "login"
  }, {
    path: "/user",
    component: _7bff0e88,
    name: "user"
  }, {
    path: "/user/new",
    component: _53434f0a,
    name: "user-new"
  }, {
    path: "/i/:event",
    component: _110a2472,
    name: "i-event"
  }, {
    path: "/user/:event",
    component: _777e0064,
    name: "user-event"
  }, {
    path: "/user/:event/settings",
    component: _7f004d01,
    name: "user-event-settings"
  }, {
    path: "/",
    component: _c2e8d5d8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
