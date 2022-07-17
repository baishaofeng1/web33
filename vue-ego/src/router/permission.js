import router from "./index"
import store from "../store"

//路由权限：只有登录了才可以去其他页面,否则在的页面一定是登录页面
router.beforeEach((to,from,next) =>{
    if(to.matched.some(record => record.meta.requiresAuth)){
        //需要判断用户是否需要登录
        //用户是否已登录
        const token = store.state.loginModule.token;
        return token ? next() : next({ path:"/login" })
    }else{
        next();
    }
})