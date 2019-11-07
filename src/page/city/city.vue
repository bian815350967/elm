<template>
  <div class="city-w">
    <div class="fixed-city">
      <fixed-top :title-name="titleName" :isGoBack="true"></fixed-top>
      <div class="top">
        <div class="input-w">
          <div class="icon-search">
            <svg class="icon-fangdajing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
          </div>
          <input type="text" placeholder="输入城市名或者拼音" class="input" @input="searchCity" v-model.trim="cityValue">
        </div>
      </div>
    </div>
    <div class="city-content">
      <div class="current-city" v-if="currentCityShow">
        <div class="title nowrap">当前定位城市</div>
        <div class="address-t nowrap" @click="switchCity(cityA)">{{cityName}}</div>
      </div>
      <!--所有城市-->
      <div class="result-c" ref="wrapper" v-show="cityValue === ''">
        <cube-scroll
          ref="scroll5"
          :scroll-events="['scroll']"
          @scroll="scrollCity"
          :data="cityList">
          <ul class="current-city" v-for="(city, index) in cityList" :key="index" ref="cityList">
            <h3 class="title nowrap">{{city.idx}}</h3>
            <li class="address-s nowrap" v-for="list in city.cities" :key="list.id" @click="switchCity(list)">
              <div class="list">{{list.name}}</div>
            </li>
          </ul>
        </cube-scroll>
        <div class="fixed-title" v-show="fixedTitle" ref="fixed" :class="{'chocse-h': currentCityShow}">
          <div class="fixed-t">{{fixedTitle}}</div>
        </div>
      </div>
      <!-- 搜索结果-->
      <ul class="current-city scroll-w" v-show="cityValue !== ''" ref="wrapper2">
        <cube-scroll
          ref="scroll6"
          :scroll-events="['scroll']"
          :data="searchArr">
          <li class="address-s nowrap" v-for="item in searchArr" :key="item.id" @click="switchCity(item)">
            <div class="list">{{item.name}}</div>
          </li>
          <div class="noresult" v-show="noResult">无结果</div>
        </cube-scroll>
      </ul>
    </div>
    <!--显示触摸的首字母-->
    <div class="fixed-b" v-show="touchShow">
      <div class="first-t">{{currentFirst}}</div>
    </div>
    <!--首字母导航-->
    <div class="city-first-w" v-show="cityValue === ''">
      <ul class="city-first" @touchstart.stop.prevent="ontouchstart" @touchmove.stop.prevent="ontouchmove" @touchend.stop.prevent="ontouchEnd">
        <li class="acronym" v-for="(item, index) in alphabet" :data-index="index" :key="index" :class="{'current-list': currentIndex === index}">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getData} from '@/assets/js/dom'
const TITLE_HEIGHT = 40
const ANCHOR_HEIGHT = 22

export default {
  data () {
    return {
      noResult: false,
      touchShow: false,
      currentFirst: '',
      diff: -1,
      scrollY: -1,
      currentIndex: 0,
      optionsCity: {},
      cityValue: '',
      currentCityShow: false,
      alphabet: [],
      cityList: [],
      searchArr: [],
      cityHeightArr: [],
      titleName: '城市选择',
      cityName: '',
      cityA: ''
    }
  },
  created () {
    this.touch = {}
    this.getCity()
    if (this.$route.query.cityName) {
      this.currentCityShow = true
      this.cityA = JSON.parse(this.$route.query.cityName)
      this.cityName = JSON.parse(this.$route.query.cityName).name
    }
  },
  mounted () {
  },
  methods: {
    switchCity (list) {
      this.cityName = list.name
      this.$router.push({
        path: '/shippingAddress',
        query: {
          position: JSON.stringify(list)
        }
      })
    },
    refresh () {
      this.$refs.scroll5.refresh()
    },
    // 获取城市
    getCity () {
      this.$api.get('/apis/b' + '/lib/city-list@0.0.3/city_list.json').then(res => {
        this.alphabet = res.alphabet
        this.cityList = res.cityList
        this.$refs.scroll5.refresh()
      })
    },
    // 搜索城市
    searchCity () {
      this.currentCityShow = false
      if (this.cityValue !== '') {
        let cityArr = []
        this.cityList.forEach(item => {
          item.cities.forEach(list => {
            if (list.pinyin.indexOf(this.cityValue) === 0 || list.name.indexOf(this.cityValue) > -1) {
              cityArr.push(list)
            }
          })
        })
        this.searchArr = cityArr
        if (this.searchArr.length === 0) {
          this.noResult = true
        } else {
          this.noResult = false
          this.$refs.scroll6.refresh()
        }
      }
    },
    // 滚动时y轴的高度
    scrollCity (pos) {
      this.scrollY = pos.y
    },
    // 计算每个字母所在城市 距离顶部的高度
    calcListHight () {
      let hightArr = []
      let listItem = this.$refs.cityList
      let height = 0
      hightArr.push(height)
      listItem.forEach((item, index) => {
        height += item.clientHeight
        hightArr.push(height)
      })
      this.cityHeightArr = hightArr
    },
    // 滑动开始
    ontouchstart (e) {
      let aIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = aIndex
      this.currentFirst = this.alphabet[aIndex]
      this._scrollTo(aIndex)
      this.touchShow = true
    },
    // 滑动时
    ontouchmove (e) {
      this.touchShow = true
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let aIndex = parseInt(this.touch.anchorIndex) + delta
      if (aIndex < 0) {
        this.currentFirst = this.alphabet[0]
      } else if (aIndex > this.alphabet.length - 1) {
        this.currentFirst = this.alphabet[this.alphabet.length - 1]
      } else {
        this.currentFirst = this.alphabet[aIndex]
      }
      this._scrollTo(aIndex)
    },
    // 滑动结束了
    ontouchEnd () {
      setTimeout(() => {
        this.touchShow = false
      }, 2000)
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.cityHeightArr.length - 2) {
        index = this.cityHeightArr.length - 2
      }
      this.scrollY = -this.cityHeightArr[index]
      this.$refs.scroll5.scrollToElement(this.$refs.cityList[index], 0)
    }
  },
  computed: {
    // 首字母标题
    fixedTitle () {
      if (this.scrollY > 0 || !this.cityList.length) {
        return
      }
      return this.cityList[this.currentIndex].idx
    }
  },
  watch: {
    // scroll 滚动
    scrollY (newY) {
      // 下拉
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 滚动到中间
      for (let i = 0; i < this.cityHeightArr.length - 1; i++) {
        let height1 = this.cityHeightArr[i]
        let height2 = this.cityHeightArr[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 最后一个小于高度
      this.currentIndex = this.cityHeightArr.length - 2
    },
    diff (newVal) {
      let fixedTop
      if (newVal > 0 && newVal < TITLE_HEIGHT) {
        fixedTop = newVal - TITLE_HEIGHT
      } else {
        fixedTop = 0
      }
      if (this.fixedTop === fixedTop) {
        return false
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px,0)`
    },
    cityList () {
      setTimeout(() => {
        this.calcListHight()
      }, 20)
    }
  },
  components: {
    fixedTop: resolve => require(['@/components/fixedTop'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.city-w
  width: 100%
  min-height 100%
  background-color: #fff
  .scroll-w
    width: 100%
    height: 100%
    .noresult
      text-align: center
      margin-top: 100px
      font-size: 14px
      color #333
  .fixed-city
    width: 100%
    position: fixed
    left: 0
    top: 0
    z-index: 10
    background-image: linear-gradient(90deg,#0af,#0085ff);
    .top
      padding:0 20px 10px 20px
    .input-w
      position: relative
      .icon-search
        position: absolute
        left: 10px
        top: 50%
        transform translateY(-50%)
        width: 14px
        height: 14px
      .input
        width: 100%
        padding: 8px 8px 8px 30px
        border-radius 15px
        background-color: #fff
        font-size: 12px
  .city-content
    position: fixed
    left: 0
    top: 90px
    bottom: 0
    width: 100%
    .result-c
      width: 100%
      height: 100%
    .current-city
      position: relative
      z-index: 20
      .title
        background-color: #f5f5f5
        padding: 0 30px 0 10px
        font-size: 12px
        color #666
        line-height: 40px
        border-bottom: 1px solid #ddd
      .address-t
        background-color: #fff
        padding: 0 30px 0 10px
        font-size: 14px
        color #000
        line-height: 50px
    .address-s
      background-color: #fff
      padding-left: 10px
      font-size: 14px
      color #000
      line-height: 50px
      &:last-child
        .list
          border-bottom: none
      .list
        padding-right: 30px
        border-bottom: 1px solid #ddd
  .city-first-w
    position: fixed
    right: 10px
    top: 50%
    transform translateY(-50%)
    margin-top: 45px
    .acronym
      text-align: center
      color #999
      font-size: 10px
      padding: 5px
      &.current-list
        color #0089dc
  .fixed-title
    position: absolute
    left: 0
    top: 0
    width: 100%
    z-index: 10
    &.chocse-h
      top: 91px
    .fixed-t
      background-color: #f5f5f5;
      padding: 0 30px 0 10px;
      font-size: 12px;
      color: #666;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
  .fixed-b
    position: fixed
    right: 50px
    top: 50%
    transform translateY(-50%)
    .first-t
      width: 40px
      height: 40px
      border-radius 50%
      display flex
      align-items center
      justify-content center
      color #fff
      background-color: #0089dc
</style>
