<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="角色编号" width="80"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="350"></el-table-column>
      <el-table-column prop="address" label="状态">
        <el-button type="primary">启 用</el-button>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button type="primary">编 辑</el-button>
        <el-button type="danger">删 除</el-button>
      </el-table-column>
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
          
        },
        {
          date: "",
          name: "王小虎",
          
        },
        {
          date: "",
          name: "王小虎",
          
        },
        {
          date: "",
          name: "王小虎",
          
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
</style>