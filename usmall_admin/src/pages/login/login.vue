<template>
  <div class="bg">
    <div class="loginBox">
      <p>登录</p>
      <el-input placeholder="请输入内容" clearable> </el-input>
      <el-input placeholder="请输入密码" show-password></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    login(){
      this.$router.push("/index")
    }
  },
  mounted() {}
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
