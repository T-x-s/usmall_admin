<template>
  <div class="bg">
    <div class="loginBox">
      <p>登录</p>
      <el-input v-model="user.username" placeholder="请输入内容" clearable></el-input>
      <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
import { requestLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    //登录
    login() {
      // this.$router.push("/")
      requestLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          //登录成功
          successAlert("登录成功");
          //vuex保存了用户信息
          this.changeUser(res.data.list);
          //跳转页面
          this.$router.push("/home");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563544, #2f3d60);
  position: relative;
}
.loginBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background-color: white;
  border-radius: 5px;
}
.loginBox p {
  height: 81px;
  font: 18px/81px "微软雅黑";
  text-align: center;
  font-weight: 900;
}
.loginBox .el-input {
  margin-bottom: 22px;
  width: 320px;
  margin-left: 80px;
}
.loginBox .el-button {
  width: 320px;
  margin-left: 80px;
  text-align: center;
  font: 10px/38px "微软雅黑";
  color: white;
  padding: 0;
}
</style>
