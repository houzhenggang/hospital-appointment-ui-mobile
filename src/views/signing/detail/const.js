export const ordinaryInfo = [
  {
    name: '签约人',
    value: 'name'
  }, {
    name: '签约医院',
    value: 'hospitalId',
    dict: 'hospital'
  }, {
    name: '协议编号',
    value: 'code'
  }, {
    name: '协议状态',
    value: 'protocolStatus',
    dict: 'protocolStatus'
  }, {
    name: '协议类型',
    value: 'serviceType',
    dict: 'serviceType'
  }, {
    name: '当前状态',
    value: 'workStatus',
    dict: 'workStatus'
  }, {
    name: '状态',
    value: 'status',
    dict: 'status'
  }
]

export const selfHelpInfo = [
  {
    name: '姓名',
    value: 'name'
  }, {
    name: '民族',
    value: 'national'
  }, {
    name: '身份证号',
    value: 'idCard'
  }, {
    name: '责任医院',
    value: 'hospitalId',
    dict: 'hospital'
  }, {
    name: '责任团队',
    value: 'teamId',
    dict: 'teamList'
  }, {
    name: '责任医生',
    value: 'doctorId',
    dict: 'doctorList'
  }, {
    name: '协议类型',
    value: 'serviceType',
    dict: 'serviceType'
  }, {
    name: '处理状态',
    value: 'status',
    dict: 'selfStatus'
  }
]

export const dictMap = {
  hospital: [],
  teamList: [],
  doctorList: [],
  protocolStatus: { // 协议状态
    0: '未上传',
    1: '已上传'
  },
  serviceType: { // 协议类型
    1: '基础',
    2: '个性化'
  },
  workStatus: { // 当前状态
    1: '生效中',
    2: '未生效',
    3: '已失效'
  },
  status: { // 状态
    1: '正常',
    2: '已续约',
    3: '已解约'
  },
  selfStatus: {
    0: '未处理',
    1: '已处理'
  }
}

export const doctorServicepackageList = [
  {
    name: '套餐编码',
    value: 'packageCode'
  }, {
    name: '套餐等级',
    value: 'packageLevel'
  }, {
    name: '套餐费用（元）',
    value: 'charges'
  }, {
    name: '协议类型',
    value: 'serviceType',
    dict: 'serviceType'
  }
]
