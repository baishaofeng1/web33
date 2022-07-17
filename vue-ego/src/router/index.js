import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:"/",
    name:"Layout",
    redirect:"/product",//重定向
    component:Layout,
    meta:{
      requiresAuth:true   //需要登录才能进入，加上这个属性
    },
    children:[
      {
        path:"product",//children下面的path不用加‘/’
        name:"Product",
        component:() =>import("../views/product"),
        meta:{
          requiresAuth:true
        },
      } ,
      {
        path:"params",
        name:"params",
        component:() =>import("../views/params"),
        meta:{
          requiresAuth:true   
        },
      },
      {
        path:"content",
        name:"content",
        component:() =>import("../views/content"),
        meta:{
          requiresAuth:true
        },
      }
    ]
  },
  {
    path:"/user",
    name:"User",
    component:() =>import("../views/user"),
    meta:{
      requiresAuth:true
    },
  }
]

const router = new VueRouter({
  routes
})

export default router
