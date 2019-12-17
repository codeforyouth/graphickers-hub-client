export const state = () => ({
  session: null,
  isLogin: false,
  ErrorMessage: null,
  isLoginError: false,
  isLoading: false
})

export const mutations = {
  setSession(state, graphicker) {
    state.isLoginError = false
    state.session = graphicker
  },
  setError(state, ErrorMessage) {
    state.isLoginError = true
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
  async loginGraphicker({ commit }, { name, password }) {
    commit('startLoading')
    await this.$axios
      .$post('/api/login', {
        name,
        password
      })
      .then((res) => {
        commit('setSession', res)
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
