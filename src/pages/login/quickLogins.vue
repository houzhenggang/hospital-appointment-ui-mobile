<template>
  <div id="quickLogin">
    <!-- 我的南京 快捷登陆中... -->
  </div>
</template>

<script>
export default {
  name: 'quickLogin',
  data () {
    return {
      appId: 'cs_jtys',
      accessToken: null,
      formData: {
        username: '',
        password: '',
        remeberMe: false
      }
    }
  },
  methods: {
    getNanJingAccessToken () {
      let params = `{"appId": ${this.appId}}`
      var that = this
      window.auth.getAccessToken(params)
      window.getAccessTokenCallback = (params) => {
        params = JSON.parse(params)
        if (params.success) {
          that.accessToken = params.data.accessToken
          // 调起获取用户授权信息接口
          var userInfoParams = `{"accessToken": ${that.accessToken}, "appId": ${that.appId}}`
          // 调起获取用户授权信息，接口（首次展示用户授权界面）
          that.getUserInfoByToken(userInfoParams)
        } else {
          that.$message.error(`获取accessToken失败，原因：${params.msg}`)
        }
      }
      window.getUserInfoByTokenCallback = (params) => {
        params = JSON.parse(params) // jsonStr 转jsonObject
        if (params.success) {
          var data = params.data // 用户信息密文
          that.login(data)
        } else {
          that.$message.error(`获取用户授权信息失败，原因：${params.msg}`)
        }
      }
    },
    getUserInfoByToken (params) {
      window.auth.getUserInfoByToken(params)
    },
    login (data) {
      let code = window.btoa(data)
      this.$store.dispatch('userLoginNoCode', code).then(() => {
        this.$notify({
          message: '登录成功',
          background: '#00cc33'
        })
        this.$store.dispatch('getUserInfo').then(() => {
          this.$store.dispatch('GetDictAll').then(() => {
            this.$router.push({ name: 'archives' })
          })
        }).catch(() => {
          this.$notify({
            message: '获取用户信息失败！',
            background: '#ff4444'
          })
        })
      }).catch(() => {
        this.$notify({
          message: '登录失败',
          background: '#ff4444'
        })
      })
    }
  },
  created () {
    this.getNanJingAccessToken()
    // let data = 'Zk80QitTZjcrSUE1Qlg1NElUelUvSldIWWRCMXFRNUx3aUlocXViREFaZ3h3WmZpdks2ZllWMEdRYitCTDExN3VRL2FoYkl0bWlNVnFMbnJJSUNoaWRKUmZNOFlLRnU0VUFxYm0xbVZzK2lHZmlNclVCeEVJTjlqZkRZVjl5U2dqZkppYUloSXA1cWp4Szd1di9nQ3lFMzBsT1dTTFloK1cwKzV0YlJsUnUxdnZKSXZ4ZFUyUWlzMFlRcGljNHpsN0NKY2wrcHpxYTNKRGdDeWZ1VnBjVnpHcllLZFVnUjBwR0piYXVhclhYWWRSM3VING1nWnkzY2NHVGlzajVUcEtZU1RneHUxZDFpaGtsL1NSZGZiVXkzaFIxQjAyMnZMeUJWQ05qNk5RV3RKdjlxd0JybEFxU212WGRKeGk5N2dRV0pCeWRyOU9aaC9RbjNhN3ZJNktBPT0='
    // this.login(data)
  }
}
</script>
