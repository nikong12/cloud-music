<template>
    <div class="app">
        <el-skeleton :loading="isLoding" animated>
            <template slot="template">
                <div style="display: flex; width: 100%">
                    <el-skeleton-item
                        variant="image"
                        style="width: 180px; height: 180px"
                        animated
                    />
                    <el-skeleton
                        :rows="3"
                        style="width: 500px; margintop: 50px; marginleft: 30px"
                        animated
                    />
                </div>
                <el-skeleton :rows="1" style="margintop: 30px" />
                <el-skeleton :rows="8" style="margintop: 30px; width: 1200px" />
            </template>
            <template>
                <div class="header">
                    <div class="heatop">
                        <div class="day">
                            <p>{{ day }}</p>
                        </div>
                        <div class="div1">
                            <p class="title">每日歌曲推荐</p>
                            <p class="tex">
                                根据你的口味每日生成不同歌单,每天6:00更新
                            </p>
                        </div>
                    </div>
                </div>
                <MusicList :tableData="tableData" />
            </template>
        </el-skeleton>
    </div>
</template>

<script>
import 'animate.css'
import { getEverDayMusic } from '@/api/music'
import MusicList from '@/components/MusicList.vue'
export default {
    name: 'DayList',
    components: { MusicList },
    data() {
        return {
            tableData: [],
            MusicList: [],
            isLoding: false
        }
    },
    computed: {
        day() {
            return new Date().getDate() < 10
                ? '0' + new Date().getDate()
                : new Date().getDate()
        }
    },

    mounted() {
        this.getDayMusic()
    },

    methods: {
        async getDayMusic() {
            this.isLoding = true
            const { data: res } = await getEverDayMusic()
            if (res.code === 200) {
                this.tableData = res.data.dailySongs
                this.isLoding = false
            }
            this.tableData.forEach((item) => {
                this.MusicList.push(item.id)
            })
        }
    }
}
</script>

<style scoped>
.app {
    /* height: 591px; */
    height: 98%;
    overflow: auto;
    margin-left: 80px;
}
.header {
    height: 180px;
    width: 100%;
    border-bottom: 1px solid rgb(121, 121, 121);
}
.day {
    width: 130px;
    height: 120px;
    border-radius: 26px;
    border: 6px solid #e33e3e;
    position: relative;
}
.day::after {
    content: '';
    position: absolute;
    width: 100px;
    background-color: #e33e3e;
    left: 14px;
    top: 16px;
    height: 6px;
    border-radius: 8px;
}
.day p {
    position: absolute;
    font-size: 70px;
    color: #e33e3e;
    top: 20px;
    left: 24px;
}
.heatop {
    display: flex;
}
.title {
    font-weight: bold;
    font-size: 30px;
}
.tex {
    margin-top: 6px;
    font-size: 14px;
    color: rgb(84, 84, 84);
}
.div1 {
    margin-top: 20px;
    margin-left: 50px;
}
</style>