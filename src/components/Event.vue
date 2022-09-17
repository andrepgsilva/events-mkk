<script lang="ts" setup>
  defineProps<{
    name: string
    cover: string
    price: string
    categoryName: string
  }>()
  </script>
  
<template>
  <b-card
    :title="name"
    :img-src="cover"
    :img-alt="name"
    img-top
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
      {{ price }}
    </b-card-text>

    <div class="d-flex justify-content-end">
      <b-button href="#" variant="primary">Buy Ticket</b-button>
    </div>
  </b-card>
</template>