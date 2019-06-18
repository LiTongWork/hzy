
<template>
  <div class="contact">
    <ul>
      <li>
        <h2 class="title">联系方式</h2>
        <div class="text">
          <span>联系电话：</span>
          <span>0431-84536901</span>
        </div>
      </li>
      <li>
        <h2 class="title">联系地址</h2>
        <div class="text">
          吉林省长春市净月大街2555号 东北师范大学 东北师大理想软件股份有限公司 职业教育事业部
        </div>
      </li>
      <li>
        <h2 class="title">工作时间</h2>
        <div class="text">
          <p>周一至周五: 8:30am - 5:00pm</p>
          <p>周日: 休息</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'contact',
		data(){
			return{
				
			}
		}
		
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.contact{
  background-color: #FFF;
  margin-left: 1%;
  width: 100%;
}
ul {
  padding: 0 29px 29px;
}
li {
  margin-top: 29px;
  .title {
    font-size: 18px;
    line-height: 18px;
    color: #1ABC9C;
  }
  .text {
    margin-top: 28px;
    padding-bottom: 29px;
    line-height: 30px;
    border-bottom: 1px solid rgb(229, 229, 229);
  }
  &:last-child .text {
    border: none;
  }
}
</style>
