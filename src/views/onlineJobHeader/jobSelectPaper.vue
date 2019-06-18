<template>
  <div class="selectPaper">
    <div class="btn">
      <el-button class="dark-border" :class="{active: btnCurrent === 0}" @click="changeBtnCurrent(0)">试卷库</el-button>
      <el-button class="dark-border" :class="{active: btnCurrent === 1}" @click="changeBtnCurrent(1)">我的试卷</el-button>
    </div>
    <div v-show="btnCurrent == 0" class="paperLib">
      <ul class="menu">
        <li class="course">
          <div class="title">课程：</div>
          <ol v-for="(item, index) in menuData.course.text" :key="index">
            <li :class="{'active': index === menuData.course.active}" @click="changeActive1(index)">{{item}}</li>
          </ol>
        </li>
        <li class="type">
          <div class="title">类型：</div>
          <ol v-for="(item, index) in menuData.type.text" :key="index">
            <li :class="{'active': index === menuData.type.active}" @click="changeActive2(index)">{{item}}</li>
          </ol>
        </li>
        <li class="source">
          <div class="title">来源：</div>
          <ol v-for="(item, index) in menuData.source.text" :key="index">
            <li :class="{'active': index === menuData.source.active}" @click="changeActive3(index)">{{item}}</li>
          </ol>
        </li>
      </ul>
      <div class="table">
        <p class="result">共搜索到34条记录</p>
        <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="试卷名称">
            <template slot-scope="scope">
              <span class="text-color">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="publisher" label="发布者"></el-table-column>
          <el-table-column align="center" prop="type" label="试卷应用类型"></el-table-column>
          <el-table-column align="center" prop="quantity" label="试题量"></el-table-column>
          <el-table-column align="center" prop="score" label="分数"></el-table-column>
          <el-table-column align="center" label="浏览量" sortable>
            <template slot-scope="scope">
              <div>
                {{scope.row.views}}次
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="releaseTime" label="发布时间" sortable></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <div class="handle">
                <el-button type="text" class="text-color">编辑</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-show="btnCurrent === 1" class="myPaper">
      <el-select v-model="value" placeholder="请选择">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <div class="selectStatus">
        <el-button class="dark-bg">公有</el-button>
        <el-button class="dark-border">私有</el-button>
      </div>
      <div class="tableMine">
        <el-table :data="tableDataMine" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="试卷名称">
            <template slot-scope="scope">
              <span class="text-color">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="course" label="课程"></el-table-column>
          <el-table-column align="center" prop="type" label="试卷类型"></el-table-column>
          <el-table-column align="center" prop="score" label="分数"></el-table-column>
          <el-table-column align="center" prop="time" label="组卷时间" sortable></el-table-column>
        </el-table>
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
    name: 'selectPaper',
    data () {
      return {
        btnCurrent: 0,
        menuData: {
          course: {
            active: 0,
            text: ['数学对口升学模拟冲刺卷1', '数学对口升学模拟冲刺卷2', '数学对口升学模拟冲刺卷3', '数学对口升学模拟冲刺卷4']
          },
          type: {
            active: 0,
            text: ['全部', '作业', '月考', '期中', '期末', '自定义']
          },
          source: {
            active: 0,
            text: ['全部', '理想校园']
          }
        },
        tableData: [
          {
            name: '数学对口升学模拟冲刺卷',
            publisher: '演示教师',
            type: '月考',
            quantity: 50,
            score: 60,
            views: 80,
            releaseTime: '2019-04-02 15:40'
          },
          {
            name: '数学对口升学模拟冲刺卷',
            publisher: '演示教师',
            type: '月考',
            quantity: 50,
            score: 60,
            views: 100,
            releaseTime: '2019-04-02 15:56'
          }
        ],
        tableDataMine: [
          {
            name: '数学对口冲刺模拟考月考1',
            course: '数学对口冲刺模拟考月考',
            type: '月考',
            score: 60,
            time: '2019-04-02 13:40'
          },
          {
            name: '数学对口冲刺模拟考月考2',
            course: '数学对口冲刺模拟考月考',
            type: '月考',
            score: 80,
            time: '2019-04-02 15:40'
          }
        ],
        options: [],
        value: '',
        currentPage: 1
      }
    },
    methods: {
      changeBtnCurrent (val) {
        this.btnCurrent = val
      },
      changeActive1 (index) {
        this.menuData.course.active = index;
      },
      changeActive2 (index) {
        this.menuData.type.active = index;
      },
      changeActive3 (index) {
        this.menuData.source.active = index;
      },
      handleSelectionChange (val) {
        this.multipleSelection = val;
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .selectPaper {
    padding: 20px;
    background-color: #f3f3f3;
  }
  .btn {
    .active {
      color: #fff;
      background-color: #1ABC9C;
    }
  }
  .menu {
    margin: 20px 0;
    padding: 1px 0 16px 0;
    background-color: #fff;
    font-size: 0;
    & > li {
      margin-top: 20px;
    }
    .title {
      display: inline-block;
      vertical-align: middle;
      width: 80px;
      line-height: 30px;
      font-size: 16px;
      text-align: right;
    }
    ol {
      display: inline-block;
      .active {
        color: #fff;
        background-color: #1ABC9C;
      }
      li {
        display: inline-block;
        margin: 0 10px;
        padding: 0 10px;
        vertical-align: middle;
        max-width: 180px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  .table {
    padding: 0 20px 20px;
    background-color: #fff;
    .result {
      line-height: 56px;
    }
  }
  .paging {
    padding: 30px;
    text-align: center;
  }
  .myPaper {
    margin-top: 30px;
    padding: 30px;
    background-color: #fff;
    .selectStatus {
      padding: 30px 0;
    }
  }
</style>
