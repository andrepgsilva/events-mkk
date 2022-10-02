require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'src',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxt/http',
    ['nuxt-stripe-module', {
      publishableKey: process.env.STRIPE_KEY,
    }],
  ],

  auth: {
    strategies: {
      local: false,
      keycloak: {
        scheme: "oauth2",
        endpoints: {
          authorization:
            process.env.KEYCLOAK_API_URL +
            "auth/realms/test-realm/protocol/openid-connect/auth",
          token:
            process.env.KEYCLOAK_API_URL +
            "auth/realms/test-realm/protocol/openid-connect/token",
          userInfo:
            process.env.KEYCLOAK_API_URL +
            "auth/realms/test-realm/protocol/openid-connect/userinfo",
          logout:
            process.env.KEYCLOAK_API_URL +
            "auth/realms/test-realm/protocol/openid-connect/logout?redirect_uri=" +
            encodeURIComponent("http://localhost:3000/"),
        },
        token: {
          property: "access_token",
          type: "Bearer",
          name: "Authorization",
          maxAge: 300,
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: "code",
        grantType: "authorization_code",
        clientId: "test-client",
        scope: ["openid", "profile", "email"],
        codeChallengeMethod: "S256",
      },
    },
    redirect: {
      logout: '/',
      home: '/',
      callback: '/home',
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
