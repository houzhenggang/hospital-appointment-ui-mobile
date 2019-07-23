import axios from '@/router/axios'

export function getMainTableData (params) {
  return axios.get(`/api/base/doctorpeopleinfo/pageform`, {
    params
  })
}

export function getCorrelationDetailTableData (params) {
  return axios.get(`/api/base/doctoragreement/page`, {
    params
  })
}

export function getPackageDetailData (id) {
  return axios.get(`/api/base/doctoragreement/${id}`)
}
