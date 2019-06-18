<template>
  <div>
    <div class="nav">
      <div class="separator">
        <img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="item">
          <el-breadcrumb-item>当前位置</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'questionsList'}">试题库</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: ''}">添加试题</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="main">
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box">
          <p class="p">已选课程</p>
          <div class="title">{{courseName}}</div>
        </div>
      </div>
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box">
          <p class="p">已选知识点</p>
          <div class="title">{{knowNameList.join(',')}}</div>
        </div>
      </div>
      
      <!-- 单选题-->
      <div v-if="status.c==1">
          <div class="row-line" style="height:20px;"></div>
          <div class="select-area">
            <div class="select-box">
              <p class="p">单选题</p>
              <div class="editArea">

                <div class="tit">
                  <el-upload
                    ref="upload"
                    class="upload"
                    :action="uploadUrl()"
                    :on-success="handleSuccess"
                    name="fileName"
                    drag
                    multiple
                    method:="post"
                    :on-preview="handlePreview"
                    accept=".docx,.doc"
                    :file-list="fileList">
                    <div style="font-size:30px;color:#999;line-height:180px;">点击或者文件拖到此处</div> 
                  </el-upload>
                </div>

                <div class="tit quill-wrap">
                  排版： 将完整的题目、选项、答案 包括图片等录入富文本框，请注意排版格式，这将影响到打印的效果。
                  无需录入题号，由系统生成
                  <quill-editor 
                    v-model="layout" 
                    ref="layout" 
                    :options="layoutOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    style="height:200px;margin-bottom:100px;">
                  </quill-editor>
                </div>
                
                <div class="tit" style="margin-top:20px;">
                  正确答案：
                  <el-radio v-model="correctXml" label="A">A</el-radio>
                  <el-radio v-model="correctXml" label="B">B</el-radio>
                  <el-radio v-model="correctXml" label="C">C</el-radio>
                  <el-radio v-model="correctXml" label="D">D</el-radio>
                  <el-radio v-model="correctXml" label="E">E</el-radio>
                  <el-radio v-model="correctXml" label="F">F</el-radio>
                </div>
                <div class="tit">
                  难度：
                  <el-radio v-model="questionDiff" label="1">简单</el-radio>
                  <el-radio v-model="questionDiff" label="2">一般</el-radio>
                  <el-radio v-model="questionDiff" label="3">困难</el-radio>
                </div>
                <div class="tit quill-wrap">
                  解析：
                  <quill-editor
                    v-model="analysis" 
                    ref="analysis" 
                    :options="analysisOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                  </quill-editor>
                </div>
                


              </div>
            </div>
          </div>

      </div>
      
      <!-- 多选题-->
      <div v-if="status.c==2">
          <div class="row-line" style="height:20px;"></div>
          <div class="select-area">
            <div class="select-box">
              <p class="p">多选题</p>
              <div class="editArea">

                <div class="tit">
                  <el-upload
                    ref="upload"
                    class="upload"
                    :action="uploadUrl()"
                    :on-success="handleSuccess"
                    name="fileName"
                    drag
                    multiple
                    method:="post"
                    :on-preview="handlePreview"
                    accept=".docx,.doc"
                    :file-list="fileList">
                    <div style="font-size:30px;color:#999;line-height:180px;">点击或者文件拖到此处</div> 
                  </el-upload>
                </div>

                <div class="tit quill-wrap">
                  排版： 将完整的题目、选项、答案 包括图片等录入富文本框，请注意排版格式，这将影响到打印的效果。
                  无需录入题号，由系统生成
                  <quill-editor 
                    v-model="layout" 
                    ref="layout" 
                    :options="layoutOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    style="height:200px;margin-bottom:100px;">
                  </quill-editor>
                </div>
               
                <div class="tit" style="margin-top:20px;">
                  正确答案：
                  <el-checkbox-group v-model="correctXmlArr">
                    <el-checkbox label="A"></el-checkbox>
                    <el-checkbox label="B"></el-checkbox>
                    <el-checkbox label="C"></el-checkbox>
                    <el-checkbox label="D"></el-checkbox>
                    <el-checkbox label="E"></el-checkbox>
                    <el-checkbox label="F"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="tit">
                  难度：
                  <el-radio v-model="questionDiff" label="1">简单</el-radio>
                  <el-radio v-model="questionDiff" label="2">一般</el-radio>
                  <el-radio v-model="questionDiff" label="3">困难</el-radio>
                </div>
                <div class="tit quill-wrap">
                  解析：
                  <quill-editor
                    v-model="analysis" 
                    ref="analysis" 
                    :options="analysisOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                  </quill-editor>
                </div>

              </div>
            </div>
          </div>

      </div>
      
      <!-- 判断题-->
      <div v-if="status.c==3">
          <div class="row-line" style="height:20px;"></div>
          <div class="select-area">
            <div class="select-box">
              <p class="p">判断题</p>
              <div class="editArea">
                
                <div class="tit">
                  <el-upload
                    ref="upload"
                    class="upload"
                    :action="uploadUrl()"
                    :on-success="handleSuccess"
                    name="fileName"
                    drag
                    multiple
                    method:="post"
                    :on-preview="handlePreview"
                    accept=".docx,.doc"
                    :file-list="fileList">
                    <div style="font-size:30px;color:#999;line-height:180px;">点击或者文件拖到此处</div> 
                  </el-upload>
                </div>

                <div class="tit quill-wrap">
                  排版： 将完整的题目、选项、答案 包括图片等录入富文本框，请注意排版格式，这将影响到打印的效果。
                  无需录入题号，由系统生成
                  <quill-editor 
                    v-model="layout" 
                    ref="layout" 
                    :options="layoutOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    style="height:200px;margin-bottom:100px;">
                  </quill-editor>
                </div>

                <div class="tit">
                  正确答案：
                  <el-radio v-model="correctXml" label="1">正确</el-radio>
                  <el-radio v-model="correctXml" label="2">错误</el-radio>
                </div>
                <div class="tit">
                  难度：
                  <el-radio v-model="questionDiff" label="1">简单</el-radio>
                  <el-radio v-model="questionDiff" label="2">一般</el-radio>
                  <el-radio v-model="questionDiff" label="3">困难</el-radio>
                </div>
                <div class="tit quill-wrap">
                  解析：
                  <quill-editor
                    v-model="analysis" 
                    ref="analysis" 
                    :options="analysisOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                  </quill-editor>
                </div>

              </div>
            </div>
          </div>

      </div>
      
      <!-- 填空题-->
      <div v-if="status.c==4">
          <div class="row-line" style="height:20px;"></div>
          <div class="select-area">
            <div class="select-box">
              <p class="p">填空题</p>
              <div class="editArea">

                <div class="tit">
                  <el-upload
                    ref="upload"
                    class="upload"
                    :action="uploadUrl()"
                    :on-success="handleSuccess"
                    name="fileName"
                    drag
                    multiple
                    method:="post"
                    :on-preview="handlePreview"
                    accept=".docx,.doc"
                    :file-list="fileList">
                    <div style="font-size:30px;color:#999;line-height:180px;">点击或者文件拖到此处</div> 
                  </el-upload>
                </div>

                <div class="tit quill-wrap">
                  排版： 将完整的题目、选项、答案 包括图片等录入富文本框，请注意排版格式，这将影响到打印的效果。
                  无需录入题号，由系统生成
                  <quill-editor 
                    v-model="layout" 
                    ref="layout" 
                    :options="layoutOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    style="height:200px;margin-bottom:100px;">
                  </quill-editor>
                </div>

                <div class="tit">
                  填空数量：
                  <el-input
                    placeholder="请输入填空数量："
                    v-model="number"
                    clearable>
                  </el-input>
                </div>
               
                <div class="tit" style="margin-top:20px;">
                  难度：
                  <el-radio v-model="questionDiff" label="1">简单</el-radio>
                  <el-radio v-model="questionDiff" label="2">一般</el-radio>
                  <el-radio v-model="questionDiff" label="3">困难</el-radio>
                </div>
                <div class="tit quill-wrap">
                  解析：
                  <quill-editor
                    v-model="analysis" 
                    ref="analysis" 
                    :options="analysisOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                  </quill-editor>
                </div>

              </div>
            </div>
          </div>

      </div>

      <!-- 简答题-->
      <div v-if="status.c==5">
          <div class="row-line" style="height:20px;"></div>
          <div class="select-area">
            <div class="select-box">
              <p class="p">简答题</p>
              <div class="editArea">

                <div class="tit">
                  <el-upload
                    ref="upload"
                    class="upload"
                    :action="uploadUrl()"
                    :on-success="handleSuccess"
                    name="fileName"
                    drag
                    multiple
                    method:="post"
                    :on-preview="handlePreview"
                    accept=".docx,.doc"
                    :file-list="fileList">
                    <div style="font-size:30px;color:#999;line-height:180px;">点击或者文件拖到此处</div> 
                  </el-upload>
                </div>

                <div class="tit quill-wrap">
                  排版： 将完整的题目、选项、答案 包括图片等录入富文本框，请注意排版格式，这将影响到打印的效果。
                  无需录入题号，由系统生成
                  <quill-editor 
                    v-model="layout" 
                    ref="layout" 
                    :options="layoutOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    style="height:200px;margin-bottom:100px;">
                  </quill-editor>
                </div>

                <div class="tit" style="margin-top:20px;">
                  难度：
                  <el-radio v-model="questionDiff" label="1">简单</el-radio>
                  <el-radio v-model="questionDiff" label="2">一般</el-radio>
                  <el-radio v-model="questionDiff" label="3">困难</el-radio>
                </div>
                <div class="tit quill-wrap">
                  解析：
                  <quill-editor
                    v-model="analysis" 
                    ref="analysis" 
                    :options="analysisOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                  </quill-editor>
                </div>

              </div>
            </div>
          </div>

      </div>

      <!-- 综合题-->
      <div v-if="status.c==6">
          <div class="row-line" style="height:20px;"></div>
          <div class="select-area">
            <div class="select-box">
              <p class="p">综合题</p>
              <div class="editArea">

                <div class="tit">
                  <el-upload
                    ref="upload"
                    class="upload"
                    :action="uploadUrl()"
                    :on-success="handleSuccess"
                    name="fileName"
                    drag
                    multiple
                    method:="post"
                    :on-preview="handlePreview"
                    accept=".docx,.doc"
                    :file-list="fileList">
                    <div style="font-size:30px;color:#999;line-height:180px;">点击或者文件拖到此处</div> 
                  </el-upload>
                </div>

                <div class="tit quill-wrap">
                  排版： 将完整的题目、选项、答案 包括图片等录入富文本框，请注意排版格式，这将影响到打印的效果。
                  无需录入题号，由系统生成
                  <quill-editor 
                    v-model="layout" 
                    ref="layout" 
                    :options="layoutOptions" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    style="height:200px;margin-bottom:100px;">
                  </quill-editor>
                </div>

                <div class="tit" style="margin-top:20px;" v-if="parentId==''">
                  难度：
                  <el-radio v-model="questionDiff" label="1">简单</el-radio>
                  <el-radio v-model="questionDiff" label="2">一般</el-radio>
                  <el-radio v-model="questionDiff" label="3">困难</el-radio>
                </div>

                <div class="tit" v-if="parentId!=''">
                  添加子题：
                  <el-button type="primary" size="mini" @click="addChildQuestion">+ 添加</el-button>
                </div>
                <div class="tit" style="display:flex;" v-if="childQuestionList.length>0">
                  子题列表：
                  <!-- <div class="child" v-for="(item, index) in childQuestionList" :key="index"> -->
                    <!-- <el-button size="mini">子题 {{index+1}}</el-button> -->
                    <el-tag
                      style="margin-right:15px;"
                      v-for="(tag, index) in childQuestionList"
                      :key="index"
                      closable
                      type="info"
                      @close="closeTag(tag)"
                      @click="openTag(tag)">
                      子题 {{index+1}}
                    </el-tag>
                  <!-- </div> -->
                </div>

                <div class="tit" v-if="childStatus==1">
                  <div class="tit" style="margin-top:20px;">
                    正确答案：
                    <el-radio v-model="correctXml" label="A">A</el-radio>
                    <el-radio v-model="correctXml" label="B">B</el-radio>
                    <el-radio v-model="correctXml" label="C">C</el-radio>
                    <el-radio v-model="correctXml" label="D">D</el-radio>
                    <el-radio v-model="correctXml" label="E">E</el-radio>
                    <el-radio v-model="correctXml" label="F">F</el-radio>
                  </div>
                  <div class="tit">
                    难度：
                    <el-radio v-model="questionDiff" label="1">简单</el-radio>
                    <el-radio v-model="questionDiff" label="2">一般</el-radio>
                    <el-radio v-model="questionDiff" label="3">困难</el-radio>
                  </div>
                  <div class="tit quill-wrap">
                    解析：
                    <quill-editor
                      v-model="analysis" 
                      ref="analysis" 
                      :options="analysisOptions" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>
                  </div>
                  <el-button type="primary" size="small" @click="submitChild"> 提交 </el-button>
                </div>

                <div class="tit" v-if="childStatus==2">
                  <div class="tit" style="margin-top:20px;">
                    正确答案：
                    <el-checkbox-group v-model="correctXmlArr">
                      <el-checkbox label="A"></el-checkbox>
                      <el-checkbox label="B"></el-checkbox>
                      <el-checkbox label="C"></el-checkbox>
                      <el-checkbox label="D"></el-checkbox>
                      <el-checkbox label="E"></el-checkbox>
                      <el-checkbox label="F"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div class="tit">
                    难度：
                    <el-radio v-model="questionDiff" label="1">简单</el-radio>
                    <el-radio v-model="questionDiff" label="2">一般</el-radio>
                    <el-radio v-model="questionDiff" label="3">困难</el-radio>
                  </div>
                  <div class="tit quill-wrap">
                    解析：
                    <quill-editor
                      v-model="analysis" 
                      ref="analysis" 
                      :options="analysisOptions" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>
                  </div>
                  <el-button type="primary" size="small" @click="submitChild"> 提交 </el-button>
                </div>

                <div class="tit" v-if="childStatus==3">
                  <div class="tit">
                    正确答案：
                    <el-radio v-model="correctXml" label="1">正确</el-radio>
                    <el-radio v-model="correctXml" label="2">错误</el-radio>
                  </div>
                  <div class="tit">
                    难度：
                    <el-radio v-model="questionDiff" label="1">简单</el-radio>
                    <el-radio v-model="questionDiff" label="2">一般</el-radio>
                    <el-radio v-model="questionDiff" label="3">困难</el-radio>
                  </div>
                  <div class="tit quill-wrap">
                    解析：
                    <quill-editor
                      v-model="analysis" 
                      ref="analysis" 
                      :options="analysisOptions" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>
                  </div>
                  <el-button type="primary" size="small" @click="submitChild"> 提交 </el-button>
                </div>

                <div class="tit" v-if="childStatus==4">
                  <div class="tit">
                    填空数量：
                    <el-input
                      placeholder="请输入填空数量："
                      v-model="number"
                      clearable>
                    </el-input>
                  </div>
                
                  <div class="tit" style="margin-top:20px;">
                    难度：
                    <el-radio v-model="questionDiff" label="1">简单</el-radio>
                    <el-radio v-model="questionDiff" label="2">一般</el-radio>
                    <el-radio v-model="questionDiff" label="3">困难</el-radio>
                  </div>
                  <div class="tit quill-wrap">
                    解析：
                    <quill-editor
                      v-model="analysis" 
                      ref="analysis" 
                      :options="analysisOptions" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>
                  </div>
                  <el-button type="primary" size="small" @click="submitChild"> 提交 </el-button>
                </div>

                <div class="tit" v-if="childStatus==5">
                  <div class="tit" style="margin-top:20px;">
                    难度：
                    <el-radio v-model="questionDiff" label="1">简单</el-radio>
                    <el-radio v-model="questionDiff" label="2">一般</el-radio>
                    <el-radio v-model="questionDiff" label="3">困难</el-radio>
                  </div>
                  <div class="tit quill-wrap">
                    解析：
                    <quill-editor
                      v-model="analysis" 
                      ref="analysis" 
                      :options="analysisOptions" 
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                    </quill-editor>
                  </div>
                  <el-button type="primary" size="small" @click="submitChild"> 提交 </el-button>
                </div>


              </div>
            </div>
          </div>

      </div>


      <el-dialog title="选择要添加的子题题型" :visible.sync="childBox">
          <el-radio v-model="childStatus" label="1">单选题</el-radio>
          <el-radio v-model="childStatus" label="2">多选题</el-radio>
          <el-radio v-model="childStatus" label="3">判断题</el-radio>
          <el-radio v-model="childStatus" label="4">填空题</el-radio>
          <el-radio v-model="childStatus" label="5">简答题</el-radio>
          <br><br><br>
          <el-button type="primary" size="small" @click="childBox = false">确定</el-button>
      </el-dialog>

      <!--  -->
      <div class="row-line" style="height:20px;"></div>
      <div class="select-area">
        <div class="select-box" style="background-color:#F2F3F3;height:80px;">
          <el-button type="primary" @click="save" v-if="parentId==''">保存并继续录入</el-button>
          <el-button type="primary"  @click="saveBack" v-if="status.c!=6">保存并返回试题库</el-button>
          <el-button  @click="reset" v-if="status.c!=6">清空</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import TinymceEdit from '../../components/TinymceEdit.vue' //引用富文本编辑组件
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);
export default {
  name: "upload",
  components: {
    //TinymceEdit
    quillEditor
  },
  data() {
    return {
      fileList:[],//上传的文件
      wordUrl: '',
      status: JSON.parse(localStorage.getItem('addTest')),//判断状态 显示选择题 判断题等等
      parentId: '',
      correctXml: '',//单选和判断 的正确答案
      correctXmlArr: [],//多选正确答案
      number: '',//填空数量
      questionDiff:'1',//难度
      analysis:'',//解析
      analysisOptions:{
        modules: {
            ImageExtend: {
              loading: true,
              size: 2,  // 可选参数 图片大小，单位为M，1M = 1024kb
              name: 'fileName',
              action: `${this.$http.baseUrlApi}/Upload/UploadImg`,
              response: (res) => {
                return `${this.$http.baseUrl}/showfile/showimg?filename=${res.data.fileName}`
              }
            },
            imageDrop: true,
            toolbar: {
              container: container,
              handlers: {
                
              }
            }
          }
      },
      isChild: 0,//是否子题(0:否;1:是)
      knowNameList: [],
      courseName: '',
      navigator: false,
      childQuestionList: [],
      layout: '', //排版
      layoutOptions: {
        modules: {
            ImageExtend: {
              loading: true,
              size: 2,  // 可选参数 图片大小，单位为M，1M = 1024kb
              name: 'fileName',
              action: `${this.$http.baseUrlApi}/Upload/UploadImg`,
              response: (res) => {
                return `${this.$http.baseUrl}/showfile/showimg?filename=${res.data.fileName}`
              }
            },
            imageDrop: true,
            toolbar: {
              container: container,
              handlers: {
                
              }
            }
          }
      },
      childStatus: '',
      childBox: false
    };
  },
  methods: {
    
    //上传文件
    uploadUrl(){
        var url = `${this.$http.baseUrlApi}/Upload/UploadWord`
        return url;
    },
    handleSuccess(res){
        //上传成功要处理的事
        console.log(res.data.fileName)
        this.wordUrl = res.data.fileName
    },
    handlePreview(){
        //上传前要处理的事
    },
    //富文本操作
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(val){//内容改变事件
      // console.log(111111,val)
    },
    //添加子题  获取父级  题干ID
    addChildQuestion(){
      this.childQuestionList.push({parentId:this.parentId})   
    },
    //删除子题
    closeTag(tag) {
      // console.log(tag)
      this.childQuestionList.splice(this.childQuestionList.indexOf(tag), 1);
    },
    //打开子题
    openTag(tag) {
      console.log(tag)//父ID
      this.isChild = 1
      this.childBox = true
    },
    //提交子题
    submitChild(){
      this.upLoad()
      
    },
    //保存并继续录入
    save(){
      this.upLoad()
    },
    //保存并返回题库
    saveBack(){
      let that = this
      that.navigator = true
      that.upLoad()
      
    },
    //重置表单
    reset(){
        this.clear()
    },
    //获取课程名称
    changeIdToName(){
      let param = {
        courseId: JSON.parse(localStorage.getItem('addTest')).class ||this.$route.params.class,
        knowIdList: JSON.parse(localStorage.getItem('addTest')).checked ||this.$route.params.checked
      }
      this.$http.post('/Course/CourseKnowName',param)
      .then(res=>{
        // console.log(res.data,"成功")
          this.knowNameList = res.data.data.knowNameList
          this.courseName = res.data.data.courseName
      })
      .catch(res=>{
        console.log(res.data)
      })

    },
    //清空题目
    clear(){
      this.questionName='',//题目
      this.questionNameOption={},
      this.correctXml='',//正确答案
      this.questionDiff='1',//难度
      this.analysis='',//解析
      this.childQuestionList=[],
      this.layout= ''
    },
    //上传题目
    upLoad(){
      if(this.status.c!=6 && this.layout == ''){
        this.$notify({
          title: '注意',
          message: '题目排版不可为空，请划到底部进行编辑',
          type: 'warning'
        });
        return false
      }
      let param = {
        wordUrl: this.wordUrl,
        number:this.number,
        analysis: this.analysis,
        correctXml: this.status.c==2?this.correctXmlArr.join(','):this.correctXml, //正确答案 1正确 2错误
        courseId: this.status.class,
        isChild: this.isChild,
        knowId: this.status.checked.join(','), 
        parentId: this.parentId,
        questionDiff: this.questionDiff,
        questionType: this.childStatus==''? this.status.c :this.childStatus,
        layout: this.layout
      }
      // console.log(param);return false;
      this.$http.post('/Question/Insert',param)
      .then(res=>{
        // console.log(res.data,"成功")
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success'
        });
        if(this.status.c == 6){
          this.parentId = res.data.data
        }
        if(this.navigator == true){
            this.$router.push({name: 'questionsList'})
        }
        // this.clear()
      })
      .catch(res=>{
        console.log(res.data)
        this.$notify({
          title: '失败',
          message: '网络不佳，请重试',
          type: 'warning'
        });
        return false
      })
    },


    


  },
  
  mounted() {
    // console.log(this.$route.params);
    this.changeIdToName()
    // console.info(this.$refs.headerChild.tinymceHtml)
    

  },
  computed: {
   
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

.main {
  background-color: #f2f3f3;
  width: 100%;
  height: calc(100% - 80px);
  .row-line,
  .select-area {
    width: 100%;
    background-color: #f2f3f3;
    box-sizing: border-box;
  }
  .select-box {
    max-width: 1760px;
    min-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 20px;
    background-color: #fff;
    padding-top: 0px;
    .p {
      font-size: 20px;
      color: #333;
      border-left: 5px solid #1abc9c;
      padding-left: 20px;
      margin-left: -20px;
      margin-top: 19px;
    }
    .title {
      margin: 20px 0 0 20px;
      color: #5EBD9C;
    }
    .editArea {
      width: 76%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 20px 0 20px 0;
      .tit {
        // margin: 20px 0 -18px -40px;
        margin: 15px 0;
        position: relative;
        .child{
          margin-left: 15px;
          cursor: pointer;
        }
      }
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
