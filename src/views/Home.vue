<template>
  <div class="home">
    <div class="gb-border">
      <img id="mainImage" src="@/assets/logo-with-wings-dark.svg">
    </div>
    <p>{{ welcomeMessage }}</p>
    <b-container>
      <b-row>
        <b-col class="alert">
          <b-alert :show="isSignedout" variant="info" dismissible fade> You have been Signed out </b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
      data() {
      return {
        isSignedout: false,
        welcomeMessage: '',
      }
    },
    methods: {
      weightedRand(spec) {
        var i, j, table=[];
        for (i in spec) {
          // The constant 10 below should be computed based on the
          // weights in the spec for a correct and optimal table size.
          // E.g. the spec {0:0.999, 1:0.001} will break this impl.
          for (j=0; j<spec[i]*10; j++) {
            table.push(i);
          }
        }
        return function() {
          return table[Math.floor(Math.random() * table.length)];
        }
      }
    },
    mounted() {
      if(this.$route.query.loggedout == "true") {
        this.isSignedout = true;
      }
    },
    created() {
      var rand012 = this.weightedRand({"Welcome to my site!":0.4, "I get bored and make things :/":0.30, "This website has some tools I thought were neat!":0.15, "I need more of these :/":0.1, "Feeling Lucky?":0.05});
      this.welcomeMessage = rand012();
    }
  }
</script>

<style lang="scss" scoped>
.home {
  padding-top: 8%;
}
.gb-border {
  border-bottom: 1px solid transparent;
  -moz-border-image: -moz-linear-gradient(right, rgba(0, 0, 0, 0) 4%, #c6c6c6 40%, rgba(0, 0, 0, 0) 96%);
  -webkit-border-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0) 4%, #c6c6c6 40%, rgba(0, 0, 0, 0) 96%);
  border-image: linear-gradient(to right, rgba(0, 0, 0, 0) 4%, #c6c6c6 40%, rgba(0, 0, 0, 0) 96%);
  border-image-slice: 1;
}
#mainImage {
  height: auto;
  width: 60%;

}
p {
  font-size: 4rem;
  font-family: 'Ubuntu', sans-serif;
}
.alert {
  margin-top: 2%;
}
/*
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
*/
</style>

