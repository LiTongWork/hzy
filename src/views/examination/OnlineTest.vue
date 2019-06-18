<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'examinationList'}">试卷库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'onlineTest'}">在线组卷</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="buttons">
        <!-- <el-button type="primary" size="small">批量导入</el-button> -->
      </div>
    </div>
    <div class="main">
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:125px;">
          <p class="p">选择课程</p>
          <el-select class="selected" v-model="value">
            <el-option
              v-for="(item, index) in classes"
              :key="index"
              :label="item.courseName"
              :value="item.courseId"
            ></el-option>
          </el-select>
          <!-- <el-button type="text" class="edit">修改</el-button> -->
        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:140px;">
          <p class="p">选择试卷应用类型</p>
          <div class="selected">
            <el-radio v-model="type" label="1" border>作业</el-radio>
            <el-radio v-model="type" label="2" border>月考</el-radio>
            <el-radio v-model="type" label="3" border>期中考试</el-radio>
            <el-radio v-model="type" label="4" border>期末考试</el-radio>
            <!-- <el-radio v-model="type" label="5" border>自定义</el-radio> -->
          </div>
        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:217px;">
          <p class="p">选择组卷模式</p>
          <div class="mode" :class="{active: isshow1}" v-on:click.stop="selectType($event, '1')">
            <img src="../../assets/img/icon-automatic.png" alt="智能组卷">
            <p>智能组卷</p>
          </div>
          <div
            class="mode"
            style="margin-left:20px;"
            :class="{active: isshow2}"
            v-on:click.stop="selectType($event, '2')"
          >
            <img src="../../assets/img/icon-unautomatic.png" alt="手动组卷">
            <p>手动组卷</p>
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
  name: "onlineTest",
  components: {
    // Breadcrumb
  },
  data() {
    return {
      classes: [],
      value: '',//已选课程
      type: '1',//试卷类型
      isshow1: localStorage.getItem("assemblyType")=='1'?true:false,
      isshow2: localStorage.getItem("assemblyType")=='2'?true:false,
    };
  },
  methods: {
    //点击下一步
    next() {
      if(!this.value || !localStorage.getItem("assemblyType")){
        this.$notify({
          title: '提醒',
          message: '必须选择课程以及组卷模式，二者缺一不可',
          type: 'warning'
        });
        return false;
      }
      let params = {courseId: this.value, type: this.type, testMode: localStorage.getItem("assemblyType")}
      // console.log({courseId: this.value, type: this.type, testMode: localStorage.getItem("assemblyType")});return false;

      if (localStorage.getItem("assemblyType") == "1") {
        this.$router.push({ name: "intelligence", params: params });
      } else {
        this.$router.push({ name: "manual" });
      }
    },
    //选择组卷模式
    selectType(event, assemblyType) {
      if (assemblyType == 1) {
        this.isshow1 = true
        this.isshow2 = false
        localStorage.setItem("assemblyType", assemblyType); //组卷类型
      } 
      if (assemblyType == 2){
        this.isshow1= false;
        this.isshow2= true;
        localStorage.setItem("assemblyType", assemblyType); //组卷类型
      }
    },
    //加载课程列表
    getClasses(){
      let param = {};
      this.$http
        .post("/Course/CourseList", param)
        .then(res => {
          // console.log(res.data.data);
          this.classes = res.data.data.map(function(a){return {courseName: a.courseName, courseId: a.id} })
          // console.log(this.classes)
        })
        .catch(res => {
          console.log(res.data);
        });
    },

  },
  mounted() {
    this.getClasses()//加载课程列表
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
