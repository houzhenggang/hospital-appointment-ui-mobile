<template>
  <div
    class="followUpCardItem"
  >
    <div @click.prevent="handleClick">
      <div class="name">
        姓名：
        <span>{{ data.name }}</span>
      </div>
      <div class="idCard text-12">身份证号 {{ data.idCard }}</div>
      <div class="createTime text-12">随访时间 {{ data.followTime }}</div>
      <div class="tags text-12">
        <div v-for="item in tags" class="tag-item" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDictValue
} from '@/utils/dict'
import { setTimeout } from 'timers'
import {
  state as dictAllState
} from '@/const/dynamicDict'

export default {
  name: 'followUpCardItem',
  data () {
    return {
      hospitalList: [],
      teamList: [],
      doctorList: [],
      tags: []
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClick () {
      this.$emit('detail', this.data, { name: this.name, idCard: this.idCard, createTime: this.createTime })
    },
    getTags (data, props) {
      let tags = []
      if (data.hospitalId) {
        tags.push(getDictValue(dictAllState.hospitalDictAll, data.hospitalId, props))
      }
      if (data.teamId) {
        tags.push(getDictValue(dictAllState.teamDictAll, data.teamId, props))
      }
      if (data.doctorId) {
        tags.push(getDictValue(dictAllState.doctorDictAll, data.doctorId, props))
      }
      this.tags = tags
    },
    handleUpdate () {
      this.$emit('update', this.data)
    }
  },
  created () {
    setTimeout(() => {
      this.getTags(this.data, { label: 'name', value: 'id' })
    }, 100)
  }
}
</script>

<style lang="scss">
.followUpCardItem {
  margin: 15px;
  padding: 15px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  .text-12 {
    font-size: 12px;
  }
  .name {
    font-weight: bold;
    margin-bottom: 12px;
    span {
      color: #18c444;
    }
  }
  .createTime {
    margin: 12px 0;
  }
  .createTime,
  .idCard {
    color: #989898;
  }
  .tags {
    display: flex;
    flex-direction: row;
    .tag-item + .tag-item {
      margin-left: 15px;
    }
    .tag-item {
      padding: 5px;
      border-radius: 2px;
      background: #f0f0f0;
      color: #989898;
      font-size: 10px;
    }
  }
  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 15px;
    .fllowup-btn + .fllowup-btn {
      margin-left: 12px;
    }
    .fllowup-btn {
      font-size: 12px;
      color: #282828;
      cursor: pointer;
      &::before {
        margin-right: 5px;
      }
      &:active {
        color: rgb(0, 200, 226);
      }
    }
  }
}
</style>
