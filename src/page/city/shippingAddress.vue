<template>
  <transition name="fade">
    <div class="shipping-address">
      <div class="fixed">
        <fixed-top :title-name="titleName" :isGoBack="true"></fixed-top>
        <div class="form-search">
          <div class="search-left" @click="gotoCity">
            <span class="city-text nowrap">{{cityName}}</span>
            <div class="sanjiao-bottom"></div>
          </div>
          <div class="input-w">
            <div class="icon-search">
              <svg class="icon-fangdajing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
            </div>
            <input type="text" placeholder="请输入地址" class="input-address" v-model.trim="detailedAddress" @input="inputAddress">
          </div>
        </div>
      </div>
      <div class="content-w">
        <div>
          <div class="no-address-data" v-show="errAddress">
            <div class="img-box">
              <img src="../../assets/images/common/noAddress.gif" alt="">
            </div>
            <p class="no-s">没有搜索结果</p>
            <p class="exchange">换个关键字试试</p>
          </div>
        </div>
        <div class="address-w">
          <cube-scroll
            ref="scroll7"
            :options="options"
            @pulling-down="onPullingDown"
            :scroll-events="['scroll']"
            :data="addressArr">
            <ul class="address-uls">
              <li class="address-list" v-for="item in addressArr" :key="item.id" @click="switchAddress(item)">
                <div class="fixed-b">
                  <h3 class="city nowrap">{{item.name}}</h3>
                  <div class="distance">{{item.distance}}</div>
                </div>
                <p class="detailed-address nowrap">{{item.address}}</p>
              </li>
            </ul>
            <div class="tips" v-show="addressArr.length > 0">
              <p class="cannot-find">找不到地址？</p>
              <p class="p-desc">请尝试只输入小区、写字楼或学校名</p>
              <p class="p-desc">详细地址（如门牌号）可稍后输入</p>
            </div>
            <template slot="pulldown" slot-scope="props">
              <div v-if="props.pullDownRefresh"
                   class="cube-pulldown-wrapper"
                   :style="props.pullDownStyle">
                <div v-if="props.beforePullDown"
                     class="before-trigger"
                     :style="{paddingTop: props.bubbleY + 'px'}">
                  <span :class="{rotate: props.bubbleY > 0}">↓</span>
                </div>
                <div class="after-trigger" v-else>
                  <div v-show="props.isPullingDown" class="loading">
                    <cube-loading></cube-loading>
                  </div>
                  <transition name="success">
                    <div v-show="!props.isPullingDown" class="text-wrapper"><span class="refresh-text">刷新成功</span></div>
                  </transition>
                </div>
              </div>
            </template>
          </cube-scroll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      beforePullDown: true,
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        }
      },
      cityName: '',
      detailedAddress: '',
      errAddress: false,
      pageSize: 20,
      titleName: '选择收货地址',
      position: '',
      secondStop: 40,
      addressArr: []
    }
  },
  created () {
    if (this.$route.query.position) {
      this.position = JSON.parse(this.$route.query.position)
      this.cityName = this.position.name
    } else {
      this.cityName = '选择城市'
    }
  },
  methods: {
    // 选择城市
    gotoCity () {
      this.$router.push({
        path: '/city',
        query: {
          cityName: this.$route.query.position
        }
      })
    },
    onPullingDown () {
      setTimeout(() => {
        this.inputAddress()
        this.$refs.scroll7.scrollTo(0, this.secondStop, 300)
      }, 1000)
    },
    // 搜索地址
    inputAddress () {
      if (this.detailedAddress !== '') {
        let searchData = {
          keyword: this.detailedAddress,
          offset: 0,
          limit: this.pageSize
        }
        if (this.$route.query.position) {
          searchData.latitude = this.position.latitude
          searchData.longitude = this.position.longitude
        }
        this.$api.get('/apis/a' + '/restapi/bgs/poi/search_poi_nearby_alipay', searchData).then(res => {
          if (res.length > 0) {
            this.addressArr = res
            this.$refs.scroll7.refresh()
            this.errAddress = false
            this.options.pullDownRefresh = true
          } else {
            this.addressArr = []
            this.options.pullDownRefresh = false
            this.errAddress = true
          }
        })
      } else {
        this.options.pullDownRefresh = false
        this.addressArr = []
      }
    },
    switchAddress (list) {
      window.localStorage.setItem('_ADDRESS_', JSON.stringify(list))
      this.$router.push({path: '/'})
    }
  },
  components: {
    fixedTop: resolve => require(['@/components/fixedTop'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.fade-enter-active, .fade-leave-active
  transition: all .3s linear;
.fade-enter, .fade-leave-to
  transform translate3d(100%, 0, 0)
.shipping-address
  width: 100%
  height: 100%
  position: fixed
  left: 0
  top: 0
  bottom: 0
  background-color: #fff
  z-index: 200
  .form-search
    display flex
    align-items center
    background-color: #fff
    .search-left
      display flex
      align-items center
      font-size: 12px
      color #333
      height: 56px
      padding: 0 10px 0 20px
      .city-text
        width 40px
      .sanjiao-bottom
        margin-left: 6px
        border-top-color: #333
    .input-w
      position: relative
      flex 1
      margin-right: 15px
      .icon-search
        position: absolute
        left: 10px
        top: 50%
        transform translateY(-50%)
        width: 14px
        height: 14px
      .input-address
        width: 100%
        padding: 10px 10px 10px 33px;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 12px;
  .fixed
    position: fixed
    left: 0
    top: 0
    width: 100%
    z-index: 10
  .text-wrapper
    // margin-top: 40px
    text-align: center
    width: 100%
    position: relative
    z-index: 10
    .refresh-text
      color #0089dc
      font-size: 14px
  .content-w
    position: fixed
    left: 0
    top: 106px
    bottom: 0
    width: 100%
    background-color: #f4f4f4
  .no-address-data
    margin-top: 100px
    height: 100%
    display flex
    align-items center
    justify-content space-between
    flex-direction column
    .img-box
      width: 200px
    .no-s
      font-size: 16px
      color #6a6a6a
      font-weight: 400
      margin: 20px 0
    .exchange
      font-size: 12px
  .address-w
    background-color: #f4f4f4
    height: 100%
    overflow: hidden
  .address-uls
    background-color: #fff
    &.pull-h
      padding-top: 20px
    .address-list
      padding: 10px
      border-bottom: 1px solid #eee
      &:last-child
        border-bottom none
      .fixed-b
        display flex
        align-items center
        justify-content space-between
        margin-bottom: 10px
        .distance
          font-size: 12px
          color #333
      .city
        font-size: 14px
        font-weight: bold
        color #333
      .detailed-address
        font-size: 12px
  .tips
    background-color: #fff
    display flex
    align-items center
    justify-content center
    flex-direction column
    color #999
    padding: 30px 0
    .cannot-find
      font-size: 16px
      margin-bottom: 10px
    .p-desc
      font-size: 12px
      margin-bottom: 4px
</style>
