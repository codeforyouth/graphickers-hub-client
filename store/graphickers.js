export const state = () => ({
  list: [],
  isLoading: false
})

export const mutations = {
  setAll(state, list) {
    state.list = list
  },
  startLoading(state) {
    state.isLoading = true
  },
  endLoading(state) {
    state.isLoading = false
  }
}

export const actions = {
  fetchGraphickers({ commit }) {
    commit('startLoading')
    commit('setAll', generateGraphickersList())
    commit('endLoading')
  }
}

function generateGraphickersList() {
  return [
    {
      id: 'sensu_watson',
      name: '渡辺 賢1',
      introduction: 'Code for Nagoya, Aichi, Youthで活躍中。'
    },
    {
      id: 'sensu_watson2',
      name: '渡辺 賢2',
      introduction: 'Code for Nagoya, Aichi, Youthで活躍中。'
    },
    {
      id: 'sensu_watson3',
      name: '渡辺 賢3',
      introduction: 'Code for Nagoya, Aichi, Youthで活躍中。'
    }
  ]
}
