/* eslint-disable */
<template>
    <div id="orderInspect">
        <img src="./../../../public/image/order/bitmap@2x.png" alt="" class="bitmap">
        <!-- <div class="title">请输入您要预约检查的项目</div> -->

        <div class="search">
            <van-field v-model="value" placeholder="请输入您要预约检查的项目" />
            <div @click="onSearch" class="searchBtn">搜索</div>
        </div>
        <div class="hotBox">
            <span class="hotTitle">热门搜索</span>
            <div class="hotList">
                <div v-for="(item,index) in hotList" :key="index" class="item" @click="choose(item, index)">
                    <div class="iconBox">
                        <!-- <img src="./../../../public/image/order/bitmap@2x.png" alt="" class="icon"> -->
                    </div>
                    <div class="name">
                        {{item.inspItemName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import {
  hotInspitem
} from '@/api/doctorinspectionitem/index'
export default {
    data() {
        return {
            value: '',
            hotList: []
        }
    },
    created() {
        this.getHotInspitem()
    },
    methods: {
        getHotInspitem() {
            hotInspitem().then(res => {
                this.hotList = res.data.data.filter((item, i) => {
                    return i < 10
                })
                this.hotList.push({
                    inspItemName: '其他预约'
                })
                console.log(this.hotList)
            }).catch(err => {
                console.log(err)
            })
        },
        choose(value, index) {
            // debugger
            if(value.inspItemName === '其他预约' && index === this.hotList.length - 1) {
                this.$router.push({ path: '/main/otherList' })
            } else {
                this.value = value.inspItemName
                this.onSearch()
            }
        },
        onSearch() {
            console.log('搜索')
            if (this.value === '') {
                this.$router.push({ path: '/main/otherList' })
            } else {
                this.$router.push({ path: '/main/orderSearch', query: { data: this.value } })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#orderInspect {
    background: #FFF;
    height: 100%;
    .bitmap {
        width: 102px;
        height: 77.5px;
        margin: 0 auto;
        display: block;
        padding-top: 16px;
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
        margin: 16px 36px;
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
    .hotBox {
        margin: 0 21px;
        .hotTitle {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #9B9B9B;
            letter-spacing: 0.79px;
            text-align: center;
            margin-top: 22px;
        }
        .hotList {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 11px;
            &::after {
                content: '';
                width: 90px;
            }
            .item {
                padding: 15px;
                .iconBox {
                    width: 60px;
                    height: 60px;
                }
                .icon {
                    width: 60px;
                    height: 60px;
                }
                .name {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #072E48;
                    letter-spacing: 0.67px;
                    text-align: center;
                }
            }
        }

    }
}
</style>

