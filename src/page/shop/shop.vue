<template>
  <div class="ordercenter">
    <div v-show="isFixed2" class="fixed-top-s" ref="fixedTop0">
      <div class="goback" @click="$router.go(-1)">
        <div class="goback-icon"></div>
      </div>
      <div class="input-w">
        <div class="icon-search">
          <svg class="icon-fangdajing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
        </div>
        <input type="text" placeholder="想吃什么搜一搜" class="input">
      </div>
      <div class="search">搜索</div>
    </div>
    <div>
      <div class="shop">
        <!--1.0头部-->
        <div class="header-top" ref="headerTop">
          <div ref="banner">
            <div class="banner" v-if="shopRst && shopRst.shop_sign.image_hash !== ''" :style="{backgroundImage: 'url(' + $imgUrl(shopRst.shop_sign.image_hash, 0) + ')'}">
              <div class="goback" @click="$router.go(-1)">
                <div class="goback-icon"></div>
              </div>
              <div class="banner-logo">
                <img :src="imgUrl(shopRst.image_path, 1)">
              </div>
            </div>
            <div class="banner" v-else :style="{backgroundImage: 'url(' + $imgUrl(shopRst.image_path, 9) + ')'}">
              <div class="goback" @click="$router.go(-1)">
                <div class="goback-icon"></div>
              </div>
              <div class="banner-logo">
                <img :src="imgUrl(shopRst.image_path, 1)">
              </div>
            </div>
          </div>
          <!--2.0店铺信息-->
          <div class="shop-w" ref="shopW">
            <div class="title-w">
              <h1 class="shop-title">{{shopRst.name}}</h1>
              <div class="drop-right sanjiao-right"></div>
            </div>
            <div class="ratting">
              <span v-if="shopRst.rating > 0">评价{{shopRst.rating}}</span>
              <span class="margin">月售{{shopRst.recent_order_num}}单</span>
              <span>商家配送约{{shopRst.order_lead_time}}分钟</span>
            </div>
            <ul class="ticks-w">
              <li class="ticks-list" v-for="(item, index) in redpack" :key="index">
                <div class="tick-money">
                  <span class="moey">￥{{item.value}}</span>
                  <span class="manjian">{{item.title}}</span>
                </div>
                <div class="get">领取</div>
              </li>
            </ul>
            <div class="new-user-w">
              <div class="nowrap new-user-content">
                <span class="first-icon" style="background-color: #70bc46;">{{activities.icon_name}}</span>
                <p class="new-text nowrap">{{activities.description}}</p>
              </div>
              <div class="youhui">
                <span v-if="shopRst.activities">{{shopRst.activities.length}}个优惠</span>
                <div class="sanjiao-bottom"></div>
              </div>
            </div>
            <div class="add-w nowrap">公告：
              <span v-if="shopRst.description">{{shopRst.description}}</span>
              <span v-else>{{shopRst.promotion_info}}</span>
            </div>
          </div>
        </div>
        <!--3.0点餐列表-->
        <div>
          <div class="goods-slide-w">
            <ul class="goods-tab-bar" :class="{'fixed-tab': isFixedTab}">
              <li class="tab-item" v-for="(item, index) in tabLabels" :key="index" @click="tabSwitch(index)">
                <p class="item-label" :class="{'current-item': initialIndex === index}">{{item.label}}</p>
              </li>
            </ul>
            <div class="tab-slide-w">
              <div class="tab-slide-container">
                <!--0 点餐-->
                <div class="tab-content-item" v-show="initialIndex === 0">
                  <div class="goods-w" v-if="shoppingMenu" :class="{'fixed-c': isFixed}">
                    <v-recommend :shopping-menu="shoppingMenu" :shop-recommend="shopRecommend" :shop-rst="shopRst" :is-fixed-goods="isFixedGoods"></v-recommend>
                  </div>
                </div>
                <!-- 1 评价-->
                <div class="tab-content-item" v-show="initialIndex === 1">
                  <rating></rating>
                </div>
                <!-- 2 商家-->
                <div class="tab-content-item" v-show="initialIndex === 2">商家</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import recommend from './recommend.vue'
import rating from './rating.vue'
// import {findIndex} from '@/assets/js/util'

export default {
  data () {
    return {
      isFixedTab: false,
      scrollY: 0,
      isFixed: false,
      isFixed2: false,
      shopRecommend: {},
      shoppingMenu: [],
      activities: [],
      shopRst: '',
      selectedLabel: '点餐',
      disabled: false,
      isFixedGoods: false,
      tabLabels: [{
        label: '点餐'
      }, {
        label: '评价'
      }, {
        label: '商家'
      }],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        allowVertical: true,
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      bigListOption: {
        stopPropagation: true
      },
      currentPage: 0,
      redpack: '',
      initialIndex: 0,
      localAddress: '',
      navArr: ['点餐', '评价', '商家']
    }
  },
  created () {
    if (localStorage.getItem('_ADDRESS_')) {
      this.localAddress = JSON.parse(localStorage.getItem('_ADDRESS_'))
      this.getShop()
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    tabSwitch (index) {
      this.initialIndex = index
    },
    onScroll () {
      let hScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (hScroll > 0) {
        this.isFixed2 = true
      } else {
        this.isFixed2 = false
      }
      if (this.$refs.headerTop && (hScroll > this.$refs.headerTop.clientHeight - 50)) {
        this.isFixedTab = true
      } else {
        this.isFixedTab = false
      }
    },
    orderScroll (pos) {
      this.scrollY = pos.y
      if (pos.y > 0) {
        this.isFixed2 = false
        this.scrollY = pos.y
        return
      }
      let h = Math.abs(pos.y)
      if (h > 0) {
        this.isFixed2 = true
      } else {
        this.isFixed2 = false
      }
      if (this.$refs.shopW && this.$refs.banner) {
        if (h > this.$refs.shopW.clientHeight + this.$refs.banner.clientHeight - this.$refs.fixedTop0.clientHeight) {
          this.isFixed = true
          this.isFixedGoods = true
        } else {
          this.isFixedGoods = false
          this.isFixed = false
        }
      }
    },
    scrollO (pos) {},
    // tab切换
    changePage (current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    // 左右滑动
    scroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    // tab切换
    changeTab (index) {
      this.currentPage = index
    },
    // 获取商家信息
    getShop () {
      /*
      let id = this.$route.query.id
      this.$api.get(`/apis/a/pizza/shopping/restaurants/${id}/batch_shop`, {
        code: Math.random(),
        extras: JSON.stringify(['activities', 'albums', 'license', 'identification', 'qualification']),
        terminal: 'h5',
        latitude: this.localAddress.latitude,
        longitude: this.localAddress.longitude
      }).then(res => {
        this.redpack = res.redpack
        this.shopRst = res.rst
        this.shoppingMenu = res.menu
        this.shopRecommend = res.recommend[0]
        this.activities = res.rst.activities[0]
      }).catch(err => {
        console.log(err)
      })
      */
      this.$api.get('/static/mock/sell.json').then(res => {
        this.redpack = res.redpack
        this.shopRst = res.rst
        this.shoppingMenu = res.menu
        this.shopRecommend = res.recommend[0]
        this.activities = res.rst.activities[0]
      }).catch(err => {
        console.log(err)
      })
    },
    // 图片拼接
    imgUrl (hash, index) {
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
        if (index === 0) {
          return `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/thumbnail/750x/`
        } else if (index === 1) {
          return `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/thumbnail/150x/`
        }
      }
    }
  },
  watch: {
    scrollY (newY) {
      this.$refs.headerTop.style.transform = `translate3d(0, ${newY}px, 0)`
    }
  },
  computed: {
    /*
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
    */
  },
  components: {
    vRecommend: recommend,
    rating
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/mixin.styl'
.ordercenter
  width: 100%
  height: 100%
  background-color: #fff
  .fixed-top-s
    position: fixed
    top: 0
    width: 100%
    left: 0
    display flex
    align-items center
    height: 50px
    z-index: 100
    background-color: #fff
    .goback
      padding: 10px
      .goback-icon
        width: 10px;
        height: 10px;
        display: inline-block;
        border-bottom: 2px solid #333;
        border-left: 2px solid #333;
        transform: rotate(45deg);
    .input-w
      flex 1
      margin: 0 10px
      position: relative
      .icon-search
        width: 16px
        height: 16px
        position: absolute
        left: 50px
        top: 50%
        transform translateY(-50%)
      .input
        width: 100%
        height: 32px
        text-align: center
        color #333
        font-size: 12px
        background-color: #f5f5f5
        border-radius 16px
    .search
      width: 50px
      color #333
      font-size: 14px
  .shop
    display flex
    flex-direction column
    .banner
      width: 100%
      height: 100px
      background-repeat: no-repeat
      background-size: cover
      position: relative
      &::after
        content ''
        display block
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        background-color: rgba(0,0,0,.2)
      .goback
        position: absolute
        left: 0
        top: 0
        padding: 10px
        z-index: 10
        .goback-icon
          width: 10px;
          height: 10px;
          display: inline-block;
          border-bottom: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(45deg);
      .banner-logo
        width: 75px
        height: 75px
        position: absolute
        left: 50%
        transform translateX(-50%)
        top: 60px
        z-index: 20
        img
          box-shadow 0 0 2px 0 rgba(0,0,0,.2)
          width: 100%
          height: 100%
    .shop-w
      padding: 50px 0 16px
      .title-w
        width: 60%
        display flex
        align-items center
        justify-content center
        overflow: hidden
        margin: 0 auto
        .shop-title
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: middle;
          text-align: center
          font-weight: bold
          font-size: 18px
          color #000
      .ratting
        text-align: center
        font-size: 12px
        color #666
        margin: 10px 0
        .margin
          padding: 0 5px
      .ticks-w
        display flex
        align-items center
        justify-content center
        .ticks-list
          width: 125px
          height: 26px
          background-color: #ffe578
          color #594519
          display flex
          align-items center
          margin-right: 10px
          &:last-child
            margin-right: 0
          .tick-money
            padding: 0 14px
            font-size: 12px
            height: 100%
            display: flex
            align-items center
            position: relative
            &::before,&::after
              content ''
              display block
              position: absolute;
              right: 0;
              width: 6px;
              height: 3px;
              background: #fff;
              transform: translateX(50%);
            &::after
              bottom: -1px
              border-bottom: none;
              border-radius: 3px 3px 0 0;
            &::before
              top: -1px
              border-top: none
              border-radius: 0 0 3px 3px;
            .moey
              font-size: 14px
              font-weight: bold
              margin-right: 4px
            .manjian
              font-size: 12px
          .get
            font-size: 12px
            padding: 0 4px
      .new-user-w
        display flex
        align-items center
        justify-content center
        font-size: 12px
        width: 80%
        margin: 10px auto
        .new-user-content
          flex 1
          display flex
          align-items center
        .first-icon
          padding: 1px 2px
          color #fff
          font-size: 12px
          border-radius 2px
        .new-text
          font-size: 12px
          color #333
          margin: 0 6px
        .youhui
          font-size: 12px
          display flex
          align-items center
          color #999
          .sanjiao-bottom
            margin-left: 2px
      .add-w
        width: 80%
        margin: 0 auto
        font-size: 12px
        color #999
    .goods-slide-w
      box-sizing border-box
      >>> .cube-tab-bar
            height: 34px
      >>> .cube-tab
        font-size: 14px
        padding: 10px 0
        color #666
        &.cube-tab_active
          color #333
          div
            font-weight: 999
      >>> .cube-tab-bar-slider
            background-color: rgb(35, 149, 255)
      >>> .cube-slide-dots
        font-size: 14px
        top: 0
        z-index: 10
        display: flex
        align-items center
        height: 46px
        border-bottom-1px(#f5f5f5)
        position: absolute
        .footer-tab-item
          color #666
          height: 100%
          display: flex
          align-items center
          justify-content center
          flex 1
          &.active .item
            border-bottom-color: #0089dc
          .item
            display: flex
            align-items center
            justify-content center
            box-sizing border-box
            height 100%
            border-bottom: 4px solid transparent
      .goods-tab-bar
        display flex
        align-items center
        border-bottom: 1px solid #ebebeb
        &.fixed-tab
          position: fixed
          left: 0
          top: 50px
          width: 100%
        .tab-item
          flex 1
          height: 34px
          display flex
          align-items center
          justify-content center
          .item-label
            line-height: 34px
            height 34px
            color #666
            font-size: 14px
            box-sizing border-box
            &.current-item
              border-bottom: 2px solid rgb(35, 149, 255);
      .goods-w
        position: relative
        overflow: hidden
        &.fixed-c
          padding-top: 34px
      .tab-slide-w
        position: relative
        overflow: hidden
      .tab-slide-container
        position: relative
        overflow: hidden
        white-space nowrap
        width 100%
        &.current-c0
          transform translate(0,0)
        &.current-c1
          transform translate(-320px,0)
        &.current-c2
          transform translate(-640px,0)
      .fixed-tab
        position: absolute
        top: 0
        left: 0
        width: 100%
        background-color: #fff
        z-index: 100
    .fixed-sc
      position: relative
      left: 0
      top: 84px
      bottom: 50px
      width: 100%
    .foods-w-scroll
      overflow: inherit !important
</style>
