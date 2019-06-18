<template>
<div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: ''}">在线作业</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- <div class="search-box">
        <el-input placeholder="Xxxxxxxxx" v-model="searchs" clearable class="search-input"></el-input>
        <el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
      </div> -->
      <div class="buttons">
        <router-link :to="{ name: 'jobNewTest' }"  v-if="loginType==2"><el-button type="primary" size="small" plain >新建作业</el-button></router-link>
      </div>
    </div>
    <div class="row-line" style="height:20px;"></div>
    <div class="list-area">
      <div class="list-box">
        <p style="color:#666;">
          共搜索到
          <span style="color:red;">{{tableData.length}}</span> 条记录
        </p>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" prop="examName" label="作业名称" width="300"></el-table-column>
          <el-table-column align="center" prop="passScore" label="及格分数" v-if="loginType==2"></el-table-column>
          <el-table-column align="center" prop="goodScore" label="优秀分数" v-if="loginType==2"></el-table-column>
          <el-table-column align="center" prop="edit" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editExam(scope.row.id)" v-if="loginType==2">编辑</el-button>
              <el-button type="text" size="small" @click="deleteExam(scope.row.id)" v-if="loginType==2">删除</el-button>
              <el-button type="text" size="small" @click="getExamWorkList(scope.row)" v-if="loginType==3">开始作业</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page-area">
      <div class="page-box">
        <el-pagination
          background
          prev-text="上一页"
          next-text="下一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="rows"
          layout="prev, pager, next,total, sizes, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'onlineJobIndex',
    data () {
      return {
        page: 1,
        rows: 10,
        total: 0,
        tableData: [],
        loginType: localStorage.getItem('loginType'),
        examStatus: ''
      }
    },
    methods: {
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`);
        this.rows = val
        this.getTableDataList()
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`);
        this.page = val
        this.getTableDataList()
      },
      //改变时间格式
      changeTime1(row, column){
        // console.log(row.createTime.replace('T',' ').split('.')[0])
        return row.startTime.replace('T',' ').split('.')[0]
      },
      changeTime2(row, column){
        // console.log(row.createTime.replace('T',' ').split('.')[0])
        return row.endTime.replace('T',' ').split('.')[0]
      },
      //改变状态
      // changeStatus(row, column){
      //   return row.status==0?'未开始':row.status==1?'已开始':'已结束'
      // },
      //删除试卷
      deleteExam(id){
        // console.log(id)
        this.$confirm('此操作不可恢复, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let param = {
                  id: id
              }
              this.$http
                .post("/ExamWork/Delete", param)
                .then(res => {
                  // console.log(res.data);
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.getTableDataList()
                })
              
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
      },
      editExam(id){
        this.$router.push({name: 'jobNewTest', params: {examId: id}})
      },
      //获取 在线考试/作业
      getTableDataList(){
        if(this.loginType==2){//老师
          let param = {
            page: this.page,
            rows: this.rows,
            workType: 2
        }
        this.$http
          .post("/ExamWork/PageList", param)
          .then(res => {
            // console.log(res.data.data);
            this.total = res.data.data.records //total
            this.tableData = res.data.data.list
          })
        }
        if(this.loginType==3){//学生
          let param = {
            page: this.page,
            rows: this.rows,
            workType: 2
          }
          this.$http
          .post("/ExamWork/StudentPageList", param)
          .then(res => {
            // console.log(res.data.data);
            this.total = res.data.data.records //total
            this.tableData = res.data.data.list
          })
        }

      },
      //开始考试
      getExamWorkList(val){
        // console.log(val)
        localStorage.setItem('examWorkStart',JSON.stringify(val) )
        // console.log(localStorage.getItem('examWorkStart' ));return false;
        let param = {
          "paperId":val.paperId, //--试卷id
          "id":val.id, //--考试id
        }
        this.$http
          .post("/ExamWork/ExamWorkList", param)
          .then(res => {
            // console.log(res.data);return false
            if(res.data.code==403){
              this.$message({
                type: 'info',
                message: '作业已经结束'
              })
              return false; 
              
            }else{
              this.$router.push({name: 'jobReadOver'})
            }
            
          })
        
      }
      
    },
    mounted(){
      this.getTableDataList()//获取 在线考试/作业
    }
    
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .nav {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  .separator {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    .item {
      margin-left: 10px;
    }
    .icon {
      width: 13px;
      height: 20px;
    }
  }
  .search-box {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    .search-input {
      width: 680px;
    }
  }
  .buttons {
    button {
      margin-left: 20px;
    }
  }
}
.row-line,
.select-area,
.list-area,
.page-area {
  width: 100%;
  background-color: #f2f3f3;
  box-sizing: border-box;
}
.select-box {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
  height: 170px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-direction: column;
  & > li {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    span {
      margin: 0 10px;
    }
    .el-checkbox-button {
      margin-left: 20px;
    }
  }
}
.list-box {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 20px;
  background-color: #fff;
}
.page-box {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 20px;
  text-align: center;
}

.separator {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  .item {
    margin-left: 10px;
  }
  .icon {
    width: 13px;
    height: 20px;
  }
}
</style>
