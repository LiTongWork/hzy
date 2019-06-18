<template>
  <div class="container">
    <ul class="nav">
      <li class="about item-1">
        <router-link :to="{name: 'about'}">关于我们</router-link>
      </li>
      <li class="contact item-2">
        <router-link :to="{name: 'contact'}">联系我们</router-link>
      </li>
      <li class="help item-3">
        <router-link :to="{name: 'help'}">帮助中心</router-link>
      </li>
      <li class="feedback item-4">
        <router-link :to="{name: 'feedback'}">意见反馈</router-link>
      </li>
    </ul>

		<router-view />
	

  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 'footerContent'
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.container {
	margin: 0 auto;
	display: flex;
	min-width: 1200px;
	max-width: 1760px;
	box-sizing: border-box;
	background-color: #F2F3F3;
	padding-top: 30px;
	.nav {
		flex: 0 0 270px;
		width: 270px;
		li {
			margin-bottom: 10px;
			width: 270px;
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			border-radius:3px;
			overflow: hidden;
		}
		a {
			display: block;
			padding-left: 54px;
			font-size: 18px;
			&:hover, &.active{
				color: #fff;
				background-color: #1ABC9C;
			}
		}
	}

}
</style>
