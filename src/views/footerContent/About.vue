<template>
	
  <div class="about">
    <ul>
      <li>
        <h2 class="title">关于我们</h2>
        <div class="text">
          职教魔方资源库，是东北师大理想软件公司倾力打造的C2C资源分享网站，该平台于2015年8月底正式上线，主要为职业教育从业者提供海量、优质的资源，
          垂直于职业教育提供一切有价值的资源。用户可以根据自身的专业，多角度进行筛选资源。资源库的宗旨是，让每一位用户体验分享的乐趣，并真真正正提
          升自己，让教师更优秀，让学生更热爱学习。 职教魔方鼓励原创，鼓励分享，尊重和维护贡献者的权利。在职教魔方中，除了可以更快捷，更简单的查看和
          预览资源，你还可以分享你的优秀资源，通过职教魔方分享到不同的社交平台上。职教魔方目前已经适配Web端、移动端。
        </div>
      </li>
      <li>
        <h2 class="title">团队介绍</h2>
        <div class="text">
          职教魔方资源库，是东北师大理想软件公司倾力打造的C2C资源分享网站，该平台于2015年8月底正式上线，主要为职业教育从业者提供海量、优质的资源，
          垂直于职业教育提供一切有价值的资源。用户可以根据自身的专业，多角度进行筛选资源。资源库的宗旨是，让每一位用户体验分享的乐趣，并真真正正提
          升自己，让教师更优秀，让学生更热爱学习。 职教魔方鼓励原创，鼓励分享，尊重和维护贡献者的权利。在职教魔方中，除了可以更快捷，更简单的查看和
          预览资源，你还可以分享你的优秀资源，通过职教魔方分享到不同的社交平台上。职教魔方目前已经适配Web端、移动端。
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'about',
		data(){
			return{
				
			}
		}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.about{
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
    border-bottom: 1px solid #1ABC9C;
  }
  &:last-child .text {
    border: none;
  }
}
</style>
