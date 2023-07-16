export const state = () => ({
  models: [],
  countModels: 1,
  options: {
    limit: 5,
    page: 1,
    sortBy: ['createdAt'],
    sortDesc: [true]
  },
  filters: {}
})

export const mutations = {
  findAll (state, { models, countModels }) {
    state.models = models
    state.countModels = countModels
  },
  setOptions (state, payload) {
    state.options = payload
  },
  setFilters (state, payload) {
    state.filters = payload
  }
}

export const actions = {
  async findAll ({ commit, getters }) {
    commit('findAll', await this.$axios.$get('/teams?' + getters.params))
  },
  setOptions ({ commit }, options) {
    commit('setOptions', options)
  },
  setFilters ({ commit }, filters) {
    commit('setFilters', filters)
  }
}

export const getters = {
  models: state => state.models,
  countModels: state => state.countModels,
  options: state => state.options,
  filters: (state) => {
    const filters = {}
    for (const [key, value] of Object.entries(state.filters)) {
      if (value != null && value !== '') {
        filters[key] = value
      }
    }
    return filters
  },
  params: (state, getters) => {
    let sort = []
    for (const index in state.options.sortBy) {
      sort.push((state.options.sortDesc[index] ? '-' : '') + state.options.sortBy[index])
    }
    sort = sort.length ? sort.join(' ') : '-createdAt'
    const urlSearchParams = new URLSearchParams(JSON.parse(JSON.stringify({
      limit: state.options.limit,
      page: state.options.page,
      sort,
      ...getters.filters
    })))
    return urlSearchParams.toString()
  },
  headers: () => [
    { text: '', value: 'status', width: '1%' },
    { text: 'ID', value: 'alias' },
    { text: 'Название', value: 'name' },
    { text: 'Участники', value: 'members' },
    { text: 'Вертикаль', value: 'vertical' },
    { text: 'Оборот', value: 'turnover' },
    { text: 'Расход', value: 'consumption' },
    { text: 'Прибыль', value: 'profit' },
    { text: '', value: 'action', width: '1%' },
    { text: '', value: 'menu', width: '1%' }
  ]
}
