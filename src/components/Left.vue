<template>
    <div class="app" >
        <div class="wrapper">
            <ul>
                <li>
                    <span>我的音乐</span>
                    <ul>
                        <li :class="{select:key === item.key}" v-for="item in leftList" :key="item.index" class="selli" @click="goindex(item)">{{item.title}}</li>
                    </ul>
                </li>
                <li>
                    <span>创建的歌单</span>
                    <ul>
                        <li class="selli" v-for="item in creList" :key="item.index">{{item.name}}</li>
                    </ul>
                </li>
                <li>
                    <span>收藏的歌单</span>
                    <ul>
                        <li class="selli" v-for="item in subList" :key="item.index">{{item.name | ellipsis}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'Left',
    computed:{
        ...mapState([
            'myPlayList',
            'likeMusic',
            'profile',
            'isLogin',
        ])
    },
    data() {
        return {
            leftList:[
                {title:'发现音乐',path:'/home/cloud/recommend',key:0},
                {title:'每日推荐',path:'/home/daylist',key:1}
            ],
            key:0,
            creList:[],
            subList:[] 
        };
    },

    mounted() {
        this.cr()
        this.sc()
    },

    methods: {
        goindex(e){
            this.key = e.key
            this.$router.push(e.path)
        },
        // 创建的歌单
        cr(){
            this.creList = this.myPlayList.filter((item) => item.userId == this.profile.userId)
        },
        // 收藏的歌单
        sc(){
            this.subList = this.myPlayList.filter((item) => item.userId !== this.profile.userId)
        },
        userId(){
            return this.isLogin ? this.profile.userId : 0
        }
    },
    filters:{
         ellipsis(value){
          if (!value) return '';
          if (value.length > 9) {
            return value.slice(0,9) + '...'
          }
          return value
        }
    }
};
</script>

<style scoped>
.wrapper {
    padding: 10px 10px 30px;
    overflow: visible;
 }

 .wrapper li {
     line-height: 39px;
     list-style-type: none;
 }
  .wrapper li span {
    font-size: 20px;
    font-weight: bold;
    color: rgb(74, 74, 74);
    border-radius: 8px;
  }
.app {
    width: 200px;
    height: 100%;
    border-right: 3px solid gainsboro;
    overflow: auto;
}
.selli {
    border-radius: 8px;
    padding-left: 10px;
    font-size: 16px;
    color: rgb(94, 94, 94);
}
.selli:hover {
    background-color: rgb(240, 240, 240);
    cursor: pointer;
}
.select{
    background-color: rgb(240, 240, 240);
}
</style>