<template>
  <div class="Dashboard">
    <!--<router-link to="/">Exit</router-link>-->
    <SideBar/>
    <Header/>
    <ColumnOne/>
    <div class="Dashboard-ColumnTwo">
    <br>
    <h3>Historial de Llamadas</h3>
    <br>
    <ul>
      <li>Formularios</li>
      <li>Listas</li>
      <li>Cuentas</li>
      <li>Historial de Llamadas</li>
    </ul>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/DashboardComponent/SideBar.vue';
import Header from '@/components/DashboardComponent/Header.vue';
import ColumnOne from '@/components/DashboardComponent/ColumnOne.vue';
export default {
  name: 'Historial-Llamadas',
  components: {
    SideBar,
    Header,
    ColumnOne,
  },
};
</script>
