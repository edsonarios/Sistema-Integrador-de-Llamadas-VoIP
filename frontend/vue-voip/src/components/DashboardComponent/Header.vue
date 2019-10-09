<template>
  <div class="Dashboard-Header">
    <form class="Header-form">
        <input class="Header-form-text" type="text" name="Busqueda">
    </form>
    <nav>
       <li>
         <a href="/Contactos">
           Contactos
         </a>
       </li>
       <li>
          <a href="#">
          Cuenta
         </a>
        </li>
         <li>
            <a href="/Historial">
           Historial de Llamadas
         </a>
        </li>
    </nav>
  </div>
</template>

<script>
// import router from 'vue-router'
export default {
  name: 'Header',
  methods: {
  },
};
</script>
