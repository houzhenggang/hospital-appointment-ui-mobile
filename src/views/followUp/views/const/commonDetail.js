import {
  getDict
} from '@/utils/index'

export const commonDetail = [{
  label: '姓名',
  prop: 'name',
  type: 'text',
  required: true,
  disabled: true
}, {
  label: '身份证号',
  prop: 'idCard',
  type: 'text',
  required: true,
  disabled: true
}, {
  label: '随访管理医院',
  prop: 'hospitalId',
  type: 'select',
  dicUrl: '/api/base/doctorhospital/dict',
  fn: 'initTeamDict',
  props: {
    label: 'name',
    value: 'id'
  },
  required: true,
  disabled: true
}, {
  label: '随访团队',
  prop: 'teamId',
  type: 'select',
  dicData: [],
  dicUrl: '/api/base/doctorserviceteam/dict-all',
  fn: 'initDoctorDict',
  props: {
    label: 'name',
    value: 'id'
  },
  required: true,
  disabled: true
}, {
  label: '随访医生',
  prop: 'doctorId',
  type: 'select',
  dicUrl: '',
  props: {
    label: 'name',
    value: 'id'
  },
  required: true,
  disabled: true
}, {
  label: '随访时间',
  prop: 'followTime',
  type: 'date',
  required: true,
  disabled: true
}, {
  label: '随访分类',
  prop: 'followUpType',
  type: 'select',
  dicData: getDict('FOLLOWUPTYPE'),
  required: true,
  disabled: true
}, {
  label: '随访方式',
  prop: 'followUpWay',
  type: 'select',
  dicData: getDict('FOLLOWUPWAY'),
  required: true,
  disabled: true
}]
