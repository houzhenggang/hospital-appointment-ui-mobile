
import request from '@/router/axios'
let baseUrl = '/api/base/doctorinspectionitem'

// 获取检查项目字典数据
export const getInspectionitemDict = () => {
  return request.get(`${baseUrl}/dict`)
}