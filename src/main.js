// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill' // 兼容ie
import api from './assets/api/getData'
// import axios from 'axios'

import {
  /* eslint-disable no-unused-vars */
  Style, // 必需
  Button,
  TabBar,
  Slide,
  Scroll,
  Loading,
  Popup,
  Swipe,
  TabPanels
} from 'cube-ui'
Vue.use(Slide)
Vue.use(Scroll)
Vue.use(Loading)
Vue.use(Popup)
Vue.use(Swipe)
Vue.use(Button)
Vue.use(TabBar)
Vue.use(Style)
Vue.use(TabPanels)

Vue.prototype.$api = api
Vue.prototype.$url = 'https://bian815350967.github.io/mapp/elm/#'
Vue.config.productionTip = false

// 图片拼接
Vue.prototype.$imgUrl = function (hash, index) {
  if (hash) {
    let sh1 = hash.substring(0, 1)
    let sh2 = hash.substring(1, 3)
    let sh3 = hash.substring(3, hash.length)
    let endStr = ''
    if (sh3.endsWith('png')) {
      endStr = '.png'
    } else if (sh3.endsWith('jpeg')) {
      endStr = '.jpeg'
    }
    let path = `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/thumbnail/`
    if (index === 0) {
      return `${path}!90x90r/gravity/Center/crop/90x90/`
    } else if (index === 1) {
      return `${path}!130x130r/gravity/Center/crop/130x130/`
    } else if (index === 2) {
      return `${path}!140x140r/gravity/Center/crop/140x140/`
    } else if (index === 3) {
      return `${path}!240x160r/gravity/Center/crop/240x160/`
    } else if (index === 4) {
      return `${path}240x/`
    } else if (index === 5) {
      return `${path}!375x375r/gravity/Center/crop/375x375/`
    } else if (index === 6) {
      return `${path}568x/`
    } else if (index === 7) {
      return `${path}26x/`
    } else if (index === 8) {
      return `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/`
    } else if (index === 9) {
      return `${path}750x/thumbnail/!40p/blur/50x40/`
    } else if (index === 10) {
      return `${path}686x/`
    } else if (index === 11) {
      return `${path}48x/`
    } else if (index === 12) {
      return `${path}!130x130r/gravity/Center/crop/130x130/`
    }
  }
}

// 距离计算
Vue.prototype.$distance = function (length) {
  if (length >= 1000) {
    let len = (length / 1000).toFixed(2)
    return len + 'km'
  } else {
    return length + 'm'
  }
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
