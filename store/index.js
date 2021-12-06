export const state = () => {
  event: []
}

export const mutations = {
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  getEventBySlug({ commit, error }, slug) {
    return this.$axios
      .get(`event/${slug}`)
      .then((event) => {
        console.log(event.data)
        return commit('SET_EVENT', event.data)
      })
      .catch((err) => error(err))
  },
}

export const getters = {
  event: (state) => state.event,
  questions: (state) => state.event.questions,
}
