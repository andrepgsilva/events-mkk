<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#">Events</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" tag="NuxtLink" to="/">Home</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div class="d-flex justify-content-center align-items-center">
          <NuxtLink to="/cart">
            <div class="d-flex justify-content-center align-items-center text-white-50 mr-2 position-relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff" class="bi bi-bag-fill" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
              </svg>
              <div class="bag-circle"><span>{{ cartSize }}</span></div>
            </div>
          </NuxtLink>
        </div>

        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#" @click="login">Login</b-dropdown-item>
          <!-- <b-dropdown-item href="#">Sign Out</b-dropdown-item> -->
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      productForSearch: '',
    };
  },

  computed: {
    cartSize() {
      return this.$store.getters['cart/getCartSize'];
    }
  },

  methods: {
    login() {
      this.$auth.loginWith('keycloak');
    },
  },
};
</script>

<style>
  .bag-circle {
    position: absolute;
    top: 13px;
    left:  12px;
    width: 20px;
    height: 20px;

    background: #000000d1;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bag-circle span {
    color: #fff;
  }
</style>
