<template>
  <div class="login-w">
    <div class="login-c">
      <h1 class="login">
        <svg viewBox="0 0 142 58" id="logo" width="100%" height="100%"><g fill="#1B9DFF" fill-rule="evenodd"><path d="M75.689 1.189h-1.306a.64.64 0 0 0-.641.638v2.592a.64.64 0 0 0 .64.638h2.612a.64.64 0 0 0 .64-.638V3.128a1.945 1.945 0 0 0-1.945-1.94M46.802 1.188h-2.888a.64.64 0 0 0-.641.638v4.842c0 .344.274.729.64.729h4.408c.485.02.982.363.999.979V12.9a.64.64 0 0 0 .641.638h2.359a.64.64 0 0 0 .64-.638V5.459a1.943 1.943 0 0 0-1.945-1.938h-3.573V1.826a.64.64 0 0 0-.64-.638"></path><path d="M50.076 30.517H48.29a.848.848 0 0 1-.848-.845V10.3a.64.64 0 0 0-.64-.638h-2.609a.64.64 0 0 0-.64.638v20.42a3.682 3.682 0 0 0 3.684 3.671h2.838a.64.64 0 0 0 .64-.638v-2.6a.64.64 0 0 0-.64-.637M123.349 1.64h-3.148a1.876 1.876 0 0 0-.248.016l-.08.012a1.92 1.92 0 0 0-.46.143l-.015.007a1.89 1.89 0 0 0-.5.34c-.11.128-12.315 14.334-12.504 14.578l-.01.013a.62.62 0 0 0 .454 1.05h3.149a2.166 2.166 0 0 0 .248-.017l.085-.013c.156-.028.31-.075.455-.141l.075-.036a1.906 1.906 0 0 0 .547-.42l12.415-14.49a.62.62 0 0 0-.463-1.042M86.132 34.37h7.843c2.143 0 3.886-1.737 3.886-3.872V17.316c0-.525.193-1.03.543-1.423.086-.101 9.336-10.882 9.448-11.01.019-.022.187-.183.187-.986v-.758c0-.77-.46-1.468-1.172-1.777l-.02-.01a2.184 2.184 0 0 0-.257-.085l-.07-.017-.034-.009a.423.423 0 0 0-.045-.007l-.094-.015-.056-.008h-.014l-.02-.001-.043-.002a1.57 1.57 0 0 0-.11-.007h-.059l-25.137.005a.677.677 0 0 0-.677.675v1.721c0 .55.293 1.05.747 1.273.176.086.405.141.723.174l.174.016.396.005h18.695a.433.433 0 0 1 .33.713L94.28 14.36a2.043 2.043 0 0 0-.523 1.363v13.78c0 .489-.4.887-.891.887l-5.944-.001c-.81 0-1.468.656-1.468 1.463v1.925c0 .348.28.592.678.592M132.984 2.03a1.94 1.94 0 0 0-.456.14l-.074.037a1.932 1.932 0 0 0-.547.419L108.393 30.13c-.193.249-.393.505-.393.877v1.097c0 1.069.873 1.939 1.946 1.939h27.495c2.105 0 3.818-1.707 3.818-3.805l-.001-.01v-4.754a.085.085 0 0 1 0-.018v-.528c0-.806-.66-1.463-1.469-1.463h-1.898a.664.664 0 0 0-.664.663v5.024a.876.876 0 0 1-.877.873l-21.11.001a.435.435 0 0 1-.423-.432c0-.103.036-.201.1-.277L137.292 3.04a.62.62 0 0 0 .163-.418.625.625 0 0 0-.625-.623h-3.513a2.014 2.014 0 0 0-.248.017l-.085.012zM71.04 34.392l5.953-.002a.64.64 0 0 0 .641-.639l-.007-1.851c0-.763-.623-1.384-1.388-1.384h-4.044a.965.965 0 0 1-.95-.95v-6.489h5.879a.51.51 0 0 0 .51-.508V19.71a.51.51 0 0 0-.51-.509h-5.88v-5.664h5.74a.64.64 0 0 0 .64-.637v-2.6a.64.64 0 0 0-.64-.638h-5.74V1.827a.64.64 0 0 0-.641-.638h-2.608a.64.64 0 0 0-.64.638v7.836h-5.452V5.064h1.874a.64.64 0 0 0 .641-.638V1.828a.64.64 0 0 0-.64-.638h-8.484a.64.64 0 0 0-.64.638v2.598a.64.64 0 0 0 .64.638h2.72v4.599h-2.72a.64.64 0 0 0-.64.638v2.598a.64.64 0 0 0 .64.639h2.72v5.664h-2.85a.51.51 0 0 0-.51.509v2.858c0 .28.228.508.51.508h2.85v6.57c0 .465-.38.845-.848.845h-1.872a.64.64 0 0 0-.64.638v2.598a.64.64 0 0 0 .64.639h2.925a3.682 3.682 0 0 0 3.684-3.672v-7.618h1.937a.51.51 0 0 0 .51-.508V19.71a.51.51 0 0 0-.51-.509h-1.937v-5.664h5.451v16.974c0 2.176 1.619 3.88 3.685 3.88M9.08 2.854C.864 8.17-1.472 19.118 3.864 27.304c5.335 8.188 16.322 10.514 24.538 5.197.476-.307.931-.635 1.367-.98a.973.973 0 0 0 .208-1.288l-.001-.002-.002-.002-.819-1.257a2.566 2.566 0 0 0-3.527-.759l-.015.009-.014.01c-5.844 3.77-13.649 2.114-17.441-3.706-3.796-5.824-2.135-13.612 3.71-17.394 4.727-3.059 10.742-2.561 14.878.822a.973.973 0 0 1-.1 1.56l-10.564 6.837a2.546 2.546 0 0 0-.753 3.53l.861 1.322c.295.452.9.58 1.354.287l16.583-10.73a.974.974 0 0 0 .344-1.25l-.02-.04c-.253-.48-.53-.954-.833-1.42C28.282-.135 17.296-2.462 9.08 2.855"></path><path d="M33.978 17.333l-3.322 2.15a.972.972 0 0 0-.287 1.347l2.157 3.31a.98.98 0 0 0 1.353.286l1.66-1.074a2.941 2.941 0 0 0 .87-4.078l-1.078-1.654a.98.98 0 0 0-1.353-.287M33.072 53.504v-1.088h-5.856v-4.112h4.992v-1.088h-4.992V43.2h5.856v-1.088H26v11.392h7.072zm7.856-7.872H39.68l-2.16 6.32-2.144-6.32h-1.248l2.88 7.872h1.024l2.896-7.872zm7.488 4.24h-5.312c0 1.728.816 2.72 2.32 2.72.912 0 1.44-.272 2.064-.896l.784.688c-.8.8-1.536 1.216-2.88 1.216-2.08 0-3.44-1.248-3.44-4.032 0-2.544 1.232-4.032 3.232-4.032 2.032 0 3.232 1.472 3.232 3.808v.528zm-1.152-.864c-.032-.64-.064-.88-.24-1.312-.304-.72-1.008-1.184-1.84-1.184-.832 0-1.536.464-1.84 1.184-.176.432-.208.672-.24 1.312h4.16zm8.848-2.736c-.56-.56-1.136-.736-1.888-.736-.912 0-1.776.4-2.208 1.056v-.96h-1.152v7.872h1.152v-4.832c0-1.2.736-2.112 1.888-2.112.608 0 .928.144 1.36.576l.848-.864zm7.024-.64h-1.248l-2.144 6.32-2.16-6.32h-1.248l2.832 7.712-.56 1.536c-.256.72-.496.976-1.296.976h-.352v1.024h.496c.56 0 1.12-.144 1.536-.544.224-.208.4-.496.56-.928l3.584-9.776zm4.64 7.872v-.992h-.608c-.736 0-1.072-.432-1.072-1.152v-4.8h1.68v-.88h-1.68v-2.464h-1.152v2.464h-.992v.88h.992v4.832c0 1.168.672 2.112 2.016 2.112h.816zm8.48 0v-5.056c0-1.776-1.056-2.912-2.832-2.912-.88 0-1.632.304-2.208.96v-4.384h-1.152v11.392h1.152V48.64c0-1.36.784-2.08 1.968-2.08s1.92.704 1.92 2.08v4.864h1.152zm3.952 0v-7.872h-1.152v7.872h1.152zm.08-10.112v-1.296h-1.296v1.296h1.296zm9.008 10.112v-5.04c0-.912-.256-1.648-.816-2.192-.48-.48-1.168-.736-2.016-.736-.88 0-1.648.32-2.208.96v-.864h-1.152v7.872h1.152v-4.848c0-1.376.768-2.096 1.952-2.096s1.936.704 1.936 2.096v4.848h1.152zm8.608.24c0 1.952-1.216 3.376-3.28 3.376-1.184 0-1.84-.304-2.672-1.056l.752-.736c.576.512.976.784 1.888.784 1.52 0 2.16-1.072 2.16-2.416v-1.232c-.64.816-1.36 1.024-2.208 1.024-.8 0-1.488-.288-1.904-.704-.784-.784-.96-2-.96-3.28 0-1.28.176-2.496.96-3.28.416-.416 1.12-.688 1.92-.688.864 0 1.568.192 2.208 1.024v-.928h1.136v8.112zm-1.152-4.24c0-1.472-.24-2.944-1.952-2.944s-1.968 1.472-1.968 2.944.256 2.944 1.968 2.944 1.952-1.472 1.952-2.944zm13.936.896c0-1.424-.592-2.352-1.744-2.784 1.024-.464 1.536-1.328 1.536-2.528 0-1.856-1.28-3.088-3.136-3.088-1.728 0-3.072 1.088-3.2 2.928h1.152c.112-1.168.848-1.904 2.048-1.904 1.104 0 1.984.72 1.984 2.08 0 1.28-.64 2.064-2.032 2.064h-.24v1.008h.24c1.552 0 2.24.832 2.24 2.208 0 1.392-.96 2.208-2.192 2.208-1.088 0-2.096-.56-2.192-1.984H104c.096 2.064 1.552 3.008 3.344 3.008 1.856 0 3.344-1.12 3.344-3.216zm8.288.064c0 1.888-1.344 3.136-3.12 3.136s-3.12-1.248-3.12-3.136v-5.312c0-1.888 1.344-3.136 3.12-3.136s3.12 1.248 3.12 3.136v5.312zm-1.152-.064v-5.184c0-1.248-.704-2.176-1.968-2.176s-1.968.928-1.968 2.176V50.4c0 1.248.704 2.176 1.968 2.176s1.968-.928 1.968-2.176zm5.008-6.944v-1.344h-1.392v2.608l1.392-1.264z"></path></g></svg>
      </h1>
      <form @submit.prevent="login" class="form">
        <div class="form-item">
          <input type="tel" placeholder="手机号" class="input" maxlength="11" v-model="number" @input="inputNum">
          <div class="send" :class="{'send-clas': isSend}" @click="mobileSendCode">{{sendBtnText}}</div>
        </div>
        <div class="form-item">
          <input type="number" placeholder="验证码" class="input" v-model="code">
        </div>
        <div class="tips">新用户登录即自动注册，并表示已同意<a href="javascript:;" class="protocol">《用户服务协议》</a></div>
        <button type="submit" class="submit" @submit.prevent="login">登录</button>
        <div class="about">关于我们</div>
      </form>
    </div>
    <div class="err-box" v-show="isErrshow">{{errMsg}}</div>
    <!--图形验证码弹窗-->
    <div class="dialog" v-show="needImgCode">
      <div class="dialog-w" @click="cancel">
        <div class="dialog-c" @click.stop>
          <div class="dialog-close"></div>
          <h3 class="title">请填写图形验证码</h3>
          <div class="input-w">
            <div class="input-c">
              <input type="text" class="text-input" v-model.trim="imgCode">
              <div class="img-code" @click="switchOne">
                <img :src="captcha_image" alt="">
              </div>
            </div>
          </div>
          <div class="err-imgCode" v-show="errImgCode">
            <img src="../../assets/images/common/errorMsg.png" alt="">
            <span class="err-t">{{errImgCode}}</span>
          </div>
          <div class="btn-w">
            <button type="button" class="btn" @click="cancel">取消</button>
            <button type="button" class="btn" @click="mobileSendCode">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      userId: '',
      sendBtnText: '获取验证码',
      validate_token: '',
      captcha_hash: '',
      captcha_image: '',
      imgCode: '',
      needImgCode: false,
      isSend: false,
      isErrshow: false,
      number: '',
      code: '',
      timer: null,
      downTime: 30, // 倒计时
      errImgCode: '',
      errMsg: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    login () {
      // https://h5.ele.me/restapi/eus/login/login_by_mobile
      // mobile: "15013704219"
      // validate_code: "865356"
      // validate_token: "be87dba3f9e8f5d80d20e9da01b5f2521a1cc35e41e7bf248a0b17fd520c9049"
      let reg = /^1[34578]\d{9}$/
      if (this.number === '') {
        this.errMsg = '请填写手机号'
        this.isErrshow = true
        setTimeout(() => {
          this.isErrshow = false
        }, 2000)
        return false
      }
      if (!(reg.test(this.number))) {
        this.errMsg = '请填写合法的手机号'
        this.isErrshow = true
        setTimeout(() => {
          this.isErrshow = false
        }, 2000)
        return false
      }
      if (this.sendBtnText === '获取验证码') {
        this.errMsg = '请先获取验证码'
        this.isErrshow = true
        setTimeout(() => {
          this.isErrshow = false
        }, 2000)
        return false
      }
      if (String(this.code).trim() === '') {
        this.errMsg = '请填写验证码'
        this.isErrshow = true
        setTimeout(() => {
          this.isErrshow = false
        }, 2000)
        return false
      }
      this.$api.post('/apis/a/restapi/eus/login/login_by_mobile', {
        mobile: this.number,
        validate_code: this.code,
        validate_token: this.validate_token
      }).then(res => {
        console.log(res)
        this.userId = res.user_id
        window.localStorage.setItem('_USER_ID_', res.user_id)
        this.getUser()
      }).catch(err => {
        this.errMsg = err.message
        this.isErrshow = true
        setTimeout(() => {
          this.isErrshow = false
        }, 2000)
      })
      return false
    },
    inputNum () {
      let reg = /^1[34578]\d{9}$/
      if (reg.test(this.number)) {
        this.isSend = true
      } else {
        this.isSend = false
      }
    },
    cancel () {
      this.imgCode = ''
      this.needImgCode = false
    },
    // 发送验证码
    mobileSendCode () {
      let dataObj = {}
      dataObj.mobile = this.number
      if (this.imgCode !== '') {
        dataObj.captcha_hash = this.captcha_hash
        dataObj.captcha_value = this.imgCode
      }
      console.log(dataObj)
      this.$api.post('/apis/a/restapi/eus/login/mobile_send_code', dataObj).then(res => {
        this.countDown()
        this.errMsg = '发送成功'
        this.errImgCode = ''
        this.isErrshow = true
        setTimeout(() => {
          this.isErrshow = false
        }, 2000)
        this.validate_token = res.validate_token
        this.imgCode = ''
        this.needImgCode = false
      }).catch(err => {
        this.switchOne()
        if (err.name === 'NEED_CAPTCHA') {
          this.needImgCode = true
          this.errImgCode = ''
        } else {
          this.errImgCode = err.message
        }
        this.errMsg = err.message
        this.isErrshow = true
        setTimeout(() => {
          this.isErrshow = false
        }, 2000)
      })
    },
    // 获取图片验证码
    switchOne () {
      this.$api.post('/apis/a/restapi/eus/v3/captchas', {
        captcha_str: this.number
      }).then(res => {
        this.captcha_image = res.captcha_image
        this.captcha_hash = res.captcha_hash
      })
    },
    // 倒计时
    countDown () {
      this.isSend = false
      if (this.downTime === 0) {
        this.isSend = true
        this.sendBtnText = '重新发送'
        this.disabled = false
        clearTimeout(this.timer)
      } else {
        this.downTime--
        this.sendBtnText = `已发送（${this.downTime}）`
        this.timer = setTimeout(() => this.countDown(), 1000)
      }
    },
    getUser () {
      this.userId = '369085594'
      this.$api.get(`/apis/a/restapi/eus/v3/users/${this.userId}?`).then(res => {
        console.log(res)
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cube-toast
  .cube-popup-content
    display block !important
.login-w
  position: absolute
  width: 100%
  height: 100%
  background-color: #fff
  padding: 20px
  display flex
  flex-direction column
  align-items center
  @media (min-width: 768px)
    justify-content center
  .err-box
    position: absolute
    bottom: 40px
    left: 50%
    transform translateX(-50%)
    font-size: 12px
    padding: 10px 16px
    border-radius 16px
    color #fff
    background-color: rgba(0,0,0,.7)
  .err-popup
    text-align: center
    bottom: 20px
    >>> .cube-popup-content
        width auto
        font-size: 12px
        left -33%
        padding: 10px 20px
        border-radius 10px
        color #fff
        background-color: rgba(0,0,0,.7)
  .login-c
    display flex
    align-items center
    justify-content:center
    flex-direction column
    max-width 300px
    margin: 0 auto
  .login
    width: 135px
    text-align: center
    margin: 20px auto
  .form
    display flex
    align-items center
    flex-direction column
    .form-item
      width: 100%
      height: 48px
      margin-bottom: 15px
      position: relative
      .send
        position: absolute
        right: 0
        top: 50%
        transform translateY(-50%)
        color #ccc
        padding: 0 20px
        line-height: 48px
        font-size: 10px
        cursor none
        pointer-events none
        &.send-clas
          cursor pointer
          color #2395ff
          pointer-events: auto
      .input
        width: 100%
        height: 100%
        border: 1px solid #ddd
        border-radius 4px
        padding: 0 20px
        color #333
        &:focus
          border-color rgb(27, 169, 225) !important;
    .tips
      color #999
      font-size: 16px
      line-height: 1.5
      .protocol
        color #2395ff
    .submit
      width: 100%
      height: 42px
      background-color: #4cd96f
      color #fff
      text-align: center
      line-height: 42px
      border-radius 4px
      margin: 20px 0 40px
    .about
      text-align: center
      color #999
      font-size: 14px
</style>
