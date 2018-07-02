<template>
  <div id="app">
    <div id="nav">
      <ul id="navbar">
        <li class="nav-item">
          <router-link class="nav" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Skills">Skills</router-link>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

</style>
<style src='@/assets/styles/navbar.css'>

</style>
