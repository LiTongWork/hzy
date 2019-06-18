<template>
<div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'questionsList'}">试题库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'zuJuan'}">在线组卷</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'editTest'}">生成试卷</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="buttons">
        <!-- <el-button type="primary" size="small" plain @click="select">选课</el-button> -->
        <el-button type="primary" size="small" plain @click="add">添加试题</el-button>
      </div>
    </div>

    <div class="row-line" style="height:20px;"></div><!--间隔线-->
   
    <div class="main">
      <div class="box">
        <div class="lists">
            <div class="htitle">
                <input type="text" v-model="structureName">
                <el-button type="text" @click="editPaperName">修改</el-button>
            </div>
            <div class="set">
                是否公开:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-radio v-model="radio" label="0">公开</el-radio>
                <el-radio v-model="radio" label="1">不公开</el-radio>
            </div>
            <div style="color:#999999;font-size:14px;text-align:center;margin-bottom:20px;">(同意公开则其他用户可以直接查看或者下载您的试卷）</div>
            <!-- <div style="color:#333;font-size:14px;">注意事项: <span style="color:#666;">受打击阿富汗的撒可怜见放声大哭警方表示三大法宝撒娇客户拜访计划岸边房价肯定撒</span> </div> -->
            <!-- <div class="step1">第一部分：非主观题</div> -->
            
            <div v-for="(item, index) in datas.structureList" :key="index">
              <div class="danxuan">{{index==0?'一':index==1?'二':index==2?'三':index==3?'四':index==4?'五':'六'}}、<input type="text" v-model="item.structureName">  （<input type="text" v-model='structureInfo' style="width:200px;">）<el-button type="text" @click="editQuestionName(item.id,item.structureName)">修改</el-button></div>
              <div class="item" v-for="(ite, inde) in item.questionList" :key="inde">
                <div class="title">
                  <span>{{inde+1}}. </span>
                  <span style="color:#1ABC9C;">(<el-input @blur="editQuestionScore(ite.questionId, ite.questionScore)" size="mini" v-model="ite.questionScore" placeholder="请输入分值" style="width:50px;"></el-input>分)</span>
                  <!-- <span>下面算式中，得数最大的是（    ）。</span> -->
                </div>
                <div class="answer" v-html="ite.layout">
                  <!-- <p>A:sdfsdf</p>
                  <p>B:sdfsdf</p>
                  <p>C:sdfsdf</p>
                  <p>D:sdfsdf</p> -->
                </div>
                <div class="control">
                  <span><img src="../../assets/img/icon-ans.png"><em @click="showAnalysis(ite.analysis)">解析</em><img src="../../assets/img/icon-delete.png"><em @click="deleteQuestion(ite.questionId)">删除</em><img src="../../assets/img/icon-up.png"><em @click="move(true, ite.questionId)">上移</em><img src="../../assets/img/icon-down.png"><em @click="move(false, ite.questionId)">下移</em></span>
                </div>
              </div>
            </div>

        </div>
        <div class="right-area" style="width: 15.3%;float:right;">
          <!-- <el-button type="primary" size="small">预览</el-button> -->
            <el-button type="primary" size="small" @click="downloadPaper">下载试卷</el-button><br><br>
            <span style="width:50%;">总分:
              <span style="color:#FF6565;">{{datas.fullMarks}}分</span>&nbsp;&nbsp;&nbsp;&nbsp;
            </span>

            <span style="width:50%;">
              &nbsp;&nbsp;&nbsp;&nbsp;
              题数:
              <span style="color:#FF6565;">{{datas.questionNumber}}</span>
            </span>
            <!-- <p style="color:#999999;text-align:center;margin-top:15px;margin-bottom:10px;">第一部分 非主观题</p> -->
            <br><br>
            <p style="margin-bottom:10px;height:18px;" v-for="(item, index) in datas.structureList" :key="index">
              <span style="float:left;">{{index==0?'一':index==1?'二':index==2?'三':index==3?'四':index==4?'五':'六'}}、{{item.structureName}}</span>
              <span style="float:right;">{{item.questionScore}}分</span>
            </p>
            <el-button size="small" style="margin-top:50px;" @click="$router.push({name:'questionsList'})">继续选题</el-button>
          </div>
      </div>
    </div>

    <el-dialog title="选择纸张类型与行间距" :visible.sync="dialogFormVisible">
      <el-form :model="formAlert">
        <el-form-item label="纸张类型" :label-width="formLabelWidth">
          <el-select v-model="formAlert.pageType" placeholder="请选择纸张类型">
            <el-option label="A4" value="1"></el-option>
            <el-option label="A3双栏" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行间距" :label-width="formLabelWidth">
          <el-select v-model="formAlert.lineSpacing" placeholder="请选择行间距">
            <el-option label="紧凑" value="1"></el-option>
            <el-option label="正常" value="2"></el-option>
            <el-option label="宽" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>

<script>

export default {
  name: "editTest",
  components: {
    
  },
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      formAlert: {
        pageType: '',//--纸质类型（1:A4;2:A3双栏）
        lineSpacing: ''//--行间距（1:紧凑;2:正常;3:宽）
      },
      radio: '',//是否公开
      datas: {},//试卷预览页面的所有数据
      structureName: '',//试卷名字
      structureInfo: '共 题，每题 分',  //试题的信息 "共3题，每题10分"
    };
  },
  methods: {
    //上移或者下移
    move(torf, id){
      let param = {
        "structureId":id,
        "isUpper":torf
      }
      // console.log(param); return false
      this.$http.post('/GroupPaper/UpdateSort',param)
      .then(res=>{
        // console.log(res.data)
        this.$notify({
          title: '成功',
          message: res.data.message,
          type: 'success'
        });
        this.getGeneratedPaper1()
      })
      .catch(res=>{
        console.log(res.data)
        this.$notify({
          title: '警告',
          message: res.data.message,
          type: 'warning'
        });
      })
    },
    //删除试卷里面的题目
    deleteQuestion(id){
      let param = {
        "paperId":this.datas.id,
        "questionId":id
      }
      // console.log(param); return false
      this.$http.post('/GroupPaper/RemoveQuestion',param)
      .then(res=>{
        console.log(res.data)
        this.$notify({
          title: '成功',
          message: res.data.message,
          type: 'success'
        });
        
      })
      .catch(res=>{
        console.log(res.data)
        this.$notify({
          title: '警告',
          message: res.data.message,
          type: 'warning'
        });
      })

    },
    //修改小题的分值
    editQuestionScore(qid, score){
      let param = {
          "paperId":this.datas.id,
          "questionId":qid,
          "questionScore":score
      }
      // console.log(param); return false
      this.$http.post('/GroupPaper/UpdateScore',param)
      .then(res=>{
        console.log(res.data)
        this.$notify({
          title: '成功',
          message: res.data.message,
          type: 'success'
        });
        this.getGeneratedPaper1()
      })
      .catch(res=>{
        console.log(res.data)
        this.$notify({
          title: '警告',
          message: res.data.message,
          type: 'warning'
        });
      })
    },
    //修改试卷标题
    editPaperName(){
      let param = {
          "id":this.datas.id,
          "paperName":this.structureName
      }
      this.$http.post('/GroupPaper/UpdateTitle',param)
      .then(res=>{
        console.log(res.data)
        if(res.data.code == 200){
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success'
          });
        }else{
          this.$notify({
            title: '警告',
            message: res.data.message,
            type: 'warning'
          });
        }
        
      })
      .catch(res=>{
        console.log(res.data)
        this.$notify({
          title: '警告',
          message: res.data.message,
          type: 'warning'
        });
      })

    },
    //修改试题结构标题
    editQuestionName(id,name){
      let param = {
          "id":id,
          "structureName":name,
          "structureInfo":this.structureInfo
      }
      // console.log(param); return false
      this.$http.post('/GroupPaper/UpdateStructure',param)
      .then(res=>{
        console.log(res.data)
        this.$notify({
          title: '成功',
          message: res.data.message,
          type: 'success'
        });
        
      })
      .catch(res=>{
        console.log(res.data)
        this.$notify({
          title: '警告',
          message: res.data.message,
          type: 'warning'
        });
      })

    },
    //查看解析
    showAnalysis(val){
      this.$alert(val, '查看', {
          dangerouslyUseHTMLString: true
        });
    },
    select() {
      this.$router.push({name: 'xuanKe'})
    },
    add() {
      this.$router.push({name: 'addTest'})
    },
    //下载试卷
    downloadPaper(){
      this.dialogFormVisible = true
    },
    //下载试卷
    submit(){
      let param = {
          "paperId": this.$route.params.paperId || this.paperId, //--试卷id
          "pageType":this.formAlert.pageType,  //--纸质类型（1:A4;2:A3双栏）
          "lineSpacing":this.formAlert.lineSpacing //--行间距（1:紧凑;2:正常;3:宽）
      }
      // console.log(param);return false;  
      this.$http.post('/GroupPaper/DownloadPaper',param)
      .then(res=>{
        console.log("下载",res)
        // window.open(`${this.$http.baseUrlApi}/file/Download?fileName=${res.data.data}`)
				window.open(res.data.data)
      })
      .catch(res=>{
        console.log(res.data)
      })
    },
    //根据试卷ID 调用浏览试卷接口  获取试卷
    getGeneratedPaper(){
      let param = {
        "paperId":!this.$route.params.paperId ? this.paperId || this.datas.id : this.$route.params.paperId
      };
      this.$http
        .post("/GroupPaper/PaperStructure", param)
        .then(res => {
          // console.log(11111,res.data.data)
          this.datas = res.data.data
          this.radio = `${res.data.data.isPublic}`
          this.structureName = res.data.data.paperName
        })
        .catch(res => {
          console.log(res.data);
        });
    }
    
    
  },
  mounted() {
    // console.log(this.$route.params)
    if(this.$route.params.paperId){
      this.getGeneratedPaper() //调用浏览单个试卷接口  获取试卷
    }
    if(!this.$route.params.paperId){
      this.$router.push({name: 'examinationList'})
    }
  },
  created(){
    
  }
};
</script>


<style lang="scss" scoped>

.nav {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  .buttons {
    button {
      margin-left: 20px;
    }
  }
}
.selectType{
  background-color: #F2F3F3;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
}
.row-line,
.select-area{
  width: 100%;
  background-color: #f2f3f3;
  box-sizing: border-box;
}
.main{
  width: 100%;
  background-color: #F2F3F3;
  box-sizing: border-box;
  .box{
    max-width: 1760px;
    min-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #F2F3F3;
    position: relative;
    padding:0 0 30px 0;
    .lists{
      position: relative;
      width: 84%;
      height: auto;
      right:0;
      background-color: #FFF;
      padding: 30px 100px 30px 60px;
      box-sizing: border-box;
      .htitle{
          width: 100%;
          height: 70px;
          border:1px solid #8CDDCD;
        //   border:1px solid #F0F0F0;
          display: flex;
          justify-content: center;
          input{
              border:none;
              width: 90%;
              text-align: center;
              font-size: 24px;
          }

      }
      .set{
          width: 100%;
          height: 30px;
          margin:10px 0;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .step1{
          font-size: 20px;
          text-align: center;
          width:100%;
            margin:30px 0 10px 0;
      }
      .danxuan{
          width: 100%;
          height: 70px;
          align-items: center;
          display: flex;
          border:1px solid #8CDDCD;
          box-sizing: border-box;
          padding:0 25px;
          input{
            border:none;
            width: 100px;
            text-align: center;
          } 
      }
      .item{
        width: 100%;
        background-color: #FFF;
        box-sizing: border-box;
        padding: 30px 25px 10px 25px;
        height:auto;
        font-size: 15px;
        color:#333;
        margin-bottom:20px;
        border:1px solid #F0F0F0;
        &:hover{
            border:1px solid #8CDDCD;
        }
        .title{
          margin-bottom:10px;
          span{
            input{
              width: 50px;
              border:none;
            }
          }
        }
        .answer{
          margin-bottom:20px;
          p{
            padding: 3px 0;
          }
        }
        .desc,.control{
          width: 100%;
          display: flex;
          justify-content: space-between;
          height:45px;
          align-items: center;
          font-size: 14px;
          color:#A5A5A5;
        }
        .desc{
          span:first-child{
            width:550px;
            display: flex;
            justify-content: space-between;
          }
        }
        .control{
          color: #333;
          span:first-child{
            img{
              width: 18px;
              height:18px;
              margin-left:20px;
              cursor: pointer;
            }
            img:first-child{
              margin-left:0;
            }
            em{
              cursor: pointer;
            }
            width:250px;
            display: flex;
            justify-content: space-between;
          }
        }
      }


    }
    .right-area {
      box-sizing: border-box;
      padding: 15px;
      text-align:center;
      // min-width: 245px;
      background-color: #fff;
      position: absolute;
      right: 0;
      top:0;
      
    }


  }
}



.separator {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    .item {
      margin-left: 10px;
    }
    .icon {
      width: 13px;
      height: 20px;
    }
  }
</style>
