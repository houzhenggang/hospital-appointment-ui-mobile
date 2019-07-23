import request from '@/router/axios'

const baseUrl = '/api/base/doctorserviceteam'

// 根据医院ID获取医院下的团队列表
export const getTeamListByhospitalId = (hospitalId = '{{key}}') => {
  return request.get(`${baseUrl}/dict/${hospitalId}`)
}

// 获取全部团队列表
export const getTeamListAll = () => {
  return request.get(`${baseUrl}/dict-all`)
}
