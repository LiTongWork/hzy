<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'examinationList'}">试卷库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'zuJuan'}">在线组卷</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- <Breadcrumb status="online"></Breadcrumb> 面包屑组件 -->
      <div class="buttons">
        <el-button type="primary" size="small">批量导入</el-button>
      </div>
    </div>
    <div class="main">
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:125px;">
          <p class="p">选择课程</p>
          <el-select class="selected" v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="text" class="edit">修改</el-button>
        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="height:140px;">
          <p class="p">选择试卷应用类型</p>
          <div class="selected">
            <el-radio v-model="radio" label="1" border>作业</el-radio>
            <el-radio v-model="radio" label="2" border>月考</el-radio>
            <el-radio v-model="radio" label="3" border>期中考试</el-radio>
            <el-radio v-model="radio" label="4" border>期末考试</el-radio>
            <el-radio v-model="radio" label="5" border>自定义</el-radio>
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
import Breadcrumb from "../../components/Breadcrumb.vue";
export default {
  name: "zuJuan",
  components: {
    Breadcrumb
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "数学对口模拟冲刺卷"
        },
        {
          value: "2",
          label: "数学对口模拟冲刺卷1"
        },
        {
          value: "3",
          label: "数学对口模拟冲刺卷2"
        },
        {
          value: "4",
          label: "数学对口模拟冲刺卷4"
        },
        {
          value: "5",
          label: "数学对口模拟冲刺卷6"
        }
      ],
      value: "数学对口模拟冲刺卷",
      radio: "1"
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(row) {
      console.log(row);
    },
    next() {
      this.$router.push({name: 'editTest'})
    }


  },
  mounted() {}
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
