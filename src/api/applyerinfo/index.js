import request from '@/router/axios'
let baseUrl = '/api/base/applyerinfo'

export const addPatientInfo = (data) => {
  return request.post(`${baseUrl}`, data)
}

// 分页查询
export const getPatientInfo= (userId) => {
  return request.get(`${baseUrl}/page?userId=${userId}`)
}