<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'questionsList'}">试题库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: ''}">选课</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="main">
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box">
          <p class="p">中职</p>
          <!-- 加工制造类  等品类 -->
          <div class="item">
              <div class="title">加工制造类:</div>
              <el-collapse v-model="activeNames" @change="handleChange" style="width:90%;margin:0 auto;">
                <el-collapse-item title="模具制造技术" name="1">
                    <el-checkbox-group :min="1" v-model="checked">
                        <el-checkbox  :label="模具认知">模具认知</el-checkbox>
                    </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>
          </div>


        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box">
          <p class="p">高职</p>
          <div class="item">
              <div class="title">加工制造类:</div>
              <el-collapse v-model="activeNames1" @change="handleChange1" style="width:90%;margin:0 auto;">
                <el-collapse-item title="模具制造技术" name="1">
                    <el-checkbox-group :min="1" v-model="checked1">
                        <el-checkbox  :label="模具认知">模具认知</el-checkbox>
                    </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>
          </div>
          


        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="background-color:#F2F3F3;height:80px;">
          <el-button type="primary">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
  

<script>
export default {
  name: "xuanKe",
  data() {
    return {
        checked: [],
        checked1: [],
        activeNames: ['1'],
        activeNames1: ['1']
    };
  },
  methods: {
      handleChange(val) {
        console.log(val);
      },
      handleChange1(val) {
        console.log(val);
      }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.el-collapse{
    border:none;
}
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
    padding: 20px 20px;
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
    .item{
        width: 80%;
        .title{
            font-size: 14px;
            font-weight: 600;
            color:#333;
            margin:20px 0 0 20px;
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
