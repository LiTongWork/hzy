<template>
  <div class="questionManage">
<!--    <div class="header-wrapper">
      <div class="title">
        <el-tabs class="fl" @tab-click="selectType">
          <el-tab-pane v-for="(item, index) in headline" :label="item" :key="index"></el-tab-pane>
        </el-tabs>
        <div class="fr">
          <el-button class="dark-bg">添加试题</el-button>
        </div>
      </div>
      <div class="select-wrapper">
        <el-select class="smallHeight" v-model="value" placeholder="全部课程">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-if="type === 0" class="smallHeight" v-model="value" placeholder="全部题型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-if="type === 0" class="smallHeight" v-model="value" placeholder="全部难度">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div> -->
    <div class="content-wrapper">
      <div class="title" v-show="type === 0">
        <!-- <el-checkbox v-model="checkAll">本页全选</el-checkbox> -->
        <span class="total">共{{total}}条记录</span>
   <!--     <div class="fr">
          <el-button class="dark-bg">批量删除</el-button>
        </div> -->
      </div>
      <ul class="list" v-if="chooseArr.length > 0">
        <li class="list-item" v-for="(item, index) in chooseArr" :key="index">
          <p class="question">
            <!-- <el-checkbox v-model="item.checked"></el-checkbox> -->
            <span v-html="item.layout"></span>
          </p>
          <p class="answer">
            <span v-for="(m, n) in item.answer" :key="n">
              <i>{{ n | answerName }}：</i>{{m}}
            </span>
          </p>
          <p class="optionInfo">
<!--            <span>{{ item.difficulty }}</span>
            <i></i>
            <span>已选{{ item.hour }}课时</span> -->
            <i></i>
            <span>{{ item.courseName }}</span>
<!--            <i></i>
            <span>{{ item.number }}</span>
            <i></i>
            <span>贡献者：{{ item.contributor }}</span>
            <i></i>
            <span>组卷次数：{{ item.times }}</span> -->
            <span class="fr">更新时间：{{item.createTime}}</span>
          </p>
          <p class="btnArea">
            <!-- <span><i class="el-icon-document"></i>查看解析</span> -->
            <!-- <span v-show="type === 0"><i class="el-icon-edit"></i>编辑</span> -->
            <span v-show="type === 0" :data-id='item.id' @click="deleteItem"><i class="el-icon-delete"></i>删除</span>
            <!-- <span v-show="type === 1"><i class="el-icon-star-on"></i>取消收藏</span> -->
          </p>
        </li>
			</ul>
			<div class="paging" v-if="chooseArr.length > 0">
				<el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
				 :page-sizes="[10, 20]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'questionManage',
    data () {
      return {
        headline: ['我的试题', '我的收藏'],
        type: 0,
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }
        ],
        value: '',
        checkAll: true,
				page: 1,
        rows: 10,
        total: 0,
        chooseArr: [],
        currentPage: 1
      }
    },
    mounted () {
			this.getList()
    },
    methods: {
			getList(){
				let that = this;
				let params = {
					page: that.page,
					rows: that.rows
				}
				this.$http
					.post("/Question/PageList",params)
					.then(res => {
						console.log(res);
						if(res.data.code == 200) {
							for(let i in res.data.data.list) {
								let createTime = res.data.data.list[i].createTime;
								res.data.data.list[i].createTime = createTime.replace('T', ' ')
							}
							this.chooseArr = res.data.data.list;
							this.total = res.data.data.rows;
						}
					})
					.catch(res => {
						console.log(res);
					});
			},
      selectType (tab) {
        this.type = Number(tab.index);
        console.log(typeof (this.type));
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
				this.rows = val
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
				this.page = val;
				this.getList();
      },
			// 删除当前题目
			deleteItem(e){
				let that = this;
				let id = e.currentTarget.dataset.id;
				console.log(id)
				this.$confirm('此操作将永久删除该题, 是否继续?', '提示', {
				  confirmButtonText: '确定',
					callback: action => {
						console.log(action)
						if(action == 'confirm'){
							let params = {
								id: id
							}
							this.$http
								.post("/Question/Delete",params)
								.then(res => {
									console.log(res);
									this.$message({
										type: 'info',
										message: `${ res.data.message }`
									});
									if(res.data.code == 200) {
										that.getList()
									}
								})
								.catch(res => {
									console.log(res);
								});
						}

          },
				  type: 'warning'
				}).then(() => {
				  this.$message({
				    type: 'success',
				    message: '删除成功!'
				  });
				}).catch(() => {
				  this.$message({
				    type: 'info',
				    message: '已取消删除'
				  });          
				});
			}
    },
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
            break
        }
        return name
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .header-wrapper {
    padding: 0 20px;
    background-color: #fff;
    .title {
      height: 64px;
      line-height: 64px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid rgb(229, 229, 229);
      .el-tabs {
        height: 100%;
      }
      /deep/ {
        .el-tabs__item {
          font-size: 16px;
        }
        .el-tabs__nav-wrap::after {
          background-color: #fff;
        }
      }
    }
    .select-wrapper {
      height: 64px;
      line-height: 64px;
      padding-bottom: 10px;
    }
  }
  .content-wrapper {
    // margin-top: 10px;
    padding: 0 20px 30px;
    font-size: 14px;
    color: #999;
    background-color: #fff;
    .title {
      height: 69px;
      line-height: 69px;
    }
  }
  .list-item {
    margin-top: 19px;
    border: 1px solid rgb(229, 229, 229);
    p {
      padding: 0 16px;
      line-height: 54px;
      span, i {
        display: inline-block;
      }
    }
    .question {
      color: #333;
      .el-checkbox {
        margin-right: 10px;
        width: 18px;
        height: 18px;
      }
    }
    .answer {
      color: #333;
      padding-left: 47px;
      span {
        margin-right: 20px;
      }
    }
    .optionInfo {
      i {
        vertical-align: middle;
        width: 1px;
        height: 14px;
        background-color: #999;
        margin: -2px 15px 0;
      }
    }
    .btnArea {
      color: #666;
      border-top: 1px solid rgb(229, 229, 229);
      span {
        margin-right: 20px;
        cursor: pointer;
      }
      i {
        margin-right:5px;
        color: #1ABC9C;
      }
    }
  }
	.paging {
		margin: 50px 0 0 0;
	}
</style>
