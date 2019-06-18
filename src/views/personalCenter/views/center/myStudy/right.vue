<template>
	<!-- 整体右侧模块 -->
	<div class="right">
		<!-- top 公共组件 -->
		<!-- <topChoose></topChoose> -->
		<div class="topChoose">
			<h4>
				<ul>
					<li v-for="(item, index) in bankArr" :key="index" :class="{'selectedType1': type === index}" @click="changeBank(index)">{{ item }}</li>
				</ul>
				<button class="btnStyle1 mt7">添加试题</button>
			</h4>

			<!-- 这一块也可以为组件 topSelected -->
			<div class="selectChoose"> <!-- 这一块你用 elementui select 组件吧 -->
				<select v-for="(item, index) in bankObj" :key="'bankObj' + index">
					<option v-for="(m, n) in item" :key="'具体对象' + n" :value="m.value">{{ m.title }}</option>
				</select>
			</div>
		</div>

		<!-- 下面的组件内容 -->
		<div class="content">
			<div class="title">
				<el-checkbox v-model="checkAll" @change="handleCheckAllChange">本页全选</el-checkbox>
				<span>{{ '共 ' + total + ' 条记录' }}</span>
				<button class="btnStyle1 mt7">批量删除</button>
				<!-- elementui 复选框 -->
			</div>
			<div class="box" v-for="(item, index) in chooseArr" :key="'chooseArr' + index">
				<p>
					<el-checkbox v-model="item.checked" @change="handleCheck"></el-checkbox>
					<span>{{ '1.' + item.title + '（  ）。' }}</span>
				</p>
				<p>
					<span v-for="(m, n) in item.answer" :key="'answer' + n" class="answerOptions">
						<i>{{ n | answerName }}</i>.
						{{ m }}
					</span>
				</p>
				<p class="optionInfo">
					<span>{{ item.info.difficulty }}</span>
					<i></i>
					<span>{{ '已选' + item.info.hour + '课时' }}</span>
					<i></i>
					<span>{{ item.info.type }}</span>
					<i></i>
					<span>{{ item.info.number }}</span>
					<i></i>
					<span>{{ '贡献者: ' + item.info.contributor }}</span>
					<i></i>
					<span>{{ '组卷次数: ' + item.info.time }}</span>
				</p>
				<p class="btnArea">
					<el-button type="success" size="mini" icon="el-icon-search">查看解析</el-button>
					<el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
					<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          <el-button type="text" size="mini" icon="el-icon-edit" @click="alert(111)">编辑</el-button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				type: null,
				bankArr: ['我的试题', '我的收藏'],		// 标题库
				bankObj: {},	// 所以选项对象
				checkAll: true,
				chooseArr: [],
				total: 0		// 总条数
			}
		},
		mounted () {
			this.changeBank(0)
		},
		methods: {
			// 切换
			changeBank (type) {
				this.type = type
				// 清空数组，对象
				this.bankObj = {}
				this.chooseArr = []

				// 此处更换 bankObj  可能是 调用接口返回
				if (type === 0) {
					this.bankObj = {	// 所以选项对象
						course: [	// 课程
							{value: 0, title: '全部课程'},
							{value: 1, title: '课程一'},
							{value: 2, title: '课程二'}
						],
						questionType: [		// 题型
							{value: 0, title: '全部题型'},
							{value: 1, title: '选择题'},
							{value: 2, title: '填空题'}
						],
						difficulty: [	// 难度
							{value: 0, title: '全部难度'},
							{value: 1, title: '简单'},
							{value: 2, title: '复杂'}
						]
					}

					// 假装这是 接口返回的数据
					let _data = {
						total: 100,
						data: [
							{
								checked: true,
								title: '下面算术中，得数最大的是',
								answer: ['1+2', '1+3', '2+3', '5+3'],
								info: {
									difficulty: '简单',
									hour: '1',
									type: '单选',
									number: '000000111231',
									contributor: '演示教师',
									time: '1'
								}
							},
							{
								checked: false,
								title: '下面算术中，得数最小的是',
								answer: ['5-3', '1+3', '2+3', '5+3'],
								info: {
									difficulty: '一般',
									hour: '1',
									type: '单选',
									number: '000000111231',
									contributor: '演示教师',
									time: '2'
								}
							}
						]
					}

					// 赋值
					this.total = _data.total
					this.chooseArr = _data.data

					// 判断是否为全选
					let _noChecked = this.chooseArr.filter(x => x.checked === false)
					if (_noChecked.length > 0) {
						this.checkAll = false
					} else {
						this.checkAll = true
					}
				} else if (type === 1) {
					this.bankObj = {	// 所以选项对象
						course: [	// 课程
							{value: 0, title: '全部课程'},
							{value: 1, title: '课程一'},
							{value: 2, title: '课程二'}
						]
					}
				}
			},
			// 本页全选
			handleCheckAllChange (val) {
				console.log(val)
				if (val) {
					this.chooseArr.map(x => { x.checked = true })
				} else {
					this.chooseArr.map(x => { x.checked = false })
				}
				// this.chooseArr
			},
			// 选择单个
			handleCheck (val) {
				// 判断是否为全选
				let _noChecked = this.chooseArr.filter(x => x.checked === false)
				if (_noChecked.length > 0) {
					this.checkAll = false
				} else {
					this.checkAll = true
				}
			}
		},
		// 过滤器
		filters: {
			answerName (index) {
				let name = '';
				switch (index) {
					case 0:
						name = 'A';
						break;
					case 1:
						name = 'B';
						break;
					case 2:
						name = 'C';
						break;
					case 3:
						name = 'D';
						break;
				}
				return name
			}
		}
	}
</script>

<style scoped>
	.right {
		height: 600px;
		background-color: #eee;
	}

	.topChoose {
		padding: 0 10px;
		background-color: #fff;
		margin-bottom: 10px;
	}

	.topChoose h4 {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ddd;
	}

	.topChoose ul {
		list-style: none;
	}

	.topChoose li {
		float: left;
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		margin-right: 15px;
		font-weight: normal;
		cursor: pointer;
	}

	li.selectedType1 {
		font-weight: bold;
	}

	.btnStyle1 {
		float: right;
		font-size: 12px;
		padding: 3px 7px;
		color: #fff;
		background-color: #2dbb80;
		border-color: transparent;
		border-radius: 5px;
	}
	.mt7 {
		margin-top: 7px;
	}
	.selectChoose {
		text-align: left;
		padding-bottom: 10px;
	}
	.selectChoose select {
		margin-right: 15px;
	}
	.content {
		text-align: left;
		background-color: #fff;
		padding: 10px;
	}
	.content .title {
		font-size: 14px;
		height: 40px;
		line-height: 40px;
	}
	.box {
		font-size: 12px;
		border: 1px solid #eee;
    padding: 7px 10px;
    margin-bottom: 10px;
	}
	.box .el-checkbox {
		margin-right: 5px;
	}
	.box>p {
		height: 20px;
		line-height: 20px;
	}
	.box span {
		display: inline-block;
	}
	.box .answerOptions {
		margin-right: 35px;
	}
	.box .optionInfo {
		height: 35px;
		line-height: 35px;
	}
	.optionInfo span {
		display: inline-block;
	}
	.optionInfo i {
		display: inline-block;
		font-size: 12px;
		height: 14px;
		width: 1px;
		margin: 0 7px;
		vertical-align: middle;
		background-color: #000;
	}
	.btnArea {
		border-top: 1px solid #eee;
		padding-top: 10px;
	}
	.btnArea button {
		padding: 4px 5px;
	}
</style>
