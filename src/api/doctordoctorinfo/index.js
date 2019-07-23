import request from '@/router/axios'

const baseUrl = '/api/base/doctordoctorinfo'

// 根据医院ID获取医院下的医生列表
export const getDoctorListByhospitalId = (hospitalId = '{{key}}') => {
  return request.get(`${baseUrl}/dict/${hospitalId}`)
}

// 根据团队编号查询医生字典
export const getDoctorListBydictTeam = (hospitalId = '{{key}}') => {
  return request.get(`${baseUrl}/dict-team/${hospitalId}`)
}

// 查询全部医生字典
export const getDoctorListAll = () => {
  return request.get(`${baseUrl}/dict-all`)
}
