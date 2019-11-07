<template>
  <div class="my">
    <fixed-top :title-name="titleName"></fixed-top>
    <!--头部-->
    <div class="top-user" @click="$router.push('/login')">
      <div class="img-avatar">
        <img src="../../assets/images/common/default_avatar.png" alt="">
      </div>
      <div class="login">
        <h3 class="login-text">登录/注册</h3>
        <div class="flex-text">
          <div class="icon-phone">
            <svg fill="#fff">
              <svg viewBox="0 0 655 1024" id="mobile" width="100%" height="100%"><path d="M0 122.501v778.998C0 968.946 55.189 1024 123.268 1024h408.824c68.52 0 123.268-54.846 123.268-122.501V122.501C655.36 55.054 600.171 0 532.092 0H123.268C54.748 0 0 54.846 0 122.501zM327.68 942.08c-22.622 0-40.96-18.338-40.96-40.96s18.338-40.96 40.96-40.96 40.96 18.338 40.96 40.96-18.338 40.96-40.96 40.96zM81.92 163.84h491.52V819.2H81.92V163.84z"></path></svg>
            </svg>
          </div>
          <span>登录后享受更多特权</span>
        </div>
      </div>
      <div class="more-right">
        <div class="more-rihgt-icon"></div>
      </div>
    </div>
    <!--钱包列表-->
    <ul class="main-uls">
      <li class="main-list">
        <svg fill="#0098fb" class="icon-main">
          <svg viewBox="0 0 48 48" id="profile-balance" width="100%" height="100%"><path d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0zm7 28c.6 0 1 .4 1 1s-.4 1-1 1h-6v5c0 .6-.4 1-1 1s-1-.4-1-1v-5h-6c-.6 0-1-.4-1-1s.4-1 1-1h6v-4h-6c-.6 0-1-.4-1-1s.4-1 1-1h5.6c-.6 0-1.3-.3-1.6-.8l-4.6-5.5c-.4-.4-.2-.8.4-.8h1.1c.6 0 1.3.3 1.6.8l4.3 5.1 4.3-5.1c.4-.4 1.1-.8 1.6-.8h1.1c.6 0 .7.3.4.8l-4.6 5.5c-.3.5-1 .8-1.6.8h6c.6 0 1 .4 1 1s-.4 1-1 1h-6v4h6z" class="st0"></path></svg>
        </svg>
        <p class="ma-text">钱包</p>
      </li>
      <li class="main-list">
        <svg fill="#ff5f3e" class="icon-main">
          <svg viewBox="0 0 48 48" id="luckybag" width="100%" height="100%"><path fill-rule="evenodd" d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0zm7.6 15H16.4c.1.1.1.2.1.4.4 2.5 3.3 4.3 7.1 4.4 2.4 0 4.8-.6 6.1-1.6.4-.3 1.1-.3 1.4.2.3.5.3 1.1-.2 1.4-1.6 1.3-4.3 2.1-7.1 2.1h-.5c-3.9-.2-7-2-8.3-4.6V32c0 .5.7 1 1.4 1h15.2c.8 0 1.4-.5 1.4-1V16c0-.5-.7-1-1.4-1zM35 32c0 1.7-1.5 3-3.4 3H16.4c-1.9 0-3.4-1.3-3.4-3V16c0-1.4 1-2.5 2.5-2.9h.2c.1-.1.3-.1.4-.1h15.5c1.9 0 3.4 1.3 3.4 3v16z"></path></svg>
        </svg>
        <p class="ma-text">红包</p>
      </li>
      <li class="main-list">
        <svg fill="#6ac20b" class="icon-main">
          <svg viewBox="0 0 48 48" id="profile-coins" width="100%" height="100%"><path fill-rule="evenodd" d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0zm-9 26.8v3.3c0 1.2 3.6 2.9 9 2.9s9-1.7 9-2.9v-3.3c-2.1 1.3-5.6 1.9-9 1.9-3.4.1-6.9-.6-9-1.9zM24 15c-5.8 0-9 1.8-9 2.8 0 1 3.2 2.8 9 2.8s9-1.8 9-2.8c0-1-3.2-2.8-9-2.8zm-9 5.6V24c0 .9 3.2 2.8 9 2.8s9-1.8 9-2.8v-3.4c-2.1 1.3-5.6 1.9-9 1.9-3.4 0-6.9-.6-9-1.9zM35 24v6.1c0 3.2-5.5 4.9-11 4.9s-11-1.7-11-4.9V17.8c0-3.1 5.5-4.8 11-4.8s11 1.6 11 4.8V24z"></path></svg>
        </svg>
        <p class="ma-text">金币</p>
      </li>
    </ul>
    <!--我的导航-->
    <ul class="my-nav">
      <li class="nav-list address-list">
        <svg fill="#4aa5f0" class="nav-icon">
          <svg viewBox="0 0 16 16" id="address" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="none" d="M0 0h16v16H0z"></path><path fill="#4AA5F0" d="M8 2.667A2.667 2.667 0 1 1 8 8a2.667 2.667 0 0 1 0-5.333M2.273 6.509a5.48 5.48 0 0 1-.051-.732 5.778 5.778 0 1 1 11.556 0 5.54 5.54 0 0 1-.085.948 5.704 5.704 0 0 1-.258.999 6.565 6.565 0 0 1-.081.22c-.016.039-.03.078-.047.116C11.932 11.45 8 13.778 8 13.778S3.734 11.273 2.535 7.64a5.756 5.756 0 0 1-.262-1.132zm8.584 6.701c2.516.124 5.143.43 5.143 1.068 0 .901-5.233 1.138-8 1.138-2.768 0-8-.237-8-1.138 0-.639 2.627-.944 5.143-1.068 1.22 1.044 2.3 1.61 2.404 1.663.14.07.296.108.453.108.156 0 .314-.038.454-.109.104-.052 1.184-.618 2.403-1.662z"></path></g></svg>
        </svg>
        <div class="right-nav">
          <span>我的地址</span>
          <div class="icon-box">
            <div class="more-rihgt-icon2"></div>
          </div>
        </div>
      </li>
      <li class="nav-list money-list">
        <svg fill="#fc7b53" class="nav-icon">
          <svg viewBox="0 0 16 16" id="point" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="none" d="M0 0h16v16H0z"></path><path fill="#94D94A" d="M2.257.5h11.486a1 1 0 0 1 .998.936l.757 11.728a2 2 0 0 1-1.996 2.129H2.498a2 2 0 0 1-1.996-2.129L1.26 1.436A1 1 0 0 1 2.257.5zm9.658 3.782C11.82 6.452 10.14 8.18 7.95 8.18c-2.202 0-3.925-1.747-4.003-3.933a.594.594 0 0 1 .36-1.075.596.596 0 1 1 .25 1.14c.109 1.82 1.548 3.26 3.393 3.26 1.853 0 3.263-1.455 3.357-3.287a.595.595 0 0 1 .3-1.113.595.595 0 1 1 .307 1.11z"></path></g></svg>
        </svg>
        <div class="right-nav">
          <span>金币商城</span>
          <div class="icon-box">
            <div class="more-rihgt-icon2"></div>
          </div>
        </div>
      </li>
      <li class="nav-list share-list">
        <svg fill="" class="nav-icon">
          <svg viewBox="0 0 40 40" id="commend" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path fill="#FC7B53" d="M21 12c-.167-.434-1-1-1-1-.275.437-.767.601-1 1v7H4v-6c0-.843.716-1.562 2-2h6c-1.49.06-2.84-.711-3-2 .06-1.814 1.949-4.528 5-4 2.552.733 4.541 2.943 6 5 1.6-2.094 3.778-4.58 7-5 2.23-.288 4.282 2.198 4 4-.208 1.276-1.582 2.06-3 2h6c1.173.437 1.89 1.156 2 2v6H21v-7zm-7-6c-1.123-.321-1.966.238-3 1 .097.68-.258 1.373 0 2 1.653 1.192 5.452 1.096 8 1-1.202-1.529-2.679-3.07-5-4zm16 3c.726-1.246-1.22-3.714-3-3-2.313 1.075-3.755 2.506-5 4 1.071 0 2.158.023 3 0 1.542-.075 3.965-.16 5-1zM19 36H8c-1.326-.255-2-.907-2-2V20h13v16zm13 0H21V20h13v14c-.47 1.53-1.124 1.745-2 2z"></path></g></svg>
        </svg>
        <div class="right-nav">
          <span>分享拿10元现金</span>
          <div class="icon-box">
            <div class="more-rihgt-icon2"></div>
          </div>
        </div>
      </li>
      <li class="nav-list service-list">
        <svg fill="#4aa5f0" class="nav-icon">
          <svg viewBox="0 0 54 54" id="service" width="100%" height="100%"><g fill="none" fill-rule="evenodd"><path stroke="#4DA6F0" stroke-width="3" d="M48 28c0 11.598-9.402 21-21 21"></path><path fill="#4DA6F0" d="M43 40.012v-18h2a9 9 0 0 1 9 9 9 9 0 0 1-9 9h-2zM10 40.012H9a9 9 0 0 1-9-9 9 9 0 0 1 9-9h1v18zM27 46a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path fill="#4DA6F0" d="M43 24h6c0-12.426-9.574-23-22-23S4 11.574 4 24h6c0-9.098 7.902-17 17-17 9.097 0 16 7.902 16 17z"></path></g></svg>
        </svg>
        <div class="right-nav">
          <span>我的客服</span>
          <div class="icon-box">
            <div class="more-rihgt-icon2"></div>
          </div>
        </div>
      </li>
      <li class="nav-list download-list">
        <svg fill="#3cabff" class="nav-icon">
          <svg viewBox="0 0 40 40" id="download" width="100%" height="100%"><path d="M30 5H10c-2.8 0-5 2.2-5 5v20c0 2.8 2.2 5 5 5h20c2.8 0 5-2.2 5-5V10c0-2.8-2.2-5-5-5zm-3.9 22.7c-.1.2-.3.4-.6.5-4.3 2.8-10.1 1.6-13-2.8-2.8-4.3-1.6-10.2 2.8-13 4.3-2.8 10.2-1.6 13 2.8.2.2.3.5.4.8.1.2 0 .5-.2.7l-8.8 5.7c-.2.2-.6.1-.7-.2l-.5-.7c-.4-.6-.2-1.5.4-1.9l5.6-3.6c.2-.2.3-.5.2-.7l-.1-.1c-2.2-1.8-5.4-2.1-7.9-.4-3.1 2-4 6.1-2 9.2 2 3.1 6.1 4 9.2 2 .6-.4 1.3-.2 1.7.4l.3.7c.1.2.4.5.2.6zm3.1-4.4l-.9.6c-.2.2-.6.1-.7-.2L26.5 22c-.2-.2-.1-.6.2-.7l1.8-1.1c.2-.2.6-.1.7.2l.6.9c.3.6.1 1.5-.6 2z"></path></svg>
        </svg>
        <div class="right-nav">
          <span>下载饿了么APP</span>
          <div class="icon-box">
            <div class="more-rihgt-icon2"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      userId: '',
      titleName: '我的'
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.userId = window.localStorage.getItem('_USER_ID_')
      if (this.userId) {
        this.$api.get(`/apis/a/restapi/eus/v3/users/${this.userId}?`).then(res => {
          console.log(res)
        })
      }
    }
  },
  components: {
    fixedTop: resolve => require(['@/components/fixedTop'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../assets/css/mixin.styl"
img
  width: 100%
  display: block
.my
  width: 100%
  height: 100%
  background-color: #f5f5f5
  .top-user
    display flex
    align-items center
    justify-content space-between
    background-image: linear-gradient(90deg,#0af,#0085ff);
    padding: 10px 10px 30px 10px
    color #fff
    .img-avatar
      width: 70px
      img
        border-radius 50%
    .login
      flex 1
      padding: 0 10px
      .login-text
        font-size: 22px
        margin-bottom: 10px
        font-weight: bold
      .flex-text
        display flex
        font-size: 12px
        .icon-phone,svg
          width: 8px
          height: 13px
        .icon-phone
          margin-right: 4px
    .more-right
      padding-right: 10px
  .main-uls
    display flex
    align-items center
    justify-content center
    background-color: #fff
    border-bottom: 1px solid #ddd
    .main-list
      flex 1
      display flex
      align-items center
      justify-content center
      flex-direction column
      padding: 20px 0
      border-right: 1px solid #ddd
      &:last-child
        border-right: none
      .icon-main
        width: 30px
        height: 30px
      .ma-text
        margin-top: 10px
        font-size: 12px
        font-weight: bold
        color #333
  .my-nav
    margin-top: 10px
    .nav-list
      height: 50px
      background-color: #fff
      color #333
      display flex
      align-items center
      padding-left: 10px
      &.address-list
        margin: 10px 0
        border-top: 1px solid #ddd
        border-bottom: 1px solid #ddd
      &.share-list
        margin-bottom: 10px
        border-bottom: 1px solid #ddd
      &.service-list
        border-top: 1px solid #ddd
        .right-nav
          border-bottom: 1px solid #ddd
      &.money-list
        border-top: 1px solid #ddd
        .right-nav
          border-bottom: 1px solid #ddd
      &.download-list
        border-bottom: 1px solid #ddd
      .right-nav
        height: 100%
        flex 1
        display flex
        align-items center
        justify-content space-between
      .nav-icon
        width: 20px
        height: 20px
        margin-right: 10px
      .icon-box
        padding-right: 10px
      .more-rihgt-icon2
        more-rihgt-icon(6px, #666, 1px)

</style>
