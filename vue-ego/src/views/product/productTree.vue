<template>
<!-- 树形控件 -->
  <div>
    <el-tree :props="props" :load="loadNode" lazy  @node-click="handleNodeClick"> </el-tree>
  </div>
</template>

<script>
import api from "../../api"
export default {
    data(){
        return{
            props:{
                label:"name"
            }
        }
    },
    methods:{
        loadNode(node,resolve){
            //第一次加载
            if(node.level === 0){
                api.selectItemCategoryByParentId().then(res =>{
                    if(res.data.status === 200){
                        return resolve(res.data.result)
                    }
                    return resolve([])
                }).catch((error) =>{
                    console.log(error);
                })
            }
            //非第一次加载
            if(node.level >= 1){
                api.selectItemCategoryByParentId({
                    id:node.data.cid,
                }).then((res) =>{
                    if(res.data.status === 200){
                        return resolve(res.data.result)
                    }
                    return resolve([])
                }).catch((error) =>{
                    console.log(error);
                })
            }
        },
        handleNodeClick(data){
            this.$emit("onTree",data) //点击获取数据回传给父级
        }
    }
};
</script>

<style>
</style>