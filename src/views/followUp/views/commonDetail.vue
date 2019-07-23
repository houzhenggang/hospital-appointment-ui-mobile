<template>
  <div>
    <zForm :options="options" v-model="formData" ref="form">
    </zForm>
  </div>
</template>

<script>
import {
  getCommonFormById
} from '@/api/followUpCommon'
import {
  commonDetail
} from './const/commonDetail'
import zForm from '@/components/zForm/index'
import mixin from './mixin'

export default {
  name: 'commonDetail',
  mixins: [ mixin ],
  components: {
    zForm
  },
  data () {
    return {
      options: commonDetail,
      formData: {},
      hospitalId: '',
      teamId: '',
      teamIndex: 3,
      doctorIndex: 4
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    status () {
      return this.$route.query.type
    }
  },
  created () {
    this.getFormData(this.id)
  },
  methods: {
    getFormData (id) {
      getCommonFormById(id).then(({ data }) => {
        if (this.status === 'correlation') {
          let formData = data.data || {}
          let queryData = { ...this.$route.query }
          delete queryData.type
          this.formData = { ...formData, ...queryData }
        } else {
          this.formData = data.data || {}
        }
      })
    },
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
    }
  }
}
</script>

<style lang="scss">
.btn-group {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}
</style>
