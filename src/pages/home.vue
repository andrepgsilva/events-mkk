<template>
  <div class="container d-flex flex-wrap justify-content-center">
    <div v-for="event in events" class="mr-lg-3 mr-md-3 mt-3">
      <Event
        :id="event.id"
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
  name: 'HomePage',
  components: { NuxtLogo, Event },

  computed: {
    events () {
      // @ts-ignore
      return this.$store.getters['events/getEvents'];
    }
  },

  mounted() {
    console.log(this.$auth.loggedIn);
  }
});
</script>
