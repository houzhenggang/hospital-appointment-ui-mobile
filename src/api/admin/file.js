import request from '@/router/axios'
const baseUrl = '/api/admin/file/'

/**
 * 获取文件地址
 */
export const getFileAdress = (fileName) => {
  return request.get(`${baseUrl}/${fileName}`)
}
