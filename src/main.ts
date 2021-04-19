import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/basic-components/qxButton'

import {
  Button,
  Tabs,
  TabPane,
  Form,
  FormItem,
  ColorPicker,
  Select,
  Option,
  Input,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(ColorPicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
