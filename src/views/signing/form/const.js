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
    doctorServicepackageList: []
  }
}

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
