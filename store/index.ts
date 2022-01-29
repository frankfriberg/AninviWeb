import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Event } from '~/../api/types/event.types'
import { Guest } from '~/../api/types/guest.types'

export interface RootState {
  event: Event
  guests: Guest[]
}

export const state = () => ({
  event: null,
  guests: [],
})

export const getters: GetterTree<RootState, RootState> = {
  event: (state) => state.event,
  guests: (state) => state.guests,
}

export const mutations: MutationTree<RootState> = {
  SET_EVENT: (state, event: Event) => (state.event = event),
  SET_GUESTS: (state, guests: Guest[]) => (state.guests = guests),
}

export const actions: ActionTree<RootState, RootState> = {
  getEventBySlug({ commit }, slug) {
    return this.$axios
      .get(`event/${slug}`)
      .then((response) => {
        return commit('SET_EVENT', response.data)
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
  getGuestsByEventId({ commit }, { eventId, token }) {
    return this.$axios
      .get(`/guest/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        commit('SET_GUESTS', data)
        return data
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
  updateGuest({ commit }, { guest, token }) {
    return this.$axios
      .put(`/guest/${guest._id}`, guest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        commit('SET_GUESTS', data)
        return data
      })
      .catch((err) => {
        throw new Error(err)
      })
  },
  deleteGuest({ commit }, { guestId, token }) {
    return this.$axios
      .delete(`/guest/${guestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        commit('SET_GUESTS', data)
        return data
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}
