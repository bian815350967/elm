<template>
  <div class="search-w">
    <div>
      <form class="fixed-top-search" @submit.prevent="searchKeyWords">
        <div class="goback" @click="goback">
          <svg viewBox="0 0 20 32" class="goback-icon-svg" fill="#999" width="100%" height="100%"><path d="M16.552 5.633l-2.044-2.044L2.243 15.854l12.265 12.557 2.044-2.044L6.331 15.854z"></path></svg>
        </div>
        <div class="input-w">
          <svg class="icon-fangdajing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
          <input type="text" placeholder="输入商家、商品名称" class="input" v-model.trim="keyWords" @input="inputKey">
          <div class="delete" @click="deleteInput" v-show="changeInputShow">
            <div class="icon icon1"></div>
            <div class="icon icon2"></div>
          </div>
        </div>
        <button type="submit" class="btn-search" @submit.prevent="searchKeyWords">搜索</button>
      </form>
    </div>
    <div class="content">
      <!--历史搜索-->
      <div v-show="historyShow" class="history-search search-main">
        <div class="history-title">
          <h3 class="hot-title">历史搜索</h3>
          <div class="icon-delete">
            <svg viewBox="0 0 512 512" class="delete-svg" width="100%" height="100%"><path d="M64 160v320c0 17.6 14.4 32 32 32h288c17.6 0 32-14.4 32-32V160H64zm96 288h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zM424 64H320V24c0-13.2-10.8-24-24-24H184c-13.2 0-24 10.8-24 24v40H56c-13.2 0-24 10.8-24 24v40h416V88c0-13.2-10.8-24-24-24zm-136 0h-96V32.401h96V64z"></path></svg>
          </div>
        </div>
        <ul class="hot-uls">
          <li class="hot-list">一点点</li>
          <li class="hot-list">一点点</li>
          <li class="hot-list">一点点</li>
          <li class="hot-list">一点点</li>
        </ul>
      </div>
      <!-- 热门搜索-->
      <div v-show="hotShow" class="hot-search search-main">
        <h3 class="hot-title">热门搜索</h3>
        <ul class="hot-uls">
          <li class="hot-list" v-for="(item, index) in hotArr" :key="index" @click="gotoKeywords(item.word)">{{item.word}}</li>
        </ul>
      </div>
      <!--手动搜索-->
      <div v-show="findShow" class="find-search">
        <ul class="shop-uls">
          <li class="shop-list" v-for="(item, index) in restaurantsArr" :key="index">
            <div class="logo-img">
              <img :src="$imgUrl(item.image_path, 11)" alt="">
            </div>
            <div class="shopmian-d">
              <div class="nowrap shop-name-w">
                <div class="shop-name" v-html="filterKeyLight(item.name)"></div>
                <div v-for="(tag, index) in item.tags" :key="index">
                  <div class="tag" :style="{'background-color': tag.name_color}">{{tag.name}}</div>
                </div>
              </div>
              <div class="ratting">评价{{item.rating}}</div>
            </div>
          </li>
        </ul>
        <ul class="dim-uls">
          <li class="dim-list" v-for="(word, index) in wordsArr" :key="index">
            <div class="icon-f">
              <svg class="icon-fangdajing-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path></svg>
            </div>
            <div class="dim-right nowrap" v-html="filterKeyLight(word)"></div>
          </li>
        </ul>
      </div>
      <!--暂无数据-->
      <div class="no-result" v-show="noRes">
        <div class="img-box">
          <img src="../../assets/images/common/no_word.png" alt="">
        </div>
        <div class="no-result-p">
          <p class="no-result-text1">附近没有搜索结果</p>
          <p class="no-result-text2">换个关键词试试吧</p>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      restaurantsArr: [],
      wordsArr: [],
      userAddress: '',
      noRes: false,
      historyShow: false,
      hotShow: true,
      findShow: true,
      hotArr: [],
      keyWords: '' // 关键字
    }
  },
  created () {
    this.userAddress = JSON.parse(localStorage.getItem('_ADDRESS_'))
    this.getHotKey()
  },
  methods: {
    gotoKeywords (keywords) {
      this.$router.push({
        path: `/search/${keywords}`
      })
    },
    searchKeyWords () {
      if (this.keyWords !== '') {
        this.$router.push({
          path: `/search/${this.keyWords}`
        })
      }
      return false
    },
    // input 事件
    inputKey () {
      if (this.keyWords !== '') {
        this.hotShow = false
        this.$api.get('/apis/a/restapi/shopping/v1/typeahead', {
          kw: this.keyWords,
          latitude: this.userAddress.latitude,
          longitude: this.userAddress.longitude,
          city_id: this.userAddress.city_id
        }).then(res => {
          this.restaurantsArr = res.restaurants
          this.wordsArr = res.words
        })
      } else {
        this.restaurantsArr = []
        this.wordsArr = []
        this.hotShow = true
      }
    },
    // 热门搜索
    getHotKey () {
      this.$api.get('/apis/a/restapi/shopping/v3/hot_search_words', {
        latitude: this.userAddress.latitude,
        longitude: this.userAddress.longitude
      }).then(res => {
        this.hotArr = res
      })
    },
    goback () {
      this.$router.go(-1)
    },
    // 清除input框
    deleteInput () {
      this.keyWords = ''
    },
    filterKeyLight (text) {
      if (!this.keyWords) return text
      let word = text.replace(new RegExp(this.keyWords, 'g'), `<span class="height-keyword">${this.keyWords}</span>`)
      return word
    }
  },
  computed: {
    changeInputShow () {
      if (this.keyWords !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
img
  width: 100%
  display: block
.search-w
  background-color: #fff
  min-height: 100vh
  width: 100%
  .delete
    position: absolute
    width: 20px
    height: 20px
    right: 10px
    top: 50%
    transform translateY(-50%)
    .icon
      width: 15px
      height: 2px
      background-color: #000
      position absolute
      top: 50%
      left: 3px
      transform translateY(-50%)
    .icon1
      transform rotate(45deg)
    .icon2
      transform rotate(-45deg)
  .content
    padding-top: 61px
    .search-main
      padding: 10px
      .hot-title
        font-size: 16px
        color #666
        font-weight: bold
        line-height: 32px
      .hot-uls
        display flex
        align-items center
        flex-wrap wrap
        .hot-list
          padding: 10px
          color #666
          background-color: #f7f7f7
          border-radius 4px
          margin: 10px 10px 0 0
      .history-title
        display flex
        align-items center
        justify-content space-between
        .icon-delete
          padding: 10px
          .delete-svg
            width: 10px
            color #cecece
            fill #CECECE
    .find-search
      padding: 10px 10px 0
      .shop-uls
        .shop-list
          display flex
          align-items center
          height: 56px
          .logo-img
            width: 24px
            height: 24px
            margin-right: 10px
          .shopmian-d
            flex 1
            height: 100%
            border-bottom: 1px solid #e3e3e3
            display flex
            align-items center
            .shop-name-w
              flex 1
              display flex
              align-items center
              .shop-name
                max-width 56vw
                font-size: 14px
                color #333
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: middle;
              .tag
                color #fff
                padding: 2px
                border-radius 2px
                font-size: 12px
                margin-left: 4px
            .ratting
              color #999
              font-size: 14px
      .dim-uls
        .dim-list
          display flex
          align-items center
          height 56px
          .icon-f
            width: 13px
            height: 13px
            margin-right: 10px
          .dim-right
            flex 1
            line-height: 56px
            font-size: 14px
            color #333
            border-bottom: 1px solid #e3e3e3
    .no-result
      display flex
      align-items center
      justify-content center
      .img-box
        width: 100px
      .no-result-p
        margin-left: 10px
      .no-result-text1
        font-size: 12px
        margin-bottom: 10px
      .no-result-text2
        font-size: 12px
</style>
