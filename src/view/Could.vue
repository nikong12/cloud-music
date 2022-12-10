<template>
    <div class="app">
        <div class="sele">
            <p :class="{selp:key === item.key}" @click="gosel(item)" v-for="item in sele" :key="item.index">{{item.name}}</p>
        </div>
    <router-view class="aa"></router-view>
    </div>
</template>
<script>
export default {
    name: 'Could',
    components:{

    },
    data() {
        return {
            key:0,
            banners:[],
            sele:[
                {name:'个性推荐',key:0,path:'/recommend'},
                {name:'歌单',key:1,path:'/songList'},
                {name:'排行榜',key:2,path:'/rankinglist'},
                {name:'歌手',key:3,path:'/singer'}
            ]
        };
    },

    mounted() {

    },

    methods: {
        gosel(e){
            this.key = e.key
            this.$router.push(e.path)
        }
    },
};
</script>

<style scoped>  
    .sele {
        margin-left: 120px;
        display: flex;
        height: 8%;
    }
    .aa {
        height: 92%;
    }
    .sele p {
        margin-right: 30px;
        font-family: 幼圆;
        font-weight: 900;
        height: 30px;
    }
    .selp {
        font-size: 20px;
        border-bottom: 4px solid red;
    }
    .sele p:hover {
        cursor:pointer;
    }
    .app {
        margin-top: 1px;
        height: 100%;
    }
</style>