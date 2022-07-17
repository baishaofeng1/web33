# 商城后台系统

## 项目描述
本项目是一个商城的后台管理系统，具有商城的商品管理、规格参数管理、广告分类管理等。 其中包含用户中心、用户登陆与注册。集成国际化语言环境，支持中英两种语言，项目采用Vue技术栈

## 项目技术
1. 项目环境:Vue-Cli构建项目，集成项目环境(前后端同步实现，集成了Node服务器，集成XAMPP)
2. 项目技术点:
    - 项目网络请求集成Axios，同时对Axios进行封装，主要处理请求拦截和响应拦截及错误提示
    - 项目UI采用ElementUI，并且对ElementUI进行二次封装，主要引入组件包含：table表格、tree树形控件、form表单、dailog弹出框等
    - 项目页面之间的管理采用Vue-Router路由管理，包含路由嵌套功能、路由导航、路由传参、路由权限管理等
    - 项目的全局状态，包含登陆token、订单信息等采用Vuex进行管理，并跟踪数据变化
    - 由于商品具有编辑功能，所以引入了富文本编辑器(wangEditor\UEditor)
    - 因为项目开发是前后端同步，所以前期数据采用node+mock做数据模拟，并且在开发环境下采用proxy解决跨域问题
3. 业务实现
    - 具体业务实现...

## 项目心得

## 项目亮点

## 安装项目依赖
1. 安装网络请求Axios `npm install --save axios`
2. 集成ElementUI组件库`vue add element`

##  项目页面结构
1. 商品管理:product
2. 规格参数:params
3. 内容分类管理:Content
4. 用户登陆注册页面:login
5. 用户中心:ucenter

## 页面管理级别
    --login
    --layout
        --content
        --params
        --product
    --user
## 初始化CSS样式

## 实现登陆页面：login.vue
1. 用到的组件 
    el-card、el-tabs、el-form
2. 具体功能
    1. 登陆
        1. 完成网路请求的处理
        2. 解决跨域问题
            1. 前端解决：proxy代理方案(开发环境的跨域解决方案)  vue.config.js文件
            2. 后端解决 
                cors方案`npm install --save cors`
    2. 注册
        1. 注册时候验证
        2. 网络请求的交互
        3. ElementUI组件:Message 消息提示
## 实现后台服务器提供接口
Node+MySQL(XAMPP)
1. 安装依赖
    1. express框架`npm install --save express`
    2. mysql库`npm install --save mysql`

## 前后端同时运行服务器
1. 安装一个依赖`npm install -g concurrently`
2. package.json:`"dev": "concurrently \"npm run serve\" \"node server/index.js\""`
3. 运行:`npm run dev`
4. node服务器自动重启`npm install -g nodemon`

## 路由权限管理
    验证用户是否登陆

## 用户登陆的验证
1. Vuex管理用户登陆状态
2. token用户凭证 
    前端发送用户名密码 -> 后台验证用户名密码是否成功(生成token) -> 返回token用户凭证 -> 前台保存的是token用户凭证
        1. 安装依赖`npm install --save jsonwebtoken`
3. 本地存储：localStorage

## 实现导航
1. 主导航
    1. 使用到的ElementUI组件
        1. NavMenu 导航菜单:额外配置了一个router(编程路由形式)
        2. Icon 图标
2. 顶部导航
    1. 使用的ElementUI组件
        1. Badge 标记
        2. Dropdown 下拉菜单
    2. 用户名处理(动态显示)
        1. 解析token
            1. 安装依赖:npm install --save jwt-decode
        2. 用户名和token存入到vuex中和本地中（注意：转码）
            1. token简介：https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html
        3. 退出处理
            1. 清除本地数据和vuex的数据，路由回到登陆页

## 商品管理
1. 关于联合调试 
    前端和后台的联合调试
    1. 字段
    2. 接口地址(backend/item/...)
2. 前后端开发各干各的，前端在没有拿到接口之前，只做页面UI的处理
3. 使用到的ElementUI组件
    1. Table 表格

## 分页功能
1. 使用到的Element组件
    1. Pagination 分页
2. 组件之间的数据交互
    1. 子父级：prop 自定义事件
    2. 同级组件
        1. eventbus（事件总线）
        2. vuex

## 模糊搜索功能
1. form表单阻止默认事件:@submit.native.prevent
2. 监听回车按键:@keyup.enter.native="onSubmitSearch"

## 国际化处理
1. vue-i18n参考地址:https://kazupon.github.io/vue-i18n/zh/
2. 安装依赖`npm install vue-i18n@8.9.0 --save`
3. 配合ElementUI进行语言环境切换
4. i18n的使用方案和vuex与router相似

## 添加功能
1. 使用到的ElementUI组件
    1. Dialog 对话框（内嵌的Dialog）
    2. Tree 树形控件（懒加载方式）
    3. Upload 上传
2. 主要功能
    1. Tree的懒加载
    2. 上传图片
    3. 副文本编辑器
        1. 百度副文本编辑器:https://github.com/HaoChuan9421/vue-ueditor-wrap/tree/2.x
        2. wangEditor:https://www.wangeditor.com/ 
            代码参考地址：https://github.com/wangeditor-team/wangEdior-with-vue/blob/master/src/views/Home.vue
3. 组件交互关系
    1. 子传父：自定义事件($emit)
    2. eventbus：同级关系的数据传递

## 删除功能
1. 使用到的ElementUI组件
    1. MessageBox 弹框
    2. Message 消息提示

## 修改功能
1. 预更新:修改数据的时候，不能从本地读取当前数据，因为同时使用项目的不止一个人，如果别人修改了，你看到的数据是被修改之前的数据，在修改，就覆盖了别人的修改。
2. wangEditor的bug:加载方式的bug，不用通过id引用，而是通过ref的形式

## 规格参数-列表渲染

## 规格参数-模糊查询

## 规格参数-添加功能

## 规格参数-删除功能

## 内容分类-标题显示
  <!-- <style scoped> scoped加上表示这个样式只在本组件内用 -->
