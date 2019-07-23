import Vue from 'vue'

import { getHospitalDict } from '@/api/doctorhospital/index'
import { getDoctorListAll } from '@/api/doctordoctorinfo/index'
import { getTeamListAll } from '@/api/doctorserviceteam/index'

export const state = Vue.observable({
  hospitalDictAll: [],
  doctorDictAll: [],
  teamDictAll: []
})

export function updateDictInfo () {
  let hospitalDictAllPromise = getHospitalDict()
  let doctorDictAllPromise = getDoctorListAll()
  let teamDictAllPromise = getTeamListAll()
  return new Promise(resolve => {
    Promise.all([hospitalDictAllPromise, doctorDictAllPromise, teamDictAllPromise]).then(([h, d, t]) => {
      state.hospitalDictAll = h.data.data
      state.doctorDictAll = d.data.data
      state.teamDictAll = t.data.data
      resolve()
    })
  })
}
