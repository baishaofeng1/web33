<template>
  <div class="container">
      <MainNav />
      <router-view class="main-content"></router-view>
  </div>
</template>

<script>
import MainNav from "../components/MainVav"

export default {
  components:{
    MainNav
  }
}
</script>

<style>
.container{

}

.main-content{
  margin-left: 210px;
  margin-right: 10px;
  margin-top: 10px;
}
</style>