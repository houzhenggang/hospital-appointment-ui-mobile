<template>
    <div id="orderSearch">
        <section class="search">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                @search="onSearch"
            />
            <div @click="showPopup" class="filter">筛选</div>
        </section>
        <section class="box">
            <div class="list" v-for="(item,index) in list" :key="index" @click="toDetail">
                <div class="left">
                    <img :src="item.image" alt="">
                </div>
                <div class="middle">
                    <span class="hospital">{{item.name}}</span>
                    <span class="phone">电话：{{item.phone}}</span>
                    <span class="project">{{item.text}}</span>
                </div>
                <div class="right">
                    <span class="num" :class="{gray: item.num === 0}">{{item.num}}</span>
                    <span class="suffix">可预约</span>
                    <van-icon name="arrow" />
                </div>
            </div>
        </section>

        <van-popup
            v-model="show"
            position="top"
            :overlay='false'
            :style="{ height: '100%' }"
            >
            <div class="timeBox">
                <span class="timeText">开始时间</span>
                <van-field
                    readonly
                    clickable
                    :value="startTime.toString()"
                    placeholder="请选择开始时间"
                    @click="showStartPicker = true"
                    class="timeContent"
                />

                <span class="timeText">截止时间</span>
                <van-field
                    readonly
                    clickable
                    :value="endTime.toString()"
                    placeholder="请选择截止时间"
                    @click="showEndPicker = true"
                    class="timeContent"
                />

                <div class="btnGroup">
                    <div class="btn cancelBtn" @click="show = false">取消</div>
                    <div class="btn okBtn" @click="toFilter">确定</div>
                </div>

            </div>

            <van-popup v-model="showStartPicker" position="bottom">
                <van-datetime-picker
                    v-model="startTime"
                    @cancel="showStartPicker = false"
                    @confirm="onStartConfirm"
                />
            </van-popup>
            <van-popup v-model="showEndPicker" position="bottom">
                <van-datetime-picker
                    v-model="endTime"
                    type="datetime"
                    @cancel="showEndPicker = false"
                    @confirm="onEndConfirm"
                />
            </van-popup>
        </van-popup>
    </div>
</template>


<script>
export default {
    data() {
        return {
            value: '',
            show: false,
            showStartPicker: false,
            showEndPicker: false,
            list: [{
                image: require('./../../../public/assets/touxiang_nan.png'),
                name: '南京市第一人民医院',
                phone: '025-9876543',
                text: '心电图检测',
                num: 188
            }, {
                image: require('./../../../public/assets/touxiang_nan.png'),
                name: '南京市第一人民医院',
                phone: '025-9876543',
                text: '心电图检测',
                num: 0
            }],
            startTime: new Date(),
            endTime: new Date()
        }
    },
    methods: {
        onSearch() {
            console.log('搜索')
        },
        onCancel() {
            console.log('取消')
        },
        toDetail() {
            console.log('去医院详情页')
            this.$router.push({ path: '/main/hospitalDetails' })
        },
        showPopup() {
            this.show = true;
        },
        onStartConfirm(value) {
            console.log(value)
            this.startTime = value
            this.showStartPicker = false;
        },
        onEndConfirm(value) {
            this.endTime = value.toString()
            this.showEndPicker = false;
        },
        toFilter() {
            this.show = false
            console.log('筛选')
        }
    }
}
</script>

<style lang="scss" scoped>
#orderSearch {
    position: relative;
    .search {
        position: absolute;
        top: -41px;
        z-index: 2;
        right: 0;
        width: calc(100% - 30px);
        display: flex;
        .van-search {
            flex: 1;
        }
        .filter {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.94px;
            flex: 0 0 50px;
            padding-top: 20px;
        }
    }
    .box {
        padding-top: 20px;
        .list {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(151,151,151,0.11);
            padding: 15px 18px;
            .left {
                flex: 0 0 24%;
                width: 24%;
                height: 18.7vw;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 6px;
                }
            }
            .middle {
                flex: 1;
                span {
                    display: block;
                    margin-left: 10px;
                }
                .hospital {
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0.78px;
                }
                .phone {
                    font-family: PingFangSC-Regular;
                    font-size: 11px;
                    color: #4A4A4A;
                    letter-spacing: 0.71px;
                }
                .project {
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0.78px;
                    margin-top: 12px;
                }
            }
            .right {
                flex: 0 0 100px;
                text-align: right;
                span {
                    font-family: PingFangSC-Regular;
                    font-size: 11px;
                    letter-spacing: 0.71px;
                    text-align: center;
                    line-height: 16px;
                }
                .num {
                    color: #245EE5;
                }
                .gray {
                    color: #9B9B9B;
                }
                .suffix {
                    color: #000000;
                }
            }
        }
    }
    .van-popup {
        top: 60px;
    }
    .timeBox {
        padding: 18px 27px;
        .timeText {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0.71px;
        }
        .timeContent {
            margin-top: 9px;
            margin-bottom: 17px;
            background: #F3F3F3;
            border: 1px solid rgba(151,151,151,0.15);
        }
        .btnGroup {
            display: flex;
            justify-content: space-between;
            margin-top: 33px;
            .btn {
                width: 38.4vw;
                height: 10vw;
                text-align: center;
                line-height: 10vw;
                border-radius: 8px;
            }
            .cancelBtn {
                background: #FFFFFF;
                border: 1px solid rgba(151,151,151,0.51);
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0.94px;
            }
            .okBtn {
                background: #235FE3;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0.94px;


            }
        }
    }
}
</style>

