import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/Home.vue'
// import Login from '@/view/Login.vue'
import Could from '@/view/Could.vue'
import Recommend from '@/view/Recommend.vue'
import Singer from '@/view/Singer.vue'
import SongList from '@/view/SongList.vue'
import RankingList from '@/view/RankingList.vue'
import DayList from '@/view/DayList.vue'
import PlayList from '@/view/PlayList'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/', component: Home, redirect: 'home', children: [
            {
                path: 'home', component: Could, redirect: 'recommend', children: [
                    { path: '/recommend', component: Recommend },
                    { path: '/songList', component: SongList },
                    { path: '/rankinglist', component: RankingList },
                    { path: '/singer', component: Singer },
                ]
            },
            { path: 'playList/:id', component: PlayList, props: true },
            // { path: '/login', component: Login },
            { path: '/daylist', component: DayList },
        ]
    },


]
const router = new VueRouter({
    routes
})
// router.beforeEach((to,from,next) => {
//     document.body.scrollTop = 0
//     document.documentElement.scrollTop = 0
//     window.scrollTo(0,0);
//     next()
// })
export default router