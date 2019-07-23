/**
 *
 * @param { 字典数据 } dictData
 * @param { 字典主键 } value
 * @param { 字典值 } props
 */
export function getDictValue (dictData, value, props = {
  label: 'label',
  value: 'value'
}) {
  for (let index in dictData) {
    if (String(dictData[index][props.value]) === String(value)) {
      return dictData[index][props.label]
    }
  }
  return null
}
