import { getDictValue, getDict } from '@/utils/'

export const initFormData = () => {
  return {
    idCard: '',
    name: '',
    phone: '',
    sex: '',
    sexName: '',
    birthDate: '',
    national: '',
    hospitalId: '',
    hospitalName: '',
    teamId: '',
    teamName: '',
    doctorId: '',
    doctorName: '',
    serviceType: '',
    serviceTypeName: '',
    status: 0,
    userId: '',
    doctorServicepackageList: [],
    idCardFront: ''
  }
}

export const fileForm = [
  {
    fileName: 'name',
    formName: 'name'
  }, {
    fileName: 'idCard',
    formName: 'idCard'
  }, {
    fileName: 'sex',
    formName: 'sex',
    formAlias: 'sexName',
    dict: 'SexType', // 中文转字典值
    transfDict: 'SexType' // 字典值转中文
  }, {
    fileName: 'birthDate',
    formName: 'birthDate',
    date: true
  }, {
    fileName: 'nationalName',
    formName: 'national',
    formAlias: 'nationalName',
    transfDict: 'national',
    dict: 'national'
  }
]

export const showList = {
  handleStateShow: false,
  serviceShow: false,
  brithdayshow: false,
  gendershow: false,
  nationshow: false,
  hospitalShow: false,
  teamShow: false,
  doctorShow: false,
  doctorServicepackageShow: false
}

export const dictMap = {
  SexType: getDictValue('SexType'),
  SexTypeList: getDict('SexType').map(m => { return { name: m.label, value: m.value } }),
  national: getDictValue('NATIONAL'),
  nationalList: getDict('NATIONAL').map(m => { return { text: m.label, value: m.value } }),
  protocolStatus: [
    {
      id: '0',
      name: '未上传'
    },
    {
      id: '1',
      name: '已上传'
    }
  ],
  serviceType: [
    {
      id: '1',
      name: '基础'
    },
    {
      id: '2',
      name: '个性化'
    }
  ],
  workStatus: [
    {
      id: '1',
      name: '生效中'
    },
    {
      id: '2',
      name: '未生效'
    },
    {
      id: '3',
      name: '已失效'
    }
  ],
  status: [
    {
      id: '1',
      name: '正常'
    },
    {
      id: '2',
      name: '已续约'
    },
    {
      id: '3',
      name: '已解约'
    }
  ],
  selfStatus: [
    {
      id: '0',
      name: '未处理'
    },
    {
      id: '1',
      name: '已处理'
    }
  ]
}
