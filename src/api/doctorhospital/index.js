import request from '@/router/axios'

const baseUrl = '/api/base/doctorhospital'

// 获取医院字典数据
export const getHospitalDict = () => {
  return request.get(`${baseUrl}/dict`)
}
