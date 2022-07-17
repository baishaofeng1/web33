const express = require("express");
const router = express.Router();
const sqlFn = require("./mysqlConnect");
const jwt = require("jsonwebtoken")
const jwtSecret = require("./jwtSecret")
const url = require("url")
const fs = require("fs")
const multer = require("multer")

//登录接口
router.post("/login",(req,res) =>{
    //接受username和password参数
    const username = req.body.username;
    const password = req.body.password;
    //查询sql语句
    const sql = "select * from user where username=? and password=?";
    const arr = [username,password];
    sqlFn(sql,arr,result =>{
        if(result.length > 0){

            const token = jwt.sign({
                id:result[0].id,
                username:result[0].username
            },jwtSecret.secret)

            res.send({
                status:200,
                token,
                msg:"认证成功"
            })
        }else{
            res.send({
                status:400,
                msg:"用户名密码错误"
            })
        }
    })
})

//注册接口
router.post("/register",(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const arr = [username,password,email];
    var sql = "insert into user values(null,?,?,?)"
    sqlFn(sql,arr,result =>{
        //影响行数
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:"注册成功"
            })
        }else{
            res.send({
                status:400,
                msg:"注册失败"
            })
        }
    })
})

/**
 * 获取商品列表
 */
router.get("/backend/item/selectTbItemAllByPage",(req,res) =>{
    //接口参数：page
    var page = url.parse(req.url,true).query.page || 1;
    const sql = "select * from project order by id desc limit 10 offset "+(page - 1) * 10;
    sqlFn(sql,null,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"读取数据失败"
            })
        }
    })
})

/**
 * 返回分页数据总条数
 */
router.get("/total",(req,res) =>{
    const sql = "select count(*) from project where id";
    sqlFn(sql,null,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"数据不存在"
            })
        }
    })
})

/**
 * 商品模糊搜索
 */
router.get("/search",(req,res) =>{
    const search = url.parse(req.url,true).query.search;
    const sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'";
    sqlFn(sql,null,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'暂无数据'
            })
        }
    })
})

/**
 * 类目选择
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId",(req,res) =>{
    const id = url.parse(req.url,true).query.id || 1;
    const sql = "select * from category where id=?";
    const arr = [id];
    sqlFn(sql,arr,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"暂无数据"
            })
        }
    })
})

/**
 * 上传图片
 */
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
 
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
 
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
 
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

/**
 * 商品添加
 */
 router.get("/backend/item/insertTbItem",(req,res) =>{
    var title = url.parse(req.url, true).query.title || "";
    var cid = url.parse(req.url, true).query.cid || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)";
    var arr = [title, image, sellPoint, price, cid, num, desc];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

/**
 * 商品删除
 */
router.get("/backend/item/deleteItemById",(req,res) =>{
    var id = url.parse(req.url,true).query.id;
    var sql = "delete from project where id=?";
    var arr = [id];
    sqlFn(sql,arr,result =>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:500,
                msg:"删除失败"
            })
        }
    })
})

/**
 * 预更新
 */
router.get("/backend/item/preUpdateItem",(req,res) =>{
    var id = url.parse(req.url,true).query.id;
    const sql = "select * from project where id=?";
    sqlFn(sql,[id],result =>{
        if(result.length > 0){
            res.send({
                status:200,
                result:result[0]
            })
        }else{
            res.send({
                status:400,
                msg:"预更新失败"
            })
        }
    })
})

/**
 * 修改商品
 */
 router.get("/backend/item/updateTbItem", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    var title = url.parse(req.url, true).query.title || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    var cid = url.parse(req.url, true).query.cid;
    var sql = "update project set title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,image=? where id=?";
    var arr = [title, sellPoint, cid, price, num, desc, image, id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 规格参数
 */
router.get("/backend/itemParam/selectItemParamAll",(req,res) =>{
    const page = url.parse(req.url,true).query.page || 1;
    const sql = "select * from params order by id desc limit 10 offset " + (page-1) * 10;
    sqlFn(sql,null,result =>{
        if(result.length >0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"暂无数据"
            })
        }
    })
})

/**
 * 规格参数模糊搜索
 */
 router.get("/params/search",(req,res) =>{
    const search = url.parse(req.url,true).query.search;
    const sql = "select * from params where concat(`id`,`itemCatId`,`paramData`) like '%" + search + "%'";
    sqlFn(sql,null,result =>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'暂无数据'
            })
        }
    })
})

/**
 * 规格参数添加
 */
 router.get("/backend/itemParam/insertItemParam",(req,res) =>{
    var itemCatId = url.parse(req.url,true).query.itemCatId;
    var paramData = url.parse(req.url,true).query.paramData;
    var sql = "insert into params values (null,?,?)";
    sqlFn(sql,[itemCatId,paramData],result =>{
        if(result.affectedRows >0){
            res.send({
                status:200,
                msg:"添加成功"
            })
        }else{
            res.send({
                status:400,
                msg:"添加失败"
            })
        }
    })
})

/**
 * 规格参数删除
 */
 router.get("/params/delete",(req,res) =>{
    var id = url.parse(req.url,true).query.id;
    const sql = "delete from params where id=?"
    sqlFn(sql,[id],result =>{
        if(result.affectedRows >0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:400,
                msg:"删除失败"
            })
        }
    })
})
/**
 * 内容分类-标题
 */
 router.get("/content/title",(req,res) =>{
    const sql = "select * from content";
    sqlFn(sql,null,result =>{
        if(result.length >0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"暂无数据"
            })
        }
    })
})
 
/**
 * 内容分类-删除标题
 */
router.get("/content/delete",(req,res) =>{
    var pid = url.parse(req.url,true).query.pid;
    const sql = "delete from content where pid=?";
    sqlFn(sql,[pid],result =>{
        if(result.affectedRows >0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:400,
                msg:"删除失败"
            })
        }
    })
})
 
/**
 * 内容分类-添加标题
 */
router.get("/content/add",(req,res) =>{
    var name = url.parse(req.url,true).query.name;
    var id = Math.floor(Math.random()*100000);
    var pid = Math.floor(Math.random()*100000);
    const sql = "insert into content values (?,?,?)";
    sqlFn(sql,[id,name,pid],result =>{
        if(result.affectedRows >0){
            res.send({
                status:200,
                msg:"添加成功"
            })
        }else{
            res.send({
                status:400,
                msg:"添加失败"
            })
        }
    })
})
 
 
/**
 * 内容分类-元素列表
 */
router.get("/content/list",(req,res) =>{
    var pid = url.parse(req.url,true).query.pid;
    var sql = "select * from contentinfo where pid=?"
    sqlFn(sql,[pid],result =>{
        if(result.length >0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"暂无数据"
            })
        }
    })
})

module.exports = router;