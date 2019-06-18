<template>
    <div class="separator">
        <img src="../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'examinationList'}" v-if="status=='list'">试卷库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'onlineTest'}" v-if="status=='online'">在线组卷</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'manual'}" v-if="status=='m'">手动组卷</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'intelligence'}"  v-if="status=='auto'">智能组卷</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'preview'}" v-if="status=='preview'">试卷预览</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
  name: "breadcrumb",
  data(){
    return{
      
    }
  },
  props: ['status']
};
</script>

<style lang="scss" scoped>
.separator {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    .item {
      margin-left: 10px;
    }
    .icon {
      width: 13px;
      height: 20px;
    }
  }
</style>
