<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useVideoDetailsStore } from '@/stores/videoDetails'
import CommentItem from './CommentItem.vue'

const videoDetailsStore = useVideoDetailsStore()
const mode = ref(2)
const currentPage = ref(1)
const pageSize = ref(20)

watch(
  () => videoDetailsStore.aid,
  async (newAid) => {
    if (newAid) {
      const url = `/bili.api/x/v2/reply?type=1&oid=${newAid}&sort=${mode.value}&pn=${currentPage.value}&ps=${pageSize.value}&nohot=1`
      const { data } = await axios.get(url)
      console.log('data', data)
      // if (data.code === 0) {
      //   this.state.comments = data.data.replies
      //   this.state.count = data.data.page.count
      //   this.state.fetching = false
      // } else {
      //   this.state.fetching = false
      //   console.log(data.message)
      // }
    }
  },
  { immediate: true }
)
</script>

<template>
  <CommentItem />
</template>
