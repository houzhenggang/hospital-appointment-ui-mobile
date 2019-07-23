import request from '@/router/axios'
let baseUrl = '/api/base/dictionariesutils'

export const getDictionariesutils = (type) => {
  return request.get(`${baseUrl}/type/${type}`)
}
