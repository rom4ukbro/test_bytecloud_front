<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :stateless="true"
      class="drawer__wrapper"
      app
      fixed
      floating
    >
      <v-list>
        <div
          v-for="(item, i) in menu"
          :key="i"
          :class="{ without_icon: !item.icon }"
        >
          <v-list-item :to="item.to" router exact :ripple="false">
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
      <template #append>
        <div class="d-flex align-center justify-space-between"></div>
      </template>
    </v-navigation-drawer>
    <v-main class="main__wrapper">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      title: 'Test ByteCloud',
    }
  },
  computed: {
    menu () {
      return [
        {
          title: 'Home',
          to: '/'
        },
        {
          title: 'Data',
          to: '/data'
        },
        {
          title: 'Appointments',
          to: '/appointments',
        },
      ]
    },
  }
}
</script>

<style lang="scss" scoped>
:deep(.v-toolbar__content) {
  height: 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0;
}
.v-toolbar__content a {
  text-decoration: none;
  color: black;
}
</style>
