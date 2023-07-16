

export default {
  locales: [
    {
      name: 'English',
      code: 'en'
    },
  ],
  strategy: 'no_prefix',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: {
        numbers: {
          1: 'One',
          2: 'Two',
          3: 'Three',
          4: 'Four',
          5: 'Five',
          6: 'Six',
          7: 'Seven',
          8: 'Eight',
          9: 'Nine',
        },
        getNumber: '@:numbers.{number}',
        appointments: {
          green: '{count} green appointment. | {count} green appointments.',
          blue: '{count} blue appointment. | {count} blue appointments.',
          red: '{count} red appointment. | {count} red appointments.',
        }
      },
    }
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieCrossOrigin: true
  }
}
