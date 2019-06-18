<template>
  <div class="testManage">
    <div class="header-wrapper">
      <div class="title">
        <span>试卷管理</span>
        <div class="fr">
          <el-button class="dark-bg">在线组卷</el-button>
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
          <el-button class="btnBatchOut dark-bg">批量删除</el-button>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="group">
        <el-button class="dark-bg">公开</el-button>
        <el-button>私有</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="试卷名称" prop="title" align="center"></el-table-column>
          <el-table-column label="课程" prop="course" align="center"></el-table-column>
          <el-table-column label="类型" prop="type" align="center">
            <template slot-scope="scope">
              {{ parseInt(scope.row.type) | filterType }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <div class="handle">
                <span class="text-color edit">编辑</span>
                <span class="text-color delete">删除</span>
                <span class="text-color info">分析</span>
              </div>
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
    name: 'testManage2',
    data () {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }
        ],
        value: '',
        tableData: [
          {
            title: '数学对口冲刺模拟冲刺卷1',
            course: '数学对口冲刺模拟冲刺卷1',
            type: 0,
            updateTime: '2019-03-08 16:19'
          },
          {
            title: '数学对口冲刺模拟冲刺卷1',
            course: '数学对口冲刺模拟冲刺卷1',
            type: 1,
            updateTime: '2019-03-08 16:19'
          },
          {
            title: '数学对口冲刺模拟冲刺卷1',
            course: '数学对口冲刺模拟冲刺卷1',
            type: 0,
            updateTime: '2019-03-08 16:19'
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      handleCurrentChange () {

      }
    },
    filters: {
      filterType (type) {
        if (parseInt(type) === 0) {
          return '期中'
        }
        if (parseInt(type) === 1) {
          return '期末'
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .testManage {
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
    .handle {
      span {
        cursor: pointer;
        padding: 3px 6px;
        font-size: 14px;
      }
    }
  }

</style>
