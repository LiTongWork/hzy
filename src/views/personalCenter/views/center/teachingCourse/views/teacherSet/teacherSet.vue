<template>
  <div class="teacherSet">
    <div class="header-wrapper">
      <div class="title">
        <span>教师设置</span>
        <div class="fr">
          <el-button class="dark-bg">添加教师</el-button>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="title">已添加教师：</div>
      <div class="list">
        <ul>
          <li class="list-item" v-for="(item, index) in listData" :key="index">
            <span class="avatar"><img src="./img/timg.jpg" alt=""></span>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'teacherSet',
    data () {
      return {
        listData: [
          {
            avatar: './img/timg.jpg',
            name: '一二三四'
          },
          {
            avatar: './img/timg.jpg',
            name: '一二三四'
          }
        ]
      }
    },
    methods: {

    },
    filters: {

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .teacherSet {
    background-color: #f3f3f3;
  }
  .header-wrapper {
    padding: 0 20px;
    background-color: #fff;
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid rgb(229, 229, 229);
    }
    .title {
      height: 64px;
      line-height: 64px;
    }
  }
  .content-wrapper {
    padding: 15px 30px;
    background-color: #fff;
    .title {
      line-height: 44px;
    }
    .list-item {
      display: inline-block;
      margin-right: 60px;
      line-height: 60px;
      font-size: 0;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .avatar {
        margin-right: 9px;
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius:50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 16px;
      }
    }
  }

</style>
