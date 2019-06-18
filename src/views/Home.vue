<template>
  <div class="container">
    <el-container>
      <el-header height="84px">
        <Header></Header>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>

      <el-footer height="120px">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "home",
  components: {
    Header,
    Footer
  },
  mounted(){
    if(!localStorage.getItem('dataToken')){
      this.$router.push({name: 'login'})
    }
  }
};
</script>

<style lang="scss">
.container {
  min-width: 1200px;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
}
.login-input .el-input__inner {
  height: 60px;
  padding-left: 45px;
}
.select-box {
  // .el-checkbox-button:first-child .el-checkbox-button__inner {
  //   border-left: none;
  // }
  // .el-checkbox-button__inner {
  //   border: none;
  // }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: none;
  }
  .el-radio-button__inner {
    border: none;
    border-radius: 0;
  }
}
</style>
