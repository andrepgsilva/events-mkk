<template>
  <div class="container d-flex flex-wrap justify-content-center">
    <div v-for="event in events" class="mr-lg-3 mr-md-3 mt-3">
      <Event
        :id="event.id"
        :name="event.name"
        :cover="event.cover"
        :price="event.price"
        :category="event.category"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Event from '~/components/Event.vue';

export default Vue.extend({
  name: 'HomePage',
  components: { Event },

  computed: {
    events () {
      return this.$store.getters['events/getEvents'];
    }
  },
});
</script>
