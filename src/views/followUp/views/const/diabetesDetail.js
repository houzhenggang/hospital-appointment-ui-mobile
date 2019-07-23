import {
  getDict
} from '@/utils/index'

export const diabetesDetail = [{
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
  label: '身高',
  prop: 'height',
  type: 'text',
  disabled: true
}, {
  label: '体重',
  prop: 'weight',
  type: 'text',
  disabled: true
}, {
  label: 'BMI体质',
  prop: 'bmi',
  type: 'text',
  disabled: true
}, {
  label: '药物不良反应',
  prop: 'adverseDrugReactions',
  type: 'select',
  dicData: getDict('ADVERSEDRUGREACTIONS'),
  disabled: true
}, {
  label: '不良反应描述',
  prop: 'responseDescribe',
  type: 'text',
  disabled: true
}, {
  label: '低血糖反应',
  prop: 'lowBloodGlucoseReaction',
  type: 'text',
  disabled: true
}, {
  label: '餐后血糖',
  prop: 'postprandialBloodSugar',
  type: 'text',
  append: 'mmol/L',
  disabled: true
}, {
  label: '随机血糖',
  prop: 'randomBloodSugar',
  type: 'text',
  append: 'mmol/L',
  disabled: true
}, {
  label: '空腹血糖',
  prop: 'fastingPlasmaGlucose',
  type: 'text',
  append: 'mmol/L',
  disabled: true
}, {
  label: '糖化血红蛋白',
  prop: 'glycosylatedHemoglobin',
  type: 'text',
  append: 'g/l',
  disabled: true
}, {
  label: '糖化血红蛋白检查时间',
  prop: 'checkTime',
  disabled: true
}, {
  label: '血压-舒张压',
  prop: 'diastolic',
  type: 'number',
  disabled: true
}, {
  label: '血压-收缩压',
  prop: 'systolic',
  type: 'number',
  disabled: true
}, {
  label: '足背动脉',
  prop: 'dorsalArteryOfFoot',
  type: 'number',
  disabled: true
}, {
  label: '心率',
  prop: 'heartRate',
  type: 'number',
  disabled: true
}, {
  label: '健康处方',
  prop: 'prescriptionText',
  type: 'textarea',
  disabled: true
}, {
  label: '服药依从性',
  prop: 'medicationAdherence',
  type: 'textarea',
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
  fn: 'initDoctorDict',
  type: 'select',
  dicData: [],
  dicUrl: '/api/base/doctordoctorinfo/dict-all',
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
}, {
  label: '下次随访日期',
  prop: 'nextFollowTime',
  type: 'date',
  required: true,
  disabled: true
}]
