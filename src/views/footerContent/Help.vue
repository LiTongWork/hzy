<template>
  <div class="help">
      <div class="ul">
        <div class="li">
          <h2 class="title">为什么无法登陆网站？</h2>
          <p class="text">
            1. 请核对用户名及密码，忘记可联系管理员修改密码 2. 请检查系统时间是否正确，系统时间超出正常范围将导致Cookie失效
          </p>
        </div>
        <div class="li">
          <h2 class="title">为什么无法登陆网站？</h2>
          <p class="text">
            1. 请核对用户名及密码，忘记可联系管理员修改密码 2. 请检查系统时间是否正确，系统时间超出正常范围将导致Cookie失效
          </p>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'help',
    data () {
      return {
        activeName: '1'
      };
    },
    methods: {
      // handleChange (val) {
      //   console.log(val);
      // }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">	
.help{
  background-color: #FFF;
  margin-left: 1%;
  width: 100%;
}
.ul {
  padding: 0 29px 29px;
}
.li {
  cursor: pointer;
  .title {
    position: relative;
    padding-left: 24px;
    margin-top: 29px;
    font-size: 18px;
    line-height: 18px;
    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -3px;
      border-top:6px solid #1ABC9C;
      border-left:6px dashed transparent;
      border-right:6px dashed transparent;
    }
  }
  .text {
    margin-top: 22px;
    padding-bottom: 23px;
    line-height: 30px;
  }
  &:last-child .text {
    border: none;
  }
}
</style>
