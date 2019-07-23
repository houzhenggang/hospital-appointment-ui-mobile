<template>
  <div id="odp-card-item">
    <div class="card-head"><p class="card-icon"></p><p class="card-title">{{field.name}}</p></div>
    <van-list>
      <van-cell v-for="(item, index) in field.list" :key="index" :title="item.name">
        <span v-if="item.dict">{{dictMap[item.dict][data[item.value]]}}</span>
        <span v-else>{{data[item.value]}}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import './style.scss'

export default {
  props: {
    field: {
      type: Object,
      default: () => {
        return {
          list: []
        }
      }
    },
    data: {
      type: Object
    },
    dictMap: {
      type: Object
    }
  }
}
</script>
