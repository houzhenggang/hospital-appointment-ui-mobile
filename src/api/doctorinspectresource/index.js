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

// /doctorinspectresource/{inspResourceId}