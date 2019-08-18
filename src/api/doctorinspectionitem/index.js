
import request from '@/router/axios'
let baseUrl = '/api/base/doctorinspectionitem'

// 获取检查项目字典数据
export const getInspectionitemDict = () => {
  return request.get(`${baseUrl}/dict`)
}

// 获取热门搜索关键词
export const hotInspitem = () => {
  return request.get(`${baseUrl}/query/hot/inspitem`)
}

// 获取禁忌词
export const inspitemTips = (data) => {
  return request.get(`${baseUrl}/${data}`)
}

// 根据检查类别查询检查项目
export const getByInspType = (inspType) => {
  return request.get(`${baseUrl}/item/${inspType}`)
}
