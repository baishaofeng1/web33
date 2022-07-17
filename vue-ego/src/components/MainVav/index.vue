<template>
  <div>
    <div class="header">
      <div class="login">
        <el-dropdown class="lang" @command="handleCommand">
          <span class="el-dropdown-link">
            语言切换<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">英文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-badge :value="12" class="item">
          <i class="el-icon-message-solid"></i>
        </el-badge>
        <span class="user-name">{{ username }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <!-- tag：router-link默认被渲染成a标签，我们可以选择渲染其他标签，使用tag -->
              <router-link to="/user" tag="span">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item><div @click="logout">退出</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/product">
        <i class="el-icon-location"></i>
        <span>{{ $t("message.project") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-menu"></i>
        <span>{{ $t("message.params") }}</span>
      </el-menu-item>
      <el-menu-item index="/content">
        <i class="el-icon-document"></i>
        <span>{{ $t("message.content") }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentIndex: "/product",
    };
  },
  mounted(){
    this.currentIndex = this.$route.path
  },
  computed: {
    ...mapState("loginModule", ["username"]),
  },
  methods: {
    ...mapMutations("loginModule", ["clearToken"]),
    logout() {
      //这个方法点击后清除vuex和本地的token，并跳转到登录页面
      /**
       * 1.存储在Vuex
       * 2.存储在本地localStroage
       */
      this.clearToken();
      localStorage.removeItem("ego");
      this.$router.push("/login");
    },
    handleCommand(command){
      this.$i18n.locale = command;
    }
  },
};
</script>

<style scoped>

.lang {
  margin-right: 10px;
}
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  box-shadow: 0px 0px 5px 1px #999;
}

.header .user-name {
  color: #fff;
  margin-right: 10px;
  font-size: 15px;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  background: #999;
}

.header .login {
  height: 50px;
  float: right;
  margin-right: 20px;
}

.header .login .item {
  height: 25px;
  margin-right: 30px;
}

.header .login .item i {
  display: block;
  font-size: 25px;
}

.el-menu-vertical-demo {
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  text-align: left;
  z-index: 1000;
}
</style>