import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Message,
  MessageBox,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Tag,
  Card,
  Button,
  Form,
  FormItem,
  Table,
  TableColumn,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import 'lib-flexible'
import 'common/styles/common.css'

Vue.config.productionTip = false

// 按需引入element-ui相关弹出
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = (options) => { // 重新定义默认参数
  options = Object.assign(options, { duration: 500 })
  return Message(options)
}
Vue.prototype.$message.error = (err) => { // 重新定义默认参数
  var options = {
    message: err,
    duration: 500,
    type: 'error'
  }
  return Message(options)
}
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Tag)
Vue.use(Card)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
