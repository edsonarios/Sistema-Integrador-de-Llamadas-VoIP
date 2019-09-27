<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Login>

    </Login>
  </div>
</template>

<script>

import Login from './components/Login.vue'
import DashBoard from './components/DashBoard.vue'

export default {
  name: 'app',
  components: {
   Login,DashBoard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
