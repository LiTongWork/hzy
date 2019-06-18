<template>
  <div class="feedback">
    <ul>
      <li class="headline">
        <span class="title">标题</span>
        <div class="title-content"><input class="content-input" type="text" placeholder="6-20个字"></div>
      </li>
      <li class="content">
        <span class="title">内容</span>
        <div class="title-content"><textarea class="content-input" placeholder="请填写意见内容..."></textarea></div>
      </li>
      <li class="contact">
        <span class="title">联系方式</span>
        <div class="title-content"><input class="content-input" type="text" placeholder="6-100个字"></div>
      </li>
      <li class="submit">
        <el-button type="primary" size="mini">提交</el-button>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'feedback',
    data () {
      return {

      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.feedback {
  padding-bottom: 160px;
  background-color: #FFF;
  margin-left: 1%;
  width: 100%;
}
li {
  margin-top: 29px;
  font-size: 0;
  .title{
    display: inline-block;
    vertical-align: top;
    width: 131px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
    padding-right: 20px;
    color: #333;
  }
  div {
    display: inline-block;
    width: 700px;
    border-radius:3px;
    .content-input {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      border:1px solid rgb(229, 229, 229);
      padding: 10px;
    }
  }
  &.content {
    .content-input {
      resize: vertical;
      min-height: 100px;
    }
  }
  &.submit {
    padding-left: 151px;
//       button {
//         width: 60px;
//         height: 32px;
//         cursor: pointer;
//         color: #fff;
//         background-color: #1ABC9C;
//         border-radius:3px;
//       }
  }
}
</style>
