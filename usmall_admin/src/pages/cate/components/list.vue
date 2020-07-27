<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="分类编号" width="80px"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="address" label="图片"></el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        }
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
</style>