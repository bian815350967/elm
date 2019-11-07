<template>
  <div id="app">
    <input type="text" style="display: none">
    <input type="password" style="display: none;">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'assets/css/common.styl'
  @import 'assets/css/color.styl'
</style>
