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
                  Clear result
                </v-toolbar-title>
                <v-spacer />
                <v-btn icon @click="close" class="mr-3 white--text">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card-title>
            <v-card-text class="pa-12">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Appointments</th>
                      <th class="text-left">Doctors</th>
                      <th class="text-left">Patients</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ result.appointments }}</td>
                      <td>{{ result.doctors }}</td>
                      <td>{{ result.patients }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-card-title class="text-h5">
                    Total:
                    {{ result.appointments + result.doctors + result.patients }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ClearResult',
  data () {
    return {
      dialog: false,
      result: {
        appointments: 0, 
        doctors: 0,
        patients: 0
      },
      resolvePromise: undefined,
    }
  },
  methods: {
    open (result) {
      this.result = result
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
        this.result = {
          appointments: 0, 
          doctors: 0,
          patients: 0
        }
      })
      this.resolvePromise(true)
    }
  }
}
</script>