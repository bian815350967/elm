<template>
  <div>
    <!--底部购物车-->
    <div class="shopcart">
      <div class="shopcart-wrap" @click="showMenu">
        <div class="cart-box" ref="cartbox">
          <div class="cart-border" :class="{'avtive-cartborder': totalCount > 0}">
            <div class="cart-i" :class="{'avtive-cart': totalCount > 0}"></div>
          </div>
          <div class="count" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="cart-msg-box nowrap">
          <p :class="{'total': totalCount > 0}">{{totalPrice}}</p>
          <p>另需配送费{{shopRst.float_delivery_fee}}元</p>
        </div>
        <div class="pay-btn" :class="payCls">{{minOrderAmount}}</div>
      </div>
      <!--小球动画-->
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="enterDrop" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <!--选中的商品-->
      <transition name="slide">
        <div class="shopcart-select" v-show="menuBox">
          <div class="header">
            <div>已选商品</div>
            <div class="empty">
              <div class="empty-icon">
                <svg style="fill: #ddd" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 15" id="cart-remove" width="100%" height="100%"><g fill="none" fill-rule="evenodd" transform="translate(1)"><path fill="#979797" d="M7.05 15h-5.5c-.303 0-.55-.26-.55-.583V5.091c0-.322.246-.583.55-.583.304 0 .55.26.55.583v8.743h4.95c1.032 0 2-.426 2.728-1.2A4.18 4.18 0 0 0 10.9 9.735l-.03-7.15c0-.323.245-.585.548-.586h.003c.302 0 .548.26.55.58L12 9.732a5.374 5.374 0 0 1-1.442 3.724C9.622 14.451 8.376 15 7.05 15z"></path><path fill="#979797" d="M12.458 3H.542C.242 3 0 2.776 0 2.5S.243 2 .542 2h11.916c.3 0 .542.224.542.5s-.243.5-.542.5"></path><path fill="#979797" d="M5 2h3V1H5v1zm3.464 1H4.536C4.24 3 4 2.776 4 2.5v-2c0-.276.24-.5.536-.5h3.928C8.76 0 9 .224 9 .5v2c0 .276-.24.5-.536.5z" mask="url(#cart-remove_b)"></path></g></svg>
              </div>
              <span>清空</span>
            </div>
          </div>
          <cube-scroll
            ref="scroll8"
            class="shop-w"
            :scroll-events="['scroll']"
            :data="selectFoods">
            <ul class="shop-uls">
              <li class="shop-items" v-for="(item, index) in selectFoods" :key="index">
                <div class="name">
                  <p>{{item.name}}</p>
                </div>
                <div class="count">￥{{item.specfoods[0].price}}</div>
                <div>
                  <cartcontrol :item="item" @add="addFood"></cartcontrol>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </div>
    <!--遮罩层-->
    <transition name="fade">
      <div class="shopcart-dialog" @click="hideMenu" v-show="menuBox"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '@/components/cartcontrol/cartcontrol'

export default {
  data () {
    return {
      selelctCartShow: false,
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      dropBalls: [],
      menuBoxShow: true
    }
  },
  props: {
    shopRst: '',
    selectFoods: {
      type: Array
    }
  },
  computed: {
    // 总 件数
    totalCount () {
      let count = 0
      this.selectFoods.forEach(item => {
        count += item.count
      })
      return count
    },
    // 总价
    totalPrice () {
      if (this.totalCount > 0) {
        let price = 0
        this.selectFoods.forEach(item => {
          price += item.count * item.specfoods[0].price
        })
        return `￥${price}`
      }
      return '未选购商品'
    },
    // 起送价
    minOrderAmount () {
      if (this.totalCount === 0) {
        let amount = 0
        if (this.shopRst.float_minimum_order_amount) {
          amount = Number(this.shopRst.float_minimum_order_amount)
        }
        return `￥${amount}起送 `
      }
      let totalMoney = this.totalPrice
      let totalMoney2 = Number(totalMoney.slice(1, totalMoney.length))
      if (totalMoney2 < this.shopRst.float_minimum_order_amount) {
        let totalMoney3 = (this.shopRst.float_minimum_order_amount * 1000 - totalMoney2 * 1000) / 1000
        return `还差￥${totalMoney3}元起送`
      } else {
        return '去结算'
      }
    },
    // 结算class
    payCls () {
      let totalMoney = this.totalPrice
      let totalMoney2 = Number(totalMoney.slice(1, totalMoney.length))
      if (!totalMoney2) {
        return ''
      }
      if (totalMoney2 < this.shopRst.float_minimum_order_amount) {
        return 'short-pay'
      } else {
        return 'pay-now'
      }
    },
    // 是否显示选中的菜单
    menuBox () {
      /*eslint-disable*/
      if (!this.selectFoods.length) {
        this.menuBoxShow = true
        return false
      }
      let show = !this.menuBoxShow
      if (show) {
        this.$nextTick(() => {
          this.$refs.scroll8.refresh()
        })
      }
      return show
    }
  },
  methods: {
    boxAnima () {
      let el = this.$refs.cartbox
      el.style.animation = 'scaleBox .5s .3s linear forwards'
      el.addEventListener('animationend', () => {
        el.style.animation = ''
      })
    },
    showMenu () {
      if (!this.selectFoods.length) {
        return
      }
      this.menuBoxShow = !this.menuBoxShow
    },
    hideMenu () {
      this.menuBoxShow = true
    },
    addFood (event) {
      this.boxAnima()
      this.$nextTick(() => {
        this.drop(event)
      })
    },
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 25
          let y = -(window.innerHeight - rect.top - 25)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enterDrop (el, done) {
      /*eslint-disable*/
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0, 0, 0)`
        el.style.transform = `translate3d(0, 0, 0)`
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = `translate3d(0, 0, 0)`
        inner.style.transform = `translate3d(0, 0, 0)`
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    }
  },
  watch: {
    selectFoods () {
      this.$refs.scroll8.refresh()
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.shopcart-dialog
  position: fixed
  left: 0
  top: 0
  bottom: 50px
  width: 100%
  background-color: #000
  backdrop-filter: blur(10px)
  opacity: .4
  z-index: 200
  &.fade-enter-active,&.fade-leave-active
    transition all .4s linear
  &.fade-enter,&.fade-leave-to
    opacity 0
.shopcart
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  height: 50px
  z-index: 500
  .shopcart-wrap
    width: 100%
    height: 100%
    display flex
    align-items center
    background-color: rgba(61,61,63,.9)
    position: relative
    z-index: 200
    .cart-box
      position: absolute
      left: 10px
      bottom: 10px
      transform scale(1)
      z-index: 600
      .count
        background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%);
        color: #fff;
        padding: 0 5px
        height: 16px
        line-height: 16px
        border-radius 16px
        position: absolute
        right: 0
        top: 0
        font-size: 10px
      .cart-border
        width: 50px
        height: 50px
        border-radius 50%
        border: 5px solid #444
        background-color: #363636
        display flex
        align-items center
        justify-content center
        &.avtive-cartborder
          background-color: #3190e8
      .cart-i
        width: 20px
        height: 20px
        background: url("../../assets/images/common/normal_cart.svg") no-repeat center
        &.avtive-cart
          background: url("../../assets/images/common/active_cart.svg") no-repeat center
    .cart-msg-box
      padding-left: 70px
      height: 100%
      flex 1
      display flex
      justify-content center
      flex-direction column
      font-size: 12px
      color #999
      p
        line-height: 1.5
      .total
        color #fff
        font-size: 14px
        font-weight: bold
    .pay-btn
      width: 100px
      height: 100%
      display: flex
      align-items center
      justify-content center
      font-weight: bold
      color #fff
      background-color: #535356
      &.short-pay
        font-size: 10px
      &.pay-now
        font-size: 14px
        color #fff
        background-color: #38ca73
  .ball-container
    .ball
      position: fixed
      left: 25px
      bottom: 25px
      z-index: 200
      transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: all .4s linear
  .shopcart-select
    position: absolute
    left: 0
    top: 0
    width: 100%
    box-sizing: border-box;
    background-color: #fff
    transform translate3d(0,-100%,0)
    z-index: 20
    &.slide-enter-active,&.slide-leave-active
      transition all .3s linear
    &.slide-enter,&.slide-leave-to
      transform translate3d(0,0,0)
    .empty-icon
      width: 15px
      height: 15px
    .header
      height: 40px
      padding: 0 15px
      display flex
      align-items center
      justify-content space-between
      font-size: 12px
      color #333
      background-color: #eceff1
      .empty
        display: flex
        align-items center
    .shop-w
      max-height 270px
      overflow: hidden
      position: relative
    .shop-uls
      .shop-items
        padding: 10px 15px
        display flex
        align-items center
        font-size: 12px
        border-bottom: 1px solid #eee
        .name
          flex 1
        .count
          color: #eb6551;
          font-size: 10px
          padding: 0 5px
</style>
