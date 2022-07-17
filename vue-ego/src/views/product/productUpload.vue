<template>
<!-- 上传图片弹窗 -->
  <el-upload
    ref="upload"
    action="http://localhost:3001/api/upload"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="handleSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleSuccess(res, file) {
        this.$emit("onUpload",res) //子传父
    },
    submitUpload(){
        this.$refs.upload.submit();
    }
  },
};
</script>

<style>
</style>