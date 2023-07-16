<template>
  <div class="white pa-6 rounded in_to_content_full">
    <h1 class="title_page" v-text="'Appointments'" />

    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="5">
        <v-card class="pa-4">
          <v-card-title class="text-h5">Appointments</v-card-title>
          <v-card-text>
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
                    v-for="appointment in appointments"
                    :key="appointment.id"
                    :class="appointment.status"
                  >
                    <td>
                      {{ appointment.patient?.id || "-" }}
                    </td>
                    <td>
                      {{ appointment.doctor?.id || "-" }}
                    </td>
                    <td>{{ appointment.time || "-" }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="5">
        <v-card class="pa-4">
          <v-card-title class="text-h5">Optimize appointments</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Patient</th>
                    <th class="text-left">Doctor</th>
                    <th class="text-left">Time</th>
                    <th width="10%" class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="appointment in optimizeAppointments"
                    :key="appointment.id"
                    :class="appointment.status"
                  >
                    <td>
                      {{ appointment.patient?.id || "-" }}
                    </td>
                    <td>
                      {{ appointment.doctor?.id || "-" }}
                    </td>
                    <td>{{ appointment.time || "-" }}</td>
                    <td class="text-right">
                      <v-btn
                        @click="showInfo(appointment)"
                        :disabled="saveLoading"
                      >
                        Show info
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <b v-text="message" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn
        :loading="saveLoading"
        :disabled="saveLoading"
        class="mt-5"
        color="success"
        @click="save"
        >Save Data</v-btn
      >
      <v-spacer></v-spacer>
    </v-row>

    <appointment-info ref="appointmentInfo" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppointmentInfo from "@/components/dialogs/AppointmentInfo";

export default {
  layout: 'default',
  components: {
    AppointmentInfo
  },
  data() {
    return {
      saveLoading: false,
    }
  },
  computed: {
    ...mapGetters('appointments', ['appointments', 'optimizeAppointments']),
    message() {
      const greenCount = this.optimizeAppointments.filter(appointment => appointment.status === 'green').length;
      const blueCount = this.optimizeAppointments.filter(appointment => appointment.status === 'blue').length;
      const redCount = this.optimizeAppointments.filter(appointment => appointment.status === 'red').length;

      const greenCountMessage = greenCount <= 10 ? this.$i18n.t(`numbers.${greenCount}`) : greenCount;
      const blueCountMessage = blueCount <= 10 ? this.$i18n.t(`numbers.${blueCount}`) : blueCount;
      const redCountMessage = redCount <= 10 ? this.$i18n.t(`numbers.${redCount}`) : redCount;

      const greenMessage = this.$i18n.tc('appointments.green', greenCount, { count: greenCountMessage });
      const blueMessage = this.$i18n.tc('appointments.blue', blueCount, { count: blueCountMessage });
      const redMessage = this.$i18n.tc('appointments.red', redCount, { count: redCountMessage });

      let res = ''

      if (greenCount) res += greenMessage;
      if (blueCount) res += ` ${blueMessage}`;
      if (redCount) res += ` ${redMessage}`;


      return res.trim()
    }
  },
  async created() {
   await this.getAll();
  },
  methods: {
    ...mapActions('appointments', ['getAll', 'update']),
    async save() {
      this.saveLoading = true;
      const body =  this.optimizeAppointments.map(appointment => ({
          id: appointment.id,
          patient: appointment.patient?.id,
          doctor: appointment.doctor?.id,
          time: appointment.time,
          status: appointment.status,
        }))
      
      await this.update(body);
      await this.getAll();
      this.saveLoading = false;
    },
    showInfo(appointment) {
      console.log(appointment);
      this.$refs.appointmentInfo.open(appointment);
    },
  },

}
</script>
