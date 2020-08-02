<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeSpecsId()">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestGoodsAdd,
  requestGoodsDetail,
  requestGoodsUpdate,
  requestGoodsList,
} from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
import E from "wangeditor";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      //分类的一级列表
      cateList: "cate/list",
      //规格列表
      specList: "spec/list",
    }),
  },
  data() {
    return {
      //编辑器对象
      editor: null,
      //二级分类的数组
      secondCateArr: [],
      //商品规格属性值
      attrsArr: [],
      //图片地址
      imageUrl: "",
      //提交给后端的数据
      form: {
        first_cateid: "",
        second_cateid: "",
        specsname: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
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
    if (this.cateList.length == 0) {
      this.requestCateList();
    }
    //获取所有的规格数据
    this.requestSpecList(true);
    //创建编辑器
    var editor = new E("#desc");
    editor.create();
  },
  methods: {
    ...mapActions({
      //获取分类列表
      requestCateList: "cate/requestList",
      //获取规格列表
      requestSpecList: "spec/requestList",
      //获取商品总数
      requestGoodsCount: "goods/requestTotal",
      //获取商品列表
      requestGoodsList: "spec/requestList",
    }),
    //修改了一级分类
    changeFirstCateId(bool) {
      let index = this.cateList.findIndex(
        (item) => (item.id = this.form.first_cateid)
      );
      this.secondCateArr = this.cateList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    //图片发生了修改
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //商品规格发生了修改
    changeSpecsId(bool) {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.attrsArr = this.specList[index].attrs;
      if (!bool) {
        this.form.specsattr = [];
      }
    },
    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
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
      //编辑器对象

      //二级分类的数组
      (this.secondCateArr = []),
        //商品规格属性值
        (this.attrsArr = []),
        //图片地址
        (this.imageUrl = ""),
        //提交给后端的数据
        (this.form = {
          first_cateid: "",
          second_cateid: "",
          specsname: "",
          goodsname: "",
          price: 0,
          market_price: 0,
          img: null,
          description: "",
          specsid: "",
          specsattr: [],
          isnew: 1,
          ishot: 1,
          status: 1,
        }),
        this.editor.txt.html("");
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
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      //获取添加数据的请求
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //弹框取消
          this.cancel();
          //清空
          this.empty();
          //重新获取列表数据
          this.requestGoodsList();
          //重新获取总的数量
          this.requestGoodsCount();
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      //ajax
      requestGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        this.imageUrl = this.$imgPre + this.form.img;
        //根据一级分类计算出二级分类的数组
        this.changeFirstCateId(true);
        //根据商品规格计算出二级分类的数组
        this.changeSpecsId(true);
        this.form.specsattr = JSON.parse(this.form.specsattr);
      });
    },
    update() {
     this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGoodsUpdate(this.form).then((res) => {
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
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>