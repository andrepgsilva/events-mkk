function userAuthenticatedCheck() {
  if ($nuxt.$store.state.auth.loggedIn === false) {
    return $nuxt.$auth.loginWith('keycloak');
  }
}

export const state = () => ({
  cart: [],
});

export const getters = {
  getCart(state: any) {
    return state.cart;
  },
};

export const mutations = {
  setCart(state: any, payload: any) {
    state.cart = payload;
  },
};

export const actions = {
  async addToCart({ state, dispatch, commit }: { state: any, dispatch: any, commit: any }, payload: any) {
    userAuthenticatedCheck();

    commit('setCart', [...state.cart, payload]);
  },

  async proceedPurchase({ state, dispatch, commit }: { state: any, dispatch: any, commit: any }, payload: any) {
    userAuthenticatedCheck();
    
    try {
      const data = {
        'user': {
          'email': $nuxt.$auth.user.email,
          'name': $nuxt.$auth.user.email,
        },

        'cart': state.cart
      };

      // await this.$http.$post('http://example.com', data);
      Promise.resolve();
      commit('setCart', []);

      this.$router.push('/order-finished');

    } catch(error) {
      console.log('Something went wrong...')
    }
  }
};