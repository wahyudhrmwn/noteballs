<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <!-- <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28">
                </a> -->
        <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navbarMenuRef"
      >
        <div class="navbar-start">
          <button
          v-if="storeAuth.user.id" 
          class="button is-small is-info mt-3 ml-3 mb-4"
          @click="logout"
          >
            Log Out {{ storeAuth.user.email }}
          </button>
        </div>

        <div class="navbar-end">
          <router-link
            @click="showMobileNav = false"
            to="/"
            class="navbar-item"
            active-class="is-active"
          >
            Notes
          </router-link>

          <router-link
            @click="showMobileNav = false"
            to="/stats"
            class="navbar-item"
            active-class="is-active"
          >
            Stats
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/* 
mobile nav
*/
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useStoreAuth } from '@/stores/storeAuth';

/* STORE */
const storeAuth = useStoreAuth();

const showMobileNav = ref(false);

/*onclick outside*/
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(
  navbarMenuRef,
  (event) => {
    showMobileNav.value = false;
  },
  {
    ignore: [navbarBurgerRef],
  }
);

const logout = () => {
  showMobileNav.value = false;
  storeAuth.logoutUser();
}
</script>



<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>