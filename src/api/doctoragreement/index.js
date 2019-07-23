import request from '@/router/axios'

let baseUrl = '/api/base/doctoragreement'

export const getUserDoctorAgreementPage = (userId, listQuery) => {
  return request.get(`${baseUrl}/page/${userId}`, {
  // return request.get(`${baseUrl}/page/17`, {
    params: listQuery
  })
}

export const getDoctorAgreementById = (id) => {
  return request.get(`${baseUrl}/${id}`)
}

// 删除
export const deleteDoctorById = (id) => {
  return request.delete(`${baseUrl}/${id}`)
}
