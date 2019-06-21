<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: ''}">试卷库</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      
      <!-- <div class="search-box">
        <el-input placeholder="请输入试卷名称" v-model="searchs" clearable class="search-input"></el-input>
        <el-button type="primary" icon="el-icon-search" size="medium" @click="search">搜索</el-button>
      </div> -->
      <div class="buttons">
        <!-- <el-button type="primary" size="small" plain @click="select">选课</el-button> -->
        <el-button type="primary" size="small" plain @click="online" v-if="loginType==2">在线组卷</el-button>
      </div>
    </div>
    <div class="row-line" style="height:20px;"></div>
    <div class="select-area">
      <ul class="select-box">
        <li>
          <span>课程:</span>
          <el-radio-group v-model="check1" size="small" @change="changeClass">
            <el-radio-button v-for="(item, index) in classes" :label="item.id" :key="index">{{item.courseName}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>类型:</span>
          <el-radio-group v-model="check2" size="small" @change="changeType">
            <el-radio-button v-for="(item, index) in types" :label="index+1" :key="index">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>来源:</span>
          <el-radio-group v-model="check3" size="small">
            <el-radio-button v-for="(item, index) in source" :label="index+1" :key="index">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
      </ul>
    </div>
    <div class="row-line" style="height:20px;"></div>
    <div class="list-area">
      <div class="list-box">
        <p style="color:#666;">
          共搜索到
          <span style="color:red;">{{tableData.length}}</span> 条记录
        </p>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" prop="paperName" label="试卷名称" width="400"></el-table-column>
          <el-table-column align="center" prop="name" label="发布者"></el-table-column>
          <el-table-column align="center" prop="paperType" label="试卷应用类型" :formatter="changePaperType"></el-table-column>
          <el-table-column align="center" prop="questionNumber" label="试题量"></el-table-column>
          <el-table-column align="center" prop="fullMarks" label="分数"></el-table-column>
          <el-table-column align="center" prop="browseNumber" label="浏览量"></el-table-column>
          <el-table-column align="center" prop="createTime" label="发布时间" :formatter="changeCreateTime"></el-table-column>
          <el-table-column align="center" prop="edit" label="操作"  v-if="loginType==2">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="downloadClick(scope.row)">下载</el-button>
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
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

    <el-dialog title="选择纸张类型与行间距" :visible.sync="dialogFormVisible">
      <el-form :model="formAlert">
        <el-form-item label="纸张类型" :label-width="formLabelWidth">
          <el-select v-model="formAlert.pageType" placeholder="请选择纸张类型">
            <el-option label="A4" value="1"></el-option>
            <el-option label="A3双栏" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行间距" :label-width="formLabelWidth">
          <el-select v-model="formAlert.lineSpacing" placeholder="请选择行间距">
            <el-option label="紧凑" value="1"></el-option>
            <el-option label="正常" value="2"></el-option>
            <el-option label="宽" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "examinationList",
  components: {
    
  },
  data() {
    return {
      loginType:localStorage.getItem("loginType"),
      formLabelWidth: '120px',
      dialogFormVisible: false,
      formAlert: {
        pageType: '',//--纸质类型（1:A4;2:A3双栏）
        lineSpacing: ''//--行间距（1:紧凑;2:正常;3:宽）
      },
      schoolId: '4C243C1B-D046-4CDE-AFC0-369B9D43549B',
      searchs: "",
      check1: '',//课程
      check2: '1',//类型
      check3: '1',//来源
      classes: [],//课程
      types: ["作业", "月考", "期中", "期末", "自定义"],//类型
      source: ["慧职园"],//来源
      tableData: [],
      page: 1, //当前页
      rows: 10,//每页条数
      total: 0
    };
  },
  methods: {
    select(){
      // this.$router.push({name: 'onlineTest'})
    },
    //在线组卷按钮
    online(){
      this.$router.push({name: 'onlineTest'})
    },
    //切换每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.rows = val
      this.getExaminationList()//加载 试卷列表
    },
    //切换页面 下一页 上一页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getExaminationList()//加载 试卷列表
    },
    //点击表格一行进行编辑
    handleClick(row) {
      // console.log(row.id);
      this.$router.push({name:'editTest', params: {paperId: row.id}})

    },
    //下载试卷
    downloadClick(val){
      // console.log(val.id);
      this.dialogFormVisible = true
      this.val_id = val.id
    },
    //下载试卷
    submit(){
      let param = {
          "paperId": this.val_id, //--试卷id
          "pageType":this.formAlert.pageType,  //--纸质类型（1:A4;2:A3双栏）
          "lineSpacing":this.formAlert.lineSpacing //--行间距（1:紧凑;2:正常;3:宽）
      }
      this.$http.post('/GroupPaper/DownloadPaper',param)
      .then(res=>{
        // console.log("下载",res)
        window.open(`${this.$http.baseUrlApi}/file/Download?fileName=${res.data.data}`)
      })
      .catch(res=>{
        console.log(res.data)
      })
    },
    //改变表格的 试卷应用类型
    changePaperType(row, column){
        let status = row.paperType;
        //1:作业;2:月考;3:期中考试;4:期末考试;5:自定义
        if(status == 1){
          return "作业" 
        } 
        if(status == 2){
          return "月考" 
        } 
        if(status == 3){
          return "期中考试" 
        } 
        if(status == 4){
          return "期末考试" 
        } 
        if(status == 5){
          return "自定义" 
        } 

    },
    //改变表格的 发布时间
    changeCreateTime(row, column){
      // console.log(row.createTime.replace('T',' ').split('.')[0])
      return row.createTime.replace('T',' ').split('.')[0]
    },

    //切换课程
    changeClass(val){
      // console.log(val)
      this.check1 = val
      this.getExaminationList()//加载 试卷列表
    },
    //切换类型 比如作业  月考  期中  期末考试等等
    changeType(val){
      // console.log(val)
      this.check2 = val
      this.getExaminationList()//加载 试卷列表
    },
    //加载课程列表
    getClasses(){
      let param = {};
      this.$http
        .post("/Course/CourseList", param)
        .then(res => {
          // console.log(1111111111,res.data.data);
          this.classes = res.data.data
          this.check1 = res.data.data[0].id
          this.getExaminationList()//加载试卷列表
          
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //加载 试卷列表
    getExaminationList(){
      let param = {
          "page":this.page,  //当前页
          "rows":this.rows, //每页条数
          "courseId":this.check1, //课程
          "paperType":this.check2, //试卷类型(1:作业;2:月考;3:期中考试;4:期末考试;5:自定义)
          "schoolId":this.schoolId //学校id
      };
			console.log(param)
      this.$http
        .post("/MyPaper/PageList", param)
        .then(res => {
          console.log(res.data.data);
          this.total = res.data.data.records //total
          this.tableData = res.data.data.list
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //搜索调用接口
    search(){
      console.info(`搜索内容： ${this.searchs}`)
    }


  },
  mounted() {
    this.getClasses()//加载课程列表

  },
};
</script>

<style lang="scss" scoped>

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
