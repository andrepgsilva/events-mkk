<template>
  <div class="container d-flex flex-wrap justify-content-center">
    <h1>Your order has been finished!</h1>

    <b-button variant="success" class="mt-2" tag="nuxt-link" to="/">Go to Homepage</b-button>
  </div>
</template>

<script lang="ts">
import { RouterLinkStub } from '@vue/test-utils';
import Vue from 'vue';

export default Vue.extend({
  name: 'CartPage',
  components: {},

  computed: {},

  mounted() {
    if (this.$auth.loggedIn === false) {
      this.$auth.loginWith('keycloak');
    }
  }
});
</script>
