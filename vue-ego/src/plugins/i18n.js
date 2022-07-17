import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const messages = {
    en:{
        message:{
            project:"project",
            params:"params",
            content:"content",
            search:"search",
            add:"Add"
        },
        ...enLocale
    },
    zh:{
        message:{
            project:"商品管理",
            params:"规格参数",
            content:"广告分类",
            search:"搜索",
            add:"添加"
        },
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale:"zh", //语言的默认设置
    messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n