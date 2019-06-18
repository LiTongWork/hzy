<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'questionsList'}">试题库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: ''}">添加试题</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- <Breadcrumb status="online"></Breadcrumb> 面包屑组件 -->
      <div class="buttons">
        <!-- <el-button type="primary" size="small">批量导入</el-button> -->
      </div>
    </div>

    <div class="main">
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:125px;">
          <p class="p">选择课程</p>
          <el-select class="selected" v-model="value" @change="selectClass">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.courseName"
              :value="item.id"
            ></el-option>
          </el-select>

        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:420px;">
          <p class="p">选择知识点</p>
          <div class="scroll-box">
            <el-checkbox-group v-model="checkList1">
              <div v-for="(item, index) in zhishidian" :key="index">
                <el-checkbox :label="item.id" >{{item.knowName}}</el-checkbox>
              </div>
              
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:217px;">
          <p class="p">选择题型</p>
          <div class="mode" v-on:click.stop="selectType(0,$event)" v-bind:class="{ active:1==current}">
            <img src="../../assets/img/icon-danxuan.png">
            <p>单选题</p>
          </div>
          <div class="mode" style="margin-left:20px;" v-on:click.stop="selectType(1,$event)" v-bind:class="{ active:2==current}">
            <img src="../../assets/img/icon-duoxuan.png">
            <p>多选题</p>
          </div>
          <div class="mode" style="margin-left:20px;" v-on:click.stop="selectType(2,$event)" v-bind:class="{ active:3==current}">
            <img src="../../assets/img/icon-panduan.png">
            <p>判断题</p>
          </div>
          <div class="mode" style="margin-left:20px;" v-on:click.stop="selectType(3,$event)" v-bind:class="{ active:4==current}">
            <img src="../../assets/img/icon-tiankong.png">
            <p>填空题</p>
          </div>
          <div class="mode" style="margin-left:20px;" v-on:click.stop="selectType(4,$event)" v-bind:class="{ active:5==current}">
            <img src="../../assets/img/icon-jianda.png">
            <p>简答题</p>
          </div>
          <div class="mode" style="margin-left:20px;" v-on:click.stop="selectType(5,$event)" v-bind:class="{ active:6==current}">
            <img src="../../assets/img/icon-zonghe.png">
            <p>综合题</p>
          </div>

        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="background-color:#F2F3F3;height:80px;">
          <el-button type="primary" @click="next">开始录题</el-button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "addTest",
  components: {
    
  },
  data() {
    return {
      checkList1: [],//已选择的知识点
      options: [],//课程列表
      value: "",//选择的课程
      current: 1,//题目类型
      zhishidian: []//知识点列表
    };
  },
  methods: {
    //选择知识点
    // selectZsd(val){
    //   console.log(val)
    //   this.zsd = val  //赋值知识点id
    // },
    //选择课程
    selectClass(val){ 
      console.log(val)
      this.checkList1 = []
      this.getData1(val) //id
    },
    next() { //下一步 跳转
      if(!this.value || this.checkList1.length == 0){
           this.$notify({
            title: '警告',
            message: '必须选择课程和知识点，二者缺一不可',
            type: 'warning'
          });
          return;
      }
      // console.log({class: this.value,checked: this.checkList1, c: this.current });return false;
      localStorage.setItem('addTest',JSON.stringify({class: this.value, checked: this.checkList1, c: this.current }))
      this.$router.push({name: 'upload',params:{class: this.value, checked: this.checkList1, c: this.current }})
      
      //value 是课程ID，checkList1是知识点ID 数组，current是题目类型 默认1
    },
    selectType(index,event) { //选择题型  选择题  填空题  判断题  
      this.current=Number(index+1);
    },
    getData1(id){ //获取知识点
       let param = {
         CourseId : id 
      }
      this.$http.post('/Course/KnowLedgeList',param)
      .then(res=>{
        // console.log(11111,res.data)
          this.zhishidian = res.data.data  //赋值知识点
      })
      .catch(res=>{
        console.log(res.data)
      })
    },
    getData(){ //获取课程
      let param = {
      }
      this.$http.post('/Course/CourseList',param)
      .then(res=>{
          // console.log(res.data.data)
          this.options = res.data.data  //赋值课程
          this.getData1(this.options[0].id)//获取知识点

      })
      .catch(res=>{
        console.log(res.data)
      })
    }
  },
  mounted() {
    this.getData()//获取课程
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
	display: flex;
	flex-direction: column;
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
    padding-top: 0px;
    .p {
      font-size: 20px;
      color: #333;
      border-left: 5px solid #1abc9c;
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
    .active {
      border: 1px solid #1abc9c !important;
      color: #1abc9c !important;
      &:before {
        content: "";
        width: 1px;
        height: 0px;
        position: absolute;
        margin-left: 39px;
        margin-top: 0px;
        border-left: 20px solid #f2f2f2;
        border-top: 20px solid #1abc9c;
      }
    }
    .mode {
      position: relative;
      width: 100px;
      height: 90px;
      float: left;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      margin-top: 20px;
      text-align: center;
      p {
        text-align: center;
        margin-top: 10px;
        color: #606266;
      }
      img {
        width: 20px;
        height: 20px;
        margin-top: 20px;
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
</style>
