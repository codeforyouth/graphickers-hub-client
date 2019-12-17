export const state = () => ({
  graphickers: [],
  graphicker: null,
  ErrorMessage: null,
  isError: false,
  isLoading: false
})

export const mutations = {
  setAll(state, graphickers) {
    state.isError = false
    state.graphickers = graphickers
  },
  setOne(state, graphicker) {
    state.isError = false
    state.graphicker = graphicker
  },
  setError(state, ErrorMessage) {
    state.isError = true
    state.ErrorMessage = ErrorMessage
  },
  startLoading(state) {
    state.isLoading = true
  },
  endLoading(state) {
    state.isLoading = false
  }
}

export const actions = {
  async fetchGraphickers({ commit }) {
    commit('startLoading')
    await this.$axios
      .$get('/api/graphickers')
      .then((res) => {
        commit('setAll', res)
      })
      .catch((err) => {
        if (err.response) {
          commit('setError', err.response.data)
        } else if (err.request) {
          commit('setError', err.request)
        } else {
          commit('setError', err.message)
        }
      })
    commit('endLoading')
  },
  async createGraphicker({ commit }, { name, email, password }) {
    commit('startLoading')
    await this.$axios
      .$post('/api/graphickers', {
        name,
        email,
        password
      })
      .then((res) => {
        commit('setOne', res)
      })
      .catch((err) => {
        if (err.response) {
          commit('setError', err.response.data)
        } else if (err.request) {
          commit('setError', err.request)
        } else {
          commit('setError', err.message)
        }
      })
    commit('endLoading')
  }
}
