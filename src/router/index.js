import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 底部导航
      name: 'tabBar',
      component: resolve => require(['@/components/tabBar'], resolve)
    },
    {
      path: '/shippingAddress', // 选择收货地址
      name: 'shippingAddress',
      component: resolve => require(['@/page/city/shippingAddress'], resolve)
    },
    {
      path: '/city', // 选择城市
      name: 'city',
      component: resolve => require(['@/page/city/city'], resolve)
    },
    {
      path: '/shop', // 商家页面
      name: 'shop',
      component: resolve => require(['@/page/shop/shop'], resolve)
    },
    {
      path: '/shopping', // 商家页面
      name: 'shopping',
      component: resolve => require(['@/page/shop/shopping'], resolve)
    },
    {
      path: '/search', // 搜索
      name: 'search',
      component: resolve => require(['@/page/search/search'], resolve),
      children: [
        {
          path: '/search/:keywords', // 搜索
          name: 'searchkeywords',
          component: resolve => require(['@/page/search/searchKeywords'], resolve)
        }
      ]
    },
    {
      path: '/goods',
      name: 'goods',
      component: resolve => require(['@/page/goods/goods'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/page/login/login'], resolve)
    }
  ]
})
