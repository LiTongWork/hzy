<template>
  <div class="courseCount">
    <div class="title">
      <span>在教课程</span>
      <div class="fr">
        <el-button type="text">+添加课程</el-button>
      </div>
    </div>
    <div class="operating-btn">
      <el-button class="dark-bg">全部课程</el-button>
      <el-button>我创建的课程</el-button>
      <el-button>我参与的课程</el-button>
    </div>
    <div class="info">
      <div class="list">
        <ul>
          <li class="list-item" v-for="(item, index) in itemData" :key="index">
            <div class="logo">
              <img src="./img/course.jpg" alt="">
            </div>
            <div>
              <p class="name">{{item.title}}</p>
              <p class="desc">
                <span>学员数：{{item.studentNum}}</span>
                <span class="stand"></span>
                <span>{{ item.status | filterType }}</span>
              </p>
            </div>
            <div class="fr manageBtn">
              <router-link :to="{name: 'courseItem'}"><el-button class="dark-bg">管理</el-button></router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="paging">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'courseCount',
    data () {
      return {
        itemData: [
          {
            title: '语文对口升学模拟冲刺卷（1）',
            studentNum: 0,
            status: 0
          },
          {
            title: '语文对口升学模拟冲刺卷（1）',
            studentNum: 0,
            status: 0
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      }
    },
    filters: {
      filterType (type) {
        let _type = parseInt(type);
        if (_type === 0) {
          return '未发布'
        }
        if (_type === 1) {
          return '已发布'
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .courseCount {
    padding: 0 20px;
    background-color: #fff;
  }
  .title {
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid rgb(229, 229, 229);
  }
  .operating-btn {
    padding: 20px 0;
  }
  .list-item {
    margin-bottom: 20px;
    padding: 20px;
    height: 60px;
    font-size: 0;
    border: 1px solid rgb(229, 229, 229);
    & > div {
      display: inline-block;
      vertical-align: top;
      img {
        display: block;
      }
    }
    p {
      padding-left: 20px;
      &.name {
        line-height: 32px;
        font-size: 18px;
      }
      &.desc {
        margin-top: 5px;
        line-height: 16px;
        font-size: 16px;
        color: #999;
      }
      span {
        display: inline-block;
        vertical-align: top;
      }
      .stand {
        margin: 0 25px;
        width: 1px;
        height: 16px;
        background-color: rgb(229, 229, 229);
      }
    }
    .manageBtn {
      line-height: 60px;
      button {
        vertical-align: middle;
      }
    }
  }
</style>
