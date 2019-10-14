<template>
  <div class="Dashboard">
    <!--<router-link to="/">Exit</router-link>-->
    <SideBar/>
    <Header/>
    <ColumnOne/>
    <div class="Dashboard-ColumnTwo">
    <br>
    <h3>Agregar Contacto</h3>
      <a href="/Contactos">Volver</a>
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
  name: 'Contactos-Agregar',
  components: {
    SideBar,
    Header,
    ColumnOne,
  },
};
</script>
