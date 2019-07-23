import request from '@/router/axios'

export function getInformationList (params) {
  return request.get(`/api/base/doctorinformation/page`, {
    params
  })
}

export function getArticleById (id) {
  return request.get(`/api/base/doctorinformation/${id}`)
}
