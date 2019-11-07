<template>
  <div class="search-keywords">
    <div class="fixed-w">
      <form class="fixed-top-search">
        <div class="goback" @click="goback">
          <svg viewBox="0 0 20 32" class="goback-icon-svg" fill="#999" width="100%" height="100%"><path d="M16.552 5.633l-2.044-2.044L2.243 15.854l12.265 12.557 2.044-2.044L6.331 15.854z"></path></svg>
        </div>
        <div class="input-w">
          <svg class="icon-fangdajing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
          <input type="text" placeholder="输入商家、商品名称" class="input">
        </div>
        <button type="submit" class="btn-search">搜索</button>
      </form>
      <ul class="filter-uls border-bottom-1px" ref="filterW">
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
    <!--商家列表-->
    <div class="wrapper">
      <cube-scroll ref="scrollS"
                   :scroll-events="['scroll']"
                   :data="recommendSellArr">
        <ul class="shopping-uls">
          <li class="shopping-list border-bottom-1px" @click="gotoShop(item.restaurant.id)" v-for="(item, mindex) in recommendSellArr" :key="mindex">
            <div class="goods-logo">
              <img :src="$imgUrl(item.restaurant.image_path, 12)" alt="">
            </div>
            <div class="goods-info">
              <div class="top-title">
                <h3 class="goods-title nowrap">
                  <span class="brand">品牌</span>
                  <span class="title-text nowrap" v-html="item.restaurant.name"></span>
                </h3>
                <div class="right">
                  <div v-for="(itemtag, index2) in item.restaurant.supports" :key="index2" class="icon-item">{{itemtag.icon_name}}</div>
                </div>
              </div>
              <div class="star-w">
                <div class="star-l">
                  <div class="star">☆☆☆☆☆</div>
                  <span class="grade-num">{{item.restaurant.rating}}</span>
                  <span>月售{{item.restaurant.recent_order_num}}单</span>
                </div>
                <div v-if="item.restaurant.delivery_mode">
                  <div v-if="item.restaurant.delivery_mode.text" class="hummingbird">{{item.restaurant.delivery_mode.text}}</div>
                </div>
              </div>
              <div class="money">
                <div class="price">
                  <span>￥{{item.restaurant.float_minimum_order_amount}}元起送</span>
                  <div class="price-border">{{item.restaurant.piecewise_agent_fee.description}}</div>
                </div>
                <div class="price">
                  <span>{{$distance(item.restaurant.distance)}}</span>
                  <div class="price-border">{{item.restaurant.order_lead_time}}分钟</div>
                </div>
              </div>
              <ul class="tag-uls">
                <li class="tag-list" v-for="(tag, index) in item.restaurant.support_tags" :key="index">{{tag.text}}</li>
              </ul>
              <div class="activity-w">
                <ul class="activity-uls nowrap">
                  <li class="activity-list" v-for="(activity, index) in item.restaurant.activities" :key="index" v-if="index < 2">
                    <div class="tag-first">{{activity.icon_name}}</div>
                    <span class="nowrap">{{activity.tips}}</span>
                  </li>
                </ul>
                <div class="activity-total">
                  <span>{{item.restaurant.activities.length}}个活动</span>
                  <svg viewBox="0 0 72 32" class="dropdown-icon" fill="#666"><path data-v-a5cc4024="" d="M36 32l36-32h-72z"></path></svg>
                </div>
              </div>
              <ul class="foods-w">
                <li v-for="(food, index) in item.foods" :key="index" v-if="index < 3" class="foods-item">
                  <div class="img-box">
                    <img :src="$imgUrl(food.image_path, 2)" alt="">
                  </div>
                  <p class="name nowrap">{{food.name}}</p>
                  <p class="price">￥{{food.price}}</p>
                </li>
              </ul>
              <div @click="toggleFlag(item, 1)">
                <div v-show="item.flagShow === false">
                  <div v-show="item.foods && item.foods.length > 3" class="more">
                    <span>查看其它相关商品 {{item.foods.length - 3}}个</span>
                    <div class="more-bottom-icon"></div>
                  </div>
                </div>
              </div>
              <div class="more-foods" v-show="item.flagShow === true">
                <ul class="foods-w-2">
                  <li v-for="(food2, index) in item.foods" :key="index" v-if="index >= 3" class="foods-item2">
                    <div class="name nowrap">
                      <div class="nowrap">{{food2.name}}</div>
                      <div class="price">￥{{food2.price}}</div>
                    </div>
                    <p>月售{{food2.month_sales}}份</p>
                  </li>
                </ul>
                <div class="pack-up" @click="toggleFlag(item, 2)"><span>收起</span><div class="more-top-icon"></div></div>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      moreIndex: -1,
      moreShow: false,
      filterIndex: 0,
      recommendSellArr: []
    }
  },
  created () {
    this.userAddress = JSON.parse(localStorage.getItem('_ADDRESS_'))
    this.getGoods()
  },
  methods: {
    toggleFlag (item, tag) {
      if (tag === 1) {
        item.flagShow = true
      } else {
        item.flagShow = false
      }
    },
    // 跳转到 商家中心
    gotoShop (id) {
      this.$router.push({
        path: '/shop',
        query: {id: id}
      })
    },
    goback () {
      this.$router.push('/')
    },
    getGoods () {
      let keyword = this.$route.params.keywords
      this.$api.get('/apis/a/restapi/shopping/v2/restaurants/search', {
        offset: 0,
        limit: 15,
        keyword: keyword,
        latitude: this.userAddress.latitude,
        longitude: this.userAddress.longitude,
        search_item_type: 3,
        is_rewrite: 1,
        extras: ['activities', 'coupon'],
        terminal: 'h5'
      }).then(res => {
        console.log(res)
        let foods = res.inside[0].restaurant_with_foods
        foods.forEach((item, index) => {
          item.flagShow = false
        })
        this.recommendSellArr = foods
        this.recommendSellArr.map(item => {
          item.restaurant.name = item.restaurant.name.replace(keyword, `<span class="height-keyword">${keyword}</span>`)
        })
      })
    },
    choseOne () {},
    choseList () {},
    choseFour () {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.search-keywords
  position: fixed
  left: 0
  top: 0
  height: 100%
  width: 100%
  z-index: 100
  background-color: #fff
  .wrapper
    position: fixed
    left: 0
    top: 100px
    bottom: 0
    width: 100%
  .filter-uls
    width: 100%
    position: fixed
    top: 50px
    left: 0
    z-index: 20
  .shopping-uls
    .foods-w
      display flex
      width: 100%
      margin-top: 10px
      .foods-item
        width 33.33%
        margin-right: 4px
        .img-box
          width: 100%
        .name
          font-size: 12px
          color #333
          margin: 10px 0
        .price
          font-size: 12px
          font-weight: bold
          color #ff5339
    .more
      margin-top: 15px
      display flex
      align-items center
      justify-content center
      font-size: 12px
      color #999
      .more-bottom-icon
        margin-left: 5px
        width: 6px;
        height: 6px;
        display: inline-block;
        border-bottom: 1px solid rgb(167, 167, 167);
        border-right: 1px solid rgb(167, 167, 167);
        transform: rotate(45deg);
    .more-foods
      .foods-item2
        padding: 8px 0
        display flex
        justify-content space-between
        color #999
        font-size: 12px
        .price
          margin-top: 6px
          font-weight: bold
          color #ff5339
      .pack-up
        display flex
        align-items center
        justify-content center
        font-size: 12px
        .more-top-icon
          margin-left: 5px;
          width: 6px;
          height: 6px;
          display: inline-block;
          border-top: 1px solid #a7a7a7;
          border-left: 1px solid #a7a7a7;
          transform: rotate(45deg);
</style>
