<template>
  <div class="testAnalysis">
    <div class="score">
      <p class="title"><span>试卷总分值</span><span>120</span></p>
      <div class="score-table">
        <el-table class="table" border :data="scoreData" style="width: 100%">
          <el-table-column label="题型" prop="questionType" align="center"></el-table-column>
          <el-table-column label="总分" prop="totalPoints" align="center"></el-table-column>
          <el-table-column label="数量" prop="questionNum" align="center"></el-table-column>
          <el-table-column label="平均分" prop="avgScore" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="knowledge">
      <p class="title"><span>知识点分布</span></p>
      <div class="knowledge-content">
        <div class="knowledgePie" ref="knowledgePie"></div>
        <div class="knowledge-table">
          <el-table class="table" border :data="knowledgeData" style="width: 100%">
            <el-table-column label="范围" prop="name" align="center"></el-table-column>
            <el-table-column label="比例（%）" prop="value" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="difficulty">
      <p class="title"><span>难点分析</span></p>
      <div class="difficulty-content">
        <div class="difficultyPie" ref="difficultyPie"></div>
        <div class="difficulty-table">
          <el-table class="table" border :data="difficultyData" style="width: 100%">
            <el-table-column label="范围" prop="name" align="center"></el-table-column>
            <el-table-column label="比例（%）" prop="value" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  // 引入legend组件
  require('echarts/lib/component/legend')

  export default {
    name: 'testAnalysis',
    data () {
      return {
        scoreData: [
          {
            questionType: '单选题',
            totalPoints: 66,
            questionNum: 33,
            avgScore: 2
          }
        ],
        knowledgeData: [
          {
            name: '模拟冲刺卷1',
            value: 20
          },
          {
            name: '模拟冲刺卷2',
            value: 30
          },
          {
            name: '模拟冲刺卷3',
            value: 40
          }
        ],
        difficultyData: [
          {
            name: '简单',
            value: 40
          },
          {
            name: '一般',
            value: 30
          },
          {
            name: '困难',
            value: 50
          }
        ]
      }
    },
    mounted () {
      this.drawPie(this.$refs.knowledgePie, this.knowledgeData);
      this.drawPie(this.$refs.difficultyPie, this.difficultyData);
    },
    methods: {
      drawPie (ref, val) {
        let arr = [];
        this.$nextTick(() => {
          val.forEach(item => {
            arr.push(item.name);
          });
          // 基于准备好的dom，初始化echarts实例
          let knowledgeChart = echarts.init(ref);
          // 绘制图表
          knowledgeChart.setOption({
            color: ['#7683FF', '#FA9399', '#FFAE15'],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: '300',
              top: '30%',
              data: arr
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['60%', '20%'],
                center: ['30%', '60%'],
                data: val,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  normal: {
                    position: 'inner',
                    formatter: '{d}%'
                  }
                }
              }
            ]
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .score, .knowledge, .difficulty {
    padding-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    .title {
      padding-left: 30px;
      line-height: 20px;
      border-left: 5px solid #1ABC9C;
      span {
        display: inline-block;
      }
    }
    .score-table {
      padding: 30px;
    }
  }
  .knowledge-content, .difficulty-content {
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
    .knowledgePie, .difficultyPie {
      width: 45%;
      height: 300px;
    }
    .knowledge-table, .difficulty-table {
      width: 45%;
    }
  }

</style>
