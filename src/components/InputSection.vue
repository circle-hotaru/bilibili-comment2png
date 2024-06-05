<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useVideoDetailsStore } from '@/stores/videoDetails'

const url = ref('')

async function getAVId() {
  const videoDetailsStore = useVideoDetailsStore()

  const bid = url.value
  const regex = /BV[0-9A-Z]+/i
  const matches = bid.match(regex)
  const realBid = matches ? matches[0].replace(/^BV/, '') : bid

  try {
    const apiUrl = `/bili.api/x/web-interface/view?bvid=${realBid}`
    const { data } = await axios.get(apiUrl)
    const aid = data.data.aid
    const title = data.data.title
    console.log(aid, title)

    videoDetailsStore.updateVideoDetails({
      aid,
      title
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-space>
    <el-input v-model="url" style="width: 240px" placeholder="请粘贴 BiliBili 视频链接" />
    <el-button type="primary" @click="getAVId">获取</el-button>
    <el-button>下载</el-button>
  </el-space>
</template>

<style scoped></style>
