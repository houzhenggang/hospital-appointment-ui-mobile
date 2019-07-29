
import request from '@/router/axios'
let baseUrl = '/api/base/doctorhospital'

export const hospitalData= (id) => {
  return request.get(`${baseUrl}/${id}`)
}

// 获取医院字典数据
export const getHospitalDict = () => {
  return request.get(`${baseUrl}/dict`)
}