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
  getId: (state) => state.portfolio.id,
  getTitle: (state) => state.portfolio.title,
  getShow: (state) => state.portfolio.show
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
  },
  setTitle(state, title) {
    state.portfolio.title = title
  },
  setShow(state, show) {
    state.portfolio.show = show
  }
}

export const actions = {
  async createPortfolios({ commit }, { title, show, graphickerId, token }) {
    commit('startLoading')

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
  },
  async updatePortfolio({ commit }, { title, show, id, graphickerId, token }) {
    commit('startLoading')

    const portfolio = {
      id,
      title,
      show,
      graphicker_id: graphickerId
    }

    await this.$axios
      .$put('/api/portfolios/' + id, {
        portfolio,
        token
      })
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
  },
  async fetchPortfolio({ commit }, { id }) {
    commit('startLoading')
    await this.$axios
      .$get('/api/portfolios/' + id)
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
