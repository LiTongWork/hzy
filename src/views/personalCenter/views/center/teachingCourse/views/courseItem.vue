<template>
  <div class="courseItem">
    <div class="header-wrapper">
      <div class="header-info">
        <div class="title">
          <span class="text">语文对口升学模拟冲刺卷</span>
          <span class="status">未发布</span>
        </div>
        <p>教师：<span>演示教师</span></p>
      </div>
      <div class="header-btn">
        <el-button>返回</el-button>
        <el-button class="dark-bg">修改发布范围</el-button>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="menu">
        <el-menu class="el-menu-vertical-demo" :default-openeds='openeds' @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <span class="title">课程信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" class="list-item"><router-link tag="span" :to="{name: 'basicInfo'}">基本信息</router-link></el-menu-item>
              <el-menu-item index="1-2" class="list-item"><router-link tag="span" :to="{name: 'coursePics'}">课程图片</router-link></el-menu-item>
              <el-menu-item index="1-3" class="list-item"><router-link tag="span" :to="{name: 'classManage'}">课时管理</router-link></el-menu-item>
              <el-menu-item index="1-4" class="list-item"><router-link tag="span" :to="{name: 'courseResManage'}">课程资源管理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span class="title">课程设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" class="list-item"><router-link tag="span" :to="{name: 'teacherSet'}">教师设置</router-link></el-menu-item>
              <el-menu-item index="2-2" class="list-item"><router-link tag="span" :to="{name: 'studentSet'}">学员设置</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span class="title">题库</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" class="list-item"><router-link tag="span" :to="{name: 'questionManage2'}">试题管理</router-link></el-menu-item>
              <el-menu-item index="3-2" class="list-item"><router-link tag="span" :to="{name: 'testManage2'}">试卷管理</router-link></el-menu-item>
              <el-menu-item index="3-3" class="list-item"><router-link tag="span" :to="{name: 'examManage'}">考试管理</router-link></el-menu-item>
              <el-menu-item index="3-4" class="list-item"><router-link tag="span" :to="{name: 'workManage'}">作业管理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span class="title">课程数据</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" class="list-item"><router-link tag="span" :to="{name: 'courseCount'}">课程统计</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content">
       <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'courseItem',
    data () {
      return {
        openeds: ['1', '2', '3', '4'],
        activeName: 0
      };
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .header-wrapper {
    font-size: 0;
    padding: 24px 30px;
    height: 72px;
    background-color: #fff;
    div {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .header-info {
    width: 50%;
    .title {
      .text {
        display: inline-block;
        vertical-align: middle;
        line-height: 38px;
        font-size: 20px;
      }
      .status {
        display: inline-block;
        vertical-align: middle;
        margin-left: 9px;
        padding: 0 7px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #fff;
        background-color: #FF6565;
        border-radius:12px;
      }
    }
    p {
      line-height: 34px;
      font-size: 16px;
    }
  }
  .header-btn {
    width: 50%;
    text-align: right;
  }
  .content-wrapper {
    margin-top: 10px;
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
  }
  .menu {
    flex: 0 0 270px;
    width: 270px;
  }
  .el-menu {
    color: #333;
    border: none;
    font-size: 18px;
    .title {
      font-size: 16px;
    }
    .el-menu-item {
      font-size: 16px;
      color: #666;
      padding: 0!important;
      &.is-active {
        color: #fff;
        background-color: #1ABC9C;
      }
      span {
        display: block;
        padding-left: 19px;
      }
    }
  }
  .content {
    flex: 1;
    margin-left: 10px;
  }
</style>
