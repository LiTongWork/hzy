<template>
	<div class="createdCourse">
		<div class="header-wrapper">
			<div class="title">
				创建的课程
				<el-button type="primary" size="small" style="float:right;margin:20px 0;" @click="addFormVisible = true">添加课程</el-button>
			</div>
		</div>

		<el-dialog title="添加试题" :visible.sync="addFormVisible">
			<el-form :model="form">
				<el-form-item label="课程名称" label-width="200">
					<el-input v-model="form.courseName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程介绍" label-width="200">
					<el-input v-model="form.courseNote" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addCourceConfirm">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑试题" :visible.sync="editFormVisible">
			<el-form :model="form1">
				<el-form-item label="课程名称" label-width="200">
					<el-input v-model="form1.courseName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程介绍" label-width="200">
					<el-input v-model="form1.courseNote" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editCourceConfirm">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="添加知识点" :visible.sync="knowLedgeFormVisible">
			<el-form :model="form1">
				<el-form-item label="知识点名称" label-width="200">
					<el-input v-model="form2.knowName" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="knowLedgeFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="knowLedgeCourceConfirm">确 定</el-button>
			</div>
		</el-dialog>

		<div class="content-wrapper">
			<div class="list">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column label="课程名称" prop="courseName" align="center"></el-table-column>
					<el-table-column label="课程描述" prop="courseNote" align="center"></el-table-column>
					<el-table-column label="课程状态" prop="status" align="center" :formatter="changeStatus"></el-table-column>
					<el-table-column label="创建人" prop="creater" align="center"></el-table-column>
					<el-table-column label="创建时间" prop="createTime" align="center" :formatter="changeTime"></el-table-column>
					<el-table-column label="操作" prop="control" align="center">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="editStatus(scope.row.id,scope.row.status)">{{tableDataStatus}}</el-button>
							<el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
							<el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
							<el-button type="primary" size="small" @click="knowLedgeInsert(scope.row)">编辑知识点</el-button>
							<!--添加知识点-->
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="paging">
				<el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
				 :page-sizes="[10, 20]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'createdCourse',
		data() {
			return {
				tabType: 0,
				tableData: [],
				page: 1,
				rows: 10,
				total: 0,
				addFormVisible: false,
				form: {
					courseName: '',
					courseNote: ''
				},
				editFormVisible: false,
				form1: {
					courseName: '',
					courseNote: ''
				},
				knowLedgeFormVisible: false,
				form2: {
					knowName: ''
				},
				tableDataStatus: '',
				courceId: ''
			}
		},
		methods: {
			//启用或者停用
			editStatus(id, status) {
				// console.log('启用停用:',val.id)
				let param = {
					"id": id,
					"status": status
				};
				this.$http
					.post("/Course/Delete1", param)
					.then(res => {
						console.log(res.data.data);
						this.tableDataStatus = res.data.data == 2 ? '启用' : '停用'
						this.getCourceList()
					})
					.catch(res => {
						console.log(res.data);
					});
			},
			//编辑
			editClick(val) {
				// console.log('编辑:',val.id)
				this.editFormVisible = true
				let param = {
					"id": val.id
				};
				this.$http
					.post("/Course/Single", param)
					.then(res => {
						// console.log(res.data.data)
						this.form1.courseName = res.data.data.courseName
						this.form1.courseNote = res.data.data.courseNote
					})
					.catch(res => {
						console.log(res.data);
					});
			},
			//q确定编辑课程
			editCourceConfirm(id) {
				let param = {
					"id": id,
					"courseName": this.form1.courseName,
					"courseNote": this.form1.courseNote,
					"majorAId": "",
					"majorBId": "",
					"majorCId": "",
					"majorAllName": ""
				};
				this.$http
					.post("/Course/Update", param)
					.then(res => {
						// console.log(res.data.data)
						this.editFormVisible = false
						this.$notify({
							title: '成功',
							message: '修改成功',
							type: 'success'
						});
						this.getCourceList()
					})
					.catch(res => {
						console.log(res.data);
					});
			},
			//删除
			deleteClick(val) {
				// console.log('删除',val.id)
				this.$confirm('此操作将删除该文件课程以及里面的知识点题库等, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param = {
						"id": val.id
					};
					this.$http
						.post("/Course/Delete", param)
						.then(res => {
							console.log(res.data.data)
							this.$notify({
								title: '成功',
								message: '删除成功',
								type: 'success'
							});
							this.getCourceList()
						})
						.catch(res => {
							console.log(res.data);
						});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.rows = val;
				this.getCourceList();
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.page = val;
				this.getCourceList();
			},
			//转换状态为文字
			changeStatus(row, column) {
				// console.log(row.status)
				this.tableDataStatus = row.status == 2 ? '启用' : '停用'
				return row.status == 1 ? '已启用' : '已停用'
			},
			//转换时间为指定格式
			changeTime(row, column) {
				// console.log(row.createTime)
				return row.createTime.split('T')[0]
			},
			//确定添加课程
			addCourceConfirm() {
				let param = {
					"courseName": this.form.courseName,
					"courseNote": this.form.courseNote,
					"majorAId": "",
					"majorBId": "",
					"majorCId": "",
					"majorAllName": ""
				};
				// console.log(param);return;
				this.$http.post("/Course/Insert", param)
					.then(res => {
						console.log(res)
						console.log("课程ID", res.data.data);
						this.courceId = res.data.data
						this.addFormVisible = false
						this.$notify({
							title: '成功',
							message: '添加成功',
							type: 'success'
						});
						this.getCourceList()
					})
					.catch(res => {
						console.log(res.data);
					});
			},
			//添加知识点
			knowLedgeInsert(val) {
				console.log(val.id)
				this.knowLedgeFormVisible = true
				this.courseId = val.id
			},
			//确定添加知识点
			knowLedgeCourceConfirm() {
				let param = {
					"courseId": this.courseId,
					"knowName": this.form2.knowName,
					"parentId": "",
					"sort": ''
				};
				this.$http
					.post("/Course/KnowLedgeInsert", param)
					.then(res => {
						console.log(res.data.data);
						this.knowLedgeFormVisible = false
						this.$notify({
							title: '成功',
							message: '添加成功',
							type: 'success'
						});
						this.$router.push({
							name: 'createdKnowLedge'
						})
					})
					.catch(res => {
						console.log(res);
					});

			},
			//加载 课程列表
			getCourceList() {
				let param = {
					"page": this.page,
					"rows": this.rows
				};
				this.$http
					.post("/Course/PageList", param)
					.then(res => {
						console.log('课程列表', res.data.data);
						this.total = res.data.data.total
						this.tableData = res.data.data.list

					})
					.catch(res => {
						console.log(res);
					});
			},

		},
		mounted() {
			this.getCourceList()
		},
		created() {
			localStorage.setItem('index', '1-2')
		}

	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.createdCourse {
		padding: 0 20px;
		background-color: #fff;
	}

	.title {
		height: 64px;
		line-height: 64px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
		border-bottom: 1px solid rgb(238, 238, 238);
	}

	.content-wrapper {
		margin-top: 29px;
		padding: 0 10px 20px 10px;

		.list {
			border: 1px solid #f3f3f3;
			border-bottom: none;
		}
	}

	.paging {
		margin: 50px 0 0 0;
	}
</style>
