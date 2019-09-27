<template>
  <div id="app">
    <Login></Login>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import DashBoard from "./components/DashBoard.vue";


export default {
  name: "app",
  components: {
    Login,
    DashBoard
  }
};
</script>


<style lang="scss">
@import "./sass/main.scss";
</style>
