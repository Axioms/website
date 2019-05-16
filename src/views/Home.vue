<template>
  <div class="home">
    <div class="gb-border">
      <img id="mainImage" src="@/assets/logo-with-wings-dark.svg">
    </div>
    <p>Welcome to my site!</p>
  </div>
</template>

<script>
export default {
  
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

