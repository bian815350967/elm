<template>
  <div class="rating-w">
    <div class="ratting-box">
      <div class="item total-num">4.4</div>
      <div class="item">
        <p class="title">商家评分</p>
        <div class="star">☆☆☆☆☆</div>
      </div>
      <div class="item">
        <p class="title">味道</p>
        <p class="rating-num">4.2</p>
      </div>
      <div class="item">
        <p class="title">包装</p>
        <p class="rating-num">4.2</p>
      </div>
      <div class="item distribution-item">
        <p class="title">配送</p>
        <p class="rating-num">4.2</p>
      </div>
    </div>
    <div class="ratting-con">
      <ul>
        <li>全部</li>
        <li>全部</li>
        <li>全部</li>
        <li>全部</li>
        <li>全部</li>
      </ul>
      <div class="content-rat">
        <i></i>
        <span>只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.rating-w
  .ratting-box
    display flex
    align-items center
    padding: 10px 10px 15px
    margin-bottom: 10px
    .item
      flex 1
      display flex
      align-items center
      justify-content center
      flex-direction column
      color #666
      .title
        font-size: 10px
        margin-bottom: 6px
      .rating-num
        font-size: 14px
    .total-num
      font-size: 20px
      color #ff6000
    .distribution-item
      border-left: 1px solid #ddd
</style>
