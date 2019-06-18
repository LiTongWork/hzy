<template>
  <div class="courseCount">
    <div class="title">
      <span>作业管理</span>
      <div class="fr">
        <el-button class="dark-bg">新建考试</el-button>
      </div>
    </div>
    <div class="info">
      <el-tabs type="card" class="content-tab" @tab-click="selectType">
        <el-tab-pane label="全部"></el-tab-pane>
        <el-tab-pane label="未开始"></el-tab-pane>
        <el-tab-pane label="考试中"></el-tab-pane>
        <el-tab-pane label="批阅中"></el-tab-pane>
        <el-tab-pane label="待发布"></el-tab-pane>
        <el-tab-pane label="结果"></el-tab-pane>
      </el-tabs>
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="作业名称" align="center">
            <template slot-scope="scope">
              <span class="text-color">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{ parseInt(scope.row.type) | filterType }}
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="createdDate" align="center"></el-table-column>
          <el-table-column label="开始时间" prop="dateStart" align="center"></el-table-column>
          <el-table-column label="结束时间" prop="dateEnd" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <div class="handle">
                <span class="edit"><i class="el-icon-edit"></i>编辑</span>
                <span class="delete"><i class="el-icon-delete"></i>删除</span>
                <span class="info">考试信息</span>
              </div>
            </template>
          </el-table-column>
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
    name: 'courseCount',
    data () {
      return {
        tableData: [
          {
            title: '数学对口冲刺模拟冲刺卷1',
            type: 1,
            createdDate: '2019-03-02',
            dateStart: '2019-03-02 14:00',
            dateEnd: '2019-03-02 16:00'
          },
          {
            title: '数学对口冲刺模拟冲刺卷2',
            type: 2,
            createdDate: '2019-03-02',
            dateStart: '2019-03-02 14:00',
            dateEnd: '2019-03-02 16:00'
          },
          {
            title: '数学对口冲刺模拟冲刺卷3',
            type: 3,
            createdDate: '2019-03-02',
            dateStart: '2019-03-02 14:00',
            dateEnd: '2019-03-02 16:00'
          },
          {
            title: '数学对口冲刺模拟冲刺卷3',
            type: 4,
            createdDate: '2019-03-02',
            dateStart: '2019-03-02 14:00',
            dateEnd: '2019-03-02 16:00'
          },
          {
            title: '数学对口冲刺模拟冲刺卷3',
            type: 5,
            createdDate: '2019-03-02',
            dateStart: '2019-03-02 14:00',
            dateEnd: '2019-03-02 16:00'
          }
        ],
        currentPage: 1
      }
    },
    methods: {
      selectType (tab) {
        this.tabType = tab.index;
        console.log(this.tabType);
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      }
    },
    filters: {
      filterType (type) {
        if (parseInt(type) === 0) {
          return '全部'
        }
        if (parseInt(type) === 1) {
          return '未开始'
        }
        if (parseInt(type) === 2) {
          return '考试中'
        }
        if (parseInt(type) === 3) {
          return '批阅中'
        }
        if (parseInt(type) === 4) {
          return '待发布'
        }
        if (parseInt(type) === 5) {
          return '结束'
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
  .info {
    .content-tab {
      margin-top: 29px;
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
        i {
          margin-right: 3px;
          color: #1ABC9C;
        }
        &.info {
          color: #fff;
          background-color: #1ABC9C;
          border-radius:3px;
        }
        &.edit, &.delete {
          visibility:hidden;
        }
      }
      &:hover span {
        visibility: unset;
      }
    }
  }
</style>
