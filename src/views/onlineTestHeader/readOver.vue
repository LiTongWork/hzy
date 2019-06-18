<template lang="html">
  <div class="readOver">
    <div class="content-left">
      <div class="top">
        <span class="title">{{title}}</span>
      </div>
      <div class="topic">

        <ul class="list">
          <li class="list-item" :id="'item'+index" v-for="(item, index) in questionList" :key="index" v-if="item.layout">
            <p class="tiMu">第{{index+1}}题</p>
            <div class="xuanXiang" v-html="item.layout">
              <!-- <span>A:1+2</span>
              <span>B:2+2</span>
              <span>C:3+2</span>
              <span>D:4+2</span> -->
            </div>
            <div class="desc">
              <p v-if="loginType==2">【正确答案】 <span>{{item.correctXml}}</span></p>
              <!-- <p>【学生答案】 <span>B</span></p> -->
              <div>
                <span>选择： 
                  <span class="text-color">
                    <el-radio-group v-model="selectCurrentArr[index]" @change="selected">
                      <el-radio :label="item.questionId+'#A'">A</el-radio>
                      <el-radio :label="item.questionId+'#B'">B</el-radio>
                      <el-radio :label="item.questionId+'#C'">C</el-radio>
                      <el-radio :label="item.questionId+'#D'">D</el-radio>
                    </el-radio-group>
                  </span>
                </span>
                <span class="fr" v-if="loginType==2">正确答案<span class="text-color"> {{item.correctXml}}</span></span>
              </div>
            </div>
          </li>
          
        </ul>
      </div>
    </div>
    <div class="aslide">
      <div class="handle">
        <el-button class="dark-bg" @click="submit">提交试卷</el-button>
        <div class="countdown">{{count}}</div>
      </div>
      <div class="list">
        <div class="item">
          <!-- <h5>单选题</h5> -->
          <ul>
            <a :href="'#item'+index" v-for="(item, index) in questionList" :key="index" v-if="item.layout"> <li :class="{'active': selectCurrentArr[index]!=''}">{{index+1}}</li></a>
          </ul>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
var now = ''
  export default {
    name: 'readOver',
    data(){
      return {
        title: '',
        loginType: localStorage.getItem("loginType"),
        questionList: [],//题目列表
        selectCurrentArr: [],//选择正确答案
        page: 1,
        rows:1,
        total: 0,
        //服务器当前时间
        serverDate: '',
        //服务器截止时间
        endDate: '',
        count: '',//倒计时
      }
    },
    methods: {
      //考试倒计时
      countdown () {
        let that = this
        // 目标日期时间戳
        let end = Date.parse(new Date(this.endDate))
        // 当前时间戳
        now = this.serverDate
        // 相差的毫秒数
        let msec = end - now
        if (msec>=0) {
          // 计算时分秒数
          let day = '';
          let hr = parseInt(msec/1000/60/60);
          let min = parseInt(msec/1000/60 % 60);
          let sec = parseInt(msec/1000 % 60);
          // 个位数前补零
          hr = hr > 9 ? hr : '0' + hr
          min = min > 9 ? min : '0' + min
          sec = sec > 9 ? sec : '0' + sec
          // 赋值
          this.count = `${hr}:${min}:${sec}`
        }else{
          this.$alert('考试时间到，请停止答题', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log('yes')
            }
          });
          this.submit()
          return false;
        }
        // 一秒后递归
        setTimeout(function () {
          // console.log(that.serverDate ++)
          that.serverDate +=1000
          that.countdown()
        }, 900)
      },
      // 考生开始选择答案
      selected(val){
        let param = {
          "examId": JSON.parse(localStorage.getItem('examWorkStart')).id, //--考试id
          "questionId": val.split('#')[0], //--试题id
          "studentAnswer": val.split('#')[1], //--答题内容
          "paperId": JSON.parse(localStorage.getItem('examWorkStart')).paperId
        }
        this.$http
          .post("/ExamWork/RecordAnswer", param)
          .then(res => {
            // console.log(res.data)
            
          })
          .catch(res => {
            console.log(res);
          });
      },
      //开始考试获取考试题目
      getExamWorkList(){
        let val = JSON.parse(localStorage.getItem('examWorkStart'))
        let param = {
          "paperId":val.paperId, //--试卷id
          "id":val.id, //--考试id
        }
        this.$http
          .post("/ExamWork/ExamWorkList", param)
          .then(res => {
            // console.log(res.data.data)
            this.title = res.data.data.examWork.examName
            this.endDate = res.data.data.examWork.endTime
            this.serverDate = Date.parse(new Date(res.data.data.examWork.nowDate)) 
            this.questionList = res.data.data.questionList
            for(let i=0;i<this.questionList.length;i++){
              this.selectCurrentArr[i] = ''
            }
            this.countdown()
          })
          .catch(res => {
            console.log(res);
          });
      },
      //提交试卷
      submit(){
        this.$confirm('提交之后不可以修改，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
          id: JSON.parse(localStorage.getItem('examWorkStart')).id
        }
        this.$http
          .post("/ExamWork/SubmitExamWork", param)
          .then(res => {
            // console.log(res.data)
            if(res.data.code==200){
              this.$router.push({name: 'onlineTestIndex'})
            }
            
          })
          .catch(res => {
            console.log(res);
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
        
      }


    },
    mounted(){
      if(this.loginType==3){
        this.getExamWorkList()
      }
      
      console.log(JSON.parse(localStorage.getItem('examWorkStart')))
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .readOver {
    display: -moz-box;  /* Firefox */
    display: -ms-flexbox;    /* IE10 */
    display: -webkit-box;    /* Safari */
    display: -webkit-flex;    /* Chrome, WebKit */
    // display: box;
    display: flexbox;
    display: flex;
    padding: 20px 50px;
    background-color: #f3f3f3;
  }

  .content-left {
    -webkit-flex:1;/*Chrome*/
    -ms-flex:1;/*IE 10*/
    flex: 1;/* NEW ,Spec - Opera 12.1,Firefox 20+*/
    -webkit-box-flex:1;/*OLD -iOS 6-,Safari 3.1-6*/
    -moz-box-flex:1;/*OLD - Firefox 19-*/
    padding: 20px;
    background-color: #fff;
  }
  .top {
    height: 24px;
    line-height: 24px;
    font-size: 0;
    span {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .topic {
    padding: 30px;
    h4 {
      height: 36px;
      line-height: 36px;
    }
    .list {
      .list-item {
        padding-top: 30px;
        margin:20px 0 40px 0;
        border: 1px solid #eee;
        line-height: 54px;
        &:hover{
          border: 1px solid #666;
        }
      }
    }
    .tiMu {
      padding: 0 20px;
    }
    .xuanXiang {
      padding: 0 20px;
      span {
        margin-right: 30px;
      }
    }
    .desc {
      p {
        padding: 0 20px;
        border-top: 1px solid #eee;
      }
      div {
        padding: 0 20px;
        background-color: #eee;
      }
    }
  }
  .aslide {
    margin-left: 20px;
    padding: 0 20px 20px;
    width: 270px;
    .handle {
      position: fixed;
      button {
        width: 130px;
      }
      .countdown{
        width:130px;
        height: 50px;
        color: orangered;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        border-radius: 4px;
        position: fixed;
        margin: -46px 0 0 140px;
      }
    }
    .list {
      margin-top: 60px;
      padding: 20px;
      background-color: #fff;
      position: fixed;
      width: 270px;
      .item {
        margin-top: 20px;
        &:first-child {
          margin: 0;
        }
        h5 {
          line-height: 30px;
        }
        ul {
          font-size: 0;
          box-sizing: border-box;

          li {
            display: inline-block;
            vertical-align: top;
            margin-right: 20px;
            margin-top: 15px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
            border: 1px solid #eee;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: #1ABC9C;
            }
            &.active {
              color: #fff;
              background-color: #1ABC9C;
            }
          }
        }
      }
    }
  }
</style>
