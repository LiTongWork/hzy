<template>
<div class="float-box" id="float">
    <div class="container">
        <div class="left" id="hide">
            <el-badge :value="200" :max="99" class="item">
                <img src="../../assets/img/icon-buy.png" alt="购物车icon" style="width:25px;height:23px;">
            </el-badge>
            <span>试题栏</span>
            <span style="margin-top:220px;">⬅️</span>
        </div>
        <div class="right">
            <div style="font-size:17px;color:#5EBD9C;">已选试题：<span>20</span> </div>
            <div>单选题：<span>6</span> </div>
            <div>填空题：<span>6</span> </div>
            <div>简答题：<span>6</span> </div>
            <div style="font-size:14px;position:absolute;bottom:44px;cursor:pointer;color:#5EBD9C;"> 清空</div>
            <el-button size="small" type="primary" @click="toPreview" style="position:absolute;bottom:10px;margin-left:34px;">生成试卷</el-button>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'floatAside1',
    comments: {

    },
    methods: {
        toPreview(){
            this.$router.push({name: 'zuJuan'})
            // alert(123)
        }
    },
    mounted() {
        setTimeout(function(){
            document.getElementById("float").style.width='42px'
        },3000)
        document.getElementById("hide").onclick=function(){
            if(document.getElementById("float").style.width=='42px'){
                document.getElementById("float").style.width='200px'
            }else{
                document.getElementById("float").style.width='42px'
            }
        };
    },
}
</script>

<style lang="scss" scoped>
.float-box{
  position:fixed;
  top:180px;
  width:200px;
  height: 260px;
  background-color: #FFF;
  z-index: 999;
  right: 0;
  overflow-x: hidden;
  overflow: hidden;
  border:1px solid #5EBD9C;
  .container{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-color: #FFF;
    .left{
        float: left;
        width: 42px;
        height:260px;
        background-color: #5EBD9C;
        color: #FFF;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        align-items: flex-start;
        align-content: center;
        span{
            width: 17px;
            height: 70px;
            position: absolute;
            margin-top:30px;
            cursor: pointer;
        }
    }
    .right{
        float: left;
        width: 158px;
        height: 260px;
        background-color:#fff;
        box-sizing: border-box;
        padding: 5px 10px;
    }
}
}

</style>
