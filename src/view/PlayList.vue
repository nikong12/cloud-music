<template>
  <div class="app" ref="reference">
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
        <div class="header" style="display: flex">
          <el-image
            class="my"
            :src="songList.coverImgUrl ? songList.coverImgUrl : ''"
            fit="fill"
          >
          </el-image>
          <div class="right">
            <div class="title">
              <div class="gedan">歌单</div>
              <p>{{ songList.name }}</p>
            </div>
            <div class="singer">
              <el-image
                class="sin"
                :src="creator.avatarUrl ? creator.avatarUrl : ''"
                fit="fill"
              >
              </el-image>
              <p class="username">{{ creator.nickname }}</p>
              <p class="time">{{ leaveTime(songList.createTime) }}创建</p>
            </div>
            <div class="play">
              <button class="playlist" @click="playEvery">
                <svg
                  t="1665056909417"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2377"
                  width="16"
                  height="16"
                >
                  <path
                    d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
                    fill="#ffffff"
                    p-id="2378"
                  ></path>
                </svg>
                <p>播放全部</p>
              </button>
              <button class="count" @click="collect">
                <svg
                  t="1665057641522"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5931"
                  width="16"
                  height="16"
                >
                  <path
                    d="M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24zM551.786667 756.032l170.976 106.24c2.624 1.621333 5.717333 2.122667 8.650666 1.408 6.410667-1.557333 10.56-8.426667 8.928-15.424l-46.485333-198.24a77.141333 77.141333 0 0 1 24.277333-75.733333L870.293333 441.706667c2.485333-2.165333 4.053333-5.312 4.330667-8.746667 0.565333-7.136-4.490667-13.173333-10.976-13.696l-199.712-16.288a75.989333 75.989333 0 0 1-64.064-47.168l-76.938667-188.16a12.309333 12.309333 0 0 0-6.538666-6.741333c-5.898667-2.496-12.725333 0.373333-15.328 6.741333l-76.949334 188.16a75.989333 75.989333 0 0 1-64.064 47.168l-199.701333 16.288a11.68 11.68 0 0 0-7.978667 4.181333 13.226667 13.226667 0 0 0 1.333334 18.261334l152.16 132.586666a77.141333 77.141333 0 0 1 24.277333 75.733334l-46.485333 198.229333a13.333333 13.333333 0 0 0 1.514666 9.877333c3.488 5.792 10.581333 7.530667 16.064 4.128l170.986667-106.229333a75.296 75.296 0 0 1 79.562667 0z"
                    p-id="5932"
                    fill="#707070"
                  ></path>
                </svg>
                <p v-if="!songList.subscribed">
                  收藏({{ songList.subscribedCount | number }})
                </p>
                <p v-else>已收藏({{ songList.subscribedCount | number }})</p>
              </button>
              <button class="count">
                <svg
                  t="1665057402910"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4473"
                  width="16"
                  height="16"
                >
                  <path
                    d="M853.333333 533.333333a32 32 0 0 1 64 0v266.666667c0 64.8-52.533333 117.333333-117.333333 117.333333H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V256c0-64.8 52.533333-117.333333 117.333333-117.333333h277.333333a32 32 0 0 1 0 64H224a53.333333 53.333333 0 0 0-53.333333 53.333333v544a53.333333 53.333333 0 0 0 53.333333 53.333333h576a53.333333 53.333333 0 0 0 53.333333-53.333333V533.333333z m-42.058666-277.333333l-89.792-95.402667a32 32 0 0 1 46.613333-43.861333l140.544 149.333333C927.861333 286.485333 913.376 320 885.333333 320H724.704C643.029333 320 576 391.210667 576 480v192a32 32 0 1 1-64 0V480c0-123.296 94.784-224 212.704-224h86.570667z"
                    p-id="4474"
                    fill="#707070"
                  ></path>
                </svg>
                <p>分享({{ songList.shareCount | number }})</p>
              </button>
            </div>
          </div>
        </div>
        <div class="div1">
          <p
            :class="{ ppp: key === item.key }"
            v-for="item in loginType"
            :key="item.index"
            @click="seleType(item.key)"
          >
            {{ item.name }}
          </p>
        </div>
        <MusicList v-if="key === 0" :tableData="list" />
      </template>
    </el-skeleton>
    
  </div>
</template>

<script>
import moment from "moment";
import { getPlayList, getMusic, getCollectMusicList } from "@/api/musiclist";
import MusicList from "@/components/MusicList.vue";
import { mapState } from "vuex";
export default {
  name: "PlayList",
  // props:['id'],
  components: { MusicList },
  computed: {
    ...mapState(["likeMusic", "playList"]),
    t() {
      if (this.songList.subscribed) {
        return 2;
      } else {
        return 1;
      }
    },
  },
  data() {
    return {
      songList: [],
      list: [],
      creator: [],
      loginType: [
        { name: "歌曲列表", key: 0 },
        { name: "评论", key: 1 },
        { name: "收藏者", key: 2 },
      ],
      key: 0,
      musicList: [],
      isLoding: false,
      // musicl:[]
    };
  },
  watch: {
    $route(to, from) {
      // 做一些路由变化的响应
      this.loading = true;
      this.aPlayList();
      this.music();
      this.$nextTick(() => {
        this.$refs.reference.scrollTo(0, 0);
      });
    },
  },

  created() {
    this.aPlayList();
    this.music();
  },

  methods: {
    async aPlayList() {
      this.isLoding = true;
      const { data: res } = await getPlayList(this.$route.params.id);
      if (res.code !== 200) return;
      this.songList = res.playlist;
      this.creator = res.playlist.creator;
      this.isLoding = false;
    },
    async music() {
      this.isLoding = true;
      const { data: res } = await getMusic(this.$route.params.id);
      if (res.code !== 200) return;
      this.list = res.songs;
      this.isLoding = false;
    },
    leaveTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    seleType(e) {
      this.key = e;
    },
    playEvery() {
      let l = JSON.parse(JSON.stringify(this.list));
      this.$store.dispatch("getPlayList", {
        playList: l,
        id: this.list[0].id,
      });
    },
    async coll() {
      const { data: res } = await getCollectMusicList(this.t, this.songList.id);
      if (res.code !== 200) return;
      this.$store.dispatch("getmyPlayList");
      this.aPlayList();
    },
    collect() {
      if (this.t === 2) {
        this.$confirm("是否取消收藏", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.coll();
            this.$message({
              type: "success",
              message: "取消收藏成功",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        this.coll();
        this.$message({
          type: "success",
          message: "收藏成功",
        });
      }
    },
  },
  filters: {
    number: function (playCount) {
      let unit = "";
      var k = 10000,
        sizes = ["", "万", "亿", "万亿"],
        i;
      if (playCount < k) {
        playCount = playCount;
      } else {
        i = Math.floor(Math.log(playCount) / Math.log(k));
        playCount = (playCount / Math.pow(k, i)).toFixed(2);
        unit = sizes[i];
      }
      return playCount + unit;
    },
  },
};
</script>

<style scoped>
.div1 {
  width: 250px;
  margin-top: 15px;
  /* width: 1000px; */
  display: flex;
  justify-content: space-evenly;
  font: 800 18px "";
  color: rgb(72, 72, 72);
}
.div1 p {
  margin-left: 10px;
  cursor: pointer;
}
.ppp {
  /* background-color: rgb(234, 234, 234); */
  font-size: 22px;
  border-bottom: 4px solid #ec4141;
  /* border-radius: 10px; */
}
.right {
  margin-left: 20px;
  margin-top: 10px;
  width: 600px;
  height: 180px;
  /* background-color: skyblue; */
  /* display: flex; */
}
.title {
  display: flex;
}
.title p {
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
}
.count {
  margin-left: 20px;
  /* width: 100px; */
  padding: 12px;
  height: 35px;
  border: 0;
  color: rgb(72, 72, 72);
  border-radius: 16px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid rgb(63, 63, 63);
}
.count:hover {
  cursor: pointer;
}
.gedan {
  width: 36px;
  height: 22px;
  border: 1px solid #ec4141;
  border-radius: 6px;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #ec4141;
}
.play {
  display: flex;
  margin-top: 10px;
}

.singer {
  width: 400px;
  height: 40px;
  margin-top: 10px;
  margin-left: 5px;
  /* background-color: skyblue; */
  display: flex;
}
.playlist {
  width: 130px;
  height: 35px;
  border: 0;
  background-color: #ec4141;
  color: white;
  border-radius: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.playlist:hover {
  cursor: pointer;
}

.sin {
  width: 35px;
  height: 35px;
  border-radius: 25px;
}
.username {
  margin-left: 10px;
  margin-top: 6px;
  font-size: 16px;
  color: rgb(21, 47, 85);
}
.time {
  margin-left: 10px;
  margin-top: 9px;
  font-size: 13px;
  color: rgb(35, 35, 35);
}
.app {
  /* height: 591px; */
  height: 98%;
  overflow: auto;
  margin-left: 80px;
  /* padding-bottom: 10px; */
}
.header {
  /* height: 200px; */
  width: 100%;
  /* background-color: pink; */
  display: flex;
  /* float: left; */
}
.my {
  margin-top: 10px;
  margin-left: 10px;
  width: 180px;
  height: 180px;
  border-radius: 8px;
}
</style>