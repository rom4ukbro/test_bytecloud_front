export default function ({ $axios, i18n }) {
  $axios.onRequest((config) => {
    config.headers.common['Accept-Language'] = i18n.locale
    config.headers.common["Access-Control-Allow-Origin"] = "*"
    config.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    config.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT"
  })
}
