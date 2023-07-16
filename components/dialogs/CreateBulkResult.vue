<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        width="800px"
        :value="dialog"
        scrollable
        @keydown.esc="close"
      >
        <template>
          <v-card>
            <v-card-title class="pa-0">
              <v-toolbar color="primary" class="fixed-bar">
                <v-toolbar-title class="ml-3 white--text">
                  Create bulk result
                </v-toolbar-title>
                <v-spacer />
                <v-btn icon @click="close" class="mr-3 white--text">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card-title>
            <v-card-text class="pa-12">
              <template v-if="patients.created.length">
                <h2>Created patients</h2>
                <v-simple-table small>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Time from</th>
                        <th class="text-left">Time to</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="patient in patients.created" :key="patient.id">
                        <td>{{ patient.id }}</td>
                        <td>{{ patient.from }}</td>
                        <td>{{ patient.to }}</td>
                        <td>{{ patient.name || "-" }}</td>
                        <td>
                          {{
                            patient.birthday
                              ? $moment(patient.birthday).format("DD.MM.YYYY")
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="patients.duplicated.length">
                <h2>Duplicated patients</h2>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Time from</th>
                        <th class="text-left">Time to</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="patient in patients.duplicated"
                        :key="patient.id"
                      >
                        <td>{{ patient._id }}</td>
                        <td>{{ patient.from }}</td>
                        <td>{{ patient.to }}</td>
                        <td>{{ patient.name || "-" }}</td>
                        <td>
                          {{
                            patient.birthday
                              ? $moment(patient.birthday).format("DD.MM.YYYY")
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="patients.invalidData.length">
                <h2>Invalid patients</h2>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Time from</th>
                        <th class="text-left">Time to</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="patient in patients.invalidData"
                        :key="patient.id"
                      >
                        <td>{{ patient._id || "-" }}</td>
                        <td>{{ patient.from || "-" }}</td>
                        <td>{{ patient.to || "-" }}</td>
                        <td>{{ patient.name || "-" }}</td>
                        <td>
                          {{
                            patient.birthday
                              ? $moment(patient.birthday).format("DD.MM.YYYY")
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="doctors.created.length">
                <h2>Created doctors</h2>
                <v-simple-table small>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Time from</th>
                        <th class="text-left">Time to</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="doctor in doctors.created" :key="doctor.id">
                        <td>{{ doctor.id }}</td>
                        <td>{{ doctor.from }}</td>
                        <td>{{ doctor.to }}</td>
                        <td>{{ doctor.name || "-" }}</td>
                        <td>
                          {{
                            doctor.birthday
                              ? $moment(doctor.birthday).format("DD.MM.YYYY")
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="doctors.duplicated.length">
                <h2>Duplicated doctors</h2>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Time from</th>
                        <th class="text-left">Time to</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="doctor in doctors.duplicated" :key="doctor.id">
                        <td>{{ doctor._id }}</td>
                        <td>{{ doctor.from }}</td>
                        <td>{{ doctor.to }}</td>
                        <td>{{ doctor.name || "-" }}</td>
                        <td>
                          {{
                            doctor.birthday
                              ? $moment(doctor.birthday).format("DD.MM.YYYY")
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="doctors.invalidData.length">
                <h2>Invalid doctors</h2>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Time from</th>
                        <th class="text-left">Time to</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="doctor in doctors.invalidData"
                        :key="doctor.id"
                      >
                        <td>{{ doctor._id || "-" }}</td>
                        <td>{{ doctor.from || "-" }}</td>
                        <td>{{ doctor.to || "-" }}</td>
                        <td>{{ doctor.name || "-" }}</td>
                        <td>
                          {{
                            doctor.birthday
                              ? $moment(doctor.birthday).format("DD.MM.YYYY")
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="appointments.created.length">
                <h2>Created appointments</h2>
                <v-simple-table small>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Patient</th>
                        <th class="text-left">Doctor</th>
                        <th class="text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="appointment in appointments.created"
                        :key="appointment.id"
                      >
                        <td>{{ appointment.patient }}</td>
                        <td>{{ appointment.doctor }}</td>
                        <td>{{ appointment.time }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="appointments.duplicated.length">
                <h2>Duplicated appointments</h2>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Patient</th>
                        <th class="text-left">Doctor</th>
                        <th class="text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="appointment in appointments.duplicated"
                        :key="appointment.id"
                      >
                        <td>{{ appointment.patient }}</td>
                        <td>{{ appointment.doctor }}</td>
                        <td>{{ appointment.time }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <br />
              <template v-if="appointments.invalidData.length">
                <h2>Invalid appointments</h2>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Patient</th>
                        <th class="text-left">Doctor</th>
                        <th class="text-left">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="appointment in appointments.invalidData"
                        :key="appointment.id"
                      >
                        <td>{{ appointment.patient }}</td>
                        <td>{{ appointment.doctor }}</td>
                        <td>{{ appointment.time }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template v-if="isEmpty">
                <div class="h4">Nothing to show</div>
              </template>
            </v-card-text>
            <v-card-actions class="justify-end"> </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CreateBulkResult',
  data () {
    return {
      dialog: false,
      result: {
        appointments: {
          invalidData: [],
          duplicated: [],
          created: [
            {
              patient: 101,
              doctor: 201,
              time: 10,
            },

          ]
        }, 
        doctors: {
          invalidData: [],
          duplicated: [],
          created: []
        },
        patients: {
          invalidData: [],
          duplicated: [],
          created: []
        }
      },
      resolvePromise: undefined,
    }
  },
  computed: {
    appointments () {
      return this.result.appointments
    },
    doctors () {
      return this.result.doctors
    },
    patients () {
      return this.result.patients
    },
    isEmpty () {
      for (const key in this.result) {
        for (const key2 in this.result[key]) {
          if (this.result[key][key2].length) {
            return false
          }
        }
      }
      return true
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
          appointments: {
            invalidData: [],
            duplicated: [],
            created: []
          }, 
          doctors: {
            invalidData: [],
            duplicated: [],
            created: []
          },
          patients: {
            invalidData: [],
            duplicated: [],
            created: []
          }
        }
      })
      this.resolvePromise(true)
    }
  }
}
</script>