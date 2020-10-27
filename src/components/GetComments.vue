<template>
  <div>
    <p>
      例如：<a href="#" @click.prevent="sharedState.BVId = '1B7411z7Lk'"
        >1B7411z7Lk</a
      >
    </p>
    <form class="form-inline mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="步骤1：贴上视频BV号"
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
    </form>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "get-comments",
  data() {
    return {
      sharedState: store.state,
    };
  },
  methods: {
    getId() {
      store.getId();
    },
  },
};
</script>

<style>
</style>