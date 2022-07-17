export default {
    namespaced:true,  //作用域
    state:{
        username:"",
        token:""
    },
    mutations:{
        updateUsername(state,username){
            state.username = username
        },
        clearUsername(state){
            state.username = ""
        },
        updateToken(state,token){
            state.token = token
        },
        clearToken(state){
            state.token = ""
        }
    }
}