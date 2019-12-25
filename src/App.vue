<template>
  <div id="app">
    <div>
      <b-navbar toggleable="md" type="dark" variant="dark" class="navbar navbar-dark bg-dark">
        <b-navbar-brand>
          <router-link to="/">
            <img id="navbar-icon" src="@/assets/logo-white.svg" alt="axiom-logo"/>
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle"></b-navbar-toggle>

        <b-collapse id="navbar-toggle" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/"> Home </b-nav-item>
            <b-nav-item to="/vpn"> VPN </b-nav-item>
            <b-nav-item to="/downloads"> Downloads </b-nav-item>
            <b-nav-item to="/ssh"> SSH Tools </b-nav-item>
            <b-nav-item to="/gradeCalc"> Grade Calculator </b-nav-item>
            <b-nav-item to="/notepad"> notepad </b-nav-item>
            <b-nav-item to="about" disabled> About </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto rightnavPad" v-if="this.$store.state.jwt != ''">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content"><em>{{ this.$store.state.username }}</em></template>
              <b-dropdown-item disabled href="#">Profile <span><font-awesome-icon :icon="['fas', 'user']"/></span></b-dropdown-item>
              <b-dropdown-item v-on:click="signout" href="#">Sign out <span><font-awesome-icon :icon="['fas', 'sign-out-alt']"/></span></b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto rightnavPad" v-else>
            <b-nav-item to="login" class="block">Login <span><font-awesome-icon :icon="['fas', 'sign-in-alt']"/></span></b-nav-item>
            <b-nav-item to="signup" class="bluePill">Sign up <span><font-awesome-icon :icon="['fas', 'user-plus']"/></span></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
    <b-alert v-model="this.$store.state.siteUpdateDowloaded" class="updateNeeded" variant="primary"><p @click="updateSite" class="text">Site update Avalible. Click here to update!!</p></b-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      async signout() {
        this.$axios.defaults.headers.common["Authorization"] ="Bearer" + " " + this.$store.getters.jwt;
        this.$axios.post(process.env.VUE_APP_API + "/auth/signout", {})
          .then(() => {
            this.$store.commit("setJWT", "");
            this.$store.commit("setUsername", "");
            this.$router.push("/?loggedout=true");
          })
          .catch(() => {
            this.$store.commit("setJWT", "");
            this.$store.commit("setUsername", "");
            this.$router.push("/?loggedout=true");
          });
      },
      updateSite() {
        this.$store.commit("setSiteUpdateDowloaded", false);
        this.$nextTick(() => {
          window.location.reload();
        });
      },
    },
    computed: {
    },
    created() {
      if (new Date() > new Date(this.$store.getters.jwtExpTime * 1000)) {
        this.signout();
      }
    }
  }
</script>

<style lang="scss">
  @import "plugins/custom.scss";
  @import "plugins/cards.scss";
  @import "plugins/viewPad.scss";

  #navbar-icon {
    height: 35px;
    width: auto;
  }
  @media only screen and (min-width: 768px) {
    .nav-link {
      display: initial;
    }
    .rightnavPad {
      margin-right: 2%;
    }
    .block a {
      display: block;
      padding-right: 1.5rem !important;
    }
  }
  .text {
    margin-bottom: 0px;
    cursor: pointer;
  }
  .router-link-exact-active {
    color: #fff !important;
  }
  .bluePill {
    background-color: #007bff;
    color: #6c757d !important;
    border-radius: 0.25em;
    padding: 0.5rem 0.3rem;
  }
  .updateNeeded {
    display: inline-block; 
    margin: 0 auto;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
