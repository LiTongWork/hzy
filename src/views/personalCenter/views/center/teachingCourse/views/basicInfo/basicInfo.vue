<template>
  <div class="basicInfo">
    <div class="title">
      基本信息
    </div>
    <div class="formData">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="课程简介" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="所属专业" prop="profession">
          <el-button>添加</el-button>
          <div class="profession-list">
            <span class="profession-item">机械制造技术<i class="el-icon-circle-close"></i></span>
            <span class="profession-item">机械制造技术<i class="el-icon-circle-close"></i></span>
          </div>
        </el-form-item>
        <el-form-item label="是否开启加入" prop="join">
          <el-radio-group v-model="ruleForm.join">
            <el-radio label="开启"></el-radio>
            <el-radio label="关闭"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'basicInfo',
    data () {
      return {
        ruleForm: {
          name: '',
          profession: '',
          join: '',
          desc: ''
        },
        rules: {
          name: [
            { required: false, message: '请输入名称', trigger: 'blur' }
          ],
          join: [
            { required: false, message: '是否开启加入', trigger: 'change' }
          ],
          desc: [
            { required: false, message: '请填写个人介绍', trigger: 'blur' }
          ]
        },
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
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .basicInfo {
    padding: 0 20px;
    background-color: #fff;
  }
  .title {
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid rgb(229, 229, 229);
  }
  .formData {
    margin: 20px auto 0;
    padding-bottom: 20px;
    width: 80%;
    .profession-item {
      margin-right: 10px;
      color: #666;
      i {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
</style>
