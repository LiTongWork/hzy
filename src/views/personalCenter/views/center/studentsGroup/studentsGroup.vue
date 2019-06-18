<template>
  <div class="studentsGroup">
    <div class="header-wrapper">
      <div class="title">
        <span>学生分组</span>
        <div class="fr">
          <el-button class="dark-border" @click="openMask">管理群组</el-button>
          <el-button class="dark-bg">添加学生</el-button>
        </div>
        <div class="mask" v-show="showFlag">
          <div class="mask-item">
            <h3>管理群组<i @click="closeMask" class="el-icon-close fr"></i></h3>
            <div class="details-content">
              <div class="addBtn">
                <span>添加群组：</span>
                <el-input class="smallHeight" v-model="input" placeholder="请输入内容"></el-input>
                <span><el-button class="dark-border">添加群组</el-button></span>
              </div>
              <div class="groupList">
                <span>所有群组：</span>
                <ul>
                  <li>
                    <span>群组名称</span>
                    <span>20</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>10</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>30</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>30</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>30</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>30</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>30</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>30</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                  <li>
                    <span>群组名称</span>
                    <span>30</span>
                    <div>
                      <el-button type="text" class="text-color">编辑</el-button>
                      <el-button type="text" class="text-color">删除</el-button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="select-wrapper">
        <el-select class="smallHeight" v-model="value" placeholder="考试">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select class="smallHeight" v-model="value" placeholder="全部类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select class="smallHeight" v-model="value" placeholder="全部课程">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="fr">
          <el-button class="btnBatchOut dark-bg">批量移出</el-button>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="group">
        <el-button class="dark-bg">群组</el-button>
        <el-button>群组</el-button>
        <el-button>群组</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="学生姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="学号" prop="studentNum" align="center"></el-table-column>
          <el-table-column label="电话" prop="phoneNum" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text">移出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="20">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'studentsGroup',
    data () {
      return {
        showFlag: false,
        input: '',
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }
        ],
        value: '',
        tableData: [
          {
            name: '张三',
            studentNum: 111111111,
            phoneNum: 12345678901
          },
          {
            name: '张三',
            studentNum: 111111111,
            phoneNum: 12345678901
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      openMask () {
        this.showFlag = true;
      },
      closeMask () {
        this.showFlag = false;
      },
      handleCurrentChange () {

      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .studentsGroup {
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
    .title, .select-wrapper {
      height: 64px;
      line-height: 64px;
    }
    .select-wrapper {
      .el-select {
        width: 200px;
      }
    }
  }
  .content-wrapper {
    padding: 0 20px;
    background-color: #fff;
    margin-top: 10px;
    .group {
      padding: 20px 0 30px;
    }
    .list {
      border: 1px solid rgb(229, 229, 229);
      border-bottom: none;
    }
    .batchOut {
      cursor: pointer;
      padding: 3px 6px;
      font-size: 14px;
      color: #1ABC9C;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
  .mask-item {
    margin: 5% auto;
    padding-bottom: 10px;
    width: 840px;
    background-color: #fff;
    h3 {
      position: relative;
      line-height: 50px;
      text-align: center;
      background-color: #1ABC9C;
      color: #fff;
      i::before {
        position: absolute;
        right: 0;
        width: 50px;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .details-content {
      padding: 20px;
      background-color: #fff;
      .addBtn {
        display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
        display: -moz-box; /* Firefox 17- */
        display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
        display: -moz-flex; /* Firefox 18+ */
        display: -ms-flexbox; /* IE 10 */
        display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
        .el-input {
          flex: 1;
          margin-right: 10px;
        }
      }
      .groupList {
        display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
        display: -moz-box; /* Firefox 17- */
        display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
        display: -moz-flex; /* Firefox 18+ */
        display: -ms-flexbox; /* IE 10 */
        display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
        span {
          line-height: 38px;
        }
        ul {
          flex: 1;
          max-height: 350px;
          overflow-y: auto;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: normal;
          li {
            display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
            display: -moz-box; /* Firefox 17- */
            display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
            display: -moz-flex; /* Firefox 18+ */
            display: -ms-flexbox; /* IE 10 */
            display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
            margin-bottom: 10px;
            line-height: 38px;
            text-align: center;
            border: 1px solid rgb(229, 229, 229);
            span, div {
              flex: 1;
            }
          }
        }
      }
    }
  }
</style>
