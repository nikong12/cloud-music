<template>
    <div class="banner">
        <el-carousel :interval="4000" type="card" height="230px">
            <el-carousel-item v-for="item in banners" :key="item.index">
                <el-image
                    class="el-image__inner"
                    :src="item.imageUrl ? item.imageUrl : ''"
                    fit="fill"
                >
                </el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { getBanner } from '@/api/other'
export default {
    name: 'Banner',
    data() {
        return {
            banners: []
        }
    },

    mounted() {
        this.banner()
    },

    methods: {
        async banner() {
            const { data: res } = await getBanner()
            if (res.code === 200) {
                this.banners = res.banners
            }
        }
    }
}
</script>

<style scoped>
.banner {
    width: 1080px;
}
.el-image__inner {
    border-radius: 12px;
}
</style>