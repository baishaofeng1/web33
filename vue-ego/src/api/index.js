import axios from "../utils/request"
import base from "./base"

const api = {
    /**
     * 登录接口
     */
    login(params){
        return axios.post(base.baseUrl + base.login,params)
    },
    /**
     * 注册接口
     */
    register(params){
        return axios.post(base.baseUrl + base.register,params)
    },
    /**
     * 商品列表
     */
    selectTbItemAllByPage(params){
        return axios.get(base.baseUrl + base.selectTbItemAllByPage,{
            params
        })
    },
    /**
     * 分页数据总条数
     */
    total(){
        return axios.get(base.baseUrl + base.total)
    },
    /**
     * 商品模糊查询
     */
    search(params){
        return axios.get(base.baseUrl + base.search,{
            params
        })
    },
    /**
     * 类目请求
     */
    selectItemCategoryByParentId(params){
         return axios.get(base.baseUrl + base.selectItemCategoryByParentId,{
             params
         })
    },
    /**
    * 商品添加
    */
    insertTbItem(params){
        return axios.get(base.baseUrl + base.insertTbItem,{
            params
        })
    },
    /**
     * 商品删除
     */
    deleteItemById(params){
        return axios.get(base.baseUrl + base.deleteItemById,{
            params
        })
    },
    /**
     * 编辑预更新
     */
    preUpdateItem(params){
        return axios.get(base.baseUrl + base.preUpdateItem,{
            params
        })
    },
    /**
     * 修改商品
     */
    updateTbItem(params){
        return axios.get(base.baseUrl + base.updateTbItem,{
            params
        })
    },
    /**
     * 规格参数读取
     */
    selectItemParamAll(params){
        return axios.get(base.baseUrl + base.selectItemParamAll,{
            params
        })
    },
    /**
     * 规格参数模糊查询
     */
    paramsSearch(params){
        return axios.get(base.baseUrl + base.paramsSearch,{
            params
        })
    },
    /**
     * 规格参数添加
     */
    insertItemParam(params){
        return axios.get(base.baseUrl + base.insertItemParam,{
            params
        })
    },
    /**
     * 规格参数删除
     */
    paramsDelet(params){
         return axios.get(base.baseUrl + base.paramsDelet,{
             params
         })
     },
    /**
     * 内容分类-标题
     */
    contentTitle(){
         return axios.get(base.baseUrl + base.contentTitle)
    },
    /**
     * 内容分类-删除
     */
    contentDelete(params){
        return axios.get(base.baseUrl + base.contentDelete,{
            params
        })
    },
    /**
     * 内容分类-添加
     */
    contentAdd(params){
        return axios.get(base.baseUrl + base.contentAdd,{
            params
        })
    },
    /**
     * 内容分类-列表
     */
    contentList(params){
        return axios.get(base.baseUrl + base.contentList,{
            params
        })
    }

}

export default api;