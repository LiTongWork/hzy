<template>
  <div class="uploadResource">
    <div class="header-wrapper">
      <div class="title">
        上传的资源
      </div>
    </div>
    <div class="content-wrapper">
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="资源名称" prop="title" align="center">
            <template slot-scope="scope">
              <span class="text-color">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="格式" align="center" width="100">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column label="上传时间" prop="uploadTime" align="center"></el-table-column>
        </el-table>
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'uploadResource',
    data () {
      return {
        tabType: 0,
        tableData: [
          {
            title: '表达思维.mp4',
            type: 0,
            uploadTime: '2019-03-02 14:00'
          },
          {
            title: '表达思维.mp4',
            type: 1,
            uploadTime: '2019-03-02 14:00'
          }
        ],
        search: '',
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

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .uploadResource {
    padding: 0 20px;
    background-color: #fff;
  }
  .title {
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid rgb(238, 238, 238);
  }
  .content-wrapper {
    margin-top: 29px;
    padding: 0 10px;
    .list {
      border: 1px solid #f3f3f3;
      border-bottom: none;
    }
  }
</style>
