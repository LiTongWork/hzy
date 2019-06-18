<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'questions'}">试卷库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'onlineTest'}">在线组卷</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'intelligence'}">智能组卷</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="buttons">
        <!-- <el-button type="primary" size="small">批量导入</el-button> -->
      </div>
    </div>
    <div class="main">
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box">
          <p class="p">选择题型以及分数</p>
          <div  class="selected">
            <div>
              <el-checkbox v-model="item1.checked" @change="chageItem1(item1.checked)">
                单选题: 
                <el-input v-model="item1.number" placeholder="请输入题目数" style="width:140px;" size="mini" v-if="item1.checked==true"></el-input>题
                <el-input v-model="item1.sore" placeholder="请输入每题分值" style="width:140px;" size="mini" v-if="item1.checked==true"></el-input>分
              </el-checkbox>  
            </div>
            <div>
              <el-checkbox v-model="item2.checked" @change="chageItem2(item2.checked)">
                多选题: 
                <el-input v-model="item2.number" placeholder="请输入题目数" style="width:140px;" size="mini" v-if="item2.checked==true"></el-input>题
                <el-input v-model="item2.sore" placeholder="请输入每题分值" style="width:140px;" size="mini" v-if="item2.checked==true"></el-input>分
              </el-checkbox> 
            </div>
            <div>
              <el-checkbox v-model="item3.checked" @change="chageItem3(item3.checked)">
                判断题: 
                <el-input v-model="item3.number" placeholder="请输入题目数" style="width:140px;" size="mini" v-if="item3.checked==true"></el-input>题
                <el-input v-model="item3.sore" placeholder="请输入每题分值" style="width:140px;" size="mini" v-if="item3.checked==true"></el-input>分
              </el-checkbox> 
            </div>
            <div>
              <el-checkbox v-model="item4.checked" @change="chageItem4(item4.checked)">
                填空题: 
                <el-input v-model="item4.number" placeholder="请输入题目数" style="width:140px;" size="mini" v-if="item4.checked==true"></el-input>题
                <el-input v-model="item4.sore" placeholder="请输入每题分值" style="width:140px;" size="mini" v-if="item4.checked==true"></el-input>分
              </el-checkbox> 
            </div>
            <div>
              <el-checkbox v-model="item5.checked" @change="chageItem5(item5.checked)">
                简答题: 
                <el-input v-model="item5.number" placeholder="请输入题目数" style="width:140px;" size="mini" v-if="item5.checked==true"></el-input>题
                <el-input v-model="item5.sore" placeholder="请输入每题分值" style="width:140px;" size="mini" v-if="item5.checked==true"></el-input>分
              </el-checkbox> 
            </div>
            <div>
              <el-checkbox v-model="item6.checked" @change="chageItem6(item6.checked)">
                综合题: 
                <el-input v-model="item6.number" placeholder="请输入题目数" style="width:140px;" size="mini" v-if="item6.checked==true"></el-input>题
                <el-input v-model="item6.sore" placeholder="请输入每题分值" style="width:140px;" size="mini" v-if="item6.checked==true"></el-input>分
              </el-checkbox> 
            </div>
            <!-- <div>{{fullMarks}}</div> -->
          </div>
        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box">
          <p class="p">选择知识点</p>
          <div class="scroll-box">
            <el-checkbox-group v-model="checkedKnowList">
              <el-checkbox v-for="(item, index) in knowList" :key="index" :label="item.knowId">{{item.knowName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>

      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box">
          <p class="p">选择难度</p>
          <div class="selected">
              <el-radio v-model="questionDiff" label="0">随机</el-radio>
              <el-radio v-model="questionDiff" label="1">简单</el-radio>
              <el-radio v-model="questionDiff" label="2">一般</el-radio>
              <el-radio v-model="questionDiff" label="3">困难</el-radio>
          </div>
        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="background-color:#F2F3F3;height:80px;">
          <el-button type="primary" @click="next">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Breadcrumb from "../../components/Breadcrumb.vue";
export default {
  name: "intelligence",
  components: {
    // Breadcrumb
  },
  data() {
    return {
      //item1- item6 单选 多选 判断 填空  简答 综合
      item1: {
        checked:false,
        questionType: 1,
        number: '',
        sore: ''
      },
      item2: {
        checked:false,
        questionType: 2,
        number: '',
        sore: ''
      },
      item3: {
        checked:false,
        questionType: 3,
        number: '',
        sore: ''
      },
      item4: {
        checked:false,
        questionType: 4,
        number: '',
        sore: ''
      },
      item5: {
        checked:false,
        questionType: 5,
        number: '',
        sore: ''
      },
      item6: {
        checked:false,
        questionType: 6,
        number: '',
        sore: ''
      },
      questionDiff: '',//选择难度
      checkedKnowList: [],//已选的知识点集合
      knowList: [],//知识点列表
      fullMarks: '',//试卷总分
      topicList: []
    };
  },
  methods: {
    //改变 题目类型的 赋值
    chageItem1(torf){
      this.item1={
        checked:torf,
        questionType: 1,
        number: '10',
        sore: '2'
      }
      if(this.item1.checked==true){
        this.topicList.push(this.item1)
      }else{
        this.topicList.splice(this.topicList.indexOf(this.item1),1)
      }
    },
    chageItem2(torf){
      this.item2={
        checked:torf,
        questionType: 2,
        number: '5',
        sore: '4'
      }
      if(this.item2.checked==true){
        this.topicList.push(this.item2)
      }else{
        this.topicList.splice(this.topicList.indexOf(this.item2),1)
      }
    },
    chageItem3(torf){
      this.item3={
        checked:torf,
        questionType: 3,
        number: '5',
        sore: '2'
      }
      if(this.item3.checked==true){
        this.topicList.push(this.item3)
      }else{
        this.topicList.splice(this.topicList.indexOf(this.item3),1)
      }
    },
    chageItem4(torf){
      this.item4={
        checked:torf,
        questionType: 4,
        number: '20',
        sore: '1'
      }
      if(this.item4.checked==true){
        this.topicList.push(this.item4)
      }else{
        this.topicList.splice(this.topicList.indexOf(this.item4),1)
      }
    },
    chageItem5(torf){
      this.item5={
        checked:torf,
        questionType: 5,
        number: '2',
        sore: '10'
      }
      if(this.item5.checked==true){
        this.topicList.push(this.item5)
      }else{
        this.topicList.splice(this.topicList.indexOf(this.item5),1)
      }
    },
    chageItem6(torf){
      this.item6={
        checked:torf,
        questionType: 6,
        number: '25',
        sore: '2'
      }
      if(this.item6.checked==true){
        this.topicList.push(this.item6)
      }else{
        this.topicList.splice(this.topicList.indexOf(this.item6),1)
      }
    },
    //点击下一步
    next(){
      this.fullMarks = Number((this.item1.sore*this.item1.number)+(this.item2.sore*this.item2.number)+(this.item3.sore*this.item3.number)+(this.item4.sore*this.item4.number)+(this.item5.sore*this.item5.number)+(this.item6.sore*this.item6.number))
      // console.log(this.fullMarks);return false;
      if(this.topicList.length==0){
        this.$notify({
          title: '警告',
          message: '请选择题型以及分数',
          type: 'warning'
        });
        return false;
      }
      if(this.checkedKnowList.length==0){
        this.$notify({
          title: '警告',
          message: '请选择知识点',
          type: 'warning'
        });
        return false;
      }
      if(this.questionDiff==''){
        this.$notify({
          title: '警告',
          message: '请选择难度',
          type: 'warning'
        });
        return false;
      }
      let param = {
        "topicList":this.topicList,
        "fullMarks":this.fullMarks,// --满分
        "knowledge":this.checkedKnowList, //--知识点集合
        "questionDiff":this.questionDiff, //--题目难度(0:随机;1:简单;2:一般;3:困难)
        "courseId": this.$route.params.courseId,
        "paperType": this.$route.params.type
      }
      // console.log(param);return false;
      this.$http
        .post("/GroupPaper/SmartPaper", param)
        .then(res => {
          // console.log(res.data.data);return false;
          this.$router.push({name: 'editTest' ,params: {courseId:this.$route.params.courseId, paperId: res.data.data,fullMarks:this.fullMarks }})
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    //根据课程ID 获取知识点列表
    getKnowList(){
      let param = {
        courseId: this.$route.params.courseId
      };
      this.$http
        .post("/Course/KnowLedgeList", param)
        .then(res => {
          // console.log(res.data.data)
          this.knowList = res.data.data.map(function(a){return {knowName: a.knowName, knowId: a.id}})
          // console.log(this.knowList)
        })
        .catch(res => {
          console.log(res.data);
        });
    },


  },
  mounted() {
    console.log(this.$route.params)
    this.getKnowList()
    if(!this.$route.params.courseId){
      this.$router.push({name: 'onlineTest'})
    }

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
.main {
  background-color: #f2f3f3;
  width: 100%;
  height: calc(100% - 80px);
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
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 0px;
    padding-bottom: 20px;
    .p {
      font-size: 20px;
      color: #333;
      border-left: 5px solid #79F7E0;
      padding-left: 20px;
      margin-left: -20px;
      margin-top: 19px;
    }
    .selected {
      margin-top: 20px;
    }
    .edit {
      margin-left: 25px;
    }
    .scroll-box {
      margin-top: 20px;
      padding: 20px;
      box-sizing: border-box;
      width: 100%;
      height: 240px;
      overflow-y: scroll;
      border: 1px solid #79F7E0;
      .el-checkbox {
        display: block !important;
        margin-bottom: 7px;
      }
    }
    .selecteds{
        margin-top: 20px;
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
</style>
