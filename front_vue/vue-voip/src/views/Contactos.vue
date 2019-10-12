<template>
  <div class="Dashboard">
    <!--<router-link to="/">Exit</router-link>-->
    <SideBar/>
    <Header/>
    <ColumnOne/>
    <div class="Dashboard-ColumnTwo">
    <br>
    <h3>Contactos</h3>
    <a href="/ContactosAgregar">Agregar Contacto</a>
    <br>
    <ul>
      <li>Contacto 1</li>
      <li>Contacto 2</li>
      <li>Contacto 3</li>
      <li>Contacto 4</li>
    </ul>
    <br>
    <br>

  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/DashboardComponent/SideBar.vue';
import Header from '@/components/DashboardComponent/Header.vue';
import ColumnOne from '@/components/DashboardComponent/ColumnOne.vue';
export default {
  name: 'Contactos',
  components: {
    SideBar,
    Header,
    ColumnOne,
  },
};
</script>
