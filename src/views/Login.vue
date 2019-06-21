<template>
	<div class="container" v-loading="loading">
		<div class="form">
			<h1>慧职园</h1>
			<div class="box">
				<img src="../assets/img/icon-id.png" alt="账号icon" class="icon">
				<el-input placeholder="请输入账号" v-model="userName" clearable class="login-input"></el-input>
				<img src="../assets/img/icon-psw.png" alt="密码icon" class="icon icon1">
				<el-input placeholder="请输入密码" v-model="password" clearable class="login-input" type="password"></el-input>
				<el-button type="primary" class="btn" round @click="onLogin">登 录</el-button>
			</div>
		</div>
		<img src="../assets/img/login-bg.png" alt="背景图片" class="bgimg">
	</div>
</template>

<script>
	export default {
		name: "login",
		data() {
			return {
				userName: "",
				password: "",
				loading: false
			};
		},
		methods: {
			onLogin() {
				this.loading = true
				let _this = this
				let param = {
					"userName": _this.userName,
					"password": this.$md5(_this.password)
				}
				this.$http.post('/Login/UserLogin', param)
					.then(res => {
						console.log(res)
						localStorage.setItem("dataToken", res.data.data.token)
						localStorage.setItem("userName", res.data.data.userName)
						localStorage.setItem("loginType", res.data.data.loginType)
						let that = this
						setTimeout(function() {
							if (res.data.data.loginType == 2) {
								this.loading = false
								that.$router.push({
									name: 'createdCourse'
								}); // 老师登陆成功跳转
								that.$notify.success({
									title: 'Info',
									message: '欢迎老师登录',
									showClose: true
								});

							} else {
								this.loading = false
								that.$router.push({
									name: 'onlineTestIndex'
								}); //学生登陆成功 跳转
								that.$notify.success({
									title: 'Info',
									message: '登陆成功',
									showClose: true
								});

							}
						}, 1000)


					})
					.catch(res => {
						console.log(res, "登录失败")
					})

			},

		},
		mounted() {
			let that = this;
			// that.loading = true;
			if (localStorage.getItem('dataToken')) {
				setTimeout(() => {
					// that.loading = false;
					this.$router.push({
						name: 'createdCourse'
					});
				},1000)
			}
			// console.log(localStorage.getItem('dataToken'))
			// console.log(localStorage.getItem('loginType'))
			// console.log(localStorage.getItem('userName'))
		}
	};
</script>

<style lang="scss" scoped>
	.bgimg {
		width: 100%;
		height: 100vh;
		position: fixed;
		margin: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
	}

	.form {
		z-index: 10;
		position: relative;
		width: 550px;
		height: 450px;
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0px 3px 28px -10px #000;
		margin: 10vh auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		flex-flow: row wrap;
		align-content: space-around;
	}

	h1 {
		text-align: center;
		width: 100%;
		font-size: 54px;
		font-weight: 500;
		color: #1abb99;
	}

	.box {
		width: 450px;
		height: 260px;
		margin-top: -100px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		flex-flow: row wrap;
		align-content: space-around;

		.icon {
			position: absolute;
			top: 167px;
			left: 67px;
			z-index: 5;
		}

		.icon1 {
			top: 255px;
		}
	}

	.login-input,
	.btn {
		width: 450px;
		height: 60px;
	}
</style>
