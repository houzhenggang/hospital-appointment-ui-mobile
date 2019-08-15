import request from '@/router/axios'
let baseUrl = '/api/base/applyerinfo'

// 新增就诊人信息
export const addPatientInfo = (data) => {
  return request.post(`${baseUrl}`, data)
}

// 分页查询
export const getPatientInfoList= (userId) => {
  return request.get(`${baseUrl}/page?userId=${userId}`)
}

// /applyerinfo/{applyerId}
// 通过id查询
export const getPatientInfo= (applyerId) => {
  return request.get(`${baseUrl}/${applyerId}`)
}

// 修改就诊人信息
export const updatePatientInfo = (data) => {
  return request.put(`${baseUrl}`, data)
}
// 删除就诊人信息
export const deletePatientInfo = (applyerId) => {
  return request.delete(`${baseUrl}/${applyerId}`)
}