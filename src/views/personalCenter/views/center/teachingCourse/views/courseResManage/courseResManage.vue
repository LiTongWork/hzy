<template>
  <div class="courseResManage">
    <div class="title">
      课程资源管理
    </div>
    <div class="operating-btn">
      <el-button class="dark-bg">批量下载</el-button>
      <el-button class="dark-bg">批量删除</el-button>
    </div>
    <div class="info">
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="名称" prop="title" align="center"></el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.type | filterType }}
            </template>
          </el-table-column>
          <el-table-column label="关联课时" prop="associatedClass" align="center"></el-table-column>
          <el-table-column label="下载量" prop="downloads" align="center"></el-table-column>
          <el-table-column label="浏览量" prop="pageView" align="center"></el-table-column>
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
    name: 'courseResManage',
    data () {
      return {
        tableData: [
          {
            title: '01表达思维.mp4',
            type: 0,
            associatedClass: '模拟冲刺卷1',
            downloads: 23,
            pageView: 20
          },
          {
            title: '02表达思维.mp4',
            type: 0,
            associatedClass: '模拟冲刺卷2',
            downloads: 23,
            pageView: 20
          },
          {
            title: '03表达思维.mp4',
            type: 0,
            associatedClass: '模拟冲刺卷3',
            downloads: 23,
            pageView: 20
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
          return '视频'
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .courseResManage {
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
</style>
