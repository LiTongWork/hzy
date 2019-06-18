<template>
  <div class="container components-lists">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      class="all"
    >全选</el-checkbox>
    <div style="margin:15px 0;"></div>
    <div style="position:absolute;top:0;left:0;width:100%;height:50px;background:#5EBD9C;"></div>
    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
      <el-checkbox
        v-for="item in catalogs"
        :label="item.courseName"
        :key="item.index"
      >{{item.courseName}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "lists",
  data() {
    return {
      checkAll: false,
      checked: [],
      catalogs: [],
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checked = val ? this.catalogs : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.catalogs.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.catalogs.length;
    },
    getData() {
      let param = {};
      this.$http
        .post("/Course/CourseList", param)
        .then(res => {
        //   console.log(res.data.data);
          this.catalogs = res.data.data; //赋值课程
        })
        .catch(res => {
          console.log(res.data);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox {
  width: 100%;
  margin: 5px 2px;
  z-index: 100;
}
.container {
  width: 270px;
  height: auto;
  box-sizing: border-box;
  padding: 10px 20px;
}
</style>
