<template>
    <div class="app">
        <Banner class="banner" />
        <p class="pp">推荐歌单></p>
        <MusicListfont :musicList="musicList" />
        <p class="pp">最新音乐></p>
        <NewMusicList :newMusic="newMusic" />
    </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import MusicListfont from '@/components/MusicListfont.vue'
import NewMusicList from '@/components/NewMusicList.vue'
import { getDayMusiList } from '@/api/musiclist'
import { getHome } from '@/api/other'
import { getMusicDetail } from '@/api/music'
import { mapState } from 'vuex'
export default {
    name: 'Recommend',
    components: { Banner, MusicListfont, NewMusicList },
    data() {
        return {
            user: {},
            limit: 12,
            musicList: [],
            newMusic: []
        }
    },
    computed: {
        ...mapState(['userId', 'isLogin'])
    },
    watch: {
        // isLogin() {
        //     console.log('change')
        //     this.getMusicList()
        // }
    },

    mounted() {
        this.getMusicList()
        this.getHomeList()
    },

    methods: {
        async getMusicList() {
            if (this.isLogin) {
                const { data: res } = await getDayMusiList()
                if (res.code !== 200) return
                let arr = res.recommend.splice(
                    res.recommend.length - 12,
                    res.recommend.length - 1
                )
                this.musicList = arr
            } else return
        },
        async getHomeList() {
            const { data: res } = await getHome()
            if (res.code !== 200) return

            this.MusicDetail(
                JSON.parse(res.data.exposedResource).song.join(',')
            )
        },
        async MusicDetail(ids) {
            const { data: res } = await getMusicDetail(ids)
            if (res.code !== 200) return
            this.newMusic = res.songs
        }
    }
}
</script>

<style scoped>
.app {
    margin-left: 120px;
    overflow: auto;
    height: 89%;
    width: 1216px;
}
.pp {
    width: 120px;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 25px;
}
</style>