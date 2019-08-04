/* eslint-disable */
<template>
    <div id="orderApplyForWait">
        <!-- <div class="TopTitle"></div> -->
        <img src="./../../../public/image/order/waitBg.png" alt="" class="bitmap">
        <div class="title">您的预约检查申请已提交，</div>
        <div class="title">您可以在【我的预约】里查看详情</div>

        <div class="btn" @click="toHome">返回首页</div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        toHome() {
            this.$router.push({ name: 'orderInspect' })
        }
    }
}
</script>

<style lang="scss" scoped>
#orderApplyForWait {
    background: #F3F3F3;
    height: 100%;
    .TopTitle {
        position: absolute;
        top: 20px;
        z-index: 3;
        left: 50%;
        transform: translateX(-50%);
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #072E48;
        letter-spacing: 0.83px;
        text-align: center;
    }
    .bitmap {
        width: 190px;
        height: 140px;
        margin: 0 auto;
        display: block;
        padding-top: 92px;
        margin-bottom: 26px;
    }
    .title {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0.78px;
        text-align: center;
    }
    .btn {
        width: 61vw;
        height: 10vw;
        line-height: 10vw;
        border-radius: 8px;
        margin: 0 auto;
        text-align: center;
        background: #235FE3;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0.94px;
        margin-top: 26px;
    }
}
</style>

