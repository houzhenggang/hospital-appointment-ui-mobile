import request from '@/router/axios'

const baseUrl = '/api/admin/dict'

/**
 * @name 新增字典
 * @param remarks 字典中文名
 * @param type 字典Key
 * @param description 描述
 * @param tenantId 租户ID
 */
export const createDict = (formData) => {
  return request.post(`${baseUrl}`, formData)
}

/**
 * @name 修改字典
 */
export const updateDict = (formData) => {
  return request.put(`${baseUrl}`, formData)
}

/**
 * @name 新增字典项
 * @param label 字典项名
 * @param value 字典项值
 * @param description 描述
 * @param sort 排序
 * @param dictId 字典ID
 */
export const createDictItem = (formData) => {
  return request.post(`${baseUrl}/item`, formData)
}

/**
 * @name 修改字典项
 */
export const updateDictItem = (formData) => {
  return request.put(`${baseUrl}/item`, formData)
}

/**
 * @name 分页获取字典项
 * @param current 页码
 * @param size 分页条数
 */
export const getDictItemPage = (formData) => {
  return request.put(`${baseUrl}`, formData)
}

/**
 * @name 根据type取字典
 */

export const getDictByType = (type) => {
  return request.get(`${baseUrl}/type/${type}`)
}

export function getDictAll () {
  return request.get(`/api/admin/dict/type-all`)
}

// 获取检查类别
export function getInspectionTypeDict () {
  return request.get(`/api/admin/dict/type/kasoft_inspection_type`)
}