<template>
  <div class="white pa-6 rounded in_to_content_full">
    <h1 class="title_page">Data</h1>
    <v-row>
      <v-col cols="4">
        <v-textarea
          v-model="patients"
          label="Patients"
          variant="solo-filled"
          rows="20"
          no-resize
        ></v-textarea>
      </v-col>
      <v-col cols="4">
        <v-textarea
          v-model="doctors"
          label="Doctors"
          variant="outlined"
          rows="20"
          no-resize
        ></v-textarea>
      </v-col>
      <v-col cols="4">
        <v-textarea
          v-model="appointments"
          label="Appointments"
          variant="outlined"
          rows="20"
          no-resize
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn
        :loading="sendLoading"
        :disabled="sendLoading"
        class="mr-2"
        color="success"
        @click="save"
        >Send Data</v-btn
      >
      <v-btn
        :loading="clearLoading"
        :disabled="clearLoading"
        class="ml-2"
        color="error"
        @click="clear"
        >Clear DB</v-btn
      >
      <v-spacer></v-spacer>
    </v-row>

    <create-bulk-result ref="createBulkResult" />
    <clear-result ref="clearResult" />
  </div>
</template>

<script lang="ts">
  import { mapActions } from "vuex";
  import CreateBulkResult from "@/components/dialogs/CreateBulkResult.vue";
  import ClearResult from "@/components/dialogs/ClearResult.vue";

  const defaultValues = {
    patients: "",
    doctors: "",
    appointments: "",
    sendLoading: false,
    clearLoading: false,
  };

  export default {
    components: {
      CreateBulkResult,
      ClearResult,
    },
    data(): typeof defaultValues {
      return {
        ...defaultValues,
      };
    },
    created() {
      for (const key of Object.keys(defaultValues) as Array<
        keyof typeof defaultValues
      >) {
        // @ts-ignore
        this[key] = defaultValues[key];
      }
    },
    watch: {
      patients: {
        handler(val) {
          this.patients = this.normalizeString(val);
        },
        immediate: true,
      },
      doctors: {
        handler(val) {
          this.doctors = this.normalizeString(val);
        },
        immediate: true,
      },
      appointments: {
        handler(val) {
          this.appointments = this.normalizeString(val);
        },
        immediate: true,
      },
    },
    methods: {
      ...mapActions({
        sendData: "data/createBulk",
        clearDB: "data/clear",
      }),
      async save() {
        this.sendLoading = true;

        const patients = this.parsePatientOrDoctors(this.patients);
        const doctors = this.parsePatientOrDoctors(this.doctors);
        const appointments = this.parseAppointments(this.appointments);

        try {
          const res = await this.sendData({
            patients,
            doctors,
            appointments,
          });
          this.$nextTick(() => {
            for (const key in defaultValues) {
              // @ts-ignore
              this[key] = defaultValues[key];
            }
          });

          // @ts-ignore
          await this.$refs.createBulkResult.open(res);
        } catch (e) {
          console.error(e);
        }
        this.sendLoading = false;
      },
      async clear() {
        try {
          this.clearLoading = true;
          const res = await this.clearDB();
          // @ts-ignore
          await this.$refs.clearResult.open(res);
        } catch (error) {
          console.error(error);
        }
        this.clearLoading = false;
      },
      parsePatientOrDoctors(str: string) {
        str = this.normalizeString(str);
        if (!str) return [];

        const arr = str.split("\n").map((item) => item.split(","));
        const result: {
          _id: number;
          from: number;
          to: number;
          name?: string;
          birthday?: string;
        }[] = [];

        for (const item of arr) {
          const _id = parseInt(item[0]);
          const time = item[1]?.split("-")?.map((item) => parseInt(item));
          const nameOrBirthday = item[2]?.trim();
          const birthday = item[3]?.trim();

          const obj: {
            _id: number;
            from: number;
            to: number;
            name?: string;
            birthday?: string;
          } = {
            _id,
            from: time?.[0],
            to: time?.[1],
          };

          if (nameOrBirthday && !birthday) {
            if (this.$moment(nameOrBirthday, "DD.MM.YYYY").isValid()) {
              obj.birthday = this.$moment(nameOrBirthday, "DD.MM.YYYY").format(
                "YYYY-MM-DD"
              );
            } else {
              obj.name = nameOrBirthday;
            }
          } else {
            obj.name = nameOrBirthday;
          }
          if (birthday) {
            obj.birthday = this.$moment(birthday, "DD.MM.YYYY").format(
              "YYYY-MM-DD"
            );
          }

          result.push(obj);
        }

        return result;
      },
      parseAppointments(str: string) {
        str = this.normalizeString(str);
        if (!str) return [];

        const arr = str.split("\n").map((item) => item.split(","));
        const result: {
          patient: number;
          doctor: number;
          time: number;
        }[] = [];

        for (const item of arr) {
          const patient = parseInt(item[0]);
          const doctor = parseInt(item[1]);
          const time = parseInt(item[2]);

          result.push({
            patient,
            doctor,
            time,
          });
        }

        return result;
      },
      normalizeString(str: string) {
        return str
          .trim()
          .replace(/^\s*$(?:\r\n?|\n)/gm, "")
          .split("\n")
          .map((v) => v.trim())
          .join("\n");
      },
    },
  };
</script>

<style>
textarea {
  background-color: #f5f5f5;
  border-radius: 5px;
  resize: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.5s ease;
}
</style>
