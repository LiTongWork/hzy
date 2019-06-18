<template>
  <div class="container">
    <ul class="menu">
      <li>
        <router-link :to="{name: 'about'}">关于我们</router-link>
      </li>
      <li>|</li>
      <li>
        <router-link :to="{name: 'contact'}">联系我们</router-link>
      </li>
      <li>|</li>
      <li>
        <router-link :to="{name: 'help'}">帮助中心</router-link>
      </li>
      <li>|</li>
      <li>
        <router-link :to="{name: 'feedback'}">意见反馈</router-link>
      </li>
      <li>|</li>
      <li>
        <!-- <router-link :to="{name: 'management'}">后台管理</router-link> -->
        <a href="http://hzadmin.itknow.cn/" target="_black">后台管理</a>
      </li>
    </ul>
    <div class="copyright">Copyright © 2018 安徽慧职园教育科技有限公司 版权所有</div>
  </div>
</template>

<script>
export default {
  name: "foot"
};
</script>

<style lang="scss" scoped>
a {
  color: #807f7f;
}
.container {
  color: #807f7f;
  box-sizing: border-box;
  padding:0 20px;
  background-color: #474443;
  padding-top: 24px;
  .menu {
    width: 425px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .copyright {
    width: 425px;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
