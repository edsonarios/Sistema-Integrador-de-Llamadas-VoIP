<template>
  <div class="login">
    <div class="login-header">
      <h2>PATELECOM</h2>
    </div>
    <LoginForm />
    <div class="login-footer">
      <h4>{{ year }} Patelecom</h4>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginComponent/LoginForm.vue';

export default {
  name: 'login',
  components: {
    LoginForm,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
