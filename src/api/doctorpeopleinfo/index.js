import request from '@/router/axios'

const baseUrl = '/api/base/doctorpeopleinfo'

// 查询档案信息
export const getDoctorpeopleinfoPage = (params) => {
  return request.get(`${baseUrl}/page`, {
    params
  })
}

// 通过身份证查询居民基本信息表
export const getDoctorpeopleinfoByIdcard = (idCard) => {
  return request.get(`${baseUrl}/idcard/${idCard}`)
}

// 删除档案
export const deleteDoctorpeopleinfoById = (id) => {
  return request.delete(`${baseUrl}/${id}`)
}

// 查询居民糖尿病专案
export const getDoctorpeopleinfoDiabetes = (id) => {
  return request.get(`${baseUrl}/diabetes/${id}`)
}

// 修改居民糖尿病专案
export const postDoctorpeopleinfoDiabetes = (data) => {
  return request.put(`${baseUrl}/diabetes`, data)
}

// 查询居民高血压专案
export const getDoctorpeopleinfoHypertension = (id) => {
  return request.get(`${baseUrl}/hypertension/${id}`)
}

// 修改居民高血压专案
export const postDoctorpeopleinfoHypertension = (data) => {
  return request.put(`${baseUrl}/hypertension`, data)
}

// 根据ID获取档案
export function getPeopleArchiveInfo (id) {
  return request.get(`${baseUrl}/${id}`)
}

// 根据医院ID获取医院下的医生列表
export const getDoctorListByhospitalId = (hospitalId = '{{key}}') => {
  return request.get(`${baseUrl}/dict/${hospitalId}`)
}
