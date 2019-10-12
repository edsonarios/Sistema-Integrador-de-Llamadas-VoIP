<template>
<div class="Dashboard-SideBar">
   <div class="Dashboard-SideBar-Salas">
      <nav>
        <ul>
          <li>
            <a href="#">
              <span>S1</span>
            </a>
           </li>
        <li>
          <a href="#">
             <span>S2</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span>S3</span>
          </a>
        </li>
        <li>
            <a href="#">
              <span>S5</span>
            </a>
        </li>
        <li>
           <a href="#">
             <span>S4</span>
           </a>
        </li>
         </ul>
     </nav>
  </div>
  <div class="Dashboard-SideBar-Options">
   <nav>
     <ul>
        <li>
           <a href="#">
              <font-awesome-icon icon="map-marked" />
           </a>
        </li>
        <li>
           <a href="#">
             <font-awesome-icon icon="cog" />
           </a>
       </li>
    </ul>
    </nav>
  </div>
</div>
</template>

<script>
// import router from 'vue-router'
export default {
  name: 'SideBar',
  methods: {
  },
};
</script>
