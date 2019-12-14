export const state = () => ({
  session: {
    id: 0,
    name: '',
    email: '',
    introduction: '',
    token: ''
  },
  isLoading: false
})

export const mutations = {
  setSession(state, graphicker) {
    state.session.id = graphicker.id
    state.session.name = graphicker.name
    state.session.email = graphicker.email
    state.session.introduction = graphicker.introduction
    state.session.token = graphicker.token
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
    const graphicker = await this.$axios.$post('/api/login', {
      name,
      password
    })
    commit('setSession', graphicker)
    commit('endLoading')
  }
}
