import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Examination from './views/Examination.vue'
import Questions from './views/Questions.vue'
import OnlineTestHeader from './views/OnlineTestHeader.vue'
import OnlineJobHeader from './views/OnlineJobHeader.vue'
import FooterContent from './views/FooterContent.vue'
import Marking from './views/Marking.vue'
import PersonalCenter from './views/personalCenter/PersonalCenter.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'login',
			component: Login
		},
		{
			path: '/home',
			name: '',
			component: Home,
			children: [{ //试题库
					path: '/',
					name: '',
					component: Questions,
					children: [{
							path: '/',
							name: 'questionsList',
							component: () => import( /* webpackChunkName: "questionsList" */ './views/questions/QuestionsList.vue')
						},
						{
							path: 'floatAside',
							name: 'floatAside1',
							component: () => import( /* webpackChunkName: "floatAside1" */ './views/questions/FloatAside.vue')
						},
						{
							path: 'zuJuan',
							name: 'zuJuan',
							component: () => import( /* webpackChunkName: "zuJuan" */ './views/questions/ZuJuan.vue')
						},
						{
							path: 'editTest',
							name: 'editTest',
							component: () => import( /* webpackChunkName: "editTest" */ './views/questions/EditTest.vue')
						},
						{
							path: 'addTest',
							name: 'addTest',
							component: () => import( /* webpackChunkName: "addTest" */ './views/questions/AddTest.vue')
						},
						{
							path: 'select',
							name: 'xuanKe',
							component: () => import( /* webpackChunkName: "xuanKe" */ './views/questions/XuanKe.vue')
						},
						{
							path: 'upload',
							name: 'upload',
							component: () => import( /* webpackChunkName: "upload" */ './views/questions/Upload.vue')
						}
					]
				},
				{ //试卷库
					path: '/examination',
					name: '',
					component: Examination,
					children: [{
							path: '/',
							name: 'examinationList',
							component: () => import( /* webpackChunkName: "ExaminationList" */
								'./views/examination/ExaminationList.vue')
						},
						{
							path: 'onlineTest',
							name: 'onlineTest',
							component: () => import( /* webpackChunkName: "onlineTest" */ './views/examination/OnlineTest.vue')
						},
						{
							path: 'intelligence',
							name: 'intelligence',
							component: () => import( /* webpackChunkName: "intelligence" */ './views/examination/Intelligence.vue')
						},
						{
							path: 'manual',
							name: 'manual',
							component: () => import( /* webpackChunkName: "manual" */ './views/examination/Manual.vue')
						},
						{
							path: 'floatAside',
							name: 'floatAside',
							component: () => import( /* webpackChunkName: "floatAside" */ './views/examination/FloatAside.vue')
						}
					]
				},
				{ // 在线考试
					path: '/onlineTestHeader',
					name: '',
					component: OnlineTestHeader,
					children: [{
							path: '/',
							name: 'onlineTestIndex',
							component: () => import( /* webpackChunkName: "examAnalysis" */
								'./views/onlineTestHeader/onlineTestIndex.vue')
						},
						{
							path: 'examAnalysis',
							name: 'examAnalysis',
							component: () => import( /* webpackChunkName: "examAnalysis" */ './views/onlineTestHeader/examAnalysis.vue')
						},
						{
							path: 'answerDetail',
							name: 'answerDetail',
							component: () => import( /* webpackChunkName: "examAnalysis" */ './views/onlineTestHeader/answerDetail.vue')
						},
						{
							path: 'readOver',
							name: 'readOver',
							component: () => import( /* webpackChunkName: "examAnalysis" */ './views/onlineTestHeader/readOver.vue')
						},
						{
							path: 'newTest',
							name: 'newTest',
							component: () => import( /* webpackChunkName: "examAnalysis" */ './views/onlineTestHeader/newTest.vue')
						}

					]
				},
				{ //在线作业
					path: '/OnlineJobHeader',
					name: '',
					component: OnlineJobHeader,
					children: [{
							path: '/',
							name: 'onlineJobIndex',
							component: () => import( /* webpackChunkName: "examAnalysis" */
								'./views/onlineJobHeader/onlineJobIndex.vue')
						},
						{
							path: 'jobExamAnalysis',
							name: 'jobExamAnalysis',
							component: () => import( /* webpackChunkName: "examAnalysis" */
								'./views/onlineJobHeader/jobExamAnalysis.vue')
						},
						{
							path: 'jobAnswerDetail',
							name: 'jobAnswerDetail',
							component: () => import( /* webpackChunkName: "examAnalysis" */
								'./views/onlineJobHeader/jobAnswerDetail.vue')
						},
						{
							path: 'jobReadOver',
							name: 'jobReadOver',
							component: () => import( /* webpackChunkName: "examAnalysis" */ './views/onlineJobHeader/jobReadOver.vue')
						},
						{
							path: 'jobNewTest',
							name: 'jobNewTest',
							component: () => import( /* webpackChunkName: "examAnalysis" */ './views/onlineJobHeader/jobNewTest.vue')
						},
						{
							path: 'jobSelectPaper',
							name: 'jobSelectPaper',
							component: () => import( /* webpackChunkName: "examAnalysis" */
								'./views/onlineJobHeader/jobSelectPaper.vue')
						}
					]
				},
				{ //线下阅卷
					path: '/marking',
					name: '',
					component: Marking,
					children: [
						{
							path: '/',
							name: 'markingList',
							component: () => import( /* webpackChunkName: "about" */ './views/marking/markingList.vue')
						},
						{
							path: 'markingItem/:examId/:markingPostion',
							name: 'markingItem',
							component: () => import(/* webpackChunkName: "about" */ './views/marking/markingItem.vue')
						}
					]
				},
				{ //底部跳转内容
					path: '/footerContent',
					name: '',
					component: FooterContent,
					children: [{
							path: '/',
							name: 'about',
							component: () => import( /* webpackChunkName: "about" */ './views/footerContent/About.vue')
						},
						{
							path: 'contact',
							name: 'contact',
							component: () => import( /* webpackChunkName: "contact" */ './views/footerContent/Contact.vue')
						},
						{
							path: 'help',
							name: 'help',
							component: () => import( /* webpackChunkName: "help" */ './views/footerContent/Help.vue')
						},
						{
							path: 'feedback',
							name: 'feedback',
							component: () => import( /* webpackChunkName: "feedback" */ './views/footerContent/Feedback.vue')
						},
						{
							path: 'management',
							name: 'management',
							component: () => import( /* webpackChunkName: "management" */ './views/footerContent/Management.vue')
						}
					]
				},
				{ //个人中心
					path: '/PersonalCenter',
					name: '',
					component: PersonalCenter,
					children: [{ //上传资源
							path: '/',
							name: 'uploadResource',
							component: () => import( /* webpackChunkName: "uploadResource" */
								'./views/personalCenter/views/homepage/uploadResource/uploadResource.vue')
						},
						{ //创建课程
							path: '/createdCourse',
							name: 'createdCourse',
							component: () => import( /* webpackChunkName: "createdCourse" */
								'./views/personalCenter/views/homepage/createdCourse/createdCourse.vue')
						},
						{ //创建知识点
							path: '/createdKnowLedge',
							name: 'createdKnowLedge',
							component: () => import( /* webpackChunkName: "createdKnowLedge" */
								'./views/personalCenter/views/homepage/createdKnowLedge/createdKnowLedge.vue')
						},
						{ //学习课程
							path: '/studyCourse',
							name: 'studyCourse',
							component: () => import( /* webpackChunkName: "studyCourse" */
								'./views/personalCenter/views/homepage/studyCourse/studyCourse.vue')
						},
						{ //创建试卷
							path: '/createdTest',
							name: 'createdTest',
							component: () => import( /* webpackChunkName: "createdTest" */
								'./views/personalCenter/views/homepage/createdTest/createdTest.vue')
						},
						{ //在教课程
							path: '/teachingCourse',
							name: 'teachingCourse',
							component: () => import( /* webpackChunkName: "teachingCourse" */
								'./views/personalCenter/views/center/teachingCourse/teachingCourse.vue')
						},
						{ //管理 入口
							path: '/courseItem',
							name: 'courseItem',
							component: () => import( /* webpackChunkName: "courseItem" */
								'./views/personalCenter/views/center/teachingCourse/views/courseItem.vue')
						},
						{ //账户设置
							path: '/acountSetting',
							name: 'acountSetting',
							component: () => import( /* webpackChunkName: "acountSetting" */
								'./views/personalCenter/views/acount/acountSetting/acountSetting.vue')
						},
						{ //基本信息
							path: '/basicInfo',
							name: 'basicInfo',
							component: () => import( /* webpackChunkName: "basicInfo" */
								'./views/personalCenter/views/center/teachingCourse/views/basicInfo/basicInfo.vue')
						},
						{ //课程图片
							path: '/coursePics',
							name: 'coursePics',
							component: () => import( /* webpackChunkName: "coursePics" */
								'./views/personalCenter/views/center/teachingCourse/views/coursePics/coursePics.vue')
						},
						{ //课时管理
							path: '/classManage',
							name: 'classManage',
							component: () => import( /* webpackChunkName: "classManage" */
								'./views/personalCenter/views/center/teachingCourse/views/classManage/classManage.vue')
						},
						{ //课程资源管理
							path: '/courseResManage',
							name: 'courseResManage',
							component: () => import( /* webpackChunkName: "courseResManage" */
								'./views/personalCenter/views/center/teachingCourse/views/courseResManage/courseResManage.vue')
						},
						{ //教师设置
							path: '/teacherSet',
							name: 'teacherSet',
							component: () => import( /* webpackChunkName: "teacherSet" */
								'./views/personalCenter/views/center/teachingCourse/views/teacherSet/teacherSet.vue')
						},
						{ //学生设置
							path: '/studentSet',
							name: 'studentSet',
							component: () => import( /* webpackChunkName: "studentSet" */
								'./views/personalCenter/views/center/teachingCourse/views/studentSet/studentSet.vue')
						},
						{ //试题管理
							path: '/questionManage2',
							name: 'questionManage2',
							component: () => import( /* webpackChunkName: "questionManage2" */
								'./views/personalCenter/views/center/teachingCourse/views/questionManage2/questionManage2.vue')
						},
						{ //试卷管理
							path: '/testManage2',
							name: 'testManage2',
							component: () => import( /* webpackChunkName: "testManage2" */
								'./views/personalCenter/views/center/teachingCourse/views/testManage2/testManage2.vue')
						},
						{ //考试管理
							path: '/examManage',
							name: 'examManage',
							component: () => import( /* webpackChunkName: "examManage" */
								'./views/personalCenter/views/center/teachingCourse/views/examManage/examManage.vue')
						},
						{ //作业管理
							path: '/workManage',
							name: 'workManage',
							component: () => import( /* webpackChunkName: "workManage" */
								'./views/personalCenter/views/center/teachingCourse/views/workManage/workManage.vue')
						},
						{ //课程统计
							path: '/courseCount',
							name: 'courseCount',
							component: () => import( /* webpackChunkName: "courseCount" */
								'./views/personalCenter/views/center/teachingCourse/views/courseCount/courseCount.vue')
						},
						{ //
							path: '/testAnalysis',
							name: 'testAnalysis',
							component: () => import( /* webpackChunkName: "testAnalysis" */
								'./views/personalCenter/testAnalysis/testAnalysis.vue')
						},
						{ //试题管理主菜单
							path: '/questionManage',
							name: 'questionManage',
							component: () => import( /* webpackChunkName: "questionManage" */
								'./views/personalCenter/views/center/questionManage/questionManage.vue')
						},
						{ //试卷管理主菜单
							path: '/testManage',
							name: 'testManage',
							component: () => import( /* webpackChunkName: "testManage" */
								'./views/personalCenter/views/center/testManage/testManage.vue')
						},
						{ //学生分组
							path: '/studentsGroup',
							name: 'studentsGroup',
							component: () => import( /* webpackChunkName: "studentsGroup" */
								'./views/personalCenter/views/center/studentsGroup/studentsGroup.vue')
						},
						{ //我的考试
							path: '/myExam',
							name: 'myExam',
							component: () => import( /* webpackChunkName: "myExam" */
								'./views/personalCenter/views/center/myExam/myExam.vue')
						},
						{ //我的学习
							path: '/myStudy',
							name: 'myStudy',
							component: () => import( /* webpackChunkName: "myStudy" */
								'./views/personalCenter/views/center/myStudy/myStudy.vue')
						},

					]
				}

			]
		}



	]
})
