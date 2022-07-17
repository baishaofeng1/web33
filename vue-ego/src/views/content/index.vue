<template>
  <div>
    <div class="tag-container">
      <el-tag
      class="tag"
      :key="index"
      v-for="(tag, index) in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="clickHandle(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm" 
    >
    </el-input>
    <el-button v-else class="button-new-tag tag" size="small" @click="showInput"
      >+ 添加广告</el-button
    >
    </div>

    <div class="list">
      <el-table :data="contentList" style="width: 100%">
        <el-table-column show-overflow-tooltip prop="name" label="名字"></el-table-column>
        <el-table-column show-overflow-tooltip prop="url" label="地址"></el-table-column>
        <el-table-column show-overflow-tooltip prop="image" label="图片"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      contentList:[]
    };
  },
  methods: {
    handleClose(tag) {
      api.contentDelete({
          pid:tag.pid,
        })
        .then((res) => {
          if(res.data.status === 200){
            this.http()
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickHandle(tag){
      api.contentList({
        pid:tag.pid
      }).then(res =>{
        if(res.data.status === 200){
          this.contentList = res.data.result
        }else{
          this.contentList = []
        }
      }).catch(error =>{
        console.log(error);
      })
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      api.contentAdd({
        name:inputValue
      }).then(res =>{
        if(res.data.status === 200){
          this.inputVisible = false;
          this.inputValue = "";
          this.http();
        }
      })
    },

    http() {
      api.contentTitle()
        .then((res) => {
          if (res.data.status === 200) {
            this.dynamicTags = res.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.http()
  },
};
</script>

<style scoped>
.tag {
  float: left;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.tag-container{
  overflow: hidden;
  clear: both;
}
.list{
  margin-top: 10px;
}
</style>