<template>
  <van-popup v-model="visible" :lockScroll="true" position="right">
    <div class="tree-select">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="back-btn">
          <van-button
            type="info"
            plain
            hairline
            size="small"
            @click="handleSubmit">
            完成
          </van-button>
        </div>
      </div>
      <div class="content">
        <div class="levelList">
          <template v-for="item in treeData" >
            <div class="item" v-if="item.children.length === 0" :key="item.value">
              <div class="title" @click="handleChangeSelect(item)">{{ item.label }}</div>
              <div class="check" v-if="item.check">√</div>
            </div>
            <div v-else class="item" :key="item.value">
              <div class="title" @click="handleChangeLevel(item)">{{ item.label }}</div>
              <div class="check">></div>
            </div>
          </template>
        </div>
        <div class="levelList">
          <template v-for="item in treeDataLevel" >
            <div class="item" v-if="item.children.length === 0" :key="item.value">
              <div class="title" @click="handleChangeSelect(item)">{{ item.label }}</div>
              <div class="check" v-if="item.check">√</div>
            </div>
            <div v-else class="item" :key="item.value">
              <div class="title" @click="handleChangeLevel(item)">{{ item.label }}</div>
              <div class="check">></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'treeSelect',
  data () {
    return {
      visible: false,
      treeData: [
        {
          label: 'A1',
          value: '1000',
          check: false,
          children: [
            {
              label: 'A1-1',
              value: '1100',
              check: false,
              children: []
            }, {
              label: 'A1-2',
              value: '1200',
              check: false,
              children: []
            }, {
              label: 'A1-3',
              value: '1300',
              check: false,
              children: []
            }, {
              label: 'A1-4',
              value: '1400',
              check: false,
              children: []
            }
          ]
        }, {
          label: 'B1',
          value: '2000',
          check: false,
          children: []
        }, {
          label: 'C1',
          value: '3000',
          check: false,
          children: []
        }, {
          label: 'D1',
          value: '4000',
          check: false,
          children: []
        }, {
          label: 'E1',
          value: '5000',
          check: false,
          children: []
        }
      ],
      level: [0]
    }
  },
  computed: {
    treeDataLevel: {
      get () {
        let data = []
        for (let index in this.level) {
          console.log(index)
          if (data.length === 0) {
            data = this.treeData[index].children
          } else {
            data = data[index].children
          }
        }
        return data
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    handleSubmit () {
      this.$emit('submit')
      this.close()
    },
    handleChangeSelect (data) {
      data.check = !data.check
    },
    handleChangeLevel () {

    }
  }
}
</script>

<style lang="scss" scoped>
.tree-select {
  height: 100vh;
  width: 100vw;
  .header {
    display: flex;
    flex-direction: row;
    background: #40444b;
    height: 50px;
    .title {
      flex: 1;
      line-height: 50px;
      padding-left: 20px;
      color: #ffffff;
    }
    .back-btn {
      padding: 0 20px;
      line-height: 50px;
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    .levelList {
      width: 50vw;
      height: calc(100vh - 50px);
      border-right: 1px solid #dddddd;
      .item {
        display: flex;
        flex-direction: row;
        padding: 0 0 0 15px;
        .title {
          flex: 1;
          line-height: 30px;
        }
        .check {
          width: 30px;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
}
</style>
