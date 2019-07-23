<template>
  <div class="components">
    <!-- 字典选择器 -->
    <van-actionsheet v-model="componentShow.selectShow" :actions="dictMap" name="label" cancel-text="取消" @select="selectConfirm" @cancel="componentShow.selectShow = false" />
    <!-- 时间选择器 -->
    <van-popup v-model="componentShow.dateShow" position="bottom">
      <van-datetime-picker type="date" :min-date="minDate" v-model="thisday" @confirm="selectConfirm" @cancel="() => {this.componentShow.dateShow = false}" />
    </van-popup>
    <!-- 医院相关 -->
    <van-actionsheet v-model="componentShow.popupShow" :actions="dictMap" name="label" cancel-text="取消" @select="selectConfirm" @cancel="componentShow.popupShow = false" />
    <!-- 是否选择器 -->
    <van-actionsheet v-model="componentShow.yesornoShow" :actions="dictMap" name="label" cancel-text="取消" @select="selectConfirm" @cancel="componentShow.yesornoShow = false" />
    <!-- 多选 -->
    <van-popup v-model="componentShow.checkboxShow" position="bottom" @confirm="selectConfirm">
      <van-checkbox-group v-model="checkboxValue">
        <div class="button-list">
          <div class="close" @click="checkboxClose">取消</div>
          <div class="confirm" @click="checkboxConfirm">确定</div>
        </div>
        <van-cell-group>
          <van-cell
            v-for="(item, index) in dictMap"
            clickable
            :key="index"
            :title="item.label"
            @click="handleCheckbox(index)"
          >
            <van-checkbox :name="item" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
  </div>
</template>

<script>
import { getDict } from '@/utils/'

const dict_yesorno = [{ label: '是', value: '0' }, { label: '否', value: '1' }]

export default {
  props: {
    hospitalLists: {
      type: Object
    }
  },
  data () {
    return {
      openRow: {},
      componentShow: {
        selectShow: false,
        dateShow: false,
        popupShow: false,
        yesornoShow: false,
        checkboxShow: false
      },
      dictMap: [],
      dictMaps: {
        sex: getDict('SexType'),
        peopleTypeList: getDict('PEOPLETYPE'),
        peopleState: getDict('PeopleState'),
        paymentMethod: getDict('PAYMENTMETHOD'),
        bloodType: getDict('BLOODTYPE'),
        rhNegative: getDict('RHNEGATIVE'),
        national: getDict('NATIONAL'),
        maritalStatus: getDict('MARITALSTATUS'),
        educationLevel: getDict('EDUCATIONLEVEL'),
        householdTtype: getDict('HOUSEHOLDTYPE'),
        professional: getDict('PROFESSIONAL'),
        otherAllergy: getDict('ALLERGY'),
        exposed: getDict('EXPOSUREHISTORY'),
        disability: getDict('DISEASETYPE'),
        surgery: dict_yesorno,
        trauma: dict_yesorno,
        blood: dict_yesorno,
        fatherDiseaseArray: getDict('DISEASETYPE'),
        motherDiseaseArray: getDict('DISEASETYPE'),
        basDiseaseArray: getDict('DISEASETYPE'),
        childrenDiseaseArray: getDict('DISEASETYPE'),
        genetic: dict_yesorno,
        disabilityContentArray: getDict('DISABILITY'),
        kitchenExhaust: getDict('KITCHENEXHAUST'),
        drinkingWater: getDict('DRINKINGWATER'),
        toilet: getDict('TOILET'),
        livestockBar: getDict('LIVESTOCKBAR')
      },
      minDate: new Date('2010-01-01'),
      thisday: new Date(),
      checkboxValue: []
    }
  },
  methods: {
    open (row) {
      this.openRow = row
      if (row.type === 'select') {
        this.componentShow.selectShow = true
        this.dictMap = this.dictMaps[row.value].map(m => { m.name = m.label; return m })
      } else if (row.type === 'date') {
        this.componentShow.dateShow = true
      } else if (row.type === 'popup') {
        this.componentShow.popupShow = true
        this.dictMap = this.hospitalLists[row.dict].map(m => { m.value = m.id; return m })
      } else if (row.type === 'yesorno') {
        this.componentShow.yesornoShow = true
        this.dictMap = this.dictMaps[row.value].map(m => { m.name = m.label; return m })
      } else if (row.type === 'checkbox') {
        this.componentShow.checkboxShow = true
        this.dictMap = this.dictMaps[row.value].map(m => { m.name = m.label; return m })
      }
    },
    selectConfirm (val) {
      this.componentShow[`${this.openRow.type}Show`] = false
      this.$emit('select-confirm', this.openRow, val)
    },
    checkboxClose () {
      this.componentShow.checkboxShow = false
      this.dictMap = []
    },
    checkboxConfirm () {
      this.componentShow.checkboxShow = false
      let val = this.checkboxValue.map(m => m.value)
      this.$emit('select-confirm', this.openRow, val)
      this.checkboxValue = []
    },
    handleCheckbox (index) {
      this.$refs.checkboxes[index].toggle()
    }
  }
}
</script>
