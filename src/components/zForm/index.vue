<template>
  <van-cell-group :title="title">
    <template v-for="(option, index) in options">
      <!-- <div :key="index">{{ index }}, {{ option.label }}, {{ option.prop }}</div> -->
      <!-- 输入框 长文本框 -->
      <van-field :key="index"
        v-if="(option.type === 'text' || option.type === 'textarea' || !option.type) && option.slot !== true"
        v-model="formData[option.prop]"
        :label="option.label"
        :required="option.required"
        :disabled="option.disabled"
        :clearable="option.clearable || true" :placeholder="`请输入${option.label}`"
        :type="option.type">
        <div v-if="option.append" slot="right-icon">{{ option.append }}</div>
      </van-field>
      <!-- 插槽 -->
      <van-cell :key="index" v-if="option.slot === true" :title="option.label">
        <slot :name="option.prop"></slot>
        <template v-if="option.append" slot="right-icon">
          {{ option.append }}
        </template>
      </van-cell>
      <!-- 下拉框 -->
      <van-cell :key="index" v-if="option.type === 'select'" :title="option.label" :required="option.required">
        <div style="width: 100%;" @click="changeShow(option)">
          {{ changeDataView(option) || `请选择${option.label}` }}
        </div>
        <van-popup v-model="option['show']" position="bottom">
          <van-picker show-toolbar :title="option.label" :ref="option.prop" :columns="option.dicData || []"
            @cancel="handleCancel(option)" @change="handleChange" @confirm="handleConfirm(option)" value="label" />
        </van-popup>
      </van-cell>
      <!-- 时间选择器 -->
      <van-cell
        :key="index"
        v-if="option.type === 'date'"
        :title="option.label"
        :required="option.required">
        <div @click="changeShow(option)">
          {{ formData[option.prop]|dateFilter }}
        </div>
        <van-popup v-model="option['show']" position="bottom">
          <van-datetime-picker
            :ref="option.prop"
            v-model="formData[option.prop]"
            @cancel="handleCancel(option)"
            @confirm="handleDateConfirm(option)"
            type="datetime" />
        </van-popup>
      </van-cell>
    </template>
  </van-cell-group>
</template>

<script>
import axios from 'axios'
import { dateFormat } from '@/utils/index'

export default {
  name: 'zForm',
  data () {
    return {
      formData: {}
    }
  },
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  props: {
    value: {
      type: Object,
      default: () => { }
    },
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    dateFilter (date) {
      if (!date) {
        return '请选择时间'
      }
      return dateFormat(date, 'yyyy年MM月dd日')
    }
  },
  watch: {
    value () {
      this.formData = this.value
    },
    formData () {
      this.$emit('changeValue', this.formData)
    }
  },
  methods: {
    cleanDictData (dicData, props = { label: 'label', value: 'value' }) {
      if (!Array.isArray(dicData)) {
        return []
      }
      return dicData.map(item => {
        item.text = item[props.label]
        item.label = item[props.label]
        item.value = item[props.value]
        return item
      })
    },
    changeShow (option) {
      if (option.disabled) {
        return
      }
      this.$set(option, 'show', true)
    },
    // select 切换按钮
    handleChange (picker, values) {
      this.$toast(`${values.label}, ${values.value}`)
    },
    // select 取消按钮
    handleCancel (option) {
      this.$set(option, 'show', false)
    },
    // select 确定按钮
    handleConfirm (option) {
      let selectValues = this.$refs[option.prop][0].getValues()[0]
      this.$set(this.formData, option.prop, selectValues.value)
      this.$set(this.formData, `$${option.prop}`, selectValues.label)
      this.$set(option, 'show', false)
      if (option.fn) {
        this.$emit('zFormFn', option, selectValues)
      }
    },
    handleDateConfirm (option) {
      console.log(option)
      console.log(this.formData[option.prop])
      this.$set(option, 'show', false)
    },
    // 根据字典列表获取具体值
    getDictObject (dict, value) {
      if (!Array.isArray(dict)) return ''
      for (let i in dict) {
        if (dict[i].value === value) {
          return dict[i].label
        }
      }
      return ''
    },
    // option show变化 自动触发render
    changeDataView (option) {
      if (this.formData[option.prop]) {
        return this.getDictObject(option.dicData, this.formData[option.prop])
      }
      return ''
    },
    init () {
      for (let index in this.options) {
        if (this.options[index].dicUrl) {
          axios({
            method: this.options[index].method || 'get',
            url: this.options[index].dicUrl,
            data: this.options[index].query
          }).then(({ data }) => {
            this.$set(this.options[index], 'dicData', this.cleanDictData(data.data, this.options[index].props))
          })
        } else if (this.options[index].dicData) {
          this.$set(this.options[index], 'dicData', this.cleanDictData(this.options[index].dicData))
        }
      }
    },
    validate (cb) {
      for (let index in this.options) {
        if (this.options[index].required === true) {
          if (this.formData[this.options[index].prop] === undefined || this.formData[this.options[index].prop] === undefined) {
            this.$notify({
              message: `${this.options[index].label}是必填项`,
              duration: 1000,
              background: '#FF4444'
            })
            console.error(`${this.options[index].prop} is reuired!`)
            return cb(false)
          }
        }
      }
      cb(true)
    }
  },
  created () {
    this.init()
  }
}
</script>
