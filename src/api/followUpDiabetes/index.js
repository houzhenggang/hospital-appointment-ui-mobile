import request from '@/router/axios'

const baseUrl = '/api/base/doctordiabetesform'

export const getDiabetesPage = (params) => {
  return request.get(`${baseUrl}/page`, {
    params
  })
}

export const createDiabetes = (formData) => {
  return request.post(`${baseUrl}`, formData)
}

export const updateDiabetes = (formData) => {
  return request.put(`${baseUrl}`, formData)
}

export const getDiabetesById = (id) => {
  return request.get(`${baseUrl}/${id}`)
}

export const deleteDiabetesById = (id) => {
  return request.delete(`${baseUrl}/${id}`)
}
