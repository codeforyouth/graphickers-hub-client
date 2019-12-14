export const state = () => ({
  graphickers: [],
  isLoading: false
})

export const mutations = {
  setAll(state, graphickers) {
    state.graphickers = graphickers
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
    const graphickers = await this.$axios.$get('/api/graphickers')
    commit('setAll', graphickers)
    commit('endLoading')
  }
}
