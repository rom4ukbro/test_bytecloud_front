export const state = () => ({
  appointments: [],
  optimizeAppointments: [],
})

export const mutations = {
  getAll(state, { appointments, optimizeAppointments }) {
    state.appointments = appointments
    state.optimizeAppointments = optimizeAppointments
  },
}

export const actions = {
  async getAll({ commit }) {
    try {
      const res = await this.$axios.$get('/appointments')
      commit('getAll', res)
    } catch (error) {
      console.error(error)
    }
  },
  async update({ }, data) {
    try {
      await this.$axios.$put('/appointments/bulk', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const getters = {
  appointments: state => state.appointments,
  optimizeAppointments: state => state.optimizeAppointments,
}
