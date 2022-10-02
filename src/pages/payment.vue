<template>
  <div class="container d-flex flex-wrap justify-content-center">
    <div>
      <!-- Mount the instance within a <label> -->
      <form id="payment-form">
        <div id="card-element"><!--Stripe.js injects the Card Element--></div>
        <button id="submit" class="payment-button">
          <div class="spinner invisible" id="spinner"></div>
          <span id="button-text" class="payment-button-text">Pay now</span>
        </button>
        <p id="card-error" role="alert"></p>
        <p class="result-message invisible">
          Payment succeeded, see the result in your
          <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to
          pay again.
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { stripeSetup } from '../custom/payment/stripe-flow';

export default Vue.extend({
  name: 'PaymentPage',
  components: {},

  mounted() {
    if (this.$stripe) {
      stripeSetup(this.$stripe, {
        cardElement: '#card-element',
        cardErrorElement: '#card-error',
        paymentButton: '.payment-button',
        paymentForm: '#payment-form',
        resultMessageElement: '.result-message',
        resultMessageLink: '.result-message > a',
        spinnerElement: '.spinner',
        buttonTextElement: '.payment-button-text',
      }, this.$auth.strategy.token.get());
    }
  },
});

</script>