<template>
  <div class="home" ref="home">
    <div class="fixed-r">
      <div class="search-w" @click="gotoSearch" ref="searchW" v-show="isFixed">
        <div class="input-w">
          <div class="placeholder">
            <svg class="icon-fangdajing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
            <span>搜索饿了么商家、商家名称</span>
          </div>
          <input type="text" class="input">
        </div>
      </div>
      <ul class="filter-uls border-bottom-1px" ref="filterW" v-show="isFilterShow">
        <li class="filter-list" @click="choseOne" :class="{'current-filter': filterIndex === 0}">
          <span>综合排序</span>
          <svg viewBox="0 0 72 32" class="dropdown-icon"><path data-v-a5cc4024="" d="M36 32l36-32h-72z"></path></svg>
        </li>
        <li class="filter-list" @click="choseList(1)" :class="{'current-filter': filterIndex === 1}">距离最近</li>
        <li class="filter-list" @click="choseList(2)" :class="{'current-filter': filterIndex === 2}">品质联盟</li>
        <li class="filter-list" @click="choseFour" :class="{'current-filter': filterIndex === 3}">
          <span>筛选</span>
          <svg class="filter-nav-more__icon">
            <use data-v-a5cc4024="" xlink:href="#more-filter">
              <svg viewBox="0 0 26 26" id="more-filter" width="100%" height="100%">
                <path d="M9.001 15.009V23a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7.981l7.788-10.01a1 1 0 0 0-1.578-1.228l-8 10.28a1 1 0 0 0-.21.615V22h-4v-7.324a1 1 0 0 0-.2-.6L4.001 5h14a1 1 0 0 0 0-2H2a1 1 0 0 0-.8 1.6L9 15.009z"></path>
              </svg>
            </use>
          </svg>
        </li>
      </ul>
    </div>
    <cube-scroll
      ref="scroll1"
      @scroll="scrollw"
      @pulling-up="onPullingUp"
      :scroll-events="['scroll']"
      :options="scrollOptions"
      :data="recommendSellArr">
      <div class="top">
        <div class="address" @click="searchAddress" ref="addressW">
          <div class="icon-map">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31" class="index-okfdP_0"><path fill="#FFF" fill-rule="evenodd" d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path></svg>
          </div>
          <span class="address-text">{{userAddress.name}}</span>
          <div class="pull-down">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" class="index-2iXz3_0"><path fill="#FFF" fill-rule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path></svg>
          </div>
        </div>
        <div class="search-w" @click="gotoSearch" ref="searchW" v-show="!isFixed">
          <div class="input-w">
            <div class="placeholder">
              <svg class="icon-fangdajing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
              <span>搜索饿了么商家、商家名称</span>
            </div>
            <input type="text" class="input">
          </div>
        </div>
      </div>
      <div class="swipe-wrapper">
        <!--顶部-->
        <!--轮播图-->
        <div class="foods-swiper">
          <cube-slide ref="slide2" :data="slideArr" :options="optionSwiper" :autoPlay="false">
            <cube-slide-item v-for="(item, index) in slideArr" :key="index" class="item-s">
              <div class="flex-item">
                <div class="list-item" v-for="(list, index) in item" :key="index">
                  <div class="img-box">
                    <img :src="imgUrl(list.image_hash, 0)" alt="">
                  </div>
                  <p class="link-name">{{list.name}}</p>
                </div>
              </div>
            </cube-slide-item>
          </cube-slide>
        </div>
        <!--品质套餐-->
        <div class="set-meal">
          <ul class="set-uls">
            <li class="set-list" :class="{'qualityOne': !limitQuantity}">
              <p class="title">品质套餐</p>
              <p class="desc">搭配齐全吃得好</p>
              <div class="buy-now">立即抢购 ></div>
              <div class="set-img-box"><img :src="imgUrl(elmImg, 2)" alt=""></div>
            </li>
            <li class="set-list" v-if="limitQuantity">
              <p class="title red-title">{{limitQuantity.name}}</p>
              <p class="desc">{{limitQuantity.description}}</p>
              <div class="buy-now limit-now">
                <span class="red-color">{{limitNumber}}人</span>正在抢 >
              </div>
              <div class="set-img-box"><img :src="imgUrl(limitQuantity.image_hash, 2)" alt=""></div>
            </li>
          </ul>
        </div>
        <!--广告轮播-->
        <div class="add-swiper">
          <cube-slide ref="addslide3" :data="addImg">
            <cube-slide-item v-for="(item, index) in addImg" :key="index" class="item-s">
              <a :href="item.url" target="_blank">
                <img :src="imgUrl(item.image_hash, 1)" alt="" class="img-add">
              </a>
            </cube-slide-item>
          </cube-slide>
        </div>
        <!--推荐商家-->
        <div class="recommend-business">
          <div class="title">
            <div class="line"></div>
            <div class="text">推荐商家</div>
            <div class="line"></div>
          </div>
          <!-- 商家筛选-->
          <ul class="filter-uls border-bottom-1px" ref="filterW" :class="{'fixed-filrter': isFilter}">
            <li class="filter-list" @click="choseOne" :class="{'current-filter': filterIndex === 0}">
              <span>综合排序</span>
              <svg viewBox="0 0 72 32" class="dropdown-icon"><path data-v-a5cc4024="" d="M36 32l36-32h-72z"></path></svg>
            </li>
            <li class="filter-list" @click="choseList(1)" :class="{'current-filter': filterIndex === 1}">距离最近</li>
            <li class="filter-list" @click="choseList(2)" :class="{'current-filter': filterIndex === 2}">品质联盟</li>
            <li class="filter-list" @click="choseFour" :class="{'current-filter': filterIndex === 3}">
              <span>筛选</span>
              <svg class="filter-nav-more__icon">
                <use data-v-a5cc4024="" xlink:href="#more-filter">
                  <svg viewBox="0 0 26 26" id="more-filter" width="100%" height="100%">
                    <path d="M9.001 15.009V23a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7.981l7.788-10.01a1 1 0 0 0-1.578-1.228l-8 10.28a1 1 0 0 0-.21.615V22h-4v-7.324a1 1 0 0 0-.2-.6L4.001 5h14a1 1 0 0 0 0-2H2a1 1 0 0 0-.8 1.6L9 15.009z"></path>
                  </svg>
                </use>
              </svg>
            </li>
          </ul>
          <!--商家列表-->
          <mearchat-list :recommendSellArr="recommendSellArr"></mearchat-list>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import mearchatList from '@/components/merchantList/merchantList'
export default {
  data () {
    return {
      isFilterShow: false,
      pullUpLoadThreshold: 0,
      scrollOptions: {
        pullUpLoad: true
      },
      filterIndex: 0,
      fixedTop: 0,
      isFilter: false,
      isFixed: false,
      tickesArr: [],
      limitQuantity: '',
      limitNumber: '',
      elmImg: '',
      userAddress: [],
      pageSize: 0,
      goodsData: ['综合排序', '距离最近', '品质联盟', '筛选'],
      filterNav: ['综合排序', '距离最近', '品质联盟', '筛选'],
      optionSwiper: {
        // stopPropagation: true
      },
      recommendSellArr: [],
      addImg: [],
      slideArr: [] // 头部美食导航
    }
  },
  created () {
    if (localStorage.getItem('_ADDRESS_')) {
      this.userAddress = JSON.parse(localStorage.getItem('_ADDRESS_'))
      this.getNav()
      this.getBannerAdd()
      this.getRecommendSell()
    } else {
      this.$router.push('/shippingAddress')
    }
  },
  methods: {
    choseOne () {},
    choseList (index) {
      this.filterIndex = index
      this.recommendSellArr = []
      this.getRecommendSell(index)
      this.$refs.filterW.style.top = 0
      this.isFixed = false
      this.isFilter = false
    },
    choseFour () {},
    // 跳转到 选择收货地址
    searchAddress () {
      this.$router.push({path: '/shippingAddress'})
    },
    // 跳转到 搜索商品
    gotoSearch () {
      this.$router.push({path: '/search'})
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
          return `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/`
        } else if (index === 1) {
          return `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/thumbnail/568x/`
        } else if (index === 2) {
          return `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/`
        } else if (index === 3) {
          return `https://fuss10.elemecdn.com/${sh1}/${sh2}/${sh3}${endStr}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
        }
      }
    },
    // 获取头部美食导航
    getNav () {
      this.$api.get('/apis/a' + '/restapi/shopping/v2/entries', {
        latitude: this.userAddress.latitude,
        longitude: this.userAddress.longitude,
        templates: ['main_template', 'favourable_template', 'svip_template'],
        terminal: 'h5'
      }).then(res => {
        if (res.length > 1) {
          this.tickesArr = res[1].entries
          this.limitQuantity = res[1].entries[0]
          this.limitNumber = JSON.parse(res[1].entries[0].more).population
          this.elmImg = res[1].entries[1].image_hash
        } else {
          this.elmImg = 'eeedf43e7e53f6e1346c3fda0609f1d3png'
        }
        let navArr = res[0].entries
        let newArr = []
        for (let i = 0; i < navArr.length; i += 10) {
          newArr.push(navArr.slice(i, i + 10))
        }
        this.slideArr = newArr
      })
    },
    // /restapi/shopping/v2/banners 广告轮播
    getBannerAdd () {
      this.$api.get('/apis/a/restapi/shopping/v2/banners', {
        latitude: this.userAddress.latitude,
        longitude: this.userAddress.longitude,
        consumer: 1,
        type: 1
      }).then(res => {
        this.addImg = res
      })
    },
    getRecommendSell (data) {
      let params = {
        latitude: this.userAddress.latitude,
        longitude: this.userAddress.longitude,
        offset: this.pageSize * 8,
        limit: 8,
        extras: ['activities', 'tags'],
        extra_filters: 'home',
        // rank_id: '',
        terminal: 'h5'
      }
      if (data === 1) {
        params.order_by = 5
      }
      if (data === 2) {
        params.quality_union = 1
      }
      this.$api.get('/apis/a/restapi/shopping/v3/restaurants', params).then(res => {
        if (res.length === 0) {
          this.scrollOptions.pullUpLoad = false
        }
        this.recommendSellArr = this.recommendSellArr.concat(res.items)
        this.$refs.scroll1.refresh()
      }).catch((err) => {
        console.log(err)
        this.scrollOptions.pullUpLoad = false
      })
    },
    // 滚动时，固定搜索栏
    onPullingUp () {
      setTimeout(() => {
        this.pageSize++
        this.getRecommendSell(this.filterIndex)
      }, 1000)
    },
    scrollw (pos) {
      if (pos.y > 0) {
        return
      }
      let top = Math.abs(pos.y)
      if (top >= this.$refs.addressW.clientHeight) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
      if (top >= this.$refs.filterW.offsetTop - this.$refs.addressW.clientHeight - 20) {
        this.isFilterShow = true
      } else {
        this.isFilterShow = false
      }
    }
  },
  components: {
    mearchatList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/color'
flex-center()
  display: flex
  align-items center
.red-color
  color #e81919
.img-add
  height auto
.fixed-r
  position: fixed
  left: 0
  top: 0
  width: 25%
  z-index: 200
  .search-w
    padding: 10px
    background-image: linear-gradient(90deg,#0af,#0085ff);
    &.fixed-s
      position: relative
      left: 0
      z-index: 100
      width: 100%
    .input-w
      position: relative
      width: 100%
      height: 40px
      .placeholder
        position: absolute
        width: 100%
        height: 100%
        font-size: 16px
        display flex
        align-items center
        justify-content center
        color #999
        .icon-fangdajing
          width: 16px
          height: 16px
          margin-right: 5px
      .input
        width: 100%
        height: 100%
        text-align: center
        background-color: #fff
        font-size: 16px
.home
  background-color: #fff
  position: fixed
  left: 0
  top: 0
  bottom: 50px
  width: 25%
  .filter-uls
    display flex
    align-items center
    height: 40px
    background-color: #fff
    &.fixed-filrter
      position: absolute !important
      left: 0
      width: 100%
      z-index: 1000
    .filter-list
      flex 1
      height: 100%
      font-size: 14px
      color $hei
      display flex
      align-items center
      justify-content center
      &.current-filter
        font-weight: bold;
        color #000
      .dropdown-icon
        width: 6px
        margin-left: 5px
      .filter-nav-more__icon
        width: 12px
        height: 10px
        margin-left: 5px
  .top
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 20
    background-image: linear-gradient(90deg,#0af,#0085ff);
    .address
      display flex
      align-items center
      padding: 20px 10px 4px 10px
      width: 60%
      overflow: hidden
      .address-text
        font-size: 16px
        color #fff
        font-weight: bold
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      .icon-map
        width: 13px
        min-width 13px
        margin-right: 5px
      .pull-down
        display flex
        align-items center
        justify-content center
        margin-left: 5px
        >svg
          width: 7px
          height: 4px
    .search-w
      padding: 10px
      background-image: linear-gradient(90deg,#0af,#0085ff);
      &.fixed-s
        position: relative
        left: 0
        z-index: 100
        width: 100%
      .input-w
        position: relative
        width: 100%
        height: 40px
        .placeholder
          position: absolute
          width: 100%
          height: 100%
          font-size: 16px
          display flex
          align-items center
          justify-content center
          color #999
          .icon-fangdajing
            width: 16px
            height: 16px
            margin-right: 5px
        .input
          width: 100%
          height: 100%
          text-align: center
          background-color: #fff
          font-size: 16px
  .foods-swiper
    position: relative
    padding-top: 10px
    margin-top: 102px
    background-color: #fff
    >>> .cube-slide-dots
      height: 30px
      box-shadow none
      justify-content center
      span
        margin: 0 3px
        height: 2px
      .active
          background-color: $bule
    .item-s
      padding-bottom: 30px
    .flex-item
      display flex
      flex-wrap wrap
    .list-item
      display flex
      align-items center
      justify-content center
      flex-direction column
      padding: 5px 0
      width: 20%
      .img-box
        width: 45px
        height: 45px
        img
          width: 100%
          height: 100%
      .link-name
        margin-top: 6px
        font-size: 10px
        color $hei
        text-align: center
  .set-meal
    padding: 0 10px
    .set-uls
      display flex
      align-items center
      .set-list
        position: relative
        padding: 10px 0 80px 10px
        flex 1
        background: linear-gradient(0deg,#f4f4f4 5%,#fafafa 95%);
        &:nth-child(1)
          margin-right: 2px
        &:nth-child(2)
          margin-left: 2px
        &.qualityOne
          margin-right: 0
          padding-bottom: 10px
        .title
          font-size: 16px
          font-weight:bold
          color #000
          &.red-title
            color #e81919
        .desc
          color #777
          font-size: 12px
          margin: 10px 0
        .buy-now
          font-size: 14px
          color #af8260
          &.limit-now
            color #333
        .set-img-box
          width: 120px
          // height: 100px
          position: absolute
          right: 0
          bottom: 0
  .add-swiper
    margin: 6px 0 20px
    padding: 0 10px
    >>> .cube-slide-dots
      height: 10px
      bottom: 0
      justify-content center
    >>> .cube-slide
      height auto
    .item-s
      height auto
  .recommend-business
    .title
      display flex
      align-items center
      justify-content center
      padding-bottom: 10px
      .line
        width: 20px
        height: 1px
        background-color: #666
      .text
        font-size: 14px
        color #000
        padding: 0 10px
</style>
