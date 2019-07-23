import request from '@/router/axios'
const baseUrl = '/api/admin/file'

export const uploadIdCard = (formData, config) => {
  return request.post(`${baseUrl}/uploadIdCard`, formData, config)
}
