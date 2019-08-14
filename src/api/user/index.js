import request from '@/router/axios'

// 用户登录
const scope = 'server'
export const userLogin = (username, password, code, randomStr) => {
  const grant_type = 'password'

  return request({
    url: '/api/auth/oauth/token',
    headers: {
      isToken: false,
      'TENANT_ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

export const getUserInfo = () => {
  return request.get('/api/admin/user/info')
}

let baseUrl = '/api/base/doctorpeopleinfo'

// 用户注册
export const userRegister = (formData) => {
  return request.post(`${baseUrl}/register`, formData)
}

// 判断用户名是否存在
export const hasUserName = (userName) => {
  return request.get(`${baseUrl}/hasUserName/${userName}`)
}

// 用户登录 (免验证码)
export function userLoginNoCode (code) {
  let formData = new FormData()
  formData.append('mobile', `OSC@${code}`)
  return request({
    method: 'post',
    url: '/api/auth/mobile/token/social',
    data: formData,
    headers: {
      'Authorization': 'Basic dGVzdDp0ZXN0'
    }
  })
}

// 获取登录短信验证码：/admin/mobile/{mobile}，样例/admin/mobile/15565502588
export const getMobileCode = (phone) => {
  return request.get(`/admin/mobile/${phone}`)
}

// 手机号登录接口：/auth/mobile/token/sms，参数：mobile，code，grant_type
export const mobileLogin = (mobile, code) => {
  debugger
  const grant_type = 'mobile'
  mobile = 'SMS@'.concat(mobile)

  return request({
    url: '/api/auth/mobile/token/sms',
    headers: {
      isToken: false,
      'TENANT_ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { mobile, code, grant_type }
  })
}

// 验证短息验证码接口：/admin/mobile/valid/sms，参数：mobile，code
export const checkCode = (formData) => {
  return request.get(`/admin/mobile/valid/sms`, formData)
}