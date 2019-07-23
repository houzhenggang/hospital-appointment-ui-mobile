export default {
  methods: {
    zFormFn (option, row) {
      this[option.fn](row.value)
    },
    initTeamDict (id) {
      this.axios.get(`/api/base/doctorserviceteam/dict/${id}`).then(({
        data
      }) => {
        this.$set(
          this.options[this.teamIndex],
          'dicData',
          this.cleanDictData(data.data, this.options[this.teamIndex].props)
        ) // 根据医院获取团队
      })
    },
    initDoctorDict (id) {
      this.axios.get(`/api/base/doctordoctorinfo/dict-team/${id}`).then(({
        data
      }) => {
        this.$set(
          this.options[this.doctorIndex],
          'dicData',
          this.cleanDictData(data.data, this.options[this.doctorIndex].props)
        ) // 根据团队获取医生
      })
    }
  }
}
