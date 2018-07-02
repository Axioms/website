<template>
  <div id="content" class="Skills">
    <div class="holder">
      <ul>
        <li v-for="(data, index) in Skills" :key='index'> {{ index }}, {{ data.skill }}</li>
      </ul>

      <p v-if="Skills.length >= 1"> You Have more then One Skills </p>
      <p v-else> You have no Skills </p>
    </div>
    {{ name }}

    {{ btnState ? 'The button is disabled' : 'The Button is active' }}

    <button v-on:click="changeName" v-bind:disabled="btnState">Change Name</button>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  data()  {
    return {
      name : 'etc',
      btnState : false,
      Skills : [
        {"skill" : "Vue.js"},
        {"skill" : "Frontend Developer"},
        {"skill" : "Vue.js"},
        {"skill" : "Vue.js"}
      ],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Skills.css" scoped></style>
