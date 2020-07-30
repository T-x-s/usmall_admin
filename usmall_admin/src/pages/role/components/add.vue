<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px" >
          <!-- :default-checked-keys="[5]" -->
          <el-tree :data="menuList" show-checkbox node-key="id" :default-checked-keys="defaultKey" :props="defaultProps" ref="tree"></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestRoleAdd, requestRoleDetail,requestRoleUpdate,requestRoleList } from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      //提交给后端的数据
      form: {
        rolename: "",
        menu: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      defaultKey: [],
    };
  },
  mounted() {
    //如果之前menu的list没有请求，就发请求，请求过了，就不发了
    if (this.menuList.length === 0) {
      this.requestMenuList();
      // console.log(1);
    }
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestList",
      requestRoleList: "role/requestList"
    }),
    //取消
    cancel() {
      this.empty();
      this.info.show = false;
      //清空权限2
      if(!this.info.isAdd){
        this.empty();
      }
    },
    //清空
    empty() {
      this.form = {
        rolename: "",
        menu: "",
        status: 1,
      };
      //将树形结构的数据，选中的key值置空
      this.$refs.tree.setCheckedKeys([]);
    },
    //添加
    add() {
      //获取tree的key赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      //获取添加角色的请求
      requestRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹框取消
          this.cancel();
          //清空
          this.empty();
          //重新获取列表数据
          this.requestRoleList();
          successAlert(res.data.list);
        } else {
          warningAlert(res.data.msg);
        }
      });

    },
    //获取一条数据
    getDetail(id) {
      //ajax
      requestRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(res.data.list.menus);
      });
    },
    update(){
      //获取tree的key赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleUpdate(this.form).then(res=>{
        if (res.data.code == 200) {
          //弹框取消
          this.cancel();
          //清空
          this.empty();
          //重新获取列表数据
          this.requestRoleList();
          successAlert("修改成功");
        } else {
          warningAlert(res.data.msg);
        }
      })
    }
  },
};
</script>
<style scoped>
</style>