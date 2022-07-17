<template>
<!-- 分页 -->
  <div class="pagination"> 
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import api from "../../api"

export default {
    data(){
        return{
            total:0
        }
    },
    mounted(){
        api.total().then(res =>{
            if(res.data.status === 200){
                this.total = res.data.result[0]["count(*)"]
            }
        }).catch(error =>{
            console.log(error);
        })
    },
    methods:{
        ...mapMutations("productModule",["setPage"]),
        handleCurrentChange(val){
            this.$bus.$emit("onPage",val) //发送数据
            this.setPage(val);
        }
    }
};
</script>

<style scoped>
.pagination {
  margin-top: 30px;
}
</style>