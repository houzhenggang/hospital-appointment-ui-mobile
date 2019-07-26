<template>
    <div>
        <div class="title">请输入您要预约检查的项目</div>
        <van-search
            v-model="value"
            placeholder=""
            show-action
            shape="round"
            @search="onSearch"
            >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
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
.title {
    text-align: center;
}
.example {
    text-align: center;
}
</style>

