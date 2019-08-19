/* eslint-disable */
<template>
    <div id="otherList">
        <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @navclick="onClickNav"
        @itemclick="onClickItem"
        class="box"
        >
        </van-tree-select>
    </div>
</template>


<script>
/* eslint-disable */
import {
    getByInspType
} from '@/api/doctorinspectionitem/index'
import {
  getInspectionTypeDict
} from '@/api/admin/dict'
import { setTimeout } from 'timers';

export default {
    data() {
        return {
            items: [],
            mainActiveIndex: 0,
            activeId: 1
        }
    },
    async created() {
        await this.getInspectionType()
        await this.getDataByInspType(this.items[0].value, 0)
    },
    methods: {
        async getInspectionType() {
            let res = await getInspectionTypeDict()
            let result = res.data.data.map(ele => {
                let list = []
                list.text = ele.label
                list.value = ele.value
                list.children = []
                return list
            })
            this.items = result
        },
        async getDataByInspType(data, index) {
            let res = await getByInspType(data)

            let result = []
            result = res.data.data.map(ele => {
                let list = {}
                list.text = ele.inspItemName
                list.id = ele.inspItemId
                return list
            })
            this.items[index].children = result
        },
        async onClickNav(index) {
            await this.getDataByInspType(this.items[index].value, index)
            setTimeout(() => {
                this.mainActiveIndex = index;
            }, 1000 / 60)
        },
        onClickItem(data) {
            this.activeId = data.id;
            this.toDetail(data.text)
        },
        toDetail(item) {
            this.$router.push({ path: '/main/orderSearch', query: { data: item } })
        }
    }
}
</script>

<style lang="scss" scoped>
#otherList {
    position: relative;
    width: 100%;
    height: 100%;
    .box {
        height: 100vh!important;
        .van-tree-select__nav-item--active {
            border-color: #245EE5!important;
        }
    }
}
</style>

