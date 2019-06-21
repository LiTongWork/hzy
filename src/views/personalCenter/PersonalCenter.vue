<template>
	<div class="personalCenter">
		<div class="menu">
			<div class="user-info">
				<div class="avatar">
					<div><span><img src="../../assets/img/icon-photo.png" alt=""></span></div>
				</div>
				<p>{{userName}}</p>
				<div class="border"></div>
			</div>
			<el-menu class="el-menu-vertical-demo" :default-openeds='openeds' :default-active="indexContent" @select="changeIndex"
			 @open="handleOpen" @close="handleClose">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span class="title">我的主页</span>
					</template>
					<el-menu-item-group>
						<!-- <el-menu-item index="1-1" class="list-item"><router-link tag="span" :to="{name: 'uploadResource'}">上传的资源</router-link></el-menu-item> -->
						<el-menu-item index="1-2" class="list-item">
							<router-link tag="span" :to="{name: 'createdCourse'}">创建的课程</router-link>
						</el-menu-item>
						<el-menu-item index="1-3" class="list-item">
							<router-link tag="span" :to="{name: 'createdKnowLedge'}">创建的知识点</router-link>
						</el-menu-item>
						<!-- <el-menu-item index="1-3" class="list-item"><router-link tag="span" :to="{name: 'studyCourse'}">学习的课程</router-link></el-menu-item> -->
						<!-- <el-menu-item index="1-4" class="list-item"><router-link tag="span" :to="{name: 'createdTest'}">创建的试卷</router-link></el-menu-item> -->
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span class="title">个人中心</span>
					</template>
					<el-menu-item-group>
						<!-- <el-menu-item index="2-1" class="list-item"><router-link tag="span" :to="{name: 'teachingCourse'}">在教课程</router-link></el-menu-item> -->
						<el-menu-item index="2-2" class="list-item">
							<router-link tag="span" :to="{name: 'questionManage'}">试题管理</router-link>
						</el-menu-item>
						<!-- <el-menu-item index="2-3" class="list-item"><router-link tag="span" :to="{name: 'testManage'}">试卷管理</router-link></el-menu-item> -->
						<!-- <el-menu-item index="2-4" class="list-item"><router-link tag="span" :to="{name: 'studentsGroup'}">学生分组</router-link></el-menu-item> -->
						<!-- <el-menu-item index="2-5" class="list-item"><router-link tag="span" :to="{name: 'myExam'}">我的考试</router-link></el-menu-item> -->
						<!-- <el-menu-item index="2-6" class="list-item"><router-link tag="span" :to="{name: 'myStudy'}">我的学习</router-link></el-menu-item> -->
					</el-menu-item-group>
				</el-submenu>
				<!--      <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span class="title">账户设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" class="list-item"><router-link tag="span" :to="{name: 'acountSetting'}">账户设置</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
			</el-menu>

		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'personalCenter',
		data() {
			return {
				// index: localStorage.getItem('index'),
				openeds: ['1', '2', '3'],
				userName: localStorage.getItem('userName')
			};
		},
		mounted() {
			// console.log(this.localIndex)
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(11111, key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			changeIndex(val) {
				this.index = val;
				localStorage.setItem('index', val)
				this.$store.commit('updateIndex',localStorage.getItem('index'))
				console.log(this.indexContent)
			}
		},
		computed: {
			indexContent() {
				console.log(this.$store.state.index)
				return this.$store.state.index
			}
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.personalCenter {
		display: -webkit-box;
		/* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
		display: -moz-box;
		/* Firefox 17- */
		display: -webkit-flex;
		/* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
		display: -moz-flex;
		/* Firefox 18+ */
		display: -ms-flexbox;
		/* IE 10 */
		display: flex;
		/* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
		min-width: 1200px;
		max-width: 1760px;
		margin: 0 auto;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20px;
	}

	.menu {
		flex: 0 0 270px;
		width: 270px;
		background-color: #fff;
	}

	.user-info {
		margin-top: 30px;
		padding-bottom: 1px;
		text-align: center;

		.avatar div {
			display: inline-block;
			width: 98px;
			height: 98px;
			line-height: 94px;
			border-radius: 50%;
			overflow: hidden;
			background-color: #58B99D;

			span {
				display: inline-block;
				vertical-align: middle;
				width: 90px;
				height: 90px;
				border-radius: 50%;
				overflow: hidden;
			}

			img {
				width: 100%;
				height: 100%;
			}
		}

		p {
			padding-bottom: 10px;
			line-height: 58px;
			font-size: 20px;
		}

		.border {
			height: 1px;
			background-color: rgb(229, 229, 229);
		}
	}

	.el-menu {
		color: #333;
		border: none;

		.title {
			font-size: 16px;
		}

		.el-menu-item {
			font-size: 16px;
			color: #666;
			padding: 0 !important;

			&.is-active {
				color: #fff;
				background-color: #1ABC9C;
			}

			span {
				display: block;
				padding-left: 53px;
			}
		}
	}

	.content {
		flex: 1;
		margin-left: 9px;
		background-color: #f3f3f3;
	}
</style>
