<template>
  <div>
      <div class="banner">易购商城后台系统</div>
      <el-card class="box-card">
        <el-tabs stretch v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="登录" name="login">
             <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px">
               <el-form-item label="用户名">
                 <el-input type="text" v-model="loginForm.username"></el-input>
               </el-form-item>
               <el-form-item label="密 码">
                 <el-input type="password" v-model="loginForm.password"></el-input>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
               </el-form-item>
             </el-form>
           </el-tab-pane>
           <el-tab-pane label="注册" name="register">
             <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="registerForm.username"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="registerForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model.number="registerForm.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model.number="registerForm.checkPassword"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitregisterForm('registerForm')">提交</el-button>
              </el-form-item>
            </el-form>
           </el-tab-pane>
        </el-tabs>
      </el-card>
  </div>
</template>

<script>
import api from "../../api"
import { mapMutations } from "vuex"
import jwtDecode from "jwt-decode"

export default {
  data(){
    var validateUsername = (rule,value,callback) =>{
      if(value === ""){
        callback(new Error("请输入用户名"))
      }else if(value.length < 4 || value.length > 10){
        callback(new Error("请正确输入用户名"))
      }
      callback();
    }

    var validateEmail = (rule,value,callback) =>{
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(value === ""){
        callback(new Error("邮箱不能为空"))
      }else if(!reg.test(value)){
        callback(new Error("邮箱不符合规则"))
      }
      callback();
    }

    var validatePassword = (rule,value,callback) =>{
      if(value === ""){
        callback(new Error("密码不能为空"))
      }
      callback();
    }

    var validateCheckPassword = (rule,value,callback) =>{
      if(value === ""){
        callback(new Error("确认密码不能为空"))
      }else if(value !== this.registerForm.password){
        callback(new Error("两次密码不一致"))
      }
      callback();
    }

    return{
      activeName:"login",
      loginForm:{
        username:"",
        password:""
      },
      registerForm:{
        username:"",
        password:"",
        email:"",
        checkPassword:""
      },
      rules:{
        //使用用户名验证，失去焦点触发
        username:[{ validator:validateUsername,trigger:"blur" }],
        email:[{ validator:validateEmail,trigger:"blur" }],
        password:[{ validator:validatePassword,trigger:"blur" }],
        checkPassword:[{ validator:validateCheckPassword,trigger:"blur" }]
      }
    }
  },
  methods:{
    ...mapMutations("loginModule",["updateUsername","updateToken"]),
    handleClick(tab, event){
      console.log(tab, event);
    },
    submitLoginForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            //表单校验通过
            api.login({
              username:this.loginForm.username,
              password:this.loginForm.password
            }).then(res =>{
              if(res.data.status === 200){
                // this.updateUsername(res.data.result[0].username);
                this.updateToken(res.data.token) //存入vuex
                this.updateUsername(jwtDecode(res.data.token).username)
                var currentObj = {
                  token:res.data.token,
                  username:jwtDecode(res.data.token).username
                }
                localStorage.setItem("ego",JSON.stringify(currentObj));//存入本地
                this.$router.push("/");
              }
            }).catch(error =>{
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    /**
     * 注册
     */
    submitregisterForm(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
            api.register({
              username:this.registerForm.username,
              password:this.registerForm.password,
              email:this.registerForm.email
            }).then(res =>{
              console.log(res.data);
              //ElementUI组件:Message 消息提示
              if(res.data.status === 200){
                this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
                });
              }else{
                this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
                });
              }
            }).catch(error =>{
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
  },
};
</script>

<style scoped>

.banner{
  font-size: 30px;
  margin-top: 100px;
}
.box-card{
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
}

</style>

