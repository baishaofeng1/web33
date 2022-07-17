export default{
    namespaced:true,
    state:{
        page:1,
        search:""
    },
    mutations:{
        setPage(state,page){
            state.page = page;
        },
        setSearch(state,search){
            state.search = search
        }
    }
}