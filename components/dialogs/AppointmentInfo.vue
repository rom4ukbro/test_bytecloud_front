<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        width="500"
        :value="dialog"
        @keydown.esc="close"
      >
        <template>
          <v-card>
            <v-card-title class="pa-0">
              <v-toolbar color="primary" class="fixed-bar">
                <v-toolbar-title class="ml-3 white--text">
                  Appointment Info
                </v-toolbar-title>
                <v-spacer />
                <v-btn icon @click="close" class="mr-3 white--text">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card-title>
            <v-card-text class="pa-12">
              <v-row> Patient: {{ patient }} </v-row>
              <v-row> Doctor: {{ doctor }} </v-row>
              <v-row> Appointment time: {{ appointment?.time }} </v-row>
              <v-row> Appointment status: {{ appointment?.status }} </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AppointmentInfo',
  data () {
    return {
      dialog: false,
      appointment: null,
      resolvePromise: undefined,
    }
  },
  computed: {
    patient () {
      const patient = this.appointment?.patient
      if (!patient) return null
      let res = `${patient.id}`
      if (patient.from && patient.to) res += `, ${patient.from}-${patient.to}`
      if (patient.name) res += `, ${patient.name}`
      if (patient.birthday) res += `, ${this.$moment(patient.birthday).format('DD.MM.YYYY')}`
      return res
    },
    doctor() {
      const doctor = this.appointment?.doctor
      if (!doctor) return null
      let res = `${doctor.id}`
      if (doctor.from && doctor.to) res += `, ${doctor.from}-${doctor.to}`
      if (doctor.name) res += `, ${doctor.name}`

      return res
    }
  },
  methods: {
    open (appointment) {
      this.appointment = appointment
      this.$nextTick(() => {
        this.dialog = true
      })
      return new Promise((resolve) => {
        this.resolvePromise = resolve
      })
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.appointment = null
      })
      this.resolvePromise(true)
    }
  }
}
</script>