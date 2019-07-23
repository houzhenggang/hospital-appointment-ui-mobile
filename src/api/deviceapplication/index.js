import request from '@/router/axios'

const baseUrl = '/api/base/deviceapplication'

// 获取自助签约分页
export const getDeviceApplicationPage = (params) => {
  return request.get(`${baseUrl}/page`, {
    params
  })
}

// 自助签约
export const deviceapplication = (obj) => {
  return request.post(`${baseUrl}`, obj)
}

// 自助签约详情
export const getDeviceapplication = (id) => {
  return request.get(`${baseUrl}/${id}`)
}

// 删除
export const deleteDoctorById = (id) => {
  return request.delete(`${baseUrl}/${id}`)
}
