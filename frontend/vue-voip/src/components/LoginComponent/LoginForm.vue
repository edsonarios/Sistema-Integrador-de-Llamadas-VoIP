<template>
  <div class="container-login">
    <div class="login-validate" v-show="isHidden">Usuario o password incorrectos</div>
    <form class="login-form">
      <div class="login-form-left">
        <img src="https://cdn.pixabay.com/photo/2019/07/14/16/27/pen-4337521_1280.jpg" alt="login" />
      </div>
      <div class="login-form-right">
        <label>Iniciar Sesión</label>
        <input class="login-form-right-text" type="text" placeholder="Username" ref="username"/>
        <input class="login-form-right-text" type="password" placeholder="Password" ref="password"/>
        <input @click="hidden" class="login-form-right-btn" type="button" value="Iniciar Sesión" />
      </div>
    </form>
  </div>
</template>

<script>
// import router from 'vue-router'
export default {
  name: 'loginForm',
  data() {
    return {
      isHidden: false,
    };
  },
  methods: {
    hidden() {
      const user = this.$refs.username.value;
      const password = this.$refs.password.value;
      if (user === 'admin' && password === 'admin') {
        this.$router.push('/dashboard');
      } else {
        this.isHidden = true;
      }
    },
  },
};
</script>
