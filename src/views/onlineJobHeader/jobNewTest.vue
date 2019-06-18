<template>
  <div class="newTest">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="作业标题">
        <div class="w35"><el-input v-model="form.examName" placeholder="请输入考试标题(长度少于50)"></el-input></div>
      </el-form-item>
      <el-form-item label="开始时间">
        <div class="w35 block">
          <el-date-picker v-model="form.stampStart" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="结束时间">
        <div class="w35 block">
          <el-date-picker v-model="form.stampEnd" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="选择试卷">
        <el-select v-model="form.paperId" filterable placeholder="请选择试卷"  class="w35 block">
          <el-option
            v-for="(item, index) in form.paperIdOptions"
            :key="index"
            :label="item.paperName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="及格分数">
        <el-input class="w35" v-model="form.passScore" placeholder="请设置及格分数"></el-input>
      </el-form-item>
      <el-form-item label="优秀分数">
        <el-input class="w35" v-model="form.goodScore" placeholder="请设置优秀分数"></el-input>
      </el-form-item>
      <el-form-item label="批阅老师">        
        <el-select v-model="form.proctorIds" multiple placeholder="选择批阅老师" @change="selectTeacher" class="w35 block">
          <el-option
            v-for="(item, index) in form.proctorIdsOptions"
            :key="index"
            :label="item.name"
            :value="item.loginId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" v-if="!$route.params.examId">        
        <el-select v-model="form.gradeId" filterable	placeholder="选择班级" @change="changeGrade" class="w35 block">
          <el-option
            v-for="(item, index) in form.gradeList"
            :key="index"
            :label="item.gradeName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学生">
        <div style="margin:5px 0;"></div>
        <el-checkbox-group v-model="form.studentIds" @change="changeStudent">
          <el-checkbox v-for="(item, index) in form.studentIdsOption" :label="item.loginId" :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="!$route.params.examId">发布作业</el-button>
        <el-button type="primary" @click="editSubmit" v-if="$route.params.examId">确定</el-button>
        <el-button @click="$router.back(-1)">返回</el-button>
      </el-form-item>
    </el-form>



  </div>
</template>

<script>
  export default {
    name: 'jobNewTest',
    data () {
      return {
        form: {
          examName: '',
          stampStart: '',
          stampEnd: '',
          //试卷 列表
          paperIdOptions: [],
          paperId: '',
          passScore:'',
          goodScore: '',
          workType: '2', //考试分类（1:考试;2:作业）
          //监考老师列表
          proctorIdsOptions: [],
          proctorIds: [],  //监考老师id集合
          //班级列表
          gradeList: [],
          gradeId: '',
          //学生列表
          studentIdsOption: [],
          studentIds: [], //学生id集合 

        },

      }
    },
    methods: {
      //选择学生
      changeStudent(value) {
        // console.log(value)
        this.form.studentIds = value
      },
      //提交 新建考试
      onSubmit () {
        let param = {
          examName: this.form.examName,
          stampStart: this.form.stampStart.getTime(),
          stampEnd: this.form.stampEnd.getTime(),
          paperId: this.form.paperId,
          passScore: this.form.passScore,
          goodScore: this.form.goodScore,
          workType: this.form.workType,
          proctorIds: this.form.proctorIds.join(','),
          studentIds: this.form.studentIds.join(',')
        }
        // console.log(param);return false;
        this.$http
          .post("/ExamWork/Insert", param)
          .then(res => {
            // console.log(res.data)
            if(res.data.code==200){
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success'
              });
              this.$router.push({name: 'onlineJobIndex'})
            }
            
          })
          .catch(res => {
            console.log(res);
          });
      },
      //提交修改
      editSubmit () {
        let param = {
          id: this.$route.params.examId,
          examName: this.form.examName,
          stampStart:parseInt(new Date(this.form.stampStart).getTime()/1000)*1000,// this.form.stampStart ,
          stampEnd: parseInt(new Date(this.form.stampEnd).getTime()/1000)*1000,//this.form.stampEnd ,
          paperId: this.form.paperId,
          passScore: this.form.passScore,
          goodScore: this.form.goodScore,
          workType: this.form.workType,
          proctorIds: this.form.proctorIds.join(','),
          studentIds: this.form.studentIds.join(',')
        }
        // console.log(param);return false;
        this.$http
          .post("/ExamWork/Update", param)
          .then(res => {
            // console.log(res.data)
            if(res.data.code==200){
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({name: 'onlineTestIndex'})
            }
            
          })
          .catch(res => {
            console.log(res);
          });
      },
      //获取试卷列表
      getPaperList(){
        let param = {}
        this.$http
          .post("/ExamWork/PaperList", param)
          .then(res => {
            // console.log(res.data.data)
            this.form.paperIdOptions = res.data.data
          })
          .catch(res => {
            console.log(res);
          });
      },
      //获取班级列表
      getGradeList(){
        let param = {}
        this.$http
          .post("/ExamWork/GradeList", param)
          .then(res => {
            // console.log(res.data.data)
            this.form.gradeList = res.data.data
          })
          .catch(res => {
            console.log(res);
          });
      },
      //获取老师列表
      getTeacherList(){
        let param = {}
        this.$http
          .post("/ExamWork/TeacherList", param)
          .then(res => {
            // console.log(res.data.data)
            this.form.proctorIdsOptions = res.data.data
          })
          .catch(res => {
            console.log(res);
          });
      },
      //获取学生列表
      getStudentList(id){
        let param = {
          id: id
        }
        this.$http
          .post("/ExamWork/StudentList", param)
          .then(res => {
            // console.log(res.data.data)
            this.form.studentIdsOption = res.data.data.map(function(a){return {loginId:a.loginId, name:a.name} })
            this.form.studentIds = res.data.data.map(function(a){return a.loginId })
          })
          .catch(res => {
            console.log(res);
          });
      },
      //选择监考老师
      selectTeacher(val){
        // console.log(val)
        this.proctorIds = val
      },
      //切换班级
      changeGrade(val){
        // console.log(val)
        this.getStudentList(val)
      },
      //获取单个试卷内容
      getExamSingle(){
        let param = {
          id: this.$route.params.examId
        }
        this.$http
          .post("/ExamWork/Single", param)
          .then(res => {
            // console.log(res.data.data)
            this.form.examName = res.data.data.examName
            this.form.stampStart = res.data.data.startTime
            this.form.stampEnd = res.data.data.endTime
            this.form.paperId = res.data.data.paperId
            this.form.passScore = res.data.data.passScore
            this.form.goodScore = res.data.data.goodScore
            this.form.proctorIdsOptions = res.data.data.teacherList.map(function(a){return {loginId:a.loginId, name:a.name} })
            this.form.proctorIds = res.data.data.teacherList.map(function(a){return a.loginId })
            this.form.studentIdsOption = res.data.data.studentList.map(function(a){return {loginId:a.loginId, name:a.name} })
            this.form.studentIds = res.data.data.studentList.map(function(a){return a.loginId })
            
          })
          .catch(res => {
            console.log(res);
          });
      }

    },
    mounted(){
      this.getPaperList()//获取试卷列表
      this.getGradeList()//获取班级列表
      this.getTeacherList()//获取老师列表
      if(this.$route.params.examId){
        this.getExamSingle()//获取单个试卷内容
      }
      
    }

  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .newTest {
    padding: 20px 50px;
    background-color: #f3f3f3;
    button {
      padding: 12px;
    }
    .el-input {
      width: 100%;
    }
    .w35 {
      display: inline-block;
      width: 35%;
    }
  }
  .el-form {
    padding: 50px 0;
    background-color: #fff;
  }
  .handle {
    i {
      margin-right: 5px;
    }
  }
  .list {
    margin-top: 20px;
    width: 95%;
    height: 150px;
    border: 1px solid #e5e5e5;
    font-size: 0;
    overflow-y: auto;
    .list-item {
      position: relative;
      display: inline-block;
      height: 30px;
      padding: 10px 0 10px 20px;
      img {
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 30px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
      i::before {
        display: none;
        position: absolute;
        left: 40px;
        top: 10px;
        width: 10px;
        height: 10px;
        font-size: 8px;
        color: #fff;
        background-color: #FF6565;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        cursor: pointer;
      }
      &:hover {
        i::before {
          display: inline-block;
        }
      }
      span {
        display: inline-block;
        margin-left: 10px;
        vertical-align: top;
        max-width: 70px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
 
</style>

