<template lang="html">
  <div class="acountSetting">
    <div class="header-wrapper">
      <div class="title">
        账户设置
      </div>
    </div>
    <div class="content-wrapper">
      <el-tabs type="card" class="content-tab">
        <el-tab-pane class="tab" label="基本资料">
          <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sexuality">
                <el-radio-group v-model="ruleForm.sexuality">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="个人介绍" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="tel">
                <el-input v-model="ruleForm.tel"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane class="tab" label="修改头像">
          <div class="showPic">
            <div class="pic">
              <img v-if="imageUrl" :src="imageUrl">
            </div>
            <div class="tips">建议上传比例1:1的图片，支持格式 jpg/jpeg/png，图片小于5MB</div>
          </div>
          <el-upload
            class="pic-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <el-button class="dark-bg">选择图片</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane class="tab" label="修改密码">
          <div>
            <el-form :model="psdForm" :rules="psds" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="旧密码" prop="oldPsd">
                <el-input v-model="ruleForm.oldPsd"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPsd1">
                <el-input v-model="ruleForm.newPsd1"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="newPsd2">
                <el-input v-model="ruleForm.newPsd2"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">保存修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'acountSetting',
    data () {
      return {
        ruleForm: {
          name: '',
          sexuality: '',
          desc: '',
          email: '',
          tel: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, message: '', trigger: 'blur' }
          ],
          sexuality: [
            { required: false, message: '请选择性别', trigger: 'change' }
          ],
          desc: [
            { required: false, message: '请填写个人介绍', trigger: 'blur' }
          ],
          email: [
            { required: false, message: '请填邮箱', trigger: 'blur' }
          ],
          tel: [
            { required: false, message: '请填手机号码', trigger: 'blur' }
          ]
        },
        imageUrl: '',
        psdForm: {
          oldPsd: '',
          newPsd1: '',
          newPsd2: ''
        },
        psds: {
          oldPsd: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 1, max: 32, message: '', trigger: 'blur' }
          ],
          newPsd1: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 1, max: 32, message: '', trigger: 'blur' }
          ],
          newPsd2: [
            { required: true, message: '请确认新密码', trigger: 'blur' },
            { min: 1, max: 32, message: '', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .acountSetting {
    padding: 0 20px;
    background-color: #fff;
  }
  .title {
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid rgb(229, 229, 229);
  }
  .content-tab {
    margin-top: 29px;
    border: none;
  }
  .showPic {
    margin: 20px 0;
    font-size: 0;
    & > div {
      display: inline-block;
    }
    .pic {
      width: 200px;
      height: 200px;
      border: 1px solid rgb(229, 229, 229);
      img {
        width: 100%;
      }
    }
    .tips {
      padding-left: 10px;
      line-height: 16px;
      font-size: 16px;
      color: #999;
    }
  }
  .pic-uploader {
    padding-bottom: 30px;
  }
</style>
