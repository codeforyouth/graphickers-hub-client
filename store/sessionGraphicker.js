export const state = () => ({
  graphicker: {
    id: 0,
    name: '名前',
    email: 'me@example.com',
    introduction: '自己紹介',
    avatar_url: null,
    token: 'api-token'
  },
  isLogin: false,
  ErrorMessage: null,
  isLoginError: false,
  isUpdateError: false,
  isLoading: false
})

export const getters = {
  getId: (state) => state.graphicker.id,
  getName: (state) => state.graphicker.name,
  getEmail: (state) => state.graphicker.email,
  getIntroduction: (state) => state.graphicker.introduction,
  getToken: (state) => state.graphicker.token,
  getAvatar: (state) => state.graphicker.avatar_url
}

export const mutations = {
  setSession(state, graphicker) {
    state.isLoginError = false
    state.graphicker = graphicker
    this.$cookies.set('session', graphicker)
    state.isLogin = true
  },
  removeSession(state) {
    state.isLoginError = false
    state.graphicker = {
      id: 0,
      name: '名前',
      email: 'me@example.com',
      introduction: '自己紹介',
      token: 'api-token'
    }
    this.$cookies.remove('session')
    state.isLogin = false
  },
  setError(state, ErrorMessage) {
    state.isLoginError = true
    state.ErrorMessage = ErrorMessage
    state.isLogin = false
  },
  startLoading(state) {
    state.isLoading = true
  },
  endLoading(state) {
    state.isLoading = false
  },
  setSessionFromCookie(state) {
    state.graphicker = this.$cookies.get('session') || state.graphicker
    state.isLogin = !!state.graphicker.id
  },
  updateGraphicker(state, graphicker) {
    state.ErrorMessage = null
    state.isUpdateError = false
    state.graphicker = graphicker
    this.$cookies.set('session', graphicker)
  },
  updateGraphickerAvatar(state, avatarUrl) {
    state.graphicker.avatar_url = avatarUrl
  }
}

export const actions = {
  async loginGraphicker({ commit }, { name, password }) {
    commit('startLoading')
    await this.$axios
      .$post('/login', {
        name,
        password
      })
      .then((res) => {
        commit('setSession', res)
      })
      .catch((err) => {
        if (err.response) {
          commit('setError', err.response.data.error)
        } else if (err.request) {
          commit('setError', err.request)
        } else {
          commit('setError', err.message)
        }
      })
    commit('endLoading')
  },
  async logoutGraphicker({ commit }, { id, token }) {
    commit('startLoading')
    commit('removeSession')
    await this.$axios.$post('/logout', {
      id,
      token
    })
    commit('endLoading')
  },
  loadCurrentSession({ commit }) {
    commit('setSessionFromCookie')
  },
  async createGraphicker(
    { commit },
    { name, email, password, passwordConfirmation }
  ) {
    commit('startLoading')
    await this.$axios
      .$post('/graphickers', {
        graphicker: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation
        }
      })
      .catch((err) => {
        if (err.response) {
          commit('setSignUpError', err.response.data)
        } else if (err.request) {
          commit('setSignUpError', err.request)
        } else {
          commit('setSignUpError', err.message)
        }
      })
    commit('endLoading')
  },
  async updateGraphicker(
    { commit },
    { id, email, introduction, newPassword, newPasswordConfirmation, token }
  ) {
    commit('startLoading')
    const graphicker = {}

    // API指定の形式に変換。
    // falsyな値は格納しない。
    if (email) {
      graphicker.email = email
    }
    if (introduction) {
      graphicker.introduction = introduction
    }
    if (newPassword) {
      graphicker.password = newPassword
    }
    if (newPasswordConfirmation) {
      graphicker.password_confirmation = newPasswordConfirmation
    }

    await this.$axios
      .$put('/graphickers/' + id, {
        graphicker,
        id,
        token
      })
      .then((res) => {
        commit('updateGraphicker', res)
      })
      .catch((err) => {
        if (err.response) {
          commit('setUpdateError', err.response.data)
        } else if (err.request) {
          commit('setUpdateError', err.request)
        } else {
          commit('setUpdateError', err.message)
        }
      })

    commit('endLoading')
  },
  async updateGraphickerAvatar({ commit }, { id, avatar, token }) {
    commit('startLoading')

    if (avatar) {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('token', token)
      formData.append('avatar', avatar)
      await this.$axios
        .$put('/graphickers/' + id + '/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
          commit('updateGraphickerAvatar', res)
        })
        .catch((err) => {
          if (err.response) {
            commit('setUpdateError', err.response.data)
          } else if (err.request) {
            commit('setUpdateError', err.request)
          } else {
            commit('setUpdateError', err.message)
          }
        })
    }

    commit('endLoading')
  }
}
