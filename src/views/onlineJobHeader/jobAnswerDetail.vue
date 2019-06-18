<template lang="html">
  <div class="answerDetail">
    <div class="main">
      <div class="content-left">
        <div class="top">
          <span class="title">数学对口升学模拟冲刺卷作业</span>
          <span class="line-between">|</span>
          <span class="name">姓名： 檀无心</span>
        </div>
        <div class="topic danXuan">
          <h4>一、单选题</h4>
          <ul class="list">
            <li class="list-item">
              <p class="tiMu">1.<span>(2分)</span> 下面算式中，得数最大的是（）。</p>
              <div class="xuanXiang">
                <span>A:1+2</span>
                <span>B:2+2</span>
                <span>C:3+2</span>
                <span>D:4+2</span>
              </div>
              <div class="desc">
                <p>【正确答案】 <span>B</span></p>
                <p>【学生答案】 <span>B</span></p>
                <p>【学生得分】 <span>2分</span></p>
                <p>【本体解析】 <span>B</span></p>
              </div>
              <div class="info">
                <div class="info-item complexity">困难</div>
                <br>
                <div class="info-item rightNum">0%人答对</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="topic tianKong">
          <h4>一、填空题</h4>
          <ul class="list">
            <li class="list-item">
              <p class="tiMu">1.<span>(2分)</span> 下面算式中，得数最大的是（）。</p>
              <div class="xuanXiang">
                <span>A:1+2</span>
                <span>B:2+2</span>
                <span>C:3+2</span>
                <span>D:4+2</span>
              </div>
              <div class="desc">
                <p>【正确答案】 <span>B</span></p>
                <p>【学生答案】 <span>B</span></p>
                <p>【学生得分】 <span>2分</span></p>
                <p>【本体解析】 <span>B</span></p>
              </div>
              <div class="info">
                <div class="info-item complexity">困难</div>
                <br>
                <div class="info-item averageScore">平均分：0.5分</div>
                <br>
                <div class="info-item rightNum">满分人数：0人</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="aslide">
        <div class="handle">
          <el-button class="dark-bg" @click="openMask">得分详情</el-button>
          <el-button class="dark-border">下载试卷</el-button>
        </div>
        <div class="info">
          <div class="score">
            <p>20</p>
            <span>得分</span>
          </div>
          <ul>
            <li>交卷时间：<span>2019-04-06 11：22</span></li>
            <li>用时：<span>60分钟</span></li>
            <li>课程：<span>毛概</span></li>
            <li>类型：<span>月考</span></li>
            <li>题数：<span>共20题</span></li>
          </ul>
        </div>
      </div>
      <div class="mask" v-show="showMask">
        <div class="mask-item tm">
          <h3>得分详情<i class="el-icon-close" @click="closeMask"></i></h3>
          <div class="details">
            <el-table :data="maskData" border>
              <el-table-column align="center" prop="label"  label=""></el-table-column>
              <el-table-column align="center" label="单选题">
                <template slot-scope="scope">
                  <span>{{scope.row.danXuan}}</span> 道
                </template>
              </el-table-column>
              <el-table-column align="center" label="简答题">
                <template slot-scope="scope">
                  <span>{{scope.row.jianDa}}</span> 道
                </template>
              </el-table-column>
              <el-table-column align="center" label="综合题">
                <template slot-scope="scope">
                  <span>{{scope.row.zongHe}}</span> 道
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mask-btn">
            <el-button class="dark-bg" @click="closeMask">知道了</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'answerDetail',
    data () {
      return {
        showMask: false,
        maskData: [
          {
            label: '满分',
            danXuan: 0,
            jianDa: 0,
            zongHe: 0
          },
          {
            label: '半对',
            danXuan: 0,
            jianDa: 0,
            zongHe: 0
          },
          {
            label: '答错',
            danXuan: 0,
            jianDa: 0,
            zongHe: 0
          },
          {
            label: '总分',
            danXuan: 0,
            jianDa: 0,
            zongHe: 0
          }
        ]
      }
    },
    methods: {
      openMask () {
        this.showMask = true
      },
      closeMask () {
        this.showMask = false
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .answerDetail {

  }
  .main {
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
    padding: 30px;
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
      font-weight: bold;
    }
    .line-between {
      position: relative;
      top: -1px;
      margin: 0 20px;
    }
  }
  .topic {
    padding: 15px 30px;
    h4 {
      height: 60px;
      line-height: 60px;
    }
    .list {
      padding: 20px;
      border: 1px solid #eee;
      .list-item {
        position: relative;
        line-height: 54px;
      }
    }
    .tiMu {
      span {
        margin: 0 5px;
        color: #999;
      }
    }
    .xuanXiang {
      span {
        margin-right: 30px;
      }
    }
    .desc {
      p {
        border-top: 1px solid #eee;
      }
    }
    .info {
      position: absolute;
      right: 0;
      top: 0;
      line-height: normal;
      text-align: right;
      font-size: 0;
      .info-item {
        display: inline-block;
        margin-bottom: 10px;
        padding: 8px 12px;
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        &.complexity {
          background-color: #FFAE15;
        }
        &.averageScore {
          background-color: #FA9399;
        }
        &.rightNum {
          background-color: #7683FF;
        }
      }
    }
  }
  .aslide {
    margin-left: 20px;
    width: 270px;
    .handle {
      font-size: 0;
      button {
        display: inline-block;
        width: 130px;
      }
    }
    .info {
      margin-top: 10px;
      padding-top: 45px;
      background-color: #fff;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      .score {
        margin: 0 auto;
        width: 104px;
        height: 104px;
        text-align: center;
        color: #fff;
        background:linear-gradient(180deg,rgba(143,213,175,1),rgba(26,188,156,1));
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        p {
          padding-top: 30px;
          line-height: 36px;
        }
      }
      ul {
        padding: 20px 20px 100px;
        li {
          margin-top: 20px;
          span {
            color: #666;
          }
        }
      }
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
  .mask-item {
    display: -moz-box;  /* Firefox */
    display: -ms-flexbox;    /* IE10 */
    display: -webkit-box;    /* Safari */
    display: -webkit-flex;    /* Chrome, WebKit */
    // display: box;
    display: flexbox;
    display: flex;
    flex-direction: column ;
    margin: 5% auto;
    width: 840px;
    max-height: 80%;
    background-color: #fff;
    overflow: hidden;
    h3 {
      position: relative;
      width: 100%;
      line-height: 50px;
      text-align: center;
      background-color: #1ABC9C;
      color: #fff;
      i::before {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .mask-btn {
      width: 100%;
      height: 52px;
      line-height: 52px;
      text-align: center;
      border-top: 1px solid rgb(229, 229, 229);
    }
    .details {
      -webkit-flex:1;/*Chrome*/
      -ms-flex:1;/*IE 10*/
      flex: 1;/* NEW ,Spec - Opera 12.1,Firefox 20+*/
      -webkit-box-flex:1;/*OLD -iOS 6-,Safari 3.1-6*/
      -moz-box-flex:1;/*OLD - Firefox 19-*/
      padding: 20px;
      font-size: 0;
      overflow-y: auto;
    }
  }
</style>
