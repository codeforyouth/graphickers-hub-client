export const state = () => ({
  portfolio: {
    id: 0,
    title: 'hoge',
    show: 'hogehoge',
    graphicker_id: 0
  },
  portfolios: [],
  CreateErrorMessage: null,
  isCreateError: false,
  isLoading: false
})

export const getters = {
  getId: (state) => state.portfolio
}

export const mutations = {
  startLoading(state) {
    state.isLoading = true
  },
  endLoading(state) {
    state.isLoading = false
  },
  setCreateError(state, ErrorMessage) {
    state.isCreateError = true
    state.CreateErrorMessage = ErrorMessage
  },
  setList(state, portfolios) {
    state.portfolios = portfolios
  },
  setOne(state, portfolio) {
    state.portfolio = portfolio
  }
}

export const actions = {
  async createPortfolios(
    { commit },
    { title, show, avatars, graphickerId, token }
  ) {
    commit('startLoading')

    let id = 0
    const portfolio = {
      title,
      show,
      graphicker_id: graphickerId
    }

    await this.$axios
      .$post('/api/portfolios', {
        portfolio,
        token
      })
      .then((res) => {
        commit('setOne', res)
        id = res.id
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

    // アバター処理
    if (avatars) {
      const formData = new FormData()
      formData.append('portfolio[graphicker_id]', graphickerId)
      formData.append('token', token)
      for (let i = 0; i < avatars.length; i++) {
        const avatar = avatars[i]
        formData.append('avatars[]', avatar)
      }
      await this.$axios
        .$put('/api/portfolios/' + id + '/avatars', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
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
    }

    // リスト再取得
    await this.$axios
      .$get('/api/graphickers/' + graphickerId + '/portfolios')
      .then((res) => {
        commit('setList', res)
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
  async fetchGraphickerPortfolios({ commit }, { graphickerId }) {
    commit('startLoading')
    await this.$axios
      .$get('/api/graphickers/' + graphickerId + '/portfolios')
      .then((res) => {
        commit('setList', res)
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
