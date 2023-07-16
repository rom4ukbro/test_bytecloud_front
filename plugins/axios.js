export default function ({ $axios, i18n }) {
  $axios.onRequest((config) => {
    config.headers.common['Accept-Language'] = i18n.locale
  })
}
