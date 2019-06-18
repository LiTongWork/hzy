<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    // this.$moment().format('MMMM Do YYYY, h:mm:ss a'); // 七月 17日 2018, 10:47:33 晚上
    // this.$moment().format('dddd');                    // 星期二
    // this.$moment().format("MMM Do YY");               // 7月 17日 18
    // this.$moment().format('YYYY [escaped] YYYY');     // 2018 escaped 2018
    // this.$moment().format(); 
  }
};
</script>

<style lang="scss">
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0}
body{font-size:16px;font-family:arial,'Hiragino Sans GB','Microsoft Yahei','微软雅黑','宋体',\5b8b\4f53,Tahoma,Arial,Helvetica,STHeiti}
em{font-style:normal}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
p{word-wrap:break-word}
ul, ol, li { list-style:none; }
a { text-decoration:none; color:#333;}
a:hover { text-decoration:underline;text-decoration:none; }
button, input, select, textarea { font-size:100%; outline:none;}
table { border-collapse:collapse; border-spacing:0; }
.container {
  background-color: #f2f3f3;
}
span{outline:none;}
::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
background-color:#F2F3F3;
}
::-webkit-scrollbar {//滚动条的宽度
width:6px;
height:9px;
}
::-webkit-scrollbar-thumb {//滚动条的设置
background-color:#1ABC9C;
background-clip:padding-box;
min-height:28px;
border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
background-color:#1ABC9C;
}
*{border-color:#79F7E0;}
// 样式重置表 ↑


.el-header {
  background-color: #1abc9c;
  margin:0!important;padding:0!important;
}
.el-footer {
  background-color: #474443;
  margin:0!important;padding:0!important;
}

.el-aside {
  background-color: #fff;
  margin:0!important;padding:0!important;
}

.el-main {
  background-color: #f2f3f3;
  min-height: calc(100vh - 204px);
  margin:0!important;padding:0!important;
}

.clearfix, .layout { zoom: 1; }
.clearfix:after, .layout:after { visibility: hidden; display: block; content: "."; font-size: 0; height: 0; clear: both; }
.fl {float: left}
.fr {float: right;}
itemlist{
  item{
    display: block;
    p{
      display: inline;
    }
  }
}

</style>
