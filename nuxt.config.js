// import colors from 'vuetify/es5/util/colors'
import i18n from './config/i18n'
import axios from './config/axios'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Test ByteCloud',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/main.js',
    '~/plugins/axios.js',
    '~/plugins/vuelidate.js',
    '~/plugins/lodash.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/i18n',
  ],

  i18n,

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios,

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    // customVariables: ['~/assets/reset.scss', '~/assets/variables.scss'],
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Rubik'
      }
    },
    theme: {
      themes: {
        light: {
          primary: '#222225',
          accent: '#21BF73',
          secondary: '#F4F4F4',
          lightgray: '#6D6D6D',
          black: '#121214',
          warning: '#EDCC58',
          bluelight: '#7CD0FF',
          error: '#FF7E7E',
          icongray: '#BBBBBB'
          // background: '#F4F4F4',
        },
        dark: {
          primary: '#222225',
          accent: '#21BF73',
          secondary: '#F4F4F4',
          lightgray: '#6D6D6D',
          warning: '#EDCC58',
          background: '#F4F4F4',
          black: '#121214',
          bluelight: '#7CD0FF',
          error: '#FF7E7E',
          icongray: '#BBBBBB'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
  },

}
