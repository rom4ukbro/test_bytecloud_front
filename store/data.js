export const state = () => ({})

export const mutations = {}

export const actions = {
  async createBulk({ }, payload) {
    return await this.$axios.$post('bulk', payload)
  },
  async clear() {
    return await this.$axios.$delete('clear', {})
  },
}

export const getters = {}
