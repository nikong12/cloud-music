<template>
    <div class="div1">
        <div class="box" v-for="item in musicList" :key="item.index" @click="routerList(item.id)">
            <img :src="item.picUrl"></img>
            <i class="iconfont icon-bofang"></i>
            <p class="title">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MusicListfont',
    props:['musicList'],
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        routerList(e){
            this.$router.push(`playList/${e}`)
        }
    },
};
</script>

<style scoped>
.div1 {
    display: flex;
    width: 1085px;
    flex-direction: row;
    flex-wrap: wrap;

}
.title {
    width: 160px;
    margin-top: 5px;
    cursor: pointer;
    word-wrap:break-word;
    font-size: 14px;
    color: rgb(89, 89, 89);
}
.title:hover {
    color: black;
}
.box {
    position: relative;
    margin-top: 10px;
    margin-left: 25px;
}
.box:hover i {
    opacity: 0.858;
}
.box:nth-child(1){
    margin-left: 0;
}
.box:nth-child(7){
    margin-left: 0;
}
.box:nth-child(13){
    margin-left: 0;
}
.box img {
    width: 160px;
    height: 160px;
    border-radius: 15px;
    cursor: pointer;
}
i {
    position: absolute;
    right: 15px;
    bottom: 60px;
    color: #ec5241;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    opacity: 0;
    transition: all .7s ease-in-out;
    cursor: pointer;
}

</style>