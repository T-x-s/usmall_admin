//发起请求
import {requestSpecList,requestSpecCount} from "../../util/request"
const state = {
    //列表数据
    list:[],
    // 一页的数量
    size:2,
    //数据的总数量
    total:0,
    //当前的页码
    page:1
};
const mutations = {
    //修改list
    changeList(state,arr){
        //商品属性数组解开
        console.log(arr)
        arr.forEach(i => {
            i.attrs = JSON.parse(i.attrs)
        });
        state.list = arr;
    },
    changeTotal(state,num){
        state.total = num;
    },
    changePage(state,page){
        state.page=page
    }
};
const actions={
    //获取列表数据
    requestList(context){
        const params={ 
            page:context.state.page,
            size:context.state.size
        }
        requestSpecList(params).then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
    //获取总的数据
    requestTotal(context){
        requestSpecCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    //页面修改页码
    changePage(context,page){
        context.commit("changePage",page)
    }
};
const getters={
    //修改list
    list(state){
        return state.list
    },
    //修改总数
    total(state){
        return state.total
    },
    //修改当前页码
    size(state){
        return state.size
    }
};
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}