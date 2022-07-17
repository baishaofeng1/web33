<template>
<!-- 百度富文本 -->
  <div>
      <p>{{ msg }}</p>
      <vue-ueditor-wrap v-model="msg" :config="editorConfig"></vue-ueditor-wrap>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    data () {
        return {
        msg: '<h2>Hello World!</h2>',
        editorConfig:{
            // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
            UEDITOR_HOME_URL: "/UEditor/",
            // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
            serverUrl: "",
            autoHeightEnabled:true,
            initialFrameHeight:240,
            initialFrameWidth:"100%"
        }
        }
    },
    components: {
        VueUeditorWrap,
    }
}
</script>

<style>
</style>