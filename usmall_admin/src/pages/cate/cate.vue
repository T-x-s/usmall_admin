<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <!-- 弹框 -->
      <v-add :info="info" ref="add"></v-add>
      <!-- 列表 -->
      <v-list></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add"
import vList from "./components/list"
export default {
  components: {
      vAdd,
      vList
  },
  data() {
    return {
        //传递给子组件得信息
        info:{
            //弹框出现的状态
            show:false,
        }
    };
  },
  methods: {
      add(){
          this.info.show = true;
      }
  },
  mounted() {},
};
</script>
<style scoped>
</style>