import CryptoJS from 'crypto-js'
import { getStore } from './store'

/**
 *生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 *加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 日期格式化
 */
export function dateFormat (DATE, format = 'yyyy-MM-dd') {
  let date = new Date(DATE)
  // let format = 'yyyy-MM-dd hh:mm:ss'
  if (date !== 'Invalid Date') {
    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  }
  return ''
}

// 数字转中文
export function toChinesNum (num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  let getWan = (temp) => {
    let strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i === 0 && strArr[i] === 0 ? '' : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? '' : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum
    }
    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) noWan = '0' + noWan
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

/**
 * @description 根据字典名称获取字典数据 array
 * @param {字典名称} name
 */
export const getDict = (name) => {
  let dicData = getStore({ name: 'dictList' })
  if (dicData[name]) {
    return dicData[name]
  } else {
    console.error(`字典${name}不存在！`)
    return []
  }
}

/**
 * @description 根据字典名称获取字典数据 object
 * @param {字典名称} name
 */
export const getDictValue = (name, value = false) => {
  let dicData = getStore({ name: 'dictList' })
  if (dicData[name]) {
    if (value !== false) {
      for (let item of dicData[name]) {
        if (item.value === value) {
          return item.label
        }
      }
    } else {
      let obj = {}
      for (let item of dicData[name]) {
        obj[item.value] = item.label
      }
      return obj
    }
  } else {
    console.error(`字典${name}不存在！`)
    return []
  }
}

/**
 * 数组转对象
 */
export const transfDict = (list, label = 'name', value = 'value') => {
  let obj = {}
  for (let item of list) {
    obj[item[value]] = item[label]
  }
  return obj
}

/**
 * 体质指数
 *
 */
export function BMIComputed (weight, height, fixed = 1) {
  return new Promise((resolve) => {
    // 判断非空且转数字后非NaN
    if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
      resolve(0)
    } else {
      let bmi = Number(weight) / Math.pow(Number(height) / 100, 2)
      resolve(bmi.toFixed(fixed))
    }
  })
}
