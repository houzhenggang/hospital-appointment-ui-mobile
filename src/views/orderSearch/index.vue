<template>
    <div id="orderSearch">
        <section class="search">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                @search="onSearch"
            />
        </section>
        <section class="box">
            <div class="list" v-for="(item,index) in list" :key="index">
                <div class="left">
                    <img :src="item.image" alt="">
                </div>
                <div class="middle">
                    <span>{{item.name}}</span>
                    <span>{{item.phone}}</span>
                    <span>{{item.num}}</span>
                </div>
                <div class="right">
                    <span class="num">{{item.num}}</span>
                    <span class="suffix">可预约</span>
                    <van-icon name="arrow" />
                </div>
            </div>
        </section>
    </div>
</template>


<script>
export default {
    data() {
        return {
            value: '',
            list: [{
                image: require('./../../../public/assets/touxiang_nan.png'),
                name: '1111',
                phone: '1111111',
                text: '111',
                num: 0
            }, {
                image: require('./../../../public/assets/touxiang_nan.png'),
                name: '1111',
                phone: '1111111',
                text: '111',
                num: 0
            }]
        }
    },
    methods: {
        onSearch() {
            console.log('搜索')
        },
        onCancel() {
            console.log('取消')
        }
    }
}
</script>

<style lang="scss" scoped>
#orderSearch {
    position: relative;
    .search {
        position: absolute;
        top: -40px;
        z-index: 2;
        right: 0;
        width: calc(100% - 30px);
    }
    .box {
        padding-top: 40px;
        .list {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #999;
            padding: 10px;
            .left {
                flex: 0 0 100px;
                width: 100px;
                height: 100px;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .middle {
                flex: 1;
                span {
                    display: block;
                    margin-left: 10px;
                }
            }
            .right {
                flex: 0 0 100px;
                .num {

                }
                .suffix {

                }
            }
        }
    }
}
</style>

