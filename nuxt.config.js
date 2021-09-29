import colors from 'vuetify/es5/util/colors'
import si from './localization/si.json'
import en from './localization/en.json'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Router base for GitHub Pages
  router: {
    // TODO: nastavi nazaj na /sovinc.com/
    base: '/',
    trailingSlash: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sovinc.com',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      // {name: 'format-detection', content: 'telephone=no'},
      {name: 'theme-color', content: '#1565c0'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'animate.css/animate.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-gtag',}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/i18n',
      {
        baseUrl: 'https://sovinc.com',
        locales: [
          {
            code: 'sl',
            iso: 'sl-SI',
            name: 'Slovenščina'
          },
          {
            code: 'en',
            iso: 'en',
            name: 'English'
          }
        ],
        defaultLocale: 'sl',
        strategy: 'prefix',
        vueI18n: {
          fallbackLocale: 'sl',
          silentTranslationWarn: process.env.NODE_ENV === 'production',
          messages: {
            si,
            en
          }
        }
      }
    ],
    [
      '@nuxtjs/recaptcha',
      {
        siteKey: "6LckRXAcAAAAAJZBXZHcVVUoGSS7Nnc-KGBJkKt4",
        version: 3
      }
    ],
    [
      '@nuxtjs/axios'
    ]
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken3,
          accent: colors.pink.darken2,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // TODO: a to kaj dela
    publicPath: '/assets/',
  },

}
