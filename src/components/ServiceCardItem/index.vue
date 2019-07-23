<template>
  <div class="ServiceCardItem" >
    <div >
      <div class="name">
        下次随访时间：
        <span>{{ data.time }}</span>
      </div>
      <div class="idCard text-12">责任医生： {{ data.doctor }}</div>
      <div class="idCard text-12">责任团队： {{ data.team }}</div>
      <div class="idCard text-12">责任医院： {{ data.hospital }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ServiceCardItem',
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style lang="scss">
.ServiceCardItem {
  margin: 15px;
  padding: 15px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  .text-12 {
    font-size: 14px;
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

  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 15px;
    .fllowup-btn + .fllowup-btn {
      margin-left: 12px;
    }
  }
}
</style>
