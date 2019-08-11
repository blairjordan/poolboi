<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item><router-link tag="a" to="/">Home</router-link></b-nav-item>
        <b-nav-item><router-link tag="a" to="/pools">Pools</router-link></b-nav-item>
        <b-nav-item><router-link tag="a" to="/addpool">Add Pool</router-link></b-nav-item>
      </b-navbar-nav>
    </b-navbar >
    <b-container class="mt-3">
      <router-view/>
    <Footer />
    </b-container>
  </div>
</template>

<script>
import Footer from '@/views/Footer.vue';

export default {
  name: "App",
  components: {
    Footer
  }
}
</script>

<style>
html, body {
  height: 100%;
}

.nav-link a {
  color: hsla(0,0%,100%,.5);
}
.nav-link a:hover {
  color: hsla(0,0%,100%,.75);
  text-decoration: none;
}
</style>