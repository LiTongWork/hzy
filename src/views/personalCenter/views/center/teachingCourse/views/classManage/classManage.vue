<template>
  <div class="classManage">
    <div class="header-wrapper">
      <div class="title">
        <span>教师设置</span>
        <div class="fr">
          <el-button>添加章</el-button>
          <el-button>添加节</el-button>
          <el-button>添加课时</el-button>
          <el-button class="dark-bg">发布考试</el-button>
          <el-button class="dark-bg">发布作业</el-button>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <ul class="list">
        <li class="list-item">
          <i>&lt;&lt;&lt;</i>
          <span>章1：模拟冲刺卷1</span>
          <div class="handle fr">
            <el-button class="edit" @click="openMask">编辑</el-button>
            <el-button>删除</el-button>
            <el-select class="smallWith smallHeight" v-model="value1" placeholder="添加">
              <el-option v-for="item in zhang" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </li>
        <li class="list-item">
          <i>&lt;&lt;</i>
          <span>节1：模拟冲刺卷1</span>
          <div class="handle fr">
            <el-button class="edit" @click="openMask">编辑</el-button>
            <el-button>删除</el-button>
            <el-select class="smallWith smallHeight" v-model="value2" placeholder="添加">
              <el-option v-for="item in jie" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </li>
        <li class="list-item">
          <i>&lt;</i>
          <span>课时1：模拟冲刺卷1</span>
          <div class="handle fr">
            <el-button class="edit" @click="openMask">编辑</el-button>
            <el-button>预览</el-button>
            <el-select class="smallWith smallHeight" v-model="value3" placeholder="更多">
              <el-option v-for="item in more" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <div class="oo">
        <span><img src="./img/oo.jpg" alt=""></span>
        <span><img src="./img/oo.jpg" alt=""></span>
      </div>
    </div>
    <div class="mask" v-show="showFlag">
      <div class="mask-item">
        <h3>编辑名称</h3>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item class="nameInput" label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <div class="fenge"></div>
          <el-form-item class="handle" label-width="0">
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="closeMask">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'classManage',
    data () {
      return {
        showFlag: false,
        zhang: [
          {
            value: '节',
            label: '节'
          },
          {
            value: '课时',
            label: '课时'
          }
        ],
        jie: [
          {
            value: '课时',
            label: '课时'
          }
        ],
        more: [
          {
            value: '添加资源',
            label: '添加资源'
          },
          {
            value: '资源管理',
            label: '资源管理'
          },
          {
            value: '删除',
            label: '删除'
          }
        ],
        value1: '',
        value2: '',
        value3: '',
        form: {
          name: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!');
      },
      openMask () {
        this.showFlag = true;
      },
      closeMask () {
        this.showFlag = false;
      }
    },
    filters: {

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .classManage {
    background-color: #f3f3f3;
  }
  .header-wrapper {
    padding: 0 20px;
    background-color: #fff;
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid rgb(229, 229, 229);
    }
    .title {
      height: 64px;
      line-height: 64px;
    }
  }
  .content-wrapper {
    padding: 15px 30px;
    background-color: #fff;
  }
  .list-item {
    line-height: 60px;
    border-bottom: 1px solid rgb(229, 229, 229);
    &:last-child {
      border: none;
    }
    i {
      display: inline-block;
      margin-right: 10px;
      width: 30px;
      text-align: right;
    }
  }
  .oo {
    padding-left: 45px;
    span {
      margin-right: 10px;
      cursor: pointer;
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
    margin: 15% auto 0;
    padding-bottom: 10px;
    width: 550px;
    background-color: #fff;
    h3 {
      line-height: 50px;
      text-align: center;
      background-color: #1ABC9C;
      color: #fff;
    }
    .nameInput {
      margin: 30px 20px 50px 10px;
    }
    .fenge {
      border-top: 1px solid rgb(229, 229, 229);
      padding-bottom: 20px;
    }
    .handle {
      text-align: center;
    }
  }
</style>
