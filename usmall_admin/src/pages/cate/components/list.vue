<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="80"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="address" label="图片">
       <template slot-scope="scope">
         <img :src="$imgPre+scope.row.img" alt="">
       </template>
      </el-table-column>
      <!-- <el-table-column prop="url" label="菜单地址"></el-table-column> -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="primary" v-if="scope.row.status==2">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="dele(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestCateDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "cate/requestList",
    }),
    //点击了编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    dele(id) {
      requestCateDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功！");
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>