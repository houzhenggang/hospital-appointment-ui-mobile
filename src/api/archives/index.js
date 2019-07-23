import request from '@/router/axios'
let baseUrl = '/api/base/doctorpeopleinfo'

// 通过用户查询居民基本信息表
export const getUserInfo = (userId) => {
  return request.get(`${baseUrl}/user/${userId}`)
}

// 获取基本信息档案
export const getArchivesById = (id) => {
  return request.get(`${baseUrl}/${id}`)
}

// 获取老年人档案信息
export const getOldPeople = (id) => {
  return request.get(`${baseUrl}/OldPeople/${id}`)
}

// 获取糖尿病信息
export const getDiabetes = (id) => {
  return request.get(`${baseUrl}/diabetes/${id}`)
}

// 获取高血压信息
export const getHypertension = (id) => {
  return request.get(`${baseUrl}/OldPeople/${id}`)
}
