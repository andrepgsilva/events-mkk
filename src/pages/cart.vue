<template>
  <div class="container d-flex flex-wrap justify-content-center">
    <div class="d-flex flex-column w-100">
      <div>
        <b-table responsive :items="items" :fields="fields"></b-table>
      </div>
      <div class="d-flex flex-wrap justify-content-end mt-2">
        <b-button variant="success" @click="proceedPurchase">Proceed With Purchase</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CartPage',
  components: {},

  data() {
      return {
        fields: [
          // A regular column
          'name',
          'cover',
          'price',
          
          {
            // A regular column with custom formatter
            key: 'category',
            formatter: (value: any) => {
              return value.name;
            }
          },
        ],
      }
    },

  computed: {
    items() {
      return this.$store.getters['cart/getCart'];
    }
  },

  methods: {
    proceedPurchase() {
      $nuxt.$store.dispatch('cart/proceedPurchase');
    }
  },

  mounted() {
    if (this.$auth.loggedIn === false) {
      this.$auth.loginWith('keycloak');
    }
  }
});
</script>
