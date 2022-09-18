<template>
  <div class="container d-flex flex-wrap justify-content-center">
    <button @click="login">Login</button>
    <div v-for="event in events" class="mr-lg-3 mr-md-3 mt-3">
      <Event
        :name="event.name"
        :cover="event.cover"
        :price="event.price"
        :category-name="event.category_name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NuxtLogo from '~/components/NuxtLogo.vue';
import Event from '~/components/Event.vue';

export default Vue.extend({
  name: 'IndexPage',
  components: { NuxtLogo, Event },

  computed: {
    events () {
      return this.$store.getters['events/getEvents'];
    }
  },

  methods: {
    login() {
      this.$auth.loginWith("keycloak");
    }
  }
});
</script>
