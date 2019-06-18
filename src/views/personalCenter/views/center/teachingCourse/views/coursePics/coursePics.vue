<template>
  <div class="coursePics">
    <div class="title">
      课程图片
    </div>
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'coursePics',
    data () {
      return {
        imageUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
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
  .coursePics {
    padding: 0 20px;
    background-color: #fff;
  }
  .title {
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid rgb(229, 229, 229);
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
