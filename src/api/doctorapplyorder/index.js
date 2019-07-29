
import request from '@/router/axios'
let baseUrl = '/api/base/doctorapplyorder'

// 新增预约订单
export const addOrder= (data) => {
  return request.post(`${baseUrl}`, data)
}

// /doctorapplyorder/{applyOrderId}
// 通过id查询
// export const hospitalDetail = (applyOrderId) => {
//     return request.get(`${baseUrl}/${applyOrderId}`)
//   }


// export const getOrders= (peopleId) => {
//   return request.get(`${baseUrl}/page?peopleId=${peopleId}`)
// }

export const getOrders= (peopleId, orderState) => {
  return request.get(`${baseUrl}/page?peopleId=${peopleId}&&orderState=${orderState}`)
}

export const getOrderValue= (applyOrderId) => {
  return request.get(`${baseUrl}/${applyOrderId}`)
}

export const updateOrder= (data) => {
  return request.put(`${baseUrl}`, data)
}

// GET
// /doctorapplyorder/page
// 分页查询