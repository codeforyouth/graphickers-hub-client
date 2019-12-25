export const state = () => ({
  graphickers: [],
  FetchErrorMessage: null,
  isFetchError: false,
  isLoading: false
})

export const mutations = {
  setAll(state, graphickers) {
    state.isError = false
    state.graphickers = graphickers
  },
  setFetchError(state, ErrorMessage) {
    state.isFetchError = true
    state.FetchErrorMessage = ErrorMessage
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
          commit('setFetchError', err.response.data)
        } else if (err.request) {
          commit('setFetchError', err.request)
        } else {
          commit('setFetchError', err.message)
        }
      })
    commit('endLoading')
  }
}
