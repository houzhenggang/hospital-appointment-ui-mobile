import request from '@/router/axios'

const baseUrl = '/api/base/doctorhypertensionform'

export const getHypertensionFormPage = (params) => {
  return request.get(`${baseUrl}/page`, {
    params
  })
}

export const createHyoertensionForm = (formData) => {
  return request.post(`${baseUrl}`, formData)
}

export const updateHyoertensionForm = (formData) => {
  return request.put(`${baseUrl}`, formData)
}

export const getHypertensionFormById = (id) => {
  return request.get(`${baseUrl}/${id}`)
}

export const deleteHypertensionById = (id) => {
  return request.delete(`${baseUrl}/${id}`)
}
