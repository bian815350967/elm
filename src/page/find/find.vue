<template>
  <div class="find">
    <fixed-top :title-name="titleName"></fixed-top>
    <div class="">
      <div class="banner-img">
        <img src="../../assets/images/common/horseman.jpeg" alt="">
      </div>
      <div class="gift-w">
        <div class="gift-right">
          <a class="recommend-gift item-gift" v-for="(item, index) in discoverArr" :key="index" :class="{'first-gift border-right-1px': index === 0, 'border-bottom-1px': index === 1}" :href="item.content_url" target="_blank">
            <div class="left">
              <div class="title re-title" :style="{color: item.title_color}">{{item.title}}</div>
              <p class="desc">{{item.subtitle}}</p>
            </div>
            <div class="img-box">
              <img :src="$imgUrl(item.main_pic_hash, 8)" alt="">
            </div>
          </a>
        </div>
      </div>
      <div class="time-limit-w">
        <div class="time-limit-title">
          <div class="line left"></div>
          <div class="lock-icon">
            <svg viewBox="-4 3 30 30" fill="#F94843" id="alarm" width="100%" height="100%"><g id="alarm_页面"><g id="alarm_发现页_新增天天特价_确认" transform="translate(-31 -1587)"><g id="alarm_商品" transform="translate(-2 1556)"><g id="alarm_Page-1"><path d="M10 29.9c-7.2 0-13-5.8-13-13 0-2 .4-3.9 1.3-5.7C.5 6.7 5 3.9 10 3.9c7.2 0 13 5.8 13 13s-5.8 13-13 13zM.1 12.1C-.7 13.6-1 15.2-1 16.9c0 6.1 4.9 11 11 11s11-4.9 11-11-4.9-11-11-11c-4.3 0-8.1 2.3-9.9 6.2z" class="st0" transform="translate(34 32)"></path><path d="M-1 12.1c-1.8-.9-3-2.7-3-4.8C-4 4.4-1.6 2 1.3 2c2 0 3.8 1.1 4.7 2.8l-1.8 1C3.7 4.7 2.5 4 1.3 4-.5 4-2 5.5-2 7.3c0 1.3.7 2.4 1.8 3l-.8 1.8zM21 11.8l-1-1.7c1-.6 1.6-1.7 1.6-2.8 0-1.8-1.5-3.3-3.3-3.3-1.3 0-2.5.8-3.1 2l-1.8-.8c.8-2 2.8-3.3 4.9-3.3 2.9 0 5.3 2.4 5.3 5.3-.1 2-1 3.7-2.6 4.6zM14.3 20.2h-4.2c-.6 0-1-.4-1-1v-8.1c0-.6.4-1 1-1s1 .4 1 1v7.1h3.2c.6 0 1 .4 1 1s-.4 1-1 1zM-1.2 32c-.2 0-.5-.1-.7-.3-.4-.4-.4-1-.1-1.4l4-4.5c.4-.4 1-.4 1.4-.1.4.4.4 1 .1 1.4l-4 4.5c-.2.3-.4.4-.7.4zM21.5 32c-.3 0-.5-.1-.7-.3l-4-4.5c-.4-.4-.3-1 .1-1.4.4-.4 1-.3 1.4.1l4 4.5c.4.4.3 1-.1 1.4-.2.1-.4.2-.7.2z" class="st0" transform="translate(34 32)"></path></g></g></g></g></svg>
          </div>
          <div class="text">限时好礼</div>
          <div class="line right"></div>
        </div>
        <p class="msg-text">金币换好礼</p>
      </div>
      <ul class="gift-uls">
        <a class="gift-list nowrap" v-for="(item, index) in giftsArr" :key="index" v-if="index < 3" :href="item.url" target="_blank">
          <span class="tag-icon">{{item.corner_marker}}</span>
          <div class="gift-img">
            <img :src="$imgUrl(item.image_hash, 8)" alt="">
          </div>
          <p class="gift-desc nowrap">{{item.title}}</p>
          <div class="money-w">
            <span class="current-price">{{item.points_required}}金币</span>
            <del class="delete-price">￥{{item.original_price}}</del>
          </div>
        </a>
      </ul>
      <div class="more">
        <span>查看更多</span>
        <div class="more-rihgt-icon2"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      titleName: '发现',
      discoverArr: [],
      giftsArr: []
    }
  },
  created () {
    this.getGifts()
    this.getDiscover()
  },
  methods: { // https://h5.ele.me/restapi/member/gifts/suggest
    // 限时优惠
    getGifts () {
      this.$api.get('/apis/a/restapi//member/gifts/suggest').then(res => {
        this.giftsArr = res
      })
    },
    // 发现好礼
    getDiscover () {
      this.$api.get('/apis/a/restapi/member/v1/discover', {
        platform: 1,
        block_index: 0
      }).then(res => {
        this.discoverArr = res[1]
      })
    }
  },
  components: {
    fixedTop: resolve => require(['@/components/fixedTop'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
img
  width: 100%
  display: block
.find
  padding-bottom: 30px
  .banner-img
    width 100%
  .gift-w
    display flex
    background-color: #fff
    border-bottom: 1px solid #ededed
    .gift-left
      width: 50%
      padding: 10px
      display flex
      .title
        font-size: 14px
        color rgb(255, 153, 0);
        margin-bottom: 10px
      .desc
        font-size: 12px
        color #333
      .img-box
        margin-top: 10px
        margin-left: 10px
        width: 75px
        height: 75px
        align-self flex-end
    .gift-right
      .ambitus-gift
        border-top: 1px solid #ededed
      .item-gift
        float: left
        height: 80px
        width: 50%
        display flex
        align-items center
        justify-content space-between
        padding: 10px
        box-sizing border-box
        &.first-gift
          height: 160px
          display block
          .left
            padding: 10px 0
          .img-box
            width: 75px
            height: 75px
            float: right
        .left
          .title
            font-size: 14px
            margin-bottom: 10px
          .re-title
            color rgb(27, 169, 225)
          .ambitus-title
            color rgb(237, 102, 96)
          .desc
            font-size: 12px
        .img-box
          width: 45px
          height: 45px
  .time-limit-w
    padding: 10px
    margin-top: 10px
    background-color: #fff
    .time-limit-title
      display: flex
      align-items center
      justify-content center
      margin-left: -18px
      .line
        width: 16px
        height: 1px
        background-color: #000
        position: relative
        &::before
          content ''
          position: absolute
          top: -2px
          width: 5px
          height: 5px
          background-color: #000
          border-radius 50%
        &.left::before
          left: 100%
        &.right::before
          left: 0
      .lock-icon
        margin: 0 10px
        width: 15px
        height: 15px
      .text
        font-size: 16px
        font-weight: bold
        color #000
        margin-right: 10px
    .msg-text
      text-align: center
      color #999
      font-size: 12px
      margin-top: 2px
  .gift-uls
    display flex
    align-items center
    padding-left: 15px
    background-color: #fff
    .gift-list
      flex 1
      margin-right: 15px
      padding-bottom: 10px
      position: relative
      .tag-icon
        background-color: #413d3c
        color #fff
        font-size: 12px
        padding: 4px
        position: absolute
        left: 0
        top: 0
      .gift-img
        width: 100%
        height 110px
      .gift-desc
        color #333
        font-size: 12px
        margin: 10px 0
      .money-w
        display flex
        align-items center
        .current-price
          color: #ff5339
          font-size: 14px
        .delete-price
          color #aaa
          font-size: 12px
  .more
    background-color: #fff
    padding: 20px 0
    display flex
    align-items center
    justify-content center
    font-size: 14px
    color #999
    .more-rihgt-icon2
      margin-left: 6px
      width: 6px;
      height: 6px;
      display: inline-block;
      border-top: 1px solid #999;
      border-right: 1px solid #999;
      transform: rotate(45deg);
</style>
