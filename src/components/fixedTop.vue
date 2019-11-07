<template>
  <div class="fixed-top">
    <div class="goback" v-show="isGoBack" @click="goBack">
      <div class="goback-icon"></div>
    </div>
    <div class="name nowrap" :class="{'padding-left': !isGoBack}">{{titleName}}</div>
    <div></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  props: {
    titleName: '',
    isGoBack: false,
    isGoNumber: false
  },
  methods: {
    goBack () {
      if (this.isGoBack === true && !this.isGoNumber) { // 返回上一页
        this.$router.go(-1)
      } else if (this.isGoBack === true && this.isGoNumber === true) { // 返回指定的页面
        this.$emit('goPath')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.fixed-top
  position: relative
  left: 0
  top: 0
  height: 50px
  width: 100%
  background-image: linear-gradient(90deg,#0af,#0085ff);
  display flex
  align-items center
  z-index: 10
  .goback
    width: 50px
    box-sizing border-box
    padding: 10px 10px 10px 20px
  .name
    padding-right: 50px
    text-align: center
    font-size: 18px
    font-weight: bold
    color #fff
    &.padding-left
      padding-left: 50px
</style>
