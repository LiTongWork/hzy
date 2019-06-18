<template>
  <div class="createdTest">
    <div class="header-wrapper">
      <div class="title">
        <span>创建的试卷</span>
        <div class="select-wrapper fr">
          <el-select class="smallHeight" v-model="test" placeholder="作业试卷">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="试卷名称" prop="title" align="center">
            <template slot-scope="scope">
              <span class="text-color">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程" prop="course" align="center"></el-table-column>
          <el-table-column label="类型" align="center" width="100">
            <template slot-scope="scope">
              {{ parseInt(scope.row.type) | filterType }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" prop="updateStart" align="center"></el-table-column>
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
    name: 'createdTest',
    data () {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }
        ],
        test: '',
        tabType: 0,
        tableData: [
          {
            title: '数学对口冲刺模拟冲刺卷1',
            type: 0,
            updateStart: '2019-03-02 14:00',
            course: '数学对口冲刺模拟冲刺卷1'
          },
          {
            title: '数学对口冲刺模拟冲刺卷2',
            type: 1,
            updateStart: '2019-03-02 14:00',
            course: '数学对口冲刺模拟冲刺卷1'
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
  .createdTest {
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
