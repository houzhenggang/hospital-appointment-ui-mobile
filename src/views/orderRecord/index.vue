<template>
    <div>
        <van-tabs @click="onClick" color='#999'>
            <van-tab v-for="(item,index) in tabList" :title="item.title" :key="index">
                <!-- 内容 {{ index }} -->
                <div v-for="(lItem, lIndex) in list" :key="lIndex" class="list">
                    <div class="top">
                        <span>预约项目：{{lItem.text1}}</span>
                        <span>{{lItem.time}}</span>
                    </div>
                    <div class="middle">
                        <span>预约者：{{lItem.text1}}</span>
                        <span>预约时间：{{lItem.text1}}</span>
                        <span>预约医院：{{lItem.text1}}</span>
                    </div>
                    <div class="bottom">
                        <span>共计{{lItem.price}}</span>
                        <button>取消</button>
                    </div>
                </div>
            </van-tab>
        </van-tabs> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabList: [{
                title: '已预约'
            }, {
                title: '已检查'
            }, {
                title: '已过期'
            }, {
                title: '已取消'
            }],
            list: [{
                text1: '心电检测',
                time: '2019-05-08 10:10:54',
                price: 246,
            }]
        }
    },
    methods: {
        onClick(name, title) {
            console.log(name)
            console.log(title)
            // 更改条件，显示不同的列表
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    padding: 10px;
    border: 1px solid #999;
    margin: 10px;
    .top {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #999;
    }
    .middle {
        span {
            display: block;
        }
    }
    .bottom {
        display: flex;
        justify-content: space-between;
    }
}
</style>


