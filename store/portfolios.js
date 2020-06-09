export const state = () => ({
  portfolio: {
    id: 0,
    title: '',
    show: '',
    place: '',
    event_date: '',
    graphicker_id: 0,
    avatars_url: []
  },
  portfolios: [],
  ErrorMessage: null,
  isError: false,
  isLoading: false
})

export const getters = {
  getId: (state) => state.portfolio.id,
  getTitle: (state) => state.portfolio.title,
  getShow: (state) => state.portfolio.show,
  getPlace: (state) => state.portfolio.place,
  getEventDate: (state) => state.portfolio.event_date,
  getAvatars: (state) => state.portfolio.avatars_url
}

export const mutations = {
  startLoading(state) {
    state.isLoading = true
  },
  endLoading(state) {
    state.isLoading = false
  },
  setError(state, ErrorMessage) {
    state.isError = true
    state.ErrorMessage = ErrorMessage
  },
  setList(state, portfolios) {
    state.portfolios = portfolios
  },
  setOne(state, portfolio) {
    state.portfolio = portfolio
  },
  initData(state) {
    state.portfolio = {
      id: 0,
      title: '',
      show: '',
      place: '',
      event_date: '',
      graphicker_id: 0,
      avatars_url: []
    }
  },
  setTitle(state, title) {
    state.portfolio.title = title
  },
  setShow(state, show) {
    state.portfolio.show = show
  },
  setPlace(state, place) {
    state.portfolio.place = place
  },
  setEventDate(state, eventDate) {
    state.portfolio.event_date = eventDate
  }
}

export const actions = {
  async createPortfolios(
    { commit },
    { title, show, place, eventDate, graphickerId, token }
  ) {
    commit('startLoading')

    const portfolio = {
      title,
      show,
      place,
      event_date: eventDate,
      graphicker_id: graphickerId
    }

    await this.$axios
      .$post('/portfolios', {
        portfolio,
        token
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
  },
  async fetchPortfolio({ commit }, { id }) {
    commit('startLoading')
    await this.$axios
      .$get('/portfolios/' + id)
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
  },
  async updatePortfolio(
    { commit },
    { title, show, place, eventDate, id, graphickerId, token }
  ) {
    commit('startLoading')

    const portfolio = {
      title,
      show,
      place,
      event_date: eventDate,
      graphicker_id: graphickerId
    }

    await this.$axios
      .$put('/portfolios/' + id, {
        portfolio,
        token
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
  },
  async destroyPortfolio({ commit }, { id, graphickerId, token }) {
    commit('startLoading')

    const portfolio = {
      graphicker_id: graphickerId
    }

    await this.$axios
      .$delete('/portfolios/' + id, {
        data: {
          portfolio,
          token
        }
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
  async appendPortfolioImage({ commit }, { id, avatar, graphickerId, token }) {
    commit('startLoading')

    const formData = new FormData()
    formData.append('portfolio[graphicker_id]', graphickerId)
    formData.append('avatar', avatar)
    formData.append('token', token)

    await this.$axios
      .$put('/portfolios/' + id + '/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
  async deletePortfolioImage(
    { commit },
    { id, avatarIndex, graphickerId, token }
  ) {
    commit('startLoading')

    const portfolio = {
      graphicker_id: graphickerId
    }

    await this.$axios
      .$delete('/portfolios/' + id + '/avatar/' + avatarIndex, {
        data: {
          portfolio,
          token
        }
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
  async fetchGraphickerPortfolios({ commit }, { graphickerId }) {
    commit('startLoading')
    await this.$axios
      .$get('/graphickers/' + graphickerId + '/portfolios')
      .then((res) => {
        commit('setList', res)
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
