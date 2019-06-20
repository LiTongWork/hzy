<template lang="html">
	<div class="examAnalysis">
		<div class="main">
			<div class="tab">
				<span v-for="(item, index) in tabData.list" :key="item" :class="{active:tabData.isActive === index}" @click="tabChange(index)">{{item}}</span>
				<div class="fr">
					<el-button class="dark-border">导出分析报告</el-button>
				</div>
			</div>
			<div class="content-box">
				<div v-show="tabData.isActive === 0" class="content-item gkfx">
					<div class="title">
						<span>课程：液压与气压传动</span>
						<span class="line-between">|</span>
						<span>作业类型：作业</span>
						<span class="line-between">|</span>
						<span>开始时间：2019-04-04 11:00</span>
						<span class="line-between">|</span>
						<span>结束时间：2019-04-04 12:00</span>
						<span class="line-between">|</span>
						<span>作业时长：60分钟</span>
						<span class="line-between">|</span>
						<span>参加人数：30</span>
						<span class="line-between">|</span>
						<span>缺考人数：0</span>
					</div>
					<div class="clearfix">
						<div class="fl grade">
							<div class="chartName">
								<p>成绩统计</p>
								<div>
									<span>试卷总分：{{gkfxData.grade.totalScore}}</span>
									<span>平均分：{{gkfxData.grade.averageScore}}</span>
									<span>及格率：{{gkfxData.grade.passRate}}</span>
									<span>优秀率：{{gkfxData.grade.proficiency}}</span>
								</div>
							</div>
							<div ref="gradePie" class="gradePie"></div>
						</div>
						<div class="fr difficulty">
							<div class="chartName">
								<p>试卷难易度</p>
								<div>
									<span>总题数：{{gkfxData.difficulty.total}}</span>
									<span>困难：{{gkfxData.difficulty.kn}}</span>
									<span>一般：{{gkfxData.difficulty.yb}}</span>
									<span>简单：{{gkfxData.difficulty.jd}}</span>
								</div>
							</div>
							<div ref="difficultyPie" class="difficultyPie"></div>
						</div>
						<div class="fl accuracy">
							<div class="chartName">
								<p>试题正确率</p>
							</div>
							<div ref="accuracyBar" class="accuracyBar"></div>
						</div>
						<div class="fr comment">
							<div class="chartName">
								<p>教师评语</p>
							</div>
							<div class="commentText">
								<div class="hint">暂无信息，请去“教师评语”模块填写</div>
							</div>
						</div>
					</div>
				</div>
				<div v-show="tabData.isActive === 1" class="content-item xsfx">
					<div class="title">
						<span>共10人</span>
						<span class="line-between">|</span>
						<span>已交卷：10人</span>
						<span class="line-between">|</span>
						<span>缺考：0人</span>
					</div>
					<div class="select">
						<el-select v-model="xsfxData.selectData.valueOne" placeholder="请选择">
							<el-option v-for="item in xsfxData.selectData.optionsOne" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<div class="input-search">
							<el-input placeholder="请输入内容" v-model="xsfxData.selectData.valueThr" class="input-with-select">
								<el-select v-model="xsfxData.selectData.valueTwo" slot="prepend" placeholder="请选择">
									<el-option v-for="item in xsfxData.selectData.optionsTwo" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
								<el-button slot="append" icon="el-icon-search"></el-button>
							</el-input>
						</div>
					</div>
					<div class="table">
						<div class="table-box">
							<el-table :data="xsfxData.tableData" style="width: 100%">
								<el-table-column align="center" type="index" label="排行" width="50"></el-table-column>
								<el-table-column align="center" prop="name" label="考生姓名" width="180"></el-table-column>
								<el-table-column align="center" prop="studentNum" label="学号"></el-table-column>
								<el-table-column align="center" prop="status" label="状态"></el-table-column>
								<el-table-column align="center" prop="answerTime" label="答卷时间"></el-table-column>
								<el-table-column align="center" prop="score" label="得分"></el-table-column>
								<el-table-column align="center" label="操作">
									<template slot-scope="scope">
										<el-button type="text" class="text-color">
											<router-link :to="{name: 'answerDetail'}" tag="span">答卷详情</router-link>
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</div>
				<div v-show="tabData.isActive === 2" class="content-item sjfx">
					<div class="paperAnalysis">
						<div class="content-left">
							<div class="top">
								<span class="title">数学对口升学模拟冲刺卷作业</span>
							</div>
							<div class="topic danXuan">
								<h4>一、单选题</h4>
								<ul class="list">
									<li class="list-item">
										<p class="tiMu">1.<span>(2分)</span> 下面算式中，得数最大的是（）。</p>
										<div class="xuanXiang">
											<span>A:1+2</span>
											<span>B:2+2</span>
											<span>C:3+2</span>
											<span>D:4+2</span>
										</div>
										<div class="desc">
											<p v-show="sjfxData.showJx">【解析】 <span>1+2=3；2+2=4；3+2=5；4+2=6</span></p>
											<div class="handle">
												<el-button type="text" v-show="!sjfxData.showJx" @click="showJx"><i class="el-icon-document text-color"></i>查看解析</el-button>
												<el-button type="text" v-show="sjfxData.showJx" @click="hideJx"><i class="el-icon-document text-color"></i>隐藏解析</el-button>
											</div>
										</div>
										<div class="info">
											<div class="info-item complexity">困难</div>
											<br>
											<div class="info-item rightNum">0%人答对</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="topic tianKong">
								<h4>一、填空题</h4>
								<ul class="list">
									<li class="list-item">
										<p class="tiMu">1.<span>(2分)</span> 下面算式中，得数最大的是（）。</p>
										<div class="xuanXiang">
											<span>A:1+2</span>
											<span>B:2+2</span>
											<span>C:3+2</span>
											<span>D:4+2</span>
										</div>
										<div class="desc">
											<p v-show="sjfxData.showJx">【解析】 <span>1+2=3；2+2=4；3+2=5；4+2=6</span></p>
											<div class="handle">
												<el-button type="text" v-show="!sjfxData.showJx" @click="showJx"><i class="el-icon-document text-color"></i>查看解析</el-button>
												<el-button type="text" v-show="sjfxData.showJx" @click="hideJx"><i class="el-icon-document text-color"></i>隐藏解析</el-button>
											</div>
										</div>
										<div class="info">
											<div class="info-item complexity">困难</div>
											<br>
											<div class="info-item rightNum">0%人答对</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="aslide">
							<h4>试题正确率</h4>
							<div class="legend">
								<p><em class="green"></em><span>30%以下</span></p>
								<p><em class="orange"></em><span>30%-60%</span></p>
								<p><em class="blue"></em><span>60%-80%</span></p>
								<p><em class="pink"></em><span>80%以上</span></p>
							</div>
							<div class="item danXuan">
								<h5>单选题</h5>
								<ul>
									<li class="green">1</li>
									<li class="green">2</li>
									<li class="green">3</li>
									<li class="green">5</li>
									<li class="green">6</li>
									<li class="green">7</li>
									<li class="green">8</li>
									<li class="green">9</li>
								</ul>
							</div>
							<div class="item zongHe">
								<h5>综合题1</h5>
								<ul>
									<li class="green">1</li>
									<li class="green">2</li>
									<li class="green">3</li>
								</ul>
							</div>
							<div class="item zongHe">
								<h5>综合题2</h5>
								<ul>
									<li class="blue">1</li>
									<li class="green">2</li>
									<li class="green">3</li>
								</ul>
							</div>
							<div class="item zongHe">
								<h5>综合题3</h5>
								<ul>
									<li class="orange">1</li>
									<li class="green">2</li>
									<li class="green">3</li>
								</ul>
							</div>
							<div class="item zongHe">
								<h5>综合题4</h5>
								<ul>
									<li class="pink">1</li>
									<li class="green">2</li>
									<li class="green">3</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div v-show="tabData.isActive === 3" class="content-item jspy">
					<form action="">
						<div class="input">
							<div>
								<textarea maxlength="500" placeholder="请输入评语" v-model="jspyData.inputText" @input="commentInput"></textarea>
							</div>
						</div>
						<div class="submit">
							<el-button class="dark-bg">提交</el-button>
							<span class="fr remnant">还可以输入<span>{{jspyData.remnant}}</span>个字</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入饼图组件
	require('echarts/lib/chart/pie')
	// 引入条形图组件
	require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	// 引入legend组件
	require('echarts/lib/component/legend')

	export default {
		name: 'examAnalysis',
		data() {
			return {
				tabData: {
					isActive: 0,
					list: ['概况分析', '学生分析', '试卷分析', '教师评语']
				},
				gkfxData: {
					grade: {
						totalScore: '100',
						averageScore: '60',
						passRate: '0%',
						proficiency: '0%',
						pie: [{
								name: '60分以下',
								value: 10
							},
							{
								name: '60-85分',
								value: 10
							},
							{
								name: '85-100分',
								value: 10
							}
						]
					},
					difficulty: {
						total: 30,
						kn: 10,
						yb: 10,
						jd: 10,
						pie: [{
								name: '困难',
								value: 10
							},
							{
								name: '一般',
								value: 10
							},
							{
								name: '简单',
								value: 10
							}
						]
					},
					accuracy: {
						total: 30,
						bar: [{
								name: '0-30%',
								value: 24
							},
							{
								name: '30%-60%',
								value: 0
							},
							{
								name: '60%-80%',
								value: 0
							},
							{
								name: '80%-100%',
								value: 6
							}
						]
					}
				},
				xsfxData: {
					selectData: {
						optionsOne: [{
							value: '选项一',
							label: '全部'
						}],
						optionsTwo: [{
							value: '选项一',
							label: '姓名'
						}],
						valueOne: '',
						valueTwo: '',
						valueThr: ''
					},
					tableData: [{
						name: '王小虎',
						studentNum: 2019013228,
						status: '已交卷',
						answerTime: '60分50秒',
						score: 60
					}]
				},
				sjfxData: {
					showJx: false
				},
				jspyData: {
					inputText: '',
					remnant: 500
				}
			}
		},
		mounted() {
			this.drawPie(this.$refs.gradePie, this.gkfxData.grade.pie);
			this.drawPie(this.$refs.difficultyPie, this.gkfxData.difficulty.pie);
			this.drawBar(this.$refs.accuracyBar, this.gkfxData.accuracy.bar);
		},
		methods: {
			tabChange(val) {
				this.tabData.isActive = val;
			},
			drawPie(ref, val) {
				let arr = [];
				this.$nextTick(() => {
					val.forEach(item => {
						arr.push(item.name);
					});
					// 基于准备好的dom，初始化echarts实例
					let myChart = echarts.init(ref);
					// 绘制图表
					myChart.setOption({
						color: ['#7683FF', '#FA9399', '#FFAE15'],
						tooltip: {
							trigger: 'item',
							formatter: '{a} <br/>{b} : {c} ({d}%)'
						},
						legend: {
							orient: 'vertical',
							left: '300',
							top: '60',
							data: arr,
							itemGap: 30
						},
						series: [{
							name: '比例',
							type: 'pie',
							radius: ['60%', '20%'],
							center: ['30%', '45%'],
							data: val,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							label: {
								normal: {
									position: 'inner',
									formatter: '{d}%'
								}
							}
						}]
					})
				});
			},
			drawBar(ref, val) {
				let arr1 = [];
				let arr2 = [];
				this.$nextTick(() => {
					val.forEach(item => {
						arr1.push(item.name);
						arr2.push(item.value);
					});
					//          console.log(arr1);
					//          console.log(arr2);
					// 基于准备好的dom，初始化echarts实例
					let myChart = echarts.init(ref);
					// 绘制图表
					myChart.setOption({
						color: ['#7683FF'],
						title: {
							subtext: '总题数'
						},
						grid: {
							x: '10%',
							y: '20%',
							x2: '8%',
							y2: '15%'
						},
						tooltip: {
							trigger: 'axis'
						},
						calculable: true,
						xAxis: [{
							type: 'category',
							data: arr1,
							axisTick: {
								// 取消刻度线
								show: false
							},
							axisLine: {
								// 取消坐标轴
								show: false
							}
						}],
						yAxis: [{
							type: 'value',
							axisTick: {
								// 取消刻度线
								show: false
							},
							axisLine: {
								// 取消坐标轴
								show: false
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: ['#E5E5E5']
								}
							}
						}],
						series: [{
							//                name: '蒸发量',
							type: 'bar',
							data: val,
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'top',
										textStyle: {
											color: '7683FF'
										}
									}
								}
							}
						}]
					})
				});
			},
			showJx() {
				this.sjfxData.showJx = true
			},
			hideJx() {
				this.sjfxData.showJx = false
			},
			commentInput() {
				let ll = this.jspyData.inputText.length;
				//        console.log(ll);
				this.jspyData.remnant = 500 - ll;
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.examAnalysis {}

	.main {
		display: flex;
		flex-direction: column;
		padding: 20px 50px;
		background-color: #f3f3f3;
	}

	.tab {
		padding: 0 30px;
		line-height: 64px;
		background-color: #fff;

		span {
			padding: 6px 10px;
			cursor: pointer;
			-webkit-border-radius: 3px;
			-moz-border-radius: 3px;
			border-radius: 3px;

			&.active {
				color: #fff;
				background-color: #1ABC9C;
			}
		}

		button {
			padding: 8px 12px;
		}
	}

	.content-box {
		margin-top: 20px;

		.content-item {
			padding: 20px;
			background-color: #fff;

			.title {
				height: 16px;
				line-height: 16px;
				font-size: 14px;

				.line-between {
					position: relative;
					top: -2px;
					margin: 0 8px;
				}
			}
		}
	}

	.gkfx {

		.grade,
		.difficulty,
		.accuracy,
		.comment {
			margin-top: 20px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			border: 1px solid #1ABC9C;
			width: 48%;
		}

		.chartName {
			p {
				line-height: 48px;
				text-align: center;
				color: #fff;
				background-color: #1ABC9C;
			}

			div {
				padding: 20px 0 0;
				line-height: 16px;
				text-align: center;
				font-size: 14px;

				span {
					margin: 0 10px;
				}
			}
		}

		.gradePie,
		.difficultyPie,
		.accuracyBar,
		.commentText {
			height: 260px;
		}

		.commentText {
			display: table;
			width: 100%;
			overflow-y: auto;

			.hint {
				display: table-cell;
				vertical-align: middle;
				text-align: center;
				color: #999;
			}
		}
	}

	.xsfx {
		.select {
			padding: 20px 20px 0;

			.el-select,
			.input-search {
				display: inline-block;
			}

			.el-select .el-input {
				width: 130px;
			}
		}

		.table {
			padding: 20px;

			.table-box {
				border: 1px solid #e5e5e5;
				border-bottom: none;
			}
		}
	}

	.sjfx {
		padding: 0px !important;

		.paperAnalysis {
			display: -moz-box;
			/* Firefox */
			display: -ms-flexbox;
			/* IE10 */
			display: -webkit-box;
			/* Safari */
			display: -webkit-flex;
			/* Chrome, WebKit */
			// display: box;
			display: flexbox;
			display: flex;
			background-color: #f3f3f3;
		}

		.content-left {
			-webkit-flex: 1;
			/*Chrome*/
			-ms-flex: 1;
			/*IE 10*/
			flex: 1;
			/* NEW ,Spec - Opera 12.1,Firefox 20+*/
			-webkit-box-flex: 1;
			/*OLD -iOS 6-,Safari 3.1-6*/
			-moz-box-flex: 1;
			/*OLD - Firefox 19-*/
			padding: 20px;
			background-color: #fff;
		}

		.top {
			height: 24px;
			line-height: 24px;
			font-size: 0;

			span {
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
			}

			.title {
				font-size: 24px;
				font-weight: bold;
			}
		}

		.topic {
			padding: 15px 30px;

			h4 {
				height: 60px;
				line-height: 60px;
			}

			.list {
				padding: 20px;
				border: 1px solid #eee;

				.list-item {
					position: relative;
					line-height: 54px;
				}
			}

			.tiMu {
				span {
					margin: 0 5px;
					color: #999;
				}
			}

			.xuanXiang {
				span {
					margin-right: 30px;
				}
			}

			.desc {
				p {
					border-top: 1px solid #eee;
				}

				.handle {
					button {
						color: #666;
					}

					i {
						margin-right: 5px;
					}
				}
			}

			.info {
				position: absolute;
				right: 0;
				top: 0;
				line-height: normal;
				text-align: right;
				font-size: 0;

				.info-item {
					display: inline-block;
					margin-bottom: 10px;
					padding: 8px 12px;
					line-height: 16px;
					text-align: center;
					font-size: 16px;
					color: #fff;

					&.complexity {
						background-color: #FFAE15;
					}

					&.averageScore {
						background-color: #FA9399;
					}

					&.rightNum {
						background-color: #7683FF;
					}
				}
			}
		}

		.aslide {
			margin-left: 20px;
			padding: 0 20px 20px;
			width: 270px;
			background-color: #fff;

			.green {
				color: #fff;
				background-color: #1ABC9C;
			}

			.orange {
				color: #fff;
				background-color: #FFAE15;
			}

			.blue {
				color: #fff;
				background-color: #7683FF;
			}

			.pink {
				color: #fff;
				background-color: #FA9399;
			}

			h4 {
				height: 56px;
				line-height: 56px;
				border-bottom: 1px solid #eee;
			}

			.legend {
				padding: 10px 0 0;
				font-size: 0;

				p {
					line-height: 36px;
				}

				em {
					display: inline-block;
					margin-right: 10px;
					vertical-align: middle;
					width: 16px;
					height: 16px;
				}

				span {
					display: inline-block;
					vertical-align: middle;
					font-size: 16px;
				}
			}

			.item {
				margin-top: 30px;

				h5 {
					line-height: 30px;
				}

				ul {
					font-size: 0;

					li {
						display: inline-block;
						vertical-align: top;
						margin-right: 20px;
						margin-top: 15px;
						width: 30px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						font-size: 16px;
						-webkit-border-radius: 3px;
						-moz-border-radius: 3px;
						border-radius: 3px;
					}
				}
			}
		}
	}

	.jspy {
		form {
			display: block;

			.input {
				width: 100%;
				border: 1px solid #e5e5e5;

				div {
					margin: 20px;
					min-height: 300px;
				}

				textarea {
					display: block;
					width: 100%;
					height: 100%;
					line-height: 30px;
					resize: none;
				}
			}

			.submit {
				line-height: 76px;

				.remnant {
					color: #999;
				}
			}
		}
	}
</style>
