<template>
<!-- 添加商品弹窗 -->
  <div>
    <el-dialog
      title="添加商品"
      :visible.sync="dialogAddVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form label-width="70px" :model="addForm" ref="addForm">
        <el-form-item label="商品类目">
            <el-button class="category" type="primary" @click="dialogCategoryHandle">类目选择</el-button>
            <span class="category">{{ treeData.name }}</span>
            <el-dialog
                title="类目选择"
                :visible.sync="dialogCategoryVisible"
                width="50%"
                append-to-body
            >
                <ProductTree @onTree="getTreeData"/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogCategoryVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogCategoryVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input v-model="addForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="addForm.num"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
            <el-button class="category" type="primary" @click="dialogUploadHandle">上传图片</el-button>
            <img class="upload-img" :src="uploadData.url" alt="">
            <el-dialog
                title="上传图片"
                :visible.sync="dialogUploadVisible"
                width="50%"
                append-to-body
            >
                <ProductUpload @onUpload="getUploadData"/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogUploadVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogUploadVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述">
            <!-- <BaiduUEditor /> -->
            <WangEditor @onEditor="getEditorData"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductTree from "./productTree.vue"
import ProductUpload from "./productUpload.vue"
import BaiduUEditor from "./BaiduUEditor.vue"
import WangEditor from "./wangEditor.vue"
import api from "../../api"

export default {
  data() {
    return {
      dialogAddVisible: false,
      dialogCategoryVisible:false,
      dialogUploadVisible:false,
      addForm: {},
      treeData:{},
      uploadData:{},
      editorData:""
    };
  },
  components:{
      ProductTree,
      ProductUpload,
      BaiduUEditor,
      WangEditor
  },
  mounted() {
    this.$bus.$on("onAdd", (flag) => {
      this.dialogAddVisible = flag;  //点击添加按钮，弹窗弹出
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    dialogCategoryHandle() {
      this.dialogCategoryVisible = true;
    },
    dialogUploadHandle(){
        this.dialogUploadVisible = true;
    },
    getTreeData(data){
        this.treeData = data    //把要保存的数据存在data里面
    },
    //添加按钮
    addHandle(){
        api.insertTbItem({
            title:this.addForm.name,
            cid:this.treeData.cid,
            sellPoint:this.addForm.sellPoint,
            price:this.addForm.price,
            num:this.addForm.num,
            desc:this.editorData,
            image:this.uploadData.url
        }).then(res =>{
            console.log(res.data);
            if(res.data.status === 200){
                this.dialogAddVisible = false;
                this.$bus.$emit("onRefresh",true)
            }
        }).catch(error =>{
            console.log(error);
        })
    },
    getUploadData(data){
      console.log(data.url);
        if(data.url){
            data.url = data.url.replace("upload","http://localhost:3001")
        }
        this.uploadData = data;
    },
    getEditorData(data){
        this.editorData = data;
    }
  },
};
</script>

<style scoped>
.category {
  float: left;
}

.upload-img{
    width: 300px;
    float: left;
    margin-left: 10px;
}
</style>