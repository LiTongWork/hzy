<template>
	<div class="markingItem">
		<div class="row-line" style="height:20px;"></div>
		<div class="content">
			<div class="answerSheet">
				<img :src="subjective == '' ? '../../assets/img/login-bg.png' : subjective ">
			</div>
			<div class="scoreList">
				<div class="scoreListBox">
					<div class="list-item">
						<span class='tihao'>题号</span>
						<input type="text" value="分数" readonly="readonly">
					</div>
					<div class="list-item" v-for="(item,index) in scoreList" :key='index'>
						<span class='tihao'>{{item.examNo}}</span>
						<input class="score" type="number" v-model="item.score" placeholder="">
					</div>
					<div class="handle">
						<el-button v-if="detail.page > 1" @click='prevMarking'>上一位</el-button>
						<el-button v-if="detail.page < detail.rows" @click='nextMarking'>下一位</el-button>
						<el-button v-if="detail.page >= detail.rows" @click='completeMarking'>完成阅卷</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="row-line" style="height:20px;"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				postion: '',
				examId: '',
				examineeId: '',
				markingPostion: '',
				detail: {},
				list: [],
				subjective: '',
				scoreList: []
			}
		},
		mounted() {
			let that = this;
			if(that.$route.params.examId){
				that.examId = that.$route.params.examId;
			}
			if(that.$route.params.markingPostion){
				that.markingPostion = Number(that.$route.params.markingPostion);
			}
			let params = {
				postion: that.markingPostion,
				examId: that.examId
			}
			// console.log(params)
			that.getDetail(params)
		},
		methods: {
			// 获取当前详情
			getDetail() {
				let that = this;
				let params = { 
					postion: that.markingPostion,
					examId: that.examId,
					examineeId: that.examineeId,
					list: that.scoreList
				}
				// console.log(params)
				that.$http.post('/exam/MarkingDeatil', params)
					.then(res => {
						that.loading = false;
						console.log(res.data.data);
						if (res.data.code == 200) {
							res.data.data.list[0].questions = res.data.data.list[0].questions.split(','); // 先将题号分割成数组
							that.detail = res.data.data; // 再将内容赋值给detail
							// that.postion = that.detail.list[0].postion; 
							that.examineeId = that.detail.list[0].examineeId;
							that.subjective = that.detail.list[0].subjective;
							that.scoreList = [];
							for (let i in res.data.data.list[0].questions) {
								let obj = {
									id: res.data.data.mlist[i] && res.data.data.mlist[i].id ? res.data.data.mlist[i].id : '',
									examNo: res.data.data.list[0].questions[i],
									score: res.data.data.mlist[i] && res.data.data.mlist[i].score ? res.data.data.mlist[i].score : ''
								}
								that.scoreList.push(obj)
							}
						}

					})
					.catch(res => {
						console.log(res)
					})
			},
			// 上一位
			prevMarking() {
				let that = this;
				if (that.markingPostion > 1) {
					that.markingPostion = that.markingPostion - 1;
					that.$router.push({
						name: 'markingItem',
						params: {
							examId: that.examId,
							markingPostion: that.markingPostion
						}
					})
				}
				that.getDetail()
			},
			// 下一位
			nextMarking() {
				let that = this;
				let params = { 
					postion: that.markingPostion + 1,
					examId: that.examId,
					examineeId: that.examineeId,
					list: that.scoreList
				}
				console.log('传递参数',params)
				that.$http.post('/exam/SaveExam', params)
				.then(res => {
					console.log(res.data);
					if(res.data.code == 200) {
						that.markingPostion = that.markingPostion + 1;
						that.$router.push({
							name: 'markingItem',
							params: {
								examId: that.examId,
								markingPostion: that.markingPostion
							}
						})
						that.getDetail()
					}
				})
				.catch(res => {
					console.log(res)
				})	
			
			},
			// 完成阅卷
			completeMarking() {
				let that = this;
				let params = { 
					postion: that.markingPostion + 1,
					examId: that.examId,
					examineeId: that.examineeId,
					list: that.scoreList
				}
				console.log('传递参数',params)
				that.$http.post('/exam/SaveExam', params)
				.then(res => {
					console.log(res.data);
					
				})
				.catch(res => {
					console.log(res)
				})		
			}

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.markingItem {
		max-width: 1760px;
		min-width: 1200px;
	}

	.row-line {
		width: 100%;
		background-color: #f3f3f3;
	}

	.content {
		display: flex;
	}

	.answerSheet {
		flex: 1;
	}

	.answerSheet img {
		display: block;
		margin: 0 auto;
		width: 90%;
	}

	.scoreList {
		position: relative;
		border-left: 1px solid #e9e9e9;
		border-right: 1px solid #e9e9e9;
	}

	.scoreListBox {}

	.list-item {
		display: flex;
		align-items: center;
		text-align: center;
		border-bottom: 1px solid #e9e9e9;

		&:first-child {
			// border-top: 1px solid #e9e9e9;
		}

		span {
			padding: 0 10px;
			width: 50px;
		}

		input {
			padding: 0 10px;
			width: 100px;
			height: 50px;
			border: none;
			text-align: center;
			border-left: 1px solid #e9e9e9;
		}

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			appearance: none;
		}
	}

	// 操作按钮
	.handle {
		margin: 20px 0;
		display: flex;
		justify-content: flex-end;
	}
</style>
