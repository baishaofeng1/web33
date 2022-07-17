<template>
<!-- 表格 -->
<div>
  <el-table :data="tableData">
    <el-table-column
      prop="id"
      label="商品ID"
      show-overflow-tooltip
      width="80"
    ></el-table-column>
    <el-table-column
      prop="title"
      label="商品名称"
      show-overflow-tooltip
      width="150"
    ></el-table-column>
    <el-table-column
      prop="image"
      label="商品图片"
      show-overflow-tooltip
      width="100"
    ></el-table-column>
    <el-table-column
      prop="sellPoint"
      label="商品卖点"
      show-overflow-tooltip
      width="200"
    ></el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      show-overflow-tooltip
      width="80"
    ></el-table-column>
    <el-table-column
      prop="num"
      label="商品数量"
      show-overflow-tooltip
      width="80"
    ></el-table-column>
    <el-table-column 
      prop="descs" 
      label="商品描述" 
      show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-html="scope.row.descs"></div>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <productEditor :flag="flag"/>
</div>
</template>

<script>
import api from "../../api";
import { mapState } from "vuex"
import productEditor from "./productEditor.vue"

export default {
  data() {
    return {
      tableData: [],
      flag:false
    };
  },
  components:{
    productEditor
  },
  computed:{
      ...mapState("productModule",["page","search"]),
      pageChange(){
          return this.page;
      },
      searchChange(){
        return this.search;
      }
  },
  watch:{//监听computed里面pageChange事件变化
      pageChange(newVal){
          this.http(newVal);
      },
      searchChange(newVal){
        //模糊搜索
        api.search({
          search:newVal
        }).then(res =>{
          if(res.data.status === 200){
            this.tableData = res.data.result
          }
        }).catch(error =>{
          console.log(error);
        })
      }
  },
  mounted() {
      this.http(1);
      this.$bus.$on("onPage",(val) =>{
        //   this.http(val);
      });
      this.$bus.$on("onRefresh",flag =>{
        this.http(1)
      })
  },
  methods: {
    http(page) {
      api.selectTbItemAllByPage({page}).then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //编辑
    handleEdit(index,row){
      //有问题：点一次以后就不会传flag值了
      // this.flag = true;  //父传子，在子组件中watch监听
      this.$bus.$emit("onShowEditor",row)
    },
    /**
     * 删除功能
     */
    handleDelete(index,row){
      console.log(index,row);
      api.deleteItemById({
        id:row.id,
      }).then(res =>{
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(res.data.status === 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //视图重绘
          this.http(1);
          }else{
            this.$message({
            type: 'error',
            message: '删除失败!'
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }).catch(error =>{
        console.log(error);
      })
    }
  },
};
</script>

<style>
</style>