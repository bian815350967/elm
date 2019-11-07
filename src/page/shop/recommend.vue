<template>
  <div class="recommend">
    <div v-if="shopRst.posters" v-for="(img, index) in shopRst.posters" :key="index" class="img-posters">
      <img :src="$imgUrl(img.image_hash, 10)" alt="" class="img">
    </div>
    <!--推荐列表-->
    <div v-if="shopRecommend">
      <h3 class="goods-recommend">{{shopRecommend.name}}</h3>
      <div>
        <div class="recommend-list-wrap">
          <ul class="list-wrapper">
            <li v-for="(item, index) in shopRecommend.items" class="list-item" :key="index">
              <div class="img-box">
                <img :src="$imgUrl(item.image_path, 4)" alt="">
              </div>
              <p class="name nowrap">{{item.name}}</p>
              <p class="rating"><span>月售{{item.month_sales}}</span><span class="margin-left">好评率{{item.satisfy_rate}}%</span></p>
              <div class="moneys">
                <div class="start-pric" v-for="(price, index) in item.specfoods" v-if="index === 0" :key="index">
                  <span class="start">￥</span>{{price.price}}<span class="start" v-if="item.specfoods.length > 1">起</span>
                </div>
                <div class="add">
                  <svg style="fill: rgb(35, 149, 255);">
                    <svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg>
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--商品列表-->
    <div class="goods-content">
      <!--左边菜单-->
      <div class="left-scroll">
        <cube-scroll
          ref="scroll6"
          :scroll-events="['scroll']"
          :data="shoppingMenu">
          <ul class="padding-uls">
            <li ref="leftList" v-for="(item, index) in shoppingMenu" :key="index" class="list-nav" :class="{'current-nav': index === currentIndex}" @click="listOne(index)">
              <img :src="$imgUrl(item.icon_url, 7)" alt="" v-if="item.icon_url" class="img-icon">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </cube-scroll>
      </div>
      <!--右边菜单-->
      <div class="right-scroll">
        <cube-scroll
          ref="scroll7"
          @scroll="scrollRight"
          :scroll-events="['scroll']"
          :data="shoppingMenu">
          <ul class="big-uls padding-uls">
            <li class="big-list" v-for="(shop, index) in shoppingMenu" :key="index" ref="menuList">
              <h3 class="big-title" ref="titleBig"><span>{{shop.name}}</span><span class="nowrap des-name">{{shop.description}}</span></h3>
              <div v-for="(item, index) in shop.foods" :key="index" class="foods-items">
                <div class="img-box">
                  <img :src="$imgUrl(item.image_path, 2)" alt="">
                </div>
                <div class="foods-desc">
                  <p class="name">{{item.name}}</p>
                  <p class="des nowrap">{{item.description}}</p>
                  <p class="rating"><span>月售{{item.month_sales}}</span><span class="margin-left">好评率{{item.satisfy_rate}}%</span></p>
                  <div v-if="item.activity && item.activity.benefit_text" class="discount">
                    <span class="benefit-text">{{item.activity.benefit_text}}</span>
                    <span>{{item.activity.applicable_quantity_text}}</span>
                  </div>
                  <div class="moneys">
                    <div class="start-pric" v-for="(list, index) in item.specfoods" :key="index" v-if="index === 0">
                      <span class="start">￥</span>{{list.price}}<span class="start" v-if="item.specfoods.length > 1">起</span>
                    </div>
                    <!--添加商品控制器-->
                    <cartcontrol :item="item" @add="addFood"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
        <!--吸顶标题-->
        <div class="fixed-title" v-if="this.shoppingMenu.length > 0 && rightScrollY < 0" ref="fixedTitle">
          <div class="title-content">
            <span>{{fixedName}}</span>
            <span class="nowrap des-name">{{fixedDesc}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--底部购物车-->
    <shopcart :shopRst="shopRst" ref="shopcart" :selectFoods="selectFoods"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import shopcart from '@/components/shopcart/shopcart'
const TITLE_HEIGHT = 22

export default {
  data () {
    return {
      diff: -1,
      heightArr: [],
      // currentIndex: 0,
      rightScrollY: -1
    }
  },
  props: {
    shoppingMenu: '',
    shopRst: '',
    isFixedGoods: false,
    shopRecommend: {}
  },
  methods: {
    addFood (event) {
      this.$refs.shopcart.boxAnima()
      this._drop(event)
    },
    _drop (event) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(event)
      })
    },
    // 左侧菜单点击
    listOne (index) {
      console.log(this.currentIndex)
      // this.currentIndex = index
      // this.rightScrollY = -this.heightArr[index + 1]
      this.$refs.scroll7.scrollToElement(this.$refs.menuList[index], 300)
    },
    scrollRight (pos) {
      this.rightScrollY = pos.y
      /*
      for (let i = 0; i < this.heightArr.length - 1; i++) {
        let leftList = this.$refs.leftList
        let el = leftList[i]
        this.$refs.scroll6.scrollToElement(el, 500, 0, -100)
      }
      */
    },
    // 计算高度
    calcMenuContentHeight () {
      let hightArr = []
      let listItem = this.$refs.menuList
      let height = 0
      hightArr.push(height)
      listItem.forEach((item, index) => {
        height += item.clientHeight
        hightArr.push(height)
      })
      this.heightArr = hightArr
    },
    _foodScroll (index) {
      let leftList = this.$refs.leftList
      let el = leftList[index]
      this.$refs.scroll6.scrollToElement(el, 300, 0, -100)
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.heightArr.length; i++) {
        let height1 = this.heightArr[i]
        let height2 = this.heightArr[i + 1]
        let rightScrollY = Math.abs(this.rightScrollY)
        if (!height2 || (rightScrollY >= height1 && rightScrollY < height2)) {
          this._foodScroll(i)
          return i
        }
      }
      return 0
    },
    // 吸顶标题
    fixedName () {
      if (this.rightScrollY > 0 || !this.shoppingMenu.length) {
        return
      }
      return this.shoppingMenu[this.currentIndex].name
    },
    // 吸顶标题
    fixedDesc () {
      if (this.rightScrollY > 0 || !this.shoppingMenu.length) {
        return
      }
      return this.shoppingMenu[this.currentIndex].description
    },
    // 选择的商品
    selectFoods () {
      let foods = []
      this.shoppingMenu.forEach(good => {
        good.foods.forEach(item => {
          if (item.count) {
            foods.push(item)
          }
        })
      })
      return foods
    }
  },
  watch: {
    rightScrollY (rNewY) {
      if (rNewY > 0) {
        // this.currentIndex = 0
        return
      }
      for (let i = 0; i < this.heightArr.length - 1; i++) {
        let height1 = this.heightArr[i]
        let height2 = this.heightArr[i + 1]
        if (-rNewY >= height1 && -rNewY < height2) {
          // this.currentIndex = i
          this.diff = height2 + rNewY
          return
        }
      }
      // 最后一个小于高度
      // this.currentIndex = this.heightArr.length - 2
    },
    diff (newVal) {
      let fixedTop
      if (TITLE_HEIGHT && newVal > 0 && newVal < TITLE_HEIGHT) {
        fixedTop = newVal - TITLE_HEIGHT
      } else {
        fixedTop = 0
      }
      if (this.fixedTop2 === fixedTop) {
        return false
      }
      this.fixedTop2 = fixedTop
      if (this.$refs.fixedTitle) {
        this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px,0)`
      }
    },
    shoppingMenu () {
      setTimeout(() => {
        this.calcMenuContentHeight()
      }, 20)
    }
  },
  components: {
    cartcontrol,
    shopcart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.recommend
  overflow: hidden
  position: relative
  display flex
  flex-direction column
  .img-posters
    padding: 10px
    .img
      border-radius 4px
  .margin-left
    margin-left: 5px
  .goods-recommend
    padding-left: 10px
    font-size: 16px
    color #000
    font-weight: bold
    line-height: 50px
  .recommend-list-wrap
    background-color: #fff
    padding-left: 10px
    padding-bottom: 20px
    width: 100%
    overflow-x auto
    z-index: 10
    >>> .cube-scroll-content
      z-index: 10
      display inline-block
    .list-wrapper
      width auto
      display flex
      .list-item
        display block
        width: 120px
        margin-right: 10px
        .img-box
          width: 120px
          height: 120px
          img
            width: 100%
            display: block
        .name
          margin-top: 10px
          font-size: 14px
          color #333
        .rating
          font-size: 10px
          color #999
          margin: 10px 0
        .moneys
          display flex
          align-items center
          justify-content space-between
          .start-pric
            font-size: 16px
            font-weight: bold
            color: rgb(255, 83, 57);
            .start
              font-size: 14px
              font-weight:normal
          .add,svg
            width: 22px
            height: 22px
            use
              width: 22px
              height: 22px
              font-size: 22px
              display: block
            #cart-minus
              width: 22px
  .goods-content
    display flex
    background-color: #fff
    height calc(100vh - 84px)
    overflow: hidden
    // padding-bottom: 50px
    .padding-uls
      padding-bottom: 50px
    .left-scroll
      height 100%
      width: 80px
      min-width 80px
      overflow: hidden
      background-color: #f8f8f8
      &.fixed-good
        position: fixed
        left: 0
        top: 84px
        bottom: 0
      .list-nav
        padding: 10px 5px
        font-size: 12px
        line-height: 1.5
        display: flex
        align-items center
        color #333
        word-wrap:break-word;
        white-space normal
        &.current-nav
          background-color: #fff
          span
            font-weight: bold
        .img-icon
          width: 13px
          margin-right: 4px
    .right-scroll
      background-color: #fff
      overflow-y: auto
      overflow-x hidden
      flex 1
      position: relative
      .fixed-title
        position: absolute
        left: 0
        top: 0
        z-index: 100
        width: 100%
        background-color: #f8f8f8
        border-left: 2px solid #d9dde1
        color #333
        font-size: 12px
        font-weight:bold
        padding: 5px 0 5px 8px
        .title-content
          display flex
        .des-name
          margin-left: 5px
          font-size: 11px
          color #999
      .big-uls
        .big-list
          .big-title
            width: 100%
            background-color: #f8f8f8
            border-left: 2px solid #d9dde1
            color #333
            font-size: 12px
            font-weight:bold
            padding: 5px 0 5px 8px
            display flex
            .des-name
              margin-left: 5px
              font-size: 11px
              color #999
          .foods-items
            display flex
            padding: 10px 0 15px 10px
            .img-box
              width: 95px
              min-width 95px
              height: 95px
              margin-right: 10px
              img
                width: 100%
                height: 100%
            .foods-desc
              flex 1
              padding-right: 15px
              overflow: hidden
              .discount
                color: #eb6551;
                font-size: 10px
                .benefit-text
                  font-size: 10px
                  border: 1px solid rgba(235,102,82,.3);
                  margin-right: 4px
                  padding: 0 2px
                  border-radius 4px
              .name
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: middle;
                margin-top: 10px
                font-size: 16px
                font-weight: bold
                color #333
              .des
                font-size: 12px
                color #999
                margin-top: 8px
              .rating
                font-size: 12px
                color #999
                margin: 10px 0
              .moneys
                display flex
                align-items center
                justify-content space-between
                .start-pric
                  font-size: 16px
                  font-weight: bold
                  color: rgb(255, 83, 57);
                  .start
                    font-size: 14px
                    font-weight:normal
                .add,svg
                  width: 22px
                  height: 22px
                  use
                    width: 22px
                    height: 22px
                    font-size: 22px
                    display: block
                  #cart-minus
                    width: 22px
</style>
