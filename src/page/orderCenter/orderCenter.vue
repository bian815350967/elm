<template>
  <div class="find">
    <fixed-top :title-name="titleName"></fixed-top>
    <div class="nologin-w">
      <div class="img-order">
        <img src="../../assets/images/common/no-order.png" alt="">
      </div>
      <div class="nologin-msg">登录后查看外卖订单</div>
      <div class="btn-login">立即登录</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      titleName: '订单'
    }
  },
  components: {
    fixedTop: resolve => require(['@/components/fixedTop'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
img
  display block
  width: 100%
.find
  height: 100%
  background-color: #f5f5f5
  .nologin-w
    margin-top: 50px
    display flex
    align-items center
    justify-content center
    flex-direction column
    .img-order
      width: 80%
    .nologin-msg
      font-size: 16px
      color #333
      margin: 10px 0
    .btn-login
      background-color: #56d176
      color #fff
      font-size: 14px
      border-radius 4px
      padding: 10px 30px
</style>
