import request from '@/router/axios'
let baseUrl = '/admin/mobile'

// /base/doctorpeopleinfo/{userId}
// 通过用户查询居民基本信息表

// /api/admin/dict

// /admin

// 获取登录短信验证码：/admin/mobile/{mobile}，样例/admin/mobile/15565502588
export const getMobileCode = (phone) => {
  return request.get(`${baseUrl}/${phone}`)
}

// 手机号登录接口：/auth/mobile/token/sms，参数：mobile，code，grant_type
export const userMessageUpdate = (formData) => {
    return request.put(`${baseUrl}`, formData)
  }
