<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "examination",
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.container {
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 0px;
  .selectType{
    .el-radio__input{
      display: none;
    }
    .is-checked{
      background-color: #5EBD9C;
      .el-radio__label{
        color:#FFF;
      }
    }
  }
}
.components-lists{
  .all{
    .el-checkbox__inner{
      background-color: #5EBD9C!important;
      border-color: #FFF!important;
    }
    .el-checkbox__label{
      color:#FFF!important;
    }
  }
  
}
</style>
