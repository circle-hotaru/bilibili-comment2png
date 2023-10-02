<template>
  <div>
    <form class="form-inline mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="请粘贴 bilibili 视频链接"
        v-model="sharedState.BVId"
        :readonly="sharedState.fetching || sharedState.pending"
      />
      <button
        type="button"
        class="btn btn-outline-secondary ml-sm-2 mt-2 mt-sm-0"
        @click="getId()"
        :disabled="sharedState.fetching || sharedState.pending"
        v-if="sharedState.BVId"
      >
        <span class="align-middle">步骤2：获取</span>
        <div
          class="spinner-border spinner-border-sm"
          role="status"
          v-if="sharedState.fetching"
        >
          <span class="sr-only">处理中...</span>
        </div>
      </button>
      <button
        type="button"
        class="btn btn-primary ml-sm-2 mt-2 mt-sm-0"
        @click="getAnalysis()"
        :disabled="sharedState.fetchingAnalysis"
        v-if="sharedState.comments.length > 0"
      >
        <span class="align-middle">🤖 一键分析</span>
        <div
          class="spinner-border spinner-border-sm"
          role="status"
          v-if="sharedState.fetchingAnalysis"
        >
          <span class="sr-only">处理中...</span>
        </div>
      </button>
    </form>
  </div>
</template>

<script>
import { store } from '../store.js'

export default {
  name: 'get-comments',
  data() {
    return {
      sharedState: store.state,
    }
  },
  methods: {
    getId() {
      store.getId()
    },
    getAnalysis() {
      store.getAnalysis()
    },
  },
}
</script>

<style></style>
