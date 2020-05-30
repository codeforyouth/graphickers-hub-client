export const state = () => ({
  graphicker: {
    id: 0,
    name: '名前',
    email: 'me@example.com',
    introduction: '自己紹介',
    equipment: '装備紹介',
    avatar_url: null,
    token: 'api-token'
  },
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
  setOne(state, graphicker) {
    state.isError = false
    state.graphicker = graphicker
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
      .$get('/graphickers')
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
  },
  async fetchGraphicker({ commit }, { id }) {
    commit('startLoading')
    await this.$axios
      .$get('/graphickers/' + id)
      .then((res) => {
        commit('setOne', res)
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
