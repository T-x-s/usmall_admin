import axios from "axios";
import qs from "qs";

//响应拦截
axios.interceptors.response.use(res => {
  console.group("本次路径：" + res.config.url);
  console.log(res);
  return res;
});

const baseurl = "/api";

//菜单添加
export const requestMenuAdd = params => {
  return axios({
    url: baseurl + "/api/menuadd",
    method: "post",
    data: qs.stringify(params)
  });
};
//菜单列表
export const requestMenuList = params => {
  return axios({
    url: baseurl + "/api/menuList",
    method: "get",
    params: params
  });
};
//菜单某一条数据的方法
export const requestMenuDetail = params => {
  return axios({
    url: baseurl + "/api/menuinfo",
    method: "get",
    params
  });
};
//菜单修改
export const requestMenuUpdate = params => {
  return axios({
    url: baseurl + "/api/menuedit",
    method: "post",
    data: qs.stringify(params)
  });
};
//菜单删除
export const requestMenuDelete = params => {
  return axios({
    url: baseurl + "/api/menudelete",
    method: "post",
    data: qs.stringify(params)
  });
};

//角色添加
export const requestRoleAdd = params =>
  axios({
    url: baseurl + "/api/roleadd",
    method: "post",
    data: qs.stringify(params)
  });
//角色列表
export const requestRoleList =() => axios({
    url: baseurl + "/api/roleList",
    method: "get",
})

//角色获取一条
export const requestRoleDetail =(params)=>axios({
    url: baseurl + "/api/roleinfo",
    method: "get",
    params
})

//角色修改
export const requestRoleUpdate =(params)=>axios({
    url: baseurl + "/api/roleedit",
    method: "post",
    data: qs.stringify(params)
})
//角色删除
export const requestRoleDelte =()=>axios({
    url: baseurl + "/api/roledelete",
    method: "post",
    data: qs.stringify(params)
})
