import type { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Event } from '../../api/models'

export interface RootState {
  event: Event
}

export const state = () => ({
  event: null
})

export const getters: GetterTree<RootState, RootState> = {
  event: (state) => state.event,
  questions: (state) => state.event.questions,
}

export const mutations: MutationTree<RootState> = {
  SET_EVENT: (state, event: Event) => (state.event = event),
}

export const actions: ActionTree<RootState, RootState> = {
  getEventBySlug({ commit }, slug) {
    return this.$axios
      .get(`event/${slug}`)
      .then((response) => {
        console.log(response.data)
        return commit('SET_EVENT', response.data)
      })
      .catch((err) => { throw new Error(err)})
  },
}
