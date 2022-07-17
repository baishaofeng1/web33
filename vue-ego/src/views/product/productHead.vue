<template>
<!-- 搜索框 -->
  <div class="head">
      <!-- @submit.native.prevent组织form表单默认事件 -->
      <el-form ref="searchForm" :model="search" @submit.native.prevent>
          <el-form-item>
              <el-input v-model="search.content" @keyup.enter.native="onSubmitSearch"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmitSearch">{{ $t("message.search") }}</el-button>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="addProductHandle">{{ $t("message.add") }}</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
    data(){
        return{
            search:{}
        }
    },
    methods:{
        ...mapMutations("productModule",["setSearch"]),
        onSubmitSearch(){
            this.setSearch(this.search.content)
        },
        addProductHandle(){
            this.$bus.$emit("onAdd",true)
        }
    }
}
</script>

<style scoped lang="less">

.el-form {
    overflow: hidden;
    clear: both;
    display: flex;
    width: 100%;
    display: flex;
    .el-form-item {
        float: left;
        margin-right: 10px;
        // flex: 1;
        .el-input {
            .el-input__inner{
                flex: 1;
            }
            width: 1125px;
        }
    }
}
 
.head {
    margin-top: 20px;
    width: 100%;
}

</style>