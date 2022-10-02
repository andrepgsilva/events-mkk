<script lang="ts" setup>
const props = defineProps<{
  id: number;
  name: string;
  cover: string;
  price: string;
  category: {
    id: number;
    name: string;
  };
}>();

function addToCart() {
  const event = {
    id: props.id,
    name: props.name,
    cover: props.cover,
    price: props.price,
    category: props.category,
  };

  $nuxt.$store.dispatch('cart/addToCart', event);
}
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
      {{ category.name }}
    </b-card-text>

    <b-card-text>
      {{ price }}
    </b-card-text>

    <div class="d-flex justify-content-end">
      <b-button href="#" variant="primary" @click="addToCart"
        >Buy Ticket</b-button
      >
    </div>
  </b-card>
</template>
