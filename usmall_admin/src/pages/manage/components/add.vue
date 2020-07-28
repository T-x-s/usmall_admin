<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
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
import {
  requestManageAdd,
  requestManageDetail,
  requestManageUpdate,
  requestManageList,
} from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      //提交给后端的数据
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {
    //如果之前menu的list没有请求，就发请求，请求过了，就不发了
    if (this.roleList.length === 0) {
      this.requestRoleList();
      // console.log(1);
    }
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestTotal: "manage/requestTotal",
    }),
    //取消
    cancel() {
      this.info.show = false;
      //清空权限2
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //清空
    empty() {
      this.form = {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加
    add() {
      //获取添加角色的请求
      requestManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹框取消
          this.cancel();
          //清空
          this.empty();
          //重新获取列表数据
          this.requestManageList();
          //重新获取总的数量
          this.requestTotal();
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      //ajax
      requestManageDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        // this.form.uid = id;
        this.form.password = "";
      });
    },
    update() {
      requestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹框取消
          this.cancel();
          //清空
          this.empty();
          //重新获取列表数据
          this.requestManageList();
          successAlert("修改成功");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>