// base/doctorinspectresource/page

import request from '@/router/axios'
let baseUrl = '/api/base/doctorinspectresource'

export const getHospitalList = (data, current) => {
  return request.get(`${baseUrl}/page/group?inspItemName=${data}&&current=${current}&&size=10`)
}

export const getHospitalListWithTime = (data, current, startTime, endTime) => {
  return request.get(`${baseUrl}/page/group?inspItemName=${data}&&current=${current}&&size=10&&startDate=${startTime}&&endDate=${endTime}`)
}

export const getHospitalListByType = (data, current) => {
  return request.get(`${baseUrl}/page/group?inspItemType=${data}&&current=${current}&&size=10`)
}

export const getHospitalListWithTimeByType = (data, current, startTime, endTime) => {
  return request.get(`${baseUrl}/page/group?inspItemType=${data}&&current=${current}&&size=10&&startDate=${startTime}&&endDate=${endTime}`)
}

export const hospitalDetail = (inspResourceId) => {
  return request.get(`${baseUrl}/${inspResourceId}`)
}

// 获取可预约时间组
export const timeGroupDetail = (startDate, endDate, hospitalId, inspItemId) => {
  return request.get(`${baseUrl}/list/group?startDate=${startDate}&&endDate=${endDate}&&hospitalId=${hospitalId}&&inspItemId=${inspItemId}`)
}

export const groupDetail = (queryDate, inspItemAp, hospitalId, inspItemId) => {
  return request.get(`${baseUrl}/detail/group?queryDate=${queryDate}&&inspItemAp=${inspItemAp}&&hospitalId=${hospitalId}&&inspItemId=${inspItemId}`)
}

// 获取详细时间
export const getDetailTime = (startTime, endTime, hospitalId, inspItemName) => {
  return request.get(`${baseUrl}/list/?startTime=${startTime}&&endTime=${endTime}&&hospitalId=${hospitalId}&&inspItemName=${inspItemName}`)
}

// 资源分类列表查询
export const getInslList = () => {
  return request.get(`${baseUrl}/page/all/item/group`)
}
