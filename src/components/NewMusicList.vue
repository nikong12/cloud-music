<template>
    <div class="box">
        <div
            class="musicbox"
            v-for="item in newMusic"
            :key="item.index"
            @dblclick="addPlay(item)"
        >
            <img
                class="musicbox_img"
                :src="item.al.picUrl"
                @click="addPlay(item)"
            />
            <div class="musicname">
                <div class="musicbox_name">{{ item.name }}</div>
                <span
                    class="musicbox_singer"
                    v-for="(i, index) in item.ar.slice(0, 3)"
                    :key="i.index"
                >
                    {{ i.name }}
                    <template v-if="index < item.ar.length - 1">
                        <span>/</span>
                    </template>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NewMusicList',
    props: ['newMusic'],
    computed: {
        ...mapState(['playList', 'playIndex'])
    },
    data() {
        return {
            list: []
        }
    },

    mounted() {},

    methods: {
        addPlay(e) {
            this.list = this.playList
            this.list.splice(this.playIndex + 1, 0, e)
            this.$store.dispatch('getPlayList', {
                playList: this.list,
                id: e.id
            })
            console.log(this.list)
        }
    }
}
</script>

<style scoped>
.box {
    width: 1085px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.musicbox:hover {
    background-color: rgb(246, 246, 246);
}
.musicbox {
    display: flex;
    width: 330px;
    margin-bottom: 25px;
    margin-left: 15px;
    border-radius: 10px;
    transition: 0.3s;
}
.musicbox:nth-child(1) {
    margin-left: 0;
}
.musicbox:nth-child(4) {
    margin-left: 0;
}
.musicbox:nth-child(7) {
    margin-left: 0;
}
.musicbox:nth-child(10) {
    margin-left: 0;
}
.musicbox_img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    cursor: pointer;
}
.musicbox_name {
    color: rgb(89, 89, 89);
    font-size: 14px;
    cursor: default;
}
.musicbox_singer {
    margin-top: 5px;
    font-size: 12px;
    color: rgb(152, 152, 152);
    cursor: pointer;
}
.musicname {
    margin-top: 10px;
    margin-left: 15px;
}
</style>