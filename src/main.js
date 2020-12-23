import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import  qs from 'qs'
import VueLazyload from 'vue-lazyload'
import Globle from '../globle'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

Vue.prototype.$qs=qs;
// axios.defaults.baseURL = 'http://www.nzjy7777.com/public/index.php/web_correlating/';
// axios.defaults.baseURL = 'http://192.168.10.122/web_correlating/';
// axios.defaults.appbaseURL = 'http://192.168.10.122/newsletters/';
Vue.prototype.axios = axios;
Vue.prototype.Globle=Globle

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  error: '../src/assets/lazy/error.jpg', //图片未能加载出来的时候显示
  loading: '../src/assets/lazy/loading.gif',//图片正在加载时候显示
})

import Menuhome from './components/menuhome.vue'
import Homefirst from './components/home/homefirst.vue'
import Homenews from './components/home/homenews.vue'
import Homeapp from './components/home/homeapp.vue'
import Homefour from './components/home/homefour.vue'
import Homeinterview from './components/home/homeinterview.vue'
import Homebigone from './components/home/homebigone.vue'
import Homebigtwo from './components/home/homebigtwo.vue'
import Homebigthree from './components/home/homebigthree.vue'
import Homefooter from './components/home/homefooter.vue'
import ceshi from './components/home/ceshi.vue'
Vue.component("menuhome", Menuhome)
Vue.component("homefirst", Homefirst)
Vue.component("homenews", Homenews)
Vue.component("homeapp", Homeapp)
Vue.component("homefour", Homefour)
Vue.component("homeinterview", Homeinterview)
Vue.component("homebigone", Homebigone)
Vue.component("homebigtwo", Homebigtwo)
Vue.component("homebigthree", Homebigthree)
Vue.component("homefooter", Homefooter)
Vue.component("ceshi", ceshi)


import Menucollege from './components/menucollege.vue'
import Collegebig from './components/college/collegebig.vue'
import Collegenavigation from './components/college/collegenavigation.vue'
import Collegefooter from './components/college/collegefooter.vue'
Vue.component("menucollege", Menucollege)
Vue.component("collegebig", Collegebig)
Vue.component("collegenavigation", Collegenavigation)
Vue.component("collegefooter", Collegefooter)

import Menuapp from './components/menuapp.vue'
import Applarge from './components/app/applarge.vue'
import Applunbo from './components/app/applunbo.vue'

Vue.component("menuapp", Menuapp)
Vue.component("applarge", Applarge)
Vue.component("applunbo", Applunbo)

import Menuabout from './components/menuabout.vue'
import Aboutbanner from './components/aboutus/aboutbanner.vue'
import Aboutlunbo from './components/aboutus/aboutlunbo.vue'
import Aboutsr from './components/aboutus/aboutsr.vue'
import Aboutwenhua from './components/aboutus/aboutwenhua.vue'
import Aboutinfo from './components/aboutus/aboutinfo.vue'
Vue.component("menuabout", Menuabout)
Vue.component("aboutbanner", Aboutbanner)
Vue.component("aboutlunbo", Aboutlunbo)
Vue.component("aboutsr", Aboutsr)
Vue.component("aboutwenhua", Aboutwenhua)
Vue.component("aboutinfo", Aboutinfo)

import Menunews from './components/menuenews.vue'
import News from './components/new/news.vue'
Vue.component("menuenews", Menunews)
Vue.component("news", News)
// Vue.use(router)

// const originalPush = router.prototype.push;
// router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

