import request from '@/router/axios'

const baseUrl = '/api/base/doctorcommonform'

export const getCommonFormPage = (params) => {
  return request.get(`${baseUrl}/page`, {
    params
  })
}

export const createCommonForm = (formData) => {
  return request.post(`${baseUrl}`, formData)
}

export const updateCommonForm = (formData) => {
  return request.put(`${baseUrl}`, formData)
}

export const getCommonFormById = (id) => {
  return request.get(`${baseUrl}/${id}`)
}

export const deleteCommonFormById = (id) => {
  return request.delete(`${baseUrl}/${id}`)
}
