<template>
  <div>
    <zForm :options="options" v-model="formData"></zForm>
  </div>
</template>

<script>
import {
  getDiabetesById
} from '@/api/followUpDiabetes'
import {
  diabetesDetail
} from './const/diabetesDetail'
import zForm from '@/components/zForm/index'
import mixin from './mixin'
import {
  getPeopleArchiveInfo
} from '@/api/doctorpeopleinfo'
import {
  BMIComputed
} from '@/utils/index'

export default {
  name: 'hypertensionDetail',
  mixins: [ mixin ],
  components: {
    zForm
  },
  data () {
    return {
      options: diabetesDetail,
      formData: {},
      hospitalId: '',
      teamId: '',
      teamIndex: 20,
      doctorIndex: 21
    }
  },
  watch: {
    'formData.weight' () {
      BMIComputed(this.formData.weight, this.formData.height).then(bmi => {
        this.$set(this.formData, 'bmi', bmi)
      })
    },
    'formData.height' () {
      BMIComputed(this.formData.weight, this.formData.height).then(bmi => {
        this.$set(this.formData, 'bmi', bmi)
      })
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    peopleId () {
      return this.$route.query.peopleId
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
      if (this.status === 'correlation') {
        getPeopleArchiveInfo(this.peopleId).then(({ data }) => {
          let formData = data.data || {}
          let queryData = { ...this.$route.query }
          delete queryData.type
          this.formData = { ...formData, ...queryData }
        })
      } else {
        getDiabetesById(id).then(({ data }) => {
          this.formData = data.data || {}
        })
      }
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
