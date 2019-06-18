<template>
  <div class="questionManage">
    <div class="header-wrapper">
      <div class="title">
        <el-tabs class="fl" @tab-click="selectType">
          <el-tab-pane v-for="(item, index) in headline" :label="item" :key="index"></el-tab-pane>
        </el-tabs>
        <div class="fr">
          <el-button class="dark-bg">添加试题</el-button>
        </div>
      </div>
      <div class="select-wrapper">
        <el-select class="smallHeight" v-model="value" placeholder="全部课程">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-if="type === 0" class="smallHeight" v-model="value" placeholder="全部题型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-if="type === 0" class="smallHeight" v-model="value" placeholder="全部难度">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="title" v-show="type === 0">
        <el-checkbox v-model="checkAll">本页全选</el-checkbox>
        <span class="total">共{{total}}条记录</span>
        <div class="fr">
          <el-button class="dark-bg">批量删除</el-button>
        </div>
      </div>
      <ul class="list">
        <li class="list-item" v-for="(item, index) in chooseArr" :key="index">
          <p class="question">
            <el-checkbox v-model="item.checked"></el-checkbox>
            <span>1.{{item.title}}（）</span>
          </p>
          <p class="answer">
            <span v-for="(m, n) in item.answer" :key="n">
              <i>{{ n | answerName }}：</i>{{m}}
            </span>
          </p>
          <p class="optionInfo">
            <span>{{ item.info.difficulty }}</span>
            <i></i>
            <span>已选{{ item.info.hour }}课时</span>
            <i></i>
            <span>{{ item.info.type }}</span>
            <i></i>
            <span>{{ item.info.number }}</span>
            <i></i>
            <span>贡献者：{{ item.info.contributor }}</span>
            <i></i>
            <span>组卷次数：{{ item.info.times }}</span>
            <span class="fr">更新时间：{{item.info.updateTime}}</span>
          </p>
          <p class="btnArea">
            <span><i class="el-icon-document"></i>查看解析</span>
            <span v-show="type === 0"><i class="el-icon-edit"></i>编辑</span>
            <span v-show="type === 0"><i class="el-icon-delete"></i>删除</span>
            <span v-show="type === 1"><i class="el-icon-star-on"></i>取消收藏</span>
          </p>
        </li>
      </ul>
      <!-- <div class="paging">
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'questionManage',
    data () {
      return {
        headline: ['我的试题', '我的收藏'],
        type: 0,
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }
        ],
        value: '',
        checkAll: true,
        total: 0,
        chooseArr: [],
        currentPage: 1
      }
    },
    mounted () {
      this.changeHeadline(0)
    },
    methods: {
      selectType (tab) {
        this.type = Number(tab.index);
        console.log(typeof (this.type));
      },
      changeHeadline (type) {
        let _data = {
          total: 100,
          data: [
            {
              checked: true,
              title: '下面算术中，得数最大的是',
              answer: ['1+2', '1+3', '2+3', '5+3'],
              info: {
                difficulty: '简单',
                hour: '1',
                type: '单选',
                number: '000000111231',
                contributor: '演示教师',
                times: '1',
                updateTime: '2019-03-08 17:03'
              }
            },
            {
              checked: false,
              title: '下面算术中，得数最小的是',
              answer: ['5-3', '1+3', '2+3', '5+3'],
              info: {
                difficulty: '一般',
                hour: '1',
                type: '单选',
                number: '000000111231',
                contributor: '演示教师',
                times: '2',
                updateTime: '2019-03-08 17:03'
              }
            }
          ]
        };
        this.total = _data.total;
        this.chooseArr = _data.data;
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      }
    },
    filters: {
      answerName (index) {
        let name = '';
        switch (index) {
          case 0:
            name = 'A';
            break;
          case 1:
            name = 'B';
            break;
          case 2:
            name = 'C';
            break;
          case 3:
            name = 'D';
            break
        }
        return name
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .header-wrapper {
    padding: 0 20px;
    background-color: #fff;
    .title {
      height: 64px;
      line-height: 64px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid rgb(229, 229, 229);
      .el-tabs {
        height: 100%;
      }
      /deep/ {
        .el-tabs__item {
          font-size: 16px;
        }
        .el-tabs__nav-wrap::after {
          background-color: #fff;
        }
      }
    }
    .select-wrapper {
      height: 64px;
      line-height: 64px;
      padding-bottom: 10px;
    }
  }
  .content-wrapper {
    margin-top: 10px;
    padding: 0 20px 30px;
    font-size: 14px;
    color: #999;
    background-color: #fff;
    .title {
      height: 69px;
      line-height: 69px;
    }
  }
  .list-item {
    margin-top: 19px;
    border: 1px solid rgb(229, 229, 229);
    p {
      padding: 0 16px;
      line-height: 54px;
      span, i {
        display: inline-block;
      }
    }
    .question {
      color: #333;
      .el-checkbox {
        margin-right: 10px;
        width: 18px;
        height: 18px;
      }
    }
    .answer {
      color: #333;
      padding-left: 47px;
      span {
        margin-right: 20px;
      }
    }
    .optionInfo {
      i {
        vertical-align: middle;
        width: 1px;
        height: 14px;
        background-color: #999;
        margin: -2px 15px 0;
      }
    }
    .btnArea {
      color: #666;
      border-top: 1px solid rgb(229, 229, 229);
      span {
        margin-right: 20px;
        cursor: pointer;
      }
      i {
        margin-right:5px;
        color: #1ABC9C;
      }
    }
  }
</style>
