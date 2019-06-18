<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'questionsList'}">试题库</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- <Breadcrumb status="m"></Breadcrumb> 面包屑组件 -->
      <div class="buttons">
        <!-- <el-button type="primary" size="small" plain @click="select">选课</el-button> -->
        <el-button type="primary" size="small" plain @click="add">添加试题</el-button>
      </div>
    </div>
    <div class="row-line" style="height:20px;"></div>
    <!--间隔线-->
    <div class="select-area">
      <ul class="select-box">
        <li>
          <span>课程:</span>
          <el-radio-group v-model="check1" size="small" @change="changeCourse">
            <el-radio-button
              v-for="item in classes"
              :label="item.id"
              :key="item.index"
            >{{item.courseName}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>题型:</span>
          <el-radio-group v-model="check2" size="small" @change="changeType">
            <el-radio-button v-for="(item, index) in types" :label="index+1" :key="index" >{{item}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>难度:</span>
          <el-radio-group v-model="check3" size="small" @change="changeDiff">
            <el-radio-button v-for="(item, index) in difficulty" :label="index+1" :key="index">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>来源:</span>
          <el-radio-group v-model="check4" size="small" @change="changeSchool">
            <el-radio-button v-for="(item, index) in source" :label="index+1" :key="index">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
      </ul>
    </div>
    <div class="row-line" style="height:20px;"></div>
    <!--间隔线-->

    <!--侧边栏 浮动块-->
    <div class="float-box" id="float">
        <div class="container">
            <div class="left" id="hide">
                <el-badge :value="questionIds" :max="99" class="item">
                    <img src="../../assets/img/icon-buy.png" alt="购物车icon" style="width:25px;height:23px;">
                </el-badge>
                <span>试题栏</span>
                <span style="margin-top:220px;">⬅️</span>
            </div>
            <div class="right">
                <div style="font-size:17px;color:#5EBD9C;">已选试题：<span>{{questionIds}}</span> </div>
                <div v-for="(item, index) in gouwuche" :key="index" ><em v-if="item.number!=0"> {{item.questionType==1||item.questionType==2?'选择题：':(item.questionType==3?'判断题：':(item.questionType==4?'填空题：':(item.questionType==5?'简单题：':'综合题：')))}}<span>{{item.number}}</span></em></div>
               
                <div style="font-size:14px;position:absolute;bottom:44px;cursor:pointer;color:#5EBD9C;" @click="clear"> 清空</div>
                <el-button size="small" type="primary" @click="toPreview" style="position:absolute;bottom:10px;margin-left:34px;">生成试卷</el-button>
            </div>
        </div>
    </div>

    <div class="main">
      <div class="box">
        <div class="catalog">
          
          <!--知识点列表 ， 一般放在左侧-->
          <div class="container components-lists">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="all">全选</el-checkbox>
            <div style="margin:15px 0;"></div>
            <div style="position:absolute;top:0;left:0;width:100%;height:50px;background:#5EBD9C;"></div>
            <el-checkbox-group v-model="checkedClasses" @change="handleCheckedClassesChange">
              <el-checkbox v-for="(item, index) in catalogs" :label="item" :key="index" :title="item.knowName">{{item.knowName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        <!--  -->
        </div>
        <div class="lists">
          <div class="topControl">
            <div class="div1">
              <!-- <span>排序:</span>
              <span>时间 ↓</span>
              <span>使用次数 ↓</span> -->
            </div>
            <div class="div2">
              <span>
                共计试题:
                <em>{{stNum}}</em>
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- <el-button size="small" >选择本页全部试题</el-button> -->
            </div>
          </div>

          <div class="item" v-for="(item, index) in lists" :key="index">
            <div class="title">
              <span>{{index+1}}、</span>
              <span v-html="item.questionName"></span>
            </div>
            <div class="answer">
              <!-- <p>A:</p>
              <p>B:</p>
              <p>C:</p>
              <p>D:</p> -->
            </div>
            <div class="desc">
              <span>
                <em>{{item.questionDiff==1?'简单':(item.questionDiff==2?'一般':'困难')}}</em>
                <em>|</em>
                <em>{{item.questionType==1?'单选题':(item.questionType==2?'多选题':(item.questionType==3?'判断题':(item.questionType==4?'填空题':(item.questionType==5?'简单题':'综合题'))))}}</em>
                <em>|</em>
                <!-- <em>{{item.courseName}}</em>
                <em>|</em> -->
                
                <!-- <em>{{item.knowName}}</em>
                <em>|</em>
                <em>贡献者：{{item.name}}</em> -->
              </span>
              <span>更新时间：{{item.createTime.replace('T',' ')}}</span>
            </div>
            <div style="width:100%;height:1px;background:#F4F4F4;"></div>
            <div class="control">
              <span>
                <img src="../../assets/img/icon-star.png">
                <em @click="showSelect(item.id)">查看选项</em>
                <span style="width:70px;"></span>
                <img src="../../assets/img/icon-ans.png">
                <em @click="showAnswer(item.id)">查看解析</em>
                <!-- <img src="../../assets/img/icon-ans.png">
                <em @click="downloadATest(item.id)">下载试题</em> -->
                <img src="../../assets/img/icon-jiucuo.png">
                <em @click="upDate(item.id)">试题纠错</em>
              </span>
              <el-button type="primary" size="small" @click="addInTest(item.id,item.questionType)">加入试卷</el-button>
            </div>
          </div>

          <div class="page-area" style="display: flex;justify-content: center;">
            <div class="page-box">
              <el-pagination
                background
                prev-text="上一页"
                next-text="下一页"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 50, 100]"
                :page-size="10"
                layout="prev, pager, next,total, sizes, jumper"
                :total="!total?0:total"
              ></el-pagination>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "manual",
  components: {

  },
  data() {
    return {
      checkAll: true,//默认全选
      checkedClasses: [],//已选的知识点
      catalogs: [],//加载的知识点
      isIndeterminate: false,//m默认全选
      stNum: '',//试题总数量
      lists: [],//题目列表数组
      total: '',//分页显示的总条数
      currentPage: 1,//默认加载第一页
      currentRow: 10,//默认加载10条
      point: true,
      selectType: "1",
      check1: "",//课程
      check2: 1,//题型
      check3: 1,//难度
      check4: 1,//来源
      classes: [],//头部 加载的课程
      types: [
        "单选题",
        "多选题",
        "判断题",
        "填空题",
        "简单题",
        "综合题"
      ],
      difficulty: ["简单", "一般", "困难"],
      source: ["慧职园"],
      questionIds: '',//题干ID总和
      count: [],//题目数量计数器
      gouwuche: []
    };
  },
  methods: {
    //切换课程
    changeCourse(val){
      console.log(val)
      this.check1 = val//修改默认的课程id
      this.getData1(val)//加载知识点列表
    },
    //切换题型 如单选 多选 判断
    changeType(val){
      // console.log(val)
      this.check2 = val //修改默认的题型
      this.getLists()//加载题目列表
    },
    //切换 难度
    changeDiff(val){
      // console.log(val)
      this.check3 = val //修改默认的男的
      this.getLists()//加载题目列表
    },
    //切换 学校
    changeSchool(val){
      // console.log(val)
      this.check3 = val //修改默认学校
      this.getLists()//加载题目列表
    },
    //切换知识点全选
    handleCheckAllChange(val) {
      // console.log("全选",val)
      this.currentRow = 10
      this.currentPage = 1
      this.checkedClasses = val ? this.catalogs : [];
      this.isIndeterminate = false;
      this.getLists()
    },
    //切换知识点改变
    handleCheckedClassesChange(value) {
      // console.log("点击",value)
      this.knowIds = value.map(function(a){return a.id}).join(',')
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.catalogs.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.catalogs.length;
      this.getLists()
    },
    //加载课程
    getData() {
      let param = {};
      this.$http
        .post("/Course/CourseList", param)
        .then(res => {
          // console.log(res.data.data);
          this.classes = res.data.data
          this.check1 = this.classes[0].id //默认的课程ID
          this.statisticsShop()//统计购物车。
          this.getData1(this.check1)//加载知识点
          
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //加载知识点
    getData1(courseId) {
      //  console.log(courseId)
      let param = {
        courseId: courseId
      }
      this.$http
        .post("/Course/KnowLedgeList", param)
        .then(res => {
          // console.log(res.data.data);
         
          this.catalogs = res.data.data; //赋值知识点
          this.checkedClasses = this.catalogs //默认全选
          // console.log(111111,this.catalogs.map(function(a){return a.id}))
          this.knowIds = this.catalogs.map(function(a){return a.id}).join(',')
          this.getLists()//加载题目
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //以上是左侧选择菜单的函数
    select() {
      this.$router.push({ name: "xuanKe" });
    },
    add() {
      this.$router.push({ name: "addTest" });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentRow = val
      this.getLists()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getLists()
    },
    //加载题库列表
    getLists(){
      let param = {
        page: this.currentPage,
        rows: this.currentRow,
        courseId: this.check1 ,
        questionType:this.check2,
        questionDiff:this.check3,
        schoolId:"4C243C1B-D046-4CDE-AFC0-369B9D43549B",
        knowIds:this.knowIds
      }
      localStorage.setItem('selectedParams',JSON.stringify(param))
      // console.log(11111,JSON.parse(localStorage.getItem('selectedParams')));
      this.$http.post('/GroupPaper/GroupPaperPage',param)
      .then(res=>{
        // console.log(res.data.data)
        let data = res.data.data
        this.lists = data.list
        this.total = data.total
        this.stNum = data.list.length  
        // this.$notify({
        //   title: '成功',
        //   message: '添加成功',
        //   type: 'success'
        // });
      })
      .catch(res=>{
        console.log(res.data)
      })
    },
//加载题目选项
    showSelect(id){
    // console.log(id)
      let param = {
        id: id
      }
      this.$http.post('/Question/Single',param)
      .then(res=>{
        // console.log(res.data.data)
        let data = res.data.data

        this.$alert(`<div>${data.optionsXml}</div>`, `选项`, {
          dangerouslyUseHTMLString: true
        });
        
      })
      .catch(res=>{
        console.log(res.data)
      })
    },
    //点击加载解析
    showAnswer(id){ 
      let param = {
        id: id
      }
      this.$http.post('/Question/Single',param)
      .then(res=>{
        // console.log(res.data.data)
        let data = res.data.data
        this.$alert(`答案：${data.correctXml} <br> <div>${data.analysis}</div>`, '', {
          dangerouslyUseHTMLString: true
        });
        
      })
      .catch(res=>{
        console.log(res.data)
      })
    },
    // downloadATest(id){ //点击下载单个试题

    // },
    //点击修改试题
    upDate(id){ 
    // console.log(id)
      let param = {
        id: id
      }
      this.$http.post('/Question/Single',param)
      .then(res=>{
        // console.log(res.data.data)
        let data = res.data.data
        this.$router.push({name: 'editOneTest',params:{class: data.courseId,checked: [data.knowId], c: data.questionType ,id: id}})
          //value 是课程ID，checkList1是知识点ID 数组，current是题目类型 默认0, id为题干ID
      })
      .catch(res=>{
        console.log(res.data)
      })
    },
    //加入购物车
    addInTest(id,type){
      // console.log(id, type)
      let param = {
         "courseId":this.check1,
        "questionId":id,
        "questionType":this.check2
      }
      this.$http.post('/GroupPaper/AddShop',param)
      .then(res=>{
        // console.log(res.data)
        this.statisticsShop()//请求加载购物车
      })
      .catch(res=>{
        console.log(res.data)
      })
      
    },
    //统计购物车
    statisticsShop(){
      let param = {
          "courseId":this.check1 //课程id
      }
      this.$http.post('/GroupPaper/StatisticsShop',param)
      .then(res=>{
        // console.log(res.data.data)
        let data = res.data.data
        this.questionIds = eval(data.map(function(a){return a.number}).join("+")) //数组求和，计算购物车总数
        this.gouwuche = data
      })
      .catch(res=>{
        console.log(res.data)
      })


    },
    //清空购物车
    clear(){
      this.count=[]//计数器归零
      this.questionIds=''//题干ID总和
      this.gouwuche = []
      let param = {
          "courseId":this.check1
      }
      this.$http.post('/GroupPaper/RemoveShop',param)
      .then(res=>{
        console.log(res.data.data)

      })
      .catch(res=>{
        console.log(res.data)
      })
      
    },
    toPreview(){
        this.$router.push({name: 'editTest'})
    }


  },
  mounted() {
    this.getData();//加载课程
    
    setTimeout(function(){
            document.getElementById("float").style.width='42px'
        },2000)
        document.getElementById("hide").onclick=function(){
            if(document.getElementById("float").style.width=='42px'){
                document.getElementById("float").style.width='200px'
            }else{
                document.getElementById("float").style.width='42px'
            }
        }
  },

}
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
  .buttons {
    button {
      margin-left: 20px;
    }
  }
}
.selectType {
  background-color: #f2f3f3;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
}
.row-line,
.select-area {
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
  height: 230px;
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

.main {
  width: 100%;
  background-color: #f2f3f3;
  box-sizing: border-box;
  .box {
    max-width: 1760px;
    min-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    // padding: 0 20px;
    background-color: #f2f3f3;
    position: relative;
    padding: 0 0 30px 0;
    .catalog {
      position: relative;
      width: 15%;
      height: 526px;
      min-width: 200px;
      overflow-x: hidden;
      overflow-y: scroll;
      box-sizing: border-box;
      background-color: #f2f3f3;
      .el-checkbox {
        width: 100%;
        margin: 5px 2px;
        z-index: 100;
      }
      .container {
        width: 270px;
        height: auto;
        box-sizing: border-box;
        padding: 10px 20px;
      }
    }
    .lists {
      position: relative;
      float: right;
      width: 84%;
      margin-top: -526px;
      height: auto;
      margin-left: 1%;
      right: 0;
      background-color: #f2f3f3;
      padding-bottom: 30px;
      box-sizing: border-box;
      .topControl {
        width: 100%;
        height: 50px;
        background-color: #fff;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 30px;
        margin-bottom: 20px;
        .div1 {
          span {
            margin-left: 30px;
            color: #5ebd9c;
            cursor: pointer;
          }
          span:first-child {
            cursor: unset;
          }
        }
        .div2 {
          span {
            margin-right: 30px;
            color: #5ebd9c;
            em {
              color: #333;
            }
          }
        }
      }
      .item {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 30px 25px 10px 25px;
        height: auto;
        font-size: 15px;
        color: #333;
        margin-bottom: 20px;
        .title {
          margin-bottom: 10px;
          span{
            float: left;
          }
        }
        .answer {
          margin-bottom: 20px;
          *{
            padding: 3px 0;
          }
        }
        .desc,
        .control {
          width: 100%;
          display: flex;
          justify-content: space-between;
          height: 45px;
          align-items: center;
          font-size: 14px;
          color: #a5a5a5;
        }
        .desc {
          span:first-child {
            width: 150px;
            display: flex;
            justify-content: space-between;
          }
        }
        .control {
          color: #333;
          span:first-child {
            img {
              width: 18px;
              height: 18px;
              margin-left: 20px;
              cursor: pointer;
            }
            img:first-child {
              margin-left: 0;
            }
            em {
              cursor: pointer;
            }
            width: 400px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
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

.float-box{
  position:fixed;
  top:180px;
  width:200px;
  height: 260px;
  background-color: #FFF;
  z-index: 999;
  right: 0;
  overflow-x: hidden;
  overflow: hidden;
  border:1px solid #5EBD9C;
  .container{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-color: #FFF;
    .left{
        float: left;
        width: 42px;
        height:260px;
        background-color: #5EBD9C;
        color: #FFF;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        align-items: flex-start;
        align-content: center;
        span{
            width: 17px;
            height: 70px;
            position: absolute;
            margin-top:30px;
            cursor: pointer;
        }
    }
    .right{
        float: left;
        width: 158px;
        height: 260px;
        background-color:#fff;
        box-sizing: border-box;
        padding: 5px 10px;
    }
}
}
</style>
