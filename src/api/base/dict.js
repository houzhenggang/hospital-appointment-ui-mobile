import request from '@/router/axios'

export function getDictAll () {
  return request.get(`/api/base/dictionariesutils/type-all`)
}
