import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$url='https://www.taocait.com/api/';
Vue.prototype.$phoneNum='4000821018';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
