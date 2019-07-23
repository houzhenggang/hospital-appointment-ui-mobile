const number = {
  name: '编号',
  list: [
    {
      name: '编号',
      value: 'id'
    }, {
      name: '档案编号',
      value: 'archiveId'
    }
  ]
}

// 个人信息
const userInfo = {
  name: '基本信息',
  list: [
    {
      name: '姓名',
      value: 'name'
    }, {
      name: '身份证',
      value: 'idCard'
    }, {
      name: '性别',
      value: 'sex',
      dict: 'SexType'
    }, {
      name: '出生日期',
      value: 'birthDate',
      type: 'date'
    }, {
      name: '体重',
      value: 'weight'
    }, {
      name: '身高',
      value: 'height'
    }, {
      name: '本人电话',
      value: 'phone'
    }, {
      name: '现居地址',
      value: 'addressStreet'
    }, {
      name: '人群分类',
      value: 'peopleTypeList',
      dict: 'PEOPLETYPE'
    }, {
      name: '人员状态',
      value: 'peopleState'
    }
  ]
}

// 签约服务
const server = {
  name: '签约服务',
  list: [
    {
      name: '建档单位',
      value: 'createArchiveUnits'
    }, {
      name: '建档人',
      value: 'createArchivePeople'
    }, {
      name: '建档日期',
      value: 'createArchiveTime'
    }, {
      name: '责任医院',
      value: 'hospitalId'
    }, {
      name: '责任团队',
      value: 'teamId'
    }, {
      name: '责任医生',
      value: 'doctorId'
    }, {
      name: '下次随访日期',
      value: 'nextServiceTime'
    }
  ]
}

// 详细档案
const detail = {
  name: '详细档案',
  list: [
    {
      name: '医疗费用支付方式',
      value: 'paymentMethod',
      dict: 'PAYMENTMETHOD'
    }, {
      name: '医保卡号',
      value: 'cardNumber'
    }, {
      name: '血型',
      value: 'bloodType',
      dict: 'BLOODTYPE'
    }, {
      name: 'RH阴性',
      value: 'rhNegative',
      dict: 'RHNEGATIVE'
    }, {
      name: '民族',
      value: 'national',
      dict: 'NATIONAL'
    }, {
      name: '婚姻状况',
      value: 'maritalStatus',
      dict: 'MARITALSTATUS'
    }, {
      name: '文化程度',
      value: 'educationLevel',
      dict: 'EDUCATIONLEVEL'
    }, {
      name: '座机电话',
      value: 'tel'
    }, {
      name: '常住类型',
      value: 'householdTtype',
      dict: 'HOUSEHOLDTYPE'
    }, {
      name: '户籍地址',
      value: 'householdStreet'
    }, {
      name: '联系人姓名',
      value: 'linkName'
    }, {
      name: '联系人电话',
      value: 'linkPhone'
    }, {
      name: '职业',
      value: 'professional',
      dict: 'PROFESSIONAL'
    }, {
      name: '工作单位',
      value: 'workUnit'
    }
  ]
}

// 药物过敏史
const Allergy = {
  name: '药物过敏史',
  list: [
    {
      name: '药物过敏史',
      value: 'otherAllergy',
      dict: 'ALLERGY'
    }
  ]
}

// 暴露史
const exposure = {
  name: '暴露史',
  list: [
    {
      name: '暴露史',
      value: 'exposed',
      dict: 'EXPOSUREHISTORY'
    }
  ]
}

// 既往史
const past = {
  name: '既往史',
  list: [
    {
      name: '疾病',
      value: 'disability',
      dict: 'DISABILITY'
    }, {
      name: '手术',
      value: 'surgery'
    }, {
      name: '外伤',
      value: 'trauma'
    }, {
      name: '输血',
      value: 'blood'
    }
  ]
}

// 家族史
const family = {
  name: '家族史',
  list: [
    {
      name: '父亲',
      value: 'fatherDiseaseArray'
    }, {
      name: '母亲',
      value: 'motherDiseaseArray'
    }, {
      name: '兄弟姐妹',
      value: 'basDiseaseArray'
    }, {
      name: '子女',
      value: 'childrenDiseaseArray'
    }
  ]
}

// 遗传病史
const genetic = {
  name: '遗传病史',
  list: [
    {
      name: '遗传病史',
      value: 'genetic'
    }
  ]
}

// 残疾情况
const disability = {
  name: '残疾情况',
  list: [
    {
      name: '残疾情况',
      value: 'disability',
      dict: 'DISABILITY'
    }
  ]
}

// 生活环境
const environment = {
  name: '生活环境',
  list: [
    {
      name: '厨房排风设施',
      value: 'kitchenExhaust',
      dict: 'KITCHENEXHAUST'
    }, {
      name: '燃料类型',
      value: 'kitchenFuel',
      dict: 'KITCHENFUEL'
    }, {
      name: '饮水',
      value: 'drinkingWater',
      dict: 'DRINKINGWATER'
    }, {
      name: '厕所',
      value: 'toilet',
      dict: 'TOILET'
    }, {
      name: '禽畜栏',
      value: 'livestockBar',
      dict: 'LIVESTOCKBAR'
    }
  ]
}

const baseArray = [
  {
    label: '无',
    value: 0
  }, {
    label: '高血压',
    value: 1
  }, {
    label: '糖尿病',
    value: 2
  }, {
    label: '冠心病',
    value: 3
  }, {
    label: '慢性阻塞性肺疾病',
    value: 4
  }, {
    label: '恶性肿瘤',
    value: 5
  }, {
    label: '脑卒中',
    value: 7
  }, {
    label: '严重精神障碍',
    value: 8
  }, {
    label: '结核病',
    value: 9
  }, {
    label: '肝炎',
    value: 10
  }, {
    label: '先天畸形',
    value: 11
  }, {
    label: '其他',
    value: 12
  }
]
const yesorno = [{
  label: '无',
  value: '0'
}, {
  label: '有',
  value: '1'
}]

const cardList = [ number, userInfo, server, detail, Allergy, exposure, past, family, genetic, disability, environment ]

export { cardList }

export { baseArray, yesorno }
