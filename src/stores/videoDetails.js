import { defineStore } from 'pinia'

export const useVideoDetailsStore = defineStore('videoDetails', {
  state: () => ({
    aid: null,
    title: ''
  }),
  actions: {
    updateVideoDetails(videoDetails) {
      this.aid = videoDetails.aid
      this.title = videoDetails.title
    }
  }
})
