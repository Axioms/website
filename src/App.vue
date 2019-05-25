<template>
  <div id="app">
    <div>
      <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand>
          <router-link to="/">
            <img id="navbar-icon" src="@/assets/logo-white.svg" alt="axiom-logo">
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle"></b-navbar-toggle>

        <b-collapse id="navbar-toggle" is-nav>
          <b-navbar-nav>

            <b-nav-item to="/"> Home </b-nav-item>
            <b-nav-item to="/vpn"> VPN </b-nav-item>
            <b-nav-item to="/downloads"> Downloads </b-nav-item>
            <b-nav-item to="/ssh"> SSH Tools </b-nav-item>
            <b-nav-item to="/"> Home </b-nav-item>
            <b-nav-item to="about"> About </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  @import 'plugins/custom.scss';
  #navbar-icon {
    height: 35px;
    width: auto;
  }
  @media only screen and (min-width: 768px) {
    .nav-link  {
      display: initial;
    }
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .ssh {
    padding-top: 8%;
  }
  .card {
		width: 100%;
		padding-bottom: 5%;
		border: none;
}
  .card-header {
    text-align: left;
  }
  .vpn {
    padding-top: 4%;
  }
  .header-5 {
    font-size: 2em;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  .d-icon {
    font-size: 2em;
    text-align: center;
    padding-top: 1.0em;
  }
</style>
