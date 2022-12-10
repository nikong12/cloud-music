<template>
    <div class="box">
        <i class="iconfont icon-xiangxiajiantoux" @click="close"></i>
        <div class="play">
            <div class="play_head">
                <p class="play_head_name">{{ musicInfo.name }}</p>
                <div class="play_head_singer">
                    <span
                        class="play_head_singer"
                        v-for="(item, index) in musicInfo.singer"
                        :key="item.index"
                    >
                        {{ item.name }}
                        <span v-if="index < musicInfo.singer.length - 1"
                            >/</span
                        >
                    </span>
                </div>
            </div>
            <div class="play_botton">
                <div class="play_Img">
                    <el-image
                        :class="{ xuanzhuan: isPlay }"
                        :src="musicInfo.imgUrl"
                        fit="cover"
                    ></el-image>
                </div>
                <div class="play_ly" ref="lyricBox">
                    <p
                        :class="{ isplayin: index === lyricObj.curren }"
                        v-for="(item, index) in lyricObj.lines"
                        :key="index"
                    >
                        {{ item.txt }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Lyric from '@/utils/lyric'
import { mapState } from 'vuex'
import { getMusicLyric } from '@/api/music'
export default {
    name: 'PlayDetail',
    props: ['musicInfo', 'currenTime', 'playId'],
    computed: {
        ...mapState(['isPlay']),
        drawertow: {
            get() {
                return this.$store.state.drawertow
            },
            set(val) {
                return (this.$store.state.drawertow = val)
            }
        }
    },
    watch: {
        playId: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.musicLyric()
                }
            }
        },
        currenTime(val) {
            if (val) {
                this.handleCurrenTime(val)
            }
        }
    },
    data() {
        return {
            num: 0,
            lyricObj: {
                lines: [],
                total: 1,
                curren: 0
            }
        }
    },

    mounted() {},

    methods: {
        close() {
            this.$store.commit('setDrawertow', false)
        },
        async musicLyric() {
            const { data: res } = await getMusicLyric(this.playId)
            if (res.code !== 200) return
            if (res.lrc) this.lyricObj = new Lyric(res.lrc.lyric)
            this.$nextTick(() => {
                this.$refs.lyricBox.scrollTop = 0
            })
            console.log(this.lyricObj)
        },
        handleCurrenTime(time) {
            if (
                this.lyricObj.curren !== this.lyricObj.total - 1 &&
                time + 0.5 > this.lyricObj.lines[this.lyricObj.curren + 1].time
            ) {
                this.lyricObj.curren++
                if (
                    this.lyricObj.curren !== this.lyricObj.total - 1 &&
                    time + 0.5 >
                        this.lyricObj.lines[this.lyricObj.curren + 1].time
                ) {
                    this.handleCurrenTime(time)
                }
                this.lyricHanlder(this.lyricObj.curren)
            } else if (
                this.lyricObj.curren != 0 &&
                time - 0.5 < this.lyricObj.lines[this.lyricObj.curren - 1].time
            ) {
                this.lyricObj.curren--
                if (
                    this.lyricObj.curren != 0 &&
                    time - 0.5 <
                        this.lyricObj.lines[this.lyricObj.curren - 1].time
                ) {
                    this.handleCurrenTime(time)
                }
                this.lyricHanlder(this.lyricObj.curren)
            }
        },
        lyricHanlder(lineNum) {
            if (lineNum > 4) {
                this.scrollAnimation(lineNum - 4)
            } else {
                this.$refs.lyricBox.scrollTop = 0
            }
        },
        scrollAnimation(line) {
            let start
            const step = (timestamp) => {
                if (start === undefined) start = timestamp
                const elapsed = timestamp - start
                this.$refs.lyricBox.scrollTop = Math.min(
                    0.16 * elapsed + (line - 1) * 40,
                    line * 40
                )
                if (elapsed < 250) {
                    // 在.25秒后停止动画
                    window.requestAnimationFrame(step)
                }
            }
            window.requestAnimationFrame(step)
        }
    }
}
</script>

<style scoped>
.isplayin {
    color: #000000;
    font-weight: 700;
    font-size: 28px;
}
.play_ly {
    width: 500px;
    height: 450px;
    /* border: 1px solid black; */
    margin-left: 60px;
    overflow: auto;
    text-align: center;
}
.play_ly p {
    /* font-size: 14px;
    color: rgb(94, 94, 94); */
    line-height: 36px;
}
.play_head {
    text-align: center;
    width: 100%;
}
.play_head_name {
    margin-top: 50px;
    font-size: 36px;
    cursor: default;
}
.play_head_singer {
    margin-top: 10px;
}
.play_head_singer span {
    font-size: 14px;
    cursor: pointer;
    color: rgb(104, 104, 104);
}
.play {
    margin-left: 200px;
    width: 100%;
}
.play_botton {
    display: flex;
    margin-top: 30px;
}
:deep(.el-image__inner) {
    /* margin-top: 100px; */
    width: 350px;
    height: 350px;
    border-radius: 50%;
}
.xuanzhuan {
    -webkit-animation: rotateVbtn 12s linear infinite 800ms 0 ease;
    -moz-animation: rotateVbtn 12s linear infinite 800ms 0 ease;
    -ms-animation: rotateVbtn 12s linear infinite 800ms 0 ease;
    animation: rotateVbtn 12s linear infinite 800ms 0 ease;
    -moz-animation: rotateVbtn 12s linear infinite;
    -webkit-animation: rotateVbtn 12s linear infinite;
    -o-animation: rotateVbtn 12s linear infinite;
    -ms-animation: rotateVbtn 12s linear infinite;
    animation: rotateVbtn 12s linear infinite;
}
.box {
    display: flex;
    padding: 30px;
    height: 100%;
    background-image: linear-gradient(
        rgba(229, 231, 201, 0.623),
        rgb(255, 255, 255)
    );
}
.icon-xiangxiajiantoux {
    cursor: pointer;
    font-size: 34px;
    color: rgb(143, 143, 143);
}
@keyframes rotateVbtn {
    0% {
        -webkit-transform: rotate(0);
        -moz-transform: rotate(0);
        -ms-transform: rotate(0);
        -o-transform: rotate(0);
        transform: rotate(0);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>