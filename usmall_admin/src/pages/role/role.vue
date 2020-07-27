<template>
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加弹框 -->
    <v-add :info="info"></v-add>
    <!-- 列表 -->
    <v-list></v-list>
</div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
components:{
    vList,
    vAdd
},
data(){
return {
    info:{
        show:true,
        title:"添加角色"
    }
}
},
methods:{
    //点击了添加按钮
    add(){
        this.info.show = true;
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>