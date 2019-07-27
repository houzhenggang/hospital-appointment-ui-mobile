<template>
    <div id="orderInspect">
        <img src="./../../../public/image/order/bitmap@2x.png" alt="" class="bitmap">
        <div class="title">请输入您要预约检查的项目</div>

        <div class="search">
            <van-field v-model="value" />
            <div @click="onSearch" class="searchBtn">搜索</div>
        </div>
        <div class="example">
            示例：“心电检测“
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        onSearch() {
            console.log('搜索')
            this.$router.push({ path: '/main/orderSearch' })
        }
    }
}
</script>

<style lang="scss" scoped>
#orderInspect {
    background: #FFF;
    height: 100%;
    .bitmap {
        width: 146px;
        height: 112px;
        margin: 0 auto;
        display: block;
        padding-top: 33px;
    }
    .title {
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #072E48;
        letter-spacing: 0.83px;
        text-align: center;
        margin-top: 22px;
    }
    .search {
        margin: 16px 51px;
        display: flex;
        background: #FFFFFF;
        border: 1px solid rgba(151,151,151,0.22);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12);
        .searchBtn {
            font-family: PingFangSC-Medium;
            font-size: 15px;
            color: #FFFFFF;
            letter-spacing: 0.83px;
            text-align: center;
            width: 50px;
            line-height: 45px;
            background: #245EE5;
            padding: 0 5px;
        }
    }
    .example {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #9B9B9B;
        letter-spacing: 0.83px;
        text-align: center;
    }
}
</style>

