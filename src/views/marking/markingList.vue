<template>
	<div class="markingList" v-loading="loading">
		<div class="nav">
			<div class="separator">
				<img src="../../assets/img/icon-point.png" class="icon" alt="位置icon">
				<el-breadcrumb separator-class="el-icon-arrow-right" class="item">
					<el-breadcrumb-item>当前位置</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ name: ''}">线下阅卷</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="row-line" style="height:20px;"></div>
		<div class="list-area">
			<div class="list-box">
				<p style="color:#666;">
					共搜索到
					<span style="color:red;">{{tableData.length}}</span> 条记录
				</p>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column align="center" prop="examName" label="考试名称" width="300"></el-table-column>
					<el-table-column align="center" prop="examTime" label="考试时间" v-if="loginType==2"></el-table-column>
					<el-table-column align="center" prop="status" label="状态" v-if="loginType==2">
						<template slot-scope="scope">
							<span v-if="scope.row.markingStatus == 0">未阅卷</span>
							<span v-if="scope.row.markingStatus == 1">阅卷中</span>
							<span v-if="scope.row.markingStatus == 2">阅卷完成</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="edit" label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" v-if="scope.row.status == 0" @click='toMarkingItem(scope.row.id,scope.row.postion)'>开始阅卷</el-button>
							<el-button type="text" size="small" v-if="scope.row.status == 1" @click='toMarkingItem(scope.row.id,scope.row.postion)'>继续阅卷</el-button>
							<el-button type="text" size="small" v-if="scope.row.status == 2" @click='toMarkingItem(scope.row.id,scope.row.postion)'>查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="page-area">
			<div class="page-box">
				<el-pagination background prev-text="上一页" next-text="下一页" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :current-page="page" :page-sizes="[10, 20, 30, 50, 100]" :page-size="rows" layout="prev, pager, next,total, sizes, jumper"
				 :total="tableData.length"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'markingList',
		data() {
			return {
				tableData: [],
				page: 1,
				rows: 10,
				total: 0,
				loginType: localStorage.getItem('loginType'),
				loading: false
			}
		},
		mounted(){
			this.getList()
		},
		methods: {
			// 获取考试列表
			getList(){
				let that = this;
				that.loading = true;
				let params = {
					page: that.page,
					rows: that.rows
				}
				that.$http.post('/exam/ExamList',params)
				.then(res => {
					that.loading = false;
					console.log(res.data.data.list[0]);
					if(res.data.code == 200) {
						for(let i in res.data.data.list) {
							let arr = res.data.data.list[i].examTime.split('T');
							res.data.data.list[i].examTime = arr[0];
						}
						that.tableData = res.data.data.list;
					}
				})
				.catch(res=>{
				  console.log(res)
				})
			},
			// 跳转
			toMarkingItem(id,postion) {
				const { href } = this.$router.resolve({
					name: 'markingItem',
					params: {
						examId: id,
						markingPostion: postion
					}
				});
				window.open(href, '_blank');
			},
			// 分页器
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);

			}
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.markingList {
		// background-color: #f2f3f3;
		max-width: 1760px;
		min-width: 1200px;
	}
	.nav {
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0 20px;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
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
	}

	.row-line,
	.select-area,
	.list-area,
	.page-area {
		width: 100%;
		background-color: #f2f3f3;
		box-sizing: border-box;
	}

	// 列表
	.list-box {
		max-width: 1760px;
		min-width: 1200px;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 20px 20px;
		background-color: #fff;
	}

	// 分页
	.page-box {
		max-width: 1760px;
		min-width: 1200px;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 20px 20px;
		text-align: center;
	}

	// 面包屑
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
