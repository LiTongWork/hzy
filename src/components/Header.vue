<template>
  <div class="container">
    <div class="title">慧职园智能题库</div>
    <ul class="menu-list">
      <li>
        <router-link :to="{name: 'questionsList'}" >试题库</router-link>
      </li>
      <li>
        <router-link :to="{name: 'examinationList'}" >试卷库</router-link>
      </li>
      <li>
        <router-link :to="{name: 'onlineTestIndex'}">在线考试</router-link>
      </li>
      <li>
        <router-link :to="{name: 'onlineJobIndex'}" >在线作业</router-link>
      </li>
			<li>
			  <router-link :to="{name: 'markingList'}" >线下阅卷</router-link>
			</li>
    </ul>
    <div class="individual">
      <!-- <div class="message">
        <el-badge :value="200" :max="99">
          <img src="../assets/img/icon-msg.png"  class="item" alt="信息">
        </el-badge>
      </div> -->
      <div class="info">
        <img src="../assets/img/icon-photo.png" class="item" alt="头像">
        <el-dropdown trigger="click" class="dropdown">
          <span class="el-dropdown-link name">
            {{userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item class="index">
              <router-link :to="{name: 'uploadResource'}" style="color:#606266;">
                主页
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item class="individual">
                <router-link :to="{name: 'teachingCourse'}" style="color:#606266;">
                  个人中心
                </router-link>
              <el-badge class="mark" is-dot />
            </el-dropdown-item>
            <el-dropdown-item class="setup">
              <router-link :to="{name: 'acountSetting'}" style="color:#606266;">
                账户设置
               </router-link>
              <el-badge class="mark" is-dot />
            </el-dropdown-item> -->
            <a href="javascript:;" @click="toMyMain"  v-if="loginType==2" style="color:#606266;">
              <el-dropdown-item >
                我的主页
              </el-dropdown-item>
            </a>
            <a href="javascript:;" @click="logout" style="color:#606266;" class="logout">
              <el-dropdown-item >
                退出登录
              </el-dropdown-item>
            </a>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headr",
  data(){
    return {
      userName: localStorage.getItem("userName"),
      loginType: localStorage.getItem("loginType")
    }
  },
  methods: {
		// 跳转我的主页
    toMyMain(){
      localStorage.setItem('index', '1-2')
      this.$router.push({name: 'createdCourse'})
    },
		// 退出登录
    logout(){
      this.$router.push({name:'login'})
      localStorage.removeItem('dataToken')
			localStorage.removeItem('userName')
			localStorage.removeItem('loginType')
    }

  }

};
</script>

<style lang="scss" scoped>
a {
  color: #fff;
}
.container {
  background-color: #1abc9c;
  height: 100%;
  min-width: 1200px;
  max-width: 1760px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  box-sizing: border-box;
  padding:0 20px;
  .title {
    font-size: 40px;
    font-family: DengXian-Bold;
    //   font-weight: bold;
  }
  .menu-list {
    width: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & > li {
      float: left;
			a.active {
				color: red
			}
    }
  }
  .individual{
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .message{
      width: 60px;
      height: 25px;
      border-right: 1px solid #FFF;
      .item{
        width:24px;
        height:19px;
        cursor: pointer;
      }
    }
    .info{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .item{
        width: 36px;
        height: 36px;
        margin-left: 18px;
        cursor: pointer;
      }
      .dropdown{
        margin-left: 16px;
        color: #FFF;
        &:hover{
          cursor: pointer;
        }
        .name{
          font-size: 18px;
        }
      }
    }
  }
}
</style>
