<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" label-width="80px">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addArr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delArr(index)">删除</el-button>
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
  requestSpecAdd,
  requestSpecDetail,
  requestSpecUpdate,
  requestSpecList,
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
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [
        {
          value: "",
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
    //取消
    cancel() {
      this.empty();
      this.info.show = false;
      //清空权限2
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //清空
    empty() {
      (this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      }),
        (this.attrArr = {
          value: "",
        });
    },
    //添加规格属性
    addArr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除规格属性
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    //添加
    add() {
      //判断属性不为空
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      //将属性组合成数组并转成字符串
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      //获取添加数据的请求
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹框取消
          this.cancel();
          //清空
          this.empty();
          //重新获取列表数据
          this.requestList();
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
      requestSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        // console.log(this.attrArr)
        this.attrArr = JSON.parse(res.data.list[0].attrs).map(item=>({
            value:item
            //return形式不加()
            //   return{
            //     value:item
            // }
        }))
      });
    },
    update() {
       //判断属性不为空
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      //将属性组合成数组并转成字符串
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹框取消
          this.cancel();
          //清空
          this.empty();
          //重新获取列表数据
          this.requestList();
          successAlert("修改成功");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.el-input {
  flex: 1;
}

.el-button {
  width: auto;
}
</style>