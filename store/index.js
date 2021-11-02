export const state = () => {
  client: []
}

export const mutations = {
  SET_CLIENT(state, client) {
    state.client = client
  },
}

export const actions = {
  getClientBySlug({ commit, error }, slug) {
    return this.$axios
      .get(`client/${slug}`)
      .then((client) => commit('SET_CLIENT', client.data.data))
  },
}

export const getters = {
  client: (state) => state.client,
  guests: (state) => state.client.guests,
  questions: (state) => state.client.questions,
}
