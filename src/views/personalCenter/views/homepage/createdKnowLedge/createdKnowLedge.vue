<template>
  <div class="createdCourse">
    <div class="header-wrapper">
      <div class="title">
        创建的知识点
        <!-- <el-button type="primary" size="small" style="float:right;margin:20px 0;" @click="addFormVisible = true">添加知识点</el-button> -->
        <el-select v-model="cource" placeholder="选择课程" @change="changeCource" style="float:right;">
          <el-option
            v-for="(item,index) in courceOptions"
            :key="index"
            :label="item.courseName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="list">
        <el-tree
          :data="data"
          node-key="id"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          @node-click="handClick"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
              <!-- &nbsp;&nbsp;&nbsp;
              <el-button type="text" size="mini" @click="() => move(node, data)">上移</el-button>
              <el-button type="text" size="mini" @click="() => move(node, data)">下移</el-button> -->
            </span>
          </span>
        </el-tree>
      </div>
      <!-- <div class="paging">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-sizes="[10, 20]"
          :page-size="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
let id = 1000;
export default {
  name: "createdKnowLedge",
  data() {
    return {
      courceOptions: [],
      cource: "",
      total: 0,
      rows: 10,
      page: 1,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      knowName: ""
    };
  },
  methods: {
      //保存 知识点目录格式
      saveKnowJson(data){
          let param = {
              id: this.cource,
              knowJson : JSON.stringify(data)
          }
        //   console.log(param)
          this.$http
            .post("/Course/SaveKnowJson", param)
            .then(res => {
                console.log(res.data.data)

            })
      },
    append(data) {
        // console.log(data);
      this.$prompt("请输入知识点名称", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          //   console.log({ value }.value);
          //   return false;
          let param = {
            courseId: data.courseId,
            knowName: { value }.value,
            parentId: data.id,
            sort: data.sort,

          };
        //   console.log(111111111111,param)
          this.$http
            .post("/Course/KnowLedgeInsert", param)
            .then(res => {
              //   console.log(res.data.data); //知识点ID
              const newChild = {
                id: res.data.data,
                label: { value }.value,
                courseId: this.cource,
                parentId:  data.id,
                sort: data.sort,
                children: []
              };
              if (!data.children) {
                this.$set(data, "children", []);
              }
              data.children.push(newChild);
            //   console.log(111,this.data)
                this.saveKnowJson(this.data)
            })
            .catch(res => {
              console.log(res);
            });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    remove(node, data) {
      // console.log(node, data)
      // return false;
      this.$confirm('删除后不可恢复，是否确定？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let param = {
                id: data.id
             };
            this.$http
             .post("/Course/KnowLedgeDelete", param)
             .then(res => {
                  console.log(res.data.data);
                  const parent = node.parent;
                  const children = parent.data.children || parent.data;
                  const index = children.findIndex(d => d.id === data.id);
                  children.splice(index, 1);
                //   console.log(this.data);return false;
                  this.saveKnowJson(this.data)
                })
             .catch(res => {
               console.log(res);
             });
        }).catch(() => {
          console.log('取消')       
        });

    },
    handleDragStart(node, ev) {
      // console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
    //   console.log("tree drop: ", draggingNode, dropNode.label, dropType, ev);
    // console.log(this.data)
    this.saveKnowJson(this.data)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    //点击单行
    handClick(val) {
        // console.log(val)
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.rows = val;
      //   this.getKnowLedgeJson()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      //   this.getKnowLedgeJson()
    },

    //切换课程
    changeCource() {
      this.getKnowLedgeJson(this.cource)
    //   this.getKnowLedgeList(this.cource)
    },
    //获取课程id
    getCourceId() {
      let that = this;
      let param = {};
      this.$http
        .post("/Course/CourseList", param)
        .then(res => {
          // console.log(res.data.data)
          this.courceOptions = res.data.data;
          this.cource = res.data.data[0].id;
          that.getKnowLedgeJson(res.data.data[0].id)
        //   that.getKnowLedgeList(res.data.data[0].id)
        })
        .catch(res => {
          console.log(res);
        });
    },
    
    //获取知识点列表结构
    getKnowLedgeJson(id){
        let param = {
            id: id
        };
        this.$http
        .post("/Course/Single", param)
        .then(res => {
            // console.log(JSON.parse( res.data.data.knowJson) )
            this.data = JSON.parse( res.data.data.knowJson)
            // console.log(111111,this.data)
            if(!res.data.data.knowJson){
              this.getKnowLedgeList(id)
            }
        })
    },
    //获取知识点列表
    getKnowLedgeList(id) {
      let param = {
        courseId: id
      };
      this.$http
        .post("/Course/KnowLedgeList", param)
        .then(res => {
            // console.log(21212121,res.data.data);
          this.data = res.data.data.map(function(a) {
            return {
              id: a.id,
              label: a.knowName,
              parentId: a.parentId,
              sort: a.sort,
              courseId: a.courseId
            };
          });
        })

    },
  },
  mounted() {
    this.getCourceId();
  },
  created(){
    localStorage.setItem('index', '1-3')
  }

};
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
.custom-tree-node {
  span:nth-child(2) {
    margin: 0 0 0 200px;
    & > button {
      display: none;
    }
  }
  width: 100%;
  &:hover {
    span:nth-child(2) > button {
      display: inline-block;
    }
  }
}
</style>
