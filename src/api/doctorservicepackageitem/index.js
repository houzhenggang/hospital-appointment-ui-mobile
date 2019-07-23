import request from '@/router/axios'
const baseUrl = '/api/base/doctorservicepackageitem'

// 根据医院ID获取医院下的套餐列表
export const getservicepackageitemPage = (obj) => {
  return request.get(`${baseUrl}/page`, { params: obj })
}
