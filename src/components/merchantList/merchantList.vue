<template>
  <ul class="shopping-uls">
    <li class="shopping-list border-bottom-1px" @click="gotoShop(item.restaurant.id)" v-for="(item, index) in recommendSellArr" :key="index">
      <div class="goods-logo">
        <img :src="$imgUrl(item.restaurant.image_path, 1)" alt="">
      </div>
      <div class="goods-info">
        <div class="top-title">
          <h3 class="goods-title nowrap">
            <span class="brand">品牌</span>
            <span class="title-text nowrap">{{item.restaurant.name}}</span>
          </h3>
          <div class="right">
            <span class="add">广告</span>
            <div class="solt">...</div>
          </div>
        </div>
        <div class="star-w">
          <div class="star-l">
            <div class="star">☆☆☆☆☆</div>
            <span class="grade-num">{{item.restaurant.rating}}</span>
            <span>月售{{item.restaurant.recent_order_num}}单</span>
          </div>
          <div class="hummingbird">蜂鸟专送</div>
        </div>
        <div class="money">
          <div class="price">
            <span>￥{{item.restaurant.float_minimum_order_amount}}元起送</span>
            <div class="price-border">{{item.restaurant.piecewise_agent_fee.description}}</div>
          </div>
          <div class="price">
            <span>{{distance(item.restaurant.distance)}}</span>
            <div class="price-border">{{item.restaurant.order_lead_time}}分钟</div>
          </div>
        </div>
        <ul class="tag-uls">
          <li class="tag-list" v-for="(tag, index) in item.restaurant.support_tags" :key="index">{{tag.text}}</li>
        </ul>
        <div class="activity-w">
          <ul class="activity-uls nowrap">
            <li class="activity-list" v-for="(activity, index) in item.restaurant.activities" :key="index" v-if="index < 2">
              <div class="tag-first">{{activity.icon_name}}</div>
              <span class="nowrap">{{activity.tips}}</span>
            </li>
          </ul>
          <div class="activity-total">
            <span>{{item.restaurant.activities.length}}个活动</span>
            <svg viewBox="0 0 72 32" class="dropdown-icon" fill="#666"><path data-v-a5cc4024="" d="M36 32l36-32h-72z"></path></svg>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  props: {
    recommendSellArr: {
      type: Array
    }
  },
  methods: {
    // 跳转到 商家中心
    gotoShop (id) {
      this.$router.push({
        path: '/shop',
        query: {id: id}
      })
    },
    distance (length) {
      if (length >= 1000) {
        let len = (length / 1000).toFixed(2)
        return len + 'km'
      } else {
        return length + 'm'
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shopping-uls
    padding:0 10px
    .shopping-list
      display flex
      padding: 16px 0
      .goods-logo
        width: 80px
        height: 80px
        border: 1px solid #ddd
        margin-right: 10px
      .goods-info
        flex 1
        overflow: hidden
        .top-title
          flex-center()
          .goods-title
            flex 1
            .title-text
              font-size: 16px
              color #000
              font-weight: bold
            .brand
              background-image: linear-gradient(-139deg,#fff100,#ffe339);
              padding: 4px
              font-size: 12px
              font-weight: bold
              border-radius 2px
              color #000
              margin-right: 4px
          .right
            flex-center()
            justify-content center
            font-size: 12px
            .add
              padding: 0 5px
              color #666
            .solt
              vertical-align middle
              padding: 0 5px
              margin-left: 5px
              margin-top: -5px
              flex-center()
              justify-content center
        .star-w
          flex-center()
          justify-content space-between
          margin: 12px 0 8px
          font-size: 12px
          .star-l
            color #666
            flex-center()
          .star
            font-size: 16px
            color #fff100
          .grade-num
            margin: 0 6px
          .hummingbird
            color #fff
            background-image: linear-gradient(45deg,#0085ff,#0af)
            border: 1px solid #f5f5f5
            padding: 2px
        .money
          flex-center()
          justify-content space-between
          font-size: 12px
          color #666
          .price
            flex-center()
            .price-border
              padding: 0 5px
              border-left: 1px solid #f5f5f5
              margin-left: 8px
        .tag-uls
          flex-center()
          margin: 10px 0 18px
          color #666
          .tag-list
            padding: 1px 2px
            margin-right: 4px
            border: 1px solid #f5f5f5
            font-size: 12px
            border-radius 2px
        .activity-w
          display: flex
          .activity-uls
            flex 1
            .activity-list
              flex-center()
              font-size: 12px
              color #666
              margin-bottom: 5px
              padding-right: 10px
              .tag-first
                font-size: 12px
                color #fff
                background-color: rgb(112, 188, 70)
                padding: 1px 2px
                border-radius 2px
                margin-right: 5px
          .activity-total
            height: 14px
            flex-center()
            font-size: 12px
            color #666
            .dropdown-icon
              width: 6px
              margin-left: 6px
</style>
