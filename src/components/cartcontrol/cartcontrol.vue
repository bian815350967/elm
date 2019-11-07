<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease-w" v-show="item.count > 0" @click.stop.prevent="decreaseCart">
        <div class="cart-decrease">
          <svg style="fill: rgb(35,149,255);" viewBox="0 0 44 44" id="cart-add" width="100%" height="100%"><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clip-rule="evenodd"></path></svg>
        </div>
      </div>
    </transition>
    <div class="cart-cont" v-show="item.count > 0">{{item.count}}</div>
    <div class="add-w" @click.stop.prevent="addCart">
      <div class="add">
        <svg style="fill: rgb(35, 149, 255);" viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'

export default {
  data () {
    return {}
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.item.count) {
        Vue.set(this.item, 'count', 1)
      } else {
        this.item.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      this.item.count--
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartcontrol
  display flex
  align-items center
  .cart-decrease
    width: 22px
    height: 22px
    transform rotate(0)
    transition all .3s linear
  .add
    width: 22px
    height: 22px
  .cart-decrease-w
    padding: 6px
    transform translate3d(0,0,0)
    opacity: 1
    &.move-enter-active,&.move-leave-active
      transition all .4s linear
    &.move-enter,&.move-leave-to
      opacity 0
      transform translate3d(24px,0,0)
      .cart-decrease
        transform rotate(180deg)
  .add-w
    padding: 6px
  .cart-cont
    font-size: 14px
    padding: 0 4px
</style>
