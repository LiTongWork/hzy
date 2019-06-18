<template>
  <div class="courseCount">
    <div class="title">
      课程统计
    </div>
    <div class="operating-btn">
      <el-button @click="itemChange($event)" id="0" :class="{'dark-bg': showIndex === 0}">课程数据概况</el-button>
      <el-button @click="itemChange($event)" id="1" :class="{'dark-bg': showIndex === 1}">课时学习详情</el-button>
    </div>
    <div class="info">
      <div v-show="showIndex === 0" class="chart">
        <div class="updateTime">数据更新时间：2019-03-12 09:50</div>
        <div class="count">
          <ul class="count-item">
            <li>
              <p class="num">0</p>
              <p class="text">课程学习人数</p>
            </li>
            <li>
              <p class="num">0</p>
              <p class="text">课程完成人数</p>
            </li>
            <li>
              <p class="num">0%</p>
              <p class="text">完成率</p>
            </li>
            <li>
              <p class="num">0</p>
              <p class="text">课程讨论总数</p>
            </li>
            <li>
              <p class="num">0</p>
              <p class="text">课程笔记总数</p>
            </li>
            <li>
              <p class="num">0</p>
              <p class="text">课程平均学习时长</p>
            </li>
          </ul>
          <div class="details">
            <el-button @click="openMask" class="dark-border">查看学员详情</el-button>
          </div>
        </div>
        <div class="chart-item">
          <div ref="myChart" class="myChart"></div>
          <el-button class="dark-border"><i class="el-icon-download"></i>保存图片</el-button>
        </div>
      </div>
      <div v-show="showIndex === 1" class="list">
        <div class="list-item">
          <el-table :data="studyData" style="width: 100%">
            <el-table-column label="课时名称" prop="title" align="center"></el-table-column>
            <el-table-column label="课时学习人数" prop="learnNum" align="center"></el-table-column>
            <el-table-column label="课时完成人数" prop="completeNum" align="center"></el-table-column>
            <el-table-column label="课时平均学习时长" prop="averageTime" align="center"></el-table-column>
            <el-table-column label="课时笔记总数" prop="notesNum" align="center" ></el-table-column>
          </el-table>
        </div>
        <!--<div class="paging">
          <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="20">
          </el-pagination>
        </div>-->
      </div>
      <div class="mask" v-show="showFlag">
        <div class="mask-item">
          <h3>查看学院详情<i @click="closeMask" class="el-icon-close fr"></i></h3>
          <div class="details-content">
            <el-table class="table"  height="350" :data="studentData" style="width: 100%">
              <el-table-column label="用户名" prop="name" align="center"></el-table-column>
              <el-table-column label="加入课程时间" prop="addTime" align="center"></el-table-column>
              <el-table-column label="完成课程时间" prop="completeTime" align="center"></el-table-column>
              <el-table-column label="课时学习时长" prop="learningTime" align="center"></el-table-column>
              <el-table-column label="讨论数" prop="discussNum" align="center" ></el-table-column>
              <el-table-column label="笔记数" prop="noteNum" align="center" ></el-table-column>
              <el-table-column label="作业平均分" prop="workAvgScore" align="center" ></el-table-column>
              <el-table-column label="考试平均分" prop="examAvgScore" align="center" ></el-table-column>
            </el-table>
          </div>
          <div class="paging">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="currentPage"
              :page-sizes="[10, 20]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="20">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入曲线图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  // 引入legend组件
  require('echarts/lib/component/legend')

  export default {
    name: 'courseCount',
    data () {
      return {
        showIndex: 0,
        showFlag: false,
        studentData: [
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          },
          {
            name: '哈哈哈',
            addTime: '00:00:00',
            completeTime: '00:00:00',
            learningTime: '00:00:00',
            discussNum: 0,
            noteNum: 0,
            workAvgScore: 0,
            examAvgScore: 0
          }
        ],
        studyData: [
          {
            title: '数学对口冲刺模拟冲刺卷1',
            learnNum: 23,
            completeNum: 20,
            averageTime: '00:23:00',
            notesNum: 34
          },
          {
            title: '数学对口冲刺模拟冲刺卷2',
            learnNum: 23,
            completeNum: 20,
            averageTime: '00:23:00',
            notesNum: 34
          }
        ],
        currentPage: 1
      }
    },
    mounted () {
      this.drawLine();
    },
    methods: {
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.myChart);
        // 绘制图表
        myChart.setOption({
          legend: {
            show: true,
            icon: 'circle',
            bottom: 'bottom'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            show: false,
            x: 50,
            x2: 30,
            y2: 40,
            containLabel: true
          },
          xAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2019-03-12', '2019-03-12', '2019-03-12', '2019-03-12', '2019-03-12', '2019-03-12', '2019-03-12']
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              name: '课程学习人数',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#1ABC9C',
                  lineStyle: {
                    color: '#1ABC9C'
                  }
                }
              },
              data: [5, 6, 5, 6, 9, 8, 3]
            },
            {
              name: '完成人数',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#5685EF',
                  lineStyle: {
                    color: '#5685EF'
                  }
                }
              },
              data: [3, 4, 7, 3, 8, 5, 6]
            }
          ]
        });
      },
      openMask () {
        this.showFlag = true;
      },
      closeMask () {
        this.showFlag = false;
      },
      itemChange (e) {
        console.log(typeof Number(e.currentTarget.id));
        this.showIndex = Number(e.currentTarget.id);
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .courseCount {
    padding: 0 20px;
    background-color: #fff;
  }
  .title {
    line-height: 64px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid rgb(229, 229, 229);
  }
  .operating-btn {
    padding: 20px 0;
  }
  .info {
    padding-bottom: 30px;
  }
  .chart {
    .updateTime {
      line-height: 36px;
      color: #999;
    }
    .count {
      padding-top: 20px;
      .count-item {
        display: inline-block;
        vertical-align: middle;
        width: 70%;
        li {
          display: inline-block;
          width: 30%;
          line-height: 34px;
          text-align: center;
          color: #666;
        }
      }
      .details {
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
    .myChart {
      display: inline-block;
      vertical-align: middle;
      width: 80%;
      height: 300px;
    }
  }
  .list {
    .list-item {
      border: 1px solid rgb(229, 229, 229);
      border-bottom: none;
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
    margin: 5% auto;
    padding-bottom: 10px;
    width: 900px;
    background-color: #fff;
    h3 {
      position: relative;
      line-height: 50px;
      text-align: center;
      background-color: #1ABC9C;
      color: #fff;
      i::before {
        position: absolute;
        right: 0;
        width: 50px;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .details-content {
      padding: 20px;
      .table {
        border: 1px solid rgb(229, 229, 229);
        border-bottom: none;
      }
    }
    .paging {
      padding-right: 20px;
    }
  }
</style>
