import request from '@/router/axios'
let baseUrl = '/api/base/doctorpeopleinfo'

// /base/doctorpeopleinfo/{userId}
// 通过用户查询居民基本信息表
export const getUserInfo = (userId) => {
  return request.get(`${baseUrl}/${userId}`)
}

// /base/doctorpeopleinfo，参数peopleId

//  个人信息修改
export const userMessageUpdate = (formData) => {
    return request.put(`${baseUrl}`, formData)
  }
