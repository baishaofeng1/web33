export default{
    namespaced:true,
    state:{
        search:""
    },
    mutations:{
        setSearch(state,search){
            state.search = search
        }
    }
}