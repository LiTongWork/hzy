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
        <el-button type="primary" size="small" plain @click="add" v-if="loginType==2">添加试题</el-button>
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
            <el-radio-button v-for="(item, index) in types" :label="index+1" :key="index">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>难度:</span>
          <el-radio-group v-model="check3" size="small" @change="changeDiff">
            <el-radio-button
              v-for="(item, index) in difficulty"
              :label="index+1"
              :key="index"
            >{{item}}</el-radio-button>
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
      <div class="container" >
        <div class="left" id="hide">
          <el-badge :value="questionIds" :max="99" class="item">
            <img src="../../assets/img/icon-buy.png" alt="购物车icon" style="width:25px;height:23px;">
          </el-badge>
          <span>试题栏</span>
          <span style="margin-top:220px;">◀</span>
        </div>
        <div class="right">
          <div style="font-size:17px;color:#5EBD9C;">
            已选试题：
            <span>{{questionIds}}</span>
          </div>
          <div v-for="(item, index) in gouwuche" :key="index">
            <em v-if="item.number!=0">
              {{item.questionType==1?'单选题':(item.questionType==2?'多选题：':(item.questionType==3?'判断题：':(item.questionType==4?'填空题：':(item.questionType==5?'简单题：':'综合题：'))))}}
              <span>{{item.number}}</span>
            </em>
          </div>

          <div
            style="font-size:14px;position:absolute;bottom:44px;cursor:pointer;color:#5EBD9C;"
            @click="clear"
          >清空</div>
          <el-button  v-if="loginType==2"
            size="small"
            type="primary"
            @click="toPreview"
            style="position:absolute;bottom:10px;margin-left:34px;"
          >生成试卷</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="请输入题目分值" :visible.sync="topreviewVisible">
      <div  class="selected">
          <div v-for="(item, index) in gouwuche" :key="index">
            <em v-if="item.number!=0" style="font-size:20px;">
              <el-badge :value="item.number" :max="99" class="item" style="margin:0 30px 0 0;">
                {{item.questionType==1?'单选题：':(item.questionType==2?'多选题：':(item.questionType==3?'判断题：':(item.questionType==4?'填空题：':(item.questionType==5?'简单题：':'综合题：'))))}}
              </el-badge>
              <el-input style="width:150px;" v-model="sore[item.questionType-1]" size="mini" placeholder="请输入每小题分值" @change="initSore(item,sore[item.questionType-1],index)"></el-input>
            </em>
          </div><br><br><br>
          <el-input v-model="fullMarks" placeholder="请输入试卷总分" style="width:260px;"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="topreviewVisible = false">取 消</el-button>
        <el-button type="primary" @click="toPreviewConfirm">确 定</el-button>
      </div>
    </el-dialog>


    <div class="main">
      <div class="box">
        <div class="catalog">
          <!--知识点列表 ， 一般放在左侧-->
          <div class="container components-lists">
            <!-- <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              class="all"
            >全选</el-checkbox>
            <div style="margin:15px 0;"></div>
            <div style="position:absolute;top:0;left:0;width:100%;height:50px;background:#5EBD9C;"></div>
            <el-checkbox-group v-model="checkedClasses" @change="handleCheckedClassesChange">
              <el-checkbox
                v-for="(item, index) in catalogs"
                :label="item"
                :key="index"
                :title="item.knowName"
              >{{item.knowName}}</el-checkbox>
            </el-checkbox-group> -->
            <div style="margin:50px 0;"></div>
            <div style="position:absolute;top:0;left:0;width:100%;height:50px;background:#5EBD9C;line-height:50px;">
              <el-button @click="allChecked" type="text" size="mini" style="color:#FFF;margin:0 0 0 20px;">全选</el-button>
              <el-button @click="resetChecked" type="text" size="mini" style="color:#FFF;margin:0 0 0 20px;">清空</el-button>
            </div>
            <el-tree
              style="width:192px;overflow-x:hidden;"
              :data="data"
              show-checkbox
              :default-expand-all='false'
              node-key="id"
              ref="tree"
              :highlight-current="true"
              :props="defaultProps"
              @check='checkClick'>
            </el-tree>
          </div>
          <!--  -->
        </div>
        <div class="lists">
          <div class="topControl">
            <div class="div1">
              <!-- <span>排序:</span>
              <span>时间 ↓</span>
              <span>使用次数 ↓</span>-->
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

          <div class="item" v-for="(item, index) in lists" :key="index" v-if="item.layout">
            <!-- <div class="title">
              <span>{{index+1}}、</span>
              <span v-html="item.questionName"></span>
            </div>-->
            <div class="answer">
              <!-- <span>{{index+1}}、</span> -->
              <span class="ql-editor" v-html="item.layout"></span>
              <!-- <p>A:</p>
              <p>B:</p>
              <p>C:</p>
              <p>D:</p>-->
            </div>
            <div class="desc">
              <span>
                <em>{{item.questionDiff==1?'简单':(item.questionDiff==2?'一般':'困难')}}</em>
                <em>|</em>
                <em>{{item.questionType==1?'单选题':(item.questionType==2?'多选题':(item.questionType==3?'判断题':(item.questionType==4?'填空题':(item.questionType==5?'简单题':'综合题'))))}}</em>
                <em>|</em>
                <em>贡献者：代老师{{item.name}}</em>
                <em>|</em>
                <em>题目ID：{{item.id}}</em>
              </span>
              <span>更新时间：{{item.createTime.replace('T',' ')}}</span>
            </div>
            <div style="width:100%;height:1px;background:#F4F4F4;"></div>
            <div class="control" v-if="loginType==2">
              <span>
                <!-- <img src="../../assets/img/icon-star.png">
                <em @click="showSelect(item.id)">查看选项</em>-->
                <img src="../../assets/img/icon-ans.png">
                <em @click="showAnswer(item.id)">查看解析</em>
                <img src="../../assets/img/icon-ans.png">
                <em @click="downloadATest(item.wordUrl)">下载试题</em>
                <img src="../../assets/img/icon-jiucuo.png">
                <em @click="upDate(item.id)">试题纠错</em>
                <span style="width:70px;"></span>
              </span>
              <el-button
                type="primary"
                size="small"
                @click="addInTest(item.id,item.questionType)"
              >加入试卷栏</el-button>
            </div>
          </div>
          <el-dialog title="纠错" :visible.sync="editVisible">
            <el-form ref="form" :model="form">
              <el-form-item label="题目ID：">
                <el-input v-model="form.id"></el-input>
              </el-form-item>

              <el-form-item label="错误类型：">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="题干有误" name="type"></el-checkbox>
                  <el-checkbox label="答案有误" name="type"></el-checkbox>
                  <el-checkbox label="解析有误" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="错误描述：">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="upDateConfirm">提交</el-button>
                <el-button @click="editVisible=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
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
                :page-size="currentRow"
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
  name: "questionsList",
  components: {},
  data() {
    return {
      loginType: localStorage.getItem("loginType"),
      // checkAll: true, //默认全选
      // checkedClasses: [], //已选的知识点
      // catalogs: [], //加载的知识点
      // isIndeterminate: false, //m默认全选

      //保存选择的知识点
      knowIds: '',
      //知识点列表 tree结构数据
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      stNum: "", //试题总数量
      lists: [], //题目列表数组
      total: "", //分页显示的总条数
      currentPage: 1, //默认加载第一页
      currentRow: 10, //默认加载10条
      point: true,
      selectType: "1",
      check1: "", //课程
      check2: 1, //题型
      check3: 1, //难度
      check4: 1, //来源
      classes: [], //头部 加载的课程
      types: ["单选题", "多选题", "判断题", "填空题", "简单题", "综合题"],
      difficulty: ["简单", "一般", "困难"],
      source: ["慧职园"],
      questionIds: "", //题干ID总和
      count: [], //题目数量计数器
      gouwuche: [],
      editVisible: false, //显示试题纠错 编辑框
      form: {
        id: "",
        type: [],
        desc: ""
      }, //试题纠错的表单
      paperId: "", //试卷ID
      fullMarks: "", //试卷满分
      sore:[],//每小题分值
      topreviewVisible: false,   //点击生成试卷 弹框
      topicList: []
      
    };
  },
  methods: {
    initSore(item,sore,index){
      this.topicList.splice(index,1)
      item.sore = sore
      this.topicList.push(item)
      // console.log(this.topicList)
    },
    //切换课程
    changeCourse(val) {
      // console.log(val);
      this.check1 = val; //修改默认的课程id
      // this.getData1(val); //加载知识点列表
      this.getKnowLedgeJson(val)//加载知识点tree JSON 列表
      this.statisticsShop();
    },
    //切换题型 如单选 多选 判断
    changeType(val) {
      // console.log(val)
      this.check2 = val; //修改默认的题型
      this.getLists(); //加载题目列表
    },
    //切换 难度
    changeDiff(val) {
      // console.log(val)
      this.check3 = val; //修改默认的男的
      this.getLists(); //加载题目列表
    },
    //切换 学校
    changeSchool(val) {
      // console.log(val)
      this.check3 = val; //修改默认学校
      this.getLists(); //加载题目列表
    },
    //切换知识点全选
    // handleCheckAllChange(val) {
    //   // console.log("全选",val)
    //   this.currentRow = 10;
    //   this.currentPage = 1;
    //   this.checkedClasses = val ? this.catalogs : [];
    //   this.isIndeterminate = false;
    //   this.getLists();
    // },
    //切换知识点改变
    // handleCheckedClassesChange(value) {
    //   // console.log("点击",value)
    //   this.knowIds = value
    //     .map(function(a) {
    //       return a.id;
    //     })
    //     .join(",");
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.catalogs.length;
    //   this.isIndeterminate =
    //     checkedCount > 0 && checkedCount < this.catalogs.length;
    //   this.getLists();
    // },

    //获取选择的节点
    checkClick(data){
      // console.log(data)
      // console.log(this.$refs.tree.getCheckedKeys())
      this.knowIds = this.$refs.tree.getCheckedKeys().join(',')
      this.getLists();
      
    },
    //全选知识点
    allChecked(){
      this.$refs.tree.setCheckedNodes(this.data);
      // console.log(this.$refs.tree.getCheckedKeys().join(','))
      this.knowIds = this.$refs.tree.getCheckedKeys().join(',')
      this.getLists();
    },
    //清空知识点
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.knowIds = ''
      this.getLists();
    },
    //加载课程
    getData() {
      let param = {};
      this.$http
        .post("/Course/CourseList", param)
        .then(res => {
          // console.log('加载课程 列表',res.data.data);
          this.classes = res.data.data;
          this.check1 = this.classes[0].id; //默认的课程ID
          this.statisticsShop(); //统计购物车。
          // this.getData1(this.check1); //加载知识点
          this.getKnowLedgeJson(this.check1)//加载知识点tree结构
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //加载知识点tree结构
    getKnowLedgeJson(id){
        let param = {
            id: id
        };
        this.$http
        .post("/Course/Single", param)
        .then(res => {
            // console.log(JSON.parse( res.data.data.knowJson) )
            if(!res.data.data.knowJson){
              this.getData1(id)
            }else{
              this.data = JSON.parse( res.data.data.knowJson)
              this.knowIds = this.data
                .map(function(a) {
                  return a.id;
                })
                .join(",");
              this.getLists(); //加载题目
            } 
        })
    },
    //加载知识点
    getData1(courseId) {
      //  console.log(courseId)
      let param = {
        courseId: courseId
      };
      this.$http
        .post("/Course/KnowLedgeList", param)
        .then(res => {
          // console.log(res.data.data);
          //赋值知识点
          this.data = res.data.data.map(function(a) {
            return {
              id: a.id,
              label: a.knowName,
              parentId: a.parentId,
              sort: a.sort,
              courseId: a.courseId
            };
          }); 
          //this.checkedClasses = this.catalogs; //默认全选
          this.knowIds = this.data
            .map(function(a) {
              return a.id;
            })
            .join(",");
            // console.log(this.catalogs)
            // console.log( this.knowIds)
          this.getLists(); //加载题目
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
      this.currentRow = val;
      this.getLists();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getLists();
    },
    //加载题库列表
    getLists() {
      let param = {
        page: this.currentPage,
        rows: this.currentRow,
        courseId: this.check1,
        questionType: this.check2,
        questionDiff: this.check3,
        schoolId: "4C243C1B-D046-4CDE-AFC0-369B9D43549B",
        knowIds: this.knowIds
      };
      localStorage.setItem("selectedParams", JSON.stringify(param));
      // console.log(11111,JSON.parse(localStorage.getItem('selectedParams')));
      this.$http
        .post("/GroupPaper/GroupPaperPage", param)
        .then(res => {
          // console.log('加载题库列表',res.data.data)
          let data = res.data.data;
          this.lists = data.list;
          this.total = data.records; //total
          this.stNum = data.list.length;
          // this.$notify({
          //   title: '成功',
          //   message: '添加成功',
          //   type: 'success'
          // });
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //加载题目选项
    showSelect(id) {
      // console.log(id)
      let param = {
        id: id
      };
      this.$http
        .post("/Question/Single", param)
        .then(res => {
          // console.log(res.data.data)
          let data = res.data.data;

          this.$alert(`<div>${data.optionsXml}</div>`, `选项`, {
            dangerouslyUseHTMLString: true
          });
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //点击加载解析
    showAnswer(id) {
      let param = {
        id: id
      };
      this.$http
        .post("/Question/Single", param)
        .then(res => {
          // console.log(res.data.data)
          let data = res.data.data;
          this.$alert(
            `答案：${
              data.correctXml == 2
                ? "错误"
                : data.correctXml == 1
                ? "正确"
                : data.correctXml
            } <br> <div>${data.analysis}</div>`,
            "",
            {
              dangerouslyUseHTMLString: true
            }
          );
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //点击下载单个试题
    downloadATest(wordUrl) {
      console.log(wordUrl);
      window.location.href = `${
        this.$http.baseUrlApi
      }/File/Download?fileName=${wordUrl}`;
    },
    //点击修改试题
    upDate(id) {
      console.log(id);
      this.editVisible = true;
      this.form.id = id;
    },
    //提交纠错信息
    upDateConfirm() {
      console.log(this.form);
      return false;
      let param = form;
      this.$http
        .post("/", param)
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //加入购物车
    addInTest(id, type) {
      // console.log(id, type)
      let param = {
        courseId: this.check1,
        questionId: id,
        questionType: type
      };
      this.$http
        .post("/GroupPaper/AddShop", param)
        .then(res => {
          // console.log(res.data)
          this.statisticsShop(); //请求加载购物车
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //统计购物车
    statisticsShop() {
      let param = {
        courseId: this.check1 //课程id
      };
      this.$http
        .post("/GroupPaper/StatisticsShop", param)
        .then(res => {
          // console.log('购物车',res.data.data)
          let data = res.data.data;
          this.questionIds = eval(
            data
              .map(function(a) {
                return a.number;
              })
              .join("+")
          ); //数组求和，计算购物车总数
          this.gouwuche = data;
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //清空购物车
    clear() {
      this.count = []; //计数器归零
      this.questionIds = ""; //题干ID总和
      this.gouwuche = [];
      let param = {
        courseId: this.check1
      };
      this.$http
        .post("/GroupPaper/RemoveShop", param)
        .then(res => {
          console.log(res.data.data);
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //点击 生成试卷按钮  显示输入框
    toPreview() {
      this.topreviewVisible = true
    },
    //提交输入框
    toPreviewConfirm() {
      if(this.topicList==[]){
        this.$notify({
          title: '警告',
          message: '每小题的分值不能为空',
          type: 'warning'
        });
        return false;
      }
      if(this.fullMarks==''){
        this.$notify({
          title: '警告',
          message: '试卷总分不能为空',
          type: 'warning'
        });
        return false;
      }
      let param = {
        "topicList":this.topicList,
        "fullMarks":this.fullMarks,// --满分
        "courseId": this.check1
      }
      // console.log(param);return false;
      this.$http
        .post("/GroupPaper/GeneratedPaper", param)
        .then(res => {
          // console.log(res.data.data);return false;
          this.topreviewVisible = false
          this.$router.push({
            name: "editTest",
            params: { courseId: this.check1, fullMarks: this.fullMarks, paperId: res.data.data}
          });
        })
        .catch(res => {
          console.log(res.data);
        });

    },
    

  },
  mounted() {
    this.getData(); //加载课程

    setTimeout(function() {
      document.getElementById("float").style.width = "42px";
    }, 2000);
    document.getElementById("hide").onclick = function() {
      if (document.getElementById("float").style.width == "42px") {
        document.getElementById("float").style.width = "200px";
      } else {
        document.getElementById("float").style.width = "42px";
      }
    };
  }
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
          span {
            float: left;
          }
        }
        .answer {
          margin-bottom: 20px;
          * {
            padding: 3px 0;
          }
          span {
            float: left;
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
            width: 650px;
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

.float-box {
  position: fixed;
  top: 180px;
  width: 200px;
  height: 260px;
  background-color: #fff;
  z-index: 999;
  right: 0;
  overflow-x: hidden;
  overflow: hidden;
  border: 1px solid #5ebd9c;
  .container {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-color: #fff;
    .left {
      float: left;
      width: 42px;
      height: 260px;
      background-color: #5ebd9c;
      color: #fff;
      padding: 10px 0;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      align-items: flex-start;
      align-content: center;
      span {
        width: 17px;
        height: 70px;
        position: absolute;
        margin-top: 30px;
        cursor: pointer;
      }
    }
    .right {
      float: left;
      width: 158px;
      height: 260px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 5px 10px;
    }
  }
}
</style>
manual