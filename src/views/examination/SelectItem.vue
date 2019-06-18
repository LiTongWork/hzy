<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'examinationList'}">试卷库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'onlineTest'}">在线组卷</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'manual'}">手动组卷</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search-box">
        <el-input placeholder="请输入试卷名称" v-model="searchs" clearable class="search-input"></el-input>
        <el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
      </div>
      <div class="buttons">
        <el-button type="primary" size="small" plain @click="select">选课</el-button>
        <el-button type="primary" size="small" plain @click="online">在线组卷</el-button>
      </div>
    </div>
    <div class="row-line" style="height:20px;"></div><!--间隔线-->
    <div class="selectType">
      <div style="min-width:1200px;max-width:1760px;margin:0 auto;">
        <el-radio-group v-model="selectType" size="small" @change="selectItem"> 
          <el-radio label="1" border>知识点选题</el-radio>
          <el-radio label="2" border>试卷选题</el-radio>
        </el-radio-group>
      </div>
      
    </div>
    <div class="row-line" style="height:20px;"></div><!--间隔线-->
    <div class="select-area">
      <ul class="select-box">
        <li>
          <span>课程:</span>
          <el-radio-group v-model="check1" size="small">
            <el-radio-button v-for="item in classes" :label="item" :key="item">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>类型:</span>
          <el-radio-group v-model="check2" size="small">
            <el-radio-button v-for="item in types" :label="item" :key="item">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
        <li>
          <span>来源:</span>
          <el-radio-group v-model="check3" size="small">
            <el-radio-button v-for="item in source" :label="item" :key="item">{{item}}</el-radio-button>
          </el-radio-group>
        </li>
      </ul>
    </div>
    <div class="row-line" style="height:20px;"></div>

    <!--侧边栏 浮动块-->
    <FloatAside></FloatAside>

    <div class="list-area">
      <div class="list-box">
        <p style="color:#666;">
          共搜索到
          <span style="color:red;">34</span> 条记录
        </p>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" prop="name" label="试卷名称" width="400"></el-table-column>
          <el-table-column align="center" prop="author" label="发布者"></el-table-column>
          <el-table-column align="center" prop="type" label="试卷应用类型"></el-table-column>
          <el-table-column align="center" prop="num" label="试题量"></el-table-column>
          <el-table-column align="center" prop="score" label="分数"></el-table-column>
          <el-table-column align="center" prop="volume" label="浏览量 ↓"></el-table-column>
          <el-table-column align="center" prop="time" label="发布时间 ↑"></el-table-column>
          <el-table-column align="center" prop="edit" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="page-area">
      <div class="page-box">
        <el-pagination
          background
          prev-text="上一页"
          next-text="下一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="prev, pager, next,total, sizes, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FloatAside from "./FloatAside.vue";
export default {
  name: "selectItem",
  components: {
    FloatAside
  },
  data() {
    return {
      point: false,
      selectType: '2',
      searchs: "",
      check1: "数学对口升学模拟冲刺卷",
      check2: "全部",
      check3: "理想校园",
      classes: ["数学对口升学模拟冲刺卷","英语对口升学模拟冲刺卷","种植升学模拟冲刺卷","语文对口升学模拟冲刺卷","液压与气压传动"],
      types: ["全部", "作业", "月考", "期中", "期末", "自定义"],
      source: ["理想校园"],
      tableData: [
        {
          name: "数学对口冲刺模拟考月考",
          author: "yanshijiaoshi",
          type: "月考",
          num: 30,
          score: 100,
          volume: "123次",
          time: "2019-02-12 17:00"
        },
        {
          name: "数学对口冲刺模拟考月考",
          author: "yanshijiaoshi",
          type: "月考",
          num: 30,
          score: 100,
          volume: "123次",
          time: "2019-02-12 17:00"
        },
        {
          name: "数学对口冲刺模拟考月考",
          author: "yanshijiaoshi",
          type: "月考",
          num: 30,
          score: 100,
          volume: "123次",
          time: "2019-02-12 17:00"
        },
        {
          name: "数学对口冲刺模拟考月考",
          author: "yanshijiaoshi",
          type: "月考",
          num: 30,
          score: 100,
          volume: "123次",
          time: "2019-02-12 17:00"
        }
      ],
      currentPage: 1
    };
  },
  methods: {
    selectItem(e){
        // console.log(e)
        if(e==1){
            this.$emit('listenPoint',true)
        }
    },
    select(){
      // this.$router.push({name: 'onlineTest'})
    },
    online(){
      this.$router.push({name: 'onlineTest'})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(row) {
      console.log(row);
    },
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

  .search-box {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    .search-input {
      width: 680px;
    }
  }
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
.select-area,
.list-area,
.page-area {
  width: 100%;
  background-color: #f2f3f3;
  box-sizing: border-box;
}
.select-box {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
  height: 170px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-content: space-around;
  flex-direction: column;
  & > li {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    span {
      margin: 0 10px;
    }
    .el-checkbox-button {
      margin-left: 20px;
    }
  }
}
.list-box {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 20px;
  background-color: #fff;
}
.page-box {
  max-width: 1760px;
  min-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 20px;
  text-align: center;
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
