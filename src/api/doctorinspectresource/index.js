// base/doctorinspectresource/page

import request from '@/router/axios'
let baseUrl = '/api/base/doctorinspectresource'

export const getHospitalList = (data, current) => {
  return request.get(`${baseUrl}/page?inspItemName=${data}&&current=${current}&&size=10`)
}

export const getHospitalListWithTime = (data, current, startTime, endTime) => {
  return request.get(`${baseUrl}/page?inspItemName=${data}&&current=${current}&&size=10&&startTime=${startTime}&&endTime=${endTime}`)
//   return request.get(`${baseUrl}/page?inspItemName=${data}&&current=${current}&&size=10`)
}

export const hospitalDetail = (inspResourceId) => {
    return request.get(`${baseUrl}/${inspResourceId}`)
  }

// 获取可预约时间组
export const timeGroupDetail = (startDate, endDate) => {
  return request.get(`${baseUrl}/list/group?startDate=${startDate}&&endDate=${endDate}`)
}

export const groupDetail = (queryDate, inspItemAp) => {
  return request.get(`${baseUrl}/detail/group?queryDate=${queryDate}&&inspItemAp=${inspItemAp}`)
}

// 获取详细时间
export const getDetailTime = (startTime, endTime, hospitalId, inspItemName) => {
  return request.get(`${baseUrl}/list/?startTime=${startTime}&&endTime=${endTime}&&hospitalId=${hospitalId}&&inspItemName=${inspItemName}`)
}