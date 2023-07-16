export default {
  redirect: {
    login: '/auth/login',
    logout: '/auth/login'
  },
  strategies: {
    local: {
      token: {
        property: 'token',
        global: true,
        required: true,
        type: 'Bearer',
        maxAge: 36000
      },
      user: {
        property: 'user',
        autoFetch: true
      },
      endpoints: {
        login: { url: 'auth/login', method: 'post' },
        logout: false,
        user: false
      },
      clientId: true,
      scope: true
    }
  }
}
