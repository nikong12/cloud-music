<template>
    <div class="table">
        <el-table
            :key="456"
            :data="
                tableData.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                )
            "
            stripe
            style="width: 100%"
            ref="reference"
            :row-style="{ height: '40px' }"
            :cell-style="{ padding: '0' }"
        >
            <el-table-column type="index" width="50">
                <template v-slot="scope">
                    <div v-if="showCurren(scope.row.id)">
                        <i
                            v-if="isPlay"
                            class="iconfont icon-shengyin_shiti"
                        ></i>
                        <i v-else class="iconfont icon-zant"></i>
                    </div>
                    <div v-else>
                        {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="like" label="喜欢" width="80">
                <template v-slot="{ row }">
                    <span class="sp" @click="musiclike(row.id)">
                        <svg
                            v-if="isLiked(row.id)"
                            t="1664864948612"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="6956"
                            width="18"
                            height="18"
                        >
                            <path
                                d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z"
                                p-id="6957"
                                fill="#d81e06"
                            ></path>
                        </svg>
                        <svg
                            v-else
                            t="1664865016839"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="7495"
                            width="18"
                            height="18"
                        >
                            <path
                                d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z m0 63.146667c-41.44 0-70.261333 15.189333-116.96 55.04-2.165333 1.845333-14.4 12.373333-17.941334 15.381333a32.32 32.32 0 0 1-41.770666 0c-3.541333-3.018667-15.776-13.536-17.941334-15.381333-46.698667-39.850667-75.52-55.04-116.96-55.04C230.186667 180.48 149.333333 281.258667 149.333333 426.698667 149.333333 537.6 262.858667 675.242667 493.632 834.826667a32.352 32.352 0 0 0 36.736 0C761.141333 675.253333 874.666667 537.6 874.666667 426.698667c0-145.44-80.853333-246.218667-206.88-246.218667z"
                                p-id="7496"
                                fill="#707070"
                            ></path>
                        </svg>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="musicName" label="音乐标题" width="420">
                <template v-slot="{ row }">
                    <div
                        @dblclick="music(row)"
                        :class="{ fontcolor: showCurren(row.id) }"
                    >
                        {{ row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="singer" label="歌手" width="280">
                <template v-slot="{ row }">
                    <span v-for="(item, index) in row.ar" :key="item.index"
                        >{{ item.name }}
                        <template v-if="index < row.ar.length - 1">
                            <span>/</span>
                        </template>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="singer" label="专辑" width="280">
                <template v-slot="{ row }">
                    <span>
                        {{ row.al.name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="时长" width="140">
                <template v-slot="{ row }">
                    {{ row.dt | formatTime }}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total,prev,pager,next"
            :total="tableData.length"
        >
        </el-pagination>
    </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { getLikeMusic } from '@/api/music'

export default {
    name: 'MusicList',
    props: {
        tableData: {
            type: Array,
            required: true,
            default: () => {}
        }
    },
    computed: {
        ...mapState(['likeMusic', 'isPlay', 'playId']),
        aa(id) {
            return this.likeMusic.indexOf(id)
        }
    },

    data() {
        return {
            playList: [],
            currentPage: 1,
            pageSize: 60
        }
    },
    filters: {
        formatTime(val) {
            return moment(val).format('mm:ss')
        }
    },
    methods: {
        isLiked(id) {
            return this.likeMusic.indexOf(id) !== -1
        },
        table() {
            this.$refs.reference.body
        },
        music(e) {
            let list = JSON.parse(JSON.stringify(this.tableData))
            this.$store.dispatch('getPlayList', {
                playList: list,
                id: e.id
            })
        },
        showCurren(id) {
            return this.playId === id
        },
        async musiclike(e) {
            let like = this.isLiked(e)
            const { data: res } = await getLikeMusic(e, !like)
            if (res.code !== 200) return
            if (like) {
                this.$confirm('是否取消喜欢', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$store.commit('setLikeMusic', {
                            type: 'remove',
                            data: e
                        })
                        this.$message({
                            type: 'success',
                            message: '取消喜欢成功'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
            } else {
                this.$store.commit('setLikeMusic', {
                    type: 'unshift',
                    data: e
                })
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val
        }
    }
}
</script>

<style scoped>
svg {
    margin-top: 8px;
}
.cell {
    display: flex;
    line-height: 25px;
}
.cell span {
    font-size: 12px;
    /* width: 100%; */
    cursor: pointer;
}
.iconfont {
    color: #ec4141;
}
.fontcolor {
    color: #ec4141;
}
.sp {
    cursor: pointer;
}
:deep(.el-pagination) {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    margin-left: -100px;
}
</style>