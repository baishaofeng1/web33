const base = {
    baseUrl:"http://localhost:3001", //根路径
    // baseUrl:"/api",
    login:"/api/login",             //登录
    register:"/api/register",        //注册
    selectTbItemAllByPage:"/api/backend/item/selectTbItemAllByPage",   //商品列表
    total:"/api/total",    //分页数据总条数
    search:"/api/search",    //商品模糊查询
    selectItemCategoryByParentId:"/api/backend/itemCategory/selectItemCategoryByParentId", //类目选择
    insertTbItem:"/api/backend/item/insertTbItem",   //商品添加
    deleteItemById:"/api/backend/item/deleteItemById",  //商品删除
    preUpdateItem:"/api/backend/item/preUpdateItem",    //预更新
    updateTbItem:"/api/backend/item/updateTbItem",            //修改商品
    selectItemParamAll:"/api/backend/itemParam/selectItemParamAll",   //规格参数查询
    paramsSearch:"/api/params/search",   //规格参数模糊查询
    insertItemParam:"/api/backend/itemParam/insertItemParam",   //规格参数添加
    paramsDelet:"/api/params/delete",    //规格参数删除
    contentTitle:"/api/content/title",     //内容分类-标题
    contentDelete:"/api/content/delete",     //内容分类-删除
    contentAdd:"/api/content/add",          //内容分类-添加
    contentList:"/api/content/list"          //内容分类-列表
}

export default base