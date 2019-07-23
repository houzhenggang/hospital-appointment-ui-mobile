import request from '@/router/axios'

const baseUrl = '/api/base/doctorservicepackage'

// 获取套餐的树集合
export const getDoctorservicepackage = (hospitalId) => {
  return request.get(`${baseUrl}/tree/${hospitalId}`)
}

// 获取套餐的list
export const getdoctorservicepackageList = (obj) => {
  return request.get(`${baseUrl}/page`, { params: obj })
}
